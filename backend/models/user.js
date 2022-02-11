import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    adress : String,
    phone : Number,
    email: String,
    password: String,
    description : String,
    role: {type: mongoose.Schema.ObjectId, ref: "roles"},
    registerDate : {type: Date, default: Date.now},
    dbStatus: true,
});

const user = mongoose.model("users", userSchema); //esquema se garda en coleccion de mongodb

export default user;