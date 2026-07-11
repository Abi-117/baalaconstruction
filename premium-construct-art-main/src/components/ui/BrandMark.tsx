import { motion } from "framer-motion";

interface Props {
  className?: string;
  showText?: boolean;
  compact?: boolean;
}

export function BrandMark({ className, showText = true, compact = false }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <motion.svg
        width={compact ? 32 : 40}
        height={compact ? 32 : 40}
        viewBox="0 0 60 60"
        fill="none"
        aria-hidden="true"
        whileHover={{ rotate: [0, -3, 3, 0] }}
        transition={{ duration: 0.7 }}
      >
        <path
          d="M8 50 V22 L18 12 L28 22 V50 M28 50 V16 L38 8 L48 18 L52 22 V50 M8 50 H52"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
      </motion.svg>
      {showText && (
        <div className="leading-tight">
          <div
            className="font-display font-semibold tracking-tight text-[var(--color-heading)]"
            style={{ fontSize: compact ? "1rem" : "1.125rem" }}
          >
            BAALA 
          </div>
          <div
            className="uppercase tracking-[0.28em] text-[var(--color-primary)]"
            style={{ fontSize: compact ? "0.55rem" : "0.6rem" }}
          >
            Constructions
          </div>
        </div>
      )}
    </div>
  );
}
