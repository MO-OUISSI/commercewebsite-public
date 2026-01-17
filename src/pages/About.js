import React from 'react';
import { MapPin, Clock, Mail, Phone, Facebook, Instagram, Twitter, Youtube, Music2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import '../styles/pages/About.css';

const About = () => {
    const { storeInfo } = useStore();

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <div className="about-hero-content">
                        <span className="about-label">About Us</span>
                        <h1 className="about-title">
                            {storeInfo?.title ? `Welcome to ${storeInfo.title}` : 'Welcome to Natura'}
                        </h1>
                        <p className="about-description">
                            {storeInfo?.description || 'Additional information'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Shop Image Section */}
            <section className="about-shop-image">
                <div className="container">
                    <div className="shop-image-wrapper">
                        <img
                            src={storeInfo?.photo || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000"}
                            className="shop-image"
                            alt={storeInfo?.title || "Natura Store"}
                        />
                    </div>
                </div>
            </section>



            {/* Working Hours Section */}
            {storeInfo?.storeHours && storeInfo.storeHours.length > 0 && !storeInfo.storeHours.every(day => day.isClosed) && (
                <section className="about-hours">
                    <div className="container">
                        <div className="hours-content">
                            <div className="hours-header">
                                <Clock size={32} className="hours-icon" />
                                <h2 className="hours-title">Store Hours</h2>
                            </div>
                            <div className="hours-list">
                                {storeInfo.storeHours.map((hour, index) => (
                                    <div key={index} className="hours-item">
                                        <span className="hours-day">{hour.day}</span>
                                        <span className="hours-time">
                                            {hour.isClosed ? 'Closed' : `${hour.openTime} - ${hour.closeTime}`}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Social Media Section */}
            {storeInfo?.socialMedia && (
                <section className="about-social">
                    <div className="container">
                        <div className="social-content">
                            <h2 className="social-title">Follow Us</h2>
                            <p className="social-subtitle">Stay connected with us on social media</p>
                            <div className="social-links">
                                {storeInfo.socialMedia.facebook && (
                                    <a href={storeInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="social-link facebook" aria-label="Facebook">
                                        <Facebook size={24} />
                                        <span>Facebook</span>
                                    </a>
                                )}
                                {storeInfo.socialMedia.instagram && (
                                    <a href={storeInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="social-link instagram" aria-label="Instagram">
                                        <Instagram size={24} />
                                        <span>Instagram</span>
                                    </a>
                                )}
                                {storeInfo.socialMedia.x && (
                                    <a href={storeInfo.socialMedia.x} target="_blank" rel="noopener noreferrer" className="social-link twitter" aria-label="X">
                                        <Twitter size={24} />
                                        <span>X</span>
                                    </a>
                                )}
                                {storeInfo.socialMedia.tiktok && (
                                    <a href={storeInfo.socialMedia.tiktok} target="_blank" rel="noopener noreferrer" className="social-link tiktok" aria-label="TikTok">
                                        <Music2 size={24} />
                                        <span>TikTok</span>
                                    </a>
                                )}
                                {storeInfo.socialMedia.youtube && (
                                    <a href={storeInfo.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="social-link youtube" aria-label="YouTube">
                                        <Youtube size={24} />
                                        <span>YouTube</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default About;
