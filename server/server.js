import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import users from "./routes/users.js";
import movies from "./apps/movies/router.js";
import * as dotenv from "dotenv";
import { connectToDatabase } from "./service/database.service.js";

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

connectToDatabase();

app.use("/records", records);
app.use("/users", users);
app.use("/movies", movies);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
