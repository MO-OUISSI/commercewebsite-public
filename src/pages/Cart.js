import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingCart } from 'lucide-react';
import { formatDisplayPrice } from '../utils/priceFormatter';
import '../styles/pages/Cart.css';

const Cart = () => {
    // Placeholder State
    const [cartItems, setCartItems] = useState([
        {
            id: "1",
            name: "Tree Runner",
            price: 98,
            category: "men",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
            colors: [{ name: "Mist", hexCode: "#e0f2fe" }],
            selectedColor: "Mist",
            selectedSize: "8",
            quantity: 1
        }
    ]);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const updateQty = (id, change) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(0, item.quantity + change);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty-state container">
                <div className="empty-icon-wrapper">
                    <ShoppingCart size={32} className="text-stone-400" />
                </div>
                <h2 className="empty-title">Your cart is empty</h2>
                <p className="empty-desc">Looks like you haven't added anything yet.</p>
                <Link to="/shop/all" className="btn btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page container">
            <Link to="/shop/all" className="back-link">
                <ArrowLeft size={16} /> Continue Shopping
            </Link>

            <div className="cart-header">
                <h1 className="cart-title">
                    Shopping Cart <span className="cart-count-header">{cartItems.reduce((a, c) => a + c.quantity, 0)}</span>
                </h1>
            </div>

            <div className="cart-layout">
                {/* Cart Items */}
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="cart-item">
                            <Link to={`/product/${item.id}`} className="cart-item-image">
                                <img src={item.image} alt={item.name} />
                            </Link>
                            <div className="cart-item-details">
                                <div className="cart-item-header">
                                    <div>
                                        <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                                        <p className="cart-item-variant">{item.selectedColor}</p>
                                        <p className="cart-item-variant">Size: {item.selectedSize}</p>
                                    </div>
                                    <div className="cart-item-price">{formatDisplayPrice(item.price * item.quantity)}</div>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="qty-selector">
                                        <button onClick={() => updateQty(item.id, -1)} className="qty-btn"><Minus size={12} /></button>
                                        <span className="qty-val">{item.quantity}</span>
                                        <button onClick={() => updateQty(item.id, 1)} className="qty-btn"><Plus size={12} /></button>
                                    </div>
                                    <button onClick={() => removeItem(item.id)} className="remove-btn">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="cart-summary">
                    <h3 className="summary-title">Order Summary</h3>

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>{formatDisplayPrice(subtotal)}</span>
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-total">
                        <span>Total</span>
                        <span>{formatDisplayPrice(subtotal)}</span>
                    </div>

                    <Link to="/checkout" state={{ cartItems, subtotal }} className="checkout-btn">
                        Checkout <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
