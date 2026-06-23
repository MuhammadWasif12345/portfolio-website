import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 1024;

    // Only initialize Lenis on Desktop. Mobile native scrolling is already smooth and JS smooth-scrolling causes glitches.
    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.2, // Elegant, professional smooth scrolling
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 2.0,
        infinite: false,
      });

      // Start paused (started later by initialFX)
      lenis.stop();

      // Handle smooth scroll animation frame
      function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // Handle navigation links
    let links = document.querySelectorAll(".header ul a, .mobile-menu-links a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024 || element.closest('.mobile-menu-links')) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          
          setIsMenuOpen(false); // Close menu on click
          
          if (section && lenis) {
            const target = document.querySelector(section) as HTMLElement;
            if (target) {
              setTimeout(() => {
                lenis?.scrollTo(target, {
                  offset: 0,
                  duration: 1.5,
                });
              }, 100);
            }
          }
        }
      });
    });

    // Handle resize
    window.addEventListener("resize", () => {
      lenis?.resize();
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    });

    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Lock scroll when menu is open using Lenis instead of body overflow
  useEffect(() => {
    if (isMenuOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isMenuOpen]);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          MW
        </a>
        <a
          href="mailto:wasifghori71@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          wasifghori71@gmail.com
        </a>
        
        {/* Desktop Links */}
        <ul className="desktop-links">
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>

        {/* Hamburger Icon (Mobile) */}
        <div className="hamburger-icon" onClick={() => setIsMenuOpen(true)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <a href="/#" className="navbar-title" onClick={() => setIsMenuOpen(false)}>MW</a>
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
            ✕
          </button>
        </div>
        <div className="mobile-menu-links">
          <a data-href="#about" href="#about">ABOUT</a>
          <a data-href="#work" href="#work">WORK</a>
          <a data-href="#contact" href="#contact">CONTACT</a>
        </div>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
