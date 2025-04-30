"use client";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const { loading, data } = useProfile();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const updatingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          _id: id,
        }),
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(updatingPromise, {
      loading: "Updating...",
      success: "Updated complete",
      error: " Error updating...",
    });
  }

  if (loading) {
    return <p className="text-center mt-10 text-2xl ">Loading...</p>;
  }

  if (!data.admin) {
    return (
      <p className="text-center mt-10 text-2xl ">You are not authorized</p>
    );
  }

  return (
    <section className="mt-14 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <div className="mt-14">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}
