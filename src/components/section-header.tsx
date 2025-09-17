"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
      className="border-gray-15 relative mx-auto flex w-full flex-col items-center justify-center space-y-[14px] overflow-clip border-b py-[50px] text-center lg:py-[70px] xl:py-[100px]"
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
  const rows = 15;
  const stars = columns * rows;
  const cellSize = 21; // 20px + 1px gap
  const glowRadius = 10;
  const updateThreshold = 32; // ~30fps for smoother performance

  // Pre-calculate plus pattern offsets
  const plusOffsets = useMemo(
    () => [
      [0, -1],
      [0, 0],
      [0, 1], // center row: left, center, right
      [-1, 0], // above center
      [1, 0], // below center
    ],
    [],
  );

  // Memoize star positions
  const starPositions = useMemo(() => {
    return Array.from({ length: stars }, (_, starIndex) => {
      const row = Math.floor(starIndex / columns);
      const col = starIndex % columns;
      return {
        x: col * cellSize + 10, // +10 to center of cell (20px/2)
        y: row * cellSize + 10,
      };
    });
  }, [stars, columns, cellSize]);

  const getStarPosition = useCallback(
    (starIndex: number): { x: number; y: number } => {
      return starPositions[starIndex];
    },
    [starPositions],
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

      const nearbyStars: number[] = [];

      // Optimize: only check stars in nearby grid area
      const mouseCol = Math.floor((mouseX - 10) / cellSize);
      const mouseRow = Math.floor((mouseY - 10) / cellSize);
      const searchRadius = Math.ceil(glowRadius / cellSize);

      outerLoop: for (
        let r = Math.max(0, mouseRow - searchRadius);
        r <= Math.min(rows - 1, mouseRow + searchRadius);
        r++
      ) {
        for (
          let c = Math.max(0, mouseCol - searchRadius);
          c <= Math.min(columns - 1, mouseCol + searchRadius);
          c++
        ) {
          const i = r * columns + c;
          const starPos = starPositions[i];
          const distance = getDistance({ x: mouseX, y: mouseY }, starPos);

          if (distance <= glowRadius) {
            const centerRow = Math.floor(i / columns) - 1;
            const centerCol = i % columns;

            // Use pre-calculated plus pattern offsets
            for (const [rowOffset, colOffset] of plusOffsets) {
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

            break outerLoop; // Exit both loops once we find the first match
          }
        }
      }

      setGlowingStars((prev) => {
        const prevItems = prev.slice(-8); // Keep fewer previous items
        return [...prevItems, ...nearbyStars];
      });
    },
    [cellSize, glowRadius, starPositions, columns, rows, plusOffsets],
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

  const handleMouseOver = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      mouseOverRef.current = true;
      handleMouseMove(e);
    },
    [handleMouseMove],
  );

  const handleMouseLeave = useCallback(() => {
    mouseOverRef.current = false;
    console.log("mouse out");
    setGlowingStars([...highlightedStars.current]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (mouseOverRef.current) {
        return;
      }
      highlightedStars.current = Array.from({ length: 15 }, () =>
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
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
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
            <Star
              isGlowing={isGlowing}
              mouseOver={mouseOverRef.current}
              delay={mouseEnter ? 0 : delay}
            />
          </div>
        );
      })}
    </div>
  );
};

const Star = ({
  isGlowing,
  delay,
  mouseOver,
}: {
  mouseOver: boolean;
  isGlowing: boolean;
  delay: number;
}) => {
  return (
    <motion.div
      key={delay}
      initial={{
        scale: 1,
      }}
      animate={{
        scale: isGlowing
          ? mouseOver
            ? [2.8, 2.8]
            : [1, 1.2, 2.5, 2.2, 1.5]
          : 1,
        background: isGlowing
          ? mouseOver
            ? "var(--color-green-50)"
            : "#fff"
          : "#666",
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
