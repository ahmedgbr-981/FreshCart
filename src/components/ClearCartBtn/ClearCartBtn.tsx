'use client'
import clearUserCart from '@/cartAction/clearCart'
import { Button } from '@base-ui/react'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ClearCartBtn() {
        const router=useRouter()

   async function handleClearCart(){
      await  clearUserCart()
        router.refresh()
    }
  return (
    <div>    <Button onClick={()=>handleClearCart()} className='rounded-2xl p-1 text-red-500 hover:bg-accent cursor-pointer flex'><span>Clear cart</span> <Trash/> </Button>
</div>
  )
}
