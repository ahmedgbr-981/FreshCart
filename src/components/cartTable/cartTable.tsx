'use client'

import { CartOwner } from "@/types/userCart.type"
import Image from "next/image"
import RemoveFromCartBtn from "../RemoveFromCartBtn/RemoveFromCartBtn"
import { Button } from "@base-ui/react"
import { Trash } from "lucide-react"
import ClearCartBtn from "../ClearCartBtn/ClearCartBtn"
import UpdateQty from "../UpdateQty/UpdateQty"

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
         <UpdateQty count={p.count} id={p.product._id}/>
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
