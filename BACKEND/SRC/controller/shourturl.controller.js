import { createshorturlWithoutUserservice } from "../services/shorturl.services.js";
import { getShortlUrl } from "../dao/shorturl.js";

export const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).send("URL is required")
    }
    const shortUrl = await createshorturlWithoutUserservice(url);
    res.send(process.env.APP_URL + shortUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong. URL is not generated")

  }
};

export const redirectfromshortUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await getShortlUrl(id);

    if (!url) {
      return res.status(400).send("Short URL not found.")
    }
    res.redirect(url.fullUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.")
  }
};
