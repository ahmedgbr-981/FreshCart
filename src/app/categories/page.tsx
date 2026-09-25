import getAllCats from "@/api/getCats.api";
import type { AllCats } from "@/types/allCats.types";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Layers3 } from "lucide-react";

type CategoriesResponse = {
  data: AllCats[];
};

export default async function Categories() {
  const resp = (await getAllCats()) as CategoriesResponse;
  const categories = resp.data ?? [];

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#f7f8f4]">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              <Layers3 size={15} strokeWidth={1.8} />
              <span>Curated departments</span>
            </div>
            <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Find your next favorite.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
              Browse our collection by category and discover products chosen
              for everyday living.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>{categories.length} categories to explore</span>
          </div>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                href={`categories/${category._id}`}
                key={category._id}
                className="group relative min-h-72 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_12px_30px_-24px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-[0_18px_35px_-22px_rgba(5,150,105,0.4)]"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-2 text-2xl font-semibold capitalize tracking-tight">
                      {category.name}
                    </h2>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition duration-300 group-hover:bg-emerald-500 group-hover:text-white">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-black/15 bg-white px-6 py-20 text-center">
            <p className="text-lg font-medium text-slate-900">
              No categories yet
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Check back soon for new additions to the collection.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
