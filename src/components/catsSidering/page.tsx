'use client'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { AllCats } from '@/types/allCats.types';

export default function CatsSlidering({data}:{data:AllCats[]}) {
  return (
   <>
          <Swiper
      spaceBetween={10}
      slidesPerView={1}
      modules={[Autoplay]}
     autoplay={{delay:2000}}
     breakpoints={{640:{slidesPerView:2},768:{slidesPerView:4},1024:{slidesPerView:5},1280:{slidesPerView:6}}}
    >
     {data.map((cat)=>
     <SwiperSlide key={cat._id}>

      <img src={cat.image} className='size-200 object-cover'  alt="wtf" />
     </SwiperSlide>)}
     </Swiper>
   </>
  )
}
