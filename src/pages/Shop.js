import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { MOCK_COLLECTIONS } from '../data/mockData';
import '../styles/pages/Shop.css';

const Shop = () => {
    const { category = 'all' } = useParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        color: '',
        sortBy: '' // 'price-asc', 'price-desc'
    });

    // Directly use local data for instant performance
    const collections = MOCK_COLLECTIONS;
    let initialProducts = [...PRODUCTS];

    if (category !== 'all') {
        initialProducts = initialProducts.filter(p => p.category === category);
    }

    // Extract available colors dynamically (only from in-stock colors)
    const availableColors = Array.from(new Set(
        initialProducts.flatMap(p =>
            p.colors
                ?.filter(c => c.sizes?.some(s => s.stock > 0))
                .map(c => c.name) || []
        )
    )).sort();

    const handleNavigateCategory = (e) => {
        const targetCategory = e.target.value;
        if (targetCategory === 'all') {
            window.location.href = '/shop/all';
        } else {
            window.location.href = `/shop/${targetCategory}`;
        }
    };

    // Filter and Sort Logic
    let displayProducts = [...initialProducts];
    let title = "All Products";
    let breadcrumbTitle = category;

    // Find collection name by slug
    if (category !== 'all') {
        const currentCollection = collections.find(c => c.slug === category);
        if (currentCollection) {
            title = currentCollection.name;
            breadcrumbTitle = currentCollection.name;
        } else {
            title = category.charAt(0).toUpperCase() + category.slice(1);
            breadcrumbTitle = title;
        }
    }

    // Apply Filters
    displayProducts = displayProducts.filter(p => {
        // Color Filter
        if (filters.color) {
            const hasColorInStock = p.colors?.some(c =>
                c.name === filters.color && c.sizes?.some(s => s.stock > 0)
            );
            if (!hasColorInStock) return false;
        }
        return true;
    });

    // Apply Sorting
    if (filters.sortBy === 'price-asc') {
        displayProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (filters.sortBy === 'price-desc') {
        displayProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    }

    return (
        <div className="shop-page container">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <Link to="/" className="breadcrumb-link">Home</Link> / <span className="breadcrumb-current">{breadcrumbTitle}</span>
            </div>

            <div className="shop-header">
                <h1 className="shop-title">{title}</h1>
                <span className="item-count">
                    {displayProducts.length} Items
                </span>
            </div>

            <div className="shop-layout">
                {/* Mobile Filter Trigger */}
                <button className="mobile-filter-btn" onClick={() => setIsFilterOpen(true)}>
                    <SlidersHorizontal size={18} /> Filters & Sort
                </button>

                {/* Sidebar Filters (Desktop) */}
                <aside className="shop-sidebar">
                    <div className="sidebar-section">
                        <h3 className="sidebar-title">Sort By Price</h3>
                        <select
                            className="sidebar-select"
                            value={filters.sortBy}
                            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                        >
                            <option value="">Default Sorting</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>

                    <div className="sidebar-section">
                        <h3 className="sidebar-title">Collections</h3>
                        <select
                            className="sidebar-select"
                            value={category}
                            onChange={handleNavigateCategory}
                        >
                            <option value="all">All Collections</option>
                            {collections.map(c => (
                                <option key={c._id} value={c.slug}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="sidebar-section">
                        <h3 className="sidebar-title">Color</h3>
                        <select
                            className="sidebar-select"
                            value={filters.color}
                            onChange={(e) => setFilters(prev => ({ ...prev, color: e.target.value }))}
                        >
                            <option value="">All Colors</option>
                            {availableColors.map(color => (
                                <option key={color} value={color}>{color}</option>
                            ))}
                        </select>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="shop-grid-container">
                    {displayProducts.length > 0 ? (
                        <div className="shop-grid">
                            {displayProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-products">
                            <p>No products found in this category.</p>
                            <Link to="/shop/all" className="view-all-btn">View all products</Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Filter Modal */}
            <div className={`filter-modal-overlay ${isFilterOpen ? 'open' : ''}`} onClick={() => setIsFilterOpen(false)}>
                <div className="filter-modal" onClick={e => e.stopPropagation()}>
                    <div className="filter-modal-header">
                        <span className="filter-modal-title">Filters</span>
                        <button className="filter-close-btn" onClick={() => setIsFilterOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>

                    <div className="filter-modal-body">
                        <div className="sidebar-section">
                            <h3 className="sidebar-title">Sort By Price</h3>
                            <select
                                className="sidebar-select"
                                value={filters.sortBy}
                                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                            >
                                <option value="">Default Sorting</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                        </div>

                        <div className="sidebar-section">
                            <h3 className="sidebar-title">Collections</h3>
                            <select
                                className="sidebar-select"
                                value={category}
                                onChange={handleNavigateCategory}
                            >
                                <option value="all">All Collections</option>
                                {collections.map(c => (
                                    <option key={c._id} value={c.slug}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="sidebar-section">
                            <h3 className="sidebar-title">Color</h3>
                            <select
                                className="sidebar-select"
                                value={filters.color}
                                onChange={(e) => setFilters(prev => ({ ...prev, color: e.target.value }))}
                            >
                                <option value="">All Colors</option>
                                {availableColors.map(color => (
                                    <option key={color} value={color}>{color}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="filter-modal-footer">
                        <button className="clear-filters-btn" onClick={() => setFilters({ color: '', sortBy: '' })}>
                            Clear All
                        </button>
                        <button className="apply-filters-btn" onClick={() => setIsFilterOpen(false)}>
                            Show {displayProducts.length} Items
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
