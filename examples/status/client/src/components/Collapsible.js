import { forwardRef } from "@chakra-ui/react";
import { createElement, useLayoutEffect, useRef, useState } from "react";

export const Collapsible = forwardRef(
    ({ collapsed, as = "div", ...props }, outerRef) => {
      const ref = useRef(outerRef);
      const [height, setHeight] = useState(collapsed ? 0 : undefined);
  
      useLayoutEffect(() => {
        if (ref.current === null) {
          return;
        }
  
        if (collapsed) {
          setHeight(0);
          return;
        }
  
        setHeight(ref.current.scrollHeight);
      }, [ref, collapsed]);
  
      return createElement(as, {
        ...props,
        ref,
        style: {
          overflow: "hidden",
          transition: "height 300ms ease-in-out",
          height,
          display: "grid",
          gridTemplateColumns: "auto min-content",
          gap: "15px",
          ...props.style,
        },
      });
    }
  );