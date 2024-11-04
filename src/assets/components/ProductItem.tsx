// src/components/ProductItem.tsx
import React from 'react';

interface ProductItemProps {
  name: React.ReactNode;
  description: React.ReactNode;
  price: number;
  image: string;
  categories: React.ReactNode[];
  rating: number;
  freeShipping: boolean;
  url: string;
}

const ProductItem: React.FC<ProductItemProps> = ({
  name,
  description,
  price,
  image,
  categories,
  rating,
  url,
}) => {
  return (
    <div className="border px-10 py-16 rounded-lg">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img
          src={image}
          alt={typeof name === 'string' ? name : 'Product Image'} // Đảm bảo alt là string
          className="w-auto m-auto h-28 bg-cover mb-12"
        />
      </a>
      <p className="text-xl font-semibold text-gray-500">
        {categories.map((category, index) => (
          <span key={index}>
            {category}
            {index < categories.length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>
      <h3 className="text-xl font-semibold text-black">{name}</h3>
      <p title={typeof description === 'string' ? description : ''} className="text-gray-700 text-sm line-clamp-3 my-2">
        {description}
      </p>
      <div className="py-4 flex space-x-2">
        <span className="text-yellow-500 text-lg">$</span>
        <span className="font-semibold text-xl">{price.toFixed(2)}</span>
        <span className="flex items-center px-1 text-sm border-2 border-yellow-500 rounded">
          <img src="/star.svg" className="w-4 h-4 me-1" alt="star" /> {rating}
        </span>
      </div>
      {/* {freeShipping && <p className="text-green-500 text-sm">Free Shipping</p>} */}
    </div>
  );
};

export default ProductItem;
