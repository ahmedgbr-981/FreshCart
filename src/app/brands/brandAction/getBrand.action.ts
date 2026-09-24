

export default async function getBrand(brandId:string){
    const resp=await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,{
        method:"GET"
    })

    const payload=await resp.json()
    return payload
}