import geyMyToken from "@/utilities/getMyToken.utilities"


export default async function removeFromWishs(id:string) {

     const token = await geyMyToken()
        
            if(!token){
                throw new Error('login first')
            }

    const resp =await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
            method:'DELETE',
           headers:{
             token,
             "Content-type":'application/json',
           }
        }
    ) 
    
    const payload = await resp.json()
    return payload

}