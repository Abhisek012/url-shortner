import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config("./.env");
import connectDb from "./SRC/config/mongodb.config.js";
import { redirectfromshortUrl } from "./SRC/controller/shourturl.controller.js";
import short_url from "./SRC/routes/shorturl.route.js"
import errorMiddleware from "./SRC/middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))


// 1. Get the original URL → 2. Generate a short ID → 3. Create a document → 4. Save it to MongoDB
app.use("/api/create", short_url)

app.get("/:id",redirectfromshortUrl)

app.use(errorMiddleware);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT}`);
});
