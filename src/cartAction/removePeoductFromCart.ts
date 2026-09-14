import { toast } from 'react-toastify';
import getMyToken  from '../utilities/getMyToken.utilities';


export default async function removeFrmCart(id:string) {    
    const token =await getMyToken()
    if(!token){
        throw new Error('token not found')
    }
   try {
     const resp =await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`,{
        method:'DELETE',
        headers:{
            token,
            'Content-type':'applicaton/json'
        }
    })
    const payload=await resp.json()
    toast.success('Removed from cart')
    
    return payload
   } catch (error) {
    
   }

}