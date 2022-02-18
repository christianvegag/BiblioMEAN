import book from "../models/book.js";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerBook = async (req, res) => {
  if (
    !req.body.description ||
    !req.body.publicationBook ||
    !req.body.languajeBook ||
    !req.body.pagesBook ||
    !req.body.editorial ||
    !req.body.category ||
    !req.body.priceLeasing ||
    !req.body.user ||
    !req.body.priceBook
  )
    return res.status(400).send({ message: "Incomplete data" });


  const userSchema = new book({
    title: req.body.title,
    author: req.body.author,
    description : req.body.description,
    publicationBook: req.body.publicationBook,
    languajeBook : req.body.languajeBook,
    pagesBook : req.body.pagesBook,
    editorial : req.body.editorial,
    category : req.body.category,
    priceLeasing : req.body.priceLeasing,
    priceBook : req.body.priceBook,
    statusLeasing : true,
    user: req.body.user,
    dbStatus: true,
  });

  const result = await userSchema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register book" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result.id,
          title: result.title,
          author: result.author,
          description: result.description,
          publicationBook: result.publicationBook,
          languajeBook: result.languajeBook,
          pagesBook: result.pagesBook,
          editorial: result.editorial,
          category: result.category,
          priceLeasing: result.priceLeasing,
          user: result.user,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Register error" });
  }
};

const listBook = async (req, res) => {
  let books = await book
    .find({ title: new RegExp(req.params["title"]) })
    .populate("user")
    .exec();
  if (books.length === 0)
    return res.status(400).send({ message: "No search results" });

  return res.status(200).send({ books });
};

export default { registerBook, listBook };
