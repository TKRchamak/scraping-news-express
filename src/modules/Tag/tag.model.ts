import { Schema, model } from "mongoose";
import { ITag } from "./tag.interface";

const tagSchema = new Schema<ITag>(
  {
    tag: { type: String, required: true },
  },
  {
    timestamps: true, // This option will automatically create 'created_at' and 'updated_at' fields
  }
);

const Tag = model("Tag", tagSchema);

export default Tag;
