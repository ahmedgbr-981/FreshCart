
import getProDetailes from "@/api/productDetailes.api";
import Swper from "@/components/(pages)/swper/page";
import { log } from "console";


// Import Swiper styles
import "swiper/css";

export default async function ProductDetailes({ params }:{params:{id:string}}) {
  let { id } = await params;

  let { data } = await getProDetailes(id);
  log("detailes", data);
  return (
    <>
     <Swper data={data}/>
    </>
  );
}
