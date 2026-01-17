import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import '../styles/components/YouMayAlsoLike.css';

const YouMayAlsoLike = ({ products, currentProductId }) => {
    const scrollContainerRef = useRef(null);

    // Filter out current product and get random suggestions
    const suggestions = products
        .filter(p => p.id !== currentProductId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 8);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const newScrollLeft = scrollContainerRef.current.scrollLeft +
                (direction === 'left' ? -scrollAmount : scrollAmount);

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    if (suggestions.length === 0) return null;

    return (
        <div className="you-may-also-like">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Vous aimerez aussi</h2>
                    <div className="scroll-controls">
                        <button
                            type="button"
                            onClick={() => scroll('left')}
                            className="scroll-btn"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            type="button"
                            onClick={() => scroll('right')}
                            className="scroll-btn"
                            aria-label="Scroll right"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="products-scroll-container" ref={scrollContainerRef}>
                    <div className="products-scroll-content">
                        {suggestions.map(product => (
                            <div key={product.id} className="product-scroll-item">
                                <ProductCard
                                    product={product}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YouMayAlsoLike;
