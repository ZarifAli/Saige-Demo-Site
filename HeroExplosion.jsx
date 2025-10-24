"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGES = [
  {
    src: "https://i0.wp.com/karsh.org/wp-content/uploads/2017/06/Yousuf-Karsh-Nelson-Mandela-1990.jpg?fit=960%2C1235&strip=none&ssl=1",
    alt: "Nelson Mandela speaking to a crowd",
  },
  {
    src: "https://cdn.cfr.org/sites/default/files/styles/open_graph_article/public/image/2025/01/malala.JPG",
    alt: "Malala Yousafzai smiling",
  },
  {
    src: "https://www.politico.eu/cdn-cgi/image/width=1160,height=772,fit=crop,quality=80,onerror=redirect,format=auto/wp-content/uploads/2016/01/GettyImages-502924638.jpg",
    alt: "Angela Merkel at a conference",
  },
  {
    src: "https://media.newyorker.com/photos/5909713e019dfc3494ea2275/master/w_2560%2Cc_limit/Rothman-Was-Jobs-an-Artist.jpg",
    alt: "Executive leader portrait",
  },
  {
    src: "https://i8.amplience.net/i/naras/john-lennon_MI0005158838-MN0000232564",
    alt: "Visionary entrepreneur",
  },
  {
    src: "https://i0.wp.com/karsh.org/wp-content/uploads/2016/10/Yousuf-Karsh-Martin-Luther-King-1962.jpg?fit=960%2C1195&strip=none&ssl=1",
    alt: "Community organizer speaking",
  },
  {
    src: "https://janegoodall.org/wp-content/uploads/gallery_06_jg3.jpg",
    alt: "Historic leader portrait",
  },
  {
    src: "https://img.nmcdn.io/e1/w:570,h:590,v:1/iava/wp-content/uploads/2024/09/Jon-Stewart-Daily-Show-012424-e44379bcf8fb481caea18d32fd2228ff.jpg?s=8946e170",
    alt: "Tech founder smiling",
  },
  {
    src: "https://media.newyorker.com/photos/5f6293f898acc76977afd075/master/w_2560%2Cc_limit/200928_r37090.jpg",
    alt: "Global activist",
  },
  {
    src: "https://www.lottie.com/cdn/shop/articles/Oprah-Winfrey_1024x1024.jpg?v=1603368047",
    alt: "Young professional leader",
  },
  {
    src: "https://cdn.britannica.com/77/20977-004-B2970238/Lester-B-Pearson-Canadian-1963.jpg",
    alt: "Artist leader portrait",
  },
  {
    src: "https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_3840,h_1920,g_auto/dpr_auto/f_auto/q_auto:eco/v1/mahatma-gandhi-gettyimages-102701091-2048x2048-1?_a=BAVAZGID0",
    alt: "Activist marching",
  },
  {
    src: "https://media.cnn.com/api/v1/images/stellar/prod/140924172235-larry-page-google-ceo.jpg?q=w_3000,h_2009,x_0,y_0,c_fill",
    alt: "Team collaborating",
  },
  {
    src: "https://fortune.com/img-assets/wp-content/uploads/2025/10/GettyImages-96957975-e1760698144197.jpg?w=1440&q=90",
    alt: "Speaker on stage",
  },
  {
    src: "https://assets.gqindia.com/photos/64ad547adda916fe08ba20dc/16:9/w_2560%2Cc_limit/Satya-Nadella's-investments.jpg",
    alt: "Innovator portrait",
  },
  {
    src: "https://cdn.britannica.com/70/24470-050-C0951667/Walt-Disney.jpg",
    alt: "Leader in discussion",
  },
  {
    src: "https://winstonchurchill.org/wp-content/uploads/2021/05/6a00d83451586c69e20111690044a1970c-800wi.jpg",
    alt: "Healthcare leader",
  },
  {
    src: "https://www.aljazeera.com/wp-content/uploads/2024/08/GettyImages-2028785911-1722957374.jpg?resize=730%2C410&quality=80",
    alt: "Startup founder",
  },
  {
    src: "https://hips.hearstapps.com/hmg-prod/images/franklin-delano-roosevelt-1882-1945-32nd-president-of-the-united-states-of-america-1933-1945-giving-one-of-his-fireside-broadcasts-to-the-american-nation-during-photo-by-universal-history-archivegetty.jpg",
    alt: "Executive strategist",
  },
  {
    src: "https://ideas.time.com/wp-content/uploads/sites/5/2012/08/56799974.jpg?w=720&h=480&crop=1",
    alt: "Global leader portrait",
  },
];

