import { Schema, model } from "mongoose";
import { IArea } from "./area.interface";

const areaSchema = new Schema<IArea>(
  {
    name: { type: String, required: true },
    externalId: { type: String, required: true },
    parentExternalId: { type: String },
    slug: { type: String, required: true },
    lastUpdate: { type: Number },
  },
  {
    timestamps: true, // This option will automatically create 'created_at' and 'updated_at' fields
  }
);

const Area = model("Area", areaSchema);

export default Area;
