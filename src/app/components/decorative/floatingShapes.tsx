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
    size: 60,
    color: 'hsl(var(--primary))',
    opacity: 0.1,
    top: '10%',
    left: '5%',
    animationDelay: '0s',
  },
  {
    type: 'square',
    size: 40,
    color: 'hsl(var(--primary-light))',
    opacity: 0.08,
    top: '70%',
    left: '80%',
    animationDelay: '1s',
  },
  {
    type: 'triangle',
    size: 50,
    color: 'hsl(var(--secondary))',
    opacity: 0.07,
    top: '30%',
    left: '90%',
    animationDelay: '2s',
  },
  {
    type: 'circle',
    size: 30,
    color: 'hsl(var(--accent))',
    opacity: 0.05,
    top: '80%',
    left: '20%',
    animationDelay: '3s',
  },
];

export default function FloatingShapes({
  shapes = defaultShapes,
  className = '',
}: FloatingShapesProps) {
  return (
    <div className={className} style={{ position: 'relative' }}>
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
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}