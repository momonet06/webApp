"use client";
import parse, {
  HTMLReactParserOptions,
  Element,
  attributesToProps,
} from "html-react-parser";
import Image from "next/image";
export default function ContentParsed({ content }: any) {
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
            alt={typedDomNode.attribs.alt}
            priority
            className="transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0 shadow-lg mx-auto"
          />
        );
      }
      if (typedDomNode.attribs && typedDomNode.name === "button") {
        return (
          <button
            {...attributesToProps(typedDomNode.attribs)}
            onClick={() => handleClick(typedDomNode.attribs.name)}
            className="tab-button active:text-blue-700 focus:text-blue-700"
            type="button"
            title="tabmenu"
          >
            {(typedDomNode.children[0] as any).data}
          </button>
        );
      }

      return false;
    },
  };

  if (!content)
    return (
 
      <div
        dir="ltr"
        className="flex mt-14 h-full text-center justify-center text-3xl text-red-700"
      >
        Page en cours de constuction!
      </div>
    );
  return (
    <section className="my-0 mt-1 p-0 pb-0 pt-2 backdrop:mx-[0.5px] sm:mx-4 contenu">
      {parse(content, options)}
    </section>
  );
}
