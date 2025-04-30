import { useEffect, useState } from "react";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || "");
  const [categories, setCategories] = useState([]);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      className="mt-8"
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          category,
          basePrice,
          sizes,
          extraIngredientPrices,
        })
      }
    >
      <div className="grid items-start gap-4 grid-cols-[.4fr_.6fr]">
        <div className="">
          <EditableImage
            link={image}
            setLink={setImage}
            width={140}
            height={140}
          />
        </div>
        <div className="grow">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Category</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />
          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add item size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra ingredients"}
            addLabel={"Add ingredients price"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />
        </div>
      </div>
      <div className="max-w-md mx-auto mt-4">
        <div className=" max-w-xs mx-auto">
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
