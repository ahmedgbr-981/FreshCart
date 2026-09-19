'use client'
import addToWishlist from '@/app/wishList/(wishListAction)/addProductToWishlist.action'
import removeFromWishs from '@/wishListAction/RemoveFromWishs.action'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function WishListIcon({id,isWish}:{id:string,isWish:Boolean}) {

    const [wish, setWish] = useState(isWish)
    async function  Togglewishlist(){
        if(wish){
            setWish(false)
          const resp=await removeFromWishs(id)
          if(resp.status=='success'){
            toast.success(resp.message,{position:'top-left',autoClose:500})
          }
        }
       else{
        setWish(true)
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
    }
  return (
    <>
    <div onClick={()=>Togglewishlist()} className="py-3 flex justify-end cursor-pointer ">
            <Heart  className={
                wish? 'hover:bg-accent rounded-full fill-green-500 text-green-500':'hover:bg-accent rounded-full'
            }/>
          </div>
    </>
  )
}
