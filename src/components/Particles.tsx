"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
};

/*
 * Original canvas particle field.
 * Small sparse dots, mostly muted grey with a few red, drifting very slowly.
 * No connecting lines, no gradients, no mouse following.
 * Pauses when the page is hidden or the canvas scrolls out of view.
 * With prefers-reduced-motion, dots are drawn once and never move.
 */

const MAX_PARTICLES = 56;
const DENSITY_AREA_PER_PARTICLE = 26000;
const GREY = "#878580";
const RED = "#af3029";

function randomSpeed(): number {
  // Very slow drift: roughly 2 to 6 pixels per second at 60fps.
  return (Math.random() * 0.07 + 0.03) * (Math.random() < 0.5 ? -1 : 1);
}

function makeParticles(width: number, height: number): Particle[] {
  const count = Math.max(
    18,
    Math.min(MAX_PARTICLES, Math.floor((width * height) / DENSITY_AREA_PER_PARTICLE)),
  );
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const isRed = i % 14 === 0;
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: isRed ? 2 : Math.random() * 1.2 + 0.8,
      vx: randomSpeed(),
      vy: randomSpeed(),
      color: isRed ? RED : GREY,
      alpha: isRed ? 0.55 : Math.random() * 0.25 + 0.2,
    });
  }
  return particles;
}

function drawDots(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (const p of particles) {
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let particles: Particle[] = [];
    let rafId = 0;
    let running = false;
    let visible = true;
    let inView = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = makeParticles(rect.width, rect.height);
      drawDots(ctx, particles);
    };

    const tick = () => {
      if (!running) {
        return;
      }
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;
        if (p.y < -4) p.y = height + 4;
        if (p.y > height + 4) p.y = -4;
      }
      drawDots(ctx, particles);
      rafId = requestAnimationFrame(tick);
    };

    const maybeStart = () => {
      const shouldRun = visible && inView && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (shouldRun && !running) {
        running = true;
        rafId = requestAnimationFrame(tick);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(rafId);
      }
    };

    const onVisibilityChange = () => {
      visible = !document.hidden;
      maybeStart();
    };

    resize();

    // Reduced motion: draw the dots once, never animate.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {
        window.removeEventListener("resize", resize);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        maybeStart();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", resize);
    maybeStart();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
