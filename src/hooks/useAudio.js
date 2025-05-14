import { useRef, useEffect } from "react";
import { Howl } from "howler";

const useAudio = (isMuted = false) => {
  const letsGoSoundRef = useRef();
  const mixSoundRef = useRef();
  const jamboreeThemeRef = useRef();
  const coinSoundRef = useRef();

  useEffect(() => {
    // Sons principaux
    letsGoSoundRef.current = new Howl({
      src: ["/assets/letsgo.mp3"],
      volume: isMuted ? 0 : 1.0,
      preload: true,
    });

    mixSoundRef.current = new Howl({
      src: ["/assets/mixSound.mp3"],
      volume: isMuted ? 0 : 1.0,
      preload: true,
    });

    jamboreeThemeRef.current = new Howl({
      src: ["/assets/jamboree-theme.mp3"],
      volume: isMuted ? 0 : 0.5,
      preload: true,
      loop: true,
    });

    // Son de pièce pour le saut de Mario
    coinSoundRef.current = new Howl({
      src: ["/assets/coin.mp3"],
      volume: isMuted ? 0 : 0.7,
      preload: true,
    });

    if (!isMuted) {
      jamboreeThemeRef.current.play();
    }

    return () => {
      letsGoSoundRef.current?.stop();
      mixSoundRef.current?.stop();
      jamboreeThemeRef.current?.stop();
      coinSoundRef.current?.stop();
    };
  }, [isMuted]);

  return { letsGoSoundRef, mixSoundRef, jamboreeThemeRef, coinSoundRef };
};

export default useAudio;
