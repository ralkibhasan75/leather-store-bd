"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = ({
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-4 text-left"
      >
        <span className="font-medium text-gray-800">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="text-gray-500" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm text-gray-600">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface AccordionGroup {
  category: string;
  items: {
    question: string;
    answer: string;
  }[];
}

interface AccordionProps {
  data: AccordionGroup[];
}

export default function Accordion({ data }: AccordionProps) {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-10">
      {data.map((group, groupIndex) => (
        <div key={group.category}>
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">
            {group.category}
          </h2>

          <div className="space-y-3">
            {group.items.map((faq, itemIndex) => {
              const key = `${groupIndex}-${itemIndex}`;
              return (
                <AccordionItem
                  key={key}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={!!openItems[key]}
                  onToggle={() => toggleItem(key)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
