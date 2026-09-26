'use client'
import addToWishlist from '@/app/wishList/(wishListAction)/addProductToWishlist.action'
import removeFromWishs from '@/wishListAction/RemoveFromWishs.action'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function WishListIcon({id,isWish}:{id:string,isWish:boolean}) {

    const [wish, setWish] = useState(isWish)
    const [isUpdating, setIsUpdating] = useState(false)

    async function Togglewishlist(){
        if (isUpdating) return

        setIsUpdating(true)
        try {
            const response = wish
                ? await removeFromWishs(id)
                : await addToWishlist(id)

            if (response.status !== 'success') {
                toast.error(response.message ?? 'Could not update wishlist.', { position: 'top-left', autoClose: 500 })
                return
            }

            setWish(!wish)
            window.dispatchEvent(new CustomEvent('wishlist:change', {
                detail: { delta: wish ? -1 : 1 },
            }))
            toast.success(response.message, { position: 'top-left', autoClose: 500 })
        } catch {
            toast.error('Could not update wishlist.', { position: 'top-left', autoClose: 500 })
        } finally {
            setIsUpdating(false)
        }
    }

  return (
    <div>
      <button
        type="button"
        onClick={Togglewishlist}
        disabled={isUpdating}
        aria-label={wish ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-pressed={wish}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-wait"
      >
        <Heart className={wish ? 'fill-emerald-600 text-emerald-600' : ''} aria-hidden="true" />
      </button>
    </div>
  )
}
