"use client";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  show: boolean;
}

export default function MainHeading({ show }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: "10%" }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text_styles md:mx-[20%] mx-4 md:mt-20 mt-4">
            Discover over 2,000,000 free Stock Images
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
