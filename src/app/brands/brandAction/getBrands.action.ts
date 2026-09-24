

export default async function getAllBrands(){
    const resp=await fetch(`https://ecommerce.routemisr.com/api/v1/brands`,{
        method:"GET"
    })

    const payload=await resp.json()
    return payload
}