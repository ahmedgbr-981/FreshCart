import getAllCats from '@/api/getCats.api'
import type { AllCats } from '@/types/allCats.types'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import CatsSlidering from '../catsSidering/page'

export default async function CatSlider() {
  const response = await getAllCats()
  const categories: AllCats[] = response.data ?? []

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Shop by category
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Browse the departments in the store.
          </p>
        </div>
        <Link
          href="/categories"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-emerald-800 transition-colors hover:text-emerald-600"
        >
          All categories
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </header>
      <CatsSlidering data={categories} />
    </section>
  )
}
