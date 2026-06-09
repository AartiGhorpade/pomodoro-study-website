"use client";

import { useQuotes } from "@/app/store/useAppStore";
import { Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

const Page = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const nodeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const getQuote = async () => {
      const res = await fetch("/api/quotes");
      const data = await res.json();

      setQuote(data.q);
      setAuthor(data.a);
    };

    getQuote();
  }, []);

  const toggleQuotesBox = useQuotes((state) => state.toggleQuotesBox);
  const isQuotesBoxOpen = useQuotes((state) => state.isQuotesBoxOpen);

  return (
    isQuotesBoxOpen && (
      <div>
        <Draggable nodeRef={nodeRef} bounds="body">
          <section
            ref={nodeRef}
            className="absolute lg:top-14 top-10 sm:top-0 md:top-5 right-5 lg:right-50 z-60"
          >
            <span
              className="text-red-400 absolute top-3 right-5 z-50 font-bold cursor-pointer"
              onClick={() => toggleQuotesBox()}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleQuotesBox();
              }}
            >
              X
            </span>
            <div className="w-auto bg-black/60 backdrop-blur-md border border-white/10 p-4 shadow-2xl cursor-move">
              <Quote className="w-5 h-5 text-gray-400 mb-3" />

              <blockquote className="text-md font-medium leading-relaxed text-wrap w-[300px]">
                "{quote}"
              </blockquote>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-700" />
                <p className="text-gray-400 text-sm font-semibold">{author}</p>
              </div>
            </div>
          </section>
        </Draggable>
      </div>
    )
  );
};

export default Page;
