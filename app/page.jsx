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

  useEffect(() => {
    const update = (time) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(update);

    let rafId = requestAnimationFrame(() => {
      const lenis = lenisRef.current?.lenis;
      if (lenis && typeof lenis.on === "function") {
        lenis.on("scroll", ScrollTrigger.update);
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      const lenis = lenisRef.current?.lenis;
      if (lenis && typeof lenis.off === "function") {
        lenis.off("scroll", ScrollTrigger.update);
      }
      gsap.ticker.remove(update);
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
    <div>
      <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.08 }} />
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
  );
}
