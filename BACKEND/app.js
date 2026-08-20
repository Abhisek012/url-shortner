import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
dotenv.config("./.env");
import connectDb from "./SRC/config/mongodb.config.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.post("/api/create",(req,res)=>{
    const {url} = req.body

    console.log(url);
    res.send(nanoid(6));
    
    
})
app.get("/api/get",(req,res)=>{
    console.log("get data");
    
})




app.listen(3000,()=>{
    connectDb();
    console.log("Server is running on port http://localhost:3000/");
    
})

