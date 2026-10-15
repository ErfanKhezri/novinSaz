const paths: Record<string, string> = {
  "صندلی": "M7 3v9h10V3M7 12v9M17 12v9M5 12h14",
  "میز": "M3 8h18M6 8v12M18 8v12M9 8v5h6V8",
  "مبلمان": "M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M3 11h18v6H3zM5 17v3M19 17v3",
  "تجهیزات صوتی‌تصویری": "M3 5h18v11H3zM8 20h8M12 16v4",
  "پاراوان": "M4 4l4 1v15l-4-1zM8 5h8v15H8zM16 5l4-1v15l-4 1z",
};

export function CategoryIcon({ category }: { category: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[category]} />
    </svg>
  );
}
