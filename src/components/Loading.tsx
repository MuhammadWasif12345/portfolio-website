import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    if (percent >= 100) {
      timer1 = setTimeout(() => {
        setLoaded(true);
        timer2 = setTimeout(() => {
          setIsLoaded(true);
        }, 400);
      }, 200);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [percent]);

  useEffect(() => {
    let timer3: NodeJS.Timeout;
    if (isLoaded) {
      setClicked(true);
      import("./utils/initialFX").then((module) => {
        timer3 = setTimeout(() => {
          if (module.initialFX && !(window as any).initialFXRan) {
            (window as any).initialFXRan = true; // Prevent double execution
            module.initialFX();
          }
          setIsLoading(false);
        }, 400);
      });
    }
    return () => clearTimeout(timer3);
  }, [isLoaded]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          MUHAMMAD WASIF
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span>&nbsp; AI Engineer &nbsp;</span> <span>&nbsp; Full Stack Developer &nbsp;</span>
            <span>&nbsp; AI Engineer &nbsp;</span> <span>&nbsp; Full Stack Developer &nbsp;</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;
  let hasResolved = false;

  // Reaches 100% in 3.5 seconds (35ms * 100) smoothly without stopping
  let interval = setInterval(() => {
    if (percent < 100) {
      percent += 1;
      setLoading(percent);
    } else {
      clearInterval(interval);
      if (!hasResolved) {
        hasResolved = true;
      }
    }
  }, 35);

  function clear() {
    if (hasResolved) return;
    hasResolved = true;
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      if (hasResolved) {
        resolve(100);
        return;
      }
      hasResolved = true;
      clearInterval(interval);
      // Speed up to 100% if loaded is called early
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }

  return { clear, loaded };
};
