"use client";

import AnimatedCopy from "@/components/AnimatedCopy";

export default function WhySection() {
  return (
    <section id="why" className="section-why">
      <div className="why-inner">
        <div className="why-copy">
          <span className="section-label">Why Saige</span>
          <h2>
            We believe exceptional leadership should be experienced by everyone,
            not just the privileged few.
          </h2>
          <AnimatedCopy colorInitial="#959494" colorAccent="#7c02ff" colorFinal="#000000">
            <p>
              Saige is the living layer within organizations that brings
              world-class leadership within arm&rsquo;s reach of every leader,
              whether they&rsquo;re an intern or the CEO.
            </p>
            <p>
              Our deep conviction is that AI belongs everywhere your work already
              lives. It serves not as a replacement, but as an amplifier that
              sharpens judgment, deepens understanding, and lets humans stay
              brilliantly human.
            </p>
          </AnimatedCopy>
        </div>
        <div className="why-orb" aria-hidden="true" />
      </div>
    </section>
  );
}
