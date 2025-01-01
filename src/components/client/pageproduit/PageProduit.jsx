import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Element from '../../Element';

function Produit1() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [priceRange, setPriceRange] = useState(1000);
    const [selectedRating, setSelectedRating] = useState(0);
    const [sortOption, setSortOption] = useState('newest');
    const [categories, setCategories] = useState([]);

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const getCategories = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/category`);
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);
    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [products , sortOption]);

    const fetchProducts = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/products');
        const data = await response.json();
        setProducts(data?.data?.data || []);
    };

    const applyFilters = () => {
        let filtered = [...products];

        // Filter by category
        if (selectedCategory.length > 0) {
            filtered = filtered.filter((product) =>
                selectedCategory.includes(product.category.name)
            );
        }

        // Filter by price range
        filtered = filtered.filter((product) => product.price <= priceRange);



        // Sort products
        filtered = filtered.sort((a, b) => {
            if (sortOption === 'newest') return new Date(b.date) - new Date(a.date);
            if (sortOption === 'price-asc') return a.price - b.price;
            if (sortOption === 'price-desc') return b.price - a.price;
            return 0;
        });

        setFilteredProducts(filtered);
    };

    const toggleWishlist = (product) => {
        const itemExists = state.wishe.some((item) => item.id === product.id);
        dispatch({
            type: itemExists ? 'REMOVE_FROM_WISHLIST' : 'ADD_TO_WISHLIST',
            payload: product,
        });
    };

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory((prev) =>
            prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
        );
    };

    const handlePriceChange = (event) => {
        setPriceRange(event.target.value);
    };

    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
    };

    const handleSortChange = (option) => {
        setSortOption(option);
    };

    return (
        <div className="container py-5">
            {/* Header Section */}
            <div className="d-flex  align-items-center mb-4">
                <h4 className="mb-0 me-auto">Product Collection</h4>
                <div className="d-flex  gap-2 align-items-center">
                    <span className=" text-nowrap">Sort by:</span>
                    <select className="form-select" onChange={(e) => handleSortChange(e.target.value)}>
                        <option value="newest">Newest</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="row g-4">
                {/* Sidebar Filters */}
                <div className="col-lg-3">
                    <div className="filter-sidebar p-4 shadow-xl">
                        <div className="filter-group">
                            <h6 className="mb-3">Categories</h6>
                            {categories.map((category) => (
                                <div className="form-check mb-2" key={category.id}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={category.id}
                                        onChange={() => handleCategoryChange(category.name)}
                                    />
                                    <label className="form-check-label" htmlFor={category.id}>
                                        {category.name}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className="filter-group">
                            <h6 className="mb-3">Price Range</h6>
                            <input
                                type="range"
                                className="form-range"
                                min="0"
                                max="1000"
                                value={priceRange}
                                onChange={handlePriceChange}
                            />
                            <div className="d-flex justify-content-between">
                                <span className="text-muted">$0</span>
                                <span className="text-muted">${priceRange}</span>
                            </div>
                        </div>



                        <button className="btn btn-outline-primary my-4 w-100" onClick={applyFilters}>
                            Apply Filters
                        </button>
                    </div>
                </div>

                {/* Product Cards */}
                <div className="col-lg-9">
                    <div className="row g-4">
                        {filteredProducts.map((product, index) => (
                           <Element key={index} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Produit1;
