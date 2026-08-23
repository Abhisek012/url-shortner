
import { createshorturlWithoutUserservice } from "../services/shorturl.services.js";

export const createShourtUrl = async(req,res)=>{
    const {url} = req.body
    const shortUrl = await createshorturlWithoutUserservice(url)
    res.send(process.env.APP_URL + shortUrl)

}