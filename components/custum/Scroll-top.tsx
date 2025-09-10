"use client";
import { ChevronUpCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);
  const isBrowser = () => typeof window !== "undefined";
  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight * 0.25) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <button
      title="Go to top"
      className={`text-white flex fixed bottom-1 right-2 bg-cyan-700 p-[1px] rounded-full z-50 scroll-btn  ${
        isVisible ? "visible" : ""
      } `}
      onClick={scrollToTop}
    >
      <ChevronUpCircleIcon className="block h-10 w-10" />
    </button>
  );
}
