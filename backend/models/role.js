import mongoose from "mongoose";

const rolesSchema = new mongoose.Schema({
  name: String,
  description: String,
  registerDate: { type: Date, default: Date.now },
  dbStatus: true,
});

const role = mongoose.model("roles", rolesSchema); //esquema se garda en coleccion de mongodb

export default role;
