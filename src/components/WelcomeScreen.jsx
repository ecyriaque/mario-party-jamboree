import React from "react";

function WelcomeMarioOverlay() {
  return (
    <div className="mario-overlay">
      <svg
        className="star-svg star-anim-1"
        width="36"
        height="36"
        viewBox="0 0 40 40"
      >
        <polygon
          points="20,2 25,15 39,15 28,24 32,38 20,30 8,38 12,24 1,15 15,15"
          fill="#ffe066"
          stroke="#ffcc00"
          strokeWidth="2"
        />
      </svg>
      <svg
        className="coin-svg coin-anim-1"
        width="28"
        height="28"
        viewBox="0 0 32 32"
      >
        <ellipse
          cx="16"
          cy="16"
          rx="13"
          ry="13"
          fill="#ffe066"
          stroke="#ffcc00"
          strokeWidth="3"
        />
        <rect x="13" y="8" width="6" height="14" rx="3" fill="#fff8b0" />
      </svg>
      <svg
        className="mushroom-svg mush-anim-1"
        width="34"
        height="34"
        viewBox="0 0 38 38"
      >
        <ellipse cx="19" cy="24" rx="9" ry="7" fill="#fff" />
        <ellipse cx="19" cy="16" rx="13" ry="7" fill="#ff3c00" />
        <circle cx="12" cy="16" r="2.5" fill="#fff" />
        <circle cx="26" cy="16" r="2.5" fill="#fff" />
      </svg>
      <svg
        className="shell-svg shell-anim-1"
        width="32"
        height="32"
        viewBox="0 0 36 36"
      >
        <ellipse cx="18" cy="24" rx="10" ry="7" fill="#fff" />
        <ellipse
          cx="18"
          cy="18"
          rx="12"
          ry="7"
          fill="#43a047"
          stroke="#2e7d32"
          strokeWidth="2"
        />
        <ellipse cx="18" cy="18" rx="6" ry="3.5" fill="#fff" opacity="0.5" />
      </svg>
      <svg
        className="block-svg block-anim-1"
        width="30"
        height="30"
        viewBox="0 0 36 36"
      >
        <rect
          x="4"
          y="4"
          width="22"
          height="22"
          rx="5"
          fill="#ffcc00"
          stroke="#ff9800"
          strokeWidth="3"
        />
        <text
          x="15"
          y="20"
          textAnchor="middle"
          fontSize="15"
          fontWeight="bold"
          fill="#fff"
          fontFamily="Arial"
        >
          ?
        </text>
      </svg>
      <svg
        className="superstar-svg superstar-anim-1"
        width="40"
        height="40"
        viewBox="0 0 54 54"
      >
        <polygon
          points="27,4 33,21 51,21 36,32 41,50 27,40 13,50 18,32 3,21 21,21"
          fill="#fff700"
          stroke="#ffcc00"
          strokeWidth="3"
        />
        <circle cx="20" cy="25" r="2" fill="#222" />
        <circle cx="34" cy="25" r="2" fill="#222" />
      </svg>
      <svg
        className="mushroom1up-svg mush1up-anim-1"
        width="36"
        height="36"
        viewBox="0 0 38 38"
      >
        <ellipse cx="19" cy="24" rx="9" ry="7" fill="#fff" />
        <ellipse cx="19" cy="16" rx="13" ry="7" fill="#43a047" />
        <circle cx="12" cy="16" r="2.5" fill="#fff" />
        <circle cx="26" cy="16" r="2.5" fill="#fff" />
      </svg>
      <svg
        className="fire-flower-svg flower-anim-1"
        width="32"
        height="32"
        viewBox="0 0 38 38"
      >
        <ellipse cx="19" cy="19" rx="8" ry="11" fill="#fff" />
        <ellipse cx="19" cy="15" rx="8" ry="6" fill="#ff9800" />
        <ellipse cx="19" cy="15" rx="4.5" ry="3.5" fill="#fff200" />
        <ellipse cx="19" cy="15" rx="2.2" ry="1.7" fill="#fff" />
        <rect x="16" y="25" width="5" height="7" rx="2.5" fill="#43a047" />
      </svg>
      <svg
        className="star-svg star-anim-2"
        width="24"
        height="24"
        viewBox="0 0 40 40"
      >
        <polygon
          points="20,2 25,15 39,15 28,24 32,38 20,30 8,38 12,24 1,15 15,15"
          fill="#ffe066"
          stroke="#ffcc00"
          strokeWidth="2"
        />
      </svg>
      <svg
        className="coin-svg coin-anim-2"
        width="22"
        height="22"
        viewBox="0 0 32 32"
      >
        <ellipse
          cx="16"
          cy="16"
          rx="10"
          ry="10"
          fill="#ffe066"
          stroke="#ffcc00"
          strokeWidth="2"
        />
        <rect x="13" y="8" width="4" height="8" rx="2" fill="#fff8b0" />
      </svg>

      <svg
        className="star-svg star-anim-3"
        style={{ top: "10%", left: "20%" }}
        width="18"
        height="18"
        viewBox="0 0 40 40"
      >
        <polygon
          points="20,2 25,15 39,15 28,24 32,38 20,30 8,38 12,24 1,15 15,15"
          fill="#fff"
          stroke="#ffcc00"
          strokeWidth="1"
        />
      </svg>
      <svg
        className="star-svg star-anim-4"
        style={{ top: "80%", left: "10%" }}
        width="14"
        height="14"
        viewBox="0 0 40 40"
      >
        <polygon
          points="20,2 25,15 39,15 28,24 32,38 20,30 8,38 12,24 1,15 15,15"
          fill="#ffe066"
          stroke="#ffcc00"
          strokeWidth="1"
        />
      </svg>
      <svg
        className="star-svg star-anim-5"
        style={{ bottom: "15%", right: "20%" }}
        width="22"
        height="22"
        viewBox="0 0 40 40"
      >
        <polygon
          points="20,2 25,15 39,15 28,24 32,38 20,30 8,38 12,24 1,15 15,15"
          fill="#fff700"
          stroke="#ffcc00"
          strokeWidth="1"
        />
      </svg>

      <svg
        className="coin-svg coin-anim-3"
        style={{ top: "30%", left: "80%" }}
        width="16"
        height="16"
        viewBox="0 0 32 32"
      >
        <ellipse
          cx="16"
          cy="16"
          rx="7"
          ry="7"
          fill="#ffe066"
          stroke="#ffcc00"
          strokeWidth="1.5"
        />
        <rect x="13" y="10" width="2" height="6" rx="1" fill="#fff8b0" />
      </svg>
      <svg
        className="coin-svg coin-anim-4"
        style={{ bottom: "25%", right: "10%" }}
        width="20"
        height="20"
        viewBox="0 0 32 32"
      >
        <ellipse
          cx="16"
          cy="16"
          rx="9"
          ry="9"
          fill="#ffe066"
          stroke="#ffcc00"
          strokeWidth="1.5"
        />
        <rect x="14" y="10" width="3" height="8" rx="1.5" fill="#fff8b0" />
      </svg>

      <svg
        className="mushroom-svg mush-anim-2"
        style={{ top: "60%", left: "30%" }}
        width="20"
        height="20"
        viewBox="0 0 38 38"
      >
        <ellipse cx="19" cy="24" rx="5" ry="4" fill="#fff" />
        <ellipse cx="19" cy="16" rx="7" ry="4" fill="#43a047" />
        <circle cx="16" cy="16" r="1.5" fill="#fff" />
        <circle cx="22" cy="16" r="1.5" fill="#fff" />
      </svg>
      <svg
        className="mushroom-svg mush-anim-3"
        style={{ bottom: "30%", right: "30%" }}
        width="24"
        height="24"
        viewBox="0 0 38 38"
      >
        <ellipse cx="19" cy="24" rx="6" ry="5" fill="#fff" />
        <ellipse cx="19" cy="16" rx="8" ry="5" fill="#ff3c00" />
        <circle cx="16" cy="16" r="1.5" fill="#fff" />
        <circle cx="22" cy="16" r="1.5" fill="#fff" />
      </svg>

      <svg
        className="shell-svg shell-anim-2"
        style={{ top: "70%", left: "60%" }}
        width="18"
        height="18"
        viewBox="0 0 36 36"
      >
        <ellipse cx="18" cy="24" rx="5" ry="3.5" fill="#fff" />
        <ellipse
          cx="18"
          cy="18"
          rx="6"
          ry="3.5"
          fill="#43a047"
          stroke="#2e7d32"
          strokeWidth="1"
        />
        <ellipse cx="18" cy="18" rx="3" ry="1.5" fill="#fff" opacity="0.5" />
      </svg>
      <svg
        className="shell-svg shell-anim-3"
        style={{ top: "20%", right: "40%" }}
        width="22"
        height="22"
        viewBox="0 0 36 36"
      >
        <ellipse cx="18" cy="24" rx="6" ry="4" fill="#fff" />
        <ellipse
          cx="18"
          cy="18"
          rx="7"
          ry="4"
          fill="#43a047"
          stroke="#2e7d32"
          strokeWidth="1"
        />
        <ellipse cx="18" cy="18" rx="3.5" ry="2" fill="#fff" opacity="0.5" />
      </svg>

      <svg
        className="block-svg block-anim-2"
        style={{ top: "50%", left: "10%" }}
        width="16"
        height="16"
        viewBox="0 0 36 36"
      >
        <rect
          x="4"
          y="4"
          width="10"
          height="10"
          rx="2"
          fill="#ffcc00"
          stroke="#ff9800"
          strokeWidth="1.5"
        />
        <text
          x="9"
          y="13"
          textAnchor="middle"
          fontSize="8"
          fontWeight="bold"
          fill="#fff"
          fontFamily="Arial"
        >
          ?
        </text>
      </svg>
      <svg
        className="block-svg block-anim-3"
        style={{ bottom: "40%", right: "20%" }}
        width="20"
        height="20"
        viewBox="0 0 36 36"
      >
        <rect
          x="4"
          y="4"
          width="14"
          height="14"
          rx="3"
          fill="#ffcc00"
          stroke="#ff9800"
          strokeWidth="1.5"
        />
        <text
          x="11"
          y="17"
          textAnchor="middle"
          fontSize="10"
          fontWeight="bold"
          fill="#fff"
          fontFamily="Arial"
        >
          ?
        </text>
      </svg>

      <svg
        className="fire-flower-svg flower-anim-2"
        style={{ top: "15%", right: "20%" }}
        width="18"
        height="18"
        viewBox="0 0 38 38"
      >
        <ellipse cx="19" cy="19" rx="4" ry="6" fill="#fff" />
        <ellipse cx="19" cy="15" rx="4" ry="3" fill="#ff9800" />
        <ellipse cx="19" cy="15" rx="2.5" ry="2" fill="#fff200" />
        <ellipse cx="19" cy="15" rx="1.2" ry="1" fill="#fff" />
        <rect x="17" y="25" width="2" height="4" rx="1" fill="#43a047" />
      </svg>
      <svg
        className="fire-flower-svg flower-anim-3"
        style={{ bottom: "20%", left: "40%" }}
        width="22"
        height="22"
        viewBox="0 0 38 38"
      >
        <ellipse cx="19" cy="19" rx="5" ry="7" fill="#fff" />
        <ellipse cx="19" cy="15" rx="5" ry="4" fill="#ff9800" />
        <ellipse cx="19" cy="15" rx="3" ry="2.5" fill="#fff200" />
        <ellipse cx="19" cy="15" rx="1.5" ry="1.2" fill="#fff" />
        <rect x="17" y="25" width="3" height="5" rx="1.5" fill="#43a047" />
      </svg>

      <svg
        className="superstar-svg superstar-anim-2"
        style={{ top: "25%", left: "60%" }}
        width="18"
        height="18"
        viewBox="0 0 54 54"
      >
        <polygon
          points="27,4 33,21 51,21 36,32 41,50 27,40 13,50 18,32 3,21 21,21"
          fill="#fff700"
          stroke="#ffcc00"
          strokeWidth="1"
        />
        <circle cx="20" cy="25" r="1" fill="#222" />
        <circle cx="34" cy="25" r="1" fill="#222" />
      </svg>
      <svg
        className="superstar-svg superstar-anim-3"
        style={{ bottom: "10%", left: "50%" }}
        width="22"
        height="22"
        viewBox="0 0 54 54"
      >
        <polygon
          points="27,4 33,21 51,21 36,32 41,50 27,40 13,50 18,32 3,21 21,21"
          fill="#fff700"
          stroke="#ffcc00"
          strokeWidth="1"
        />
        <circle cx="20" cy="25" r="1.2" fill="#222" />
        <circle cx="34" cy="25" r="1.2" fill="#222" />
      </svg>
    </div>
  );
}

