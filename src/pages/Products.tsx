import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Select, Button, Typography, Card } from "antd";
import styled from "styled-components";
import Spinner from "../components/Spinner/Spinner"; // Импортируем спиннер

const { Title } = Typography;
const { Option } = Select;

const ProductsContainer = styled.div`
  max-width: 700px;
  margin: 50px auto 0 auto;
  text-align: center;
  padding-bottom: 30px;
`;

const SortContainer = styled.div`
  margin: 22px 0;
`;

const StyledCard = styled(Card)`
  margin-bottom: 15px;
`;

const ProductImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const NoImage = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border-radius: 5px;
  color: #666;
  font-size: 14px;
`;

const PaginationContainer = styled.div`
  margin-top: 30px;
`;

const PageIndicator = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin: 0 15px;
`;

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  images?: string[];
  stock: number;
  brand?: string;
  rating: number;
  reviews_count: number;
  barcode: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortKey, setSortKey] = useState<string>("name");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get<{ products: Product[]; pages: number }>(
        "http://89.191.225.217/api/get_products",
        {
          params: { page, limit: 5 },
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.products) {
        setProducts(response.data.products);
        setTotalPages(response.data.pages);
      }
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [products, loading]);

  if (loading) {
    return <Spinner />;
  }

  const sortedProducts = [...products].sort((a, b) => {
    const aValue = a[sortKey as keyof Product] ?? "";
    const bValue = b[sortKey as keyof Product] ?? "";
  
    if (typeof aValue === "string" && typeof bValue === "string") {
      return new Intl.Collator(undefined, { numeric: true, sensitivity: "base" }).compare(aValue, bValue);
    }
    if (typeof aValue === "number" && typeof bValue === "number") {
      return aValue - bValue;
    }
  
    return 0;
  });

  return (
    <ProductsContainer>
      <Title level={2}>Список товаров</Title>
      <SortContainer>
        <label>Сортировать по: </label>
        <Select
          value={sortKey}
          onChange={(value) => setSortKey(value)}
          style={{ width: 122, height: 20 }}
        >
          <Option value="name">Название</Option>
          <Option value="price">Цена</Option>
          <Option value="stock">На складе</Option>
          <Option value="brand">Бренд</Option>
          <Option value="rating">Рейтинг</Option>
          <Option value="reviews_count">Отзывы</Option>
          <Option value="barcode">Штрихкод</Option>
        </Select>
      </SortContainer>

      {sortedProducts.length === 0 && <p>Нет доступных товаров</p>}
      {sortedProducts.map((product) => (
        <StyledCard
          key={product.id}
          cover={
            Array.isArray(product.images) && product.images.length > 0 ? (
              <ProductImage
                src={`http://89.191.225.217${product.images[0]}`}
                alt={product.name}
              />
            ) : (
              <NoImage>No Image</NoImage>
            )
          }
        >
          <Title level={4}>{product.name}</Title>
          <p style={{ color: "#555" }}>{product.description}</p>
          <p><strong>Цена:</strong> {product.discount_price || product.price} $</p>
          <p><strong>Бренд:</strong> {product.brand || "Не указан"}</p>
          <p><strong>Остаток на складе:</strong> {product.stock}</p>
          <p><strong>Рейтинг:</strong> {product.rating} / 5</p>
          <p><strong>Количество отзывов:</strong> {product.reviews_count}</p>
          <p><strong>Штрихкод:</strong> {product.barcode}</p>
        </StyledCard>
      ))}
      <PaginationContainer>
        <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1 || loading}>← Назад</Button>
        <PageIndicator>Страница {page} из {totalPages}</PageIndicator>
        <Button onClick={() => setPage((prev) => prev + 1)} disabled={page >= totalPages || loading}>Вперёд →</Button>
      </PaginationContainer>
    </ProductsContainer>
  );
};

export default Products;
