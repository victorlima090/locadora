import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// export const collections: {
//   users?: mongoDB.Collection;
//   movies?: mongoDB.Collection;
// } = {};
export const collections = {
  user: {},
  movies: {},
};

export async function connectToDatabase() {
  dotenv.config();

  // const client: mongoDB.MongoClient = new mongoDB.MongoClient(
  //   process.env.DB_CONN_STRING
  // );
  const client = new mongoDB.MongoClient(process.env.ATLAS_URI);

  await client.connect();

  //const db: mongoDB.Db = client.db(process.env.DB_NAME);
  const db = client.db(process.env.DB_NAME);
  // const usersCollection: mongoDB.Collection = db.collection(
  //   process.env.USERS_COLLECTION_NAME
  // );
  const usersCollection = db.collection(process.env.USERS_COLLECTION_NAME);

  const moviesCollection = db.collection(process.env.MOVIES_COLLECTION_NAME);

  collections.movies = moviesCollection;
  collections.users = usersCollection;

  console.log(`Successfully connected to database: ${db.databaseName} `);
}
