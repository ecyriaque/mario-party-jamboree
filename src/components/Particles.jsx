import { useEffect, useRef } from "react";

const Particles = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    if (!particlesRef.current) return;
    for (let i = 0; i < 35; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      const size = Math.random() * 8 + 2;
      const posX = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 15 + 10;
      const opacity = Math.random() * 0.6 + 0.3;
      const xOffset = Math.random() * 200 - 100;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.bottom = "0";
      particle.style.opacity = opacity;
      particle.style.setProperty("--duration", `${duration}s`);
      particle.style.setProperty("--x-offset", `${xOffset}px`);
      particle.style.animationDelay = `${delay}s`;
      particlesRef.current.appendChild(particle);
    }
    return () => {
      if (particlesRef.current) {
        while (particlesRef.current.firstChild) {
          particlesRef.current.removeChild(particlesRef.current.firstChild);
        }
      }
    };
  }, []);
  return <div className="particles-container" ref={particlesRef}></div>;
};

export default Particles;
