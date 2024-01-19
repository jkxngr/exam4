const baseUrl = "https://fakestoreapi.com/products?limit=3";
const baseUrlforall = "https://fakestoreapi.com/products?limit=8";
const category = "https://fakestoreapi.com/products/categories";
const product = "https://fakestoreapi.com/products/";

export const getProducts = async () => {
  try {
    const res = await fetch(baseUrl);
    const data = await res.json();
    return data;
  } catch (error) {}
};
export const getAllProducts = async () => {
  try {
    const res = await fetch(baseUrlforall);
    const data = await res.json();
    return data;
  } catch (error) {}
};

export const getCategory = async (id) => {
  try {
    const res = await fetch(category);
    const data = await res.json();
    return data;
  } catch (error) {}
};
export const getSingleItem = async (id) => {
  try {
    const res = await fetch(`${product}/${id}`);
    item = await res.json();
    return data;
  } catch (error) {}
};
