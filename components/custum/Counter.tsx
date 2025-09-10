"use client";
import { useInView } from "motion/react";
import { useRef } from "react";

const Counter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <div ref={ref} className="content-center">
      <span
        className={`flex place-content-center text-xs tabular-nums font-extrabold text-secondary ${
          isInView
            ? "animate-[counter_3s_ease-out_forwards] [counter-set:_num_var(--num)] before:content-[counter(num)] before:left-[calc(0.4em * var(--n, 1))]"
            : "hidden"
        }`}
      >
        {/* <span className="sr-only">0</span> */}
      </span>
    </div>
  );
};
export default Counter;
