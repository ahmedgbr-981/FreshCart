"use client";

import AddToCart from "@/cartAction/AddToCart";
import { Button } from "@base-ui/react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddToCartBtn({
  proId,
  show = false,
}: {
  proId: string;
  show?: Boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function AddToCartBridge(id: string) {
    const session = await getSession();
    if (!session) {
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);
      const resp = await AddToCart(id);
      if (resp.status == "success") {
        toast.success(resp.message, {
          position: "top-center",
          autoClose: 1000,
          closeOnClick: true,
        });
        router.refresh();
      } else {
        toast.error("somthin went wrong");
      }
    } catch (error) {
      toast.error("error!", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Button
        onClick={() => AddToCartBridge(proId)}
        className={`cursor-pointer  w-full my-3 bg-green-500 hover:bg-green-600 transition-all duration-200 rounded-2xl p-3 ${show && "group-hover:opacity-100,opacity-0"}`}
      >
        {isLoading ? "Adding..." : " Add to cart"}
      </Button>
    </>
  );
}
