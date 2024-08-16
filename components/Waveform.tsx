import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { FC } from "react";

type WaveformProps = {
  fft: number[];
};

function useIsDarkTheme(): boolean {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => setIsDarkTheme(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  return isDarkTheme;
}

export const Waveform: FC<WaveformProps> = (props) => {
  const { fft } = props;
  const isDarkTheme = useIsDarkTheme();

  // Set colors based on the theme
  const rectColor = isDarkTheme ? "white" : "black";
  const bgColor = isDarkTheme ? "#333" : "#fff";

  return (
    <motion.svg
      className={""}
      viewBox={"0 0 100 100"}
      width={300}
      height={200}
      style={{ backgroundColor: bgColor }}
    >
      {Array.from({ length: 24 }).map((_, index) => {
        const value = (fft[index] ?? 0) / 4;
        const height = Math.min(Math.max(value * 80, 2), 70);
        const yOffset = 50 - height * 0.5;

        return (
          <motion.rect
            className="transition-colors"
            key={index}
            fill={rectColor}
            height={height}
            width={2}
            x={2 + (index * 100 - 4) / 24}
            y={yOffset}
          />
        );
      })}
    </motion.svg>
  );
};
