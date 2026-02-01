import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarryBackground } from "@/components/StarryBackground";
import { IntroScreen } from "@/components/IntroScreen";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Stars, Infinity as InfinityIcon, ArrowDown } from "lucide-react";
import { useCreateLoveLog } from "@/hooks/use-love-logs";
import { useToast } from "@/hooks/use-toast";

// --- STEPS ---
// -1: Intro (Will you be mine?)
// 0: Universe Intro
// 1: Love Story Scroll
// 2: Love Calculator
// 3: Final Message

export default function Home() {
  const [step, setStep] = useState(-1);

  // Background persists across all steps, but we can darken it for certain sections
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden text-white">
      {/* Persistent Starry Background */}
      <div className="fixed inset-0 z-0">
        <StarryBackground />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      </div>

      <MusicPlayer />

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {step === -1 && <IntroScreen key="intro" onAccept={() => setStep(0)} />}
        {step === 0 && <StepUniverse key="step-0" onNext={() => setStep(1)} />}
        {step === 1 && <StepStory key="step-1" onNext={() => setStep(2)} />}
        {step === 2 && <StepCalculator key="step-2" onNext={() => setStep(3)} />}
        {step === 3 && <StepFinal key="step-3" />}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// STEP 0: UNIVERSE INTRO
// ============================================
function StepUniverse({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center"
    >
      <div className="mb-12 flex flex-col items-center">
        {/* Placeholder Photo Frame */}
        <div className="w-48 h-48 md:w-64 md:h-64 mb-8 p-3 bg-white/10 backdrop-blur-md border-4 border-white/20 rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden group">
          <div className="w-full h-full bg-primary/20 flex items-center justify-center relative">
             <span className="text-white/40 text-sm font-medium">Your Photo Here</span>
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-glow leading-tight">
            In this infinite universe...
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="text-2xl md:text-4xl font-script text-primary/90"
          >
            I found you.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <Button
          onClick={onNext}
          size="lg"
          className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md rounded-full px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          <Stars className="mr-2 h-5 w-5 text-yellow-300" />
          Begin Our Story
        </Button>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// STEP 1: LOVE STORY SCROLL
// ============================================
function StepStory({ onNext }: { onNext: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      className="relative z-10 w-full"
    >
      {/* Scroll indicator - only visible at top */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-xs uppercase tracking-widest text-white/50">Scroll Down</span>
        <ArrowDown className="w-5 h-5 text-white/50 animate-bounce" />
      </motion.div>

      {/* SECTION 1 */}
      <StorySection>
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
          <div className="w-64 h-80 bg-white/5 border-4 border-white/10 rounded-xl overflow-hidden -rotate-2 hover:rotate-0 transition-transform duration-500 shadow-xl flex-shrink-0">
             <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <span className="text-white/30 text-xs">Photo 1</span>
             </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center md:text-left"
          >
            <div className="text-6xl mb-6">😊</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-glow">
              First, I noticed your smile.
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-lg">
              It was the light that brightened even the darkest days.
            </p>
          </motion.div>
        </div>
      </StorySection>

      {/* SECTION 2 */}
      <StorySection>
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 max-w-5xl mx-auto">
          <div className="w-64 h-80 bg-white/5 border-4 border-white/10 rounded-xl overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-500 shadow-xl flex-shrink-0">
             <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <span className="text-white/30 text-xs">Photo 2</span>
             </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center md:text-right"
          >
            <div className="text-6xl mb-6">❤️</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-glow text-primary">
              Then I fell for your heart.
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-lg">
              Kind, pure, and beautiful beyond words.
            </p>
          </motion.div>
        </div>
      </StorySection>

      {/* SECTION 3 */}
      <StorySection>
        <div className="flex flex-col items-center gap-8 max-w-5xl mx-auto">
          <div className="w-72 h-48 bg-white/5 border-4 border-white/10 rounded-xl overflow-hidden shadow-2xl flex-shrink-0">
             <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <span className="text-white/30 text-xs">Photo 3</span>
             </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center flex flex-col items-center"
          >
            <div className="text-6xl mb-6">💍</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-glow-gold text-yellow-200">
              And one day, I married my best friend.
            </h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 1 }}
            >
              <Button
                onClick={onNext}
                size="lg"
                className="mt-8 bg-primary hover:bg-primary/80 text-white rounded-full px-10 py-6 text-xl shadow-lg shadow-primary/30 transition-all hover:scale-105"
              >
                Continue Journey
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </StorySection>
    </motion.div>
  );
}

function StorySection({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex items-center justify-center p-6 border-b border-white/5 last:border-0 snap-center">
      {children}
    </div>
  );
}

// ============================================
// STEP 2: LOVE CALCULATOR
// ============================================
function StepCalculator({ onNext }: { onNext: () => void }) {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [calculating, setCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isGenieDead, setIsGenieDead] = useState(false);
  const { toast } = useToast();
  
  const createLoveLog = useCreateLoveLog();

  const handleCalculate = async () => {
    const s1 = name1.trim().toLowerCase();
    const s2 = name2.trim().toLowerCase();

    if (!s1 || !s2) {
      toast({
        title: "Please enter both names",
        description: "We need two souls to make a connection.",
        variant: "destructive",
      });
      return;
    }

    // Fixed name check: Sahil and Swati
    if (
      !((s1 === "sahil" && s2 === "swati") || (s1 === "swati" && s2 === "sahil"))
    ) {
      setIsGenieDead(true);
      
      // Play crying sound
      const cryingAudio = new Audio("/audio/crying.mp3");
      cryingAudio.volume = 1.0;
      const playPromise = cryingAudio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Crying audio play failed:", error);
        });
      }

      // Automatically reset after some time
      setTimeout(() => setIsGenieDead(false), 3000);
      return;
    }

    setCalculating(true);

    // Save to backend
    try {
      createLoveLog.mutate({ name1, name2 });
    } catch (e) {
      console.error("Failed to log love", e);
    }

    // Simulate calculation delay
    setTimeout(() => {
      setCalculating(false);
      setShowResult(true);
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6"
    >
      <AnimatePresence>
        {isGenieDead && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-red-950/80 backdrop-blur-sm"
          >
            <div className="bg-black/80 border-4 border-red-600 p-8 rounded-3xl text-center max-w-xs shadow-[0_0_50px_rgba(220,38,38,0.5)]">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, -2, 2, 0]
                }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <img 
                  src="/images/genie-dead-v2.png" 
                  alt="Genie Dead" 
                  className="w-48 h-48 mx-auto mb-6"
                />
              </motion.div>
              <h2 className="text-3xl font-black text-red-500 mb-2 uppercase italic tracking-tighter">🚨 GENIE DEAD 🚨</h2>
              <p className="text-white font-bold text-lg leading-tight">
                Sorry, your gennie is dead!<br/>
                <span className="text-red-400 text-sm opacity-80 mt-2 block">Wrong name detected</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-md w-full bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        {!showResult ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-center mb-2">Love Calculator</h2>
            <p className="text-center text-white/60 mb-6">Let's see what the stars say...</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1 text-primary/90">Your Name</label>
                <Input
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="Enter name..."
                  className="bg-white/5 border-white/20 text-white h-12 text-lg focus:border-primary/50 focus:ring-primary/20"
                />
              </div>
              
              <div className="flex justify-center -my-2 relative z-10">
                <div className="bg-black/50 p-2 rounded-full border border-white/10">
                  <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium ml-1 text-primary/90">Her Name</label>
                <Input
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="Enter name..."
                  className="bg-white/5 border-white/20 text-white h-12 text-lg focus:border-primary/50 focus:ring-primary/20"
                />
              </div>
            </div>

            <Button
              onClick={handleCalculate}
              disabled={calculating}
              className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/20 mt-6"
            >
              {calculating ? (
                <span className="flex items-center gap-2">
                  <Stars className="w-5 h-5 animate-spin" /> Analyzing Stars...
                </span>
              ) : (
                "Calculate Love"
              )}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-8 py-4"
          >
            <div className="relative inline-block">
              <InfinityIcon className="w-24 h-24 text-primary animate-pulse" strokeWidth={1.5} />
              <Heart className="w-8 h-8 text-white fill-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Calculation Complete</h3>
              <p className="text-lg text-white/80">
                Love cannot be calculated... <br />
                But with you, it's <span className="text-primary font-bold text-xl">Infinite</span>.
              </p>
            </div>

            <Button
              onClick={onNext}
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary-foreground mt-4"
            >
              See Final Message
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// STEP 3: FINAL MESSAGE
// ============================================
function StepFinal() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="max-w-2xl space-y-8 flex flex-col items-center"
      >
        <div className="w-72 h-48 mb-8 p-3 bg-white/10 backdrop-blur-md border-4 border-white/20 rounded-2xl shadow-2xl overflow-hidden relative group">
           <div className="w-full h-full bg-primary/20 flex items-center justify-center">
              <span className="text-white/40 text-sm font-medium">Final Photo</span>
           </div>
           <motion.div 
             animate={{ scale: [1, 1.1, 1] }}
             transition={{ repeat: Infinity, duration: 2 }}
             className="absolute top-2 right-2"
           >
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
           </motion.div>
        </div>

        <div className="inline-block p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
           <Heart className="w-12 h-12 text-red-500 fill-red-500 animate-[pulse_3s_ease-in-out_infinite]" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight font-display tracking-wide">
          If love was code,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400">
            you’d be my infinite loop.
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="pt-12"
        >
          <p className="text-2xl md:text-4xl font-script text-white/90">
            Happy Valentine’s Day,<br />My Wife.
          </p>
        </motion.div>
      </motion.div>

      {/* Floating Hearts Animation Background Layer */}
      <FloatingHearts />
    </motion.div>
  );
}

function FloatingHearts() {
  // Generate random hearts
  const hearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${10 + Math.random() * 10}s`,
    delay: `${Math.random() * 5}s`,
    scale: 0.5 + Math.random() * 1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute bottom-[-50px] text-primary/30"
          style={{ left: h.left }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ 
            y: -1200, 
            opacity: [0, 0.8, 0],
            rotate: [0, 45, -45, 0] 
          }}
          transition={{
            duration: parseFloat(h.animationDuration),
            delay: parseFloat(h.delay),
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart style={{ transform: `scale(${h.scale})` }} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}
