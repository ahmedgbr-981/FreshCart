import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@base-ui/react";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AddToCartBtn from "@/components/addToCartBtn/AddToCartBtn";
import { AllProducts } from "@/types/allProducts.types";
import WishListIcon from "@/components/WishListIcon/WishListIcon";

export default function ProductCard({ product }: { product: AllProducts }) {
  return (
    <>
      <div className="w-full md:w-1/4 lg:w-1/5 ">
        <div className="inner ">
         <WishListIcon id={product.id} />
          <Card className="px-4 ring-0 hover:ring-2 hover:ring-green-500 cursor-pointer group">
            <Link href={`/products/${product.id}`}>
              <CardHeader>
                <CardTitle className="p-3 text-green-700">
                  {product.category.name.split(" ").slice(0, 1).join(" ")}
                </CardTitle>
                <CardDescription>
                  <Image
                    width={500}
                    height={500}
                    src={product.imageCover}
                    className="rounded-2xl"
                    alt=""
                  />
                  <h2 className="text-black py-2 text-xl">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  <div className="flex justify-between">
                    <div className="star-left">
                      <span>{product.price} EGP</span>
                    </div>
                    <div className="star-right">
                      <span className="flex items-center gap-1">
                        {product.ratingsAverage}{" "}
                        <Star
                          size={15}
                          fill="yellow"
                          className="text-yellow-300 "
                        />
                      </span>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Link>
           <AddToCartBtn proId={product._id}/>
          </Card>
        </div>
      </div>
    </>
  );
}
