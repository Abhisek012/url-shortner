import express from "express";
import { createShourtUrl } from "../controller/shourturl.controller.js";
const router = express.Router();

router.post("/",createShourtUrl)

export default router;