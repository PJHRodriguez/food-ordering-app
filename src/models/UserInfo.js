const { Schema, models, model } = require("mongoose");

const UserInfoSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: "" },
    streetAddress: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserInfo = models?.UserInfo || model("UserInfo", UserInfoSchema);
