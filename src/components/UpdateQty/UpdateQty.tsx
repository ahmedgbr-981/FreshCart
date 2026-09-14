'use client'
import updateProductQty from '@/cartAction/updateCartProQty'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
export default function UpdateQty({count,id}:{count:number,id:string}) {

    const [updatedCount, setUpdatedCount] = useState(count)
    const router=useRouter()

   async function q(nextCount:number){
        try {

            
            const resp=await updateProductQty(id,nextCount)
            setUpdatedCount(nextCount)
            router.refresh()
            console.log('update qty',resp)
            if(resp.status=='success'){
                toast.success(resp.message,{autoClose:500})
            }

            else{
                toast.error(resp.message,{autoClose:1000})
            }
        } catch (error) {
            
        }
    }

  return (
   <> <form className="max-w-xs mx-auto">
            <label htmlFor="counter-input-1" className="sr-only">Choose quantity:</label>
            <div className="relative flex items-center">
              <button onClick={()=>q(updatedCount-1)} type="button" id="decrement-button-1" data-input-counter-decrement="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
              </button>
            <span className="px-3">{updatedCount}</span>     
         <button onClick={()=>q(updatedCount+1)} type="button" id="increment-button-1" data-input-counter-increment="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">

                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" /></svg>
              </button>
            </div>
          </form></>
  )
}
