// src/components/ProductItem.tsx
import React from 'react';

interface ProductItemProps {
  name: string;
  description: string;
  price: number;
  image: string;
  categories: string[];
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
        <img src={image} alt={name} className="w-auto m-auto h-28 bg-cover mb-12" />
      </a>
      <p className="text-xl font-semibold text-gray-500">{categories[0]}</p>
      <h3 className="text-xl font-semibold text-black">{name}</h3>
      <p className="text-xl line-clamp-3">{description}</p>
          <div className="py-4 flex space-x-2">
              <span className="text-yellow-500 text-lg">$</span>
              <span className="font-semibold text-xl">{price.toFixed(2)}</span>
              <span className=" flex items-center px-1 text-sm border-2 border-yellow-500 rounded">
              <img src="/star.svg" className="w-4 h-4 me-1" alt="star" />  {rating}
              </span>
          </div>
    </div>
  );
};

export default ProductItem;
