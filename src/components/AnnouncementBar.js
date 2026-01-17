import React, { useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import '../styles/AnnouncementBar.css';

const AnnouncementBar = () => {
    const { storeInfo, loading } = useStore();
    const barRef = useRef(null);

    // Update CSS variable for layout coordination
    useEffect(() => {
        const updateHeight = () => {
            if (barRef.current && storeInfo?.announcementBar) {
                const height = barRef.current.offsetHeight;
                document.documentElement.style.setProperty('--announcement-height', `${height}px`);
            } else {
                document.documentElement.style.setProperty('--announcement-height', '0px');
            }
        };

        // Initial update
        updateHeight();

        // Listen for resize
        window.addEventListener('resize', updateHeight);
        return () => {
            window.removeEventListener('resize', updateHeight);
            document.documentElement.style.setProperty('--announcement-height', '0px');
        };
    }, [storeInfo]);

    if (loading || !storeInfo?.announcementBar) {
        return null;
    }

    const text = storeInfo.announcementBar;

    return (
        <div className="announcement-bar" ref={barRef}>
            <div className="announcement-content">
                {/* Render enough copies to ensure seamless loop even on wide screens */}
                {Array(12).fill(0).map((_, i) => (
                    <div key={i} className="announcement-group">
                        <span dangerouslySetInnerHTML={{ __html: formatAnnouncement(text) }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// Formatting helper
const formatAnnouncement = (text) => {
    return text.replace(/\[gold\](.*?)\[\/gold\]/g, '<span class="gold-accent">$1</span>');
};

export default AnnouncementBar;
