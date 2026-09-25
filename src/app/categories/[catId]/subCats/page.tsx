import getSubCatsOfOneCat from "../../catsAction/getSubCatsOfOneCat.action";
import { ArrowLeft, ArrowUpRight, Layers3, ListFilter } from "lucide-react";
import Link from "next/link";

type SubCategory = {
  _id: string;
  name: string;
  slug: string;
};

type SubCategoriesResponse = {
  data: SubCategory[];
};

export default async function SubCats({
  params,
}: {
  params: Promise<{ catId: string }>;
}) {
  const { catId } = await params;
  const response = (await getSubCatsOfOneCat(catId)) as SubCategoriesResponse;
  const subCategories = response.data ?? [];

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#f7f8f4]">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <Link
          href={`/categories/${catId}`}
          className="group mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-950"
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to category
        </Link>

        <header className="mb-12 flex flex-col justify-between gap-7 border-b border-black/10 pb-9 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
              <Layers3 size={15} strokeWidth={1.8} aria-hidden="true" />
              <span>Explore by detail</span>
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tighter text-slate-950 sm:text-6xl">
              Find your exact fit.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Narrow the collection down by exploring each specialty inside
              this category.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-sm text-slate-500">
            <ListFilter size={17} className="text-emerald-600" aria-hidden="true" />
            <span>{subCategories.length} subcategories</span>
          </div>
        </header>

        {subCategories.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subCategories.map((subCategory, index) => (
              <Link
                key={subCategory._id}
                href={`/products?subcategory=${subCategory._id}`}
                className="group relative min-h-64 overflow-hidden rounded-2xl border border-slate-900/10 bg-white p-7 shadow-[0_16px_35px_-28px_rgba(15,23,42,0.5)] transition duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-[0_20px_40px_-24px_rgba(5,150,105,0.35)] sm:p-8"
              >
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full border-18 border-emerald-50 transition duration-500 group-hover:scale-125 group-hover:border-emerald-100" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/10 text-slate-400 transition duration-300 group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white">
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-16">
                    <h2 className="text-2xl font-semibold capitalize tracking-[-0.03em] text-slate-950">
                      {subCategory.name}
                    </h2>
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                      {subCategory.slug.replaceAll("-", " ")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-black/15 bg-white px-6 py-24 text-center">
            <ListFilter className="mx-auto text-emerald-600" size={26} aria-hidden="true" />
            <p className="mt-5 text-lg font-semibold text-slate-950">
              No subcategories yet
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              There are no additional collections available here right now.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
