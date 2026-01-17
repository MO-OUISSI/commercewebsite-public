import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import '../styles/components/Toast.css';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.map(t => t.id === id ? { ...t, hiding: true } : t));
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 300);
    }, []);

    const showToast = useCallback((message, type = 'success', duration = 3000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type, hiding: false }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, [removeToast]);

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle className="toast-icon text-emerald-500" size={20} />;
            case 'error': return <AlertCircle className="toast-icon text-red-500" size={20} />;
            case 'info': return <Info className="toast-icon text-sky-500" size={20} />;
            default: return <Info className="toast-icon text-sky-500" size={20} />;
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-container">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`toast ${toast.type} ${toast.hiding ? 'hiding' : ''}`}
                    >
                        {getIcon(toast.type)}
                        <span className="toast-message">{toast.message}</span>
                        <button onClick={() => removeToast(toast.id)} className="toast-close">
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
