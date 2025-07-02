'use client';
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1500,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const [current, setCurrent] = useState<number>(0);
  const animationRef = useRef<number | null>(null);
  const startValueRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    startValueRef.current = current;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const animatedValue =
        startValueRef.current + (value - startValueRef.current) * progress;
      setCurrent(animatedValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration, current]);

  const formatNumber = (num: number): string => {
    const roundedNum = decimals === 0 ? Math.round(num) : num;
    return roundedNum.toFixed(decimals);
  };

  return (
    <span className={className}>
      {prefix}
      {formatNumber(current)}
      {suffix}
    </span>
  );
};
