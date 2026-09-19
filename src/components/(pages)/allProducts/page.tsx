import getAllPro from '@/api/getAllProducts.api'
import { AllProducts } from '@/types/allProducts.types'
import { log } from 'console'
import ProductCard from '../productCard/page'
import getUserWishList from '@/wishListAction/Getloggeduserwishlist.acction'
import { wishListType } from '@/types/wishListType.types'

export default async function DisplayAllProducts() {
     let data=await getAllPro()
   log(data)

   const wishs=await getUserWishList()

   const wishsIds=wishs.data.map((wish:wishListType)=>wish.id)
  return (
    <>
    <title>Product</title>
    <div className='w-[90%] mx-auto'>
        <div className='flex flex-wrap gap-5 p-5 justify-center'>
            {data.map((product:AllProducts)=> 
            <ProductCard isWish={wishsIds.includes(product.id)} key={product._id} product={product}/>)}
        </div>
    </div>
    </>
  )
}
