type SectionTitleProps = {
  title: string;
  subtitle?: string;
  as?: "h1" | "h2";
};

export function SectionTitle({ title, subtitle, as: Heading = "h2" }: SectionTitleProps) {
  return (
    <div className="mx-auto mb-10 max-w-prose text-center">
      <Heading className="text-h2 font-extrabold tracking-tight text-navy-900 sm:text-h1">{title}</Heading>
      {subtitle && <p className="mt-3 text-lead text-muted">{subtitle}</p>}
    </div>
  );
}
