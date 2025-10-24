"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEAM_MEMBERS = [
  {
    name: "Hamza Khan",
    description:
      "Author, educator, and change leadership expert shaping how Saige unlocks people-first cultures.",
    image:
      "https://images.squarespace-cdn.com/content/v1/615482306f63156bb62c4810/1969c35a-9e05-4b9a-94f2-4988c4498bd9/HK_Headshot_Brown.jpg?format=2500w",
  },
  {
    name: "Bailey Parnell",
    description:
      "Award-winning researcher and storyteller ensuring our guidance is inclusive, compassionate, and actionable.",
    image:
      "https://cdn.prod.website-files.com/6063a11eb5d79a808af4c882/65579dff0f1e758ed7090f0b_Copy%20of%20_ROO7661-p-1600.jpeg",
  },
  {
    name: "Lawrence Eta",
    description:
        "Global Digital AI Thought Leader. With over 23 years of global leadership in AI and digital transformation,",
    image:
        "https://lawrenceeta.com/wp-content/uploads/2024/04/abou-Lawrence-Eta.jpg",
  },
  {
    name: "Marco Palermo",
    description:
      "Technology strategist behind city-scale innovation, now building the Saige platform for real-world impact.",
    image:
      "https://media.licdn.com/dms/image/v2/D4E03AQF6_JeamM4NnQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1707540414027?e=1761782400&v=beta&t=alhMghBr2xnf1zzD22Tpt1eXMO8BHJGqBm2aqgkNIGU",
  },
  {
    name: "Zarif Ali",
    description:
      "Product leader marrying AI and leadership science so every interaction feels like a trusted advisor.",
    image:
      "https://images.squarespace-cdn.com/content/v1/62af7672a9b6f2474bf6d750/0b849fa6-4415-4b57-af34-28d65b36de43/IMG_2301.jpeg?format=2500w",
  },
];

function initStickyFeatures(root) {
  const wraps = Array.from(
    (root ?? document).querySelectorAll("[data-sticky-feature-wrap]")
  );
  if (!wraps.length) return;

  wraps.forEach((w) => {
    const visualWraps = Array.from(
      w.querySelectorAll("[data-sticky-feature-visual-wrap]")
    );
    const items = Array.from(
      w.querySelectorAll("[data-sticky-feature-item]")
    );
    const progressBar = w.querySelector("[data-sticky-feature-progress]");

    if (visualWraps.length !== items.length) {
      console.warn("[initStickyFeatures] visualWraps and items count do not match", {
        visualWraps: visualWraps.length,
        items: items.length,
        wrap: w,
      });
    }

    const count = Math.min(visualWraps.length, items.length);
    if (count < 1 || !progressBar) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const DURATION = prefersReducedMotion ? 0.01 : 0.75;
    const EASE = "power4.inOut";
    const SCROLL_AMOUNT = 0.9;

    const getTexts = (el) =>
      Array.from(el.querySelectorAll("[data-sticky-feature-text]"));

    if (visualWraps[0])
      gsap.set(visualWraps[0], { clipPath: "inset(0% round 0.75em)" });
    gsap.set(items[0], { autoAlpha: 1 });

    let currentIndex = 0;

    function animateOut(itemEl) {
      const texts = getTexts(itemEl);
      gsap.to(texts, {
        autoAlpha: 0,
        y: -30,
        ease: "power4.out",
        duration: 0.4,
        onComplete: () => gsap.set(itemEl, { autoAlpha: 0 }),
      });
    }

    function animateIn(itemEl) {
      const texts = getTexts(itemEl);
      gsap.set(itemEl, { autoAlpha: 1 });
      gsap.fromTo(
        texts,
        {
          autoAlpha: 0,
          y: 30,
        },
        {
          autoAlpha: 1,
          y: 0,
          ease: "power4.out",
          duration: DURATION,
          stagger: 0.1,
        }
      );
    }

    function transition(fromIndex, toIndex) {
      if (fromIndex === toIndex) return;
      const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

      if (fromIndex < toIndex) {
        tl.to(
          visualWraps[toIndex],
          {
            clipPath: "inset(0% round 0.75em)",
            duration: DURATION,
            ease: EASE,
          },
          0
        );
      } else {
        tl.to(
          visualWraps[fromIndex],
          {
            clipPath: "inset(50% round 0.75em)",
            duration: DURATION,
            ease: EASE,
          },
          0
        );
      }

      animateOut(items[fromIndex]);
      animateIn(items[toIndex]);
    }

    const steps = Math.max(1, count - 1);

    ScrollTrigger.create({
      trigger: w,
      start: "center center",
      end: () => `+=${steps * 100}%`,
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = Math.min(self.progress, SCROLL_AMOUNT) / SCROLL_AMOUNT;
        let idx = Math.floor(progress * steps + 1e-6);
        idx = Math.max(0, Math.min(steps, idx));

        gsap.to(progressBar, {
          scaleX: progress,
          ease: "none",
        });

        if (idx !== currentIndex) {
          transition(currentIndex, idx);
          currentIndex = idx;
        }
      },
    });
  });
}

export default function WhoSection() {
  const rootRef = useRef(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    initStickyFeatures(node);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (node.contains(trigger.trigger)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section id="who" className="sticky-features__wrap" ref={rootRef}>
      <div className="team-heading">
        <span className="section-label">Who</span>
        <h2>Built by a world-class team</h2>
      </div>
      <div data-sticky-feature-wrap className="sticky-features__scroll">
        <div className="sticky-features__container">
          <div className="sticky-feaures__col is--img">
            <div className="sticky-features__img-collection">
              <div className="sticky-features__img-list">
                {TEAM_MEMBERS.map((member, index) => (
                  <div
                    key={`${member.name}-${index}`}
                    data-sticky-feature-visual-wrap
                    className="sticky-features__img-item"
                  >
                    <img src={member.image} className="sticky-features__img" alt={member.name} />
                  </div>
                ))}
              </div>
            </div>
            <div className="sticky-features__progress-w">
              <div
                className="sticky-features__progress-bar"
                data-sticky-feature-progress
              />
            </div>
          </div>
          <div className="sticky-feaures__col">
            <div className="sticky-features__text-collection">
              <div className="sticky-features__text-list">
                {TEAM_MEMBERS.map((member, index) => (
                  <div
                    key={`${member.name}-copy-${index}`}
                    data-sticky-feature-item
                    className="sticky-features__text-item"
                  >
                    <span data-sticky-feature-text className="sticky-features__tag">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 data-sticky-feature-text className="sticky-features__heading">
                      {member.name}
                    </h2>
                    <p data-sticky-feature-text className="sticky-features__p">
                      {member.description}
                    </p>
                    <p data-sticky-feature-text className="sticky-features__p is--link">
                      Learn more
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
