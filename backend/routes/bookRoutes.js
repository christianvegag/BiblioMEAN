import express from "express";
import bookController from "../controllers/bookController.js";
import bookValidate from "../middleware/bookValidate.js";

const router = express.Router();
router.post(
  "/registerBook",
  bookValidate.existingDateBook,
  bookValidate.existingUserBook,
  bookController.registerBook
);

router.get("/listBook/:title?", bookController.listBook);
router.put("/delete/:_id", bookController.deleteBook);
router.put(
  "/updateBook",
  bookValidate.status,
  bookValidate.existingUserBook,
  bookController.updateBook
);

export default router;
