import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description : String,
    publicationBook: Date,
    languajeBook : String,
    pagesBook : Number,
    editorial : String,
    category : String,
    priceLeasing : Number,
    priceBook : Number,
    statusLeasing : Boolean,
    user: {type: mongoose.Schema.ObjectId, ref: "users"},
    registerDate : {type: Date, default: Date.now},
    modifyDate: { type: Date, default: Date.now },
    dbStatus: Boolean,
});

const book = mongoose.model("books", bookSchema); //esquema se garda en coleccion de mongodb

export default book;