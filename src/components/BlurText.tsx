import { motion } from "framer-motion";

type BlurTextProps = {
  text: string;
  className?: string;
};

export function BlurText({ text, className }: BlurTextProps) {
  const words = text.split(" ");

  return (
    <h1 className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block mr-[0.28em] last:mr-0"
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: index * 0.1,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}
