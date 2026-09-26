
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { AllProducts } from "@/types/allProducts.types";
import WishListIcon from "@/components/WishListIcon/WishListIcon";
import AddToCartBtn from "@/components/addToCartBtn/AddToCartBtn";

export default function ProductCard({ product, isWish }: { product: AllProducts; isWish: boolean }) {
  return (
    <article className="group min-w-0">
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#f0f3ef]">
        <Link
          href={`/products/${product.id}`}
          aria-label={`View ${product.title}`}
          className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          <Image
            fill
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 20vw"
            src={product.imageCover}
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]"
            alt={product.title}
          />
        </Link>
        <div className="absolute right-2 top-2 z-10">
          <WishListIcon id={product.id} isWish={isWish} />
        </div>
      </div>

      <div className="pt-3">
        <p className="truncate text-xs font-medium text-slate-500">
          {product.category.name}
        </p>
        <Link href={`/products/${product.id}`} className="mt-1 block">
          <h2 className="line-clamp-2 min-h-11 text-sm font-semibold leading-5 text-slate-950 transition-colors group-hover:text-emerald-800 sm:text-base">
            {product.title}
          </h2>
        </Link>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="font-semibold tabular-nums text-slate-950">
            {product.price.toLocaleString()} <span className="text-xs font-medium text-slate-500">EGP</span>
          </p>
          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-slate-600">
            <Star size={14} fill="currentColor" className="text-amber-500" aria-hidden="true" />
            {product.ratingsAverage}
          </span>
        </div>
        <AddToCartBtn proId={product._id} />
      </div>
    </article>
  );
}
