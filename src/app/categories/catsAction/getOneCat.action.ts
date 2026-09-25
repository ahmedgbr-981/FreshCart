export default async function getOneCat(id: string) {
  const resp = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
  );
  const payload = await resp.json();
  return payload;
}
