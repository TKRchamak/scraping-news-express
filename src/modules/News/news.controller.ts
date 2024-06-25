import { Request, Response } from "express";
import { readAreaList, updateArea } from "../Area/area.service";
import { IArea } from "../Area/area.interface";
import scrapeData from "../../utils/scrapingWithCheerio";
import { addManyNews, deleteNewsList, readNewsList } from "./news.service";

const updateNewsFUnc = async (division: string) => {
  try {
    const areaList = await readAreaList();

    const currentDivision = areaList.find(
      (area: IArea) => area.slug === division
    );

    if (!currentDivision) {
      throw new Error("Division not found");
    }

    const districtAreaList = areaList.filter(
      (area: IArea) => area.parentExternalId === currentDivision.externalId
    );

    console.log("Start collection updated for", division);
    for (let j = 0; j < districtAreaList.length; j++) {
      const currentDistrict = districtAreaList[j];
      const upazilaAreaList = areaList.filter(
        (area: IArea) => area.parentExternalId === currentDistrict.externalId
      );

      for (let k = 0; k < upazilaAreaList.length; k++) {
        const currentUpazila = upazilaAreaList[k];
        const newsList = await scrapeData(
          currentDivision.slug,
          currentDistrict.slug,
          currentUpazila.slug
        );

        if (newsList.length > 0) {
          // const finalNewsList = newsList.filter(
          //   (news) => news.publishedAt > currentUpazila.lastUpdate
          // );

          console.log(
            `${newsList.length} news inserted for ${currentUpazila.slug} -- ${currentDistrict.slug} -- ${currentDivision.slug}`
          );

          await addManyNews(newsList);
          await updateArea({
            _id: currentUpazila._id,
            lastUpdate: new Date().getTime(),
          });
        }

        if (!newsList || newsList.length === 0) {
          console.log(
            "No news found for",
            currentDivision.slug,
            currentDistrict.slug,
            currentUpazila.slug
          );
        }
      }
    }

    console.log("News collection updated successfully for", division);
  } catch (error) {
    console.log(error);
  }
};

export const updateNewsCollectionForDivision = async (
  req: Request,
  res: Response
) => {
  try {
    const { division } = req.params;
    updateNewsFUnc(division);

    res.status(200).json({
      status: "success",
      data: "News collection updating started",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};

export const getNewsList = async (req: Request, res: Response) => {
  try {
    const currentQuery: any = {};

    if (req.body.query.division) {
      currentQuery["newsLocation.division"] = req.body.query.division;
    }

    if (req.body.query.district) {
      currentQuery["newsLocation.district"] = req.body.query.district;
    }

    if (req.body.query.upazila) {
      currentQuery["newsLocation.upazila"] = req.body.query.upazila;
    }

    if (req.body.query.tags && req.body.query.tags.length > 0) {
      currentQuery["tags"] = { $in: req.body.query.tags };
    }

    const newsList = await readNewsList({
      query: currentQuery,
      sortField: req.body.sortField || "name",
      sortOrder: req.body.sortOrder || 1,
      // page: req.body.page ? req.body.page - 1 : 0,
      limit: req.body.limit || 1,
    });

    if (
      req.body.query.upazila &&
      req.body.query.district &&
      newsList.length === 0
    ) {
      const newCurrentQuery: any = {};

      if (req.body.query.division) {
        newCurrentQuery["newsLocation.division"] = req.body.query.division;
      }

      if (req.body.query.district) {
        newCurrentQuery["newsLocation.district"] = req.body.query.district;
      }

      if (req.body.query.tags && req.body.query.tags.length > 0) {
        newCurrentQuery["tags"] = { $in: req.body.query.tags };
      }

      const newsList = await readNewsList({
        query: newCurrentQuery,
        sortField: req.body.sortField || "name",
        sortOrder: req.body.sortOrder || 1,
        // page: req.body.page ? req.body.page - 1 : 0,
        limit: req.body.limit || 1,
      });

      return res.status(200).json({
        status: "success",
        data: newsList,
      });
    }

    res.status(200).json({
      status: "success",
      data: newsList,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};

export const removeNewsCollectionForDivision = async (
  req: Request,
  res: Response
) => {
  try {
    const { division } = req.params;

    const deleteStatus = await deleteNewsList({
      "newsLocation.division": division,
    });

    if (!((deleteStatus as any).deletedCount > 0)) {
      throw new Error("News collection not found");
    }

    console.log(deleteStatus);
    res.status(200).json({
      status: "success",
      data: "News collection deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};
