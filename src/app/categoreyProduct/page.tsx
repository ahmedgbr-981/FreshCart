import getAllPro from '@/api/getAllProducts.api'
import getOneCat from '@/app/categories/catsAction/getOneCat.action'
import ProductCard from '@/components/(pages)/productCard/page'
import getUserWishList from '@/wishListAction/Getloggeduserwishlist.acction'
import type { AllCats } from '@/types/allCats.types'
import type { AllProducts } from '@/types/allProducts.types'
import type { wishListType } from '@/types/wishListType.types'
import { ArrowLeft, PackageSearch } from 'lucide-react'
import Link from 'next/link'

type CategoryResponse = {
  data?: AllCats
}

export default async function CategoreyProduct({
  searchParams,
}: {
  searchParams: Promise<{ categoryId?: string }>
}) {
  const { categoryId } = await searchParams
  const [products, categoryResponse, wishlist] = await Promise.all([
    getAllPro(categoryId),
    categoryId ? (getOneCat(categoryId) as Promise<CategoryResponse>) : null,
    getUserWishList().catch(() => null),
  ])

  const category = categoryResponse?.data
  const wishlistIds = new Set<string>(
    (wishlist?.data ?? []).map((item: wishListType) => item.id),
  )

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#f7f8f4]">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <Link
          href="/categories"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-950"
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-1"
          />
          Browse categories
        </Link>

        <header className="mb-9 mt-8 flex flex-col justify-between gap-5 border-b border-black/10 pb-7 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
              {category ? 'Category collection' : 'The full collection'}
            </p>
            <h1 className="text-4xl font-semibold capitalize tracking-[-0.04em] text-slate-950 sm:text-5xl">
              {category?.name ?? 'All products'}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              {category
                ? `Explore products from ${category.name}.`
                : 'Browse products from every category in one place.'}
            </p>
          </div>
          <p className="shrink-0 text-sm font-medium text-slate-500">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        </header>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product: AllProducts) => (
              <ProductCard
                key={product._id}
                product={product}
                isWish={wishlistIds.has(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-black/15 bg-white px-6 py-20 text-center">
            <PackageSearch
              className="mx-auto text-emerald-700"
              size={28}
              aria-hidden="true"
            />
            <h2 className="mt-5 text-lg font-semibold text-slate-950">
              No products found
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              There are no products in this collection right now.
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
