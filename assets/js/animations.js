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

      // 2. Timeline with ScrollTrigger pin on outerBox
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerBox,
          pin: outerBox,
          pinSpacing: true,
          start: "center top+=56%",
          end: () => "+=" + Math.round(window.innerHeight * 1.5),
          scrub: true,
          invalidateOnRefresh: true,
          anticipatePin: 0,
          markers: false,
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
  // About Section Scroll Image Change & Card Stack Animation
  // --------------------------------------------------------
  const aboutSection = document.querySelector(".about-section");
  const aboutWrapper = document.querySelector(".about-wrapper");
  const aboutBoxWrapper = document.querySelector(".about-box-wrapper");

  if (aboutSection && aboutWrapper && aboutBoxWrapper) {
    const mmAbout = gsap.matchMedia();

    // Desktop & Tablet devices (>= 768px) where sticky layout & stacking occurs
    mmAbout.add("(min-width: 768px)", () => {
      const box1 = document.querySelector(".about-box._1");
      const box2 = document.querySelector(".about-box._2");
      const box3 = document.querySelector(".about-box._3");
      const box4 = document.querySelector(".about-box._4");

      const img1 = document.querySelector(".about-image._1");
      const img2 = document.querySelector(".about-image._2");
      const img3 = document.querySelector(".about-image._3");
      const img4 = document.querySelector(".about-image._4");

      const aboutWrapperInner = document.querySelector(".about-wrapper-inner");

      // Calculate starting distance so incoming cards start just below the section inner container
      const getStartY = () => {
        if (!aboutWrapperInner || !box1) return window.innerHeight;
        const innerRect = aboutWrapperInner.getBoundingClientRect();
        const boxRect = box1.getBoundingClientRect();
        const diff = innerRect.bottom - boxRect.top;
        return Math.max(diff + 40, 500);
      };

      // Set initial states — GSAP owns all transforms
      gsap.set(img1, { xPercent: 0 });
      gsap.set([img2, img3, img4], { xPercent: 100 });

      const activeBg = "rgb(237, 232, 218)";
      const inactiveBg = "rgb(245, 242, 234)";

      // Initial states:
      // box1 rests in place as active card
      // box2, box3, box4 start below the section bottom (clipped by about-wrapper-inner)
      gsap.set(box1, { y: 0, backgroundColor: activeBg, zIndex: 1 });
      gsap.set(box2, { y: () => getStartY(), backgroundColor: activeBg, zIndex: 2 });
      gsap.set(box3, { y: () => getStartY(), backgroundColor: activeBg, zIndex: 3 });
      gsap.set(box4, { y: () => getStartY(), backgroundColor: activeBg, zIndex: 4 });

      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutSection,
          start: "top top+=98px",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Step 1 → 2: box2 appears from bottom and slides up into wrapper over box1; image2 slides in from right
      aboutTl
        .to(img2, { xPercent: 0, ease: "none", duration: 1 }, 0)
        .to(box2, { y: 0, ease: "none", duration: 1 }, 0)
        .to(box1, { backgroundColor: inactiveBg, ease: "none", duration: 0.2 }, 0.8);

      // Step 2 → 3: box3 appears from bottom and slides up into wrapper over box2; image3 slides in from right
      aboutTl
        .to(img3, { xPercent: 0, ease: "none", duration: 1 }, 1)
        .to(box3, { y: 0, ease: "none", duration: 1 }, 1)
        .to(box2, { backgroundColor: inactiveBg, ease: "none", duration: 0.2 }, 1.8);

      // Step 3 → 4: box4 appears from bottom and slides up into wrapper over box3; image4 slides in from right
      aboutTl
        .to(img4, { xPercent: 0, ease: "none", duration: 1 }, 2)
        .to(box4, { y: 0, ease: "none", duration: 1 }, 2)
        .to(box3, { backgroundColor: inactiveBg, ease: "none", duration: 0.2 }, 2.8);

      return () => {
        if (aboutTl.scrollTrigger) {
          aboutTl.scrollTrigger.kill();
        }
        aboutTl.kill();
      };
    });

    // Mobile cleanup (< 768px)
    mmAbout.add("(max-width: 767px)", () => {
      const boxes = document.querySelectorAll(".about-box");
      const images = document.querySelectorAll(".about-image");
      gsap.set(boxes, { clearProps: "all" });
      gsap.set(images, { clearProps: "all" });
    });
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
    // Ensure helper exists in this scope or run setup
    causeImageBoxes.forEach((box) => {
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
  }
});

