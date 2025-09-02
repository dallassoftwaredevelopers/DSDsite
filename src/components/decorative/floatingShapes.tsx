'use client';

import React from 'react';
import styles from './decorative.module.css';

interface ShapeProps {
  type: 'circle' | 'square' | 'triangle';
  size: number;
  color: string;
  opacity: number;
  top: string;
  left: string;
  animationDelay?: string;
}

interface FloatingShapesProps {
  shapes?: ShapeProps[];
  className?: string;
}

const defaultShapes: ShapeProps[] = [
  {
    type: 'circle',
    size: 45,
    color: 'hsl(var(--primary))',
    opacity: 0.1,
    top: '10%',
    left: '15%',
    animationDelay: '0s',
  },
  {
    type: 'triangle',
    size: 40,
    color: 'hsl(var(--secondary))',
    opacity: 0.07,
    top: '15%',
    left: '45%',
    animationDelay: '2s',
  },
  {
    type: 'square',
    size: 30,
    color: 'hsl(var(--accent))',
    opacity: 0.07,
    top: '20%',
    left: '75%',
    animationDelay: '1.5s',
  },

  {
    type: 'square',
    size: 35,
    color: 'hsl(var(--primary-light))',
    opacity: 0.08,
    top: '40%',
    left: '25%',
    animationDelay: '1s',
  },
  {
    type: 'circle',
    size: 35,
    color: 'hsl(var(--primary-light))',
    opacity: 0.09,
    top: '50%',
    left: '60%',
    animationDelay: '2.5s',
  },

  {
    type: 'triangle',
    size: 38,
    color: 'hsl(var(--primary))',
    opacity: 0.08,
    top: '70%',
    left: '10%',
    animationDelay: '1.8s',
  },
  {
    type: 'circle',
    size: 25,
    color: 'hsl(var(--accent))',
    opacity: 0.05,
    top: '75%',
    left: '40%',
    animationDelay: '3s',
  },
  {
    type: 'square',
    size: 32,
    color: 'hsl(var(--secondary))',
    opacity: 0.06,
    top: '65%',
    left: '80%',
    animationDelay: '0.5s',
  },
];

export default function FloatingShapes({
  shapes = defaultShapes,
  className = '',
}: FloatingShapesProps) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 5,
        pointerEvents: 'none',
      }}
    >
      {shapes.map((shape, index) => {
        const shapeStyle = {
          '--shape-color': shape.color,
          '--shape-opacity': shape.opacity,
          width: `${shape.size}px`,
          height: shape.type !== 'triangle' ? `${shape.size}px` : 'auto',
          top: shape.top,
          left: shape.left,
          animationDelay: shape.animationDelay,
        } as React.CSSProperties;

        return (
          <div
            key={index}
            className={`${styles.floatingElement} ${styles[`shape${shape.type.charAt(0).toUpperCase() + shape.type.slice(1)}`]} ${styles.shape}`}
            style={shapeStyle}
            aria-hidden='true'
          />
        );
      })}
    </div>
  );
}
