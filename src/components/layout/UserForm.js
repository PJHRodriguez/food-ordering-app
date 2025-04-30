"use client";
import { useState } from "react";
import EditableImage from "./EditableImage";
import { useProfile } from "../UseProfile";
import AddressInputs from "@/components/layout/AddressInputs";

export default function UserForm({ user, onSave }) {
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [city, setCity] = useState(user?.city || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === "phone") setPhone(value);
    if (propName === "streetAddress") setStreetAddress(value);
    if (propName === "postalCode") setPostalCode(value);
    if (propName === "city") setCity(value);
    if (propName === "country") setCountry(value);
  }
  return (
    <div className="flex gap-4">
      <div className="min-w-[90px]">
        <EditableImage link={image} setLink={setImage} />
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name,
            image,
            phone,
            streetAddress,
            city,
            postalCode,
            country,
            admin,
          })
        }
      >
        <label>Name</label>
        <input
          type="text"
          placeholder="First and last name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input type="email" value={user.email} disabled />
        <AddressInputs
          addressProps={{
            phone,
            streetAddress,
            country,
            city,
            postalCode,
          }}
          setAddressProps={handleAddressChange}
        />

        {loggedInUserData.admin && (
          <div>
            <label
              className="p-2  inline-flex items-center gap-4 mb-2 cursor-pointer bg-gray-50 shadow-md"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                className="mr-2"
                value={"1"}
                checked={admin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
