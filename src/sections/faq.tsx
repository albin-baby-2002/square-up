"use client";
import { FaqItem } from "@/components/faq-item";
import SectionHeader from "@/components/section-header";
import React, { useState } from "react";

const FAQS = [
  {
    id: 1,
    question: "What services does SquareIt provide?",
    answer:
      "SquareIt offers a range of services including design, engineering, and project management. We specialize in user experience design, web development, mobile app development, custom software development, branding and identity, and more.",
  },
  {
    id: 2,
    question: "How can SquareIt help my business?",
    answer:
      "SquareIt helps businesses by creating tailored digital solutions that improve efficiency, enhance user experience, and boost growth. Whether it’s a website, app, or custom software, we align technology with your business goals.",
  },
  {
    id: 3,
    question: "What industries does SquareIt work with?",
    answer:
      "SquareIt works with a wide variety of industries including retail, e-commerce, healthcare, real estate, fitness, food delivery, event management, and technology. Our adaptable approach ensures solutions that fit any sector.",
  },
  {
    id: 4,
    question: "How long does it take to complete a project with SquareIt?",
    answer:
      "The timeline depends on the project’s scope and complexity. Smaller projects may take a few weeks, while larger custom solutions can take several months. We work closely with clients to set clear timelines and milestones.",
  },
  {
    id: 5,
    question:
      "Do you offer ongoing support and maintenance after the project is completed?",
    answer:
      "Yes, SquareIt provides ongoing support and maintenance to ensure your digital solution continues to perform at its best. This includes updates, bug fixes, feature enhancements, and technical assistance.",
  },
  {
    id: 6,
    question: "Can you work with existing design or development frameworks?",
    answer:
      "Absolutely. Our team is experienced with a wide range of frameworks and technologies. We can integrate with your existing systems or build upon them to enhance functionality.",
  },
  {
    id: 7,
    question: "How involved will I be in the project development process?",
    answer:
      "We believe in collaboration. Clients are involved throughout the process—from initial planning and design reviews to development updates and final delivery. Your feedback ensures the solution meets your expectations.",
  },
  {
    id: 8,
    question: "Can you help with website or app maintenance and updates?",
    answer:
      "Yes, SquareIt offers comprehensive maintenance and update services. We ensure your website or app stays secure, up-to-date, and optimized for performance and user experience.",
  },
];

const Faq = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div id="faq" className="border-gray-15">
      <SectionHeader
        heading="Frequently Asked Questions"
        description="Still you have any questions? Contact our Team via hello@squareup.com"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 align-top">
        <div className="flex flex-col lg:border-r border-gray-15">
          {FAQS.map((faq) => {
            if (faq.id > 4) return null;
            return (
              <FaqItem
                key={faq.id}
                number={faq.id}
                title={faq.question}
                description={faq.answer}
                isOpen={openFaq === faq.id}
                onToggle={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              />
            );
          })}
        </div>

        <div className="flex flex-col">
          {FAQS.map((faq) => {
            if (faq.id <= 4) return null;
            return (
              <FaqItem
                key={faq.id}
                number={faq.id}
                title={faq.question}
                description={faq.answer}
                isOpen={openFaq === faq.id}
                onToggle={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faq;
