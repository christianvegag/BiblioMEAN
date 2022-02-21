import book from "../models/book.js";
import user from "../models/user.js";


const existingDateBook = async (req, res, next) => {
    if (!req.body.title || !req.body.author)
    return res.status(400).send({ message: "Incomplete data" });

    const existingTitle = await book.findOne({ title: req.body.title });
    const existingAuthor = await book.findOne({ author: req.body.author });

    if (existingTitle && existingAuthor)
      return res.status(500).send({ message: "The author and title is already registered" });

      next();
};

const existingUserBook = async (req, res, next) => {
  const userId = await user.findOne({ name: req.body.user });
  if (!userId) return res.status(500).send({ message: "User not found" });

  req.body.user = userId._id

  next ();
};

const status = async (req, res, next) => {

  const status = await book.findOne({ _id: req.body._id });

  if (status.dbStatus == false)
    return res.status(500).send({ message: "Book not found" });

    next();
};


export default {existingDateBook, existingUserBook, status}