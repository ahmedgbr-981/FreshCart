import { log } from "console";


export default async function getAllPro(){
     let resp=await fetch(`https://ecommerce.routemisr.com/api/v1/products`)
    let {data}=await resp.json()
   
    return data
}