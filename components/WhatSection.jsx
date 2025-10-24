"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SPOTLIGHT_ITEMS = [
  {
    name: "Personalized to your goals",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Grounded in proven frameworks",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Backed by leadership science",
    image: "https://images.unsplash.com/photo-1522252234503-e356532cafd5?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Ubiquitously available",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1000&q=80",
  },
];

const CONFIG = {
  gap: 0.12,
  speed: 0.45,
  arcRadius: 420,
};

export default function WhatSection() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const spotlight = root.querySelector(".spotlight");
    if (!spotlight) {
      return;
    }

    const titlesContainer = spotlight.querySelector(".spotlight-titles");
    const titlesContainerElement = spotlight.querySelector(
        ".spotlight-titles-container"
    );
    const spotlightHeader = spotlight.querySelector(".spotlight-header");
    const introTextElements = spotlight.querySelectorAll(
        ".spotlight-intro-text"
    );
    const bgImgWrapper = spotlight.querySelector(".spotlight-bg-img");
    const bgImg = spotlight.querySelector(".spotlight-bg-img img");
    const titleElements = titlesContainer
        ? Array.from(titlesContainer.querySelectorAll("h1"))
        : [];
    const imageElements = Array.from(
        spotlight.querySelectorAll(".spotlight-img")
    );

    if (
        !titlesContainer ||
        !titlesContainerElement ||
        !spotlightHeader ||
        introTextElements.length < 2 ||
        !bgImgWrapper ||
        !bgImg ||
        !titleElements.length ||
        !imageElements.length
    ) {
      return;
    }

    titleElements.forEach((title, index) => {
      gsap.set(title, { opacity: index === 0 ? 1 : 0.25 });
    });

    const containerWidth = window.innerWidth * 0.3;
    const containerHeight = window.innerHeight;
    const arcStartX = containerWidth - 220;
    const arcStartY = -200;
    const arcEndY = containerHeight + 200;
    const arcControlPointX = arcStartX + CONFIG.arcRadius;
    const arcControlPointY = containerHeight / 2;

    const getBezierPosition = (t) => {
      const x =
          (1 - t) * (1 - t) * arcStartX +
          2 * (1 - t) * t * arcControlPointX +
          t * t * arcStartX;
      const y =
          (1 - t) * (1 - t) * arcStartY +
          2 * (1 - t) * t * arcControlPointY +
          t * t * arcEndY;
      return { x, y };
    };

    const getImgProgressState = (index, overallProgress) => {
      const startTime = index * CONFIG.gap;
      const endTime = startTime + CONFIG.speed;

      if (overallProgress < startTime) return -1;
      if (overallProgress > endTime) return 2;

      return (overallProgress - startTime) / CONFIG.speed;
    };

    imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));

    const trigger = ScrollTrigger.create({
      trigger: spotlight,
      start: "top top",
      end: () => `+=${window.innerHeight * 10}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress <= 0.2) {
          const animationProgress = progress / 0.2;
          const moveDistance = window.innerWidth * 0.6;

          gsap.set(introTextElements[0], {
            x: -animationProgress * moveDistance,
          });
          gsap.set(introTextElements[1], {
            x: animationProgress * moveDistance,
          });
          gsap.set(introTextElements[0], { opacity: 1 });
          gsap.set(introTextElements[1], { opacity: 1 });

          gsap.set(bgImgWrapper, { scale: animationProgress });
          gsap.set(bgImg, { scale: 1.5 - animationProgress * 0.5 });

          imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
          gsap.set(spotlightHeader, { opacity: 0 });
          gsap.set(titlesContainerElement, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });
        } else if (progress > 0.2 && progress <= 0.25) {
          gsap.set(bgImgWrapper, { scale: 1 });
          gsap.set(bgImg, { scale: 1 });

          gsap.set(introTextElements[0], { opacity: 0 });
          gsap.set(introTextElements[1], { opacity: 0 });

          imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
          gsap.set(spotlightHeader, { opacity: 1 });
          gsap.set(titlesContainerElement, {
            "--before-opacity": "1",
            "--after-opacity": "1",
          });
        } else if (progress > 0.25 && progress <= 0.95) {
          gsap.set(bgImgWrapper, { scale: 1 });
          gsap.set(bgImg, { scale: 1 });

          gsap.set(introTextElements[0], { opacity: 0 });
          gsap.set(introTextElements[1], { opacity: 0 });

          gsap.set(spotlightHeader, { opacity: 1 });
          gsap.set(titlesContainerElement, {
            "--before-opacity": "1",
            "--after-opacity": "1",
          });

          const switchProgress = (progress - 0.25) / 0.7;
          const viewportHeight = window.innerHeight;
          const titlesContainerHeight = titlesContainer.scrollHeight;
          const startPosition = viewportHeight;
          const targetPosition = -titlesContainerHeight;
          const totalDistance = startPosition - targetPosition;
          const currentY = startPosition - switchProgress * totalDistance;

          gsap.set(titlesContainer, { y: currentY });

          imageElements.forEach((img, index) => {
            const imageProgress = getImgProgressState(index, switchProgress);

            if (imageProgress < 0 || imageProgress > 1) {
              gsap.set(img, { opacity: 0 });
            } else {
              const pos = getBezierPosition(imageProgress);
              gsap.set(img, {
                x: pos.x - 100,
                y: pos.y - 75,
                opacity: 1,
              });
            }
          });

          const viewportMiddle = viewportHeight / 2;
          let closestIndex = 0;
          let closestDistance = Infinity;

          titleElements.forEach((title, index) => {
            const titleRect = title.getBoundingClientRect();
            const titleCenter = titleRect.top + titleRect.height / 2;
            const distanceFromCenter = Math.abs(titleCenter - viewportMiddle);

            if (distanceFromCenter < closestDistance) {
              closestDistance = distanceFromCenter;
              closestIndex = index;
            }
          });

          titleElements.forEach((title, index) => {
            title.style.opacity = index === closestIndex ? "1" : "0.25";
          });

          bgImg.src = SPOTLIGHT_ITEMS[closestIndex]?.image ?? bgImg.src;
        } else if (progress > 0.95) {
          gsap.set(spotlightHeader, { opacity: 0 });
          gsap.set(titlesContainerElement, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
      <div id="what" ref={rootRef} className="section-what">
        <section className="intro">
          <h1>Saige is a telescope into the leadership potential hiding in plain sight.</h1>
        </section>
        <section className="spotlight">
          <div className="spotlight-intro-text-wrapper">
            <div className="spotlight-intro-text">
              <p>Beneath</p>
            </div>
            <div className="spotlight-intro-text">
              <p>Beyond</p>
            </div>
          </div>

          <div className="spotlight-bg-img">
            <img src={SPOTLIGHT_ITEMS[0].image} alt="Saige capabilities" />
          </div>

          <div className="spotlight-titles-container">
            <div className="spotlight-titles">
              {SPOTLIGHT_ITEMS.map((item) => (
                  <h1 key={item.name}>{item.name}</h1>
              ))}
            </div>
          </div>

          <div className="spotlight-images">
            {SPOTLIGHT_ITEMS.map((item, index) => (
                <div className="spotlight-img" key={`${item.name}-${index}`}>
                  <img src={item.image} alt={item.name} />
                </div>
            ))}
          </div>

          <div className="spotlight-header">
            <p>Saige is</p>
          </div>
        </section>
        <section className="outro">
          <h1>Leadership guidance that meets you wherever work happens.</h1>
        </section>
      </div>
  );
}