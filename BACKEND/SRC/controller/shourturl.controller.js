import { createshorturlWithoutUserservice } from "../services/shorturl.services.js";
import { getShortlUrl } from "../dao/shorturl.js";

export const createShourtUrl = async (req, res) => {
  const { url } = req.body;
  const shortUrl = await createshorturlWithoutUserservice(url);
  res.send(process.env.APP_URL + shortUrl);
};

export const redirectfromshortUrl = async (req, res) => {
  const { id } = req.params;
  const url = await getShortlUrl(id);
  res.redirect(url);
};
