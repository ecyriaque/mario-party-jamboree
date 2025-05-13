# Mario Party Jamboree - Random Board Selector

## 🚀 How to Run the App

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the development server**
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎮 About the Project

This project is a **React-based web application** that randomly selects one of the **7 boards** available in **Mario Party Jamboree**. The goal is to provide an engaging and interactive experience inspired by the fun and dynamic design of the game.

## ✨ Main Features

- **Random board selection**: Click the button to generate a random board from the game.
- **Animations & Effects**: Dynamic transitions, confetti, glow, zoom, flash, animated background particles.
- **Detailed display**: Each board shows its name, image, description, difficulty, and type.
- **Favorites**: Add or remove boards from your favorites, accessible via a dedicated panel.
- **Sounds**: Sound effects during shuffle and reveal, with mute support.
- **Responsive**: Interface adapts to mobile and tablet screens.

---

## 🛠️ Technologies Used

- **React + Vite**: For fast and modern web development.
- **GSAP**: For advanced animations.
- **Howler.js**: For sound management.
- **PropTypes**: For prop validation.

## 🗂️ Project Structure

```
src/
│
├── App.jsx                # Main entry point
├── main.jsx               # React bootstrap
├── index.css              # Global styles and animations
│
├── components/            # Reusable UI components
│   ├── Particles.jsx      # Animated background particles
│   ├── Loader.jsx         # Animated loader
│   └── FavoritesList.jsx  # Favorites panel
│
├── hooks/                 # Custom React hooks
│   ├── useFavorites.js    # Favorites management (localStorage)
│   ├── useAudio.js        # Sound management (Howler.js)
│   └── useConfetti.js     # Confetti animation management
│
├── utils/                 # Utility functions
│   └── boardUtils.js      # Functions for board difficulty/type
│
├── data/                  # Board data
│   └── board.js           # List of boards (name, description, images...)
│
├── BoardCard.jsx          # Detailed board display
├── BoardCarousel.jsx      # Animated carousel for shuffle
├── RandomBoardSelector.jsx# Main selection logic and UI
└── assets/                # Images, sounds, logos...
```

---

## 📝 Notes

- **No unnecessary dependencies**: Only React, GSAP, Howler.js, and PropTypes are used.
- **Modular code**: Each feature is isolated in a dedicated component or hook.
- **Easy to extend**: Add new boards, effects, or sounds by editing the dedicated files.

---

## 👨‍💻 Author

Project by [Your Name].
