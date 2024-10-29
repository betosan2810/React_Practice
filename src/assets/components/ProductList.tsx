// src/components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';

interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
  categories: string[];
  rating: number;
  free_shipping: boolean;
  url: string;
  objectID: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/results'); // Thay thế bằng API thật
        const data = await response.json();
        
        // Kiểm tra nếu có kết quả và phần tử 'hits' không trống
        if (data && data.length > 0 && data[0].hits && data[0].hits.length > 0) {
          const hits = data[0].hits; // Truy cập vào 'hits' trong phần tử đầu tiên
          setProducts(hits);
        } else {
          console.error('No valid data found');
        }
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <ProductItem
          key={product.objectID}
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
          categories={product.categories}
          rating={product.rating}
          freeShipping={product.free_shipping}
          url={product.url}
        />
      ))}
    </div>
  );
};

export default ProductList;
