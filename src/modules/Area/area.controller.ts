import { Request, Response } from "express";
import { readAreaList, updateArea } from "./area.service";

export const getAreaList = async (req: Request, res: Response) => {
  try {
    const areaList = await readAreaList();

    res.status(200).json({
      status: "success",
      data: areaList,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};

export const updateAreaController = async (req: Request, res: Response) => {
  try {
    const payload = {
      _id: req.body.id,
      lastUpdate: req.body.lastUpdate,
    };
    const updateAreaData = await updateArea(payload);

    res.status(200).json({
      status: "success",
      data: updateAreaData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error,
    });
  }
};
