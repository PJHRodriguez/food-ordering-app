"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";
import Bars from "@/components/icons/Bars";
import Close from "@/components/icons/Close";
export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  const { cartProducts } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center gap-8">
        <Link className="text-primary font-semibold text-2xl" href="/">
          ST PIZZA
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 text-gray-500 font-semibold">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        {/* Mobile Hamburger */}
        <div className="lg:hidden ">
          <button onClick={toggleMenu} className="border-none">
            <Bars />
          </button>
        </div>
      </div>

      {/* Right side (Auth + Cart) */}
      <nav className="text-gray-500 flex items-center gap-4 font-semibold">
        {status === "authenticated" ? (
          <>
            <Link href="/profile" className="whitespace-nowrap">
              Hello, {userName}
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-primary !text-white px-6 py-2 rounded-full"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link
              href="/register"
              className="bg-primary text-white px-6 py-2 rounded-full"
            >
              Register
            </Link>
          </>
        )}

        <Link href="/cart" className="relative">
          <ShoppingCart />
          <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-2 rounded-full">
            {cartProducts.length}
          </span>
        </Link>
      </nav>

      {/* Fullscreen Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-8">
          <div className="flex justify-end">
            <button onClick={closeMenu} aria-label="Close menu">
              <Close />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-8 text-gray-700 font-semibold mt-10 text-xl">
            <Link href="/" onClick={closeMenu}>
              Home
            </Link>
            <Link href="/menu" onClick={closeMenu}>
              Menu
            </Link>
            <Link href="/#about" onClick={closeMenu}>
              About
            </Link>
            <Link href="/#contact" onClick={closeMenu}>
              Contact
            </Link>

            {status === "authenticated" ? (
              <button
                onClick={() => {
                  closeMenu();
                  signOut();
                }}
                className="bg-primary !text-white px-6 py-2 rounded-full"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" onClick={closeMenu}>
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="bg-primary text-white px-6 py-2 rounded-full"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
