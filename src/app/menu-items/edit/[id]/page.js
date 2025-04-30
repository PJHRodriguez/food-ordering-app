"use client";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteButton from "@/components/DeleteButton";

export default function EditMenuItemPage() {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((item) => item._id === id);
        if (item) {
          setMenuItem(item);
        }
      });
    });
  }, []);

  async function handleFormSubmit(e, data) {
    e.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
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

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error deleting...",
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
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      <div className="max-w-md mx-auto mt-4">
        <div className=" max-w-xs mx-auto">
          <DeleteButton label={"Delete"} onDelete={handleDeleteClick} />
        </div>
      </div>
    </section>
  );
}
