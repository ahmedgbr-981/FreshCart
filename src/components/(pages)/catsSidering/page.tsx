'use client'
import Image from 'next/image'
import type { AllCats } from '@/types/allCats.types'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function CatsSlidering({data}:{data:AllCats[]}) {
  return (
    <div
      role="region"
      aria-label="Browse categories"
      tabIndex={0}
      className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
    >
      {data.map((category) => (
        <Link
          href={`/categories/${category._id}`}
          key={category._id}
          className="group relative aspect-4/5 w-[72%] flex-none snap-start overflow-hidden rounded-md bg-[#e7eee7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:w-[42%] md:w-[30%] lg:w-[23%] xl:w-[19%]"
        >
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 72vw, (max-width: 768px) 42vw, (max-width: 1024px) 30vw, (max-width: 1280px) 23vw, 19vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/5 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
            <h3 className="text-lg font-semibold capitalize text-white sm:text-xl">
              {category.name}
            </h3>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors group-hover:bg-[#d7e85a] group-hover:text-[#173a2c]">
              <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
