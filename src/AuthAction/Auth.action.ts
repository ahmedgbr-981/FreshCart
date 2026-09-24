'use server'

import geyMyToken from "@/utilities/getMyToken.utilities"

export default async function forgotPass(email:string){

    const resp =await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,{
        method:'POST',
        headers:{
          
            "Content-type":'application/json',
            
        },
        body:JSON.stringify({email})

    })

     const payload=await resp.json()
    return payload
}


export async function verifyCodeApi(code:string){

    const resp =await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{
        method:'POST',
        headers:{
          
            "Content-type":'application/json',
            
        },
        body:JSON.stringify({resetCode:code})

    })

     const payload=await resp.json()
    return payload
}
export async function resetPassApi(email:string,newPassword:string){

    const resp =await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,{
        method:'PUT',
        headers:{
          
            "Content-type":'application/json',
            
        },
        body:JSON.stringify({email,newPassword})

    })

     const payload=await resp.json()
    return payload
}