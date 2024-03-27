import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections = {
  users: {},
  movies: {},
};

export async function connectToDatabase() {
  dotenv.config();

  const client = new mongoDB.MongoClient(process.env.ATLAS_URI);

  await client.connect();

  const db = client.db(process.env.DB_NAME);
  const usersCollection = db.collection(process.env.USERS_COLLECTION_NAME);

  const moviesCollection = db.collection(process.env.MOVIES_COLLECTION_NAME);

  collections.movies = moviesCollection;
  collections.users = usersCollection;

  console.log(`Successfully connected to database: ${db.databaseName} `);
}
