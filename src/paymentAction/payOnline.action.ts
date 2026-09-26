'use server'
import { headers } from "next/headers"
import { ShippingData } from "@/app/checkOut/CheckOutForm"
import geyMyToken from "@/utilities/getMyToken.utilities"


export default async function payOnline(id:string,data:ShippingData){

    const token = await geyMyToken()
    const requestHeaders = await headers()
    const origin = requestHeaders.get("origin")
        ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

    console.log(token)
    if(!token){
        throw new Error('login first')
    }

    const returnUrl = new URLSearchParams({ url: origin }).toString()
    const resp=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?${returnUrl}`,{
        method:'POST',
        headers:{
            token,
            "Content-type":'application/json',
        },
        body:JSON.stringify({shippingAddress:data})
    }) 

    const payload=await resp.json()
    return payload

}