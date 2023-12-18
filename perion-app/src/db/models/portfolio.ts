import { MongoServerError, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { z } from "zod";

const DB_NAME = process.env.MONGODB_DB_NAME;
const COLLECTION_NAME = "portfolios";

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

const PortfolioCreateSchema = z.object({
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
      const collection = await this.connection();

      const data = {
        title: input.get("title"),
        description: input.get("description"),
        link: input.get("link"),
      };

      const parsedData = PortfolioCreateSchema.parse(data);

      const created = await collection.insertOne({
        ...parsedData,
        createdAt: new Date(),
        updateAt: new Date(),
      });

      return created;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  static async readPortfolios() {
    try {
      const collection = await this.connection();
      const portfolios = (await collection
        .find({})
        .toArray()) as PortfolioModel[];
      return portfolios;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
