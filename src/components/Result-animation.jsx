

import { motion } from "framer-motion";

export default function resultAnimation(result, delay) {
  return (
    <motion.span
      className='text-purple inline-block mr-2'
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      {result}
      {""}
    </motion.span>
  );
}