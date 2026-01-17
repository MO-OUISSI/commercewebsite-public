import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import AnnouncementBar from './components/AnnouncementBar';
import MobileMenu from './components/MobileMenu';
import CartPanel from './components/CartPanel';
import Footer from './components/Footer';
import SearchOverlay from './components/SearchOverlay';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import About from './pages/About';
import NewArrivals from './pages/NewArrivals';
import OrderSuccess from './pages/OrderSuccess';

import { StoreProvider } from './context/StoreContext';

function AppContent() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Use Cart Hook
    const { cartCount } = useCart();

    return (
        <div className="flex flex-col min-h-screen bg-white text-slate-900">
            <AnnouncementBar />
            <Navbar
                onOpenSearch={() => setIsSearchOpen(true)}
                onOpenCart={() => setIsCartOpen(true)}
                onOpenMenu={() => setIsMenuOpen(true)}
                cartCount={cartCount}
            />

            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
            <CartPanel
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />

            <main className="flex-grow w-full">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop/:category" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/new-arrivals" element={<NewArrivals />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default function App() {
    return (
        <StoreProvider>
            <CartProvider>
                <ToastProvider>
                    <Router>
                        <ScrollToTop />
                        <AppContent />
                    </Router>
                </ToastProvider>
            </CartProvider>
        </StoreProvider>
    );
}
