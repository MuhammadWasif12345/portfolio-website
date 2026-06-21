import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import "./styles/CallToAction.css";

const CallToAction = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="cta-section">
      <div className="cta-buttons">
        <Link 
          to="/play" 
          className="cta-btn cta-btn-play" 
          data-cursor="disable"
          target={isMobile ? "_self" : "_blank"}
          rel="noopener noreferrer"
        >
          Play With Me →
        </Link>
        
        <a 
          href={config.contact.whatsapp} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="cta-btn cta-btn-hire"
          data-cursor="disable"
        >
          Hire Me →
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
