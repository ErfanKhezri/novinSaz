import { AnimatePresence, motion } from "motion/react";
import { useLocation, useOutlet } from "react-router-dom";
import { pageFade } from "../../utils/motion";
import { RentalListDrawer } from "../rental/RentalListDrawer";
import { BackgroundBlobs } from "./BackgroundBlobs";
import { FloatingActions } from "./FloatingActions";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollProgress } from "./ScrollProgress";

export function Layout() {
  const { pathname } = useLocation();
  const outlet = useOutlet();

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <BackgroundBlobs />
      <Header />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.main key={pathname} className="flex-1" variants={pageFade} initial="initial" animate="animate" exit="exit">
          {outlet}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingActions />
      <RentalListDrawer />
    </div>
  );
}
