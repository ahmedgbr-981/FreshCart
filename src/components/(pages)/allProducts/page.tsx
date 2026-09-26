import getAllPro from '@/api/getAllProducts.api'
import type { AllProducts } from '@/types/allProducts.types'
import ProductCard from '../productCard/page'
import getUserWishList from '@/wishListAction/Getloggeduserwishlist.acction'
import type { wishListType } from '@/types/wishListType.types'

export default async function DisplayAllProducts() {
  const [data, wishlist] = await Promise.all([
    getAllPro(),
    getUserWishList().catch(() => null),
  ])
  const wishIds = new Set<string>(
    (wishlist?.data ?? []).map((wish: wishListType) => wish.id),
  )

  return (
    <>
      <p className="mb-4 text-sm text-slate-500">
        {data.length} {data.length === 1 ? 'product' : 'products'}
      </p>
      {data.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 xl:grid-cols-5">
          {data.map((product: AllProducts) => (
            <ProductCard
              isWish={wishIds.has(product.id)}
              key={product._id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <p className="border border-dashed border-slate-300 py-16 text-center text-sm text-slate-500">
          No products are available right now.
        </p>
      )}
    </>
  )
}