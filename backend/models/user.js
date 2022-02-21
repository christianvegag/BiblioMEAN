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
    modifyDate: { type: Date, default: Date.now },
    dbStatus: Boolean,
});

const user = mongoose.model("users", userSchema);

export default user;