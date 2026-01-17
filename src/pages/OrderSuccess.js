
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import '../styles/pages/OrderSuccess.css';

const OrderSuccess = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="order-success-page container">
            <div className="success-content">
                <div className="success-icon-wrapper">
                    <CheckCircle size={64} className="success-icon" />
                </div>

                <h1 className="success-title">Order Placed Successfully!</h1>
                <p className="success-message">
                    Thank you for your purchase. We've received your order and we'll start processing it right away.
                    You will receive a confirmation call shortly.
                </p>

                <div className="success-actions">
                    <Link to="/shop/all" className="continue-shopping-btn">
                        <ShoppingBag size={20} />
                        Continue Shopping
                    </Link>
                    <Link to="/" className="home-link">
                        Go to Homepage <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            <div className="success-bg-decoration">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>
        </div>
    );
};

export default OrderSuccess;
