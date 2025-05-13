import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import { boards } from "./data/board";

const BoardCarousel = ({ onFinish }) => {
  const [currentBoard, setCurrentBoard] = useState(boards[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const carouselRefs = useRef([]);
  const wrapperRef = useRef(null);
  const labelsRef = useRef([]);
  const speedRef = useRef(400);
  const slowDownFactor = 1.08;
  const [transitionType, setTransitionType] = useState(0);

  const confetti = window.confetti || (() => {});

  const playFinalSound = () => {
    const audio = new Audio("/assets/letsgo.mp3");
    audio.volume = 0.7;
    audio.play();
  };

  const playShuffleSound = () => {
    const audio = new Audio("/assets/shuffle-sound.mp3");
    audio.volume = 0.3;
    audio.play();
  };

  function animatePromise(tween) {
    return new Promise((resolve) => {
      tween.eventCallback("onComplete", resolve);
    });
  }

  const smoothTransition = async (prevRef, nextRef, speed) => {
    const duration = Math.min(0.45, Math.max(0.2, (6000 / speed) * 0.035));
    const easeIn = "power2.inOut";
    const easeOut = "power2.out";

    // Flash lumineux rapide au centre
    const flash = document.createElement("div");
    flash.style.position = "fixed";
    flash.style.top = 0;
    flash.style.left = 0;
    flash.style.width = "100vw";
    flash.style.height = "100vh";
    flash.style.zIndex = 9999;
    flash.style.pointerEvents = "none";
    flash.style.background =
      "radial-gradient(circle, rgba(255,255,200,0.7) 0%, rgba(255,255,200,0.2) 40%, transparent 80%)";
    flash.style.opacity = 0;
    document.body.appendChild(flash);
    gsap.to(flash, {
      opacity: 1,
      duration: 0.08,
      yoyo: true,
      repeat: 1,
      onComplete: () => flash.remove(),
    });

    // Sortie de la map précédente : flip + zoom + fondu
    await animatePromise(
      gsap.to(prevRef, {
        opacity: 0,
        scale: 1.08,
        rotationY: 90,
        filter: "blur(8px) brightness(1.2)",
        duration: duration * 0.7,
        ease: easeIn,
        z: -100,
      })
    );
    gsap.set(prevRef, {
      opacity: 0,
      scale: 1,
      rotationY: 0,
      filter: "blur(0px) brightness(1)",
      zIndex: 1,
    });
    gsap.set(nextRef, {
      opacity: 0,
      scale: 0.92,
      rotationY: -90,
      filter: "blur(8px)",
      zIndex: 2,
    });
    // Entrée de la nouvelle map : flip inverse + zoom + fondu
    return animatePromise(
      gsap.to(nextRef, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        filter: "blur(0px)",
        duration: duration * 1.1,
        ease: easeOut,
      })
    );
  };

  useEffect(() => {
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: "power2.inOut" }
    );
    let cancelled = false;
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    boards.forEach((_, i) => {
      if (carouselRefs.current[i]) {
        gsap.set(carouselRefs.current[i], {
          opacity: i === 0 ? 1 : 0,
          scale: 1,
          rotation: 0,
          x: "0%",
          y: "0%",
          z: 0,
          rotationY: 0,
          filter: "blur(0px)",
          zIndex: i === 0 ? 2 : 1,
        });
      }
    });

    async function shuffleAsync() {
      let idx = 0;
      let speed = 400;
      setTransitioning(true);

      // Animation d'introduction améliorée
      const initialBoard = carouselRefs.current[idx];

      gsap.fromTo(
        initialBoard,
        { filter: "brightness(1)" },
        {
          scale: 1.03,
          filter: "brightness(1.15) contrast(1.05)",
          boxShadow: "0 0 30px rgba(255, 204, 0, 0.3)",
          duration: 0.8,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
        }
      );

      playShuffleSound();

      // Délai pour laisser l'animation d'introduction se terminer
      await new Promise((r) => setTimeout(r, 800));

      while (speed <= 6000 && !cancelled) {
        const prev = idx;
        const next = (idx + 1) % boards.length;
        const prevRef = carouselRefs.current[prev];
        const nextRef = carouselRefs.current[next];

        // Transition fluide
        await smoothTransition(prevRef, nextRef, speed);

        // Mise à jour de l'index actuel
        setCurrentIndex(next);

        // Animation du label avec le titre
        if (labelsRef.current[next]) {
          gsap.fromTo(
            labelsRef.current[next],
            { scale: 0.95, opacity: 0.5, y: "5px" },
            {
              scale: 1,
              opacity: 1,
              y: "0px",
              duration: 0.4,
              ease: "back.out(1.2)",
            }
          );
        }

        idx = next;
        speed *= slowDownFactor;
        await new Promise((r) => setTimeout(r, speed));
      }

      if (!cancelled) {
        setIsShuffling(false);
        setCurrentBoard(boards[idx]);
        playFinalSound();

        // Configuration améliorée des confettis
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          startVelocity: 40,
          ticks: 300,
          gravity: 0.8,
          decay: 0.94,
          shapes: ["circle", "square"],
          colors: [
            "#ffcc00",
            "#ff9900",
            "#ff0000",
            "#ff66cc",
            "#9933ff",
            "#33ccff",
          ],
        });

        const finalRef = carouselRefs.current[idx];

        // Séquence finale harmonieuse
        // 1. Subtile vibration
        gsap.to(finalRef, {
          x: "+=5",
          repeat: 3,
          yoyo: true,
          duration: 0.06,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.set(finalRef, { x: 0 });
          },
        });

        // 2. Effet de surbrillance
        gsap.to(finalRef, {
          boxShadow: "0 0 40px 15px rgba(255, 204, 0, 0.6)",
          filter: "brightness(1.15)",
          duration: 0.8,
          ease: "sine.inOut",
          repeat: 1,
          yoyo: true,
        });

        // 3. Animation douce du contenu
        if (labelsRef.current[idx]) {
          // Animation du titre
          const titleElement = labelsRef.current[idx].querySelector("h1");
          const iconElement = labelsRef.current[idx].querySelector(
            ".board-shuffle-icon"
          );

          if (titleElement) {
            gsap.fromTo(
              titleElement,
              { scale: 0.9, opacity: 0.8, y: "-10px" },
              {
                scale: 1.05,
                opacity: 1,
                y: "0px",
                duration: 0.6,
                ease: "back.out(1.7)",
                delay: 0.2,
                onComplete: () => {
                  gsap.to(titleElement, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                },
              }
            );
          }

          // Animation de l'icône
          if (iconElement) {
            gsap.fromTo(
              iconElement,
              { scale: 0.8, rotation: "-5deg", opacity: 0.7 },
              {
                scale: 1.1,
                rotation: "5deg",
                opacity: 1,
                duration: 0.7,
                delay: 0.4,
                ease: "elastic.out(1, 0.5)",
                onComplete: () => {
                  gsap.to(iconElement, {
                    scale: 1,
                    rotation: "0deg",
                    duration: 0.4,
                    ease: "power2.out",
                  });
                },
              }
            );
          }
        }

        // Transition finale progressive
        await new Promise((r) => setTimeout(r, 1800));

        await animatePromise(
          gsap.to(wrapperRef.current, {
            opacity: 0,
            duration: 1.2,
            ease: "power3.inOut",
          })
        );

        onFinish();
      }

      setTransitioning(false);
    }

    if (isShuffling && !prefersReduced) {
      shuffleAsync();
    } else if (isShuffling && prefersReduced) {
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
  }, [isShuffling]);

  const getTransitionClass = (isActive) => {
    if (!isActive) return "";
    const classes = [
      "transition-fade-scale",
      "transition-slide",
      "transition-flip",
      "transition-zoom",
      "transition-rotate",
    ];
    return classes[transitionType] || "";
  };

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
            className={`carousel-item${
              i === currentIndex ? " active" : ""
            } ${getTransitionClass(i === currentIndex)}`}
            style={{
              backgroundImage: `url(${board.boardView})`,
              zIndex: i === currentIndex ? 2 : 1,
            }}
            aria-hidden={i !== currentIndex}
          >
            <div
              className="carousel-content carousel-content-large"
              ref={(el) => (labelsRef.current[i] = el)}
            >
              <h1>{board.name}</h1>
              <div className="board-shuffle-icon">
                <img src={board.icon} alt={board.name} />
              </div>
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
