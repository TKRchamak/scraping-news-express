import { Types } from "mongoose";
import { INews } from "./news.interface";
import News from "./news.model";

export const addManyNews = async (news: INews[]) => {
  try {
    const newsData = await News.insertMany(news);
    return newsData;
  } catch (error) {
    throw error;
  }
};

export const readNewsList = async ({
  // page,
  limit,
  query,
  sortField,
  sortOrder,
}: {
  query: { [key: string]: string | Types.ObjectId };
  sortField: string;
  sortOrder: 1 | -1;
  limit: number;
  // page: number
}) => {
  try {
    //     const newsList = await News.find({
    //       ...query,
    //     })
    //       .sort({ [sortField]: sortOrder })
    //       .limit(limit);

    const newsList = await News.aggregate([
      { $match: query },
      { $sort: { [sortField]: sortOrder } },
      {
        $facet: {
          data: [{ $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    return newsList;
  } catch (error) {
    throw error;
  }
};

export const deleteNewsList = async (query: {
  [key: string]: string | Types.ObjectId;
}) => {
  try {
    const deleteStatus = await News.deleteMany(query);
    return deleteStatus;
  } catch (error) {
    throw error;
  }
};

export const findAllUniqueTags = async () => {
  try {
    const tagList = await News.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags" } },
      { $project: { _id: 0, tag: "$_id" } },
    ]);

    return tagList;
  } catch (error) {
    throw error;
  }
};
