/**
 * ========================================================
 * Moshiur Memorial Foundation - Scroll Animations
 * Handles GSAP & ScrollTrigger reveal animations
 * ========================================================
 */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // Check GSAP and ScrollTrigger availability
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // --------------------------------------------------------
  // Image Showcase Scroll Reveal Animation (.images-section)
  // --------------------------------------------------------
  const outerBox = document.querySelector(".funfact-outer-box");
  const centerBox = document.querySelector(".funfact-center-box.large-image");
  const outerLeft = document.querySelector(".funfact-image-box.outer-left");
  const outerRight = document.querySelector(".funfact-image-box.outer-right");

  if (outerBox && centerBox && outerLeft && outerRight) {
    const mm = gsap.matchMedia();

    // Desktop & Tablets (>= 768px)
    mm.add("(min-width: 768px)", () => {
      // 1. Initial 5-image state
      gsap.set(centerBox, {
        width: "60vw",
      });

      gsap.set(outerLeft, {
        width: 0,
        maxWidth: 0,
        opacity: 0,
        marginRight: "-1rem",
        x: -30,
      });

      gsap.set(outerRight, {
        width: 0,
        maxWidth: 0,
        opacity: 0,
        marginLeft: "-1rem",
        x: 30,
      });

      // 2. Timeline with ScrollTrigger: starts as the showcase enters and settles at center of screen
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerBox,
          start: "top 75%",
          end: "center center",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // 3. Center video card shrinks linearly
      tl.to(
        centerBox,
        {
          width: "28vw",
          duration: 1,
          ease: "none",
        },
        0
      );

      // 4. Reveal outer-left image linearly
      tl.to(
        outerLeft,
        {
          width: "12vw",
          maxWidth: "180px",
          marginRight: "0rem",
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "none",
        },
        0
      );

      // 5. Reveal outer-right image linearly
      tl.to(
        outerRight,
        {
          width: "12vw",
          maxWidth: "180px",
          marginLeft: "0rem",
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "none",
        },
        0
      );

      // Refresh ScrollTrigger after all page images load to guarantee accurate measurements
      if (document.readyState === "complete") {
        ScrollTrigger.refresh();
      } else {
        window.addEventListener("load", () => {
          ScrollTrigger.refresh();
        });
      }

      return () => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
      };
    });

    // Mobile cleanup (< 768px)
    mm.add("(max-width: 767px)", () => {
      gsap.set([outerBox, centerBox, outerLeft, outerRight], {
        clearProps: "all",
      });
    });
  }

  // --------------------------------------------------------
  // About Section (Freedom Fighter Md. Mashiur Rahman) Part-by-Part GSAP Reveal
  // --------------------------------------------------------
  const memorialSection = document.querySelector(".mm-memorial-section");
  if (memorialSection) {
    const titleBlock = memorialSection.querySelector(".about-title-box");
    const quoteText = memorialSection.querySelector(".mm-quote-text");
    const bioParagraph = memorialSection.querySelector(".mm-bio-paragraph");
    const valueCards = memorialSection.querySelectorAll(".mm-value-card");
    const legacyBox = memorialSection.querySelector(".mm-legacy-box");
    const portraitFrame = memorialSection.querySelector(".mm-portrait-frame");
    const portraitImg = memorialSection.querySelector(".mm-portrait-img");

    // 1. Header elements: Subtitle, Title, Tagline, Bio Lead
    if (titleBlock) {
      const titleChildren = titleBlock.querySelectorAll(
        ".section-subtitle-box, .section-title, .mm-life-tagline, .mm-bio-lead"
      );
      gsap.fromTo(
        titleChildren,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleBlock,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // 2. Memorial Quote Text
    if (quoteText) {
      gsap.fromTo(
        quoteText,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: quoteText,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // 3. Biography Paragraph
    if (bioParagraph) {
      gsap.fromTo(
        bioParagraph,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bioParagraph,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // 4. Core Pillars / Value Cards (Staggered cascade)
    if (valueCards && valueCards.length > 0) {
      gsap.fromTo(
        valueCards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: valueCards[0],
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // 5. Legacy & Sadaqah Jariyah Box
    if (legacyBox) {
      gsap.fromTo(
        legacyBox,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: legacyBox,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // 6. Right Column Portrait (Float-in + soft scale)
    if (portraitFrame) {
      gsap.fromTo(
        portraitFrame,
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: portraitFrame,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    if (portraitImg) {
      gsap.fromTo(
        portraitImg,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: portraitFrame || portraitImg,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

  }

  // --------------------------------------------------------
  // Result Section Rolling Counters & Image Reveal Animations
  // --------------------------------------------------------
  const resultSection = document.querySelector(".result-section");
  const counters = document.querySelectorAll(".counter-box .counter");
  const resultImageBoxes = document.querySelectorAll(".result-image-box");

  if (resultSection) {
    // Initial setup for counters
    gsap.set(counters, { y: 0 });

    const playCounters = () => {
      counters.forEach((el, index) => {
        const countNumbers = el.querySelectorAll(".count-number");
        const totalItems = countNumbers.length;
        if (totalItems <= 1) return;

        const itemHeight = countNumbers[0].offsetHeight || 70;
        const targetY = -((totalItems - 1) * itemHeight);

        gsap.to(el, {
          y: targetY,
          duration: 2.2,
          ease: "power2.out",
          delay: index * 0.05,
          overwrite: "auto",
        });
      });
    };

    const resetCounters = () => {
      gsap.to(counters, {
        y: 0,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    };

    // Counters ScrollTrigger — triggers when section is in view
    ScrollTrigger.create({
      trigger: resultSection,
      start: "top 85%",
      end: "bottom 15%",
      onEnter: playCounters,
      onLeave: () => gsap.set(counters, { y: 0 }),
      onEnterBack: playCounters,
      onLeaveBack: () => gsap.set(counters, { y: 0 }),
    });

    // Helper to set up scroll-driven image reveal with scaling (1.4 -> 1)
    const setupImageReveal = (boxes, imgSelector, overlaySelector, overlayClass = "") => {
      boxes.forEach((box) => {
        let overlay = box.querySelector(overlaySelector);
        if (!overlay) {
          overlay = document.createElement("div");
          overlay.className = overlayClass || "result-image-overlay";
          box.prepend(overlay);
        }
        // Ensure overlay starts at 0 covering the image completely
        gsap.set(overlay, { yPercent: 0 });
        const img = box.querySelector(imgSelector);
        if (img) gsap.set(img, { scale: 1.4, transformOrigin: "center center" });

        let isRevealed = false;

        ScrollTrigger.create({
          trigger: box,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const rect = box.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;

            // Scroll DOWN: reveal from UP to DOWN earlier as image enters view (top <= 92% of viewport)
            if (self.direction === 1 && !isRevealed) {
              if (rect.top <= vh * 0.92 && rect.bottom > 0) {
                isRevealed = true;
                gsap.to(overlay, {
                  yPercent: 100,
                  duration: 1.1,
                  ease: "power2.inOut",
                  overwrite: "auto",
                });
                if (img) {
                  gsap.fromTo(
                    img,
                    { scale: 1.4 },
                    {
                      scale: 1,
                      duration: 1.3,
                      ease: "power2.out",
                      overwrite: "auto",
                    }
                  );
                }
              }
            }

            // Scroll UP: reveal from DOWN to UP earlier as image enters view from top (bottom >= 8% of viewport)
            if (self.direction === -1 && !isRevealed) {
              if (rect.bottom >= vh * 0.08 && rect.top < vh) {
                isRevealed = true;
                gsap.to(overlay, {
                  yPercent: -100,
                  duration: 1.1,
                  ease: "power2.inOut",
                  overwrite: "auto",
                });
                if (img) {
                  gsap.fromTo(
                    img,
                    { scale: 1.4 },
                    {
                      scale: 1,
                      duration: 1.3,
                      ease: "power2.out",
                      overwrite: "auto",
                    }
                  );
                }
              }
            }
          },
          onLeave: () => {
            // Scrolled completely past top (100% off-screen above viewport)
            isRevealed = false;
            gsap.set(overlay, { yPercent: 0 });
            if (img) gsap.set(img, { scale: 1.4 });
          },
          onLeaveBack: () => {
            // Scrolled completely past bottom (100% off-screen below viewport)
            isRevealed = false;
            gsap.set(overlay, { yPercent: 0 });
            if (img) gsap.set(img, { scale: 1.4 });
          },
        });

        // Handle initial page load if already in viewport (e.g. on page refresh):
        const initialRect = box.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (initialRect.top <= vh * 0.92 && initialRect.bottom >= 0) {
          isRevealed = true;
          gsap.to(overlay, {
            yPercent: 100,
            duration: 1.1,
            ease: "power2.inOut",
            overwrite: "auto",
          });
          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.4 },
              {
                scale: 1,
                duration: 1.3,
                ease: "power2.out",
                overwrite: "auto",
              }
            );
          }
        }
      });
    };

    // Result Section image reveals
    setupImageReveal(resultImageBoxes, ".result-image", ".result-image-overlay", "result-image-overlay");
  }

  // --------------------------------------------------------
  // Cause Section Image Reveal with Scaling Animation
  // --------------------------------------------------------
  const causeSection = document.querySelector(".cause-section");
  if (causeSection) {
    const causeImageBoxes = causeSection.querySelectorAll(".cause-image-box");
    // Reuse the existing setupImageReveal helper function
    const setupCauseReveal = (boxes) => {
      boxes.forEach((box) => {
        let overlay = box.querySelector(".image-overlay");
        if (!overlay) {
          overlay = document.createElement("div");
          overlay.className = "image-overlay two";
          box.prepend(overlay);
        }
        gsap.set(overlay, { yPercent: 0 });
        const img = box.querySelector(".cause-image");
        if (img) gsap.set(img, { scale: 1.4, transformOrigin: "center center" });

        let isRevealed = false;

        ScrollTrigger.create({
          trigger: box,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const rect = box.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;

            if (self.direction === 1 && !isRevealed) {
              if (rect.top <= vh * 0.92 && rect.bottom > 0) {
                isRevealed = true;
                gsap.to(overlay, {
                  yPercent: 100,
                  duration: 1.1,
                  ease: "power2.inOut",
                  overwrite: "auto",
                });
                if (img) {
                  gsap.fromTo(img, { scale: 1.4 }, { scale: 1, duration: 1.3, ease: "power2.out", overwrite: "auto" });
                }
              }
            }

            if (self.direction === -1 && !isRevealed) {
              if (rect.bottom >= vh * 0.08 && rect.top < vh) {
                isRevealed = true;
                gsap.to(overlay, {
                  yPercent: -100,
                  duration: 1.1,
                  ease: "power2.inOut",
                  overwrite: "auto",
                });
                if (img) {
                  gsap.fromTo(img, { scale: 1.4 }, { scale: 1, duration: 1.3, ease: "power2.out", overwrite: "auto" });
                }
              }
            }
          },
          onLeave: () => {
            isRevealed = false;
            gsap.set(overlay, { yPercent: 0 });
            if (img) gsap.set(img, { scale: 1.4 });
          },
          onLeaveBack: () => {
            isRevealed = false;
            gsap.set(overlay, { yPercent: 0 });
            if (img) gsap.set(img, { scale: 1.4 });
          },
        });

        const initialRect = box.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (initialRect.top <= vh * 0.92 && initialRect.bottom >= 0) {
          isRevealed = true;
          gsap.to(overlay, { yPercent: 100, duration: 1.1, ease: "power2.inOut", overwrite: "auto" });
          if (img) {
            gsap.fromTo(img, { scale: 1.4 }, { scale: 1, duration: 1.3, ease: "power2.out", overwrite: "auto" });
          }
        }
      });
    };

    setupCauseReveal(causeImageBoxes);
  }
});

