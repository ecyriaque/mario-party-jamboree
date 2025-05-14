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
- **3D Interactive Mario**: A 3D Mario runs along the screen and jumps to hit the button.
- **Mario Question Block**: Custom styled button in the form of the iconic Mario question mark block.
- **Animations & Effects**: Dynamic transitions, confetti, glow, zoom, flash, animated background particles.
- **Detailed display**: Each board shows its name, image, description, difficulty, and type.
- **Favorites**: Add or remove boards from your favorites, accessible via a dedicated panel.
- **Sounds**: Sound effects during shuffle and reveal, with mute support.
- **Responsive**: Interface adapts to mobile and tablet screens.

---

## 🛠️ Technologies Used

- **React + Vite**: For fast and modern web development.
- **Three.js + React Three Fiber**: For 3D rendering and interactions.
- **GSAP**: For advanced animations.
- **Howler.js**: For sound management.
- **Zustand**: For state management.
- **PropTypes**: For prop validation.

## 🗂️ Project Structure

```
src/
│
├── App.jsx                # Main entry point
├── main.jsx               # React bootstrap
├── index.css              # Global styles and animations
│
├── models/                # 3D models
│   └── Mario.jsx          # Mario 3D model with animations
│
├── store/                 # State management
│   └── store.js           # Zustand store for global state management
│
├── constants.js           # Application constants
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
├── PlayerController.jsx   # Controller for the 3D Mario model
├── RandomBoardSelector.jsx# Main selection logic and UI
└── assets/                # Images, sounds, logos...
    └── models/            # 3D model files
        └── player/        # Mario model and animations
```

---

## 3D Features

- **Interactive 3D Model**: Mario runs automatically across the screen and responds to user actions.
- **Animation System**: Several animations including idle, run, and jump for smooth transitions.
- **Physics Interaction**: Mario detects and jumps to hit the selection button.
- **Custom Button**: Stylized as a classic Mario question block that responds to interaction.
- **Visual Effects**: Hit effects, coin sounds, and animations when Mario interacts with UI elements.
- **Fallback System**: Simple geometric model as fallback if 3D model fails to load.

---

## 📝 Notes

- **Modular code**: Each feature is isolated in a dedicated component or hook.
- **State Management**: Uses Zustand for efficient state handling.
- **Easy to extend**: Add new boards, effects, or sounds by editing the dedicated files.
- **3D Performance**: Optimized for performance with model preloading and efficient rendering.

---

## 👨‍💻 Author

Project by Cyriaque Emilio.
