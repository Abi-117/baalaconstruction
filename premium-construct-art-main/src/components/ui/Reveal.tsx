import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "scale" | "mask";

const dirVariants = (dir: Direction): Variants => {
  switch (dir) {
    case "left":
      return {
        hidden: { opacity: 0, x: -60 },
        show: { opacity: 1, x: 0 },
      };
    case "right":
      return {
        hidden: { opacity: 0, x: 60 },
        show: { opacity: 1, x: 0 },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.92 },
        show: { opacity: 1, scale: 1 },
      };
    case "mask":
      return {
        hidden: { clipPath: "inset(0 100% 0 0)" },
        show: { clipPath: "inset(0 0% 0 0)" },
      };
    default:
      return {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0 },
      };
  }
};

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "section" | "span" | "p" | "h1" | "h2" | "h3";
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.9,
  once = true,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.25 }}
      variants={dirVariants(direction)}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

// Word-by-word cinematic reveal for large headings
export function TextReveal({ text, className, delay = 0, stagger = 0.08 }: TextRevealProps) {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      className={className}
      style={{ display: "inline-block" }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <motion.span
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: { y: "0%", opacity: 1 },
            }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "inline-block", paddingRight: "0.28em" }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
