"use client";
import Left from "@/components/icons/Left";

import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {
  const { loading: profileLoading, data: profileData } = useProfile();

  const [redirectToItems, setRedirectToItems] = useState(false);

  async function handleFormSubmit(e, data) {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Saved successfully!",
      error: "Error saving data.",
    });

    setRedirectToItems(true);
  }
  if (redirectToItems) {
    redirect("/menu-items");
  }

  if (profileLoading) {
    return <p className="text-center mt-10 text-2xl ">Loading...</p>;
  }
  if (!profileData.admin) {
    return (
      <p className="text-center mt-10 text-2xl ">
        You are not authorized to view this page.
      </p>
    );
  }

  return (
    <section className="mt-14 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div>
        <Link
          href={"/menu-items"}
          className="button flex mt-8 hover:bg-gray-100 transition-all shadow-md"
        >
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm onSubmit={handleFormSubmit} menuItem={null} />
    </section>
  );
}
