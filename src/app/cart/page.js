"use client";
import { CartContext } from "./src/components/AppContext";
import SectionHeaders from "./src/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Trash from "./src/components/icons/Trash";
import AddressInputs from "./src/components/layout/AddressInputs";
import { useProfile } from "./src/components/UseProfile";

export default function CartPage() {
  const { cartProducts, cartProductPrice, removeCartProduct } =
    useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };

      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  return (
    <section className="mt-14">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          {cartProducts?.length === 0 && (
            <div className="text-2xl font-semibold ">
              No products in your cart
            </div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                key={product._id}
                className="flex gap-4 items-center mb-2 border-b border-gray-400 py-2"
              >
                <div className="w-24">
                  <Image
                    src={product.image}
                    alt={""}
                    width={240}
                    height={240}
                  />
                </div>
                <div className="grow">
                  <h3 className="text-red-600  font-semibold ">
                    {product.name}
                  </h3>
                  {product.size && (
                    <div className="text-sm font-semibold text-gray-700">
                      Size:
                      <span className="ml-1">{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {product.extras.map((extra) => (
                        <div key={extra._id}>
                          {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    className="!p-2 bg-primary !text-white"
                    type="button"
                    onClick={() => removeCartProduct(index)}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-2 text-right pr-16 ">
            <span className="text-gray-500">Subtotal:</span>
            <span className="text-lg font-semibold pl-2">${total}</span>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md max-h-[375px]">
          <h2>Checkout</h2>
          <form>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay ${total}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
