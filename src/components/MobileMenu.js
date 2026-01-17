import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Sparkles, Info, LayoutGrid, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MOCK_COLLECTIONS } from '../data/mockData';
import '../styles/components/MobileMenu.css';

const MobileMenu = ({ isOpen, onClose }) => {
    const { storeInfo } = useStore();
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

    const toggleCollections = (e) => {
        e.preventDefault();
        setIsCollectionsOpen(!isCollectionsOpen);
    };

    const collections = MOCK_COLLECTIONS;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`mobile-menu-backdrop ${isOpen ? 'open' : ''}`}
                onClick={onClose}
            ></div>

            {/* Menu Panel */}
            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <span className="mobile-menu-title">{storeInfo?.title || 'Menu'}</span>
                    <button onClick={onClose} className="close-btn">
                        <X size={24} />
                    </button>
                </div>

                <div className="mobile-menu-links">
                    <Link to="/shop/all" onClick={onClose} className="mobile-link">
                        <ShoppingBag size={20} className="link-icon" />
                        <span>Products</span>
                    </Link>
                    <Link to="/new-arrivals" onClick={onClose} className="mobile-link">
                        <Sparkles size={20} className="link-icon" />
                        <span>New Arrivals</span>
                    </Link>

                    {/* Collections Toggle */}
                    <div className={`mobile-link-container ${isCollectionsOpen ? 'active' : ''}`}>
                        <button onClick={toggleCollections} className="mobile-link w-full text-left">
                            <LayoutGrid size={20} className="link-icon" />
                            <span>Collections</span>
                            <div className="link-arrow">
                                {isCollectionsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                        </button>

                        <div className={`mobile-submenu ${isCollectionsOpen ? 'open' : ''}`}>
                            {collections.length > 0 ? (
                                collections.map(collection => (
                                    <Link
                                        key={collection._id}
                                        to={`/shop/${collection.slug}`}
                                        onClick={onClose}
                                        className="submenu-link"
                                    >
                                        {collection.name}
                                    </Link>
                                ))
                            ) : (
                                <div className="submenu-loading">No collections</div>
                            )}
                        </div>
                    </div>

                    <Link to="/about" onClick={onClose} className="mobile-link">
                        <Info size={20} className="link-icon" />
                        <span>Our Story</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
