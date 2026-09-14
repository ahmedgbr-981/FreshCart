'use client'
import removeFrmCart from '@/cartAction/removePeoductFromCart'
import { useRouter } from 'next/navigation'

export default function RemoveFromCartBtn({id}:{id:string}) {
  const router = useRouter()

  async function handleRemove() {
    await removeFrmCart(id)
    router.refresh()
  }

  return (
    <>
          <button onClick={handleRemove} className="font-medium text-fg-danger hover:underline cursor-pointer hover:text-red-400">Remove</button>
    </>
  )
}
