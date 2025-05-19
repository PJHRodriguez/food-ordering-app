import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGODB_URI);
  const pass = body?.password;
  if (!pass?.length || pass?.length < 6) {
    new Error("Password must be at least 6 characters long");
  }
  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  const createdUser = await User.create(body);

  return Response.json(createdUser);
}
