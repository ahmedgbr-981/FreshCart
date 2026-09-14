
import { toast } from 'react-toastify'
import getMyToken from '../utilities/getMyToken.utilities'

export default async function clearUserCart() {
    const token =await getMyToken()
    if(!token){
        throw new Error('token not found')
    }
  try {
      const resp =await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,{
        method:'DELETE',
        headers:{
            token,
            'Content-type':'applicaton/json'
        }
    })
    const payload=await resp.json()
   if(resp.ok){

       toast.success('All items removed')
   }
   else{
    toast.error('server error')
   }
    
    return payload

  } catch (error) {
    toast.error('somethin went wrong')
    
  }

}