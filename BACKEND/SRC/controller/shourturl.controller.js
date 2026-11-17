import { createshorturlWithoutUserservice } from "../services/shorturl.services.js";
import { getShortlUrl } from "../dao/shorturl.js";

export const createShortUrl = async (req, res , next) => {
  try {
    const { url } = req.body;
    if (!url) {
      // return res.status(400).send("URL is required") // this is a direct error. we can replace it with thrown error
      const error = new Error("Short URL not found.");
      error.statuCode = 404;
      throw error;
    }
    const shortUrl = await createshorturlWithoutUserservice(url);
    return res.send(process.env.APP_URL + shortUrl);
  } catch (error) {
    next(error)

  }
};

export const redirectfromshortUrl = async (req, res , next) => {
  try {
    const { id } = req.params;
    const url = await getShortlUrl(id);

    if (!url) {
      // return res.status(400).send("Short URL not found.")
      const error = new Error("Short URL not found.");
      error.statusCode = 404;
      throw error;
    }
    return res.redirect(url.fullUrl);
  } catch (error) {
    next(error);
  }
};
