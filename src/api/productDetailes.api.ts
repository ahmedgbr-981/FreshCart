 
 
 export default async function getProDetailes(id:string){
    let resp=await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    let data=await resp.json()
    return data

}