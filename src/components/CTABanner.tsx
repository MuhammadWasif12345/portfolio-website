import { config } from "../config";
import "./styles/CTABanner.css";

const CTABanner = () => {
  const email = "wasifghori71@gmail.com";
  const whatsappNumber = "923092335781";

  const message = `Hello Muhammad Wasif,\n\nI recently came across your portfolio and was impressed by your work. I have a project in mind and would love to learn more about your process, availability, and how we might work together.\n\nHere are my details so we can discuss a potential estimate:\n\nMy Name: \n\nMy Email: \n\nProject Overview / Type of Work: [Briefly describe the project]\n\nLooking forward to connecting!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  const emailLink = `mailto:${email}?subject=${encodeURIComponent("Portfolio Inquiry: Interested in working with you")}&body=${encodedMessage}`;

  return (
    <div className="cta-banner-wrapper">
      <div className="cta-banner-container">
        <div className="cta-banner-content">
          <h2 className="cta-banner-title">
            Designed & Developed by <span>MUHAMMAD WASIF</span>
          </h2>
          <p className="cta-banner-desc">
            Want a professional website like this one? Get in touch with me directly to bring your ideas to life!
          </p>
        </div>
        <div className="cta-banner-buttons">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="cta-btn whatsapp-btn">
            WhatsApp Me
          </a>
          <a href={emailLink} target="_blank" rel="noopener noreferrer" className="cta-btn email-btn">
            Email Me
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTABanner;
