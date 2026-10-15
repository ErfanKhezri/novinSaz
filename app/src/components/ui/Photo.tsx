import { cn } from "../../lib/cn";

interface PhotoProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** The first-screen picture loads eagerly; everything else lazily. */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

/** A square-cornered photograph on a surface tone while it loads. */
export function Photo({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  imgClassName,
}: PhotoProps) {
  return (
    <div className={cn("overflow-hidden bg-surface-2", className)}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn("size-full object-cover", imgClassName)}
      />
    </div>
  );
}
