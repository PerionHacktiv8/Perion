import { MongoServerError, ObjectId } from 'mongodb';
import { getMongoClientInstance } from '../config';
import { hashPass } from '../helpers/bcrypt';
import { z } from 'zod';

const DB_NAME = process.env.MONGODB_DB_NAME;
const COLLECTION_NAME = 'Users';

export type UserModel = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
  address: string;
};

type UserInputType = Omit<UserModel, '_id'>;

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
});

export class Users {
  static async connection() {
    const client = await getMongoClientInstance();
    const db = client.db(DB_NAME);
    const connection = db.collection(COLLECTION_NAME);

    return connection;
  }

  static async findOneUser(val: string) {
    try {
      const collection = await this.connection();

      const users = (await collection.findOne(
        {
          _id: new ObjectId(val),
        },
        { projection: { password: 0 } }
      )) as UserModel;

      return users;
    } catch (err) {
      throw err;
    }
  }

  static async login(email: string) {
    try {
      const collection = await this.connection();

      const user = (await collection.findOne({
        email,
      })) as UserModel;

      return user;
    } catch (err) {
      throw err;
    }
  }

  static async createUsers(input: FormData) {
    try {
      const collection = await this.connection();

      await collection.createIndex({ username: 1 }, { unique: true });
      await collection.createIndex({ email: 1 }, { unique: true });

      const data = {
        name: input.get('name'),
        username: input.get('username'),
        email: input.get('email'),
        password: input.get('password'),
        address: input.get('address'),
      };

      const parsedData = userCreateSchema.parse(data);

      const alteredInput: UserInputType = {
        ...parsedData,
        password: hashPass(parsedData.password),
      };

      const created = await collection.insertOne(alteredInput);

      return created;
    } catch (err) {
      let error: string = 'Internal Server Error';
      let statusCode: number = 500;

      if (err instanceof z.ZodError) {
        statusCode = 400;
        error = err.issues[0].message;
      }

      if (err instanceof MongoServerError) {
        if (Object.keys(err.keyPattern)[0] === 'email')
          error = 'Email already been used';
        if (Object.keys(err.keyPattern)[0] === 'username')
          error = 'Username already been used';
      }

      throw error;
    }
  }

  static async upPDF() {
    try {
    } catch (err) {
      console.log(err);
    }
  }
}
