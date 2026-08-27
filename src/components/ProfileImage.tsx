import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/ProfileImage.css";

gsap.registerPlugin(ScrollTrigger);

const ProfileImage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      // Replicate the character scroll animations
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".landing-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl1
        .fromTo(".profile-model", { x: 0 }, { x: "-25vw", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-section",
          start: "center 55%",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl2
        .to(".about-section", { y: "30%", duration: 6 }, 0)
        .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
        .to(".profile-model", { opacity: 0, delay: 4, duration: 2 }, 0)
        .fromTo(
          ".profile-model",
          { pointerEvents: "inherit" },
          { pointerEvents: "none", x: "-12vw", delay: 2, duration: 5 },
          0
        )
        .fromTo(
          ".what-box-in",
          { display: "none" },
          { display: "flex", duration: 0.1, delay: 6 },
          0
        )
        .fromTo(
          ".profile-rim",
          { opacity: 1, scaleX: 1.4 },
          { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
          0.3
        );

      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: ".whatIDO",
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl3
        .fromTo(
          ".profile-model",
          { y: "0%" },
          { y: "-50vh", duration: 2, ease: "power2.out", delay: 0 },
          0
        )
        .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0);
    });

    mm.add("(max-width: 1024px)", () => {
      const tlMobile = gsap.timeline({
        scrollTrigger: {
          trigger: ".landing-section",
          start: "60% top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      tlMobile.to(".profile-container", { opacity: 0, duration: 1 }, 0);

      const tM2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".what-box-in",
          start: "top 70%",
          end: "bottom top",
        },
      });
      tM2.to(".what-box-in", { display: "flex", duration: 0.1, delay: 0 }, 0);
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="profile-container" ref={containerRef}>
      <div className="profile-model">
        <div className="profile-float">
          <div className="profile-rim"></div>
          <img src="/images/profile_logo.jpg" alt="Muhammad Wasif" className="profile-image" />
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
