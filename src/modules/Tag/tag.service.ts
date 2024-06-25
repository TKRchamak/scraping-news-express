import { ITag } from "./tag.interface";
import Tag from "./tag.model";

export const insertTagList = async (tags: ITag[]): Promise<ITag[]> => {
  try {
    console.log(tags);
    const tagList = await Tag.insertMany(tags);
    return tagList;
  } catch (error) {
    throw error;
  }
};

export const insertOneTag = async (tag: ITag): Promise<ITag> => {
  try {
    const newTag = new Tag(tag);
    const tagData = await newTag.save();
    return tagData;
  } catch (error) {
    throw error;
  }
};

export const readTagList = async (): Promise<ITag[]> => {
  try {
    const tagList = await Tag.find({});
    return tagList;
  } catch (error) {
    throw error;
  }
};
