import { MongoServerError, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { z } from "zod";

const DB_NAME = process.env.MONGODB_DB_NAME;
const COLLECTION_NAME = "projects";

export type PortfolioModel = {
  _id: ObjectId;
  title: string;
  description: string;
  link: string;
  createdAt: string;
  updatedAt: string;
};

type PortfoliosModelInput = Omit<
  PortfolioModel,
  "_id" | "createdAt" | "updatedAt"
>;

const PortfolioInputSchema = z.object({
  title: z
    .string({
      required_error: "You should be input the Title",
      invalid_type_error: "You should be input the Title",
    })
    .min(1, "You should be input the Title"),
  description: z
    .string({
      required_error: "You should be input the Description",
      invalid_type_error: "You should be input the Description",
    })
    .min(1, "You should be input the Description"),
  link: z
    .string({
      required_error: "You should be input the Link",
      invalid_type_error: "You should be input the Link",
    })
    .min(1, "You should be input the Link"),
});

export class Portfolio {
  static async connection() {
    const client = await getMongoClientInstance();
    const db = client.db(DB_NAME);
    const connection = db.collection(COLLECTION_NAME);

    return connection;
  }
  static async createPortfolio(input: FormData) {
    try {
      console.log(input, 53);

      const collection = await this.connection();
    } catch (error) {
      console.log(error);
    }
  }
}
