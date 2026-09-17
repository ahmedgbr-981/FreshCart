'use client'
import addToWishlist from '@/app/wishList/(wishListAction)/addProductToWishlist.action'
import { Heart } from 'lucide-react'
import { toast } from 'react-toastify'

export default function WishListIcon({id}:{id:string}) {

    async function  wishlisted(){
        try {
            const resp=await addToWishlist(id)
        console.log('wishs',resp)
        if(resp.status=='success'){
            toast.success(resp.message,{position:'top-left',autoClose:500})
        }
        } catch (error) {
            toast.error('error!',{position:'top-left',autoClose:500})
            
        }
    }
  return (
    <>
    <div onClick={()=>wishlisted()} className="py-3 flex justify-end cursor-pointer ">
            <Heart  className="hover:bg-accent rounded-full"/>
          </div>
    </>
  )
}
