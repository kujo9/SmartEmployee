import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ExpandCard = ({ summary }) => {
  useEffect(() => {
    if (summary) setIsOpen(true);
  }, [summary]);

  const [isOpen, setIsOpen] = useState(!!summary);

  return (
    <motion.div
      layout
      className="card "
      onClick={() => setIsOpen(!isOpen)}
      style={{ borderRadius: "1rem" }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="card-top " layout="position">
        <div className="card-top__header ">
          <h3>Summarize your text.</h3>
        </div>
      </motion.div>

      {isOpen && (
        <motion.div
          className="card-content "
          initial={{ clipPath: "circle(0% at 0 0)" }}
          animate={{ clipPath: "circle(140.9% at 0 0)" }}
          transition={{
            duration: 0.5,
            delay: 0.25,
            type: "spring",
            damping: 25,
            stiffness: 100,
          }}
        >
          <p>{summary}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExpandCard;
