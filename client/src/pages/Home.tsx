import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarryBackground } from "@/components/StarryBackground";
import { IntroScreen } from "@/components/IntroScreen";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Stars, Infinity as InfinityIcon, ArrowDown, Sparkles } from "lucide-react";
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

  // Background persists across all steps
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden text-white font-sans selection:bg-primary/40 selection:text-white">
      {/* Persistent Starry Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarryBackground />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
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
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.5 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center"
    >
      <div className="mb-12 flex flex-col items-center max-w-4xl">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-10"
        >
          {/* Decorative element */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full" />
            <Sparkles className="w-24 h-24 text-primary/80 relative z-10 animate-pulse" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          <h1 className="text-4xl md:text-7xl font-bold mb-8 text-white font-display leading-tight tracking-tight">
            In this infinite universe...
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1.5 }}
            className="text-3xl md:text-6xl font-script text-primary text-glow"
          >
            I found you.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <Button
          onClick={onNext}
          size="lg"
          className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md rounded-full px-10 py-8 text-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group"
        >
          <Stars className="mr-3 h-6 w-6 text-yellow-200 group-hover:rotate-180 transition-transform duration-700" />
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      className="relative z-10 w-full min-h-screen overflow-y-auto no-scrollbar scroll-smooth"
    >
      {/* Scroll indicator - only visible initially */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-white/50 font-medium">Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
      </motion.div>

      {/* SECTION 1 */}
      <StorySection>
        <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, rotate: -5, x: -50 }}
            whileInView={{ opacity: 1, rotate: -2, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-72 h-96 bg-white/5 border-[6px] border-white p-2 rounded-sm shadow-2xl flex-shrink-0 relative group"
          >
             <div className="w-full h-full bg-neutral-900 flex items-center justify-center overflow-hidden">
                <span className="text-white/30 text-sm font-medium">Photo 1 Placeholder</span>
                {/* Image would go here: <img src="..." className="w-full h-full object-cover" /> */}
             </div>
             {/* Tape effect */}
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/20 backdrop-blur-sm rotate-1" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left max-w-lg"
          >
            <div className="text-6xl mb-8 opacity-80 animate-bounce">😊</div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white font-display leading-tight">
              First, I noticed <span className="text-primary italic">your smile</span>.
            </h2>
            <p className="text-xl text-white/70 leading-relaxed font-light">
              It wasn't just a smile. It was the light that somehow managed to brighten even my darkest days. A curve that set everything straight.
            </p>
          </motion.div>
        </div>
      </StorySection>

      {/* SECTION 2 */}
      <StorySection>
        <div className="flex flex-col md:flex-row-reverse items-center gap-16 max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, rotate: 5, x: 50 }}
            whileInView={{ opacity: 1, rotate: 3, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-72 h-96 bg-white/5 border-[6px] border-white p-2 rounded-sm shadow-2xl flex-shrink-0 relative"
          >
             <div className="w-full h-full bg-neutral-900 flex items-center justify-center overflow-hidden">
                <span className="text-white/30 text-sm font-medium">Photo 2 Placeholder</span>
             </div>
             {/* Tape effect */}
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/20 backdrop-blur-sm -rotate-2" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-right max-w-lg"
          >
            <div className="text-6xl mb-8 opacity-80 animate-pulse">❤️</div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white font-display leading-tight">
              Then I fell for <span className="text-primary italic">your heart</span>.
            </h2>
            <p className="text-xl text-white/70 leading-relaxed font-light">
              Kind, pure, and beautiful beyond words. I realized that your outer beauty was just a reflection of the amazing soul within.
            </p>
          </motion.div>
        </div>
      </StorySection>

      {/* SECTION 3 */}
      <StorySection>
        <div className="flex flex-col items-center gap-12 max-w-4xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md aspect-[4/3] bg-white/5 border-[8px] border-white p-3 rounded-sm shadow-2xl relative"
          >
             <div className="w-full h-full bg-neutral-900 flex items-center justify-center overflow-hidden">
                <span className="text-white/30 text-sm font-medium">Photo 3 Placeholder</span>
             </div>
             <div className="absolute -bottom-12 right-4 text-6xl rotate-12 drop-shadow-lg">💍</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-glow-gold text-yellow-100 font-display">
              And one day, I married <br/><span className="font-script text-5xl md:text-7xl">my best friend.</span>
            </h2>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button
                onClick={onNext}
                size="lg"
                className="mt-8 bg-primary hover:bg-primary/80 text-white rounded-full px-12 py-8 text-xl shadow-lg shadow-primary/30 transition-all hover:scale-105"
              >
                Continue Journey
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </StorySection>
      
      {/* Extra space at bottom */}
      <div className="h-24" />
    </motion.div>
  );
}

function StorySection({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 border-b border-white/5 last:border-0 snap-center">
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
        title: "Missing Information",
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
      cryingAudio.play().catch(console.error);

      // Automatically reset after some time
      setTimeout(() => setIsGenieDead(false), 4000);
      return;
    }

    setCalculating(true);

    // Save to backend
    createLoveLog.mutate({ name1, name2 });

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
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-6"
          >
            <div className="bg-red-950/30 border-4 border-red-600 p-8 rounded-3xl text-center max-w-sm w-full shadow-[0_0_100px_rgba(220,38,38,0.4)] relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
              
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, -2, 2, 0]
                }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                {/* Fallback image if asset missing */}
                <img 
                  src="/images/genie-dead-v2.png" 
                  alt="Genie Dead" 
                  className="w-56 h-auto mx-auto mb-6 drop-shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </motion.div>
              <h2 className="text-4xl font-black text-red-500 mb-2 uppercase italic tracking-tighter font-display">🚨 GENIE DEAD 🚨</h2>
              <p className="text-white font-bold text-xl leading-tight">
                Sorry, your genie died!<br/>
                <span className="text-red-400 text-sm opacity-80 mt-2 block font-mono">ERROR: WRONG_COUPLE_DETECTED</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-md w-full bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
        {/* Shine effect */}
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/5 to-transparent rotate-45 pointer-events-none" />

        {!showResult ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 relative z-10"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2 font-display text-white">Love Calculator</h2>
              <p className="text-white/60">Let's see what the stars say...</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1 text-primary tracking-wide uppercase">Your Name</label>
                <Input
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="Enter name..."
                  className="bg-white/5 border-white/10 text-white h-14 text-lg rounded-xl focus:border-primary/50 focus:ring-primary/20 placeholder:text-white/20"
                />
              </div>
              
              <div className="flex justify-center -my-4 relative z-10">
                <div className="bg-black p-3 rounded-full border border-white/10 shadow-lg shadow-primary/20">
                  <Heart className="w-6 h-6 text-primary fill-primary animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1 text-primary tracking-wide uppercase">Her Name</label>
                <Input
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="Enter name..."
                  className="bg-white/5 border-white/10 text-white h-14 text-lg rounded-xl focus:border-primary/50 focus:ring-primary/20 placeholder:text-white/20"
                />
              </div>
            </div>

            <Button
              onClick={handleCalculate}
              disabled={calculating}
              className="w-full h-16 text-lg font-bold rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/20 mt-4 transition-all hover:scale-[1.02]"
            >
              {calculating ? (
                <span className="flex items-center gap-3">
                  <Stars className="w-5 h-5 animate-spin" /> Consulting the Cosmos...
                </span>
              ) : (
                "Calculate Our Destiny"
              )}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-10 py-8 relative z-10"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <InfinityIcon className="w-32 h-32 text-primary animate-pulse relative z-10" strokeWidth={1.5} />
              <Heart className="w-10 h-10 text-white fill-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 drop-shadow-lg" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white/90">Calculation Complete</h3>
              <p className="text-lg text-white/80 leading-relaxed">
                Love cannot be calculated... <br />
                But with you, it's <span className="text-primary font-bold text-2xl font-script ml-1">Infinite</span>.
              </p>
            </div>

            <Button
              onClick={onNext}
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary hover:text-white h-14 px-8 rounded-full text-lg transition-all"
            >
              Reveal Final Message
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
        className="max-w-4xl space-y-12 flex flex-col items-center"
      >
        <motion.div 
          className="w-80 h-60 md:w-96 md:h-72 p-3 bg-white/10 backdrop-blur-md border-[6px] border-white/20 rounded-lg shadow-2xl overflow-hidden relative group"
          initial={{ rotate: -2 }}
          animate={{ rotate: 2 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 4, ease: "easeInOut" }}
        >
           <div className="w-full h-full bg-neutral-900 flex items-center justify-center relative">
              <span className="text-white/40 text-sm font-medium">Final Photo Placeholder</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
           </div>
           <div className="absolute top-4 right-4 animate-pulse">
              <Heart className="w-8 h-8 text-white fill-white drop-shadow-lg" />
           </div>
        </motion.div>

        <div className="relative">
          <h1 className="text-4xl md:text-7xl font-bold leading-tight font-display tracking-tight text-white mb-4">
            If love was code,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-primary to-purple-400 animate-gradient bg-300%">
              you’d be my infinite loop.
            </span>
          </h1>
          <div className="w-32 h-1 bg-primary mx-auto rounded-full opacity-50" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="pt-8"
        >
          <p className="text-4xl md:text-6xl font-script text-white/90 text-glow-gold">
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
  const hearts = Array.from({ length: 20 }).map((_, i) => ({
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
          className="absolute bottom-[-50px] text-primary/20"
          style={{ left: h.left }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ 
            y: -1500, 
            opacity: [0, 0.5, 0],
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
