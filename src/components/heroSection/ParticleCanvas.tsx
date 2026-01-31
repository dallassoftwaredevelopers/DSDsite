'use client';

import React, { useRef, useEffect, useCallback, memo } from 'react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  originalX: number;
  originalY: number;
  breatheOffset: number;
  breatheSpeed: number;
}

interface ParticleCanvasProps {
  text?: string;
  className?: string;
}

const canvasStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

function ParticleCanvas({ text = 'DSD', className }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false });
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  const generateParticlesFromText = useCallback(
    (width: number, height: number) => {
      const particles: Particle[] = [];
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return particles;

      if (width <= 0 || height <= 0) return particles;

      const baseFontSize = Math.min(width * 0.25, height * 0.7, 180);
      const fontSize = Math.max(baseFontSize, 50);
      offscreen.width = width;
      offscreen.height = height;

      offCtx.fillStyle = 'white';
      offCtx.font = `bold ${fontSize}px Inter, system-ui, sans-serif`;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText(text, offscreen.width / 2, offscreen.height / 2);

      const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
      const data = imageData.data;
      const gap = 4;

      for (let y = 0; y < offscreen.height; y += gap) {
        for (let x = 0; x < offscreen.width; x += gap) {
          const index = (y * offscreen.width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 128) {
            const edge = Math.random();
            let startX: number;
            let startY: number;

            if (edge < 0.25) {
              startX = -50;
              startY = Math.random() * height;
            } else if (edge < 0.5) {
              startX = width + 50;
              startY = Math.random() * height;
            } else if (edge < 0.75) {
              startX = Math.random() * width;
              startY = -50;
            } else {
              startX = Math.random() * width;
              startY = height + 50;
            }

            const hue = 210 + Math.random() * 30;
            const saturation = 80 + Math.random() * 20;
            const lightness = 35 + Math.random() * 25;

            particles.push({
              x: startX,
              y: startY,
              targetX: x,
              targetY: y,
              originalX: x,
              originalY: y,
              vx: 0,
              vy: 0,
              size: 1.5 + Math.random() * 2,
              color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
              breatheOffset: Math.random() * Math.PI * 2,
              breatheSpeed: 0.5 + Math.random() * 1,
            });
          }
        }
      }

      return particles;
    },
    [text]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setupCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();

      if (rect.width <= 0 || rect.height <= 0) return;

      canvas.width = rect.width;
      canvas.height = rect.height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      particlesRef.current = generateParticlesFromText(rect.width, rect.height);
    };

    setupCanvas();

    const animate = () => {
      if (!ctx || !canvas) return;

      timeRef.current += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const time = timeRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const breatheX = Math.sin(time * p.breatheSpeed + p.breatheOffset) * 2;
        const breatheY = Math.cos(time * p.breatheSpeed + p.breatheOffset) * 2;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        const mouseRadius = 150;

        if (distToMouse < mouseRadius && mouse.isActive) {
          const force = (1 - distToMouse / mouseRadius) * 0.08;
          p.vx += dx * force;
          p.vy += dy * force;
        } else {
          const targetX = p.originalX + breatheX;
          const targetY = p.originalY + breatheY;
          const returnForce = 0.08;
          p.vx += (targetX - p.x) * returnForce;
          p.vy += (targetY - p.y) * returnForce;
        }

        p.vx *= 0.85;
        p.vy *= 0.85;

        p.x += p.vx;
        p.y += p.vy;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const glowIntensity = Math.min(speed / 3, 1);

        if (glowIntensity > 0.1) {
          ctx.shadowBlur = 10 + glowIntensity * 15;
          ctx.shadowColor = p.color;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + glowIntensity * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { ...mouseRef.current, isActive: false };
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
        isActive: true,
      };
    };

    const handleTouchEnd = () => {
      mouseRef.current = { ...mouseRef.current, isActive: false };
    };

    const handleResize = () => setupCanvas();

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [generateParticlesFromText]);

  return <canvas ref={canvasRef} className={className} style={canvasStyle} />;
}

export default memo(ParticleCanvas);
