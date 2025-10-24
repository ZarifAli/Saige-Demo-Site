"use client";

import { useEffect } from "react";
import gsap from "gsap";

const LOADER_WORDS = [
  "Leader",
  "Líder",
  "Leiter",
  "Dirigeant",
  "领导者",
  "नेता",
  "Leader",
  "قائد",
  "リーダー",
  "Líder",
  "Pemimpin",
];

export default function WelcomingLoader() {
  useEffect(() => {
    const loadingContainer = document.querySelector("[data-loading-container]");
    if (!loadingContainer) return;

    const loadingWords = loadingContainer.querySelector("[data-loading-words]");
    if (!loadingWords) return;

    const wordsTarget = loadingWords.querySelector("[data-loading-words-target]");
    if (!wordsTarget) return;

    const tl = gsap.timeline();

    tl.set(loadingWords, {
      yPercent: 50,
    });

    tl.to(loadingWords, {
      opacity: 1,
      yPercent: 0,
      duration: 1,
      ease: "Expo.easeInOut",
    });

    LOADER_WORDS.forEach((word) => {
      tl.call(
        () => {
          wordsTarget.textContent = word.trim();
        },
        undefined,
        "+=0.15"
      );
    });

    tl.to(loadingWords, {
      opacity: 0,
      yPercent: -75,
      duration: 0.8,
      ease: "Expo.easeIn",
    });

    tl.to(
      loadingContainer,
      {
        autoAlpha: 0,
        duration: 0.6,
        ease: "Power1.easeInOut",
        pointerEvents: "none",
      },
      "<+0.2"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div data-loading-container className="loading-container">
      <div className="loading-screen">
        <div data-loading-words className="loading-words">
          <div className="loading-words__dot" />
          <p className="loading-words__word">
            <span>Everyone&rsquo;s a</span>
            <span data-loading-words-target>Leader</span>
          </p>
        </div>
      </div>
    </div>
  );
}
