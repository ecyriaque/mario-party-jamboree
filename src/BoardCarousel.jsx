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
  const speedRef = useRef(700);
  const slowDownFactor = 1.13;
  const [transitionType, setTransitionType] = useState(0);

  const confetti = window.confetti || (() => {});

  const playFinalSound = () => {
    const audio = new Audio("/assets/letsgo.mp3");
    audio.volume = 0.7;
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

  const animateShuffleImage = (ref, progress, isFinal = false) => {
    if (!ref) return;
    const baseScale = 1 + 0.04 * Math.sin(progress * Math.PI * 2);
    const baseSaturate = 1.1 + 0.3 * Math.abs(Math.sin(progress * Math.PI));
    const baseBlur = isFinal
      ? 0
      : 2 + 2 * Math.abs(Math.sin(progress * Math.PI));
    const baseShadow = isFinal
      ? "0 0 60px 20px #ffcc00, 0 0 120px 40px #fff"
      : "0 0 30px 10px #ffcc00, 0 0 0 #fff";
    gsap.to(ref, {
      scale: baseScale,
      filter: `saturate(${baseSaturate}) blur(${baseBlur}px) brightness(1.08)`,
      boxShadow: baseShadow,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.fromTo(
      ref,
      { x: "-2px" },
      {
        x: "2px",
        duration: 0.08,
        yoyo: true,
        repeat: 3,
        ease: "sine.inOut",
        onComplete: () => gsap.set(ref, { x: 0 }),
      }
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
      let speed = 700;
      setTransitioning(true);

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

      await new Promise((r) => setTimeout(r, 800));

      while (speed <= 6000 && !cancelled) {
        const prev = idx;
        const next = (idx + 1) % boards.length;
        const prevRef = carouselRefs.current[prev];
        const nextRef = carouselRefs.current[next];

        await smoothTransition(prevRef, nextRef, speed);

        setCurrentIndex(next);

        animateShuffleImage(nextRef, speed / 6000);

        idx = next;
        speed *= slowDownFactor;
        await new Promise((r) => setTimeout(r, speed));
      }

      if (!cancelled) {
        setIsShuffling(false);
        setCurrentBoard(boards[idx]);
        playFinalSound();

        const finalRef = carouselRefs.current[idx];

        const revealFlash = document.createElement("div");
        revealFlash.style.position = "absolute";
        revealFlash.style.top = 0;
        revealFlash.style.left = 0;
        revealFlash.style.width = "100%";
        revealFlash.style.height = "100%";
        revealFlash.style.background =
          "radial-gradient(circle, #fff 0%, #fff8 60%, transparent 100%)";
        revealFlash.style.opacity = 0;
        revealFlash.style.pointerEvents = "none";
        revealFlash.style.zIndex = 99;
        finalRef.appendChild(revealFlash);
        gsap.to(revealFlash, {
          opacity: 1,
          duration: 0.18,
          yoyo: true,
          repeat: 1,
          onComplete: () => revealFlash.remove(),
        });

        gsap.fromTo(
          finalRef,
          { scale: 1.08 },
          {
            scale: 1.18,
            duration: 0.22,
            ease: "power2.in",
            onComplete: () => {
              gsap.to(finalRef, {
                scale: 1,
                duration: 0.7,
                ease: "elastic.out(1, 0.5)",
              });
            },
          }
        );

        gsap.fromTo(
          finalRef,
          { boxShadow: "0 0 0px 0px #ffcc00" },
          {
            boxShadow: "0 0 80px 30px #ffcc00, 0 0 160px 60px #fff8",
            duration: 0.7,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              gsap.to(finalRef, {
                boxShadow: "none",
                duration: 0.5,
                ease: "power2.inOut",
              });
            },
          }
        );

        const content = labelsRef.current[idx];
        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              delay: 0.18,
              ease: "back.out(1.7)",
            }
          );
        }

        confetti({
          particleCount: 180,
          spread: 120,
          origin: { y: 0.6 },
          startVelocity: 50,
          ticks: 320,
          gravity: 0.7,
          decay: 0.93,
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
      let speed = 700;
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
            {!isShuffling && (
              <div
                className="carousel-content carousel-content-large"
                ref={(el) => (labelsRef.current[i] = el)}
              >
                <h1>{board.name}</h1>
                <div className="board-shuffle-icon">
                  <img src={board.icon} alt={board.name} />
                </div>
                <div className="board-details">
                  <p className="board-description">{board.description}</p>
                  <div className="board-stats">
                    <div className="board-stat">
                      <span className="stat-label">Difficulté</span>
                      <span className="stat-value">{board.difficulty}</span>
                    </div>
                    <div className="board-stat">
                      <span className="stat-label">Type</span>
                      <span className="stat-value">{board.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {!isShuffling && (
        <button
          className="reset-button"
          onClick={() => {
            setIsShuffling(true);
            setTransitioning(true);
          }}
          disabled={transitioning}
        >
          <span className="reset-icon">🔄</span>
          Nouvelle Carte
        </button>
      )}
    </div>
  );
};

BoardCarousel.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default BoardCarousel;
