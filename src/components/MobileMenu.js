import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Sparkles, Info, LayoutGrid, ChevronDown, ChevronUp } from 'lucide-react';
import collectionService from '../api/collectionService';
import { useStore } from '../context/StoreContext';
import '../styles/components/MobileMenu.css';

const MobileMenu = ({ isOpen, onClose }) => {
    const { storeInfo } = useStore();
    const [collections, setCollections] = useState([]);
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const data = await collectionService.getCollections();
                if (data?.data?.collections) {
                    setCollections(data.data.collections);
                } else if (Array.isArray(data)) {
                    setCollections(data);
                }
            } catch (error) {
                console.error("Failed to fetch collections for mobile menu", error);
            }
        };

        if (isOpen) {
            fetchCollections();
        }
    }, [isOpen]);

    const toggleCollections = (e) => {
        e.preventDefault();
        setIsCollectionsOpen(!isCollectionsOpen);
    };

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
                                <div className="submenu-loading">Loading...</div>
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
