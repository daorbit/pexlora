import mongoose from "mongoose";

export function refreshModelInDev(name: string) {
  if (process.env.NODE_ENV !== "production" && mongoose.models[name]) {
    mongoose.deleteModel(name);
  }
}
