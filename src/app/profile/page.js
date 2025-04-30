"use client";
import { useSession } from "next-auth/react";
import UserTabs from "@/components/layout/UserTabs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserForm from "@/components/layout/UserForm";

export default function Profile() {
  const session = useSession();

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFecthed, setProfileFetched] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data?.admin || false);
          setProfileFetched(true);
          console.log(data);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(e, data) {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile updated!",
      error: "Error updating profile!",
    });
  }

  if (status === "loading" || !profileFecthed) {
    return <p className="text-center mt-10 text-2xl ">Loading...</p>;
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-14">
      {!!isAdmin && <UserTabs isAdmin={isAdmin} />}
      {!isAdmin && (
        <h1 className="text-center text-primary font-bold text-4xl mb-4">
          Profile
        </h1>
      )}
      <div className="max-w-2xl mx-auto mt-2 ">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}
