import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import "./styles/CallToAction.css";

const CallToAction = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const whatsappNumber = "923092335781";
  const hireMessage = `Hello Muhammad Wasif,

I recently viewed your portfolio and was very impressed by the quality of your work. I am interested in discussing a potential project with you.

Your skills in Full-Stack development, AI, and modern UI design align well with what we are looking for. I would like to discuss our requirements, your availability, and how we might proceed.

My details:
Name: 
Company/Project: 

Looking forward to hearing from you!`;

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
