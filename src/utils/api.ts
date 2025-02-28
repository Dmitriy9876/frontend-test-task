import axios from "axios";

const API_BASE_URL = "http://89.191.225.217/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  images?: string[];
  brand?: string;
  rating?: number;
  reviews?: number;
  barcode?: string;
}

interface ProductsResponse {
  products: Product[];
  pages: number;
}

export const signIn = async (username: string, password: string): Promise<number> => {
  const response = await axios.post("/api/sign_in", { username, password }, { withCredentials: true });
  return response.status;
};

export const fetchProducts = async (
  page: number = 1
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(
    `/get_products?page=${page}`
  );
  return response.data;
};