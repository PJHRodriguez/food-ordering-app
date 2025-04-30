"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserPage() {
  const { loading, data } = useProfile();
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-2xl ">Loading...</p>;
  }

  if (!data.admin) {
    return (
      <p className="text-center mt-10 text-2xl ">You are not authorized</p>
    );
  }

  return (
    <section className="mt-14 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-14">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-50 rounded-lg mb-2 p-1 px-4 flex items-center  shadow-md gap-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-900">
                  {!!user.name && <span>{user.name}</span>}
                  {!user.name && <span className="italic">No name</span>}
                </div>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div>
                <Link className="button" href={"/users/" + user._id}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
