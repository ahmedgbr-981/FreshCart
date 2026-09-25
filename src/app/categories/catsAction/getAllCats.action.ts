export default async function getAllcats() {
  const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`);
  const payload = await resp.json();
  return payload;
}
