import { MongoServerError, ObjectId } from 'mongodb'
import { getMongoClientInstance } from '../config'
import { z } from 'zod'
import { inputSelect, input } from '@/app/api/projects/route'

const DB_NAME = process.env.MONGODB_DB_NAME
const COLLECTION_NAME = 'projects'

export type ProjectModel = {
  _id: ObjectId
  title: string
  teams: string
  projectDescription: string
  workDescription: string
  skills: string
  position: string
  onSiteRequired: string
  jobLocation: string
  jobType: string
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
      required_error: 'You should be input the Project Description',
      invalid_type_error: 'You should be input the Project Description',
    })
    .min(1, 'You should be input the Project Description'),
  workDescription: z
    .string({
      required_error: 'You should be input the Work Description',
      invalid_type_error: 'You should be input the Work Description',
    })
    .min(1, 'You should be input the Work Description'),
  position: z
    .string({
      required_error: 'You should be input the Position',
      invalid_type_error: 'You should be input the Position',
    })
    .min(1, 'You should be input the Position'),
  location: z
    .string({
      required_error: 'You should be input the Location',
      invalid_type_error: 'You should be input the Location',
    })
    .min(1, 'You should be input the Location'),
  jobType: z
    .string({
      required_error: 'You should be input the Job Type',
      invalid_type_error: 'You should be input the Job Type',
    })
    .min(1, 'You should be input the Job Type'),
  experience: z
    .string({
      required_error: 'You should be input the Experience',
      invalid_type_error: 'You should be input the Experience',
    })
    .min(1, 'You should be input the Experience'),
  benefits: z
    .string({
      required_error: 'You should be input the Benefits',
      invalid_type_error: 'You should be input the Benefits',
    })
    .min(1, 'You should be input the Benefits'),
  onSiteRequired: z
    .string({
      required_error: 'You should be input the On Site Required',
      invalid_type_error: 'You should be input the On Site Required',
    })
    .min(1, 'You should be input the On Site Required'),
  skills: z
    .string({
      required_error: 'You should be input the Skills',
      invalid_type_error: 'You should be input the Skills',
    })
    .min(1, 'You should be input the Skills'),
  teams: z
    .string({
      required_error: 'You should be input the Teams',
      invalid_type_error: 'You should be input the Teams',
    })
    .min(1, 'You should be input the Teams'),
})

export class Project {
  static async connection() {
    const client = await getMongoClientInstance()
    const connection = client.collection(COLLECTION_NAME)

    return connection
  }

  static async createProject(
    input: input,
    inputSelect: inputSelect,
    userId: string,
  ) {
    try {
      const collection = await this.connection()

      let data = {
        title: input.title,
        projectDescription: input.projectDescription,
        workDescription: input.workDescription,
        position: input.position,
        location: input.jobLocation,
        jobType: inputSelect.jobType,
        experience: input.experience,
        benefits: input.benefits,
        onSiteRequired: inputSelect.onSiteRequired,
        skills: input.skills,
        teams: input.teams,
      }

      const parsedInput = ProjectCreateSchema.parse(data)

      const addProject = await collection.insertOne({
        ...parsedInput,
        skills: parsedInput.skills.split(', '),
        benefits: parsedInput.benefits.split(', '),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: new ObjectId(userId),
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
