import { NextApiRequest, NextApiResponse } from "next";
import {
  HackerNewsApiItem,
  HackerNewsLinkHolder,
} from "../../types/hackernews";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { hackerNewsFeed } = req.query;

  if (!hackerNewsFeed || typeof hackerNewsFeed !== "string") {
    return res.status(400).send("Bad request, please include feed type");
  }

  try {
    const hackerNewsData = await getHackerNewsData(hackerNewsFeed);
    return res.status(200).json(hackerNewsData);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

export const getHackerNewsData = async (hackerNewsFeed: string) => {
  let hackerNewsUrl;

  switch (hackerNewsFeed) {
    case "Ask":
      hackerNewsUrl = "https://hacker-news.firebaseio.com/v0/askstories.json";
      break;
    case "Show":
      hackerNewsUrl = "https://hacker-news.firebaseio.com/v0/showstories.json";
      break;
    default:
      hackerNewsUrl = "https://hacker-news.firebaseio.com/v0/beststories.json";
  }

  const hackerNewsItemUrl = "https://hacker-news.firebaseio.com/v0/item/";

  try {
    const takenAsks = 25;
    const topAsksRes = await fetch(hackerNewsUrl);
    const topAsks = (await topAsksRes.json()) as number[];
    const topAskTruncated = topAsks.slice(0, takenAsks);
    const askLinks: HackerNewsLinkHolder[] = [];

    await Promise.all(
      topAskTruncated.map(async (askId) => {
        const askDetailRes = await fetch(`${hackerNewsItemUrl}${askId}.json`);
        const askDetail = (await askDetailRes.json()) as HackerNewsApiItem;
        askLinks.push({
          title: askDetail.title,
          url: `https://news.ycombinator.com/item?id=${askDetail.id}`,
        });
      })
    );

    return askLinks;
  } catch (err) {
    throw new Error(err as string);
  }
};
