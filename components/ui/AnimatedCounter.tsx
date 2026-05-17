"use client";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  noFormat?: boolean;
}

export default function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2000, noFormat = false }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  const formatted = (!noFormat && count >= 1000) ? count.toLocaleString("id-ID") : count.toString();

  return (
    <span ref={ref} style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 500 }}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
