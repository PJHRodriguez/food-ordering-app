export default function MenuItem() {
  return (
    <div className="bg-gray-100 p-4 rounded-lg text-center shadow-md hover:shadow-2xl hover:bg-white transition-all ">
      <div className="text-center">
        <img
          src={"/pizza.png"}
          alt="pizza"
          className="max-h-auto max-h-24 mx-auto block"
        />
      </div>
      <h4 className="font-semibold my-3">Pepperoni pizza</h4>
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
      </p>
      <button className="mt-4 bg-primary text-white px-8 py-2 rounded-full">
        Add to cart $12
      </button>
    </div>
  );
}
