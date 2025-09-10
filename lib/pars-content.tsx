"use client";
import { motion, useScroll, useSpring } from "motion/react";
import parse, {
  HTMLReactParserOptions,
  Element,
  attributesToProps,
} from "html-react-parser";
import Image from "next/image";
import { useRef, useState } from "react";
export default function ContentParsed({ content }: any) {
  const [position, setPosition] = useState({
    left: 0,
    opacity: 0,
    width: 0,
  });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const handleClick = (target: string) => {
    const btns = document.querySelectorAll(".tab-button");
    const tabs = document.querySelectorAll(".tab-content");
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    const activeTab = document.getElementById(target);

    if (activeTab) {
      activeTab.classList.add("active");
    }
  };
  const options: HTMLReactParserOptions = {
    trim: true,

    replace: (domNode) => {
      const typedDomNode = domNode as Element;

      if (typedDomNode.attribs && typedDomNode.name === "img") {
        return (
          <Image
            {...attributesToProps(typedDomNode.attribs)}
            src={typedDomNode.attribs.src ?? "/placeholder.svg"}
            width={Number(typedDomNode.attribs.width)}
            height={Number(typedDomNode.attribs.height)}
            alt={typedDomNode.attribs.alt ?? ""}
            priority
            className="transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0 shadow-lg mx-auto"
          />
        );
      }
      if (typedDomNode.attribs && typedDomNode.name === "button") {
        return (
          <div
            onMouseLeave={() =>
              setPosition((prev) => ({ ...prev, opacity: 0 }))
            }
            className="flex mx-0.5 text-white place-content-center overflow-hidden "
          >
            <TabsHeader position={setPosition}>
              <button
                {...attributesToProps(typedDomNode.attribs)}
                onClick={() => handleClick(typedDomNode.attribs.name)}
                className="block md:mx-1 rounded-full z-10 text-white text-xs md:text-base  overflow-hidden "
                type="button"
              >
                {(typedDomNode.children[0] as any).data}
              </button>
            </TabsHeader>
            <Curseur position={position} />
          </div>
        );
      }

      return false;
    },
  };

  if (!content)
    return (
      <div
        dir="ltr"
        className="flex mt-14 h-full text-center justify-center text-3xl text-red-500"
      >
        Page en cours de constuction!
      </div>
    );
  return (
    <div >
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          background: "#ff0088",
          zIndex: 50,
        }}
      />

      <div >
        {parse(content, options)}
      </div>
    </div>
  );
}
const Curseur = ({ position }: any) => {
  return (
    <motion.div
      animate={position}
      className="absolute bg-black h-6 md:h-9 rounded-full z-0 "
    />
  );
};

const TabsHeader = ({
  children,
  position,
}: Readonly<{ children: React.ReactNode; position: any }>) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        position({ left: ref.current.offsetLeft, width, opacity: 1 });
      }}
      className="block z-10 cursor-pointer px-1 text-xs text-white mix-blend-difference py-1.5 md:px-2 md:text-base"
    >
      {children}
    </div>
  );
};
