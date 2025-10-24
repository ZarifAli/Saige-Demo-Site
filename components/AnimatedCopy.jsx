"use client";

import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function splitIntoChars(element) {
  const original = element.innerHTML;
  const text = element.textContent ?? "";

  element.innerHTML = "";

  const parts = text.split(/(\s+)/);
  parts.forEach((part) => {
    if (part.trim() === "") {
      element.appendChild(document.createTextNode(part));
      return;
    }

    const wordSpan = document.createElement("span");
    wordSpan.classList.add("word");

    Array.from(part).forEach((char) => {
      const charSpan = document.createElement("span");
      charSpan.classList.add("char");
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
    });

    element.appendChild(wordSpan);
  });

  const chars = Array.from(element.querySelectorAll(".char"));
  return { element, original, chars };
}

export default function AnimatedCopy({
  children,
  colorInitial = "#959494",
  colorAccent = "#7c02ff",
  colorFinal = "#000000",
}) {
  const containerRef = useRef(null);
  const splitRefs = useRef([]);
  const lastScrollProgress = useRef(0);
  const colorTransitionTimers = useRef(new Map());
  const completedChars = useRef(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    splitRefs.current = [];
    lastScrollProgress.current = 0;
    colorTransitionTimers.current.clear();
    completedChars.current.clear();

    let elements = [];
    if (container instanceof HTMLElement && container.hasAttribute("data-copy-wrapper")) {
      elements = Array.from(container.children);
    } else if (container instanceof HTMLElement) {
      elements = [container];
    }

    elements.forEach((element) => {
      splitRefs.current.push(splitIntoChars(element));
    });

    const allChars = splitRefs.current.flatMap(({ chars }) => chars);
    if (!allChars.length) {
      return undefined;
    }

    gsap.set(allChars, { color: colorInitial });

    const scheduleFinalTransition = (char, index) => {
      if (colorTransitionTimers.current.has(index)) {
        clearTimeout(colorTransitionTimers.current.get(index));
      }

      const timer = setTimeout(() => {
        if (!completedChars.current.has(index)) {
          gsap.to(char, {
            duration: 0.1,
            ease: "none",
            color: colorFinal,
            onComplete: () => {
              completedChars.current.add(index);
            },
          });
        }
        colorTransitionTimers.current.delete(index);
      }, 100);

      colorTransitionTimers.current.set(index, timer);
    };

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 90%",
      end: "top 10%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalChars = allChars.length;
        const isScrollingDown = progress >= lastScrollProgress.current;
        const currentCharIndex = Math.floor(progress * totalChars);

        allChars.forEach((char, index) => {
          if (!isScrollingDown && index >= currentCharIndex) {
            if (colorTransitionTimers.current.has(index)) {
              clearTimeout(colorTransitionTimers.current.get(index));
              colorTransitionTimers.current.delete(index);
            }
            completedChars.current.delete(index);
            gsap.set(char, { color: colorInitial });
            return;
          }

          if (completedChars.current.has(index)) {
            return;
          }

          if (index <= currentCharIndex) {
            gsap.set(char, { color: colorAccent });
            if (!colorTransitionTimers.current.has(index)) {
              scheduleFinalTransition(char, index);
            }
          } else {
            gsap.set(char, { color: colorInitial });
          }
        });

        lastScrollProgress.current = progress;
      },
    });

    return () => {
      trigger.kill();
      colorTransitionTimers.current.forEach((timer) => clearTimeout(timer));
      colorTransitionTimers.current.clear();
      completedChars.current.clear();

      splitRefs.current.forEach(({ element, original }) => {
        element.innerHTML = original;
      });
    };
  }, [colorAccent, colorFinal, colorInitial]);

  if (React.Children.count(children) === 1) {
    return React.cloneElement(children, {
      ref: containerRef,
    });
  }

  return (
    <div ref={containerRef} data-copy-wrapper>
      {children}
    </div>
  );
}
