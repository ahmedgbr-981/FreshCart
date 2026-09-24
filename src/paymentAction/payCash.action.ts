'use server'
import { ShippingData } from "@/app/checkOut/CheckOutForm"
import geyMyToken from "@/utilities/getMyToken.utilities"


export default async function payCash(id:string,data:ShippingData){

    const token = await geyMyToken()

    // console.log(token)
    if(!token){
        throw new Error('login first')
    }

    const resp=await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${id}`,{
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