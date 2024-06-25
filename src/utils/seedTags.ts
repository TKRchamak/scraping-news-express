import { insertTagList } from "../modules/Tag/tag.service";
import { findAllUniqueTags } from "../modules/News/news.service";
import Tag from "../modules/Tag/tag.model";

export const seedTags = async () => {
  try {
    const existingData = await Tag.find();

    if (existingData.length > 0) {
      console.log("Tags are already seeded.");
      return;
    }

    const tagList = await findAllUniqueTags();
    if (tagList.length) {
      await insertTagList(tagList);
      console.log("Tag seeding is completed.");
    }
  } catch (error) {
    console.log("Error is occurred during seeding tags.");
  }
};
