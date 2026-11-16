import "server-only";
import { isValidObjectId } from "mongoose";
import { connectToDatabase } from "@/lib/db/mongoose";
import { User } from "@/models/User";

export async function findUserByIdWithPassword(id: string) {
  if (!isValidObjectId(id)) return null;
  await connectToDatabase();
  return User.findById(id).select("+passwordHash").lean();
}

export async function findUserLimits(id: string) {
  if (!isValidObjectId(id)) return null;
  await connectToDatabase();
  return User.findById(id).select("limits").lean();
}

export async function updateUserName(id: string, name: string) {
  await connectToDatabase();
  await User.updateOne({ _id: id }, { $set: { name } });
}

export async function updateUserPassword(id: string, passwordHash: string) {
  await connectToDatabase();
  await User.updateOne({ _id: id }, { $set: { passwordHash } });
}

export async function findUserByEmailWithPassword(email: string) {
  await connectToDatabase();
  return User.findOne({ email: email.toLowerCase() })
    .select("+passwordHash")
    .lean();
}

export async function emailExists(email: string) {
  await connectToDatabase();
  return Boolean(await User.exists({ email: email.toLowerCase() }));
}

export async function createUser(data: {
  name: string;
  email: string;
  passwordHash: string;
}) {
  await connectToDatabase();
  return User.create(data);
}

export type GoogleProfile = {
  googleId: string;
  email: string;
  name: string;
  avatarUrl?: string;
};

export async function linkGoogleAccount(userId: string, profile: GoogleProfile) {
  await connectToDatabase();
  const owner = await User.findOne({ googleId: profile.googleId }).select("_id").lean();
  if (owner && owner._id.toString() !== userId) return false;

  const user = await User.findById(userId);
  if (!user) return false;

  user.googleId = profile.googleId;
  if (!user.avatarUrl && profile.avatarUrl) user.avatarUrl = profile.avatarUrl;
  await user.save();
  return true;
}

export async function findOrCreateGoogleUser(profile: GoogleProfile) {
  await connectToDatabase();
  const email = profile.email.toLowerCase();

  const linked = await User.findOne({ googleId: profile.googleId }).lean();
  if (linked) return { user: linked, isNew: false };

  const existing = await User.findOneAndUpdate(
    { email },
    { $set: { googleId: profile.googleId, avatarUrl: profile.avatarUrl } },
    { returnDocument: "after" },
  ).lean();
  if (existing) return { user: existing, isNew: false };

  const created = await User.create({
    name: profile.name,
    email,
    googleId: profile.googleId,
    avatarUrl: profile.avatarUrl,
  });
  return { user: created.toObject(), isNew: true };
}
