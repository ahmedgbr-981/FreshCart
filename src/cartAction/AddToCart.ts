'use server'
import geyMyToken from "@/utilities/getMyToken.utilities"


export default async function AddToCart(id:string){

    const token = await geyMyToken()

    if(!token){
        throw new Error('login first')
    }

    const resp=await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,{
        method:'POST',
        headers:{
            token,
            "Content-type":'application/json',
        },
        body:JSON.stringify({productId:id})
    }) 

    const payload = await resp.json()
    return payload

}