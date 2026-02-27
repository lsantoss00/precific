import { Variants } from "framer-motion";

const breathingVariants = (delay = 0): Variants => ({
  animate: {
    scale: [1, 1.04, 1],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  },
});

export default breathingVariants;
