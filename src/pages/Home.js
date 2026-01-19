import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { MOCK_COLLECTIONS } from '../data/mockData';
import '../styles/pages/Home.css';

const Home = () => {

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
            <section className="hero-section neon-theme">
                <div className="hero-bg">
                    <img src="/neon-bg.png" alt="Neon Atmosphere" className="hero-background-image" />
                    <div className="hero-overlay-neon"></div>
                </div>

                <div className="hero-content container">
                    <div className="neon-sign-container animate-up">
                        <div className="neon-sign-circle">
                            <div className="neon-shoe-icon">
                                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="neon-svg-blue">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                    <line x1="12" y1="22.08" x2="12" y2="12" />
                                </svg>
                            </div>
                            <h1 className="neon-title">Le Bon Choix</h1>
                            <div className="neon-subtitle-group">
                                <span className="neon-text-blue">MEILLEURE PRIX</span>
                                <span className="neon-text-orange">PREMIÈRE QUALITÉ</span>
                            </div>
                            <div className="neon-line"></div>
                        </div>

                        <div className="hero-actions animate-up" style={{ animationDelay: '0.6s' }}>
                            <Link to="/shop/all" className="btn btn-neon-primary">Shop Collection</Link>
                            <Link to="/new-arrivals" className="btn btn-neon-secondary">New Arrivals</Link>
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
