import fs from "fs";
import Area from "../modules/Area/area.model";

async function seedData(jsonPath: string) {
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

  //   console.log(jsonData[0]);

  const existingData = await Area.find();
  if (existingData.length === 0) {
    await Area.insertMany(jsonData);
    console.log("Data seeded successfully.");
  } else {
    console.log("Data already exists.");
  }
}

export default seedData;