const COVER_IMAGE = {
  src: "https://i.pinimg.com/originals/91/0b/ea/910beabad73f3fd871ec0fd93384812d.gif",
  alt: "Saige leadership workshop",
};
const HOVER_GALLERY_IMAGES = HERO_IMAGES.slice(0, 10);

const SCATTER_DIRECTIONS = [
  { x: 1.3, y: 0.7 },
  { x: -1.5, y: 1.0 },
  { x: 1.1, y: -1.3 },
  { x: -1.7, y: -0.8 },
  { x: 0.8, y: 1.5 },
  { x: -1.0, y: -1.4 },
  { x: 1.6, y: 0.3 },
  { x: -0.7, y: 1.7 },
  { x: 1.2, y: -1.6 },
  { x: -1.4, y: 0.9 },
  { x: 1.8, y: -0.5 },
  { x: -1.1, y: -1.8 },
  { x: 0.9, y: 1.8 },
  { x: -1.9, y: 0.4 },
  { x: 1.0, y: -1.9 },
  { x: -0.8, y: 1.9 },
  { x: 1.7, y: -1.0 },
  { x: -1.3, y: -1.2 },
  { x: 0.7, y: 2.0 },
  { x: 1.25, y: -0.2 },
];

function splitWords(element) {
  if (!element) return null;
  const original = element.innerHTML;
  const text = element.innerText.trim();
  const parts = text.split(/\s+/);

  element.innerHTML = parts
      .map((word) => `<span class="word">${word}</span>`)
      .join(" ");

  const words = Array.from(element.querySelectorAll(".word"));

  return {
    revert: () => {
      element.innerHTML = original;
    },
    words,
  };
}

