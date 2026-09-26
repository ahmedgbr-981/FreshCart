"use client";
import Link from "next/link";
import { ChevronDown, Heart, Menu, Search, Settings, ShoppingCart, User, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CartIcon from "@/components/CartIcon/CartIcon";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Products", href: "/products" },
  { label: "Brands", href: "/brands" },
  { label: "Wishlist", href: "/wishList" },
  { label: "Cart", href: "/cart" },
];

const categoryLinks = [
  { label: "All cats", href: "/categories" },
  { label: "Electronics", href: "/categoreyProduct?categoryId=6439d2d167d9aa4ca970649f" },
  { label: "Men's fashion", href: "/categoreyProduct?categoryId=6439d5b90049ad0b52b90048" },
  { label: "Women's fashion", href: "/categoreyProduct?categoryId=6439d58a0049ad0b52b9003f" },
];

export default function Navbar({cartIcon,wishlistCount:initialWishlistCount}:{cartIcon:React.ReactNode;wishlistCount:number}) {
  const { data: session } = useSession();
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(initialWishlistCount);

  useEffect(() => {
    function handleWishlistChange(event: Event) {
      const { delta } = (event as CustomEvent<{ delta: number }>).detail;
      setWishlistCount((count) => Math.max(0, count + delta));
    }

    window.addEventListener("wishlist:change", handleWishlistChange);
    return () => window.removeEventListener("wishlist:change", handleWishlistChange);
  }, []);

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
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-green-600"
          >
            <span className="bg-green-600 flex h-9 w-9 items-center justify-center rounded-lg  text-sm font-extrabold text-primary-foreground">
              FC
            </span>
            FreshCart
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className={
              path == "/"
                ? "text-green-500  rounded-2xl p-1 "
                : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            Home
          </Link>
          <div className="relative">
            <button
              type="button"
              aria-expanded={isCategoriesOpen}
              aria-controls="desktop-category-menu"
              onClick={() => setIsCategoriesOpen((isOpen) => !isOpen)}
              className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-foreground ${path.startsWith("/categories") ? "text-green-600" : "text-muted-foreground"}`}
            >
              Categories
              <ChevronDown
                size={15}
                aria-hidden="true"
                className={`transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isCategoriesOpen && (
              <div
                id="desktop-category-menu"
                className="absolute left-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-md border border-border bg-background py-1 shadow-lg"
              >
                {categoryLinks.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    onClick={() => setIsCategoriesOpen(false)}
                    className="block px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/products"
            className={
              path == "/products"
                ? "text-green-500  rounded-2xl p-1 "
                : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            Products
          </Link>
          <Link
            href="/brands"
            className={
              path == "/brands"
                ? "text-green-500  rounded-2xl p-1 "
                : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            Brands
          </Link>
          <Link
            href="/wishList"
            className={
              path == "/wishList"
                ? "text-green-500  rounded-2xl p-1 "
                : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            Wishlist
          </Link>
         <Link
            href="/cart"
            className={
              path == "/cart"
                ? "text-green-500  rounded-2xl p-1 "
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

            <div className="relative">
              <button
                type="button"
                aria-label="Open account menu"
                aria-expanded={isAccountOpen}
                aria-controls="account-menu"
                onClick={() => setIsAccountOpen((isOpen) => !isOpen)}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <User className="h-4 w-4" aria-hidden="true" />
              </button>
              {isAccountOpen && (
                <div
                  id="account-menu"
                  className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-md border border-border bg-background py-1 shadow-lg"
                >
                  <div className="border-b border-border px-4 py-3">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {session.user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setIsAccountOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <UserRound size={16} aria-hidden="true" />
                    My profile
                  </Link>
                  <Link
                    href="/allorders"
                    onClick={() => setIsAccountOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ShoppingCart size={16} aria-hidden="true" />
                    My orders
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setIsAccountOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Settings size={16} aria-hidden="true" />
                    Settings
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/wishList"
              aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} items` : ""}`}
              title="Wishlist"
              className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                  {wishlistCount}
                </span>
              )}
            </Link>

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
          <div>
            <button
              type="button"
              aria-expanded={isCategoriesOpen}
              aria-controls="mobile-category-menu"
              onClick={() => setIsCategoriesOpen((isOpen) => !isOpen)}
              className={`flex w-full items-center justify-between rounded-md p-2 text-left text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${path.startsWith("/categories") ? "bg-gray-200 text-green-600" : "text-muted-foreground"}`}
            >
              Categories
              <ChevronDown
                size={16}
                aria-hidden="true"
                className={`transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isCategoriesOpen && (
              <div id="mobile-category-menu" className="ml-3 mt-1 border-l border-border pl-3">
                {categoryLinks.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    onClick={() => {
                      setIsCategoriesOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
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
