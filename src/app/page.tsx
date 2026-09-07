import DisplayAllProducts from "@/components/(pages)/allProducts/page";
import CatSlider from "@/components/(pages)/catSlider/page";
import MainSlider from "@/components/(pages)/mainSlader/page";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center">
        <MainSlider />
        <CatSlider />
      </div>

      <div className="mt-5 ">
        <div className="text-center my-12">
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-green-600 mb-2">
            Explore Our Collection
          </span>

          <h2 className="text-4xl font-extrabold text-gray-900">
            All <span className="text-green-600">Products</span>
          </h2>

          <div className="w-16 h-1 bg-green-600 rounded-full mx-auto mt-4"></div>
        </div>
        <DisplayAllProducts />
      </div>
    </>
  );
}
