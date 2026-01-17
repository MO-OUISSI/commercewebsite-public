import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import '../styles/components/ImageZoomModal.css';
import { BASE_URL } from '../api/apiClient';

const ImageZoomModal = ({ images = [], initialIndex = 0, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    // Refs for drag calculation
    const containerRef = useRef(null);
    const dragStartRef = useRef({ x: 0, y: 0 });
    const positionStartRef = useRef({ x: 0, y: 0 });

    // Helper to get full URL
    const getImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        if (path.startsWith('/')) return path;
        return `${BASE_URL}${path}`;
    };

    // Reset zoom when image changes
    useEffect(() => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    }, [currentIndex]);

    // Handle Zoom
    const handleZoomIn = () => {
        setScale(prev => Math.min(prev + 0.5, 4)); // Max zoom 4x
    };

    const handleZoomOut = () => {
        setScale(prev => {
            const next = Math.max(prev - 0.5, 1);
            if (next === 1) {
                setPosition({ x: 0, y: 0 }); // Reset position if fully zoomed out
            }
            return next;
        });
    };

    const handleReset = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    // Handle Dragging
    const handleMouseDown = (e) => {
        if (scale > 1) {
            setIsDragging(true);
            dragStartRef.current = { x: e.clientX, y: e.clientY };
            positionStartRef.current = { ...position };
            e.preventDefault(); // Prevent default drag behavior
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging && scale > 1) {
            const dx = e.clientX - dragStartRef.current.x;
            const dy = e.clientY - dragStartRef.current.y;

            // Optional: Add bounds checking here if needed
            // For now, free drag feels better for exploring parts

            setPosition({
                x: positionStartRef.current.x + dx,
                y: positionStartRef.current.y + dy
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Touch Support (simple swipe to drag equivalent)
    const handleTouchStart = (e) => {
        if (scale > 1 && e.touches.length === 1) {
            setIsDragging(true);
            dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            positionStartRef.current = { ...position };
        }
    };

    const handleTouchMove = (e) => {
        if (isDragging && scale > 1 && e.touches.length === 1) {
            const dx = e.touches[0].clientX - dragStartRef.current.x;
            const dy = e.touches[0].clientY - dragStartRef.current.y;

            setPosition({
                x: positionStartRef.current.x + dx,
                y: positionStartRef.current.y + dy
            });
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // Navigation
    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex(prev => (prev + 1) % images.length);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="image-zoom-overlay">
            <div className="zoom-header">
                <button onClick={onClose} className="zoom-close-btn" aria-label="Close">
                    <X size={24} />
                </button>
            </div>

            <div
                className="zoom-content"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Navigation Arrows */}
                <button
                    className="zoom-nav-btn prev"
                    onClick={handlePrev}
                    disabled={images.length <= 1}
                >
                    <ChevronLeft size={32} />
                </button>

                <div
                    ref={containerRef}
                    className={`zoom-image-container ${isDragging ? 'is-dragging' : ''}`}
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`
                    }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                >
                    <img
                        src={getImageUrl(images[currentIndex])}
                        alt="Zoom View"
                        className="zoom-image"
                        draggable={false}
                    />
                </div>

                <button
                    className="zoom-nav-btn next"
                    onClick={handleNext}
                    disabled={images.length <= 1}
                >
                    <ChevronRight size={32} />
                </button>

                {/* Controls */}
                <div className={`zoom-controls ${scale === 1 ? 'hidden-if-touch' : ''}`}>
                    <button
                        className="zoom-control-btn"
                        onClick={handleZoomOut}
                        disabled={scale <= 1}
                        title="Zoom Out"
                    >
                        <ZoomOut size={20} />
                    </button>

                    <div className="zoom-divider" />

                    <button
                        className="zoom-control-btn"
                        onClick={handleReset}
                        title="Reset"
                    >
                        <RotateCcw size={18} />
                    </button>

                    <div className="zoom-divider" />

                    <button
                        className="zoom-control-btn"
                        onClick={handleZoomIn}
                        disabled={scale >= 4}
                        title="Zoom In"
                    >
                        <ZoomIn size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageZoomModal;
