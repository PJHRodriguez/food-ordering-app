"use client";

import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });

    setLoginInProgress(false);
  }
  return (
    <section className="mt-14">
      <h1 className="text-center text-primary font-bold text-4xl mb-4">
        Login
      </h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          disabled={loginInProgress}
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          disabled={loginInProgress}
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={loginInProgress}>
          Login
        </button>
        <div className="my-4 text-center text-gray-500 ">
          {" "}
          or login with prodiver
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center cursor-pointer"
        >
          <Image src={"/google.png"} width={24} height={24} alt={""} />
          Login with google
        </button>
      </form>
    </section>
  );
}
