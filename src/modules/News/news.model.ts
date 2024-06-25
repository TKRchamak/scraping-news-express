import { Schema, model } from "mongoose";
import { INews } from "./news.interface";

const newsSchema = new Schema<INews>(
  {
    headline: { type: String, required: true },
    contentHeading: { type: String },
    imageURL: { type: String },
    reportLink: { type: String, required: true },
    publishedAt: { type: Number, required: true },
    tags: { type: [String], required: true },
    newsLocation: {
      division: { type: String, required: true },
      district: { type: String, required: true },
      upazila: { type: String, required: true },
    },
  },
  {
    timestamps: true, // This option will automatically create 'created_at' and 'updated_at' fields
  }
);

const News = model("News", newsSchema);

export default News;
