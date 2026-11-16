import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl } from "../dao/shorturl.js";

export const createshorturlWithoutUserservice = async(url) =>{
    if(!url.startsWith("http")){
        throw new Error("Invalid URL")
    }
    const shortUrlId =  generateNanoId(8)    
    await saveShortUrl(shortUrlId , url )
    return shortUrlId
}



export const createshorturlWithUserservice = async (url, userId) => {
    if (!url.startsWith("http")) {
        throw new Error("Invalid URL");
    }
    if (!userId) {
          throw new Error("User authentication required");
    }

    const shortUrlId =  generateNanoId(8)    
    await saveShortUrl(shortUrlId , url , userId )
    return shortUrlId
}