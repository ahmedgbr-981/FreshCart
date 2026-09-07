'use client'
import { ProductDetailes } from "@/types/productDetailes.types";
import { Button } from "@base-ui/react";
import { log } from "console";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"

export default function Swper({data}:{data:ProductDetailes}) {
    const [slectedImg, setSlectedImg] = useState(data.imageCover)
  return (
    <> <div className="w-[90%] mx-auto">
        <div className="flex items-center">
          <div className="w-full md:w-1/4">
            <Image width={500} height={500} src={slectedImg} alt="" className="p-5 rounded-2xl" />
            <Swiper
      spaceBetween={50}
      slidesPerView={4}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data.images.map((img)=> <SwiperSlide><Image  width={500} height={500} src={img} className="rounded-2xl" alt="" onClick={()=>{setSlectedImg(img)}}/></SwiperSlide>
      )}
      
    </Swiper>
          </div>
          <div>
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
        <Button
          className={
            "cursor-pointer w-full my-3 bg-green-500 hover:bg-green-600 transition-all duration-200 rounded-2xl p-3 "
          }
        >
          Add to cart
        </Button>
      </div></>
  )
}
