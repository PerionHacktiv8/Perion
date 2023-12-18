import { MongoServerError, ObjectId } from 'mongodb'
import { getMongoClientInstance } from '../config'
import { z } from 'zod'

const COLLECTION_NAME = 'projects'

export type ProjectModel = {
  _id: ObjectId
  title: string
  projectDescription: string
  workDescription: string
  position: string
  jobLocation: string
  jobType: string
  onSiteRequired: string
  experience: string
  benefits: string
  createdAt: string
  updatedAt: string
}

type ProjectInputType = Omit<ProjectModel, '_id' | 'updatedAt' | 'createdAt'>

const ProjectCreateSchema = z.object({
  title: z
    .string({
      required_error: 'You should be input the title',
      invalid_type_error: 'You should be input the title',
    })
    .min(1, 'You should be input the title'),
  projectDescription: z
    .string({
      required_error: 'You should be input the title',
      invalid_type_error: 'You should be input the title',
    })
    .min(1, 'You should be input the title'),
  workDescription: z
    .string({
      required_error: 'You should be input the title',
      invalid_type_error: 'You should be input the title',
    })
    .min(1, 'You should be input the title'),
  position: z
    .string({
      required_error: 'You should be input the title',
      invalid_type_error: 'You should be input the title',
    })
    .min(1, 'You should be input the title'),
  location: z
    .string({
      required_error: 'You should be input the title',
      invalid_type_error: 'You should be input the title',
    })
    .min(1, 'You should be input the title'),
  jobType: z
    .string({
      required_error: 'You should be input the title',
      invalid_type_error: 'You should be input the title',
    })
    .min(1, 'You should be input the title'),
  experience: z
    .string({
      required_error: 'You should be input the title',
      invalid_type_error: 'You should be input the title',
    })
    .min(1, 'You should be input the title'),
  benefits: z
    .string({
      required_error: 'You should be input the title',
      invalid_type_error: 'You should be input the title',
    })
    .min(1, 'You should be input the title'),
})

export class Project {
  static async connection() {
    const client = await getMongoClientInstance()
    const connection = client.collection(COLLECTION_NAME)

    return connection
  }

  static async createProject(input: FormData) {
    try {
      const collection = await this.connection()
      let data = {
        title: input.get('title'),
        projectDescription: input.get('projectDescription'),
        workDescription: input.get('workDescription'),
        position: input.get('position'),
        location: input.get('location'),
        jobType: input.get('jobType'),
        experience: input.get('experience'),
        benefits: input.get('benefits'),
      }

      const parsedInput = ProjectCreateSchema.parse(data)

      const addProject = await collection.insertOne({
        ...parsedInput,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return addProject
    } catch (error) {
      throw error
    }
  }
  static async readProjects() {
    try {
      const collection = await this.connection()
      const projects = (await collection
        .find({})
        .sort({ createdAt: 1 })
        .toArray()) as ProjectModel[]
      return projects
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  static async readDetailProject(id: ObjectId) {
    try {
      const collection = await this.connection()

      const checkData = await collection.findOne({
        _id: new ObjectId(id),
      })

      if (!checkData) {
        throw new Error('Project Not Found')
      }

      const project = (await collection.findOne({
        _id: new ObjectId(id),
      })) as ProjectModel
      return project
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  static async deleteProject(id: ObjectId) {
    try {
      const collection = await this.connection()

      const checkData = await collection.findOne({
        _id: new ObjectId(id),
      })

      if (!checkData) {
        throw new Error('Project Not Found')
      }

      const project = await collection.deleteOne({
        _id: new ObjectId(id),
      })
      return project
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  static async editProject(id: ObjectId, input: FormData) {
    try {
      const collection = await this.connection()

      let data = {
        title: input.get('title'),
        projectDescription: input.get('projectDescription'),
        workDescription: input.get('workDescription'),
        position: input.get('position'),
        location: input.get('location'),
        jobType: input.get('jobType'),
        experience: input.get('experience'),
        benefits: input.get('benefits'),
      }

      const parsedInput = ProjectCreateSchema.parse(data)

      const checkData = await collection.findOne({
        _id: new ObjectId(id),
      })

      if (!checkData) {
        throw new Error('Project Not Found')
      }

      const project = await collection.updateOne(
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
      return project
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
