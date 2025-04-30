import Trash from "@/components/icons/Trash";
import Plus from "@/components/icons/Plus";
import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";
import { useState } from "react";
export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  const [isOpen, setIsOpen] = useState(false);
  function addProp() {
    setProps((prev) => {
      return [...prev, { name: "", price: "" }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }
  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }
  return (
    <div className="bg-gray-100 shadow-lg p-2 rounded-lg mb-7">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex !p-1 mb-1 bg-white shadow-sm !border-0 !justify-start "
      >
        {isOpen && <ChevronUp />}
        {!isOpen && <ChevronDown />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div key={index} className="flex gap-2">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Size name"
                  value={size.name}
                  onChange={(ev) => editProp(ev, index, "name")}
                />
              </div>
              <div>
                <label>Extra price</label>
                <input
                  type="text"
                  placeholder="Extra price"
                  value={size.price}
                  onChange={(ev) => editProp(ev, index, "price")}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeProp(index)}
                  className="bg-red-500 !text-white mt-5 !px-2"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          className="bg-white items-center "
          onClick={addProp}
        >
          <Plus className="w-4 h-4" />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}
