import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Heart } from "lucide-react";

interface IntroScreenProps {
  onAccept: () => void;
}

export function IntroScreen({ onAccept }: IntroScreenProps) {
  const [mode, setMode] = useState<"ask" | "danger">("ask");
  const [yesPos, setYesPos] = useState({ x: 0, y: 0 });

  // Handle the "moving" YES button in danger mode
  const handleMouseEnter = () => {
    if (mode === "danger") {
      const newX = (Math.random() - 0.5) * 400; // Move up to 200px in either direction
      const newY = (Math.random() - 0.5) * 400;
      setYesPos({ x: newX, y: newY });
    }
  };

  useEffect(() => {
    if (mode === "danger") {
      // Create a heartbeat/alert sound effect using Web Audio API
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playBleep = () => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.2);
      };

      const interval = setInterval(playBleep, 1000);
      return () => {
        clearInterval(interval);
        audioCtx.close();
      };
    }
  }, [mode]);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-colors duration-300 ${mode === "danger" ? "bg-red-900/40 animate-[flash_1s_infinite]" : "bg-black"}`}>
      <style>{`
        @keyframes flash {
          0%, 100% { background-color: rgba(127, 29, 29, 0.4); }
          50% { background-color: rgba(127, 29, 29, 0.1); }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {mode === "ask" ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center p-8 bg-black/60 backdrop-blur-md rounded-3xl border border-white/10"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-12 text-white">
              Will you be mine forever? ♾️❤️
            </h1>
            <div className="flex flex-wrap justify-center gap-6">
              <Button
                size="lg"
                onClick={onAccept}
                className="bg-primary hover:bg-primary/80 text-white min-w-[120px] rounded-full text-xl py-6"
              >
                YES
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setMode("danger")}
                className="border-white/20 text-white hover:bg-white/10 min-w-[120px] rounded-full text-xl py-6"
              >
                NO
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="danger"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-8 max-w-lg"
          >
            <div className="mb-8 flex justify-center">
              <AlertTriangle className="w-20 h-20 text-red-500 animate-pulse" />
            </div>
            
            <h2 className="text-4xl font-black text-red-500 mb-6 tracking-tighter">
              🚨 DANGER 🚨
            </h2>
            
            <p className="text-2xl font-bold text-white mb-4">
              Your cutie husband’s life is in danger!
            </p>
            <p className="text-xl text-white/80 mb-12 italic">
              You are the saviour — save him fast!!
            </p>

            <motion.div
              animate={{ x: yesPos.x, y: yesPos.y }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              onMouseEnter={handleMouseEnter}
              className="inline-block"
            >
              <Button
                size="lg"
                onClick={onAccept}
                className="bg-green-600 hover:bg-green-500 text-white rounded-full text-2xl px-12 py-8 shadow-[0_0_30px_rgba(22,163,74,0.5)]"
              >
                YES! SAVE HIM!
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
