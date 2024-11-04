import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductItem from './ProductItem';
import Filter from './Filter';

interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
  categories: string[];
  rating: number;
  free_shipping: boolean;
  brand: string;
  url: string;
  objectID: string;
}

interface ProductListProps {
  searchQuery: string;
}

const ProductList: React.FC<ProductListProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    categoryLvl0: '',
    categoryLvl1: '',
    brand: '',
    priceRange: [84, 4000] as [number, number],
    freeShipping: false,
    rating: 0,
  });
  const [filterKey, setFilterKey] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  // Update filters from URL on page load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryLvl0 = params.get('categoryLvl0') || '';
    const categoryLvl1 = params.get('categoryLvl1') || '';
    const brand = params.get('brand') || '';
    const priceMin = parseInt(params.get('priceMin') || '84', 10);
    const priceMax = parseInt(params.get('priceMax') || '4000', 10);
    const freeShipping = params.get('freeShipping') === 'true';
    const rating = parseInt(params.get('rating') || '0', 10);

    setFilters({
      categoryLvl0,
      categoryLvl1,
      brand,
      priceRange: [priceMin, priceMax],
      freeShipping,
      rating,
    });
  }, [location.search]);

  // Fetch products from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/results`);
        const data = await response.json();

        if (Array.isArray(data) && data[0]?.hits?.length) {
          setProducts(data[0].hits);
          setFilteredProducts(data[0].hits);
        } else {
          console.error('No valid data found');
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };

    fetchData();
  }, []);

  // Highlight search query in product fields
  const highlightMatch = (text: string) => {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? <strong key={index} className="text-yellow-500">{part}</strong> : part
    );
  };

  // Apply filters to products
  useEffect(() => {
    const applyFilters = () => {
      const filtered = products.filter((product) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.categories.some((cat) => cat.toLowerCase().includes(searchLower)) ||
          product.brand.toLowerCase().includes(searchLower);

        const matchesCategoryLvl0 = filters.categoryLvl0
          ? product.categories.includes(filters.categoryLvl0)
          : true;

        const matchesCategoryLvl1 = filters.categoryLvl1
          ? product.categories.includes(filters.categoryLvl1)
          : true;

        const matchesBrand = filters.brand
          ? product.brand.toLowerCase() === filters.brand.toLowerCase()
          : true;

        const matchesPrice =
          product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];

        const matchesFreeShipping = filters.freeShipping ? product.free_shipping : true;

        const matchesRating = filters.rating ? product.rating >= filters.rating : true;

        return (
          matchesSearch &&
          matchesCategoryLvl0 &&
          matchesCategoryLvl1 &&
          matchesBrand &&
          matchesPrice &&
          matchesFreeShipping &&
          matchesRating
        );
      });

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [filters, products, searchQuery]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.categoryLvl0) params.set('categoryLvl0', filters.categoryLvl0);
    if (filters.categoryLvl1) params.set('categoryLvl1', filters.categoryLvl1);
    if (filters.brand) params.set('brand', filters.brand);
    if (filters.priceRange[0] !== 84) params.set('priceMin', filters.priceRange[0].toString());
    if (filters.priceRange[1] !== 4000) params.set('priceMax', filters.priceRange[1].toString());
    if (filters.freeShipping) params.set('freeShipping', filters.freeShipping.toString());
    if (filters.rating !== 0) params.set('rating', filters.rating.toString());

    navigate({ search: params.toString() }, { replace: true });
  }, [filters, navigate]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      categoryLvl0: '',
      categoryLvl1: '',
      brand: '',
      priceRange: [84, 4000],
      freeShipping: false,
      rating: 0,
    });
    setFilterKey((prevKey) => prevKey + 1);
    navigate({ search: '' }, { replace: true });
  };

  return (
    <div className="flex container">
      <div className="w-1/4">
        <Filter
          key={filterKey}
          categories={products.map((product) => ({
            lvl0: product.categories[0],
            lvl1: product.categories[1],
            // lvl2: product.categories[2],
          }))}
          brands={Array.from(new Set(products.map((product) => product.brand || '')))}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
      </div>
      <div className="w-3/4 grid grid-cols-4 gap-4 p-4 h-4">
        {filteredProducts.length === 0 ? (
          <div className="col-span-4 text-center py-20">
            <h2 className="text-xl font-semibold">Không tìm thấy sản phẩm</h2>
            <p className="text-gray-500">Vui lòng thử lại sau.</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductItem
              key={product.objectID}
              name={highlightMatch(product.name)}
              description={highlightMatch(product.description)}
              price={product.price}
              image={product.image}
              categories={product.categories.map(highlightMatch)}
              rating={product.rating}
              freeShipping={product.free_shipping}
              url={product.url}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
