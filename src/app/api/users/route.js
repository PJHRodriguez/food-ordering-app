import { User } from "@/models/user";
import mongoose from "mongoose";

export async function GET() {
  mongoose.connect(process.env.MONGODB_URI);
  const users = await User.find();
  return Response.json(users);
}
