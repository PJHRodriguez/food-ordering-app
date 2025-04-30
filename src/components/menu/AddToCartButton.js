export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary !text-white px-8 py-2 rounded-full"
    >
      {hasSizesOrExtras ? (
        <span>Add to cart from ${basePrice}</span>
      ) : (
        <span>Add to cart ${basePrice}</span>
      )}
    </button>
  );
}
