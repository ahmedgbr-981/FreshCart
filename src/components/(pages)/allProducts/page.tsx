import getAllPro from '@/api/getAllProducts.api'
import { AllProducts } from '@/types/allProducts.types'
import { log } from 'console'
import ProductCard from '../productCard/page'

export default async function DisplayAllProducts() {
     let data=await getAllPro()
   log(data)
  return (
    <>
    <title>Product</title>
    <div className='w-[90%] mx-auto'>
        <div className='flex flex-wrap gap-5 p-5 justify-center'>
            {data.map((product:AllProducts)=> 
            <ProductCard key={product._id} product={product}/>)}
        </div>
    </div>
    </>
  )
}
