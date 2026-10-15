import { motion } from "motion/react";
import { PackageCard } from "../components/package/PackageCard";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { packages } from "../data/packages";
import { usePageMeta } from "../hooks/usePageMeta";
import { staggeredFadeUp } from "../utils/motion";

export function Packages() {
  usePageMeta("پکیج‌های آماده", "پکیج‌های آماده غرفه و اتاق جلسه نوین ساز با تخفیف نسبت به اجاره تکی محصولات.");

  return (
    <Section>
      <Container>
        <SectionTitle
          as="h1"
          title="پکیج‌های آماده"
          subtitle="محصولاتی که معمولاً با هم اجاره می‌شوند، یکجا و با تخفیف. تخفیف پکیج در سبد اجاره اعمال می‌شود."
        />
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {packages.map((pack, index) => (
            <motion.li key={pack.id} custom={index} variants={staggeredFadeUp} initial="hidden" animate="visible">
              <PackageCard pack={pack} />
            </motion.li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
