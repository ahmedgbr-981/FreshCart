
'use server'

import getMyToken from '../utilities/getMyToken.utilities'

export default async function updateProductQty(id:string,count:number) {
    const token =await getMyToken()
    if(!token){
        throw new Error('token not found')
    }
    const resp =await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`,{
        method:'PUT',
        headers:{
            token,
            'Content-type':'application/json'
        },
        body:JSON.stringify({'count':count})
    })

    const payload=await resp.json()
    return payload
}