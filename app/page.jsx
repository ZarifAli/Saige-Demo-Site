"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

import FullscreenMenu from "@/components/FullscreenMenu";
import HeroExplosion from "@/components/HeroExplosion";
import JoinForm from "@/components/JoinForm";
import WelcomingLoader from "@/components/WelcomingLoader";
import WhatSection from "@/components/WhatSection";
import WhySection from "@/components/WhySection";
import WhoSection from "@/components/WhoSection";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const lenisRef = useRef(null);
  const proxyInitialized = useRef(false);

  useEffect(() => {
    const tickerUpdate = (time) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);

    const originalScroller = ScrollTrigger.defaults().scroller;

    let rafId;
    let cleanupLenisIntegration = null;

    const ensureLenis = () => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) {
        rafId = requestAnimationFrame(ensureLenis);
        return;
      }

      let lenisScroll = lenis.scroll ?? 0;

      const handleLenisScroll = (event) => {
        if (event && typeof event.scroll === "number") {
          lenisScroll = event.scroll;
        } else if (typeof lenis.scroll === "number") {
          lenisScroll = lenis.scroll;
        } else if (typeof window !== "undefined") {
          lenisScroll = window.scrollY;
        }

        ScrollTrigger.update();
      };

      if (typeof lenis.on === "function") {
        lenis.on("scroll", handleLenisScroll);
      }

      if (!proxyInitialized.current) {
        const scroller = document.documentElement;

        ScrollTrigger.scrollerProxy(scroller, {
          scrollTop(value) {
            if (arguments.length) {
              lenis.scrollTo(value, { immediate: true });
            } else {
              return lenisScroll;
            }
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          pinType: scroller.style.transform ? "transform" : "fixed",
        });

        ScrollTrigger.defaults({ scroller });
        proxyInitialized.current = true;
      }

      const handleRefresh = () => {
        lenis.resize?.();
      };

      ScrollTrigger.addEventListener("refresh", handleRefresh);
      ScrollTrigger.refresh();

      cleanupLenisIntegration = () => {
        if (typeof lenis.off === "function") {
          lenis.off("scroll", handleLenisScroll);
        }
        ScrollTrigger.removeEventListener("refresh", handleRefresh);
      };
    };

    ensureLenis();

    return () => {
      if (typeof rafId === "number") {
        cancelAnimationFrame(rafId);
      }
      cleanupLenisIntegration?.();
      gsap.ticker.remove(tickerUpdate);
      if (proxyInitialized.current) {
        ScrollTrigger.defaults({ scroller: originalScroller });
      }
    };
  }, []);

  const handleNavigation = (id) => {
    const lenis = lenisRef.current?.lenis;
    const target = document.getElementById(id);
    if (target && lenis) {
      lenis.scrollTo(target, { offset: -80 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }

    const closeButton = document.querySelector(".menu-close");
    if (closeButton) {
      closeButton.click();
    }
  };

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.08 }}>
      <div>
        <WelcomingLoader />
        <FullscreenMenu onNavigate={handleNavigation} />
        <main>
          <HeroExplosion />
          <WhySection />
          <WhatSection />
          <WhoSection />
          <JoinForm />
        </main>
      </div>
    </ReactLenis>
  );
}
