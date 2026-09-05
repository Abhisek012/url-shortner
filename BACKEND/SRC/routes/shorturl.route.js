import express from "express";
import { createShortUrl } from "../controller/shourturl.controller.js";
const router = express.Router();

router.post("/",createShortUrl)

export default router;