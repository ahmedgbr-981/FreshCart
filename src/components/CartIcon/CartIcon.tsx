import getUserCart from "@/cartAction/getUserCart";
import { log } from "console";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default async function CartIcon() {
  const resp = await getUserCart();
    log(resp)
  return (
    <>
      <Link href="/cart">
        <ShoppingCart className="h-4 w-4" />
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
          {resp.numOfCartItems}
        </span>
      </Link>
    </>
  );
}
