import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import BoardCard from "./BoardCard";
import BoardCarousel from "./BoardCarousel";
import Particles from "./components/Particles";
import Loader from "./components/Loader";
import FavoritesList from "./components/FavoritesList";
import useFavorites from "./hooks/useFavorites";
import useAudio from "./hooks/useAudio";
import useConfetti from "./hooks/useConfetti";
import { boards } from "./data/board";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WelcomeScreen from "./components/WelcomeScreen";
import MarioScene from "./PlayerController";
import { useMarioStore } from "./store/store";

const RandomBoardSelector = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const logoBackgroundRef = useRef(null);

  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { letsGoSoundRef, mixSoundRef, jamboreeThemeRef, coinSoundRef } =
    useAudio(isMuted);
  const { startConfettiShower, stopConfettiShower } = useConfetti();

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power3.out" }
    );

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
    };
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem("boardFavorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (!selectedBoard && !isScrolling) {
      const { resetPlayerPosition } = useMarioStore.getState();
      resetPlayerPosition();
    }
  }, [selectedBoard, isScrolling]);

  useEffect(() => {
    const { setWalkBounds, setWalkSpeed, resetPlayerPosition } =
      useMarioStore.getState();
    resetPlayerPosition();
    setWalkBounds({ min: -10, max: 10 });
    setWalkSpeed(3.5);
  }, []);

  const handleSelectRandomBoard = () => {
    setLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * boards.length);
      setSelectedBoard(boards[randomIndex]);

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

    gsap.fromTo(
      containerRef.current,
      { opacity: 0.7 },
      { opacity: 1, duration: 0.7, ease: "power2.inOut" }
    );
  };

  const handleButtonClick = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    stopConfettiShower();

    const buttonElement = buttonRef.current;
    const buttonRect = buttonElement.getBoundingClientRect();
    const buttonX = (buttonRect.left + buttonRect.right) / 2;

    const viewportWidth = window.innerWidth;
    const worldX = ((buttonX / viewportWidth) * 2 - 1) * 8;

    const {
      setButtonClicked,
      setJumpTarget,
      setPlayerHasHitButton,
      resetPlayerPosition,
    } = useMarioStore.getState();
    setJumpTarget({ x: worldX, y: 0 });
    setButtonClicked(true);
    setPlayerHasHitButton(false);

    const unsubscribe = useMarioStore.subscribe((state) => {
      if (state.playerHasHitButton) {
        unsubscribe();

        coinSoundRef.current?.play();

        buttonRef.current.classList.add("button-bounce", "button-hit");

        setTimeout(() => {
          setButtonClicked(false);
          resetPlayerPosition();
        }, 300);

        gsap.to(buttonRef.current, {
          y: -15,
          duration: 0.2,
          ease: "back.out(1.7)",
          onComplete: () => {
            gsap.to(buttonRef.current, {
              y: 0,
              duration: 0.2,
              ease: "back.in(1.7)",
              onComplete: () => {
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
              },
            });
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
      }
    });
  };

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);

    if (letsGoSoundRef.current)
      letsGoSoundRef.current.volume(isMuted ? 1.0 : 0);
    if (mixSoundRef.current) mixSoundRef.current.volume(isMuted ? 1.0 : 0);
    if (jamboreeThemeRef.current) {
      jamboreeThemeRef.current.volume(isMuted ? 0.5 : 0);

      if (isMuted && !jamboreeThemeRef.current.playing()) {
        jamboreeThemeRef.current.play();
      } else if (!isMuted) {
        jamboreeThemeRef.current.pause();
      }
    }
  };

  const handleToggleFavorite = (boardId) => {
    toggleFavorite(boardId);
    if (isFavorite(boardId)) {
      toast.success("Plateau retiré des favoris !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: "#ffcc00",
          color: "#333",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(255, 204, 0, 0.5)",
        },
      });
    } else {
      toast.success("Plateau ajouté aux favoris !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: "#ffcc00",
          color: "#333",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(255, 204, 0, 0.5)",
        },
      });
    }
  };

  const handleChooseAnotherBoard = () => {
    if (isPlaying || isScrolling) {
      console.log("Action déjà en cours, clic ignoré");
      return;
    }

    console.log("Lancement du shuffle pour un nouveau plateau");

    setIsPlaying(true);
    stopConfettiShower();

    gsap.to(containerRef.current, {
      opacity: 0.5,
      duration: 0.3,
      ease: "power2.in",
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
  };

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
          <BoardCard
            board={selectedBoard}
            onSelectRandom={handleChooseAnotherBoard}
          />
          <button
            onClick={() => handleToggleFavorite(selectedBoard.id)}
            className={`favorite-toggle ${
              isFavorite(selectedBoard.id) ? "is-favorite" : ""
            }`}
            aria-label={
              isFavorite(selectedBoard.id)
                ? "Retirer des favoris"
                : "Ajouter aux favoris"
            }
          >
            {isFavorite(selectedBoard.id) ? "★" : "☆"}
          </button>
        </>
      ) : (
        <div className="welcome-screen">
          <Particles />
          <div className="welcome-content-blur">
            <div className="logo-container" ref={logoBackgroundRef}>
              <img
                src="/assets/logo.png"
                alt="Mario Party Jamboree Logo"
                className="welcome-logo"
              />
            </div>
            <button
              ref={buttonRef}
              onClick={handleButtonClick}
              className="random-button pulse-animation mario-question-block"
              aria-label="Choisir un plateaux aléatoire"
              disabled={isPlaying}
              tabIndex={0}
            >
              <div className="block-face">
                <span className="question-mark">?</span>
                <div
                  className="button-highlight"
                  ref={(el) => {
                    if (el) {
                      const handleMarioJump = () => {
                        if (
                          !buttonRef.current.classList.contains("button-hit")
                        ) {
                          buttonRef.current.classList.add(
                            "button-hit",
                            "button-bounce"
                          );

                          coinSoundRef.current?.play();

                          setTimeout(() => {
                            buttonRef.current.classList.remove(
                              "button-hit",
                              "button-bounce"
                            );
                          }, 500);
                        }
                      };

                      const unsubscribe = useMarioStore.subscribe((state) => {
                        if (
                          state.isJumping &&
                          state.jumpTarget &&
                          Math.abs(
                            state.playerPosition.x - state.jumpTarget.x
                          ) < 0.5 &&
                          state.jumpHeight > 0.5
                        ) {
                          handleMarioJump();
                        }
                      });

                      return () => unsubscribe();
                    }
                  }}
                ></div>
              </div>
              <span className="block-text">Choisir un plateau</span>
            </button>
          </div>
        </div>
      )}

      {!isScrolling && !selectedBoard && (
        <MarioScene
          height="200px"
          bottom="-20px"
          walkBounds={{ min: -10, max: 10 }}
          walkSpeed={3.5}
          useSimpleModel={false}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default RandomBoardSelector;
