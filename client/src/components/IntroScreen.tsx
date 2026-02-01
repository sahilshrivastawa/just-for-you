import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface IntroScreenProps {
  onAccept: () => void;
}

export function IntroScreen({ onAccept }: IntroScreenProps) {
  const [mode, setMode] = useState<"ask" | "danger">("ask");
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);

  // Handle the "moving" NO button
  const handleNoHover = () => {
    const newX = (Math.random() - 0.5) * 300; 
    const newY = (Math.random() - 0.5) * 300;
    setNoButtonPos({ x: newX, y: newY });
    
    // Play sound on move
    const ouchAudio = new Audio("/audio/ouch.mp3");
    ouchAudio.volume = 0.5;
    ouchAudio.play().catch(() => {});
    
    setHoverCount(prev => prev + 1);
  };

  useEffect(() => {
    if (mode === "danger") {
      // Danger sound logic
      const interval = setInterval(() => {
        // Simple beep using Web Audio API for alarm effect
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = "sawtooth";
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [mode]);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-colors duration-300 ${mode === "danger" ? "bg-red-900/40 animate-[flash_0.5s_infinite]" : "bg-black"}`}>
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
            className="text-center p-8 bg-black/60 backdrop-blur-md rounded-3xl border border-white/10 max-w-lg w-full mx-4 shadow-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-12 text-white font-display leading-tight">
              Will you be mine <br/>
              <span className="text-primary italic">forever?</span> ♾️❤️
            </h1>
            
            <div className="flex flex-wrap justify-center gap-8 relative h-32 items-center">
              <Button
                size="lg"
                onClick={onAccept}
                className="bg-primary hover:bg-primary/80 text-white min-w-[140px] rounded-full text-xl py-8 font-bold shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:scale-110 transition-transform duration-300 z-10"
              >
                YES!
              </Button>
              
              <motion.div
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  onMouseEnter={handleNoHover}
                  onClick={() => setMode("danger")}
                  className="border-white/20 text-white/70 hover:bg-white/10 min-w-[140px] rounded-full text-xl py-8 font-medium backdrop-blur-sm"
                >
                  {hoverCount > 3 ? "Just say Yes!" : "No"}
                </Button>
              </motion.div>
            </div>
            
            <p className="mt-8 text-white/30 text-sm italic">
              (There is only one correct answer)
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="danger"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-8 max-w-lg bg-black/80 rounded-3xl border-2 border-red-500 shadow-[0_0_50px_rgba(220,38,38,0.5)]"
          >
            <div className="mb-6 flex justify-center">
              <AlertTriangle className="w-24 h-24 text-red-500 animate-pulse drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
            </div>
            
            <h2 className="text-5xl font-black text-red-500 mb-6 tracking-tighter uppercase font-display">
              🚨 DANGER 🚨
            </h2>
            
            <p className="text-2xl font-bold text-white mb-2 leading-relaxed">
              Your cutie husband’s life is in danger!
            </p>
            <p className="text-xl text-white/60 mb-10 italic font-serif">
              You are the saviour — save him fast!!
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={onAccept}
                className="bg-green-600 hover:bg-green-500 text-white rounded-full text-2xl px-12 py-8 shadow-[0_0_30px_rgba(22,163,74,0.6)] animate-bounce font-bold tracking-wider uppercase w-full"
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
