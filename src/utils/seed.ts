import fs from "fs";
import Area from "../modules/Area/area.model";
import { updateNewsFUnc } from "../modules/News/news.controller";
import { seedTags } from "./seedTags";
import News from "../modules/News/news.model";

async function seedData(jsonPath: string) {
  try {
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    console.log("-------------------------------------------");
    console.log("-------------Area seeded Start-------------");
    await Area.deleteMany({});
    await Area.insertMany(jsonData);
    console.log("-------------Area seeded successfully-------------");
    console.log("--------------------------------------------------\n");

    await News.deleteMany({});
    const divisionList = await Area.find({ parentExternalId: null });
    for (let index = 0; index < divisionList.length; index++) {
      const element = divisionList[index];
      await updateNewsFUnc(element.slug);
    }

    console.log("-------------Tag seeded start-------------");
    await seedTags();
    console.log("-------------Area seeded successfully-------------\n");

    console.log("Data seeded successfully.");
  } catch (error) {
    console.log("error ocurred while seeding data.");
  }
}

export default seedData;
