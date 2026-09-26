import getOneSubCat from '@/app/categories/catsAction/getOneSubCat.action'
import { ArrowLeft, ArrowRight, ArrowUpRight, Layers3 } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type SubCategory = {
  _id: string
  name: string
  slug: string
  category: string
  createdAt: string
  updatedAt: string
}

type SubCategoryResponse = {
  data?: SubCategory
}

export default async function OneSubCat({
  params,
}: {
  params: Promise<{ subId: string }>;
}) {
  const { subId } = await params
  const response = (await getOneSubCat(subId)) as SubCategoryResponse
  const subCategory = response.data

  if (!subCategory) notFound()

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#f7f8f4]">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-10">
        <Link
          href={`/categories/${subCategory.category}/subCats`}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-950"
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-1"
          />
          All subcategories
        </Link>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-900/10 bg-white">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="flex flex-col items-start justify-center px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
              <div className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                <Layers3 size={15} strokeWidth={1.8} aria-hidden="true" />
                <span>Collection detail</span>
              </div>
              <h1 className="max-w-2xl text-4xl font-semibold capitalize tracking-[-0.04em] text-slate-950 sm:text-6xl">
                {subCategory.name}
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
                Explore this focused collection and find the pieces that fit
                your needs.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/products"
                  className="group inline-flex min-h-12 items-center gap-3 rounded-md bg-emerald-800 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  Explore products
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href={`/categories/${subCategory.category}/subCats`}
                  className="inline-flex min-h-12 items-center gap-2 px-3 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-800"
                >
                  Browse collections
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <aside className="relative flex min-h-72 items-center justify-center overflow-hidden bg-[#174f3c] px-8 py-12 text-white sm:min-h-96 lg:min-h-full">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-size-[36px_36px] opacity-20" />
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/20" />
              <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full border border-white/15" />
              <div className="relative flex w-full max-w-sm flex-col items-center text-center">
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-100/75">
                  Curated for you
                </span>
                <div className="mt-5 flex h-32 w-32 items-center justify-center rounded-full border border-white/25 bg-white/5 sm:h-40 sm:w-40">
                  <span className="select-none text-7xl font-semibold uppercase leading-none tracking-[-0.06em] text-white sm:text-8xl">
                    {subCategory.name.charAt(0)}
                  </span>
                </div>
                <p className="mt-6 max-w-xs text-sm font-medium capitalize leading-6 text-white/80">
                  {subCategory.slug.replaceAll('-', ' ')}
                </p>
              </div>
              <span className="absolute bottom-5 right-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                Subcategory
              </span>
            </aside>
          </div>

          <div className="grid gap-6 border-t border-slate-900/10 px-6 py-6 sm:grid-cols-2 sm:px-10 lg:px-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Collection slug
              </p>
              <p className="mt-2 text-sm font-medium capitalize text-slate-800">
                {subCategory.slug.replaceAll('-', ' ')}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Part of the wider catalog
              </p>
              <Link
                href={`/categories/${subCategory.category}/subCats`}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-600"
              >
                View parent category
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
