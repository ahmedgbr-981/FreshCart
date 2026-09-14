"use client";

import AddToCart from "@/cartAction/AddToCart";
import { Button } from "@base-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddToCartBtn({ proId,show=false }: { proId: string,show?:Boolean }) {

    const [isLoading, setIsLoading] = useState(false)

  async function AddToCartBridge(id: string) {
    try {
        setIsLoading(true)
      const resp = await AddToCart(id);
      if (resp.status == "success") {
        toast.success(resp.message, {
          position: "top-right",
          autoClose: 1000,
          closeOnClick: true,
        });
      }
       else {
        toast.error("somthin went wrong");
      }
    } catch (error) {
         toast.error('error!', {
          position: "top-right",
          autoClose: 1000,
          closeOnClick: true,
        });
    }
    finally{
        setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => AddToCartBridge(proId)}
        className={
          `cursor-pointer  w-full my-3 bg-green-500 hover:bg-green-600 transition-all duration-200 rounded-2xl p-3 ${show&&'group-hover:opacity-100,opacity-0'}`
        }
      >
       {
        isLoading? "Adding...":" Add to cart"
       }
      </Button>
    </>
  );
}
