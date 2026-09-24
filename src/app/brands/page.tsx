import Image from "next/image";
import getAllBrands from "./brandAction/getBrands.action";
import type { Brand } from "@/types/productDetailes.types";
import Link from "next/link";

type BrandsResponse = {
  data: Brand[];
};

export default async function Brands() {
  const response = (await getAllBrands()) as BrandsResponse;
  // console.log(response)
  const brands = response.data ?? [];

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#f7f8f4]">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pt-16 ">
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-end">
          <div>
          
            <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Brands worth knowing.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
              Explore the names behind the products you love, gathered in one
              considered collection.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>{brands.length} brands in the collection</span>
          </div>
        </div>

        {brands.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {brands.map((brand, index) => (
             <Link href={`/brands/${brand._id}`} key={brand._id}> <article
                
                className=" cursor-pointer group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-2xl border border-black/10 bg-white p-4 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-[0_18px_35px_-22px_rgba(5,150,105,0.4)] sm:min-h-72 sm:p-5"
              >
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="transition-colors group-hover:text-emerald-600">
                    brand
                  </span>
                </div>

                <div className="relative mx-auto my-6 aspect-square w-full max-w-40 transition duration-300 group-hover:scale-105">
                  <Image
                    src={brand.image}
                    alt={`${brand.name} logo`}
                    fill
                    sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 18vw"
                    className="object-contain"
                  />
                </div>

                <div className="flex items-end justify-between gap-3 border-t border-black/10 pt-4">
                  <h2 className="text-base font-semibold capitalize tracking-tight text-slate-900 sm:text-lg">
                    {brand.name}
                  </h2>
                  <span className="text-lg text-emerald-600 transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </div>
              </article></Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-black/15 bg-white px-6 py-20 text-center">
            <p className="text-lg font-medium text-slate-900">No brands yet</p>
            <p className="mt-2 text-sm text-slate-500">
              Check back soon for new additions to the collection.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
