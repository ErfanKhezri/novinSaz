import "@google/model-viewer";
import { useReducedMotion } from "motion/react";

type ModelViewerProps = { src: string; alt: string; poster: string };

/** Loaded lazily from the product page so the 3D library only downloads when this tab opens. */
export function ModelViewer({ src, alt, poster }: ModelViewerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <model-viewer
      src={src}
      alt={alt}
      poster={poster}
      camera-controls
      auto-rotate={reduceMotion ? undefined : true}
      ar
      ar-modes="webxr scene-viewer quick-look"
      shadow-intensity="1"
      touch-action="pan-y"
      class="block aspect-[4/3] h-auto w-full rounded-lg border border-line bg-navy-50"
    >
      <span slot="ar-button" className="absolute bottom-3 right-3 rounded bg-navy-900 px-4 py-2 text-small font-bold text-paper">
        مشاهده در فضای شما (AR)
      </span>
    </model-viewer>
  );
}
