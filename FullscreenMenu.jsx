"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";

gsap.registerPlugin(CSSRulePlugin);

const MENU_ITEMS = [
  { id: "home", label: "Home" },
  { id: "why", label: "Why" },
  { id: "what", label: "What" },
  { id: "who", label: "Who" },
  { id: "join", label: "Join" },
];

const SOCIAL_LINKS = [
  { label: "Twitter", href: "https://twitter.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Dribbble", href: "https://dribbble.com/" },
  { label: "Behance", href: "https://www.behance.net/" },
];

export default function FullscreenMenu({ onNavigate }) {
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const timelineRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState(MENU_ITEMS[0].id);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      const buttons = overlay.querySelectorAll(".nav-menu-button");
      const subNav = overlay.querySelector(".nav-sub-links");
      const activeRule = CSSRulePlugin.getRule(
          ".nav-overlay .nav-menu-button.active::after"
      );

      gsap.set(buttons, { y: 225 });
      if (subNav) gsap.set(subNav, { bottom: "5%", opacity: 0 });

      // start blocked; enable on open
      overlay.style.pointerEvents = "none";

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power4.inOut" },
        onStart: () => {
          overlay.style.pointerEvents = "auto";
        },
      });

      tl.to(overlay, {
        duration: 1.5,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      }).to(
          buttons,
          {
            duration: 1.5,
            y: 0,
            stagger: 0.2,
            ease: "power4.out",
          },
          "-=1"
      );

      if (activeRule) {
        tl.to(
            activeRule,
            {
              width: "100%",
              duration: 1,
              ease: "power4.out",
              delay: 0.5,
            },
            "<"
        );
      }

      if (subNav) {
        tl.to(
            subNav,
            {
              bottom: "10%",
              opacity: 1,
              duration: 0.5,
              ease: "power4.out",
              delay: 0.5,
            },
            "<"
        );
      }

      tl.eventCallback("onReverseComplete", () => {
        overlay.style.pointerEvents = "none";
      });

      timelineRef.current = tl;
    }, navRef);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      ctx.revert();
    };
  }, []);

  // lock scroll when open
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }
    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [isOpen]);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleMenu = () => {
    if (!timelineRef.current) return;
    setIsOpen((prev) => {
      if (prev) {
        timelineRef.current.reverse();
      } else {
        timelineRef.current.play(0);
      }
      return !prev;
    });
  };

  const closeMenu = () => {
    if (!timelineRef.current || !isOpen) return;
    timelineRef.current.reverse();
    setIsOpen(false);
  };

  const handleItemClick = (item) => {
    setActiveId(item.id);
    if (typeof onNavigate === "function") onNavigate(item.id);
    closeMenu();
  };

  return (
      <div ref={navRef} className="nav-root">
        <nav className="nav-bar" aria-label="Primary">
          <div className="nav-info">
            <p>Saige</p>
          </div>
          <div className="nav-toggle">
            <button
                type="button"
                className={`nav-burger${isOpen ? " active" : ""}`}
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={isOpen}
                aria-controls="saige-nav-overlay"
                onClick={toggleMenu}
            />
          </div>
        </nav>

        <div
            id="saige-nav-overlay"
            ref={overlayRef}
            className="nav-overlay"
            aria-hidden={!isOpen}
        >
          <div className="nav-overlay-menu">
            {MENU_ITEMS.map((item) => (
                <div className="nav-menu-item" key={item.id}>
                  <button
                      type="button"
                      className={`nav-menu-button${
                          activeId === item.id ? " active" : ""
                      }`}
                      onClick={() => handleItemClick(item)}
                  >
                    {item.label}
                  </button>
                </div>
            ))}
          </div>

          <div className="nav-sub-links">
            {SOCIAL_LINKS.map((link, index) => (
                <Fragment key={link.label}>
                  <p>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </p>
                  {index < SOCIAL_LINKS.length - 1 && <p aria-hidden="true">·</p>}
                </Fragment>
            ))}
          </div>
        </div>
      </div>
  );
}
