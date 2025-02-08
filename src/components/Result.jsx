import { motion } from "framer-motion";
import { useState, useEffect } from "react";
export default function Result({ years, months, days, result, delay }) {
  const [animationKey, setAnimationKey] = useState(0);
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [years, months, days, result]);

  return (
    <motion.p
      className='text-[40px] leading-11 md:text-6xl md:leading-18'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      {result ? (
        <motion.span
          key={animationKey}
          className='text-purple inline-block mr-2'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay }}
        >
          {result}{" "}
        </motion.span>
      ) : (
        <span className='text-purple mr-2'>--</span>
      )}

      {years ? "years" : months ? "months" : days ? "days" : ""}
    </motion.p>
  );
}
