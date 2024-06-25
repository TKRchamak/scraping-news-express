import puppeteer from "puppeteer";

const URL = "https://www.google.com/";
// const URL =
//   "https://www.prothomalo.com/bangladesh/district-news/ঢাকা-বিভাগ/ঢাকা/দোহার";

const scraper = async () => {
  console.log("I am scraper function");
  const browser = await puppeteer.launch();
  console.log("step 1 --> launch browser");

  const page = await browser.newPage();
  console.log("step 2 --> open newPage");

  await page.goto(URL);
  console.log("step 3 --> open url");

  console.log(page);

  //   await page.waitForNavigation({ waitUntil: "networkidle0", timeout: 60000 });
  //   await page.waitForSelector("p");
  //   console.log("step 4 --> open url");

  //   page.screenshot({ path: "example.png" });
  //   const data = await page.evaluate(() => {
  //     const title = document.querySelector("h1").innerText;
  //     const content = document.querySelector(".content").innerText;
  //     return { title, content };
  //   });
  await browser.close();
  //   return data;
};

export default scraper;
