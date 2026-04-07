import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQAccordion = ({ faqs }) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="bg-white rounded-lg shadow-lg border border-neutral-200"
        >
          <button
            onClick={() => toggleItem(faq.id)}
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-neutral-50 transition-colors rounded-lg"
          >
            <span className="font-semibold text-black">
              {faq.question}
            </span>
            {openItems.has(faq.id) ? (
              <ChevronUp className="text-primary-600 flex-shrink-0" size={20} />
            ) : (
              <ChevronDown className="text-primary-600 flex-shrink-0" size={20} />
            )}
          </button>

          {openItems.has(faq.id) && (
            <div className="px-6 pb-4">
              <p className="text-neutral-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
