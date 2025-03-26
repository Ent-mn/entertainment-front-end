"use client";

import type React from "react";
import { useRef, useEffect } from "react";

interface CanvasRevealEffectProps {
  animationSpeed: number;
  containerClassName?: string;
  colors: number[][];
  dotSize: number;
}

export const CanvasRevealEffect: React.FC<CanvasRevealEffectProps> = ({
  animationSpeed,
  containerClassName,
  colors,
  dotSize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    const dots: { x: number; y: number; color: number[] }[] = [];
    const numDots = Math.floor((width * height) / (dotSize * 4));

    for (let i = 0; i < numDots; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const color = colors[Math.floor(Math.random() * colors.length)];
      dots.push({ x, y, color });
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height); // Non-null assertion here

      dots.forEach((dot) => {
        ctx!.fillStyle = `rgb(${dot.color[0]}, ${dot.color[1]}, ${dot.color[2]})`; // Non-null assertion here
        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
        ctx!.closePath();
        ctx!.fill();

        dot.x += (Math.random() - 0.5) * animationSpeed;
        dot.y += (Math.random() - 0.5) * animationSpeed;

        if (dot.x < 0) dot.x = width;
        if (dot.x > width) dot.x = 0;
        if (dot.y < 0) dot.y = height;
        if (dot.y > height) dot.y = 0;
      });

      requestAnimationFrame(draw);
    }

    draw();
  }, [animationSpeed, colors, dotSize]);

  return <canvas className={containerClassName} ref={canvasRef} />;
};
