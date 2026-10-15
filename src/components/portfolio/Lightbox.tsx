import { useEffect, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import type { Project } from "../../data/projects";
import { formatNumber } from "../../utils/formatPrice";
import { overlayFade, spring } from "../../utils/motion";
import { GlassPanel } from "../ui/GlassPanel";
import { CopyLayoutButton } from "./CopyLayoutButton";
import { ProjectItems } from "./ProjectItems";

type LightboxProps = {
  project: Project;
  startIndex: number;
  onClose: () => void;
};

const SWIPE_DISTANCE = 80;

export function Lightbox({ project, startIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const [direction, setDirection] = useState(1);
  const total = project.images.length;

  const go = (step: number) => {
    setDirection(step);
    setIndex((current) => (current + step + total) % total);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      // Right-to-left: the left arrow moves forward.
      if (event.key === "ArrowLeft") go(1);
      if (event.key === "ArrowRight") go(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  });

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_DISTANCE) go(1);
    else if (info.offset.x < -SWIPE_DISTANCE) go(-1);
  };

  const arrow = "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/80 text-h3 text-navy-900 transition hover:bg-paper";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={project.title}>
      <motion.div className="absolute inset-0 bg-navy-900/60" variants={overlayFade} initial="hidden" animate="visible" exit="exit" onClick={onClose} />
      <GlassPanel
        variant="strong"
        className="relative flex max-h-full w-full max-w-5xl flex-col gap-4 overflow-y-auto p-3 sm:p-5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1, transition: spring }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-h3 font-extrabold text-navy-900">{project.title}</h2>
            <p className="text-small text-muted">
              {project.exhibitionName} · {project.year}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/60 bg-white/60"
            aria-label="بستن"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-navy-900" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="relative h-[55vh] max-h-[36rem] overflow-hidden rounded bg-navy-50">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={index}
              src={project.images[index]}
              alt={`${project.title}، تصویر ${formatNumber(index + 1)}`}
              className="h-full w-full cursor-grab touch-pan-y select-none object-contain active:cursor-grabbing"
              draggable={false}
              drag={total > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={handleDragEnd}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -80 }}
              transition={{ duration: 0.25 }}
            />
          </AnimatePresence>
          {total > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} className={`${arrow} right-3`} aria-label="تصویر قبلی">
                ›
              </button>
              <button type="button" onClick={() => go(1)} className={`${arrow} left-3`} aria-label="تصویر بعدی">
                ‹
              </button>
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-navy-900/80 px-3 py-1 text-caption text-paper">
                {formatNumber(index + 1)} از {formatNumber(total)}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="mb-2 text-small font-bold text-navy-900">اقلام استفاده‌شده در این چیدمان</h3>
            <ProjectItems project={project} />
          </div>
          <CopyLayoutButton project={project} className="shrink-0" />
        </div>
      </GlassPanel>
    </div>
  );
}
