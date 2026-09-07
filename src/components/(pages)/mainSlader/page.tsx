'use client'
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export default function MainSlider() {
  return (
    <>
    <div className='w-[90%] mx-auto p-5 flex justify-center'>
      <div className="w-3/4">
        <Swiper
      spaceBetween={50}
      slidesPerView={1}
      modules={[Autoplay]}
     autoplay={{delay:2000}}
    >
     <SwiperSlide>

      <Image src='/main_image.jfif' width={500} height={500} className='w-full h-100 object-cover'  alt="wtf" />
     </SwiperSlide>
      <SwiperSlide><Image src={"/image2.jfif"} width={500} height={500} className='w-full h-100 object-cover' alt=''/></SwiperSlide>
      <SwiperSlide><Image src={"/image3.jfif"} width={500} height={500} className='w-full h-100 object-cover'  alt=''/></SwiperSlide>
    </Swiper>
      
      </div>
     
    
     
      <div className="w-1/4">
      <Image src="/image2.jfif" className='w-full h-50'  width={500} height={500} alt="" />
      <Image src="/image3.jfif" className='w-full h-50' width={500} height={500} alt="" />
      </div>
    </div>
    </>
  )
}
