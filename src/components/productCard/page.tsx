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
import { Star } from "lucide-react";
import Link from "next/link";
import { AllProducts } from "../../types/allProducts.types";
import Image from "next/image";

export default function ProductCard({ product }: { product: AllProducts }) {
  return (
    <>
      <div className="w-full md:w-1/4 lg:w-1/5 ">
        <div className="inner ">
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
            <Button
              className={
                "cursor-pointer group-hover:opacity-100 w-full my-3 bg-green-500 hover:bg-green-600 transition-all duration-200 rounded-2xl p-3 opacity-0"
              }
            >
              Add to cart
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}
