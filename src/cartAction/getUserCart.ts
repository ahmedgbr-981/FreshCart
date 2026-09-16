'use server'
import getMyToken from '../utilities/getMyToken.utilities'

export default async function getUserCart() {
    const token =await getMyToken()
    if(!token){
        throw new Error('token not found')
    }
    const resp =await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,{
        method:'GET',
        headers:{
            token,
            'Content-type':'application/json'
        }
    })

    const payload=await resp.json()
    return payload
}