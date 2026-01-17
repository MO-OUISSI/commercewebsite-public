import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { MOCK_COLLECTIONS } from '../data/mockData';
import '../styles/pages/Home.css';

const Home = () => {
    const { storeInfo } = useStore();

    // Directly derive sections from local data for instant performance
    const sections = MOCK_COLLECTIONS.map(coll => {
        const collectionProducts = PRODUCTS.filter(p => p.category === coll.slug);
        return {
            collection: coll,
            products: collectionProducts.slice(0, 4) // Show top 4 products
        };
    }).filter(section => section.products.length > 0);

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className={`hero-bg ${!storeInfo?.photo ? 'clean-design' : ''}`}>
                    {storeInfo?.photo ? (
                        <img src={storeInfo.photo} alt={storeInfo.title || 'Hero'} className="hero-image-zoom" />
                    ) : (
                        <>
                            <div className="hero-image-grid">
                                <div className="hero-image-item hero-image-main">
                                    <img src="/images/hero/fashion-main.png" alt="Fashion Collection" />
                                </div>
                                <div className="hero-image-item hero-image-secondary">
                                    <img src="/images/hero/fashion-secondary.png" alt="Premium Clothing" />
                                </div>
                            </div>
                        </>
                    )}
                    <div className="hero-overlay"></div>
                </div>

                <div className="hero-content container">
                    <div className="hero-info">
                        <h1 className="hero-title1 animate-up" style={{ animationDelay: '0.2s' }}>
                            A Better way to buy clothes
                        </h1>
                        <p className="hero-subtitle animate-up" style={{ animationDelay: '0.3s' }}>
                            Experience premium comfort and timeless style. <br className="hidden md:block" />
                            Designed for everyday wear, made to fit your lifestyle.
                        </p>
                        <div className="hero-actions animate-up" style={{ animationDelay: '0.4s' }}>
                            <Link to="/shop/all" className="btn btn-primary">Shop Collection</Link>
                            <Link to="/new-arrivals" className="btn btn-secondary">New Arrivals</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dynamic Collection Sections */}
            {sections.map((section, idx) => (
                <section key={section.collection._id} className="featured-section container">
                    <div className="section-header">
                        <div>
                            <span className="section-subtitle">Collection</span>
                            <h2 className="section-title">{section.collection.name}</h2>
                        </div>
                        <Link to={`/shop/${section.collection.slug}`} className="view-all-link group">
                            View Selection <ArrowRight size={16} className="group-hover-translate" />
                        </Link>
                    </div>
                    <div className="product-grid">
                        {section.products.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Home;
