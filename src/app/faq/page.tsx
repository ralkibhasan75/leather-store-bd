"use client";

import { useState } from "react";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const groupedFaqs = [
  {
    category: "Product Info",
    items: [
      {
        question: "Are your products made from real leather?",
        answer:
          "Yes! We use 100% genuine full-grain leather in all our products.",
      },
      {
        question: "What do you sell?",
        answer:
          "Long wallets, short wallets, belts, bags, gift items, and more — all handmade with care.",
      },
      {
        question: "Can I customize my product?",
        answer:
          "Yes! Add your name or initials — a perfect touch for gifts or personal use.",
      },
    ],
  },
  {
    category: "Delivery & Warranty",
    items: [
      {
        question: "Is there any warranty or guarantee?",
        answer:
          "Yes! We offer a quality guarantee and limited-time warranty on selected products.",
      },
      {
        question: "How long does delivery take?",
        answer: "Inside Dhaka: 1–2 days. Outside Dhaka: 3–4 days.",
      },
    ],
  },
  {
    category: "Payment & Support",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "Cash on delivery, bKash, Nagad, Rocket, and Bank transfer — all supported.",
      },
      {
        question: "What if I get the wrong or damaged item?",
        answer:
          "No worries! We offer easy return or exchange. Just contact our support team.",
      },
      {
        question: "How do I order?",
        answer:
          "Just click “Buy Now” on our website or message us on Facebook or WhatsApp.",
      },
    ],
  },
];

const banglaFaqs = [
  {
    question: "১. আপনার পণ্যগুলো কি আসল চামড়ার তৈরি?",
    answer: "হ্যাঁ! আমাদের সব পণ্য ১০০% জেনুইন ফুল-গ্রেইন লেদার দিয়ে তৈরি।",
  },
  {
    question: "২. আপনি কী কী পণ্য বিক্রি করেন?",
    answer: "ওয়ালেট, বেল্ট, ব্যাগ, গিফট আইটেম ও অন্যান্য চামড়ার এক্সেসরিজ।",
  },
  {
    question: "৪. ওয়ারেন্টি বা গ্যারান্টি আছে কি?",
    answer:
      "অবশ্যই! প্রতিটি পণ্যে মানের গ্যারান্টি রয়েছে এবং কিছু প্রোডাক্টে নির্দিষ্ট মেয়াদের ওয়ারেন্টি দেওয়া হয়।",
  },
  {
    question: "৫. ভুল বা ক্ষতিগ্রস্ত পণ্য পেলে কী হবে?",
    answer:
      "দুশ্চিন্তার কিছু নেই! আমরা সহজ রিটার্ন/এক্সচেঞ্জ সুবিধা দেই — শুধু আমাদের সাথে যোগাযোগ করুন।",
  },
  {
    question: "৬. ডেলিভারি পেতে কত সময় লাগে?",
    answer: "ঢাকার মধ্যে: ১–২ কর্মদিবস, ঢাকার বাইরে: ৩–৪ কর্মদিবস।",
  },
];

const AccordionItem = ({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div
    onClick={onToggle}
    className="border border-gray-300 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition"
  >
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-lg text-gray-800">{faq.question}</h3>
      <FaChevronDown
        className={`transition-transform duration-300 ${
          isOpen ? "rotate-180 text-brand" : "text-gray-500"
        }`}
      />
    </div>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="pt-2 text-gray-600 text-sm"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="font-bold">{faq.answer}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const [expandAll, setExpandAll] = useState(false);
  const [openBnIndex, setOpenBnIndex] = useState<number | null>(null);

  const toggleAll = () => {
    const newState: { [key: string]: boolean } = {};
    groupedFaqs.forEach((group) =>
      group.items.forEach((item) => {
        newState[item.question] = !expandAll;
      })
    );
    setOpenItems(newState);
    setExpandAll((prev) => !prev);
  };

  const handleToggle = (question: string) => {
    setOpenItems((prev) => ({ ...prev, [question]: !prev[question] }));
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groupedFaqs.flatMap((group) =>
      group.items.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      }))
    ),
  };

  return (
    <>
      <Head>
        <title>FAQs | Leather Store BD</title>
        <meta
          name="description"
          content="Frequently Asked Questions about our leather products, delivery, payment, customization and more."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
      </Head>

      <main className="max-w-5xl mx-auto px-6 py-20 space-y-20">
        {/* Page Heading */}
        <section className="text-center">
          <div className="flex justify-center items-center gap-3 text-4xl text-[var(--color-brand)] mb-4">
            <FaQuestionCircle />
            <h1 className="font-serif font-bold text-4xl md:text-5xl">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-gray-600 max-w-xl mx-auto text-base">
            Have a question? Check our most asked queries and answers below.
          </p>
          <button
            onClick={toggleAll}
            className="mt-6 bg-gray-100 text-sm px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            {expandAll ? "Collapse All" : "Expand All"}
          </button>
        </section>

        {/* English Grouped FAQ */}
        <section className="space-y-12">
          {groupedFaqs.map((group) => (
            <div key={group.category}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {group.category}
              </h2>
              <div className="space-y-4">
                {group.items.map((faq) => (
                  <AccordionItem
                    key={faq.question}
                    faq={faq}
                    isOpen={openItems[faq.question] || false}
                    onToggle={() => handleToggle(faq.question)}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Bangla FAQ Section */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-center mt-16 mb-6">
            সাধারণ প্রশ্নোত্তর (বাংলা)
          </h2>
          <div className="space-y-4">
            {banglaFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                faq={faq}
                isOpen={openBnIndex === index}
                onToggle={() =>
                  setOpenBnIndex(openBnIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
