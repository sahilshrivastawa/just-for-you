import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio("/audio/romantic-background.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Browser policy requires user interaction before playing audio
    const handleFirstInteraction = () => {
      if (!isPlaying) {
        audio.play().catch(e => console.log("Audio play failed:", e));
        setIsPlaying(true);
      }
      document.removeEventListener("click", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      audio.pause();
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMusic}
        className="rounded-full bg-black/40 backdrop-blur-md border-white/20 text-white hover:bg-white/10 w-12 h-12 shadow-lg"
        title={isPlaying ? "Mute Music" : "Play Music"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-primary animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-white/50" />
        )}
      </Button>
    </div>
  );
}
