import ShortUrl from "../models/shorturl.model.js";

export const saveShortUrl = async (shortUrlId, url, userId) => {
  const newUrl = new ShortUrl({
    fullUrl: url,
    shortUrl: shortUrlId,
  });
  if (userId) {
    newUrl.user = userId;
  }
  await newUrl.save();
};
