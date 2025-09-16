"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

//---------------------------------------------------

interface TProps {
  heading: string;
  description: string;
}

//---------------------------------------------------

const SectionHeader = ({ heading, description }: TProps) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setMouseEnter(true);
      }}
      onMouseLeave={() => {
        setMouseEnter(false);
      }}
      className="border-gray-15 relative mx-auto flex w-full flex-col items-center justify-center space-y-[14px] border-b py-[50px] text-center lg:py-[70px] xl:py-[100px] overflow-clip"
    >
      {/* <div className="absolute top-0 h-full w-full bg-[radial-gradient(#191919_1px,#030303_1px)] bg-[size:20px_20px]"></div> */}

      <h2 className="z-10 max-w-[90%] text-[28px] font-semibold sm:text-[32px] md:text-[36px] lg:text-[42px]">
        {heading}
      </h2>
      <p className="text-gray-90 z-10 max-w-[90%] text-[14px] sm:max-w-[80%] sm:text-[16px] lg:max-w-[70%] lg:text-[18px] xl:max-w-[50%]">
        {description}
      </p>

      <Illustration mouseEnter={mouseEnter} />
    </div>
  );
};

export default SectionHeader;

export const Illustration = ({ mouseEnter }: { mouseEnter: boolean }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glowingStars, setGlowingStars] = useState<number[]>([]);
  const highlightedStars = useRef<number[]>([]);
  const mouseOverRef = useRef<boolean>(false);
  const lastUpdateTime = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  const columns = 75;
  const rows = 10;
  const stars = columns * rows;
  const cellSize = 21; // 20px + 1px gap
  const glowRadius = 90;
  const updateThreshold = 16; // ~60fps

  const getStarPosition = useCallback(
    (starIndex: number): { x: number; y: number } => {
      const row = Math.floor(starIndex / columns);
      const col = starIndex % columns;
      return {
        x: col * cellSize + 10, // +10 to center of cell (20px/2)
        y: row * cellSize + 10,
      };
    },
    [columns, cellSize],
  );

  // Calculate distance between two points
  const getDistance = (
    pos1: { x: number; y: number },
    pos2: { x: number; y: number },
  ): number => {
    return Math.sqrt(
      Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2),
    );
  };

  // Update glowing stars based on mouse position
  const updateGlowingStars = useCallback(
    (mouseX: number, mouseY: number) => {
      if (!mouseOverRef.current) {
        setGlowingStars([...highlightedStars.current]);
        return;
      }

      let first = true;
      const nearbyStars: number[] = [];

      // Optimize: only check stars in nearby grid area
      const mouseCol = Math.floor((mouseX - 10) / cellSize);
      const mouseRow = Math.floor((mouseY - 10) / cellSize);
      const searchRadius = Math.ceil(glowRadius / cellSize);

      for (
        let r = Math.max(0, mouseRow - searchRadius);
        r <= Math.min(rows - 1, mouseRow + searchRadius) && first;
        r++
      ) {
        for (
          let c = Math.max(0, mouseCol - searchRadius);
          c <= Math.min(columns - 1, mouseCol + searchRadius) && first;
          c++
        ) {
          const i = r * columns + c;
          const starPos = getStarPosition(i);
          const distance = getDistance({ x: mouseX, y: mouseY }, starPos);

          if (distance <= glowRadius) {
            const centerRow = Math.floor(i / columns) - 1;
            const centerCol = i % columns;
            // 4x5 rectangle around the center star
            for (let rowOffset = 1; rowOffset <= 4; rowOffset++) {
              for (let colOffset = -1; colOffset <= 3; colOffset++) {
                const newRow = centerRow + rowOffset;
                const newCol = centerCol + colOffset;
                if (
                  newRow >= 0 &&
                  newRow < rows &&
                  newCol >= 0 &&
                  newCol < columns
                ) {
                  const newIndex = newRow * columns + newCol;
                  nearbyStars.push(newIndex);
                }
              }
            }
            first = false;
          }
        }
      }
      setGlowingStars(nearbyStars);
    },
    [cellSize, glowRadius, getStarPosition, columns, rows],
  );

  // Throttled mouse movement handler
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const now = performance.now();

      // Get rect immediately while event is valid
      const rect = e.currentTarget.getBoundingClientRect();
      const newMousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // Cancel previous animation frame if still pending
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Throttle updates
      if (now - lastUpdateTime.current < updateThreshold) {
        animationFrameRef.current = requestAnimationFrame(() => {
          setMousePos(newMousePos);
          updateGlowingStars(newMousePos.x, newMousePos.y);
          lastUpdateTime.current = performance.now();
        });
        return;
      }

      // Immediate update if enough time has passed
      setMousePos(newMousePos);
      updateGlowingStars(newMousePos.x, newMousePos.y);
      lastUpdateTime.current = now;
    },
    [updateGlowingStars, updateThreshold],
  );

  const handleMouseOver = useCallback((e) => {
    mouseOverRef.current = true;
    handleMouseMove(e)
  }, []);

  const handleMouseOut = useCallback(() => {
    mouseOverRef.current = false;
    setGlowingStars([...highlightedStars.current]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (mouseOverRef.current) {
        return;
      }
      highlightedStars.current = Array.from({ length: 20 }, () =>
        Math.floor(Math.random() * stars),
      );
      setGlowingStars([...highlightedStars.current]);
    }, 3000);
    return () => clearInterval(interval);
  }, [stars]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      className="absolute top-0 left-0 z-20 h-full w-full p-1"
      onMouseMove={handleMouseMove}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 20px)`,
        gap: `1px`,
      }}
    >
      {[...Array(stars)].map((_, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx);
        const delay = (starIdx % 10) * 0.1;
        return (
          <div
            key={`matrix-col-${starIdx}}`}
            className="relative flex items-center justify-center"
          >
            <Star isGlowing={isGlowing} delay={mouseEnter ? 0 : delay} />
          </div>
        );
      })}
    </div>
  );
};

const Star = ({ isGlowing, delay }: { isGlowing: boolean; delay: number }) => {
  return (
    <motion.div
      key={delay}
      initial={{
        scale: 1,
      }}
      animate={{
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing ? "#fff" : "#666",
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
        delay: delay,
      }}
      className={cn("relative z-20 h-[1px] w-[1px] rounded-full bg-[#666]")}
    ></motion.div>
  );
};

const Glow = ({ delay }: { delay: number }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      exit={{
        opacity: 0,
      }}
      className="absolute left-1/2 z-10 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-blue-500 shadow-2xl shadow-blue-400 blur-[1px]"
    />
  );
};
