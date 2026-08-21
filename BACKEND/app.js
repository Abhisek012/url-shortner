import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
dotenv.config("./.env");
import connectDb from "./SRC/config/mongodb.config.js";
import shortUrl from "./SRC/config/models/shorturl.model.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))


// 1. Get the original URL → 2. Generate a short ID → 3. Create a document → 4. Save it to MongoDBY
app.post("/api/create",async(req,res)=>{
    const {url} = req.body
    const shortUrlId = nanoid(7)
    const newUrl = new shortUrl({
        full_url:url,
        short_url: shortUrlId
    })
    await newUrl.save(); 
    res.send(shortUrlId)
})

app.get("/:id", async (req,res)=>{
    const {id} = req.params
    const url = await shortUrl.findOne({short_url:id})
    if(url){
        res.redirect(url.full_url)  
    }else{
        res.status(404).send("Not Found")
    }
})




app.listen(3000,()=>{
    connectDb();
    console.log("Server is running on port http://localhost:3000/");
    
})

