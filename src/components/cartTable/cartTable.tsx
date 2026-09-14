'use client'

import { CartOwner } from "@/types/userCart.type"
import Image from "next/image"
import RemoveFromCartBtn from "../RemoveFromCartBtn/RemoveFromCartBtn"
import { Button } from "@base-ui/react"
import { Trash } from "lucide-react"
import ClearCartBtn from "../ClearCartBtn/ClearCartBtn"

export default function CartTable({cart}:{cart:CartOwner}) {

    if(cart.products.length==0){
        return <div>
            <h1 className="text-slate-700 text-3xl">
                Your cart is empty
            </h1>
        </div>
    }
  return (
    <>
    

<div className="w-[90%] rounded-2xl p-3 mx-auto mt-4 relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
  <h2 className="text-xl text-center bg-accent p-2 rounded-2xl text-slate-700 mb-2">My cart</h2>
  <div className="p-2">
    <span className="text-2xl">Total</span>
  <span className="text-green-500 text-2xl"> {cart.totalCartPrice.toLocaleString()} EGP</span>
  </div>
  <div className="flex justify-end px-3">
    <ClearCartBtn/>
  </div>
  <table className="w-full text-sm text-left rtl:text-right text-body">
    <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="">Image</span>
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Product
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Qty
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Price
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
        {cart.products.map((p)=>
        <tr key={p._id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
        <td className="p-4">
          <Image src={p.product.imageCover} width={100} height={100} className="w-16 md:w-24 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {p.product.title}
        </td>
        <td className="px-6 py-4">
          <form className="max-w-xs mx-auto">
            <label htmlFor="counter-input-1" className="sr-only">Choose quantity:</label>
            <div className="relative flex items-center">
              <button type="button" id="decrement-button-1" data-input-counter-decrement="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
              </button>
            <span className="px-3">{p.count}</span>     
         <button type="button" id="increment-button-1" data-input-counter-increment="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">

                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" /></svg>
              </button>
            </div>
          </form>
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {p.price}
        </td>
        <td className="px-6 py-4">
    <RemoveFromCartBtn id={p.product._id}/>
        </td>
      </tr>)}
      
    </tbody>
  </table>
</div>


    
    </>
  )
}
