import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import '../styles/pages/NewArrivals.css';

const NewArrivals = () => {
    // Directly filter from local data for instant performance
    const products = PRODUCTS.filter(p => p.isNewProduct === true);

    return (
        <div className="new-arrivals-page container">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <Link to="/" className="breadcrumb-link">Home</Link> / <span className="breadcrumb-current">New Arrivals</span>
            </div>

            {/* Hero Section */}
            <section className="new-arrivals-hero">
                <div className="hero-content">
                    <span className="hero-label">Fresh Drops</span>
                    <h1 className="hero-title">New Arrivals</h1>
                    <p className="hero-description">
                        Discover our latest sustainable footwear crafted from nature's finest materials.
                        Each pair tells a story of innovation and environmental responsibility.
                    </p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="new-arrivals-products">
                {products.length > 0 ? (
                    <div className="shop-grid">
                        {products.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-products">
                        <p>No new arrivals at the moment.</p>
                        <Link to="/shop/all" className="view-all-btn">View all products</Link>
                    </div>
                )}
            </section>
        </div>
    );
};

export default NewArrivals;
