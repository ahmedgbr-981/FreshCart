"use client";
import AddToCartBtn from "@/app/components/addToCartBtn/AddToCartBtn";
import { ProductDetailes } from "@/types/productDetailes.types";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Swper({ data }: { data: ProductDetailes }) {
  const [slectedImg, setSlectedImg] = useState(data.imageCover);
  return (
    <>
      {" "}
      <div className="w-[90%] mx-auto">
        <div className="flex items-center flex-col md:flex-row">
            <Image
              width={500}
              height={500}
              src={slectedImg}
              alt=""
              className="p-5 rounded-2xl size-[max(300px,5vw)]"
            />
            <div className="">
            <div className="w-full md:w-3/4">
              <h2 className="text-green-600 text-xl font-semibold">
                {data.title}
              </h2>
              <p className="my-3">{data.description}</p>
            </div>
            <div className="flex justify-between">
              <div className="star-left">
                <span>{data.price} EGP</span>
              </div>
              <div className="star-right">
                <span className="flex items-center gap-1">
                  {data.ratingsAverage}{" "}
                  <Star size={15} fill="yellow" className="text-yellow-300 " />
                </span>
              </div>
            </div>
          </div>

          
        </div>
            <Swiper
            className=""
              spaceBetween={2}
              slidesPerView={4}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {data.images.map((img) => (
                <SwiperSlide className="">
                  <Image
                    width={500}
                    height={500}
                    src={img}
                    className="rounded-2xl size-20"
                    alt=""
                    onClick={() => {
                      setSlectedImg(img);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
        <AddToCartBtn show proId={data._id} />
      </div>
    </>
  );
}
