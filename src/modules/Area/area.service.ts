import { IArea } from "./area.interface";
import Area from "./area.model";

export const readAreaList = async (): Promise<IArea[]> => {
  try {
    const areaList = await Area.find({});

    return areaList as IArea[];
  } catch (error) {
    throw error;
  }
};

export const updateArea = async (
  payload: Pick<IArea, "_id" | "lastUpdate">
): Promise<IArea> => {
  try {
    const updatedArea = await Area.findByIdAndUpdate(payload._id, payload, {
      new: true,
      runValidators: true,
    });
    return updatedArea as IArea;
  } catch (error) {
    throw error;
  }
};
