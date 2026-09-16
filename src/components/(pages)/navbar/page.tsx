"use client";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import CartIcon from "@/components/CartIcon/CartIcon";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Products", href: "/products" },
  { label: "Brands", href: "/brands" },
  { label: "Wishlist", href: "/wishList" },
  { label: "Cart", href: "/cart" },
];

export default function Navbar({cartIcon}:{cartIcon:React.ReactNode}) {
  const { data: session } = useSession();
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function LogOut(){
    signOut({callbackUrl:'/login'})
  }


  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-extrabold text-primary-foreground">
              E
            </span>
            E-commerce
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className={
              path == "/"
                ? "text-green-500 bg-gray-200 rounded-2xl p-1 "
                : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            Home
          </Link>
          <Link
            href="/categories"
            className={
              path == "/categories"
                ? "text-green-500 bg-gray-200 rounded-2xl p-1 "
                : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            Categories
          </Link>
          <Link
            href="/products"
            className={
              path == "/products"
                ? "text-green-500 bg-gray-200 rounded-2xl p-1 "
                : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            Products
          </Link>
          <Link
            href="/brands"
            className={
              path == "/brands"
                ? "text-green-500 bg-gray-200 rounded-2xl p-1 "
                : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            Brands
          </Link>
          <Link
            href="/wishList"
            className={
              path == "/wishList"
                ? "text-green-500 bg-gray-200 rounded-2xl p-1 "
                : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            Wishlist
          </Link>
         <Link
            href="/cart"
            className={
              path == "/cart"
                ? "text-green-500 bg-gray-200 rounded-2xl p-1 "
                : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            Cart
          </Link>
        </nav>

        {session ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search products"
              className="hidden sm:inline-flex"
            >
              <Search className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Link href="/wishList">
                <Heart className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              className="relative"
            >
             {cartIcon}
            </Button>

            <div onClick={LogOut}>
              <span className="hover:text-red-500 cursor-pointer">signOut</span>
            </div>
          </div>
        ) : (
          <div className="hidden items-center gap-2 sm:flex">
            <Button variant="outline">
              <Link href="/login" className="inline-flex items-center gap-2">
                <User className="h-4 w-4" />
                Login
              </Link>
            </Button>
            <Button>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}
      </div>

      {isMenuOpen && (
        <nav className="border-t border-border/70 px-4 py-3 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={
              path == "/"
                ? "rounded-md bg-gray-200 p-2 text-green-500"
                : "rounded-md p-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            }
          >
            Home
          </Link>
          <Link
            href="/categories"
            onClick={() => setIsMenuOpen(false)}
            className={
              path == "/categories"
                ? "rounded-md bg-gray-200 p-2 text-green-500"
                : "rounded-md p-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            }
          >
            Categories
          </Link>
          <Link
            href="/products"
            onClick={() => setIsMenuOpen(false)}
            className={
              path == "/products"
                ? "rounded-md bg-gray-200 p-2 text-green-500"
                : "rounded-md p-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            }
          >
            Products
          </Link>
          <Link
            href="/brands"
            onClick={() => setIsMenuOpen(false)}
            className={
              path == "/brands"
                ? "rounded-md bg-gray-200 p-2 text-green-500"
                : "rounded-md p-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            }
          >
            Brands
          </Link>
          <Link
            href="/wishList"
            onClick={() => setIsMenuOpen(false)}
            className={
              path == "/wishList"
                ? "rounded-md bg-gray-200 p-2 text-green-500"
                : "rounded-md p-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            }
          >
            Wishlist
          </Link>
        <Link
            href="/cart"
            className={
              path == "/cart"
                ? "text-green-500 bg-gray-200 rounded-2xl p-1 "
                : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            Cart
          </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
