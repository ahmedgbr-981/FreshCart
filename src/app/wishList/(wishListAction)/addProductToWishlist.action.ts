'use server'

import geyMyToken from "@/utilities/getMyToken.utilities"

export default async function addToWishlist(id:string){

    const token = await geyMyToken()

    if(!token){
        throw new Error('Token is not provided')
    }
    const resp=await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        method:'POST',
        headers:{
            token,
            'Content-Type':'application/json'
        },
        body:JSON.stringify({productId:id})
    })

    const payload=await resp.json()

    return payload
}