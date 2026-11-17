import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl } from "../dao/shorturl.js";


const validateUrl = (url) => {
  try {
    const parsedUrl = new Url(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("Only HTTP and HTTPS URLs are allowed");
      }
  } catch (error) {
    if (error.message === "Only HTTP and HTTPS URLs are allowed") {
      throw error;
    }
    throw new Error("Invalid URL")
  }
}



export const createshorturlWithoutUserservice = async(url) =>{
    // if(!url.startsWith("http")){
    //     throw new Error("Invalid URL")
    // } //replacing this block with validate function

    validateUrl(url)
    const shortUrlId =  generateNanoId(8)    
    await saveShortUrl(shortUrlId , url )
    return shortUrlId
}



export const createshorturlWithUserservice = async (url, userId) => {
    // if (!url.startsWith("http")) {
    //     throw new Error("Invalid URL");
    // }
    // replacing this block with validate function

  validateUrl(url);
    if (!userId) {
          throw new Error("User authentication required");
    }

    const shortUrlId =  generateNanoId(8)    
    await saveShortUrl(shortUrlId , url , userId )
    return shortUrlId
}