const WelcomeScreen = ({ logoRef, buttonRef, onButtonClick, children }) => (
  <div className="welcome-screen">
    {children}
    <WelcomeMarioOverlay />
    <div className="welcome-content-blur">
      <div className="logo-container rainbow-border" ref={logoRef}>
        <img
          src="/assets/logo.png"
          alt="Mario Party Jamboree"
          className="welcome-logo"
        />
      </div>
      <h1 className="welcome-title animated-pop">Mario Party Jamboree</h1>
      <p className="welcome-baseline">
        Choisissez un plateau aléatoire pour votre prochaine partie !
      </p>
      <button
        ref={buttonRef}
        onClick={onButtonClick}
        className="random-button pulse-animation dice-button"
        aria-label="Choisir un plateau aléatoire"
      >
        <span className="dice-icon" aria-hidden="true">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="2"
              width="24"
              height="24"
              rx="6"
              fill="#fff"
              stroke="#ffcc00"
              strokeWidth="3"
            />
            <circle cx="8" cy="8" r="2" fill="#ffcc00" />
            <circle cx="20" cy="8" r="2" fill="#ffcc00" />
            <circle cx="8" cy="20" r="2" fill="#ffcc00" />
            <circle cx="20" cy="20" r="2" fill="#ffcc00" />
            <circle cx="14" cy="14" r="2" fill="#ffcc00" />
          </svg>
        </span>
        Choisir un plateau
      </button>
    </div>
  </div>
);

export default WelcomeScreen;
