import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';
import '../styles/components/SearchOverlay.css';

const SearchOverlay = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            setSearchTerm('');
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Instant synchronous search from local data
    const results = searchTerm.length >= 2
        ? PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <div className={`search-overlay ${isOpen ? 'open' : ''}`}>
            <div className="search-container container">
                <div className="search-header">
                    <button onClick={onClose} className="close-search-btn" aria-label="Close search">
                        <X size={24} />
                    </button>
                    <div className="search-input-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search products..."
                            className="search-input"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </div>

            <div className="search-results-container">
                <div className="container">
                    {searchTerm.length === 0 && (
                        <div className="search-empty-state">
                            <Search className="empty-icon" size={48} />
                            <p className="empty-title">Search Products</p>
                            <p className="empty-subtitle">Start typing to find what you're looking for</p>
                        </div>
                    )}

                    {searchTerm.length > 0 && searchTerm.length < 2 && (
                        <div className="search-empty-state">
                            <Search className="empty-icon" size={48} />
                            <p className="empty-title">Type more...</p>
                            <p className="empty-subtitle">Please enter at least 2 characters</p>
                        </div>
                    )}

                    {searchTerm.length >= 2 && results.length === 0 && (
                        <div className="search-empty-state">
                            <Search className="empty-icon" size={48} />
                            <p className="empty-title">No products found</p>
                            <p className="empty-subtitle">Try searching with different keywords</p>
                        </div>
                    )}

                    {searchTerm.length >= 2 && results.length > 0 && (
                        <>
                            <div className="search-results-header">
                                <p className="results-count">
                                    {results.length} {results.length === 1 ? 'product' : 'products'} found
                                </p>
                            </div>
                            <div className="search-grid">
                                {results.map(p => (
                                    <ProductCard
                                        key={p.id}
                                        product={p}
                                        onClick={onClose}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchOverlay;
