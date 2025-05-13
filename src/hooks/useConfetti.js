import { useRef, useEffect } from "react";

export default function useConfetti() {
  const confettiIntervalRef = useRef(null);

  const createConfetti = () => {
    for (let i = 0; i < 2; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      confetti.style.width = `${Math.random() * 8 + 4}px`;
      confetti.style.height = `${Math.random() * 8 + 4}px`;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(confetti);
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }
  };

  const startConfettiShower = () => {
    if (confettiIntervalRef.current) {
      clearInterval(confettiIntervalRef.current);
    }
    confettiIntervalRef.current = setInterval(() => {
      createConfetti();
    }, 150);
  };

  const stopConfettiShower = () => {
    if (confettiIntervalRef.current) {
      clearInterval(confettiIntervalRef.current);
      confettiIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopConfettiShower();
    };
  }, []);

  return { startConfettiShower, stopConfettiShower };
}
