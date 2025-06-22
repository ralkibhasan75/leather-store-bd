// components/ui/ShimmerImage.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

export default function ShimmerImage({
  src,
  alt,
  width,
  height,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden rounded" style={{ width, height }}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${
          loaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
