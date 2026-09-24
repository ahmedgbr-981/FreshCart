'use server'
import geyMyToken from "@/utilities/getMyToken.utilities"
import { jwtDecode, type JwtPayload } from "jwt-decode"


export default async function getUserOrders(){

    const token = await geyMyToken()

    console.log(token)
    if(!token){
        throw new Error('login first')
    }

    const decodedToken = jwtDecode<JwtPayload & { id: string }>(token)

    const myId = decodedToken.id

    if (!myId) {
        throw new Error('invalid token')
    }

    const resp=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${myId}`,{
        method:'GET',
        headers:{
            token,
            "Content-type":'application/json',
        },
    }) 

    const payload=await resp.json()
    return payload

}