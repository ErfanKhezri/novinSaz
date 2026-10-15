import { site } from "../../data/site";

type LogoProps = {
  /** "dark" on light backgrounds, "light" on navy backgrounds. */
  tone?: "dark" | "light";
  showTagline?: boolean;
  className?: string;
};

/**
 * The mark is the letter «ن» drawn as a booth seen from the front:
 * two walls and the floor form the bowl, the hanging sign is the dot.
 */
export function LogoMark({ tone = "dark", className = "h-9 w-9" }: Pick<LogoProps, "tone" | "className">) {
  return (
    <svg viewBox="0 0 48 48" className={`shrink-0 ${className}`} aria-hidden="true">
      <rect width="48" height="48" rx="12" className={tone === "dark" ? "fill-navy-900" : "fill-paper"} />
      <path
        d="M10.5 15v9.5a13.5 11.5 0 0 0 27 0V15"
        fill="none"
        className={tone === "dark" ? "stroke-paper" : "stroke-navy-900"}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <rect x="20.5" y="12.5" width="7" height="7" rx="1.6" className={tone === "dark" ? "fill-accent-200" : "fill-accent-500"} />
    </svg>
  );
}

export function Logo({ tone = "dark", showTagline = false, className = "" }: LogoProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark tone={tone} />
      <span className="flex flex-col leading-none">
        <span className={`text-h3 font-extrabold tracking-tight ${tone === "dark" ? "text-navy-900" : "text-paper"}`}>{site.name}</span>
        {showTagline && (
          <span className={`mt-1 text-caption ${tone === "dark" ? "text-muted" : "text-navy-100"}`}>اجاره مبلمان نمایشگاهی</span>
        )}
      </span>
    </span>
  );
}
