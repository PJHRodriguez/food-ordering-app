"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }
  return (
    <section className="mt-14">
      <h1 className="text-center text-primary font-bold text-4xl mb-4">
        Register
      </h1>
      {userCreated && (
        <div className="my-4 text-center ">
          User, created successfully. <br /> You can now login with your email
          and password.
          <br />
          <Link className="text-primary font-semibold" href={"/login"}>
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          <span className="text-red-800 font-semibold">
            An Error has ocurred
          </span>
          <br />
          Please try again or use another email.
        </div>
      )}

      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          disabled={creatingUser}
          type="text"
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          disabled={creatingUser}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit">Register</button>
        <div className="my-4 text-center text-gray-500 ">
          {" "}
          or login with prodiver
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          disabled={creatingUser}
          className="flex gap-4 justify-center"
        >
          <Image src={"/google.png"} width={24} height={24} alt={""} />
          Login with google
        </button>
        <div className="my-4 text-center text-gray-500 border-t mt-4 pt-4 border-gray-300 ">
          Existing account?{" "}
          <Link className="text-primary font-semibold " href={"/login"}>
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
