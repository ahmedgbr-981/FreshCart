import getOneCat from "../catsAction/getOneCat.action";
import type { AllCats } from "@/types/allCats.types";
import { ArrowLeft, ArrowUpRight, Layers3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CategoryResponse = {
  data: AllCats;
};

export default async function Category({
  params,
}: {
  params: Promise<{ catId: string }>;
}) {
  const { catId } = await params;
  const response = (await getOneCat(catId)) as CategoryResponse;
  const category = response.data;

  if (!category) {
    return (
      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-[#f7f8f4] px-6">
        <div className="max-w-md text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-600">
            Category unavailable
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            We could not find that collection.
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            The category may have moved or is not available right now.
          </p>
          <Link
            href="/categories"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-emerald-600"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to categories
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#f7f8f4] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/categories"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-950"
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-1"
          />
          All categories
        </Link>

        <section className="overflow-hidden rounded-[2rem] border border-slate-900/10 bg-white shadow-[0_24px_70px_-42px_rgba(15,23,42,0.45)] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-100 overflow-hidden bg-[#dfece3] sm:min-h-128">
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover transition duration-700 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/65 via-slate-950/5 to-transparent" />
            <div className="absolute left-7 top-7 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/80 sm:left-10 sm:top-10">
              <Layers3 size={14} aria-hidden="true" />
              Curated department
            </div>
            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-4 text-white sm:bottom-10 sm:left-10 sm:right-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                {category.slug.replaceAll("-", " ")}
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                <ArrowUpRight size={19} aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-600">
              The collection
            </p>
            <h1 className="mt-5 max-w-lg text-5xl font-semibold capitalize tracking-[-0.06em] text-slate-950 sm:text-6xl">
              {category.name}
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-slate-500">
              Explore thoughtfully selected products in {category.name}, all
              gathered in one place for your next find.
            </p>

            <div className="mt-10 grid max-w-md grid-cols-2 border-y border-slate-900/10 py-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Category code
                </p>
                <p className="mt-2 truncate pr-4 text-sm font-semibold text-slate-900">
                  {category._id}
                </p>
              </div>
              <div className="border-l border-slate-900/10 pl-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Added
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {new Date(category.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <Link
              href={`/categories/${category._id}/subCats`}
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Shop this category
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
