import "./styles/CTABanner.css";

const CTABanner = () => {
  const email = "wasifghori71@gmail.com";
  const whatsappNumber = "1234567890"; // TODO: Replace with actual WhatsApp number without + or spaces

  const message = `Hi Muhammad Wasif! I saw your portfolio and I'm interested in working with you. Could you provide more info on your services and pricing? 

Here are my details:
- Name: 
- Email: 
- Project Type: `;

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
