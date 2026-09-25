import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import type { Brand as BrandType } from "@/types/productDetailes.types";
import getBrand from "../brandAction/getBrand.action";

type BrandResponse = {
  data: BrandType;
};

export default async function Brand({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const response = (await getBrand(name)) as BrandResponse;
  console.log(response)
  const brand = response.data;

  if (!brand) {
    return (
      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-[#f7f8f4] px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Brand unavailable
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            We could not find that brand.
          </h1>
          <Link
            href="/brands"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-emerald-600"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to brands
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#f7f8f4] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/brands"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-950"
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-1"
          />
          All brands
        </Link>

        <section className="overflow-hidden rounded-[2rem] border border-slate-900/10 bg-white shadow-[0_24px_70px_-42px_rgba(15,23,42,0.45)] lg:grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative flex min-h-88 items-center justify-center overflow-hidden bg-[#e8efe8] p-10 sm:min-h-[30] sm:p-16">
            <div className="absolute left-8 top-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-800/60">
              <Sparkles size={14} aria-hidden="true" />
              Featured brand
            </div>
            <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full border border-emerald-900/10" />
            <div className="absolute -bottom-12 -right-8 h-44 w-44 rounded-full border border-emerald-900/10" />
            <div className="relative aspect-square w-full max-w-[18rem] rounded-full bg-white p-10 shadow-[0_24px_50px_-30px_rgba(15,23,42,0.5)] sm:p-14">
              <Image
                src={brand.image}
                alt={`${brand.name} logo`}
                fill
                sizes="(max-width: 640px) 65vw, (max-width: 1024px) 40vw, 28vw"
                className="object-contain p-10 sm:p-14"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-600">
              The collection
            </p>
            <h1 className="mt-5 max-w-lg text-5xl font-semibold capitalize tracking-[-0.06em] text-slate-950 sm:text-6xl">
              {brand.name}
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-slate-500">
              Discover the latest products from {brand.name}, thoughtfully
              gathered in one place for your next find.
            </p>

            <div className="mt-10 grid max-w-md grid-cols-2 border-y border-slate-900/10 py-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Brand code
                </p>
                <p className="mt-2 truncate pr-4 text-sm font-semibold text-slate-900">
                  {brand._id}
                </p>
              </div>
              <div className="border-l border-slate-900/10 pl-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Collection
                </p>
                <p className="mt-2 text-sm font-semibold capitalize text-slate-900">
                  {brand.slug.replaceAll("-", " ")}
                </p>
              </div>
            </div>

            <Link
              href={`/products?brand=${brand._id}`}
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Shop this brand
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
