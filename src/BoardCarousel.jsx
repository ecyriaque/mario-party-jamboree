// BoardCarousel.jsx (amélioré)
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import { boards } from "./data/board";

const BoardCarousel = ({ onFinish }) => {
  const [currentBoard, setCurrentBoard] = useState(boards[0]);
  const carouselRef = useRef(null);
  const wrapperRef = useRef(null);
  const indexRef = useRef(0);
  const speedRef = useRef(400); // Vitesse initiale
  const slowDownFactor = 1.08; // Facteur de ralentissement
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    // Effet d'entrée du carousel
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.inOut" }
    );

    let timeoutId;
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const changeBoard = () => {
      setTransitioning(true);

      if (carouselRef.current && !prefersReduced) {
        // Ajout d'un flash avant chaque transition
        gsap.to(wrapperRef.current, {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          duration: 0.1,
          onComplete: () => {
            gsap.to(wrapperRef.current, {
              backgroundColor: "rgba(0, 0, 0, 0)",
              duration: 0.3,
            });
          },
        });

        // Animation de déplacement avec rebond dynamique
        const easingStrength = Math.max(0.3, 1 - speedRef.current / 5000); // Progressivement plus doux

        gsap.to(carouselRef.current, {
          x: `-${indexRef.current * 100}%`,
          duration: Math.min(0.8, 400 / speedRef.current), // Durée plus courte à mesure que la vitesse augmente
          ease: `back.out(${easingStrength})`,
          onComplete: () => {
            indexRef.current = (indexRef.current + 1) % boards.length;
            setCurrentBoard(boards[indexRef.current]);
            speedRef.current *= slowDownFactor;
            setTransitioning(false);

            if (speedRef.current <= 6000) {
              timeoutId = setTimeout(changeBoard, speedRef.current);
            } else {
              // Animation de fin plus spectaculaire
              gsap.to(wrapperRef.current, {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                duration: 0.2,
                yoyo: true,
                repeat: 3,
                onComplete: () => {
                  // Zoom sur le plateau choisi
                  gsap.to(carouselRef.current, {
                    scale: 1.1,
                    duration: 0.5,
                    ease: "power2.inOut",
                  });

                  // Fondu pour sortir
                  gsap.to(wrapperRef.current, {
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.7,
                    ease: "power2.inOut",
                    onComplete: onFinish,
                  });
                },
              });
            }
          },
        });
      } else {
        // Si l'utilisateur préfère les animations réduites, passage immédiat
        indexRef.current = (indexRef.current + 1) % boards.length;
        setCurrentBoard(boards[indexRef.current]);
        speedRef.current *= slowDownFactor;
        setTransitioning(false);

        if (speedRef.current <= 6000) {
          timeoutId = setTimeout(changeBoard, speedRef.current);
        } else {
          onFinish();
        }
      }
    };

    timeoutId = setTimeout(changeBoard, speedRef.current);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onFinish]);

  return (
    <div
      className="carousel-wrapper"
      ref={wrapperRef}
      role="region"
      aria-label="Board Carousel"
    >
      <div className="carousel" ref={carouselRef}>
        {boards.map((board, index) => (
          <div
            key={index}
            className={`carousel-item ${transitioning ? "transitioning" : ""}`}
            style={{ backgroundImage: `url(${board.boardView})` }}
            aria-hidden="true"
          >
            <div className="carousel-content">
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
