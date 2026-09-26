export default async function getOneSubCat(id:string){

    const resp=await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`)
    const payload=await resp.json()
    return payload
}