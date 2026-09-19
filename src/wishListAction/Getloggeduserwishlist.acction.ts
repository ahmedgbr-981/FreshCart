import geyMyToken from "@/utilities/getMyToken.utilities"



export default async function getUserWishList(){
     const token = await geyMyToken()
    
        if(!token){
            throw new Error('login first')
        }
    const resp =await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        method:"GET",
        headers:{
            token,
            "Content-type":'application/json',
        }
    })

   const payload = await resp.json()
    return payload

}