"use client";

import { useRef, useEffect } from "react";

interface DrawingCanvasProps {
  shape: string;
  shapeColor: string;
  backgroundColor: string;
  numX: number;
  numY: number;
  gap: number;
}

export function DrawingCanvas({
  shape,
  shapeColor,
  backgroundColor,
  numX,
  numY,
  gap,
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      const shapeWidth = (width - (numX + 1) * gap) / numX;
      const shapeHeight = (height - (numY + 1) * gap) / numY;

      for (let i = 0; i < numX; i++) {
        for (let j = 0; j < numY; j++) {
          const x = gap + i * (shapeWidth + gap);
          const y = gap + j * (shapeHeight + gap);

          ctx.save();
          ctx.translate(x + shapeWidth / 2, y + shapeHeight / 2);

          if (shapeColor === "Mixed") {
            ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
          } else {
            ctx.fillStyle = shapeColor;
          }

          switch (shape) {
            case "Circle":
              drawCircle(ctx, shapeWidth, shapeHeight);
              break;
            case "Diamond":
              drawDiamond(ctx, shapeWidth, shapeHeight);
              break;
            case "Heart":
              drawHeart(ctx, shapeWidth, shapeHeight);
              break;
            case "Triangle":
              drawTriangle(ctx, shapeWidth, shapeHeight);
              break;
            case "Square":
              drawSquare(ctx, shapeWidth, shapeHeight);
              break;
          }

          ctx.fill();
          ctx.restore();
        }
      }
    };

    const drawCircle = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number
    ) => {
      const radius = Math.min(width, height) / 2;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.closePath();
    };

    const drawDiamond = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, -height / 2);
      ctx.lineTo(width / 2, 0);
      ctx.lineTo(0, height / 2);
      ctx.lineTo(-width / 2, 0);
      ctx.closePath();
    };

    const drawHeart = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number
    ) => {
      const size = Math.min(width, height);
      ctx.beginPath();
      ctx.moveTo(0, size * 0.25);
      ctx.bezierCurveTo(size * 0.5, -size * 0.25, size, 0, 0, size);
      ctx.bezierCurveTo(-size, 0, -size * 0.5, -size * 0.25, 0, size * 0.25);
      ctx.closePath();
    };

    const drawTriangle = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, -height / 2);
      ctx.lineTo(width / 2, height / 2);
      ctx.lineTo(-width / 2, height / 2);
      ctx.closePath();
    };

    const drawSquare = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number
    ) => {
      const size = Math.min(width, height);
      ctx.beginPath();
      ctx.rect(-size / 2, -size / 2, size, size);
      ctx.closePath();
    };

    draw();

    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [shape, shapeColor, backgroundColor, numX, numY, gap]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
