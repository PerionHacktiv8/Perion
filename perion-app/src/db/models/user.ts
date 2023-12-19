import { MongoServerError, ObjectId } from 'mongodb'
import { getMongoClientInstance } from '../config'
import { compHash, hashPass } from '../helpers/bcrypt'
import { z } from 'zod'
import { Invoice } from 'xendit-node'
import { CreateInvoiceRequest } from 'xendit-node/invoice/models'
import { PdfReader } from 'pdfreader'
import { openai } from '../config/openai'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { ProfilesModel } from './profiles'
import storage from '../config/firebase'

const COLLECTION_NAME = 'users'

export type UserModel = {
  _id: ObjectId
  name: string
  username: string
  email: string
  password: string
  picture: string
  firstTime: boolean
  subscription: boolean
  bio: string
  cvLink: string
  cvData: CVData
  location: string
  createdAt: string
}

export type CVData = {
  expYear: string
  skills: string[]
  numOfProjects: string
  projectsNames: string[]
}

type UserInputType = Omit<
  UserModel,
  '_id' | 'picture' | 'firstTime' | 'createdAt'
>

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
        {
          projection: {
            picture: 1,
            firstTime: 1,
            subscription: 1,
            email: 1,
            name: 1,
          },
        },
      )) as UserModel

      return user
    } catch (err) {
      throw err
    }
  }

  static async findRecruits() {
    try {
      const collection = await this.connection()

      const users = await collection.find().toArray()

      return users
    } catch (err) {
      throw err
    }
  }

  static async findProfile(val: string) {
    try {
      const collection = await this.connection()

      const user = await collection.findOne({ _id: new ObjectId(val) })

      return user as UserModel
    } catch (err) {
      throw err
    }
  }

  static async findDet(val: string) {
    try {
      const collection = await this.connection()

      const user = await collection.findOne({ username: val })

      return user as UserModel
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

  static async createUsers(input: Object) {
    try {
      const collection = await this.connection()

      const parsedData = userCreateSchema.parse(input)

      const alteredInput = {
        ...parsedData,
        password: hashPass(parsedData.password),
        subscription: false,
        firstTime: true,
        picture:
          'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
        updatedAt: new Date(),
        createdAt: new Date(),
      }

      const { insertedId } = await collection.insertOne(alteredInput)

      const data = await collection.findOne({ _id: insertedId })

      return data
    } catch (err) {
      let error: string = 'Internal Server Error'
      let statusCode: number = 500

      if (err instanceof z.ZodError) {
        error = err.issues[0].message
      }

      if (err instanceof MongoServerError) {
        error = `${Object.keys(err.keyPattern)[0]} already been use`
      }

      console.log(error)

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

  static async updateFree(userId: string) {
    try {
      const collection = await this.connection()

      await collection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $set: {
            subscription: false,
            firstTime: false,
            updatedAt: new Date(),
          },
        },
      )
    } catch (err) {
      console.log(err)
    }
  }

  static async extractPDF(file: File, userId: string) {
    try {
      const fileArrBuff = await file.arrayBuffer()
      const fileBuff = Buffer.from(fileArrBuff)
      const result: string[] = []

      const pdfreader = new PdfReader({})
      pdfreader.parseBuffer(fileBuff, (err, item) => {
        if (err) console.error('error:', err)
        else if (!item) return this.sumPDF(result.join(' '), userId)
        else if (item.text) {
          result.push(item.text)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  static async sumPDF(val: string, userId: string) {
    try {
      const collection = await this.connection()

      const ai = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `can you summarize this cv into four exact points divided by a dash in a line, first is only his total work experience in number of years, if less than a year put 1 year, second is his skills strict only his skills, third is his number of projects only number of projects, fourth is his projects name list divided by a coma with this format 'Names: his list of projects' , this is the cv, ${val}`,
          },
        ],
      })

      const data = (ai.choices[0].message.content as string).split(' - ')

      const expYear = data[0]
      const skills = data[1]?.split('Skills: ')[1]?.split(', ')
      const numOfProjects = data[2]
      const projectNames = data[3]?.split('Names: ')[1]?.split(', ')

      await collection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $set: {
            cvData: {
              expYear,
              skills,
              numOfProjects,
              projectNames,
            },
          },
        },
      )

      return data
    } catch (err) {
      console.log(err)
    }
  }

  static async upPDF(file: File, userId: string) {
    try {
      const collection = await this.connection()

      const storageRef = ref(fireStorage, file.name)
      const upload = uploadBytes(storageRef, file)

      const data = await upload.then(async (snapshot) => {
        return getDownloadURL(snapshot.ref).then((dataUrl) => {
          return dataUrl
        })
      })

      await collection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $set: {
            cvLink: data,
          },
        },
      )

      return data
    } catch (err) {
      console.log(err)
    }
  }

  static async upImg(file: File, userId: string) {
    try {
      const collection = await this.connection()

      const storageRef = ref(fireStorage, userId)
      const upload = uploadBytes(storageRef, file)

      const data = await upload.then(async (snapshot) => {
        return getDownloadURL(snapshot.ref).then((dataUrl) => {
          return dataUrl
        })
      })

      await collection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $set: {
            picture: data,
          },
        },
      )

      return data
    } catch (err) {
      console.log(err)
    }
  }

  static async upProfile(input: UserModel, userId: string) {
    try {
      const collection = await this.connection()

      await collection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $set: {
            name: input.name,
            bio: input.bio,
            location: input.location,
            updatedAt: new Date(),
          },
        },
      )
    } catch (err) {
      console.log(err)
    }
  }
}
