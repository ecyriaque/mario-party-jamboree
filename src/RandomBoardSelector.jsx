// RandomBoardSelector.jsx (amélioré)
import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { gsap } from "gsap";
import { boards } from "./data/board";
import BoardCard from "./BoardCard";
import BoardCarousel from "./BoardCarousel";

// Composant Particles pour l'animation de fond
const Particles = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    if (!particlesRef.current) return;

    // Créer des particules avec des positions et des délais aléatoires
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      // Paramètres aléatoires
      const size = Math.random() * 4 + 2;
      const posX = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 10 + 10;
      const opacity = Math.random() * 0.5 + 0.3;

      // Appliquer les styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.bottom = "0";
      particle.style.opacity = opacity;
      particle.style.animationDuration = `${duration}s`;
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

const RandomBoardSelector = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  const letsGoSoundRef = useRef(null);
  const mixSoundRef = useRef(null);
  const jamboreeThemeRef = useRef(null);

  useEffect(() => {
    letsGoSoundRef.current = new Howl({
      src: ["/assets/letsgo.mp3"],
      volume: isMuted ? 0 : 1.0,
      autoplay: false,
      html5: true,
    });

    mixSoundRef.current = new Howl({
      src: ["/assets/mixSound.mp3"],
      volume: isMuted ? 0 : 1.0,
      autoplay: false,
      html5: true,
    });

    jamboreeThemeRef.current = new Howl({
      src: ["/assets/jamboree-theme.mp3"],
      volume: isMuted ? 0 : 0.5,
      loop: true,
      autoplay: false,
      html5: true,
    });

    // Animation d'entrée initiale
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "back.out(1.7)",
        }
      );
    }

    return () => {
      letsGoSoundRef.current?.unload();
      mixSoundRef.current?.unload();
      jamboreeThemeRef.current?.unload();
    };
  }, [isMuted]);

  const handleSelectRandomBoard = () => {
    const randomIndex = Math.floor(Math.random() * boards.length);
    setSelectedBoard(boards[randomIndex]);

    // Arrêter et relancer la musique finale
    jamboreeThemeRef.current?.stop();
    jamboreeThemeRef.current?.play();

    setIsPlaying(false);
    setIsScrolling(false);
  };

  const handleButtonClick = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    // Animation du bouton avant de lancer le carousel
    gsap.to(buttonRef.current, {
      scale: 1.2,
      opacity: 0,
      duration: 0.5,
      ease: "back.in(1.7)",
      onComplete: () => {
        setIsScrolling(true);

        jamboreeThemeRef.current?.stop();
        letsGoSoundRef.current?.stop();
        letsGoSoundRef.current?.play();
        mixSoundRef.current?.stop();
        mixSoundRef.current?.play();

        setTimeout(() => {
          handleSelectRandomBoard();
        }, 5000); // Délai avant l'arrêt du carousel
      },
    });
  };

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
    // Mise à jour immédiate du volume sur les sons en cours
    if (letsGoSoundRef.current)
      letsGoSoundRef.current.volume(isMuted ? 1.0 : 0);
    if (mixSoundRef.current) mixSoundRef.current.volume(isMuted ? 1.0 : 0);
    if (jamboreeThemeRef.current)
      jamboreeThemeRef.current.volume(isMuted ? 0.5 : 0);
  };

  return (
    <div className="random-board-container fullscreen" ref={containerRef}>
      <Particles />

      <button
        onClick={handleMuteToggle}
        className="mute-button"
        aria-label={isMuted ? "Activer le son" : "Couper le son"}
      >
        {isMuted ? "🔊" : "🔇"}
      </button>

      {isScrolling ? (
        <BoardCarousel onFinish={handleSelectRandomBoard} />
      ) : selectedBoard ? (
        <BoardCard board={selectedBoard} onSelectRandom={handleButtonClick} />
      ) : (
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          className="random-button pulse-animation"
          aria-label="Choisir un tableau aléatoire"
          disabled={isPlaying}
        >
          Choisir un tableau aléatoire
        </button>
      )}
    </div>
  );
};

export default RandomBoardSelector;
