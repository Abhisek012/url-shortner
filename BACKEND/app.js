import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
dotenv.config("./.env");
import connectDb from "./SRC/config/mongodb.config.js";
import shortUrl from "./SRC/models/shorturl.model.js";
import shorturl from "./SRC/routes/shorturl.route.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))


// 1. Get the original URL → 2. Generate a short ID → 3. Create a document → 4. Save it to MongoDBY
app.use("/api/create",shorturl)

app.get("/:id",redirectfromshortUrl)




app.listen(3000,()=>{
    connectDb();
    console.log("Server is running on port http://localhost:3000/");
    
})

