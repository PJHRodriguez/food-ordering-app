"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Edit from "@/components/icons/Edit";
import Trash from "@/components/icons/Trash";
import DeleteButton from "@/components/DeleteButton";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((response) => {
      response.json().then((data) => {
        setCategories(data);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creatingPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      setEditedCategory(null);
      fetchCategories();
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(creatingPromise, {
      loading: editedCategory
        ? "Updating category"
        : "Creating new category...",
      success: editedCategory ? "Category updated" : "Category created",
      error: "Error creating category",
    });
  }
  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error deleting category",
    });
    fetchCategories();
  }

  if (profileLoading) {
    return <p className="text-center mt-10 text-2xl ">Loading...</p>;
  }
  if (!profileData.admin) {
    return (
      <p className="text-center mt-10 text-2xl ">You are not authorized</p>
    );
  }

  return (
    <section className="mt-14 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Update Category" : "New category name"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button type="submit" className="border border-primary">
              {editedCategory ? "Edit" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 flex justify-between rounded-lg p-2 px-4 shadow-md  mb-2 items-center hover:bg-gray-200 transition-all"
            >
              <span className="text-gray-800">{c.name}</span>

              <div className="flex gap-2  ">
                <button
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                  className="bg-blue-500 !px-2 !py-1 rounded-md !text-white hover:bg-blue-700 transition-all "
                >
                  <Edit className="w-5 h-5" />
                </button>

                <DeleteButton
                  label={<Trash className="w-5 h-5 text-white" />}
                  icon={true}
                  onDelete={() => handleDeleteClick(c._id)}
                ></DeleteButton>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
