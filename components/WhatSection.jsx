"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LOCATIONS = [
  {
    name: "Dolomites",
    image:
      "https://cdn.prod.website-files.com/68f8bc9dc83dc1aacaa172e7/68f8cf7185c9dcfbedc6d4aa_Dramatic%20Mountain%20Range%20at%20Sunrise.avif",
  },
  {
    name: "Patagonia",
    image:
      "https://cdn.prod.website-files.com/68f8bc9dc83dc1aacaa172e7/68f8cf71364a2fdf36e25d26_Tranquil%20Dawn%20over%20the%20Pastel%20Peak%20Range.avif",
  },
  {
    name: "Yosemite Park",
    image:
      "https://cdn.prod.website-files.com/68f8bc9dc83dc1aacaa172e7/68f8cf712f57198f963fd7eb_Majestic%20Mountain%20Landscape.avif",
  },
  {
    name: "Pyrenees",
    image:
      "https://cdn.prod.website-files.com/68f8bc9dc83dc1aacaa172e7/68f8cf71cb5249dc6ea2eb35_Subdued%20Mountain%20Serenity.avif",
  },
];

export default function WhatSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    const mmCtx = mm.add(
      {
        isMobile: "(max-width: 479px)",
        isMobileLandscape: "(max-width: 767px)",
        isTablet: "(max-width: 991px)",
        isDesktop: "(min-width: 992px)",
      },
      (context) => {
        const { isMobile, isMobileLandscape, isTablet } = context.conditions;

        const gsapCtx = gsap.context(() => {
          const wrappers = Array.from(
            section.querySelectorAll("[data-horizontal-scroll-wrap]")
          );
          if (!wrappers.length) return;

          wrappers.forEach((wrap) => {
            const disable = wrap.getAttribute("data-horizontal-scroll-disable");
            if (
              (disable === "mobile" && isMobile) ||
              (disable === "mobileLandscape" && isMobileLandscape) ||
              (disable === "tablet" && isTablet)
            ) {
              return;
            }

            const panels = gsap.utils.toArray(
              "[data-horizontal-scroll-panel]",
              wrap
            );
            if (panels.length < 2) return;

            gsap.to(panels, {
              x: () => -(wrap.scrollWidth - window.innerWidth),
              ease: "none",
              scrollTrigger: {
                trigger: wrap,
                start: "top top",
                end: () => "+=" + (wrap.scrollWidth - window.innerWidth),
                scrub: true,
                pin: true,
                invalidateOnRefresh: true,
              },
            });
          });
        }, section);

        return () => gsapCtx.revert();
      }
    );

    return () => {
      mmCtx.revert();
    };
  }, []);

  return (
    <section
      id="what"
      ref={sectionRef}
      className="section-what horizontal__wrap"
      data-horizontal-scroll-wrap
      data-horizontal-scroll-disable="mobileLandscape"
    >
      {LOCATIONS.map((location) => (
        <div
          key={location.name}
          data-horizontal-scroll-panel
          className="horizontal__panel"
        >
          <div className="horizontal__panel-inner">
            <article className="demo-card">
              <div className="demo-card__bg">
                <img
                  src={location.image}
                  alt={location.name}
                  className="demo-card__bg-img"
                />
              </div>
              <div className="demo-card__inner">
                <h2 className="demo-header__h1">{location.name}</h2>
              </div>
            </article>
          </div>
        </div>
      ))}
    </section>
  );
}