export default function HeroExplosion() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const heroIntro = root.querySelector(".hero-intro");
    const gallery = heroIntro?.querySelector(".hero-intro-hover-gallery");

    if (!heroIntro || !gallery) return;

    const highlightSpans = Array.from(
        heroIntro.querySelectorAll(".hero-intro-highlight")
    );
    const items = Array.from(
        gallery.querySelectorAll(".hero-intro-hover-item")
    );

    if (!highlightSpans.length || !items.length) return;

    const getBounds = () => heroIntro.getBoundingClientRect();
    const angleIncrement = (Math.PI * 2) / items.length;

    let currentAngle = 0;
    let isActive = false;
    let radius = 0;

    const bounds = getBounds();
    let targetX = bounds.width / 2;
    let targetY = bounds.height / 2;
    let currentX = targetX;
    let currentY = targetY;

    const computeRadius = () => {
      const rect = getBounds();
      const minDimension = Math.min(rect.width, rect.height);
      return gsap.utils.clamp(120, 260, minDimension * 0.24);
    };

    radius = computeRadius();

    gsap.set(items, {
      xPercent: -50,
      yPercent: -50,
      x: currentX,
      y: currentY,
      opacity: 0,
      scale: 0.8,
    });

    const updateTarget = (clientX, clientY) => {
      const rect = getBounds();
      targetX = clientX - rect.left;
      targetY = clientY - rect.top;
    };

    const updatePositions = (show) => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      items.forEach((item, index) => {
        const angle = currentAngle + index * angleIncrement;
        const x = currentX + radius * Math.cos(angle);
        const y = currentY + radius * Math.sin(angle);

        gsap.to(item, {
          x,
          y,
          opacity: show ? 1 : 0,
          scale: show ? 1 : 0.75,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    const handleEnter = (event) => {
      isActive = true;
      radius = computeRadius();
      updateTarget(event.clientX, event.clientY);
      currentX = targetX;
      currentY = targetY;
      updatePositions(true);
      heroIntro.classList.add("hero-intro--active");
    };

    const handleMove = (event) => {
      if (!isActive) return;
      updateTarget(event.clientX, event.clientY);
    };

    const handleLeave = () => {
      isActive = false;
      updatePositions(false);
      heroIntro.classList.remove("hero-intro--active");
    };

    const handleResize = () => {
      radius = computeRadius();
    };

    highlightSpans.forEach((span) => {
      span.addEventListener("mouseenter", handleEnter);
      span.addEventListener("mousemove", handleMove);
      span.addEventListener("mouseleave", handleLeave);
    });

    window.addEventListener("resize", handleResize);

    const tick = () => {
      currentAngle += 0.01;
      if (currentAngle > Math.PI * 2) {
        currentAngle -= Math.PI * 2;
      }

      if (isActive) {
        updatePositions(true);
      }
    };

    gsap.ticker.add(tick);

    return () => {
      highlightSpans.forEach((span) => {
        span.removeEventListener("mouseenter", handleEnter);
        span.removeEventListener("mousemove", handleMove);
        span.removeEventListener("mouseleave", handleLeave);
      });

      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(tick);
      heroIntro.classList.remove("hero-intro--active");
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const spotlight = root.querySelector(".spotlight");
    if (!spotlight) return;

    const images = Array.from(spotlight.querySelectorAll(".img"));
    const coverImg = spotlight.querySelector(".spotlight-cover-img");
    const introHeader = spotlight.querySelector(
        ".spotlight-intro-header h1"
    );
    const outroHeader = spotlight.querySelector(
        ".spotlight-outro-header h1"
    );

    let introSplit = null;
    let outroSplit = null;
    let trigger = null;

    const initAnimations = () => {
      trigger?.kill();
      introSplit?.revert();
      outroSplit?.revert();

      introSplit = splitWords(introHeader);
      outroSplit = splitWords(outroHeader);

      if (!images.length) return;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const isMobile = screenWidth < 1000;
      const scatterMultiplier = isMobile ? 2.5 : 0.5;

      const startPositions = images.map(() => ({
        x: 0,
        y: 0,
        z: -1000,
        scale: 0,
      }));

      const endPositions = SCATTER_DIRECTIONS.map((dir) => ({
        x: dir.x * screenWidth * scatterMultiplier,
        y: dir.y * screenHeight * scatterMultiplier,
        z: 2000,
        scale: 1,
      }));

      images.forEach((img, index) => {
        const start = startPositions[index] || startPositions[0];
        gsap.set(img, start);
      });

      gsap.set(coverImg, {
        z: -1000,
        scale: 0,
        x: 0,
        y: 0,
      });

      if (introSplit) {
        gsap.set(introSplit.words, { opacity: 1 });
      }

      if (outroSplit) {
        gsap.set(outroSplit.words, { opacity: 0 });
        gsap.set(outroHeader, { opacity: 1 });
      }

      trigger = ScrollTrigger.create({
        trigger: spotlight,
        start: "top top",
        end: () => `+=${window.innerHeight * 15}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          images.forEach((img, index) => {
            const staggerDelay = index * 0.03;
            const scaleMultiplier = isMobile ? 4 : 2;
            const imageProgress = Math.max(0, (progress - staggerDelay) * 4);

            const start = startPositions[index] || startPositions[0];
            const end = endPositions[index] || endPositions[endPositions.length - 1];

            const zValue = gsap.utils.interpolate(start.z, end.z, imageProgress);
            const scaleValue = gsap.utils.interpolate(
                start.scale,
                end.scale,
                imageProgress * scaleMultiplier
            );
            const xValue = gsap.utils.interpolate(start.x, end.x, imageProgress);
            const yValue = gsap.utils.interpolate(start.y, end.y, imageProgress);

            gsap.set(img, {
              z: zValue,
              scale: scaleValue,
              x: xValue,
              y: yValue,
            });
          });

          const coverProgress = Math.max(0, (progress - 0.7) * 4);
          const coverZValue = -1000 + 1000 * coverProgress;
          const coverScaleValue = Math.min(1, coverProgress * 2);

          gsap.set(coverImg, {
            z: coverZValue,
            scale: coverScaleValue,
            x: 0,
            y: 0,
          });

          if (introSplit && introSplit.words.length > 0) {
            if (progress >= 0.6 && progress <= 0.75) {
              const introFadeProgress = (progress - 0.6) / 0.15;
              const totalWords = introSplit.words.length;

              introSplit.words.forEach((word, index) => {
                const wordFadeProgress = index / totalWords;
                const fadeRange = 0.1;

                if (introFadeProgress >= wordFadeProgress + fadeRange) {
                  gsap.set(word, { opacity: 0 });
                } else if (introFadeProgress <= wordFadeProgress) {
                  gsap.set(word, { opacity: 1 });
                } else {
                  const wordOpacity =
                      1 - (introFadeProgress - wordFadeProgress) / fadeRange;
                  gsap.set(word, { opacity: wordOpacity });
                }
              });
            } else if (progress < 0.6) {
              gsap.set(introSplit.words, { opacity: 1 });
            } else if (progress > 0.75) {
              gsap.set(introSplit.words, { opacity: 0 });
            }
          }

          if (outroSplit && outroSplit.words.length > 0) {
            if (progress >= 0.8 && progress <= 0.95) {
              const outroRevealProgress = (progress - 0.8) / 0.15;
              const totalWords = outroSplit.words.length;

              outroSplit.words.forEach((word, index) => {
                const wordRevealProgress = index / totalWords;
                const fadeRange = 0.1;

                if (outroRevealProgress >= wordRevealProgress + fadeRange) {
                  gsap.set(word, { opacity: 1 });
                } else if (outroRevealProgress <= wordRevealProgress) {
                  gsap.set(word, { opacity: 0 });
                } else {
                  const wordOpacity =
                      (outroRevealProgress - wordRevealProgress) / fadeRange;
                  gsap.set(word, { opacity: wordOpacity });
                }
              });
            } else if (progress < 0.8) {
              gsap.set(outroSplit.words, { opacity: 0 });
            } else if (progress > 0.95) {
              gsap.set(outroSplit.words, { opacity: 1 });
            }
          }
        },
      });
    };

    initAnimations();

    window.addEventListener("resize", initAnimations);

    return () => {
      window.removeEventListener("resize", initAnimations);
      trigger?.kill();
      introSplit?.revert();
      outroSplit?.revert();
    };
  }, []);

  return (
      <div ref={rootRef} id="home">
        <section className="hero-intro">
          <div className="hero-intro-copy">
            <h1>
              Everyone&rsquo;s capable when the right{" "}
              <span className="hero-intro-highlight">environment</span> and{" "}
              <span className="hero-intro-highlight">tools</span> are built around
              them.
            </h1>
          </div>
          <div className="hero-intro-hover-gallery" aria-hidden="true">
            {HOVER_GALLERY_IMAGES.map((image, index) => (
                <div
                    className="hero-intro-hover-item"
                    key={`${image.src}-hover-${index}`}
                >
                  <img src={image.src} alt="" loading="lazy" />
                </div>
            ))}
          </div>
        </section>
        <section className="spotlight">
          <div className="spotlight-images">
            {HERO_IMAGES.map((image, index) => (
                <div className="img" key={`${image.src}-${index}`}>
                  <img src={image.src} alt={image.alt} />
                </div>
            ))}
          </div>
          <div className="spotlight-cover-img">
            <img src={COVER_IMAGE.src} alt={COVER_IMAGE.alt} />
          </div>
          <div className="spotlight-intro-header">
            <h1>Leaders aren&rsquo;t born.</h1>
          </div>
          <div className="spotlight-outro-header">
            <h1>They&rsquo;re cultivated.</h1>
          </div>
        </section>
        <section className="hero-outro">
          <h1>Saige orchestrates the growth of every leader across your organization.</h1>
        </section>
      </div>
  );
}
