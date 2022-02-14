import express from "express"
import roleController from "../controllers/roleController.js"

const router = express.Router();


router.post("/registerRole", roleController.registerRole)

export default router;