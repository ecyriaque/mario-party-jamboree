// BoardCarousel.jsx (amélioré)
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import { boards } from "./data/board";

const BoardCarousel = ({ onFinish }) => {
  // currentBoard = plateau final sélectionné (pour React)
  // currentIndex = index du plateau affiché pendant le shuffle (pour l'animation)
  const [currentBoard, setCurrentBoard] = useState(boards[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const carouselRefs = useRef([]); // refs pour chaque board
  const wrapperRef = useRef(null);
  const speedRef = useRef(400);
  const slowDownFactor = 1.08;

  // Pour le son et les confettis
  const confetti = window.confetti || (() => {});
  const playFinalSound = () => {
    const audio = new Audio("/assets/letsgo.mp3");
    audio.volume = 0.7;
    audio.play();
  };

  // Helper pour attendre la fin d'une animation GSAP
  function animatePromise(tween) {
    return new Promise((resolve) => {
      tween.eventCallback("onComplete", resolve);
    });
  }

  useEffect(() => {
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.inOut" }
    );
    let cancelled = false;
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Initialisation : tous les boards sauf le premier sont cachés
    boards.forEach((_, i) => {
      if (carouselRefs.current[i]) {
        gsap.set(carouselRefs.current[i], {
          opacity: i === 0 ? 1 : 0,
          scale: 1,
          filter: "blur(0px)",
          zIndex: i === 0 ? 2 : 1,
        });
      }
    });

    async function shuffleAsync() {
      let idx = 0;
      let speed = 400;
      setTransitioning(true);
      while (speed <= 6000 && !cancelled) {
        const prev = idx;
        const next = (idx + 1) % boards.length;
        const prevRef = carouselRefs.current[prev];
        const nextRef = carouselRefs.current[next];
        // Sortie
        await animatePromise(
          gsap.to(prevRef, {
            opacity: 0,
            scale: 1.08,
            filter: "blur(8px)",
            duration: 0.25,
            zIndex: 1,
            ease: "power2.in",
          })
        );
        // Mets à jour l'index pour afficher la nouvelle map
        setCurrentIndex(next);
        await new Promise((r) => setTimeout(r, 0)); // Laisse React re-render
        gsap.set(prevRef, { zIndex: 1 });
        gsap.set(nextRef, { zIndex: 2 });
        await animatePromise(
          gsap.fromTo(
            nextRef,
            { opacity: 0, scale: 0.92, filter: "blur(8px)" },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.35,
              ease: "power2.out",
            }
          )
        );
        idx = next;
        speed *= slowDownFactor;
        await new Promise((r) => setTimeout(r, speed));
      }
      if (!cancelled) {
        setIsShuffling(false);
        setCurrentBoard(boards[idx]);
        playFinalSound();
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.7 },
        });
        const finalRef = carouselRefs.current[idx];
        await animatePromise(
          gsap.to(finalRef, {
            x: "+=10",
            repeat: 5,
            yoyo: true,
            duration: 0.08,
            ease: "power1.inOut",
          })
        );
        gsap.to(finalRef, { x: 0, duration: 0.1 });
        await animatePromise(
          gsap.to(finalRef, {
            boxShadow: "0 0 40px 10px #ffcc00",
            duration: 0.5,
            yoyo: true,
            repeat: 1,
          })
        );
        await animatePromise(
          gsap.to(wrapperRef.current, {
            opacity: 0,
            duration: 0.8,
            delay: 0.7,
            ease: "power2.inOut",
          })
        );
        onFinish();
      }
      setTransitioning(false);
    }

    if (isShuffling && !prefersReduced) {
      shuffleAsync();
    } else if (isShuffling && prefersReduced) {
      // fallback simple
      let idx = 0;
      let speed = 400;
      function next() {
        if (speed > 6000 || cancelled) {
          setIsShuffling(false);
          setCurrentBoard(boards[idx]);
          onFinish();
          return;
        }
        idx = (idx + 1) % boards.length;
        setCurrentIndex(idx);
        speed *= slowDownFactor;
        setTimeout(next, speed);
      }
      setTimeout(next, speed);
    }
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line
  }, [isShuffling]);

  // Affichage : tous les boards sont dans le DOM, seul currentIndex est visible
  return (
    <div
      className="carousel-wrapper"
      ref={wrapperRef}
      role="region"
      aria-label="Board Carousel"
    >
      <div className="carousel">
        {boards.map((board, i) => (
          <div
            key={i}
            ref={(el) => (carouselRefs.current[i] = el)}
            className={`carousel-item${i === currentIndex ? " active" : ""}`}
            style={{
              backgroundImage: `url(${board.boardView})`,
              zIndex: i === currentIndex ? 2 : 1,
            }}
            aria-hidden={i !== currentIndex}
          >
            <div className="carousel-content carousel-content-large">
              <h1>{board.name}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

BoardCarousel.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default BoardCarousel;
