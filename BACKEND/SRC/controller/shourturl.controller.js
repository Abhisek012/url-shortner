import { createshorturlWithoutUserservice } from "../services/shorturl.services.js";
import { getShortlUrl } from "../dao/shorturl.js";

export const createShourtUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if(!url){
      return res.status(400).send("URL is required")
    }
    const shortUrl = await createshorturlWithoutUserservice(url);
    res.send(process.env.APP_URL + shortUrl);
  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong.")

  }
};

export const redirectfromshortUrl = async (req, res) => {
  const { id } = req.params;
  const url = await getShortlUrl(id);
  res.redirect(url.fullUrl);
};
