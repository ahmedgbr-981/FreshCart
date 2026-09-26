import { Suspense } from "react";
import CatSlider from "@/components/(pages)/catSlider/page";
import MainSlider from "@/components/(pages)/mainSlader/page";
import DisplayAllProducts from "@/components/(pages)/allProducts/page";

function CategoryRailLoading() {
  return (
    <section aria-label="Loading categories" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-5 h-8 w-52 animate-pulse rounded bg-slate-200" />
      <div className="flex gap-3 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 5 }, (_, skeletonIndex) => (
          <div
            key={skeletonIndex}
            className="aspect-4/5 w-[19%] flex-none animate-pulse rounded-md bg-slate-200"
          />
        ))}
      </div>
    </section>
  )
}

function ProductGridLoading() {
  return (
    <div aria-label="Loading products" className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }, (_, skeletonIndex) => (
        <div key={skeletonIndex} aria-hidden="true">
          <div className="aspect-4/5 animate-pulse rounded-md bg-slate-200" />
          <div className="mt-3 h-3 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-5 w-full animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-10 w-full animate-pulse rounded-md bg-slate-200" />
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <MainSlider />
      <Suspense fallback={<CategoryRailLoading />}>
        <CatSlider />
      </Suspense>
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-black/10 pb-5">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            All products
          </h2>
        </div>
        <Suspense fallback={<ProductGridLoading />}>
          <DisplayAllProducts />
        </Suspense>
      </section>
    </main>
  );
}
