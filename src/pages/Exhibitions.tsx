import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExhibitionCard } from "../components/exhibition/ExhibitionCard";
import { CategoryFilter } from "../components/product/CategoryFilter";
import { Container } from "../components/ui/Container";
import { GlassPanel } from "../components/ui/GlassPanel";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { usePageMeta } from "../hooks/usePageMeta";
import { upcomingExhibitions } from "../utils/exhibitions";
import { staggeredFadeUp } from "../utils/motion";

export function Exhibitions() {
  usePageMeta("تقویم نمایشگاه‌ها", "تقویم نمایشگاه‌های پیش رو و تجهیز غرفه با مبلمان اجاره‌ای نوین ساز.");
  const [city, setCity] = useState("همه");
  const upcoming = upcomingExhibitions();
  const cities = [...new Set(upcoming.map((exhibition) => exhibition.city))];
  const visible = upcoming.filter((exhibition) => city === "همه" || exhibition.city === city);

  return (
    <Section>
      <Container>
        <SectionTitle
          as="h1"
          title="تقویم نمایشگاه‌ها"
          subtitle="نمایشگاه‌های پیش رو را ببینید و با یک کلیک تاریخ نمایشگاه را در سبد اجاره ثبت کنید."
        />

        <GlassPanel variant="strong" className="mb-8 p-4">
          <CategoryFilter categories={cities} active={city} onChange={setCity} />
        </GlassPanel>

        {visible.length === 0 ? (
          <p className="rounded-lg border border-line bg-paper py-16 text-center text-muted">نمایشگاه پیش رویی در این شهر ثبت نشده است.</p>
        ) : (
          <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((exhibition, index) => (
                <motion.li
                  key={exhibition.id}
                  layout
                  custom={index}
                  variants={staggeredFadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ExhibitionCard exhibition={exhibition} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
        <p className="mt-6 text-center text-caption text-muted">تاریخ‌ها ممکن است از سوی برگزارکننده تغییر کند؛ پیش از سفارش بررسی کنید.</p>
      </Container>
    </Section>
  );
}
