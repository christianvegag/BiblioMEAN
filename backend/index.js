import express from "express";
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/book", bookRoutes);



app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: ", process.env.PORT)
);

db.dbConnection();
