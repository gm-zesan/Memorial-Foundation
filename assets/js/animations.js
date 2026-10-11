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
            end: "bottom top",
            toggleActions: "restart reverse restart reverse",
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
            end: "bottom top",
            toggleActions: "restart reverse restart reverse",
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
            start: "top 85%",
            end: "bottom top",
            toggleActions: "restart reverse restart reverse",
          },
        }
      );
    }

    // 4. Core Pillars / Value Cards (Staggered cascade)
    if (valueCards && valueCards.length > 0) {
      const valuesGrid = memorialSection.querySelector(".mm-values-grid") || valueCards[0];
      gsap.fromTo(
        valueCards,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: valuesGrid,
            start: "top 85%",
            end: "bottom top",
            toggleActions: "restart reverse restart reverse",
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
            end: "bottom top",
            toggleActions: "restart reverse restart reverse",
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
            end: "bottom top",
            toggleActions: "restart reverse restart reverse",
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
            end: "bottom top",
            toggleActions: "restart reverse restart reverse",
          },
        }
      );
    }
  }

  // --------------------------------------------------------
  // Result Section Rolling Counters & Title Animations
  // --------------------------------------------------------
  const resultSection = document.querySelector(".result-section");
  const counters = document.querySelectorAll(".counter-box .counter");

  if (resultSection) {
    // 1. Title block reveal
    const resultTitleWrap = resultSection.querySelector(".section-title-wrapper");
    if (resultTitleWrap) {
      const titleChildren = resultTitleWrap.querySelectorAll(".section-title-box, .section-text-box");
      gsap.fromTo(
        titleChildren,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: resultTitleWrap,
            start: "top 85%",
            end: "bottom top",
            toggleActions: "restart reverse restart reverse",
          },
        }
      );
    }

    // 2. Result Wraps container cards reveal
    const resultWraps = resultSection.querySelectorAll(".result-wrap");
    if (resultWraps.length > 0) {
      const resultGrid = resultSection.querySelector(".result-grid") || resultSection;
      gsap.fromTo(
        resultWraps,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: resultGrid,
            start: "top 85%",
            end: "bottom top",
            toggleActions: "restart reverse restart reverse",
          },
        }
      );
    }

    // 3. Rolling counters animation
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
        duration: 0.6,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    };

    // Counters ScrollTrigger — triggers and reverses every time section enters/leaves view
    ScrollTrigger.create({
      trigger: resultSection,
      start: "top 85%",
      end: "bottom top",
      onEnter: playCounters,
      onLeave: resetCounters,
      onEnterBack: playCounters,
      onLeaveBack: resetCounters,
    });
  }

  // --------------------------------------------------------
  // Cause Section - Title Reveal & Staggered Cards (Bidirectional)
  // --------------------------------------------------------
  const causeSection = document.querySelector(".cause-section");
  if (causeSection) {
    // 1. Header Title & Subtitle Reveal
    const causeTitleBox = causeSection.querySelector(".cause-top-box .section-title-box");
    if (causeTitleBox) {
      gsap.fromTo(
        causeTitleBox,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: causeTitleBox,
            start: "top 85%",
            end: "bottom top",
            toggleActions: "restart reverse restart reverse",
          },
        }
      );
    }

    // 2. Cause Cards & Content Cascade
    const causeItems = causeSection.querySelectorAll(".hide-md .cause-cms");
    if (causeItems.length > 0) {
      causeItems.forEach((item) => {
        const content = item.querySelector(".cause-content");
        const shape = item.querySelector(".cause-shape");
        const goalWrap = item.querySelector(".cause-goal-wrap");

        const tl = gsap.timeline({ paused: true });

        if (content) {
          tl.fromTo(
            content,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
            0
          );
        }

        if (shape) {
          tl.fromTo(
            shape,
            { scale: 0.88, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.4)" },
            0.1
          );
        }

        if (goalWrap) {
          tl.fromTo(
            goalWrap,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            0.2
          );
        }

        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          end: "bottom top",
          toggleActions: "restart reverse restart reverse",
          animation: tl,
        });
      });
    }
  }

  // --------------------------------------------------------
  // Shape Sections - Parallax Depth Camouflage Scrub
  // --------------------------------------------------------
  const shapeSections = document.querySelectorAll(".shape-section");
  shapeSections.forEach((sec) => {
    const pImg = sec.querySelector(".parallex-image");
    if (pImg) {
      gsap.fromTo(
        pImg,
        { yPercent: -16 },
        {
          yPercent: 16,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }
  });

  // --------------------------------------------------------
  // Donate Section - Alternating Vertical Kinetic Reveal (Bidirectional)
  // --------------------------------------------------------
  const donateSection = document.querySelector(".donate-section");
  if (donateSection) {
    const donateBoxes = donateSection.querySelectorAll(".donate-box");
    donateBoxes.forEach((box) => {
      const content = box.querySelector(".donate-content");
      const imgBox = box.querySelector(".donate-image-box");
      const marquee = box.querySelector(".marquee-box");
      const btn = box.querySelector(".theme-button");

      const tl = gsap.timeline({ paused: true });

      // Alternating vertical direction:
      // Box 1 & 3: Content from top (y: -35), Image from bottom (y: 35)
      // Box 2: Image from top (y: -35), Content from bottom (y: 35)
      const isReverse = box.classList.contains("_2");
      const contentY = isReverse ? 35 : -35;
      const imgY = isReverse ? -35 : 35;

      if (content) {
        tl.fromTo(
          content,
          { y: contentY, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
          0
        );
      }

      if (imgBox) {
        tl.fromTo(
          imgBox,
          { y: imgY, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
          0
        );
      }

      if (btn) {
        tl.fromTo(
          btn,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.4)" },
          0.2
        );
      }

      if (marquee) {
        tl.fromTo(
          marquee,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0.3
        );
      }

      ScrollTrigger.create({
        trigger: box,
        start: "top 85%",
        end: "bottom top",
        toggleActions: "restart reverse restart reverse",
        animation: tl,
      });
    });
  }

  // --------------------------------------------------------
  // Review Section - 3D Perspective Tilt & Stamp Badges (Bidirectional)
  // --------------------------------------------------------
  const reviewSection = document.querySelector(".review-section.two");
  if (reviewSection) {
    const titleBox = reviewSection.querySelector(".section-title-box");
    if (titleBox) {
      gsap.fromTo(
        titleBox,
        { y: 35, scale: 0.95, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleBox,
            start: "top 85%",
            end: "bottom top",
            toggleActions: "restart reverse restart reverse",
          },
        }
      );
    }

    const testiBlocks = reviewSection.querySelectorAll(".review-grid .testimonial-block");
    if (testiBlocks.length > 0) {
      testiBlocks.forEach((block, idx) => {
        const quoteIcon = block.querySelector(".testi-quote-icon");
        const authorImg = block.querySelector(".review-image");
        const authorInfo = block.querySelector(".testi-info-box");
        const tiltAngle = idx % 2 === 0 ? -1.8 : 1.8;

        const tl = gsap.timeline({ paused: true });

        tl.fromTo(
          block,
          { y: 50, rotationZ: tiltAngle, opacity: 0 },
          {
            y: 0,
            rotationZ: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          0
        );

        if (quoteIcon) {
          tl.fromTo(
            quoteIcon,
            { scale: 0.2, rotation: -30, opacity: 0 },
            { scale: 1, rotation: 0, opacity: 1, duration: 0.5, ease: "back.out(2)" },
            0.2
          );
        }

        if (authorImg) {
          tl.fromTo(
            authorImg,
            { scale: 0.7, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.5)" },
            0.25
          );
        }

        if (authorInfo) {
          tl.fromTo(
            authorInfo,
            { x: -10, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
            0.3
          );
        }

        ScrollTrigger.create({
          trigger: block,
          start: "top 85%",
          end: "bottom top",
          toggleActions: "restart reverse restart reverse",
          animation: tl,
        });
      });
    }

    // Mobile slider fallback
    const sliderBlocks = reviewSection.querySelectorAll(".review-slider .testimonial-block");
    if (sliderBlocks.length > 0) {
      gsap.set(sliderBlocks, { opacity: 1 });
    }
  }

  // --------------------------------------------------------
  // Call to Action Section - Cinematic Canvas Zoom & Face Capsule Pop (Bidirectional)
  // --------------------------------------------------------
  const ctaSection = document.querySelector(".call-to-action");
  if (ctaSection) {
    const ctaWrapper = ctaSection.querySelector(".cta-wrapper");
    const ctaTitle = ctaSection.querySelector(".cta-title");
    const ctaSpans = ctaSection.querySelectorAll(".cta-title-span");
    const ctaText = ctaSection.querySelector(".cta-text");
    const ctaBtn = ctaSection.querySelector(".cta-btn-box");

    if (ctaWrapper) {
      const tl = gsap.timeline({ paused: true });

      // 1. Cinematic canvas expansion
      tl.fromTo(
        ctaWrapper,
        { scale: 0.94, opacity: 0.7, borderRadius: "36px" },
        { scale: 1, opacity: 1, borderRadius: "20px", duration: 1, ease: "power3.out" },
        0
      );

      // 2. Headline glide
      if (ctaTitle) {
        tl.fromTo(
          ctaTitle,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          0.15
        );
      }

      // 3. Floating face capsule pill bubbles pop out with elastic bounce
      if (ctaSpans.length > 0) {
        tl.fromTo(
          ctaSpans,
          { scale: 0, opacity: 0, rotation: -12 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: "back.out(2.2)",
          },
          0.3
        );
      }

      // 4. Subtitle and CTA button
      if (ctaText) {
        tl.fromTo(
          ctaText,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          0.35
        );
      }

      if (ctaBtn) {
        tl.fromTo(
          ctaBtn,
          { scale: 0.88, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.6)" },
          0.45
        );
      }

      ScrollTrigger.create({
        trigger: ctaSection,
        start: "top 80%",
        end: "bottom top",
        toggleActions: "restart reverse restart reverse",
        animation: tl,
      });
    }
  }

  // --------------------------------------------------------
  // Blog Section - Editorial Magazine Card Elevation (Bidirectional)
  // --------------------------------------------------------
  const blogSection = document.querySelector(".blog-section");
  if (blogSection) {
    const titleBox = blogSection.querySelector(".section-title-box");
    if (titleBox) {
      gsap.fromTo(
        titleBox,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleBox,
            start: "top 85%",
            end: "bottom top",
            toggleActions: "restart reverse restart reverse",
          },
        }
      );
    }

    const blogCards = blogSection.querySelectorAll(".blog-cms .cms-item");
    if (blogCards.length > 0) {
      blogCards.forEach((card) => {
        const box = card.querySelector(".blog-box");
        const metaBox = card.querySelector(".blog-meta-box");
        const blogTitle = card.querySelector(".blog-title");
        const readmore = card.querySelector(".readmore-box");

        const tl = gsap.timeline({ paused: true });

        if (box) {
          tl.fromTo(
            box,
            { y: 55, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
            0
          );
        }

        if (metaBox) {
          tl.fromTo(
            metaBox,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            0.12
          );
        }

        if (blogTitle) {
          tl.fromTo(
            blogTitle,
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            0.2
          );
        }

        if (readmore) {
          tl.fromTo(
            readmore,
            { x: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.5)" },
            0.28
          );
        }

        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          end: "bottom top",
          toggleActions: "restart reverse restart reverse",
          animation: tl,
        });
      });
    }
  }

  // --------------------------------------------------------
  // Social Section - Rhythmic Cascade Wave & Icon Rotation Spring (Bidirectional)
  // --------------------------------------------------------
  const socialSection = document.querySelector(".social-section");
  if (socialSection) {
    const socialBoxes = socialSection.querySelectorAll(".social-box");
    if (socialBoxes.length > 0) {
      const tl = gsap.timeline({ paused: true });

      tl.fromTo(
        socialBoxes,
        { y: 35, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.5)",
        },
        0
      );

      const icons = socialSection.querySelectorAll(".social-icon");
      if (icons.length > 0) {
        tl.fromTo(
          icons,
          { rotation: -18, scale: 0.8 },
          { rotation: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(2)" },
          0.2
        );
      }

      ScrollTrigger.create({
        trigger: socialSection,
        start: "top 85%",
        end: "bottom top",
        toggleActions: "restart reverse restart reverse",
        animation: tl,
      });
    }
  }

  // --------------------------------------------------------
  // Footer Section - Atmospheric Watermark Scrub Drift & Widget Soft Stagger (Bidirectional)
  // --------------------------------------------------------
  const footer = document.querySelector(".main-footer");
  if (footer) {
    const floatText = footer.querySelector(".footer-float-text");
    if (floatText) {
      gsap.fromTo(
        floatText,
        { xPercent: -8 },
        {
          xPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.5,
          },
        }
      );
    }

    const widgets = footer.querySelectorAll(".footer-widget, .footer-bottom");
    if (widgets.length > 0) {
      gsap.fromTo(
        widgets,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 88%",
            end: "bottom bottom",
            toggleActions: "restart none none reverse",
          },
        }
      );
    }
  }

  // --------------------------------------------------------
  // Global ScrollTrigger Refresh on Full Window Load
  // --------------------------------------------------------
  if (document.readyState === "complete") {
    ScrollTrigger.refresh();
  } else {
    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });
  }
});

