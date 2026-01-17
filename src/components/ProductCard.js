import React from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../api/apiClient';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatDisplayPrice } from '../utils/priceFormatter';
import '../styles/components/ProductCard.css';

const ProductCard = ({ product, onClick }) => {
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const productId = product._id || product.id;

    // Calculate total stock across all colors and sizes
    const calculateTotalStock = () => {
        if (!product.colors || product.colors.length === 0) return 0;
        return product.colors.reduce((total, color) => {
            const colorStock = color.sizes?.reduce((sum, size) => sum + (size.stock || 0), 0) || 0;
            return total + colorStock;
        }, 0);
    };

    const totalStock = calculateTotalStock();
    const isOutOfStock = totalStock === 0;

    const handleQuickAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isOutOfStock) {
            showToast("This product is out of stock.", "error");
            return;
        }

        if (!product.colors || product.colors.length === 0) {
            showToast("This product is currently unavailable.", "error");
            return;
        }

        // Default to first color and first available size
        const defaultColor = product.colors[0];
        const availableSize = defaultColor.sizes?.find(s => s.stock > 0);

        if (!availableSize) {
            showToast("This color is out of stock.", "error");
            return;
        }

        addToCart(product, defaultColor.name, availableSize.label, 1);
        showToast(`Added ${product.name} to cart!`, "success");
    };

    const firstColorImage = product.colors?.[0]?.images?.[0];
    const mainImage = product.images?.[0];
    const rawImage = firstColorImage || mainImage;

    // Handle different image sources:
    // - If starts with 'http': external URL (use as-is)
    // - If starts with '/': local public folder image (use as-is)
    // - Otherwise: backend image (prepend BASE_URL)
    const imageUrl = rawImage?.startsWith('http')
        ? rawImage
        : rawImage?.startsWith('/')
            ? rawImage
            : `${BASE_URL}${rawImage || ''}`;

    return (
        <div className={`product-card group ${isOutOfStock ? 'out-of-stock' : ''}`}>
            <Link to={`/product/${productId}`} className="product-image-wrapper" onClick={onClick}>
                <div className="image-container">
                    {isOutOfStock ? (
                        <span className="badge out-of-stock-badge">Out of Stock</span>
                    ) : (
                        <>
                            {product.isFeatured ? (
                                <span className="badge promo">Promo</span>
                            ) : product.isOnSale ? (
                                <span className="badge sale">Sale</span>
                            ) : product.isNewProduct ? (
                                <span className="badge new">New</span>
                            ) : null}
                        </>
                    )}
                    <img src={imageUrl} alt={product.name} className="product-image" />

                    {!isOutOfStock && (
                        <button
                            className="quick-add-btn"
                            onClick={handleQuickAdd}
                        >
                            Add to Cart {formatDisplayPrice(product.salePrice || product.price, true)}
                        </button>
                    )}
                </div>
            </Link>

            <div className="product-info">
                <div className="product-header">
                    <Link to={`/product/${productId}`} className="product-name" onClick={onClick}>{product.name}</Link>
                    <span className="product-price">
                        {product.salePrice ? (
                            <>
                                <span className="original-price">{formatDisplayPrice(product.price, true)}</span>
                                <span className="sale-price">{formatDisplayPrice(product.salePrice, true)}</span>
                            </>
                        ) : (
                            formatDisplayPrice(product.price, true)
                        )}
                    </span>
                </div>
                <p className="product-meta">
                    {product.category} · {product.colors ? product.colors.length : 0} Colors
                </p>
            </div>
        </div>
    );
};

export const ProductCardSkeleton = () => {
    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <div className="image-container skeleton" style={{ background: 'var(--color-stone-100)' }}>
                    {/* Just the skeleton box with shimmer from CSS */}
                </div>
            </div>
            <div className="product-info">
                <div className="product-header" style={{ marginBottom: '0.5rem' }}>
                    <div className="skeleton" style={{ width: '60%', height: '1.25rem' }}></div>
                    <div className="skeleton" style={{ width: '25%', height: '1.25rem' }}></div>
                </div>
                <div className="skeleton" style={{ width: '40%', height: '0.75rem' }}></div>
            </div>
        </div>
    );
};

export default ProductCard;
