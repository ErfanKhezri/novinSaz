import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CopyLayoutButton } from "../components/portfolio/CopyLayoutButton";
import { Lightbox } from "../components/portfolio/Lightbox";
import { ProjectItems } from "../components/portfolio/ProjectItems";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { projects, type Project } from "../data/projects";
import { usePageMeta } from "../hooks/usePageMeta";
import { formatNumber } from "../utils/formatPrice";
import { staggeredFadeUp } from "../utils/motion";

export function Portfolio() {
  usePageMeta("نمونه‌کارها", "نمونه غرفه‌ها و رویدادهایی که با مبلمان اجاره‌ای نوین ساز چیده شده‌اند.");
  const [open, setOpen] = useState<{ project: Project; index: number } | null>(null);

  return (
    <>
      <Section>
        <Container>
          <SectionTitle
            as="h1"
            title="نمونه‌کارها"
            subtitle="غرفه‌ها و رویدادهایی که چیده‌ایم. روی تصویر بزنید تا بزرگ‌تر ببینید؛ هر چیدمانی را پسندیدید، با یک کلیک به سبد اضافه کنید."
          />

          <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {projects.map((project, index) => (
              <motion.li
                key={project.id}
                custom={index}
                variants={staggeredFadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="mb-5 break-inside-avoid rounded-lg border border-line bg-paper p-2"
              >
                <button
                  type="button"
                  onClick={() => setOpen({ project, index: 0 })}
                  className="group relative block w-full overflow-hidden rounded"
                  aria-label={`مشاهده تصاویر ${project.title}`}
                >
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    loading="lazy"
                    className="min-h-48 w-full bg-navy-50 transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-2 left-2 rounded-full bg-navy-900/80 px-3 py-1 text-caption text-paper">
                    {formatNumber(project.images.length)} تصویر
                  </span>
                </button>
                <div className="flex flex-col gap-3 p-3">
                  <div>
                    <h2 className="text-h3 font-extrabold text-navy-900">{project.title}</h2>
                    <p className="text-small text-muted">
                      {project.exhibitionName} · {project.year}
                    </p>
                  </div>
                  <ProjectItems project={project} />
                  <CopyLayoutButton project={project} className="min-h-10 text-small" />
                </div>
              </motion.li>
            ))}
          </ul>
        </Container>
      </Section>

      <AnimatePresence>
        {open && <Lightbox key={open.project.id} project={open.project} startIndex={open.index} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}
