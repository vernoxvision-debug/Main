import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface AccordionItem {
  id: string;
  index: string;
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, defaultOpenId, className = '' }) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={`border-t border-[var(--line)] divide-y divide-[var(--line)] ${className}`} data-testid="faq-accordion">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `panel-${item.id}`;
        const headerId = `header-${item.id}`;

        return (
          <div key={item.id} className="transition-colors hover:bg-[var(--line)]/10">
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="w-full py-4 sm:py-5 px-3 sm:px-4 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF5A1F]"
                data-testid={`accordion-trigger-${item.id}`}
              >
                <div className="flex items-start sm:items-center gap-3 sm:gap-5">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold shrink-0 mt-0.5 sm:mt-0">
                    [{item.index}]
                  </span>
                  <span className="font-mono text-sm sm:text-base font-semibold text-[var(--ink)] tracking-tight">
                    {item.question}
                  </span>
                </div>
                <span
                  className="font-mono text-sm sm:text-base text-[var(--ink-muted)] shrink-0 w-6 h-6 flex items-center justify-center border border-[var(--line)] rounded-[2px]"
                  aria-hidden="true"
                >
                  {isOpen ? '—' : '+'}
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-3 sm:px-4 pb-5 pt-1 pl-9 sm:pl-12 font-body text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed max-w-3xl">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
