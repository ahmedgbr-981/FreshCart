import Link from "next/link";

const shopLinks = [
  { label: "All products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
];

const accountLinks = [
  { label: "My account", href: "/profile" },
  { label: "My orders", href: "/allorders" },
  { label: "Wishlist", href: "/wishList" },
  { label: "Cart", href: "/cart" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-green-600 text-sm font-extrabold text-white">
              FC
            </span>
            FreshCart
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
            Everyday finds for wherever life takes you.
          </p>
        </div>

        <nav aria-label="Shop" className="flex flex-col items-start gap-3">
          <h2 className="mb-1 text-sm font-semibold text-white">Shop</h2>
          {shopLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm transition-colors hover:text-green-400">
              {link.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Your account" className="flex flex-col items-start gap-3">
          <h2 className="mb-1 text-sm font-semibold text-white">Your account</h2>
          {accountLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm transition-colors hover:text-green-400">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-slate-500 sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} FreshCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}