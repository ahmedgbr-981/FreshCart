import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function MainSlider() {
  return (
    <section className="grid w-full overflow-hidden bg-[#174f3c] text-white sm:grid-cols-2">
      <div className="flex flex-col items-start justify-center px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-20">
        <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
          Everyday finds, all in one cart.
        </h1>
        <p className="mt-5 max-w-md text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
          Find new favorites across fashion, tech, home, and more, all in one place.
        </p>
        <Link
          href="/categoreyProduct"
          className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-md bg-[#d7e85a] px-5 text-sm font-semibold text-[#173a2c] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Shop all products
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>

      <div className="relative aspect-[1.45] min-h-60 sm:aspect-auto sm:min-h-100 lg:min-h-128">
        <Image
          src="/carttt.jpg"
          alt="A selection of FreshCart products"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  )
}
