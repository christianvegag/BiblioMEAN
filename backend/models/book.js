import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description : String,
    publicationBook: Date,
    languajeBook : String,
    pagesBook : Number,
    editorial : String,
    Category : String,
    priceLeasing : Number,
    priceBook : Number,
    statusLeasing : Boolean,
    registerDate : {type: Date, default: Date.now},
    dbStatus: true,
});

const book = mongoose.model("books", bookSchema); //esquema se garda en coleccion de mongodb

export default book;