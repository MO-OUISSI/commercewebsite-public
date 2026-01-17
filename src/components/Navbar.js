import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MOCK_COLLECTIONS } from '../data/mockData';
import '../styles/components/Navbar.css';

const Navbar = ({ onOpenSearch, onOpenCart, onOpenMenu, cartCount = 0 }) => {
    const { storeInfo } = useStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const collections = MOCK_COLLECTIONS;

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isHome ? 'is-home' : ''}`}>
            <div className="navbar-container container">
                {/* Left: Branding */}
                <div className="navbar-logo">
                    <Link to="/">
                        {storeInfo?.title || 'NATURA'}
                    </Link>
                </div>

                {/* Center: Links (Desktop) */}
                <div className="navbar-links">
                    <div
                        className="nav-dropdown"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <button className="nav-dropdown-trigger">
                            Collections <ChevronDown size={14} className={`dropdown-icon ${isDropdownOpen ? 'rotate' : ''}`} />
                        </button>
                        <div className={`nav-dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                            {collections.length > 0 ? (
                                collections.map(collection => (
                                    <Link
                                        key={collection._id}
                                        to={`/shop/${collection.slug}`}
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        {collection.name}
                                    </Link>
                                ))
                            ) : (
                                <span className="dropdown-loading">No collections</span>
                            )}
                        </div>
                    </div>
                    <Link to="/shop/all">Products</Link>
                    <Link to="/new-arrivals">New Arrivals</Link>
                    <Link to="/about">About</Link>
                </div>

                {/* Right: Icons */}
                <div className="navbar-icons">
                    <button onClick={onOpenSearch} className="icon-btn">
                        <Search size={20} strokeWidth={1.5} />
                    </button>
                    <button onClick={onOpenCart} className="icon-btn cart-btn">
                        <ShoppingBag size={20} strokeWidth={1.5} />
                        <span className={`cart-count ${cartCount > 0 ? 'visible' : ''}`}>
                            {cartCount}
                        </span>
                    </button>
                    <button onClick={onOpenMenu} className="icon-btn mobile-menu-btn">
                        <Menu size={20} strokeWidth={1.5} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
