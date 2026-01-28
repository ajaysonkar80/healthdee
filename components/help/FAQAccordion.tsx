"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Item {
  question: string;
  answer: string;
}

export default function FAQAccordion({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white rounded-xl divide-y">
      {items.map((item, index) => {
        const open = openIndex === index;

        return (
          <div key={index} className="p-6">
            <button
              className="w-full flex items-center justify-between text-left"
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span
                className={`font-medium ${
                  open ? "text-pink-500" : "text-gray-900"
                }`}
              >
                {item.question}
              </span>
              <ChevronDown
                className={`transition-transform ${
                  open ? "rotate-180 text-pink-500" : ""
                }`}
              />
            </button>

            {open && (
              <p className="mt-4 text-sm text-gray-500">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
