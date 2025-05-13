import { useRef, useEffect } from "react";
import { Howl } from "howler";

export default function useAudio(isMuted) {
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
    return () => {
      letsGoSoundRef.current?.unload();
      mixSoundRef.current?.unload();
      jamboreeThemeRef.current?.unload();
    };
  }, [isMuted]);

  return { letsGoSoundRef, mixSoundRef, jamboreeThemeRef };
}
