import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import { boards } from "./data/board";

const BoardCarousel = ({ onFinish }) => {
  const [currentBoard, setCurrentBoard] = useState(boards[0]);
  const carouselRef = useRef(null);
  const indexRef = useRef(0);
  const speedRef = useRef(400); // Vitesse initiale
  const slowDownFactor = 1.08; // Facteur de ralentissement

  useEffect(() => {
    let timeoutId;

    const changeBoard = () => {
      gsap.to(carouselRef.current, {
        x: `-${indexRef.current * 100}%`,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          indexRef.current = (indexRef.current + 1) % boards.length;
          setCurrentBoard(boards[indexRef.current]);

          speedRef.current *= slowDownFactor;

          if (speedRef.current <= 6000) {
            timeoutId = setTimeout(changeBoard, speedRef.current);
          } else {
            setTimeout(() => {
              gsap.to(carouselRef.current, {
                scale: 1.2,
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: onFinish,
              });
            }, 1500);
          }
        },
      });
    };

    timeoutId = setTimeout(changeBoard, speedRef.current);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onFinish]);

  return (
    <div className="carousel-wrapper ">
      <div className="carousel" ref={carouselRef}>
        {boards.map((board, index) => (
          <div
            key={index}
            className="carousel-item"
            style={{ backgroundImage: `url(${board.boardView})` }}
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
