import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Truck, Minus, Plus, CreditCard, Maximize2, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import ImageZoomModal from '../components/ImageZoomModal';
import { PRODUCTS } from '../data/products';
import { BASE_URL } from '../api/apiClient';
import YouMayAlsoLike from '../components/YouMayAlsoLike';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useStore } from '../context/StoreContext';
import { formatDisplayPrice } from '../utils/priceFormatter';
import '../styles/pages/ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const { storeInfo } = useStore();

    // Directly derive product from local data for instant performance
    const product = PRODUCTS.find(p => (p.id === id || p._id === id));

    // Initial state setup for selections
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isZoomOpen, setIsZoomOpen] = useState(false);
    const [touchStart, setTouchStart] = useState(null);

    // Reset selection state when id changes
    useEffect(() => {
        if (product) {
            const initialColor = product.colors?.[0]?.name || '';
            setSelectedColor(initialColor);
            setSelectedSize(null);
            setQuantity(1);
            setActiveIndex(0);
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [id, product]);

    if (!product) return <div className="container py-20 text-center">Product not found.</div>;

    // Calculate total stock
    const totalStock = product.colors?.reduce((total, color) => {
        const colorStock = color.sizes?.reduce((sum, size) => sum + (size.stock || 0), 0) || 0;
        return total + colorStock;
    }, 0) || 0;
    const isOutOfStock = totalStock === 0;

    // Derived state for the currently selected color object to access its specific data (image, sizes)
    const selectedColorObj = product.colors?.find(c => c.name === selectedColor);
    const images = selectedColorObj?.images || (product.images?.length ? product.images : []);

    const handleQuantityChange = (val) => {
        if (val < 1) return;
        setQuantity(val);
    };

    // Helper to format image URL
    const getImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        if (path.startsWith('/')) return path;
        return `${BASE_URL}${path}`;
    };

    // Slider Navigation
    const nextSlide = (e) => {
        e?.stopPropagation();
        if (images.length > 1) {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }
    };

    const prevSlide = (e) => {
        e?.stopPropagation();
        if (images.length > 1) {
            setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
        }
    };

    // Swipe handlers
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        if (!touchStart) return;
        const touchEnd = e.changedTouches[0].clientX;
        const distance = touchStart - touchEnd;

        // Threshold for swipe
        if (distance > 50) {
            nextSlide();
        } else if (distance < -50) {
            prevSlide();
        }
        setTouchStart(null);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            showToast('Please select a size', 'info');
            return;
        }

        const variantStock = selectedColorObj?.sizes?.find(s => s.label === selectedSize)?.stock || 0;

        if (quantity > variantStock) {
            showToast(`Only ${variantStock} left in stock!`, 'error');
            return;
        }

        addToCart(product, selectedColor, selectedSize, quantity);
        showToast('Added to cart!', 'success');
    };

    const handleBuyNow = () => {
        if (!selectedSize) {
            showToast('Please select a size', 'info');
            return;
        }

        const variantStock = selectedColorObj?.sizes?.find(s => s.label === selectedSize)?.stock || 0;

        if (quantity > variantStock) {
            showToast(`Only ${variantStock} left in stock!`, 'error');
            return;
        }

        // Construct direct buy item object
        const directBuyItem = {
            id: product._id || product.id,
            name: product.name,
            price: product.salePrice || product.price,
            image: getImageUrl(images[activeIndex]),
            selectedColor: selectedColor,
            selectedSize: selectedSize,
            quantity: quantity,
            productId: product._id || product.id
        };

        showToast('Proceeding to checkout...', 'success');
        navigate('/checkout', { state: { directBuyItem } });
    };

    return (
        <div className="product-detail-page container">
            {/* Back Button */}
            <button onClick={() => navigate(-1)} className="back-btn">
                <ArrowLeft size={18} /> Back
            </button>

            {/* Mobile Header (Title & Price) */}
            <div className="mobile-product-header">
                <h1 className="product-title">{product.name}</h1>
                <div className="product-price-large">
                    {product.salePrice ? (
                        <>
                            <span className="sale-price mr-2">{formatDisplayPrice(product.salePrice, true)}</span>
                            <span className="original-price text-gray-400 line-through text-lg">{formatDisplayPrice(product.price, true)}</span>
                        </>
                    ) : (
                        formatDisplayPrice(product.price, true)
                    )}
                </div>
            </div>

            <div className="product-layout">
                {/* Image Column */}
                <div className="product-images">
                    <div
                        className="main-image-wrapper"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {isOutOfStock ? (
                            <span className="badge out-of-stock">Out of Stock</span>
                        ) : product.isFeatured ? (
                            <span className="badge promo">Promo</span>
                        ) : product.isNewProduct ? (
                            <span className="badge new">New</span>
                        ) : null}
                        <div
                            className="slider-track"
                            style={{
                                transform: `translateX(-${activeIndex * 100}%)`,
                                display: 'flex',
                                width: '100%',
                                height: '100%',
                                transition: 'transform 0.5s ease-in-out'
                            }}
                        >
                            {images.map((img, idx) => (
                                <div key={idx} className="slider-slide" style={{ width: '100%', flexShrink: 0, height: '100%' }}>
                                    <img
                                        src={getImageUrl(img)}
                                        alt={`${product.name} ${idx + 1}`}
                                        className="main-image"
                                        onClick={() => setIsZoomOpen(true)}
                                        style={{ cursor: 'zoom-in', width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    className="slider-nav-btn prev"
                                    onClick={prevSlide}
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    className="slider-nav-btn next"
                                    onClick={nextSlide}
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}

                        {/* Expand Button */}
                        <button
                            className="expand-image-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsZoomOpen(true);
                            }}
                            aria-label="Zoom Image"
                        >
                            <Maximize2 size={20} />
                        </button>

                        {/* Mobile dots indicator */}
                        {images.length > 1 && (
                            <div className="mobile-dots">
                                {images.map((_, idx) => (
                                    <span
                                        key={idx}
                                        className={`dot ${idx === activeIndex ? 'active' : ''}`}
                                        onClick={() => setActiveIndex(idx)}
                                    ></span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Thumbnail grid */}
                    {images.length > 1 && (
                        <div className="thumbnail-grid">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    className={`thumb-btn ${idx === activeIndex ? 'active' : ''}`}
                                    onClick={() => setActiveIndex(idx)}
                                >
                                    <img src={getImageUrl(img)} alt={`${product.name} ${idx + 1}`} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details Column */}
                <div className="product-details">
                    <div className="desktop-product-header">
                        <h1 className="product-title">{product.name}</h1>
                        <div className="product-price-large">
                            {product.salePrice ? (
                                <>
                                    <span className="sale-price mr-2">{formatDisplayPrice(product.salePrice, true)}</span>
                                    <span className="original-price text-gray-400 line-through text-lg">{formatDisplayPrice(product.price, true)}</span>
                                </>
                            ) : (
                                formatDisplayPrice(product.price, true)
                            )}
                        </div>
                    </div>

                    <p className="product-description">
                        {product.description}
                    </p>

                    <div className="selections">
                        {/* Colors */}
                        <div className="selection-group">
                            <div className="selection-header">
                                <label>Select Color</label>
                                <span className="selection-value">{selectedColor}</span>
                            </div>
                            <div className="color-options">
                                {product.colors?.map(c => {
                                    const colorStock = c.sizes?.reduce((sum, size) => sum + (size.stock || 0), 0) || 0;
                                    const isColorOutOfStock = colorStock === 0;

                                    return (
                                        <button
                                            key={c.name}
                                            onClick={() => {
                                                if (!isColorOutOfStock) {
                                                    setSelectedColor(c.name);
                                                    setSelectedSize(null);
                                                    setActiveIndex(0);
                                                }
                                            }}
                                            className={`color-btn ${selectedColor === c.name ? 'selected' : ''} ${isColorOutOfStock ? 'disabled' : ''}`}
                                            title={isColorOutOfStock ? `${c.name} - Out of Stock` : c.name}
                                            disabled={isColorOutOfStock}
                                        >
                                            <span className="color-swatch" style={{ backgroundColor: c.hexCode }}></span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="selection-group">
                            <div className="selection-header">
                                <label>Select Size</label>
                                <button className="size-guide-link">Size Guide</button>
                            </div>
                            <div className="size-options">
                                {selectedColorObj ? (
                                    selectedColorObj.sizes?.map(sizeObj => (
                                        <button
                                            key={sizeObj.label}
                                            onClick={() => setSelectedSize(prev => prev === sizeObj.label ? null : sizeObj.label)}
                                            className={`size-btn ${selectedSize === sizeObj.label ? 'selected' : ''} ${sizeObj.stock === 0 ? 'disabled' : ''}`}
                                            disabled={sizeObj.stock === 0}
                                            title={sizeObj.stock === 0 ? 'Out of stock' : `${sizeObj.stock} available`}
                                        >
                                            {sizeObj.label}
                                        </button>
                                    ))
                                ) : (
                                    <div className="text-sm text-gray-500">Please select a color to view sizes</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="quantity-section">
                        <label className="quantity-label">Quantity</label>
                        <div className="quantity-selector">
                            <button
                                onClick={() => handleQuantityChange(quantity - 1)}
                                className="quantity-btn"
                                disabled={quantity <= 1}
                            >
                                <Minus size={16} />
                            </button>
                            <span className="quantity-display">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(quantity + 1)}
                                className="quantity-btn"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button
                            onClick={handleAddToCart}
                            className="add-to-cart-btn-large"
                            disabled={!selectedSize || isOutOfStock}
                            title={isOutOfStock ? 'Out of Stock' : (!selectedSize ? 'Please select a size' : 'Add to cart')}
                        >
                            <ShoppingBag size={20} /> {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                        </button>

                        <button
                            onClick={handleBuyNow}
                            className="buy-now-btn"
                            disabled={!selectedSize || isOutOfStock}
                            title={isOutOfStock ? 'Out of Stock' : (!selectedSize ? 'Please select a size' : 'Buy Now')}
                        >
                            <CreditCard size={20} /> Buy Now
                        </button>
                    </div>

                    <div className="features-grid">
                        <div className="feature-item">
                            <Truck size={20} />
                            <div>
                                <span className="feature-title">Livraison</span>
                                <span className="feature-desc">
                                    {storeInfo?.deliveryPrice > 0
                                        ? formatDisplayPrice(storeInfo.deliveryPrice)
                                        : 'Gratuite'}
                                </span>
                            </div>
                        </div>
                        <div className="feature-item">
                            <Clock size={20} />
                            <div>
                                <span className="feature-title">Livraison</span>
                                <span className="feature-desc">1-3 days</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* You May Also Like Section */}
            <YouMayAlsoLike
                products={PRODUCTS}
                currentProductId={product.id}
            />

            {/* Image Zoom Modal */}
            {isZoomOpen && (
                <ImageZoomModal
                    images={images}
                    initialIndex={activeIndex}
                    onClose={() => setIsZoomOpen(false)}
                />
            )}
        </div>
    );
};

export default ProductDetail;
