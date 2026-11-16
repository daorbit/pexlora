import "server-only";
import { isValidObjectId } from "mongoose";
import { connectToDatabase } from "@/lib/db/mongoose";
import { User } from "@/models/User";

export async function findUserById(id: string) {
  if (!isValidObjectId(id)) return null;
  await connectToDatabase();
  return User.findById(id).lean();
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
