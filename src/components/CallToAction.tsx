import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import "./styles/CallToAction.css";

const CallToAction = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const whatsappNumber = "923092335781";
  const hireMessage = `Hello Muhammad Wasif,

I am absolutely blown away by your 3D portfolio and the quality of your work! I am extremely interested in hiring you for my project.

Your skills in Full-Stack development, AI, and modern UI design are exactly what I need. Let's discuss my requirements, your availability, and how we can get started as soon as possible.

My details:
Name: 
Company/Project: 

Looking forward to working with you!`;

  const encodedHireMessage = encodeURIComponent(hireMessage);
  const hireLink = `https://wa.me/${whatsappNumber}?text=${encodedHireMessage}`;

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
          href={hireLink} 
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
