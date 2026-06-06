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
          <div ref={nodeRef} className="absolute top-0 left-90 z-20">
            <span
              className="text-red-400 absolute top-3 right-5 z-50 font-bold cursor-pointer"
              onClick={() => toggleQuotesBox()}
            >
              X
            </span>
            <div className="w-auto bg-black/60 backdrop-blur-md border border-white/10 p-4 shadow-2xl cursor-move">
              <Quote className="w-5 h-5 text-gray-400 mb-3" />

              <blockquote className="text-md font-medium leading-relaxed">
                "{quote}"
              </blockquote>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-700" />
                <p className="text-gray-400 text-sm font-semibold">{author}</p>
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    )
  );
};

export default Page;
