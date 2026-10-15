import { motion, useTransform, type MotionValue, type Variants } from "motion/react";

const drop: Variants = {
  hidden: { opacity: 0, y: -70 },
  visible: (order: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14, delay: 0.3 + order * 0.18 },
  }),
};

type BoothSceneProps = {
  /** Pointer position from -0.5 to 0.5, smoothed by a spring. */
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
};

/** An exhibition booth that assembles itself piece by piece; layers shift with the pointer for depth. */
export function BoothScene({ pointerX, pointerY }: BoothSceneProps) {
  const backX = useTransform(pointerX, (v) => v * -12);
  const backY = useTransform(pointerY, (v) => v * -8);
  const frontX = useTransform(pointerX, (v) => v * 22);
  const frontY = useTransform(pointerY, (v) => v * 14);

  return (
    <svg viewBox="0 0 520 440" className="h-auto w-full overflow-visible" role="img" aria-label="غرفه نمایشگاهی چیده شده با کانتر، صندلی جکدار، تلویزیون، پاراوان و میز">
      <motion.g initial="hidden" animate="visible">
        {/* floor */}
        <motion.path variants={drop} custom={0} d="M40 330 L260 250 L500 330 L280 420 Z" className="fill-navy-100" />
        <motion.path variants={drop} custom={0} d="M40 330 L280 420 L280 432 L40 342 Z" className="fill-navy-300" />
        <motion.path variants={drop} custom={0} d="M280 420 L500 330 L500 342 L280 432 Z" className="fill-navy-700" />

        <motion.g style={{ x: backX, y: backY }}>
          {/* back walls */}
          <motion.g variants={drop} custom={1}>
            <path d="M40 330 L40 110 L260 40 L260 250 Z" className="fill-paper" />
            <path d="M260 40 L500 110 L500 330 L260 250 Z" className="fill-navy-900" />
            <path d="M40 110 L260 40 L260 58 L40 128 Z" className="fill-gold-500" />
          </motion.g>
          {/* logo on the dark wall */}
          <motion.g variants={drop} custom={2}>
            <path d="M300 92 L460 140 L460 176 L300 128 Z" className="fill-gold-500" />
            <path d="M318 112 L410 140" className="stroke-navy-900" strokeWidth="6" strokeLinecap="round" />
          </motion.g>
          {/* television */}
          <motion.g variants={drop} custom={3}>
            <path d="M90 140 L210 102 L210 182 L90 220 Z" className="fill-navy-900" />
            <path d="M98 146 L202 113 L202 177 L98 210 Z" className="fill-navy-700" />
            <motion.path
              d="M98 146 L202 113 L202 177 L98 210 Z"
              className="fill-sky-200"
              animate={{ opacity: [0.15, 0.45, 0.15] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <path d="M140 150 L166 158 L140 176 Z" className="fill-paper" />
            <path d="M148 214 L148 240" className="stroke-navy-900" strokeWidth="5" />
          </motion.g>
        </motion.g>

        <motion.g style={{ x: frontX, y: frontY }}>
          {/* partition */}
          <motion.g variants={drop} custom={4}>
            <path d="M420 200 L460 214 L460 330 L420 316 Z" className="fill-paper" />
            <path d="M460 214 L486 206 L486 322 L460 330 Z" className="fill-navy-100" />
            <path d="M380 210 L420 200 L420 316 L380 326 Z" className="fill-navy-100" />
          </motion.g>
          {/* counter */}
          <motion.g variants={drop} custom={5}>
            <path d="M200 268 L330 300 L330 380 L200 348 Z" className="fill-paper" />
            <path d="M330 300 L372 286 L372 366 L330 380 Z" className="fill-navy-100" />
            <path d="M200 268 L242 254 L372 286 L330 300 Z" className="fill-navy-900" />
            <path d="M218 292 L312 315 L312 356 L218 333 Z" className="fill-gold-500" />
            <path d="M236 310 L290 323" className="stroke-navy-900" strokeWidth="5" strokeLinecap="round" />
          </motion.g>
          {/* bar stools */}
          {[0, 1].map((index) => (
            <motion.g key={index} variants={drop} custom={6 + index} transform={`translate(${index * 52} ${index * 14})`}>
              <path d="M392 330 L392 380" className="stroke-navy-700" strokeWidth="5" />
              <ellipse cx="392" cy="384" rx="18" ry="6" className="fill-navy-700" />
              <ellipse cx="392" cy="328" rx="20" ry="7" className="fill-navy-900" />
              <path d="M376 326 L378 296 Q392 290 406 296 L408 326 Z" className="fill-navy-900" />
              <path d="M380 304 Q392 299 404 304 L404 312 Q392 307 380 312 Z" className="fill-gold-500" />
            </motion.g>
          ))}
          {/* round table and chairs */}
          <motion.g variants={drop} custom={8}>
            <path d="M122 330 L122 376" className="stroke-navy-300" strokeWidth="5" />
            <ellipse cx="122" cy="378" rx="22" ry="7" className="fill-navy-300" />
            <ellipse cx="122" cy="328" rx="44" ry="13" className="fill-sky-200" />
            <path d="M70 344 Q72 318 90 316 L94 352 Z" className="fill-paper" />
            <path d="M174 344 Q172 318 154 316 L150 352 Z" className="fill-paper" />
          </motion.g>
        </motion.g>
      </motion.g>
    </svg>
  );
}
