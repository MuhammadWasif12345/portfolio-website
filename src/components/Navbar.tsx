import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const isMobileDevice = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
  window.innerWidth <= 1024;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const mobile = isMobileDevice();

    if (mobile) {
      // Mobile: high lerp for native-feel instant response
      lenis = new Lenis({
        lerp: 0.15,             // Higher = snappier response to touch
        gestureOrientation: "vertical",
        smoothWheel: false,
        touchMultiplier: 2.5,   // Matches natural finger-to-scroll ratio
        overscroll: false,      // Prevent bounce that fights Lenis
        infinite: false,
      });
    } else {
      // Desktop: lerp-based (more responsive than duration — follows velocity naturally)
      lenis = new Lenis({
        lerp: 0.11,             // Butter-smooth with minimal lag
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        infinite: false,
      });
    }

    // Start immediately
    lenis.start();

    // Drive Lenis ONLY from GSAP ticker — never use a separate rAF loop
    // (two loops competing = wasted CPU + potential desync)
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis?.raf(time * 1000);
    });
    // Prevent GSAP from compensating for lag — let Lenis handle timing
    gsap.ticker.lagSmoothing(0);

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
