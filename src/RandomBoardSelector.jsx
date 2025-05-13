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
    for (let i = 0; i < 35; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      // Paramètres aléatoires
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

const Loader = () => (
  <div className="loader">
    <div className="spinner" />
    <span>Chargement…</span>
  </div>
);

const FavoritesList = ({ favorites, onSelectBoard, onClose }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, []);

  return (
    <div className="favorites-overlay">
      <div className="favorites-panel" ref={panelRef}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Mes Plateaux Favoris</h2>
        {favorites.length === 0 ? (
          <p className="no-favorites">Aucun favori pour le moment</p>
        ) : (
          <div className="favorites-grid">
            {favorites.map((boardId) => {
              const board = boards.find((b) => b.id === boardId);
              if (!board) return null;
              return (
                <div
                  key={boardId}
                  className="favorite-item"
                  onClick={() => onSelectBoard(board)}
                >
                  <img
                    src={board.icon}
                    alt={board.name}
                    className="favorite-icon"
                  />
                  <span>{board.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const RandomBoardSelector = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    // Chargement des favoris depuis le localStorage
    const saved = localStorage.getItem("boardFavorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const logoBackgroundRef = useRef(null);
  const confettiIntervalRef = useRef(null);

  const letsGoSoundRef = useRef(null);
  const mixSoundRef = useRef(null);
  const jamboreeThemeRef = useRef(null);
  const starSoundRef = useRef(null);

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

    starSoundRef.current = new Howl({
      src: ["/assets/star-sound.mp3"],
      volume: isMuted ? 0 : 0.7,
      autoplay: false,
      html5: true,
    });

    // Démarrer la musique du thème automatiquement
    if (jamboreeThemeRef.current && !isMuted) {
      jamboreeThemeRef.current.play();
    }

    // Animation d'entrée initiale
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Animation du bouton
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay: 0.7,
          ease: "back.out(1.7)",
        }
      );
    }

    if (logoBackgroundRef.current) {
      gsap.fromTo(
        logoBackgroundRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
      );
    }

    return () => {
      letsGoSoundRef.current?.unload();
      mixSoundRef.current?.unload();
      jamboreeThemeRef.current?.unload();
      starSoundRef.current?.unload();
    };
  }, [isMuted]);

  // Sauvegarde des favoris dans le localStorage quand ils changent
  useEffect(() => {
    localStorage.setItem("boardFavorites", JSON.stringify(favorites));
  }, [favorites]);

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

  // Nettoyer les confettis lors du démontage du composant
  useEffect(() => {
    return () => {
      stopConfettiShower();
    };
  }, []);

  const handleSelectRandomBoard = () => {
    setLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * boards.length);
      setSelectedBoard(boards[randomIndex]);

      // Démarrer la pluie de confettis
      startConfettiShower();

      jamboreeThemeRef.current?.fade(0, 0.5, 1000);
      setTimeout(() => {
        jamboreeThemeRef.current?.play();
      }, 1000);
      setIsPlaying(false);
      setIsScrolling(false);
      setLoading(false);
    }, 800);
  };

  const handleSelectBoard = (board) => {
    setSelectedBoard(board);
    setShowFavorites(false);
    setIsScrolling(false);
    setIsPlaying(false);

    // Effet de transition lors de la sélection d'un favori
    gsap.fromTo(
      containerRef.current,
      { opacity: 0.7 },
      { opacity: 1, duration: 0.7, ease: "power2.inOut" }
    );
  };

  const handleButtonClick = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    stopConfettiShower(); // Arrêter les confettis avant de changer de carte

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
        }, 5000);
      },
    });

    if (logoBackgroundRef.current) {
      gsap.to(logoBackgroundRef.current, {
        opacity: 0,
        scale: 1.2,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  };

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
    // Mise à jour immédiate du volume sur les sons en cours
    if (letsGoSoundRef.current)
      letsGoSoundRef.current.volume(isMuted ? 1.0 : 0);
    if (mixSoundRef.current) mixSoundRef.current.volume(isMuted ? 1.0 : 0);
    if (jamboreeThemeRef.current) {
      jamboreeThemeRef.current.volume(isMuted ? 0.5 : 0);

      // Si on active le son et qu'aucun son ne joue, démarrer la musique de thème
      if (isMuted && !jamboreeThemeRef.current.playing()) {
        jamboreeThemeRef.current.play();
      } else if (!isMuted) {
        jamboreeThemeRef.current.pause();
      }
    }
    if (starSoundRef.current) {
      starSoundRef.current.volume(isMuted ? 0.7 : 0);
    }
  };

  const toggleFavorite = (boardId) => {
    setFavorites((prev) => {
      if (prev.includes(boardId)) {
        // Retirer des favoris
        return prev.filter((id) => id !== boardId);
      } else {
        // Ajouter aux favoris avec effet sonore
        if (starSoundRef.current && !isMuted) {
          starSoundRef.current.play();
        }
        return [...prev, boardId];
      }
    });
  };

  const isFavorite = selectedBoard
    ? favorites.includes(selectedBoard.id)
    : false;

  return (
    <div className="random-board-container fullscreen" ref={containerRef}>
      <Particles />

      <button
        onClick={handleMuteToggle}
        className="control-button mute-button"
        aria-label={isMuted ? "Activer le son" : "Couper le son"}
      >
        {isMuted ? "🔊" : "🔇"}
      </button>

      <div className="app-controls">
        <button
          onClick={() => setShowFavorites(true)}
          className="control-button favorites-button"
          aria-label="Afficher mes favoris"
        >
          ⭐
        </button>
      </div>

      {showFavorites && (
        <FavoritesList
          favorites={favorites}
          onSelectBoard={handleSelectBoard}
          onClose={() => setShowFavorites(false)}
        />
      )}

      {isScrolling ? (
        <BoardCarousel onFinish={handleSelectRandomBoard} />
      ) : selectedBoard ? (
        <>
          <BoardCard board={selectedBoard} onSelectRandom={handleButtonClick} />
          <button
            onClick={() => toggleFavorite(selectedBoard.id)}
            className={`favorite-toggle ${isFavorite ? "is-favorite" : ""}`}
            aria-label={
              isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
            }
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </>
      ) : (
        <div className="welcome-screen">
          <div className="logo-container" ref={logoBackgroundRef}>
            <img
              src="/assets/jamboree.png"
              alt="Mario Party Jamboree Logo"
              className="welcome-logo"
            />
            <Particles />
          </div>
          <button
            ref={buttonRef}
            onClick={handleButtonClick}
            className="random-button pulse-animation"
            aria-label="Choisir un plateaux aléatoire"
            disabled={isPlaying}
            tabIndex={0}
          >
            Choisir un plateau aléatoire
          </button>
        </div>
      )}
    </div>
  );
};

export default RandomBoardSelector;
