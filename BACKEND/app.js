import express from "express";

import { nanoid } from "nanoid";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.post("/api/create",(req,res)=>{
    const {url} = req.body
    console.log(url);
    res.send(nanoid(6));
    
    
})
app.get("/api/ger",(req,res)=>{
    console.log("get data");
    
})




app.listen(3000,()=>{
    console.log("Server is running on port http://localhost:3000/");
    
})
