import { motion } from "framer-motion";

interface HangingImage {
  src: string;
  alt: string;
  duration?: number;
  delay?: number;
  position?: "left" | "center" | "right" | "left2" | "center2" | "right2";
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-20 h-28",
  md: "w-24 h-32",
  lg: "w-28 h-36",
};

const positionMap = {
  left: "left-[5%] top-[15%]",
  center: "right-[5%] top-[25%]",
  right: "left-[8%] top-[60%]",
  left2: "right-[8%] top-[70%]",
  center2: "left-[10%] top-[45%]",
  right2: "right-[12%] top-[50%]",
};

export function HangingImage({
  src,
  alt,
  duration = 4,
  delay = 0,
  position = "center",
  size = "md",
}: HangingImage) {
  return (
    <motion.div
      className={`fixed ${positionMap[position]} z-[60] pointer-events-none`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <div className={`${sizeMap[size]} bg-white/10 border-2 border-white/20 rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm p-1`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    </motion.div>
  );
}

interface HangingImagesProps {
  images: HangingImage[];
  count?: number;
}

export function HangingImages({ images, count = 6 }: HangingImagesProps) {
  const positions: Array<"left" | "center" | "right" | "left2" | "center2" | "right2"> = ["left", "center", "right", "left2", "center2", "right2"];
  const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg", "md", "sm", "lg"];

  return (
    <>
      {images.slice(0, count).map((image, index) => (
        <HangingImage
          key={index}
          {...image}
          position={image.position || positions[index]}
          size={image.size || sizes[index]}
          delay={image.delay || index * 0.5}
        />
      ))}
    </>
  );
}
