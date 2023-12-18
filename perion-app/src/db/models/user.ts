import { MongoServerError, ObjectId } from 'mongodb'
import { getMongoClientInstance } from '../config'
import { compHash, hashPass } from '../helpers/bcrypt'
import { z } from 'zod'
import { Invoice } from 'xendit-node'
import { CreateInvoiceRequest } from 'xendit-node/invoice/models'
import { PdfReader } from 'pdfreader'
import { openai } from '../config/openai'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../config/firebaseConfig'

const COLLECTION_NAME = 'users'

export type UserModel = {
  _id: ObjectId
  name: string
  username: string
  email: string
  password: string
  address: string
  picture: string
  firstTime: boolean
}

type UserInputType = Omit<UserModel, '_id' | 'picture' | 'firstTime'>

const userCreateSchema = z.object({
  name: z
    .string({
      required_error: 'Please input your full name',
      invalid_type_error: 'Please input your full name',
    })
    .min(1, 'Please input your full name'),
  username: z
    .string({
      required_error: 'Please to input your username',
      invalid_type_error: 'Please to input your username',
    })
    .min(1, 'Please to input your username'),
  email: z
    .string({
      required_error: 'Please to input your email',
      invalid_type_error: 'Please to input your email',
    })
    .email('Need to be an Email Address'),
  password: z
    .string({
      required_error: 'Please to input your password',
      invalid_type_error: 'Please input your password',
    })
    .min(6, 'Password need to be more than 6 character long'),
  address: z
    .string({ invalid_type_error: 'Please input your address' })
    .min(1, 'Please input your address'),
})

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Please to input your email',
      invalid_type_error: 'Please to input your email',
    })
    .min(1, 'Please input your email address')
    .email('Need to be an Email Address'),
  password: z
    .string({
      required_error: 'Please to input your password',
      invalid_type_error: 'Please input your password',
    })
    .min(6, 'Password need to be more than 6 character long'),
})

export class Users {
  static async connection() {
    const client = await getMongoClientInstance()
    const connection = client.collection(COLLECTION_NAME)

    return connection
  }

  static async findOneUser(val: string) {
    try {
      const collection = await this.connection()

      const user = (await collection.findOne(
        {
          _id: new ObjectId(val),
        },
        { projection: { picture: 1, firstTime: 1 } },
      )) as UserModel

      return { picture: user.picture, firstTime: user.firstTime }
    } catch (err) {
      throw err
    }
  }

  static async login(email: string, password: string) {
    try {
      const collection = await this.connection()

      const parsedData = loginSchema.parse({
        email,
        password,
      })

      const user = (await collection.findOne({
        email: parsedData.email,
      })) as UserModel

      if (!user || !compHash(parsedData.password, user.password)) {
        throw new Error(`Wrong Email/Password`)
      }

      return user
    } catch (err) {
      throw err
    }
  }

  static async createUsers(input: FormData) {
    try {
      const collection = await this.connection()

      await collection.createIndex({ username: 1 }, { unique: true })
      await collection.createIndex({ email: 1 }, { unique: true })

      const data = {
        name: input.get('name'),
        username: input.get('username'),
        email: input.get('email'),
        password: input.get('password'),
        address: input.get('address'),
      }

      const parsedData = userCreateSchema.parse(data)

      const alteredInput: UserInputType = {
        ...parsedData,
        password: hashPass(parsedData.password),
      }

      const created = await collection.insertOne(alteredInput)

      return created
    } catch (err) {
      let error: string = 'Internal Server Error'
      let statusCode: number = 500

      if (err instanceof z.ZodError) {
        statusCode = 400
        error = err.issues[0].message
      }

      if (err instanceof MongoServerError) {
        if (Object.keys(err.keyPattern)[0] === 'email')
          error = 'Email already been used'
        if (Object.keys(err.keyPattern)[0] === 'username')
          error = 'Username already been used'
        if (Object.keys(err.keyPattern)[0] === 'email')
          error = 'Email already been used'
        if (Object.keys(err.keyPattern)[0] === 'username')
          error = 'Username already been used'
      }

      throw error
    }
  }

  static async invoiceXendit(email: string, userId: string) {
    try {
      const invoiceService = new Invoice({
        secretKey: process.env.SECRET_API_XENDIT as string,
      })

      const data: CreateInvoiceRequest = {
        amount: 310000,
        invoiceDuration: '172800',
        payerEmail: email,
        externalId: userId,
        description: 'Parion One Time Payment',
        currency: 'IDR',
        reminderTime: 1,
        successRedirectUrl: 'http://localhost:3000',
        failureRedirectUrl: 'http://localhost:3000',
      }

      const response = await invoiceService.createInvoice({
        data,
      })

      return response.invoiceUrl
    } catch (error) {
      console.log(error)
    }
  }

  static async updateStatus(userId: string) {
    try {
      const collection = await this.connection()

      await collection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $set: {
            subscription: true,
            firstTime: false,
            updatedAt: new Date(),
          },
        },
      )
    } catch (err) {
      console.log(err)
    }
  }

  static async extractPDF(file: File) {
    try {
      const fileArrBuff = await file.arrayBuffer()
      const fileBuff = Buffer.from(fileArrBuff)
      const result: string[] = []

      const pdfreader = new PdfReader({})
      pdfreader.parseBuffer(fileBuff, (err, item) => {
        if (err) console.error('error:', err)
        else if (!item) return this.sumPDF(result.join(' '))
        else if (item.text) {
          result.push(item.text)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  static async sumPDF(val: string) {
    try {
      const ai = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `can you summarize this cv into four excact points divided by a dash in a line, that is his name, his total work experience in number of years, if less than a year put 1 year, and his skills strict only his skills, his number of projects, this is the cv, ${val}`,
          },
        ],
      })

      console.log(ai.choices[0].message.content as string)

      const data = (ai.choices[0].message.content as string).split(' - ')

      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  static async upPDF(file: File) {
    try {
      const storageRef = ref(storage, file.name)
      const upload = uploadBytes(storageRef, file)

      const data = await upload.then(async (snapshot) => {
        return getDownloadURL(snapshot.ref).then((dataUrl) => {
          return dataUrl
        })
      })

      return data
    } catch (err) {
      console.log(err)
    }
  }
}
