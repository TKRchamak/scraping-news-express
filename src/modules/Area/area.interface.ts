import { ObjectId } from "mongoose";

export interface IArea {
  _id: ObjectId;
  name: string;
  externalId: string;
  parentExternalId: string;
  slug: string;
  lastUpdate: number;
  createdAt: Date;
  updatedAt: Date;
}
