import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import '../styles/components/Footer.css';

const Footer = () => {
    const { storeInfo } = useStore();
    const hasSocial = storeInfo?.socialMedia && (
        storeInfo.socialMedia.instagram ||
        storeInfo.socialMedia.facebook ||
        storeInfo.socialMedia.x ||
        storeInfo.socialMedia.tiktok ||
        storeInfo.socialMedia.youtube
    );

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-col brand-col">
                        <Link to="/" className="footer-brand">
                            {storeInfo?.title?.toUpperCase() || 'LE BON CHOIX'}
                        </Link>
                        <p className="footer-mission">
                            {storeInfo?.description}
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Shop</h4>
                        <ul className="footer-links">
                            <li><Link to="/shop/all">All Products</Link></li>
                            <li><Link to="/new-arrivals">New Arrivals</Link></li>
                            <li><Link to="/shop/accessories">Accessories</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">Help</h4>
                        <ul className="footer-links">
                            <li><Link to="/about">Contact Us</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p className="copyright">© {new Date().getFullYear()} {storeInfo?.title || 'Le Bon Choix'} Inc. All rights reserved.</p>
                    {hasSocial && (
                        <div className="social-links">
                            {storeInfo.socialMedia.instagram && (
                                <a href={storeInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                            )}
                            {storeInfo.socialMedia.facebook && (
                                <a href={storeInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                            )}
                            {storeInfo.socialMedia.x && (
                                <a href={storeInfo.socialMedia.x} target="_blank" rel="noopener noreferrer">X</a>
                            )}
                            {storeInfo.socialMedia.tiktok && (
                                <a href={storeInfo.socialMedia.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
                            )}
                            {storeInfo.socialMedia.youtube && (
                                <a href={storeInfo.socialMedia.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
