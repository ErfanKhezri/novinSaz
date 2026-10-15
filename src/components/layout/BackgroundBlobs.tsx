import { motion } from "motion/react";

const blobs = [
  {
    className: "-right-24 -top-24 h-[22rem] w-[22rem] bg-navy-300 md:h-[36rem] md:w-[36rem]",
    drift: { x: [0, -60, 30, 0], y: [0, 50, 90, 0] },
    duration: 28,
  },
  {
    className: "-left-20 top-1/3 h-[20rem] w-[20rem] bg-gold-200 md:h-[32rem] md:w-[32rem]",
    drift: { x: [0, 70, 20, 0], y: [0, -40, 40, 0] },
    duration: 34,
  },
  {
    className: "bottom-0 right-1/4 h-[18rem] w-[18rem] bg-sky-200 md:h-[30rem] md:w-[30rem]",
    drift: { x: [0, 50, -40, 0], y: [0, -70, -20, 0] },
    duration: 40,
  },
];

export function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas" aria-hidden="true">
      {blobs.map((blob) => (
        <motion.div
          key={blob.duration}
          className={`absolute rounded-full opacity-70 blur-blob ${blob.className}`}
          animate={blob.drift}
          transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
