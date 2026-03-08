/**
 * SplashScreen Component
 * Design: Royal Blue background with Noble Gold gothic text "Dr Ian Zhu"
 * Using the exact splash text image for perfect font matching
 * Animation: Fade out after loading complete
 */

import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "#141E30" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2.5, ease: "easeOut" }}
      onAnimationComplete={onComplete}
    >
      <motion.img
        src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/vrIOKKTkbLudzqPK.png"
        alt="Dr Ian Zhu"
        className="max-w-[80%] md:max-w-[60%] lg:max-w-[50%] h-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      />
    </motion.div>
  );
}
