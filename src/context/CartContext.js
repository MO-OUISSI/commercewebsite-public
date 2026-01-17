import React, { createContext, useContext, useState, useEffect } from 'react';
import { BASE_URL } from '../api/apiClient';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    // ... (existing code for initialization and persistence)
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [cartItems]);

    const addToCart = (product, color, size, quantity) => {
        setCartItems(prev => {
            const productId = product._id || product.id;
            // Check if item already exists (same id, color, and size)
            const existingItemIndex = prev.findIndex(
                item => item.id === productId && item.selectedColor === color && item.selectedSize === size
            );

            if (existingItemIndex >= 0) {
                // Update quantity of existing item
                const newCart = [...prev];
                newCart[existingItemIndex] = {
                    ...newCart[existingItemIndex],
                    quantity: newCart[existingItemIndex].quantity + quantity
                };
                return newCart;
            } else {
                // Determine image URL
                let imgPath = product.colors?.find(c => c.name === color)?.images?.[0] || product.images?.[0] || '';
                const fullImageUrl = imgPath.startsWith('http')
                    ? imgPath
                    : imgPath.startsWith('/')
                        ? imgPath
                        : `${BASE_URL}${imgPath}`;

                // Add new item
                const newItem = {
                    id: productId,
                    name: product.name,
                    price: product.salePrice || product.price,
                    image: fullImageUrl,
                    selectedColor: color,
                    selectedSize: size,
                    quantity: quantity,
                    productId: productId
                };
                return [...prev, newItem];
            }
        });
    };

    const removeFromCart = (itemId, color, size) => {
        setCartItems(prev => prev.filter(
            item => !(item.id === itemId && item.selectedColor === color && item.selectedSize === size)
        ));
    };

    const updateQuantity = (itemId, color, size, change) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === itemId && item.selectedColor === color && item.selectedSize === size) {
                const newQty = Math.max(0, item.quantity + change);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
