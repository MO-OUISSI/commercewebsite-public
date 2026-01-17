import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard';
import productService from '../api/productService';
import '../styles/pages/NewArrivals.css';

const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                setLoading(true);
                const result = await productService.getAllProducts();

                let allProducts = [];
                if (Array.isArray(result)) {
                    allProducts = result;
                } else if (result?.data?.products && Array.isArray(result.data.products)) {
                    allProducts = result.data.products;
                } else if (result?.products && Array.isArray(result.products)) {
                    allProducts = result.products;
                }

                // Filter for new products
                // backend likely maps 'isNewProduct' to boolean
                const newArrivals = allProducts.filter(p => p.isNewProduct === true);
                setProducts(newArrivals);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch new arrivals", err);
                setError("Failed to load new arrivals. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchNewArrivals();
    }, []);

    // if (loading) return <div className="container py-20 text-center">Loading new arrivals...</div>;
    if (error) return <div className="container py-20 text-center text-red-500">{error}</div>;

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
                {loading ? (
                    <div className="shop-grid">
                        {Array(8).fill(0).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="shop-grid">
                        {products.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onQuickAdd={() => console.log('Add', product.id)}
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
