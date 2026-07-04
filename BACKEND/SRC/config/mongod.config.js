import mongoose from "mongoose";

const connectDb = async() => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URI,{
            userNewParser: true,
            userUndefinedTopology: true,
        })
    }
    catch(error){
        console.error(`Error: $(error.message)`);
        process.exit(1);
        
    }
}



export default connectDb;