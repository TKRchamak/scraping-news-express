import { ObjectId } from "mongoose";

export interface ITag {
  _id: ObjectId;
  tag: string;
}
