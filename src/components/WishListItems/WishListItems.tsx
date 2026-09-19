'use client'
import { wishListType } from '@/types/wishListType.types'
import Image from 'next/image'
import { Button } from '../ui/button'
import removeFromWishs from '@/wishListAction/RemoveFromWishs.action'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import AddToCartBtn from '../addToCartBtn/AddToCartBtn'

export default function WishListItems({product}:{product:wishListType}) {

    const router=useRouter()
   async function hundleRemoveWishs(){
       try {
         const resp=await removeFromWishs(product.id)
        if(resp.status=='success'){
            toast.success(resp.message,{position:'bottom-left',autoClose:500})
            router.refresh()
        }
       } catch (error) {
            toast.error('error!',{position:'bottom-left',autoClose:500})
        
       }
    }
    console.log(product)
  return (
<>
<div className='flex justify-between items-center'>
    <div className='flex items-center gap-3'>
        <Image width={100} height={100} src={product.imageCover} alt=''/>
    <div>
        <h2>{product.title}</h2>
        <span className='text-green-500'>{product.price} EGP</span>
    </div>
    </div>
    <div className='flex flex-col'>
        <Button onClick={()=>hundleRemoveWishs()} className='rounded-2xl hover:bg-red-500 underline  text-black bg-green-500 px-16 text-xl cursor-pointer py-6'>Remove</Button>
        <AddToCartBtn show proId={product._id} />
    </div>
</div>
</>  )
}
