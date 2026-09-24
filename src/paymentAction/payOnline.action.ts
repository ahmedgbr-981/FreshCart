'use server'
import { ShippingData } from "@/app/checkOut/CheckOutForm"
import geyMyToken from "@/utilities/getMyToken.utilities"


export default async function payOnline(id:string,data:ShippingData){

    const token = await geyMyToken()

    console.log(token)
    if(!token){
        throw new Error('login first')
    }

    const resp=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,{
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