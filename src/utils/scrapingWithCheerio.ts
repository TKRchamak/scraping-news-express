import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import { INews } from "../modules/News/news.interface";

// Function to scrape data
const scrapeData = async (
  division: string,
  district: string,
  upazila: string
) => {
  try {
    if (!division || !district || !upazila) {
      throw new Error("Bad Request");
    }

    const URL = `https://www.prothomalo.com/bangladesh/district-news/${division}/${district}/${upazila}`;
    // const URL = `https://www.prothomalo.com/bangladesh/district-news/ঢাকা-বিভাগ/ঢাকা/দোহার`;

    // Fetch the HTML of the page
    const { data } = await axios.get(URL);

    if (!data) {
      throw new Error("Data not found");
    }

    // Load the HTML into cheerio
    const $ = cheerio.load(data);
    const text = $("#static-page");

    if (!text) {
      throw new Error("Data not found");
    }

    const contentData = await JSON.parse(text.text());

    // fs.writeFileSync(
    //   "report.json",
    //   JSON.stringify(contentData.qt.data, null, 2)
    // );

    if (!contentData?.qt?.data) {
      throw new Error("Data not found");
    }

    const currentNewsList = contentData.qt.data.stories;

    const newsList: INews[] = [];

    currentNewsList.map((element: any) => {
      const findTags = element.tags.filter(
        (tag: any) => tag.type === "story-tag"
      );
      const namesArray = findTags.map((obj: any) => obj.name);

      if (!element["published-at"]) {
        console.log(element);
      }

      const newsData = {
        headline: element.headline,
        contentHeading: element.metadata.excerpt,
        imageURL: element["hero-image-s3-key"]
          ? `https://images.prothomalo.com/${element["hero-image-s3-key"]}`
          : "",
        reportLink: element.url,
        publishedAt: element["published-at"],
        tags: namesArray,
        newsLocation: {
          division: division,
          district: district,
          upazila: upazila,
        },
      };

      newsList.push(newsData);
    });

    return newsList;
  } catch (error) {
    // throw new Error(`Error scraping data: ${error}`);
    // console.log(error);
    return [];
  }
};

export default scrapeData;
