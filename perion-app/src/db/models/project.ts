import { MongoServerError, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { z } from "zod";

const DB_NAME = process.env.MONGODB_DB_NAME;
const COLLECTION_NAME = "Projects";

export type ProjectModel = {
  _id: ObjectId;
  title: string;
  projectDescription: string;
  workDescription: string;
  position: string;
  location: string;
  jobType: string;
  experience: string;
  benefits: string;
  createdAt: string;
  updatedAt: string;
};

type ProjectInputType = Omit<ProjectModel, "_id" | "updatedAt" | "createdAt">;

const ProjectCreateSchema = z.object({
  title: z
    .string({
      required_error: "You should be input the title",
      invalid_type_error: "You should be input the title",
    })
    .min(1, "You should be input the title"),
  projectDescription: z
    .string({
      required_error: "You should be input the title",
      invalid_type_error: "You should be input the title",
    })
    .min(1, "You should be input the title"),
  workDescription: z
    .string({
      required_error: "You should be input the title",
      invalid_type_error: "You should be input the title",
    })
    .min(1, "You should be input the title"),
  position: z
    .string({
      required_error: "You should be input the title",
      invalid_type_error: "You should be input the title",
    })
    .min(1, "You should be input the title"),
  location: z
    .string({
      required_error: "You should be input the title",
      invalid_type_error: "You should be input the title",
    })
    .min(1, "You should be input the title"),
  jobType: z
    .string({
      required_error: "You should be input the title",
      invalid_type_error: "You should be input the title",
    })
    .min(1, "You should be input the title"),
  experience: z
    .string({
      required_error: "You should be input the title",
      invalid_type_error: "You should be input the title",
    })
    .min(1, "You should be input the title"),
  benefits: z
    .string({
      required_error: "You should be input the title",
      invalid_type_error: "You should be input the title",
    })
    .min(1, "You should be input the title"),
});

export class Project {
  static async connection() {
    const client = await getMongoClientInstance();
    const db = client.db(DB_NAME);
    const connection = db.collection(COLLECTION_NAME);

    return connection;
  }

  static async createProject(input: FormData) {
    try {
      const collection = await this.connection();
      let data = {
        title: input.get("title"),
        projectDescription: input.get("projectDescription"),
        workDescription: input.get("workDescription"),
        position: input.get("position"),
        location: input.get("location"),
        jobType: input.get("jobType"),
        experience: input.get("experience"),
        benefits: input.get("benefits"),
      };
      console.log(data);

      const parsedInput = ProjectCreateSchema.parse(data);

      const addProject = await collection.insertOne({
        ...parsedInput,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return addProject;
    } catch (error) {
      throw error;
    }
  }
  static async readProjects() {
    try {
      const collection = await this.connection();
      const projects = (await collection.find({}).toArray()) as ProjectModel[];
      return projects;
    } catch (error) {
      console.log(error);
    }
  }
}
