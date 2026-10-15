import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { categories, products } from "../../data/products";
import { site } from "../../data/site";
import { useCart } from "../../hooks/useCart";
import { formatNumber } from "../../utils/formatPrice";
import { whatsappLink } from "../../utils/whatsapp";
import { AnimatedNumber } from "../ui/AnimatedNumber";
import { Button, ButtonLink } from "../ui/Button";
import { Container } from "../ui/Container";
import { GlassPanel } from "../ui/GlassPanel";
import { BoothScene } from "./BoothScene";
import { RotatingWord } from "./RotatingWord";

const headline = ["غرفه‌ای", "آماده", "برای"];

const bestSaving = Math.max(
  ...products.map((product) => Math.round((1 - product.pricePer4Days / (product.pricePerDay * 4)) * 100)),
);
const cheapest = Math.min(...products.map((product) => product.pricePerDay));

const stats = [
  { value: products.length, suffix: "+", label: "محصول آماده اجاره" },
  { value: categories.length, suffix: "", label: "دسته‌بندی" },
  { value: bestSaving, suffix: "٪", label: "صرفه‌جویی بسته ۴ روزه" },
];

const floatingChips = [
  { text: "تحویل و چیدمان در غرفه", className: "right-0 top-6", delay: 1.6 },
  { text: `صندلی از ${formatNumber(cheapest)} تومان`, className: "left-0 top-0", delay: 1.9 },
  { text: "بسته ۴ روزه = قیمت ۳ روز", className: "bottom-6 right-1/4", delay: 2.2 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { openDrawer } = useCart();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 60, damping: 15 });
  const pointerY = useSpring(rawY, { stiffness: 60, damping: 15 });
  const rotateY = useTransform(pointerX, (v) => v * 10);
  const rotateX = useTransform(pointerY, (v) => v * -8);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handlePointerMove = (event: PointerEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - rect.left) / rect.width - 0.5);
    rawY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
      className="relative overflow-hidden pb-section-sm pt-10 sm:pt-16"
    >
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div style={{ opacity: textOpacity }} className="text-center lg:text-start">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-1.5 text-small font-medium text-navy-900 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
            </span>
            اجاره روزانه و چهار روزه در {site.city}
          </motion.p>

          <h1 className="text-h1 font-extrabold leading-tight tracking-tight text-navy-900 sm:text-display sm:leading-tight">
            {headline.map((word, index) => (
              <motion.span
                key={word}
                className="me-3 inline-block"
                initial={{ opacity: 0, y: 40, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.1 + index * 0.12 }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            <RotatingWord words={["نمایشگاه", "شوروم", "اتاق جلسه", "همایش"]} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mx-auto mt-6 max-w-prose text-lead text-muted lg:mx-0"
          >
            کانتر، صندلی جکدار، مبل نیم‌ست، تلویزیون و پاراوان را بدون خرید و نگهداری اجاره کنید. ما
            می‌آوریم، می‌چینیم و بعد از رویداد جمع می‌کنیم.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <ButtonLink to="/products" variant="primary" className="group">
              مشاهده محصولات
              <span className="transition-transform group-hover:-translate-x-1" aria-hidden="true">
                ←
              </span>
            </ButtonLink>
            <Button variant="outline" onClick={openDrawer}>
              سبد اجاره
            </Button>
            <a
              href={whatsappLink(`سلام ${site.name}، برای اجاره مبلمان غرفه راهنمایی می‌خواهم.`)}
              target="_blank"
              rel="noreferrer"
              className="self-center px-2 py-3 font-bold text-navy-900 underline-offset-8 hover:underline"
            >
              مشاوره رایگان
            </a>
          </motion.div>

          <dl className="mt-10 grid grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <GlassPanel
                key={stat.label}
                variant="strong"
                className="p-3 sm:p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <dd className="text-h2 font-extrabold text-navy-900">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="text-caption text-muted sm:text-small">{stat.label}</dt>
              </GlassPanel>
            ))}
          </dl>
        </motion.div>

        <motion.div style={{ y: sceneY }} className="relative order-first mx-auto w-full max-w-sm [perspective:1200px] lg:order-none lg:max-w-none">
          <motion.div
            style={{ rotateX, rotateY }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <BoothScene pointerX={pointerX} pointerY={pointerY} />
          </motion.div>

          {floatingChips.map((chip, index) => (
            <GlassPanel
              key={chip.text}
              variant="strong"
              className={`absolute hidden px-4 py-2 text-small font-bold text-navy-900 sm:block ${chip.className}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, index % 2 ? 8 : -8, 0] }}
              transition={{
                opacity: { delay: chip.delay },
                scale: { delay: chip.delay, type: "spring" },
                y: { delay: chip.delay, duration: 4 + index, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              {chip.text}
            </GlassPanel>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
