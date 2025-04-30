const { Schema, models, model, default: mongoose } = require("mongoose");

const ExtraPriceSchema = new Schema({
  name: { type: String },
  price: { type: Number },
});

const MenuItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: mongoose.Types.ObjectId },
    basePrice: { type: Number },
    sizes: { type: [ExtraPriceSchema] },
    extraIngredientPrices: { type: [ExtraPriceSchema] },
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
