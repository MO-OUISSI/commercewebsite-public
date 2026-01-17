import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useStore } from '../context/StoreContext';
import orderService from '../api/orderService';
import { formatDisplayPrice } from '../utils/priceFormatter';
import '../styles/pages/Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems, clearCart, cartSubtotal } = useCart();
    const { showToast } = useToast();
    const { storeInfo } = useStore();
    const [loading, setLoading] = useState(false);

    // Check for direct buy from ProductDetail
    const directBuyItem = location.state?.directBuyItem;

    // Determine items to display and calculate total
    const displayItems = directBuyItem ? [directBuyItem] : cartItems;
    const currentSubtotal = directBuyItem
        ? directBuyItem.price * directBuyItem.quantity
        : cartSubtotal;

    // Calculate total layout
    // Calculate total layout
    const deliveryPrice = storeInfo?.deliveryPrice || 0;
    const shipping = currentSubtotal > 1000 ? 0 : deliveryPrice;
    const total = currentSubtotal + shipping;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);

        const orderData = {
            customerName: formData.get('fullName'),
            customerPhone: formData.get('phone'),
            customerCity: formData.get('city'),
            shippingAddress: formData.get('address'),
            customerNote: formData.get('note'),
            items: displayItems.map(item => ({
                productId: item.productId || item.id,
                colorName: item.selectedColor,
                size: item.selectedSize,
                quantity: item.quantity
            }))
        };
        // DEBUG LOGGING
        console.group("Order Submission Debug");
        console.log("Display Items:", displayItems);
        console.log("Constructed Order Payload:", orderData);
        console.groupEnd();

        try {
            await orderService.createOrder(orderData);
            if (!directBuyItem) {
                clearCart();
            }
            showToast("Order placed successfully!", "success");
            navigate('/order-success');
        } catch (error) {
            console.error("Order Error:", error);
            const errorMsg = error.response?.data?.message || "Failed to place order.";
            showToast(errorMsg, "error");
        } finally {
            setLoading(false);
        }
    };

    if (displayItems.length === 0) {
        return (
            <div className="container py-20 text-center">
                <h2>Your cart is empty</h2>
                <Link to="/" className="text-emerald-700 underline mt-4 block">Return to Shop</Link>
            </div>
        );
    }

    return (
        <div className="container checkout-page">
            <div className="checkout-header">
                <Link to="/" className="back-link" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
                    <ArrowLeft size={16} /> Retour au panier
                </Link>
                <h1 className="checkout-title">Paiement</h1>
            </div>

            <div className="checkout-layout">
                {/* Section 1: Delivery Details */}
                <div className="checkout-form-section">
                    <div className="checkout-section">
                        <h2 className="section-title">
                            Détails de livraison
                        </h2>

                        <form id="checkout-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Nom complet</label>
                                <input name="fullName" type="text" className="form-input" placeholder="e.g. Jane Doe" required />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Numéro de téléphone</label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        className="form-input"
                                        placeholder="0600000000 (10 chiffres)"
                                        pattern="[0-9]{10}"
                                        title="Veuillez entrer un numéro valide à 10 chiffres"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Ville</label>
                                    <input name="city" type="text" className="form-input" placeholder="e.g. Casablanca" required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Adresse exacte</label>
                                <input name="address" type="text" className="form-input" placeholder="Appartement, Étage, Rue..." required />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Note (Optionnel)</label>
                                <textarea name="note" className="form-textarea" rows="3" placeholder="Instructions spéciales pour la livraison"></textarea>
                            </div>

                            {/* Mobile only: Place order button usually goes here or stick to bottom, but we'll stick to a standard flow */}
                            <button type="submit" className="place-order-btn md:hidden" disabled={loading}>
                                {loading ? 'Traitement...' : 'Commander'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Section 2: Product Summary */}
                <div className="checkout-summary-section">
                    <div className="checkout-summary-card">
                        <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
                            Résumé de la commande
                        </h2>

                        <div className="summary-items">
                            {displayItems.map((item, index) => (
                                <div key={index} className="summary-item">
                                    <div className="summary-img-wrapper">
                                        <img src={item.image} alt={item.name} className="summary-img" />
                                        <div className="summary-qty-badge">{item.quantity}</div>
                                    </div>
                                    <div className="summary-details">
                                        <h4 className="summary-name">{item.name}</h4>
                                        <p className="summary-variant">{item.selectedColor} / {item.selectedSize}</p>
                                    </div>
                                    <div className="summary-price">{formatDisplayPrice(item.price * item.quantity)}</div>
                                </div>
                            ))}
                        </div>

                        <div className="checkout-totals">
                            <div className="total-row">
                                <span>Sous-total</span>
                                <span>{formatDisplayPrice(currentSubtotal)}</span>
                            </div>
                            <div className="total-row">
                                <span>Livraison</span>
                                <span className="text-emerald-600">{shipping === 0 ? 'Gratuite' : formatDisplayPrice(shipping)}</span>
                            </div>
                            <div className="total-row final">
                                <span>Total</span>
                                <span>{formatDisplayPrice(total)}</span>
                            </div>

                            <button type="submit" form="checkout-form" className="place-order-btn hidden md:block" disabled={loading}>
                                {loading ? 'Traitement...' : 'Commander'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
