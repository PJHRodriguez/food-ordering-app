import AddToCartButton from "@/components/menu/AddToCartButton";
export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;

  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;
  return (
    <div className="bg-gray-100 p-4 rounded-lg text-center shadow-md hover:shadow-2xl hover:bg-white transition-all ">
      <div className="text-center">
        <img
          src={image}
          alt={name}
          className="max-h-auto max-h-24 mx-auto block"
        />
      </div>
      <h4 className="font-semibold my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <AddToCartButton
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
      />
    </div>
  );
}
