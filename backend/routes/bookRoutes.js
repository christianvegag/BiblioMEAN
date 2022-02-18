import express from "express";
import bookController from "../controllers/bookController.js";
import bookValidate from "../middleware/bookValidate.js";
import bookUserValidate from "../middleware/bookUserValidate.js";

const router = express.Router();
router.post(
    "/registerBook",
    bookValidate.existingDateBook,
    bookUserValidate.existingUserBook,
    bookController.registerBook
  );
  
  router.get("/listBook/:title?", bookController.listBook);

export default router;
