import { MongoServerError, ObjectId } from 'mongodb'
import { getMongoClientInstance } from '../config'
import { z } from 'zod'

const COLLECTION_NAME = 'portfolios'

export type PortfolioModel = {
  _id: ObjectId
  title: string
  description: string
  thumbnail: string
  link?: string
  createdAt: string
  updatedAt: string
}

type PortfoliosModelInput = Omit<
  PortfolioModel,
  '_id' | 'createdAt' | 'updatedAt'
>

const PortfolioCreateSchema = z.object({
  title: z
    .string({
      required_error: 'You should be input the Title',
      invalid_type_error: 'You should be input the Title',
    })
    .min(1, 'You should be input the Title'),
  description: z
    .string({
      required_error: 'You should be input the Description',
      invalid_type_error: 'You should be input the Description',
    })
    .min(1, 'You should be input the Description'),
  thumbnail: z
    .string({
      required_error: 'You should be input the Thumbnail',
      invalid_type_error: 'You should be input the Thumbnail',
    })
    .min(1, 'You should be input the Thumbnail'),
  link: z.string(),
})

export class Portfolio {
  static async connection() {
    const client = await getMongoClientInstance()
    const connection = client.collection(COLLECTION_NAME)

    return connection
  }
  static async createPortfolio(input: PortfolioModel, userId: string) {
    try {
      const collection = await this.connection()

      const data = {
        // title: input.get('title'),
        // description: input.get('description'),
        // link: input.get('link'),
        // thumbnail: input.get('thumbnail'),
        title: input.title,
        description: input.description,
        link: input.link,
        thumbnail: input.thumbnail,
      }

      const parsedData = PortfolioCreateSchema.parse(data)

      const created = await collection.insertOne({
        ...parsedData,
        createdAt: new Date(),
        updateAt: new Date(),
        userId: new ObjectId(userId),
      })

      return created
    } catch (err) {
      throw err
    }
  }
  static async readPortfolios() {
    try {
      const collection = await this.connection()
      const portfolios = (await collection
        .find({})
        .toArray()) as PortfolioModel[]
      return portfolios
    } catch (err) {
      throw err
    }
  }
  static async deletePortfolio(id: ObjectId) {
    try {
      const collection = await this.connection()
      const checkData = await collection.findOne({
        _id: new ObjectId(id),
      })

      if (!checkData) {
        throw new Error('Portfolios Not Found')
      }

      await collection.deleteOne({
        _id: new ObjectId(id),
      })

      return checkData
    } catch (err) {
      throw err
    }
  }
  static async detailPortfolio(id: ObjectId) {
    try {
      const collection = await this.connection()
      const findOne = (await collection.findOne({
        _id: new ObjectId(id),
      })) as PortfolioModel
      return findOne
    } catch (err) {
      throw err
    }
  }
  static async editPortfolio(id: ObjectId, input: FormData) {
    try {
      const collection = await this.connection()

      let data = {
        title: input.get('title'),
        description: input.get('description'),
        link: input.get('link'),
      }

      const parsedInput = PortfolioCreateSchema.parse(data)

      const checkData = await collection.findOne({
        _id: new ObjectId(id),
      })

      if (!checkData) {
        throw new Error('Portfolios Not Found')
      }

      const edited = await collection.updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            ...parsedInput,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      )
      return edited
    } catch (err) {
      throw err
    }
  }
}
