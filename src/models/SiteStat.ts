import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { refreshModelInDev } from "@/lib/db/define-model";

const siteStatSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    total: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type SiteStatDocument = InferSchemaType<typeof siteStatSchema>;

refreshModelInDev("SiteStat");

export const SiteStat: Model<SiteStatDocument> =
  (mongoose.models.SiteStat as Model<SiteStatDocument>) ?? mongoose.model<SiteStatDocument>("SiteStat", siteStatSchema);
