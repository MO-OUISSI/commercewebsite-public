import React from 'react';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { formatDisplayPrice } from '../utils/priceFormatter';
import '../styles/components/CartPanel.css';

const CartPanel = ({ isOpen, onClose }) => {
    const { cartItems, updateQuantity, removeFromCart, cartSubtotal } = useCart();
    const { storeInfo } = useStore();

    const deliveryPrice = storeInfo?.deliveryPrice || 0;
    const effectiveShipping = cartSubtotal > 1000 ? 0 : deliveryPrice;

    // Close on escape key
    React.useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Prevent body scroll when panel is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            {/* Backdrop Overlay */}
            <div
                className={`cart-panel-overlay ${isOpen ? 'open' : ''}`}
                onClick={onClose}
            />

            {/* Cart Panel */}
            <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
                {/* Header */}
                <div className="cart-panel-header">
                    <h2 className="cart-panel-title">
                        Shopping Cart
                        {cartItems.length > 0 && (
                            <span className="cart-panel-count">
                                {cartItems.reduce((a, c) => a + c.quantity, 0)}
                            </span>
                        )}
                    </h2>
                    <button onClick={onClose} className="cart-panel-close" aria-label="Close cart">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="cart-panel-content">
                    {cartItems.length === 0 ? (
                        <div className="cart-panel-empty">
                            <div className="cart-panel-empty-icon">
                                <ShoppingCart size={24} />
                            </div>
                            <h3 className="cart-panel-empty-title">Your cart is empty</h3>
                            <p className="cart-panel-empty-desc">Add some items to get started</p>
                            <button onClick={onClose} className="btn btn-primary">
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="cart-panel-items">
                            {cartItems.map((item) => (
                                <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="cart-panel-item">
                                    <div className="cart-panel-item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="cart-panel-item-details">
                                        <div>
                                            <h4 className="cart-panel-item-name">{item.name}</h4>
                                            <p className="cart-panel-item-variant">
                                                {item.selectedColor} / Size {item.selectedSize}
                                            </p>
                                            <p className="cart-panel-item-price">{formatDisplayPrice(item.price * item.quantity)}</p>
                                        </div>
                                        <div className="cart-panel-item-actions">
                                            <div className="cart-panel-qty">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, -1)}
                                                    className="cart-panel-qty-btn"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="cart-panel-qty-val">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, 1)}
                                                    className="cart-panel-qty-btn"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                                                className="cart-panel-remove"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="cart-panel-footer">
                        <div className="cart-panel-totals">
                            <div className="cart-panel-total-row">
                                <span>Sous-total</span>
                                <span>{formatDisplayPrice(cartSubtotal)}</span>
                            </div>
                            <div className="cart-panel-total-row">
                                <span>Livraison</span>
                                <span className={effectiveShipping === 0 ? "free-shipping" : ""}>
                                    {effectiveShipping === 0 ? 'Gratuite' : formatDisplayPrice(effectiveShipping)}
                                </span>
                            </div>
                            <div className="cart-panel-divider"></div>
                            <div className="cart-panel-total-row final">
                                <span>Total</span>
                                <span>{formatDisplayPrice(cartSubtotal)}</span>
                            </div>
                        </div>
                        <Link
                            to="/checkout"
                            className="cart-panel-checkout-btn"
                            onClick={onClose}
                        >
                            Passer à la caisse <ArrowRight size={16} />
                        </Link>
                        <button onClick={onClose} className="cart-panel-continue">
                            Continuer mes achats
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartPanel;
