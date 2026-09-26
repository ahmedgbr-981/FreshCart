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
  show?: boolean;
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
    } catch {
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
        disabled={isLoading}
        className={`my-3 min-h-11 w-full cursor-pointer rounded-md bg-emerald-800 px-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-wait disabled:opacity-60 ${show ? "group-hover:opacity-100" : ""}`}
      >
        {isLoading ? "Adding..." : "Add to cart"}
      </Button>
    </>
  );
}
