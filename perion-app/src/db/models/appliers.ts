import { MongoServerError, ObjectId } from 'mongodb'
import { getMongoClientInstance } from '../config'
import { z } from 'zod'
import { ProjectModel } from './project'

const COLLECTION_NAME = 'appliers'

export type AppliersModel = {
  _id: ObjectId
  userId: ObjectId
  projectId: ObjectId
  createdAt: string
  updatedAt: string
  projectInfo?: ProjectModel
}

export class Appliers {
  static async connection() {
    const client = await getMongoClientInstance()
    const connection = client.collection(COLLECTION_NAME)

    return connection
  }

  static async applyProject(userId: string, projectId: string) {
    try {
      const collection = await this.connection()

      await collection.createIndex(
        { userId: 1, projectId: 1 },
        { unique: true },
      )

      const data = await collection.insertOne({
        userId: new ObjectId(userId),
        projectId: new ObjectId(projectId),
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return data
    } catch (error) {
      console.log(error)
    }
  }

  static async getApplied(val: string) {
    try {
      const collection = await this.connection()

      const data = (await collection
        .aggregate([
          { $match: { userId: new ObjectId(val) } },
          {
            $lookup: {
              from: 'projects',
              localField: 'projectId',
              foreignField: '_id',
              as: 'projectInfo',
            },
          },
          {
            $unwind: {
              path: '$projectInfo',
              preserveNullAndEmptyArrays: true,
            },
          },
        ])
        .toArray()) as AppliersModel[]

      return data
    } catch (error) {
      console.log(error)
    }
  }
}
