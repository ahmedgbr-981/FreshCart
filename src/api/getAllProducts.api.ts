import { log } from "console";


export default async function getAllPro(categoryId?: string){
    const categoryFilter = categoryId ? `?category=${encodeURIComponent(categoryId)}` : ""
    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/products${categoryFilter}`)
    const { data } = await resp.json()

    return data ?? []
}