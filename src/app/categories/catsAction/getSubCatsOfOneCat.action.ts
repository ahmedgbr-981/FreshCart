export default async function getSubCatsOfOneCat(id:string) {
  const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
  const payload = await resp.json();
  return payload;
}
