import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FilterProps {
    categories: { lvl0: string; lvl1?: string }[];
    brands: string[];
    onFilterChange: (filters: FilterState) => void;
    onClearFilters: () => void;
}

interface FilterState {
    categoryLvl0: string;
    categoryLvl1: string;
    brand: string;
    priceRange: [number, number];
    freeShipping: boolean;
    rating: number;
}

const Filter: React.FC<FilterProps> = ({ categories, brands, onFilterChange, onClearFilters }) => {
    const [filters, setFilters] = useState<FilterState>({
        categoryLvl0: '',
        categoryLvl1: '',
        brand: '',
        priceRange: [84, 4000],
        freeShipping: false,
        rating: 0,
    });
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategoryChange = (categoryLvl0: string, categoryLvl1?: string) => {
        setFilters((prev) => ({
            ...prev,
            categoryLvl0, // Lưu danh mục cha
            categoryLvl1: categoryLvl1 || '', // Lưu danh mục con nếu có
        }));
        onFilterChange({ ...filters, categoryLvl0, categoryLvl1: categoryLvl1 || '' });
    };

    const handleBrandChange = (brand: string) => {
        setFilters((prev) => ({ ...prev, brand }));
        onFilterChange({ ...filters, brand });
    };

    const handlePriceChange = (range: [number, number]) => {
        setFilters((prev) => ({ ...prev, priceRange: range }));
        onFilterChange({ ...filters, priceRange: range });
    };

    const handleFreeShippingToggle = () => {
        setFilters((prev) => ({ ...prev, freeShipping: !prev.freeShipping }));
        onFilterChange({ ...filters, freeShipping: !filters.freeShipping });
    };

    const handleRatingChange = (rating: number) => {
        setFilters((prev) => ({ ...prev, rating }));
        onFilterChange({ ...filters, rating });
    };

    const handleParentCategoryClick = (parentCategory: string) => {
        setSelectedCategory((prev) => (prev === parentCategory ? null : parentCategory));
        handleCategoryChange(parentCategory); // Cập nhật khi chọn danh mục cha
    };

    return (
        <div className="p-4 space-y-14">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-4xl">{t('filter')}</h2>
                <div
                    onClick={onClearFilters}
                    className="flex text-center items-center cursor-pointer"
                >
                    <img className="w-4 h-4 me-2" src="/filter-reset.svg" alt="reset icon" />
                    {t('clear')}
                </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
                <h3 className="font-semibold text-xl mb-4">{t('category')}</h3>
                <ul className="ms-3 space-y-1">
                    {Array.from(new Set(categories.map((cat) => cat.lvl0))).map((parentCategory) => (
                        <li key={parentCategory}>
                            <button
                                className={`flex text-xl ${filters.categoryLvl0 === parentCategory ? 'font-bold' : ''}`}
                                onClick={() => handleParentCategoryClick(parentCategory)}
                            >
                                {/* <div className="m-0 p-6 pe-0 w-auto h-1/2">
                                    <img src="/dropdown-1.svg" alt="..." />
                                </div> */}
                                <img src="/dropdown-1.svg" alt="..." className="w-6 h-6 items-center me-2" />
                                {parentCategory}
                            </button>

                            {/* Hiển thị danh mục con khi danh mục cha được chọn */}
                            {selectedCategory === parentCategory && (
                                <ul className="ml-4 space-y-1">
                                    {Array.from(
                                        new Set(
                                            categories
                                                .filter((cat) => cat.lvl0 === parentCategory)
                                                .map((cat) => cat.lvl1)
                                                .filter(Boolean)
                                        )
                                    ).map((subCategory) => (
                                        <li key={subCategory}>
                                            <button
                                                className={`flex text-xl ${filters.categoryLvl1 === subCategory ? 'font-bold' : ''}`}
                                                onClick={() => handleCategoryChange(parentCategory, subCategory)}
                                            >
                                                <img src="/dropdown-1.svg" alt="..." className="w-6 h-6 items-center me-2" />
                                                {subCategory}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
                <h3 className="font-semibold text-xl mb-4">{t('brand')}</h3>
                <div className="flex justify-normal space-x-2">
                    <div className="m-0 p-6 pe-0 w-auto h-full items-center">
                        <img src="/search.svg" alt="..." />
                    </div>
                    <input
                        type="text"
                        placeholder={t('placeholderBrand')}
                        className="w-full p-2 text-sm rounded-lg focus:outline-none"
                        onChange={(e) => handleBrandChange(e.target.value)}
                    />
                </div>
                <ul className="ms-10 space-y-1">
                    {brands.map((brand) => (
                        <li key={brand}>
                            <button
                                className={`text-xl ${filters.brand === brand ? 'font-bold' : ''}`}
                                onClick={() => handleBrandChange(brand)}
                            >
                                {brand}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
                <h3 className="font-semibold text-xl mb-4">{t('price')}</h3>
                <div className="flex justify-between text-sm mb-4">
                    <div className="space-x-2">
                        <span className="text-yellow-500">$</span>
                        <span>{filters.priceRange[0]}</span>
                    </div>
                    <div className="space-x-2">
                        <span className="text-yellow-500">$</span>
                        <span>{filters.priceRange[1]}</span>
                    </div>
                </div>
                <input
                    type="range"
                    min={84}
                    max={4000}
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceChange([84, parseInt(e.target.value)])}
                    className="w-full"
                />
            </div>

            {/* Free Shipping Filter */}
            <div className="mb-6">
                <h3 className="font-semibold text-xl mb-2">{t('freeShipping')}</h3>
                <div className="flex">
                    <span className="ml-3 text-xl">{t('display')}</span>
                    <span className="flex ml-4 text-xl items-center me-2">
                        {filters.freeShipping ? 'Yes' : 'No'} {/* Hiển thị Yes/No */}
                    </span>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.freeShipping}
                            onChange={handleFreeShippingToggle}
                            className="hidden"
                        />
                        <span className="relative">
                            <span className={`block w-10 h-6 bg-gray-400 rounded-full ${filters.freeShipping ? 'bg-yellow-500' : ''} transition`}></span>
                            <span className={`absolute left-0 top-1 w-4 h-4 bg-white rounded-full shadow transform transition ${filters.freeShipping ? 'translate-x-4' : ''}`}></span>
                        </span>
                    </label>
                </div>
            </div>

            {/* Rating Filter */}
            <div>
                <h3 className="font-semibold text-xl mb-4">{t('rating')}</h3>
                <ul className="space-y-5">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <li key={star}>
                            <button
                                className={`text-sm ${filters.rating === star ? 'font-bold' : ''}`}
                                onClick={() => handleRatingChange(star)}
                            >
                                {[...Array(star)].map((_, index) => (
                                    <img
                                        key={index}
                                        src="/star.svg"
                                        alt={`Star ${index + 1}`}
                                        className="inline-block w-6 h-6 me-2"
                                    />
                                ))}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Filter;
