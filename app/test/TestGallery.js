"use client";

import { useEffect, useMemo, useState } from "react";

export default function TestGallery({ images, perfectName }) {
  const [visibleCount, setVisibleCount] = useState(0);

  const otherImages = useMemo(() => {
    if (!perfectName) return images;
    return images.filter((image) => image !== perfectName);
  }, [images, perfectName]);

  useEffect(() => {
    setVisibleCount(0);
    if (otherImages.length === 0) return undefined;

    const interval = setInterval(() => {
      setVisibleCount((current) => {
        if (current >= otherImages.length) {
          clearInterval(interval);
          return current;
        }
        return current + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [otherImages.length]);

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {perfectName && (
        <div className="rounded-2xl border-2 border-emerald-400/80 bg-slate/70 p-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <img
            src={`/test/${perfectName}`}
            alt="Perfect sample"
            className="h-56 w-full rounded-xl object-cover"
          />
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-emerald-300 font-mono">
            Perfect
          </p>
        </div>
      )}
      {otherImages.slice(0, visibleCount).map((image) => (
        <div
          key={image}
          className="rounded-2xl border border-line/70 bg-slate/70 p-4"
        >
          <img
            src={`/test/${image}`}
            alt={image}
            className="h-56 w-full rounded-xl object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
