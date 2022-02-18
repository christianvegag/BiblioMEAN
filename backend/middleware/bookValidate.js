import book from "../models/book.js";


const existingDateBook = async (req, res, next) => {
    if (!req.body.title || !req.body.author)
    return res.status(400).send({ message: "Incomplete data" });

    const existingTitle = await book.findOne({ title: req.body.title });
    const existingAuthor = await book.findOne({ author: req.body.author });

    if (existingTitle && existingAuthor)
      return res.status(500).send({ message: "The author and title is already registered" });

      next();
};

export default {existingDateBook}