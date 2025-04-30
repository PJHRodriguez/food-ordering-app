"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import Right from "@/components/icons/Right";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (profileLoading) {
    return <p className="text-center mt-10 text-2xl ">Loading...</p>;
  }
  if (!profileData.admin) {
    return (
      <p className="text-center mt-10 text-2xl ">You are not authorized</p>
    );
  }
  1;

  return (
    <section className="mt-14 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex" href={"/menu-items/new"}>
          <span>Create new menu item</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-4">Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-10">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={"/menu-items/edit/" + item._id}
                key={item._id}
                className="button mb-1 bg-gray-100 border-none shadow-lg flex-col items-center "
              >
                <div className="relative"></div>
                <Image
                  src={item?.image}
                  alt={"image item"}
                  width={200}
                  className="rounded-lg"
                  height={200}
                />
                {item.name}
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
