/**
 * ========================================================
 * Mashiur Rahman Memorial Foundation - Scroll Animations
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
  // Hero Section - Scroll Parallax Scrub & Directional Drift
  // --------------------------------------------------------
  const heroSec = document.querySelector(".hero-section");
  if (heroSec) {
    const heroBgSlider = heroSec.querySelector(".hero-bg-slider");
    const heroLeftBox = heroSec.querySelector(".hero-left-box.content");
    const heroRightBox = heroSec.querySelector(".hero-right-box.content");
    const heroControls = heroSec.querySelector(".hero-slider-controls");

    const heroParallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSec,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    if (heroBgSlider) {
      heroParallaxTl.to(heroBgSlider, { yPercent: 22, ease: "none" }, 0);
    }
    if (heroLeftBox) {
      heroParallaxTl.to(heroLeftBox, { yPercent: -14, opacity: 0.25, ease: "none" }, 0);
    }
    if (heroRightBox) {
      heroParallaxTl.to(heroRightBox, { yPercent: -20, opacity: 0.15, ease: "none" }, 0);
    }
    if (heroControls) {
      heroParallaxTl.to(heroControls, { y: 25, opacity: 0, ease: "none" }, 0);
    }
  }

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
  // About Section (Freedom Fighter Md. Mashiur Rahman)
  // Detailed Multi-Layer Scroll In/Out & Continuous Ambient Motion
  // --------------------------------------------------------
  const memorialSection = document.querySelector(".mm-memorial-section");
  if (memorialSection) {
    const titleBlock = memorialSection.querySelector(".about-title-box");
    const subDot = memorialSection.querySelector(".about-title-box .section-subtitle-dot");
    const subText = memorialSection.querySelector(".about-title-box .section-subtitle");
    const sectionTitle = memorialSection.querySelector(".about-title-box .section-title");
    const lifeTagline = memorialSection.querySelector(".mm-life-tagline");
    const quoteText = memorialSection.querySelector(".mm-quote-text");
    const bioLead = memorialSection.querySelector(".mm-bio-lead");
    const bioParagraph = memorialSection.querySelector(".mm-bio-paragraph");

    const valuesGrid = memorialSection.querySelector(".mm-values-grid");
    const valueCards = memorialSection.querySelectorAll(".mm-value-card");

    const portraitWrap = memorialSection.querySelector(".mm-memorial-portrait-box");
    const portraitFrame = memorialSection.querySelector(".mm-portrait-frame");
    const portraitImg = memorialSection.querySelector(".mm-portrait-img");
    const portraitCaption = memorialSection.querySelector(".mm-portrait-caption");
    const legacyBox = memorialSection.querySelector(".mm-legacy-box");
    const legacyTitle = memorialSection.querySelector(".mm-legacy-title");
    const legacyDesc = memorialSection.querySelector(".mm-legacy-desc");
    const milestoneBox = memorialSection.querySelector(".mm-special-milestone");
    const milestoneIcon = memorialSection.querySelector(".mm-milestone-icon");
    const legacyPrayer = memorialSection.querySelector(".mm-legacy-prayer");

    // 1. Left Column Editorial Header (Detailed Sequential Cascade)
    if (titleBlock) {
      if (subDot) gsap.set(subDot, { scale: 0, opacity: 0 });
      if (subText) gsap.set(subText, { x: -20, opacity: 0 });
      if (sectionTitle) gsap.set(sectionTitle, { y: 35, opacity: 0 });
      if (lifeTagline) gsap.set(lifeTagline, { y: 20, opacity: 0 });
      if (quoteText) gsap.set(quoteText, { x: -25, opacity: 0 });
      if (bioLead) gsap.set(bioLead, { y: 22, opacity: 0 });
      if (bioParagraph) gsap.set(bioParagraph, { y: 25, opacity: 0 });

      const headerTl = gsap.timeline({ paused: true });

      if (subDot) {
        headerTl.fromTo(
          subDot,
          { scale: 0, opacity: 0, immediateRender: true },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(3)" },
          0
        );
      }

      if (subText) {
        headerTl.fromTo(
          subText,
          { x: -20, opacity: 0, immediateRender: true },
          { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          0.08
        );
      }

      if (sectionTitle) {
        headerTl.fromTo(
          sectionTitle,
          { y: 35, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          0.16
        );
      }

      if (lifeTagline) {
        headerTl.fromTo(
          lifeTagline,
          { y: 20, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          0.26
        );
      }

      if (quoteText) {
        headerTl.fromTo(
          quoteText,
          { x: -25, opacity: 0, immediateRender: true },
          { x: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
          0.34
        );
      }

      if (bioLead) {
        headerTl.fromTo(
          bioLead,
          { y: 22, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.75, ease: "power2.out" },
          0.44
        );
      }

      if (bioParagraph) {
        headerTl.fromTo(
          bioParagraph,
          { y: 25, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          0.52
        );
      }

      ScrollTrigger.create({
        trigger: titleBlock,
        start: "top 85%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        animation: headerTl,
      });
    }

    // 2. Core Pillars Grid (Each Card & Inner Icon Granular Entrance)
    if (valuesGrid && valueCards.length > 0) {
      gsap.set(valueCards, { y: 40, opacity: 0, scale: 0.95 });
      const valuesTl = gsap.timeline({ paused: true });

      valueCards.forEach((card, idx) => {
        const iconBox = card.querySelector(".mm-value-icon-box");
        const cardTitle = card.querySelector(".mm-value-title");
        const cardText = card.querySelector(".mm-value-text");
        const cardOffset = idx * 0.12;

        if (iconBox) gsap.set(iconBox, { scale: 0.2, rotation: -30, opacity: 0 });
        if (cardTitle) gsap.set(cardTitle, { y: 12, opacity: 0 });
        if (cardText) gsap.set(cardText, { y: 10, opacity: 0 });

        valuesTl.fromTo(
          card,
          { y: 40, opacity: 0, scale: 0.95, immediateRender: true },
          { y: 0, opacity: 1, scale: 1, duration: 0.75, ease: "back.out(1.3)" },
          cardOffset
        );

        if (iconBox) {
          valuesTl.fromTo(
            iconBox,
            { scale: 0.2, rotation: -30, opacity: 0, immediateRender: true },
            { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: "back.out(2.5)" },
            cardOffset + 0.12
          );
        }

        if (cardTitle) {
          valuesTl.fromTo(
            cardTitle,
            { y: 12, opacity: 0, immediateRender: true },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            cardOffset + 0.18
          );
        }

        if (cardText) {
          valuesTl.fromTo(
            cardText,
            { y: 10, opacity: 0, immediateRender: true },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            cardOffset + 0.22
          );
        }
      });

      ScrollTrigger.create({
        trigger: valuesGrid,
        start: "top 85%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        animation: valuesTl,
      });
    }

    // 3. Right Column: Portrait Frame & Foundation Legacy Card
    if (portraitWrap || portraitFrame || legacyBox) {
      if (portraitFrame) gsap.set(portraitFrame, { y: 45, opacity: 0, scale: 0.95 });
      if (portraitImg) gsap.set(portraitImg, { scale: 1.08, opacity: 0 });
      if (portraitCaption) gsap.set(portraitCaption, { y: 20, opacity: 0 });
      if (legacyBox) gsap.set(legacyBox, { y: 40, opacity: 0, scale: 0.96 });
      if (legacyTitle) gsap.set(legacyTitle, { y: 15, opacity: 0 });
      if (legacyDesc) gsap.set(legacyDesc, { y: 15, opacity: 0 });
      if (milestoneBox) gsap.set(milestoneBox, { x: 25, opacity: 0 });
      if (milestoneIcon) gsap.set(milestoneIcon, { scale: 0.2, rotation: -25, opacity: 0 });
      if (legacyPrayer) gsap.set(legacyPrayer, { y: 12, opacity: 0 });

      const rightColTl = gsap.timeline({ paused: true });

      if (portraitFrame) {
        rightColTl.fromTo(
          portraitFrame,
          { y: 45, opacity: 0, scale: 0.95, immediateRender: true },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
          0
        );
      }

      if (portraitImg) {
        rightColTl.fromTo(
          portraitImg,
          { scale: 1.08, opacity: 0, immediateRender: true },
          { scale: 1, opacity: 1, duration: 1.1, ease: "power2.out" },
          0.1
        );
      }

      if (portraitCaption) {
        rightColTl.fromTo(
          portraitCaption,
          { y: 20, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" },
          0.25
        );
      }

      if (legacyBox) {
        rightColTl.fromTo(
          legacyBox,
          { y: 40, opacity: 0, scale: 0.96, immediateRender: true },
          { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: "power3.out" },
          0.3
        );
      }

      if (legacyTitle) {
        rightColTl.fromTo(
          legacyTitle,
          { y: 15, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          0.42
        );
      }

      if (legacyDesc) {
        rightColTl.fromTo(
          legacyDesc,
          { y: 15, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
          0.48
        );
      }

      if (milestoneBox) {
        rightColTl.fromTo(
          milestoneBox,
          { x: 25, opacity: 0, immediateRender: true },
          { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          0.55
        );
      }

      if (milestoneIcon) {
        rightColTl.fromTo(
          milestoneIcon,
          { scale: 0.2, rotation: -25, opacity: 0, immediateRender: true },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.5, ease: "back.out(2)" },
          0.62
        );
      }

      if (legacyPrayer) {
        rightColTl.fromTo(
          legacyPrayer,
          { y: 12, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          0.68
        );
      }

      ScrollTrigger.create({
        trigger: portraitWrap || portraitFrame || legacyBox,
        start: "top 85%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        animation: rightColTl,
      });
    }

    // 4. All-Time Continuous Ambient Motion (Active While In View)
    const aboutAmbientTl = gsap.timeline({ paused: true, repeat: -1 });

    if (subDot) {
      aboutAmbientTl.to(
        subDot,
        { scale: 1.45, opacity: 0.45, duration: 1.4, yoyo: true, repeat: -1, ease: "sine.inOut" },
        0
      );
    }

    // if (portraitFrame) {
    //   aboutAmbientTl.to(
    //     portraitFrame,
    //     { y: -8, duration: 4.2, yoyo: true, repeat: -1, ease: "sine.inOut" },
    //     0
    //   );
    // }

    if (milestoneIcon) {
      aboutAmbientTl.to(
        milestoneIcon,
        { rotation: 10, scale: 1.15, duration: 2, yoyo: true, repeat: -1, ease: "power1.inOut" },
        0.5
      );
    }

    const valueIcons = memorialSection.querySelectorAll(".mm-value-icon-box i");
    if (valueIcons.length > 0) {
      aboutAmbientTl.to(
        valueIcons,
        { y: -3, duration: 2.5, stagger: 0.35, yoyo: true, repeat: -1, ease: "sine.inOut" },
        0.2
      );
    }

    ScrollTrigger.create({
      trigger: memorialSection,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => aboutAmbientTl.play(),
      onLeave: () => aboutAmbientTl.pause(),
      onEnterBack: () => aboutAmbientTl.play(),
      onLeaveBack: () => aboutAmbientTl.pause(),
    });
  }

  // --------------------------------------------------------
  // Result Section (Giving in Numbers & Rolling Counters)
  // Detailed Multi-Directional Entrance, Counters & All-Time Motion
  // --------------------------------------------------------
  const resultSection = document.querySelector(".result-section");
  const counters = document.querySelectorAll(".counter-box .counter");

  if (resultSection) {
    const resultTitleWrap = resultSection.querySelector(".section-title-wrapper");
    const resDot = resultSection.querySelector(".section-title-wrapper .section-subtitle-dot");
    const resSubtitle = resultSection.querySelector(".section-title-wrapper .section-subtitle");
    const resTitle = resultSection.querySelector(".section-title-wrapper .section-title");
    const resTextBox = resultSection.querySelector(".section-title-wrapper .section-text-box");

    const resultWraps = resultSection.querySelectorAll(".result-wrap");

    // 1. Title Block Granular Entrance
    if (resultTitleWrap) {
      if (resDot) gsap.set(resDot, { scale: 0, opacity: 0 });
      if (resSubtitle) gsap.set(resSubtitle, { x: -20, opacity: 0 });
      if (resTitle) gsap.set(resTitle, { y: 35, opacity: 0 });
      if (resTextBox) gsap.set(resTextBox, { y: 20, opacity: 0 });

      const resHeaderTl = gsap.timeline({ paused: true });

      if (resDot) {
        resHeaderTl.fromTo(
          resDot,
          { scale: 0, opacity: 0, immediateRender: true },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(3)" },
          0
        );
      }

      if (resSubtitle) {
        resHeaderTl.fromTo(
          resSubtitle,
          { x: -20, opacity: 0, immediateRender: true },
          { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          0.08
        );
      }

      if (resTitle) {
        resHeaderTl.fromTo(
          resTitle,
          { y: 35, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          0.16
        );
      }

      if (resTextBox) {
        resHeaderTl.fromTo(
          resTextBox,
          { y: 20, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          0.26
        );
      }

      ScrollTrigger.create({
        trigger: resultTitleWrap,
        start: "top 85%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        animation: resHeaderTl,
      });
    }

    // 2. Result Cards Granular 3-Column Kinetic Entrance
    if (resultWraps.length >= 3) {
      // Column 1: Meals Served (.meal-box)
      const col1 = resultWraps[0];
      const mealBox = col1.querySelector(".meal-box");
      const mealShape = col1.querySelector(".meal-shape");
      const mealContent = col1.querySelector(".result-content._2");
      const mealPlus = col1.querySelector(".count-number-wrap .count-number:last-child");

      if (mealBox) {
        gsap.set(mealBox, { y: 55, scale: 0.94, opacity: 0 });
        if (mealShape) gsap.set(mealShape, { scale: 0.85, rotation: -12, opacity: 0 });
        if (mealPlus) gsap.set(mealPlus, { scale: 0, rotation: -40, opacity: 0 });
        if (mealContent) gsap.set(mealContent, { y: 22, opacity: 0 });

        const col1Tl = gsap.timeline({ paused: true });

        col1Tl.fromTo(
          mealBox,
          { y: 55, scale: 0.94, opacity: 0, immediateRender: true },
          { y: 0, scale: 1, opacity: 1, duration: 0.85, ease: "power3.out" },
          0
        );

        if (mealShape) {
          col1Tl.fromTo(
            mealShape,
            { scale: 0.85, rotation: -12, opacity: 0, immediateRender: true },
            { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: "back.out(1.4)" },
            0.15
          );
        }

        if (mealPlus) {
          col1Tl.fromTo(
            mealPlus,
            { scale: 0, rotation: -40, opacity: 0, immediateRender: true },
            { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: "back.out(2.5)" },
            0.25
          );
        }

        if (mealContent) {
          col1Tl.fromTo(
            mealContent,
            { y: 22, opacity: 0, immediateRender: true },
            { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" },
            0.3
          );
        }

        ScrollTrigger.create({
          trigger: col1,
          start: "top 85%",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
          animation: col1Tl,
        });
      }

      // Column 2: Families Supported (Top Image, Bottom Counter Box)
      const col2 = resultWraps[1];
      const col2ImgBox = col2.querySelector(".result-image-box");
      const col2Img = col2.querySelector(".result-image");
      const col2Box = col2.querySelector(".result-box");
      const col2Content = col2.querySelector(".result-content");
      const col2Plus = col2.querySelector(".count-number-wrap .count-number:last-child");

      if (col2) {
        if (col2ImgBox) gsap.set(col2ImgBox, { y: -35, x: -15, opacity: 0 });
        if (col2Img) gsap.set(col2Img, { scale: 1.4, transformOrigin: "center center" });
        if (col2Box) gsap.set(col2Box, { y: 40, x: 15, scale: 0.96, opacity: 0 });
        if (col2Plus) gsap.set(col2Plus, { scale: 0, opacity: 0 });
        if (col2Content) gsap.set(col2Content, { y: 15, opacity: 0 });

        const col2Tl = gsap.timeline({ paused: true });

        if (col2ImgBox) {
          col2Tl.fromTo(
            col2ImgBox,
            { y: -35, x: -15, opacity: 0, immediateRender: true },
            { y: 0, x: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
            0
          );
        }

        if (col2Img) {
          col2Tl.fromTo(
            col2Img,
            { scale: 1.4, transformOrigin: "center center", immediateRender: true },
            { scale: 1, duration: 1.3, ease: "power2.out" },
            0
          );
        }

        if (col2Box) {
          col2Tl.fromTo(
            col2Box,
            { y: 40, x: 15, scale: 0.96, opacity: 0, immediateRender: true },
            { y: 0, x: 0, scale: 1, opacity: 1, duration: 0.85, ease: "power3.out" },
            0.1
          );
        }

        if (col2Plus) {
          col2Tl.fromTo(
            col2Plus,
            { scale: 0, opacity: 0, immediateRender: true },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
            0.25
          );
        }

        if (col2Content) {
          col2Tl.fromTo(
            col2Content,
            { y: 15, opacity: 0, immediateRender: true },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            0.3
          );
        }

        ScrollTrigger.create({
          trigger: col2,
          start: "top 85%",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
          animation: col2Tl,
        });
      }

      // Column 3: Volunteers Engaged (Top Counter Box, Bottom Image)
      const col3 = resultWraps[2];
      const col3Box = col3.querySelector(".result-box");
      const col3ImgBox = col3.querySelector(".result-image-box");
      const col3Img = col3.querySelector(".result-image");
      const col3Content = col3.querySelector(".result-content");
      const col3Plus = col3.querySelector(".count-number-wrap .count-number:last-child");

      if (col3) {
        if (col3Box) gsap.set(col3Box, { y: -35, x: -15, scale: 0.96, opacity: 0 });
        if (col3ImgBox) gsap.set(col3ImgBox, { y: 40, x: 15, opacity: 0 });
        if (col3Img) gsap.set(col3Img, { scale: 1.4, transformOrigin: "center center" });
        if (col3Plus) gsap.set(col3Plus, { scale: 0, opacity: 0 });
        if (col3Content) gsap.set(col3Content, { y: 15, opacity: 0 });

        const col3Tl = gsap.timeline({ paused: true });

        if (col3Box) {
          col3Tl.fromTo(
            col3Box,
            { y: -35, x: -15, scale: 0.96, opacity: 0, immediateRender: true },
            { y: 0, x: 0, scale: 1, opacity: 1, duration: 0.85, ease: "power3.out" },
            0
          );
        }

        if (col3ImgBox) {
          col3Tl.fromTo(
            col3ImgBox,
            { y: 40, x: 15, opacity: 0, immediateRender: true },
            { y: 0, x: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
            0.1
          );
        }

        if (col3Img) {
          col3Tl.fromTo(
            col3Img,
            { scale: 1.4, transformOrigin: "center center", immediateRender: true },
            { scale: 1, duration: 1.3, ease: "power2.out" },
            0.1
          );
        }

        if (col3Plus) {
          col3Tl.fromTo(
            col3Plus,
            { scale: 0, opacity: 0, immediateRender: true },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
            0.25
          );
        }

        if (col3Content) {
          col3Tl.fromTo(
            col3Content,
            { y: 15, opacity: 0, immediateRender: true },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            0.3
          );
        }

        ScrollTrigger.create({
          trigger: col3,
          start: "top 85%",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
          animation: col3Tl,
        });
      }
    }

    // 3. Rolling Mechanical Digit Counters
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

    ScrollTrigger.create({
      trigger: resultSection,
      start: "top 85%",
      end: "bottom top",
      onEnter: playCounters,
      onLeave: resetCounters,
      onEnterBack: playCounters,
      onLeaveBack: resetCounters,
    });

    // 4. All-Time Continuous Ambient Motion (Active While In View)
    const resultAmbientTl = gsap.timeline({ paused: true, repeat: -1 });

    if (resDot) {
      resultAmbientTl.to(
        resDot,
        { scale: 1.45, opacity: 0.45, duration: 1.4, yoyo: true, repeat: -1, ease: "sine.inOut" },
        0
      );
    }

    const mealShape = resultSection.querySelector(".meal-shape");
    if (mealShape) {
      resultAmbientTl.to(
        mealShape,
        { rotation: 3, scale: 1.04, y: -4, duration: 4.5, yoyo: true, repeat: -1, ease: "sine.inOut" },
        0
      );
    }

    const plusSigns = Array.from(resultSection.querySelectorAll(".count-number")).filter(
      (el) => el.textContent.trim() === "+"
    );
    if (plusSigns.length > 0) {
      resultAmbientTl.to(
        plusSigns,
        { scale: 1.2, duration: 2, stagger: 0.3, yoyo: true, repeat: -1, ease: "sine.inOut" },
        0.3
      );
    }

    ScrollTrigger.create({
      trigger: resultSection,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => resultAmbientTl.play(),
      onLeave: () => resultAmbientTl.pause(),
      onEnterBack: () => resultAmbientTl.play(),
      onLeaveBack: () => resultAmbientTl.pause(),
    });
  }

  // --------------------------------------------------------
  // Cause Section - Detailed Multi-Layer Cascade & Continuous Motion
  // (Images scale 1.4 -> 1, individual badges, goals, heart pulse)
  // --------------------------------------------------------
  const causeSection = document.querySelector(".cause-section");
  if (causeSection) {
    // 1. Header Title & Subtitle Reveal
    const causeTitleBox = causeSection.querySelector(".cause-top-box .section-title-box");
    const causeDot = causeSection.querySelector(".cause-top-box .section-subtitle-dot");
    const causeSubtitle = causeSection.querySelector(".cause-top-box .section-subtitle");
    const causeTitle = causeSection.querySelector(".cause-top-box .section-title");

    if (causeTitleBox) {
      if (causeDot) gsap.set(causeDot, { scale: 0, opacity: 0 });
      if (causeSubtitle) gsap.set(causeSubtitle, { x: -20, opacity: 0 });
      if (causeTitle) gsap.set(causeTitle, { y: 35, opacity: 0 });

      const headerTl = gsap.timeline({ paused: true });

      if (causeDot) {
        headerTl.fromTo(
          causeDot,
          { scale: 0, opacity: 0, immediateRender: true },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(3)" },
          0
        );
      }

      if (causeSubtitle) {
        headerTl.fromTo(
          causeSubtitle,
          { x: -20, opacity: 0, immediateRender: true },
          { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          0.08
        );
      }

      if (causeTitle) {
        headerTl.fromTo(
          causeTitle,
          { y: 35, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          0.16
        );
      }

      ScrollTrigger.create({
        trigger: causeTitleBox,
        start: "top 85%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        animation: headerTl,
      });
    }

    // 2. Cause Cards Granular Content Cascade (Instrumented with Runtime Diagnostics)
    const initCauseCards = (items, startTrigger) => {
      items.forEach((item, idx) => {
        const imgBox = item.querySelector(".cause-image-box");
        const img = item.querySelector(".cause-image");
        const shapeBox = item.querySelector(".cause-shape-box");
        const shape = item.querySelector(".cause-shape");
        const subBadge = item.querySelector(".causes-subtitle-box");
        const title = item.querySelector(".cause-title");
        const textBox = item.querySelector(".cause-text-box");
        const goalWrap = item.querySelector(".cause-goal-wrap");
        const goalAmount = item.querySelector(".cause-goal-amount");
        const btn = item.querySelector(".theme-button");
        const btnIcon = item.querySelector(".theme-btn-icon");

        const cardTitleText = title ? title.textContent.trim().slice(0, 30) : `Card #${idx}`;

        // 1. Establish explicit initial states so elements are guaranteed to start hidden
        // and prevent delayed tweens from sitting at default CSS opacity: 1 on forward scroll
        if (imgBox) gsap.set(imgBox, { y: 35, opacity: 0 });
        if (img) gsap.set(img, { scale: 1.4, transformOrigin: "center center" });
        if (shapeBox || shape) gsap.set(shapeBox || shape, { scaleY: 0.75, opacity: 0, transformOrigin: "bottom center" });
        if (subBadge) gsap.set(subBadge, { x: -20, opacity: 0 });
        if (title) gsap.set(title, { y: 25, opacity: 0 });
        if (textBox) gsap.set(textBox, { y: 20, opacity: 0 });
        if (goalWrap) gsap.set(goalWrap, { y: 25, scale: 0.95, opacity: 0 });
        if (goalAmount) gsap.set(goalAmount, { scale: 0.6, opacity: 0 });
        if (btn) gsap.set(btn, { x: 15, opacity: 0 });
        if (btnIcon) gsap.set(btnIcon, { scale: 0, rotation: -30, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        // Container soft rise
        if (imgBox) {
          tl.fromTo(
            imgBox,
            { y: 35, opacity: 0, immediateRender: true },
            { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
            0
          );
        }

        // Image Cinematic Zoom: scale 1.4 -> 1
        if (img) {
          tl.fromTo(
            img,
            { scale: 1.4, transformOrigin: "center center", immediateRender: true },
            { scale: 1, duration: 1.3, ease: "power2.out" },
            0
          );
        }

        // Camouflage decorative vertical pattern band
        if (shapeBox || shape) {
          tl.fromTo(
            shapeBox || shape,
            { scaleY: 0.75, opacity: 0, transformOrigin: "bottom center", immediateRender: true },
            { scaleY: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
            0.1
          );
        }

        // Category Tag / Subtitle
        if (subBadge) {
          tl.fromTo(
            subBadge,
            { x: -20, opacity: 0, immediateRender: true },
            { x: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
            0.18
          );
        }

        // Cause Title
        if (title) {
          tl.fromTo(
            title,
            { y: 25, opacity: 0, immediateRender: true },
            { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
            0.25
          );
        }

        // Cause Description
        if (textBox) {
          tl.fromTo(
            textBox,
            { y: 20, opacity: 0, immediateRender: true },
            { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
            0.33
          );
        }

        // Goal Capsule
        if (goalWrap) {
          tl.fromTo(
            goalWrap,
            { y: 25, scale: 0.95, opacity: 0, immediateRender: true },
            { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.4)" },
            0.4
          );
        }

        // Goal Amount Elastic Pop
        if (goalAmount) {
          tl.fromTo(
            goalAmount,
            { scale: 0.6, opacity: 0, immediateRender: true },
            { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(2)" },
            0.5
          );
        }

        // Button Slide-in
        if (btn) {
          tl.fromTo(
            btn,
            { x: 15, opacity: 0, immediateRender: true },
            { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            0.52
          );
        }

        // Heart Icon Elastic Rotation Bounce
        if (btnIcon) {
          tl.fromTo(
            btnIcon,
            { scale: 0, rotation: -30, opacity: 0, immediateRender: true },
            { scale: 1, rotation: 0, opacity: 1, duration: 0.55, ease: "back.out(2.5)" },
            0.6
          );
        }

        // Card-level continuous ambient motion (plays seamlessly once entrance completes)
        let cardAmbient = null;
        const playAmbient = () => {
          if (!cardAmbient) {
            cardAmbient = gsap.timeline({ repeat: -1 });
            if (btnIcon) {
              cardAmbient.to(
                btnIcon,
                { scale: 1.22, duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut" },
                0
              );
            }
            if (goalAmount) {
              cardAmbient.to(
                goalAmount,
                { scale: 1.05, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut" },
                0.1
              );
            }
          } else {
            cardAmbient.play();
          }
        };

        const stopAmbient = () => {
          if (cardAmbient) {
            cardAmbient.pause();
            if (btnIcon) gsap.set(btnIcon, { scale: 1, rotation: 0 });
            if (goalAmount) gsap.set(goalAmount, { scale: 1 });
          }
        };

        // --- DIAGNOSTICS: Timeline lifecycle instrumentation ---
        window.__CAUSE_DIAGNOSTICS__ = window.__CAUSE_DIAGNOSTICS__ || [];
        const recordDiag = (event, details) => {
          const entry = {
            card: idx,
            title: cardTitleText,
            timeMs: Date.now(),
            event,
            details,
          };
          window.__CAUSE_DIAGNOSTICS__.push(entry);
        };

        tl.eventCallback("onStart", () => {
          const checkOverwrites = () => {
            const targets = [imgBox, img, subBadge, title, textBox, goalWrap, goalAmount, btn, btnIcon].filter(Boolean);
            const extraTweens = targets.map((t) => ({
              tag: t.className,
              count: gsap.getTweensOf(t).length,
            })).filter((x) => x.count > 1);
            return extraTweens;
          };
          const overwrites = checkOverwrites();
          console.log(`%c[CAUSE_DIAG] Card #${idx} ("${cardTitleText}") -> tl onStart (forward: ${tl.reversed() ? 'reverse' : 'forward'})`, "color: #00aa00; font-weight: bold", {
            progress: tl.progress().toFixed(2),
            imgScale: img ? gsap.getProperty(img, "scale") : null,
            titleOpacity: title ? gsap.getProperty(title, "opacity") : null,
            goalOpacity: goalWrap ? gsap.getProperty(goalWrap, "opacity") : null,
            potentialOverwrites: overwrites.length > 0 ? overwrites : "none",
          });
          recordDiag("tl_onStart", { progress: tl.progress(), overwrites });
        });

        tl.eventCallback("onComplete", () => {
          console.log(`%c[CAUSE_DIAG] Card #${idx} ("${cardTitleText}") -> tl onComplete`, "color: #0088cc; font-weight: bold", {
            imgScale: img ? gsap.getProperty(img, "scale") : null,
            titleOpacity: title ? gsap.getProperty(title, "opacity") : null,
            goalOpacity: goalWrap ? gsap.getProperty(goalWrap, "opacity") : null,
            btnOpacity: btn ? gsap.getProperty(btn, "opacity") : null,
          });
          recordDiag("tl_onComplete", { progress: 1 });
          playAmbient();
        });

        tl.eventCallback("onReverseComplete", () => {
          console.log(`%c[CAUSE_DIAG] Card #${idx} ("${cardTitleText}") -> tl onReverseComplete (back to 0)`, "color: #cc0088; font-weight: bold");
          recordDiag("tl_onReverseComplete", { progress: 0 });
          stopAmbient();
        });

        const st = ScrollTrigger.create({
          trigger: item,
          start: startTrigger,
          end: "bottom top",
          toggleActions: "play reverse play reverse",
          animation: tl,
          onToggle: (self) => {
            console.log(`%c[CAUSE_DIAG] Card #${idx} onToggle`, "color: #ff8800", {
              isActive: self.isActive,
              direction: self.direction === 1 ? "DOWN (forward)" : "UP (reverse)",
              progress: self.progress.toFixed(3),
            });
            recordDiag("st_onToggle", { isActive: self.isActive, direction: self.direction, progress: self.progress });
          },
          onEnter: (self) => {
            console.log(`%c[CAUSE_DIAG] Card #${idx} onEnter (SCROLL DOWN)`, "background: #222; color: #bada55; font-size: 13px; font-weight: bold", {
              start: self.start,
              end: self.end,
              scrollY: window.scrollY,
              direction: self.direction,
              itemTopRect: item.getBoundingClientRect().top,
            });
            recordDiag("st_onEnter", { start: self.start, end: self.end, scrollY: window.scrollY });
            stopAmbient();
          },
          onLeave: (self) => {
            console.log(`%c[CAUSE_DIAG] Card #${idx} onLeave (scrolled past bottom)`, "color: #888", {
              progress: self.progress.toFixed(3),
            });
            recordDiag("st_onLeave", { progress: self.progress });
            stopAmbient();
          },
          onEnterBack: (self) => {
            console.log(`%c[CAUSE_DIAG] Card #${idx} onEnterBack (SCROLL UP)`, "background: #222; color: #55daea; font-size: 13px; font-weight: bold", {
              scrollY: window.scrollY,
              direction: self.direction,
            });
            recordDiag("st_onEnterBack", { scrollY: window.scrollY });
            stopAmbient();
          },
          onLeaveBack: (self) => {
            console.log(`%c[CAUSE_DIAG] Card #${idx} onLeaveBack (scrolled above top)`, "color: #888", {
              progress: self.progress.toFixed(3),
            });
            recordDiag("st_onLeaveBack", { progress: self.progress });
            stopAmbient();
          },
        });

        console.log(`%c[CAUSE_DIAG] Card #${idx} ("${cardTitleText}") Trigger Created`, "color: #333; font-weight: bold", {
          triggerEl: item,
          startSetting: startTrigger,
          computedStart: st.start,
          computedEnd: st.end,
          offsetTop: item.offsetTop,
          rectTop: item.getBoundingClientRect().top,
          height: item.offsetHeight,
          elementsFound: {
            imgBox: !!imgBox,
            img: !!img,
            subBadge: !!subBadge,
            title: !!title,
            textBox: !!textBox,
            goalWrap: !!goalWrap,
            goalAmount: !!goalAmount,
            btn: !!btn,
            btnIcon: !!btnIcon,
          },
        });
      });
    };

    const mmCause = gsap.matchMedia();
    mmCause.add("(min-width: 992px)", () => {
      const desktopItems = causeSection.querySelectorAll(".cause-wrapper-inner.hide-md .cause-cms");
      if (desktopItems.length > 0) {
        initCauseCards(desktopItems, "top 85%");
      }
    });

    mmCause.add("(max-width: 991px)", () => {
      const mobileItems = causeSection.querySelectorAll(".cause-wrapper-inner.show-md .cause-cms");
      if (mobileItems.length > 0) {
        initCauseCards(mobileItems, "top 85%");
      }
    });

    // 3. All-Time Continuous Ambient Motion (Active While In View)
    const causeAmbientTl = gsap.timeline({ paused: true, repeat: -1 });

    if (causeDot) {
      causeAmbientTl.to(
        causeDot,
        { scale: 1.45, opacity: 0.45, duration: 1.4, yoyo: true, repeat: -1, ease: "sine.inOut" },
        0
      );
    }

    const causeShapes = causeSection.querySelectorAll(".cause-shape");
    if (causeShapes.length > 0) {
      causeAmbientTl.to(
        causeShapes,
        { y: -5, duration: 3.8, stagger: 0.35, yoyo: true, repeat: -1, ease: "sine.inOut" },
        0.1
      );
    }

    ScrollTrigger.create({
      trigger: causeSection,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => causeAmbientTl.play(),
      onLeave: () => causeAmbientTl.pause(),
      onEnterBack: () => causeAmbientTl.play(),
      onLeaveBack: () => causeAmbientTl.pause(),
    });
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
  // Donate Section - Independent Kinetic Cascade for Each Part
  // (Part 1 Volunteer, Part 2 Donation, Part 3 Community - Each Animated Independently)
  // --------------------------------------------------------
  const donateSection = document.querySelector(".donate-section");
  if (donateSection) {
    const donateBoxes = donateSection.querySelectorAll(".donate-box");

    // Helper for responsive start trigger
    const donateStart = "top 85%";

    // Part 1: Volunteer Card (Independent Animation)
    if (donateBoxes.length >= 1) {
      const box1 = donateBoxes[0];
      const subtitle1 = box1.querySelector(".donate-subtitle");
      const title1 = box1.querySelector(".donate-title");
      const text1 = box1.querySelector(".donate-text");
      const btn1 = box1.querySelector(".theme-button");
      const imgBox1 = box1.querySelector(".donate-image-box");
      const img1 = box1.querySelector(".donate-image");

      // Explicit Initial States
      if (subtitle1) gsap.set(subtitle1, { x: -25, opacity: 0 });
      if (title1) gsap.set(title1, { y: 28, opacity: 0 });
      if (text1) gsap.set(text1, { y: 20, opacity: 0 });
      if (btn1) gsap.set(btn1, { y: 20, scale: 0.92, opacity: 0 });
      if (imgBox1) gsap.set(imgBox1, { y: 35, opacity: 0 });
      if (img1) gsap.set(img1, { scale: 1.4, transformOrigin: "center center" });

      const box1Tl = gsap.timeline({ paused: true });

      if (imgBox1) {
        box1Tl.fromTo(
          imgBox1,
          { y: 35, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
          0
        );
      }

      if (img1) {
        box1Tl.fromTo(
          img1,
          { scale: 1.4, transformOrigin: "center center", immediateRender: true },
          { scale: 1, duration: 1.3, ease: "power2.out" },
          0
        );
      }

      if (subtitle1) {
        box1Tl.fromTo(
          subtitle1,
          { x: -25, opacity: 0, immediateRender: true },
          { x: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
          0.12
        );
      }

      if (title1) {
        box1Tl.fromTo(
          title1,
          { y: 28, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
          0.2
        );
      }

      if (text1) {
        box1Tl.fromTo(
          text1,
          { y: 20, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" },
          0.28
        );
      }

      if (btn1) {
        box1Tl.fromTo(
          btn1,
          { y: 20, scale: 0.92, opacity: 0, immediateRender: true },
          { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" },
          0.36
        );
      }

      ScrollTrigger.create({
        trigger: box1,
        start: donateStart,
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        animation: box1Tl,
      });
    }

    // Part 2: Donation Card (Independent Animation - Inverted Layout)
    if (donateBoxes.length >= 2) {
      const box2 = donateBoxes[1];
      const imgBox2 = box2.querySelector(".donate-image-box");
      const img2 = box2.querySelector(".donate-image");
      const subtitle2 = box2.querySelector(".donate-subtitle");
      const title2 = box2.querySelector(".donate-title");
      const text2 = box2.querySelector(".donate-text");
      const btn2 = box2.querySelector(".theme-button");
      const btnIcon2 = box2.querySelector(".theme-btn-icon:not(.d-none)");

      // Explicit Initial States
      if (imgBox2) gsap.set(imgBox2, { y: -35, x: -15, opacity: 0 });
      if (img2) gsap.set(img2, { scale: 1.4, transformOrigin: "center center" });
      if (subtitle2) gsap.set(subtitle2, { x: 25, opacity: 0 });
      if (title2) gsap.set(title2, { y: 28, opacity: 0 });
      if (text2) gsap.set(text2, { y: 20, opacity: 0 });
      if (btn2) gsap.set(btn2, { y: 20, scale: 0.92, opacity: 0 });
      if (btnIcon2) gsap.set(btnIcon2, { scale: 0, rotation: -30, opacity: 0 });

      const box2Tl = gsap.timeline({ paused: true });

      if (imgBox2) {
        box2Tl.fromTo(
          imgBox2,
          { y: -35, x: -15, opacity: 0, immediateRender: true },
          { y: 0, x: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
          0
        );
      }

      if (img2) {
        box2Tl.fromTo(
          img2,
          { scale: 1.4, transformOrigin: "center center", immediateRender: true },
          { scale: 1, duration: 1.3, ease: "power2.out" },
          0
        );
      }

      if (subtitle2) {
        box2Tl.fromTo(
          subtitle2,
          { x: 25, opacity: 0, immediateRender: true },
          { x: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
          0.12
        );
      }

      if (title2) {
        box2Tl.fromTo(
          title2,
          { y: 28, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
          0.2
        );
      }

      if (text2) {
        box2Tl.fromTo(
          text2,
          { y: 20, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" },
          0.28
        );
      }

      if (btn2) {
        box2Tl.fromTo(
          btn2,
          { y: 20, scale: 0.92, opacity: 0, immediateRender: true },
          { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" },
          0.36
        );
      }

      if (btnIcon2) {
        box2Tl.fromTo(
          btnIcon2,
          { scale: 0, rotation: -30, opacity: 0, immediateRender: true },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.55, ease: "back.out(2.5)" },
          0.44
        );
      }

      // Card 2 Ambient Heartbeat (isolated onComplete)
      let heartAmbient = null;
      box2Tl.eventCallback("onComplete", () => {
        if (btnIcon2) {
          if (!heartAmbient) {
            heartAmbient = gsap.to(btnIcon2, {
              scale: 1.25,
              duration: 1.6,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
            });
          } else {
            heartAmbient.play();
          }
        }
      });
      box2Tl.eventCallback("onReverseComplete", () => {
        if (heartAmbient) {
          heartAmbient.pause();
          if (btnIcon2) gsap.set(btnIcon2, { scale: 0, rotation: -30, opacity: 0 });
        }
      });

      ScrollTrigger.create({
        trigger: box2,
        start: donateStart,
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        animation: box2Tl,
      });
    }

    // Part 3: Community Card (Independent Animation - Image with Marquee)
    if (donateBoxes.length >= 3) {
      const box3 = donateBoxes[2];
      const subtitle3 = box3.querySelector(".donate-subtitle");
      const title3 = box3.querySelector(".donate-title");
      const text3 = box3.querySelector(".donate-text");
      const btn3 = box3.querySelector(".theme-button");
      const imgBox3 = box3.querySelector(".donate-image-box");
      const img3 = box3.querySelector(".donate-image");
      const marquee3 = box3.querySelector(".marquee-box");

      // Explicit Initial States
      if (subtitle3) gsap.set(subtitle3, { x: -25, opacity: 0 });
      if (title3) gsap.set(title3, { y: 28, opacity: 0 });
      if (text3) gsap.set(text3, { y: 20, opacity: 0 });
      if (btn3) gsap.set(btn3, { y: 20, scale: 0.92, opacity: 0 });
      if (imgBox3) gsap.set(imgBox3, { y: 35, x: 15, opacity: 0 });
      if (img3) gsap.set(img3, { scale: 1.4, transformOrigin: "center center" });
      if (marquee3) gsap.set(marquee3, { opacity: 0, y: -20 });

      const box3Tl = gsap.timeline({ paused: true });

      if (imgBox3) {
        box3Tl.fromTo(
          imgBox3,
          { y: 35, x: 15, opacity: 0, immediateRender: true },
          { y: 0, x: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
          0
        );
      }

      if (img3) {
        box3Tl.fromTo(
          img3,
          { scale: 1.4, transformOrigin: "center center", immediateRender: true },
          { scale: 1, duration: 1.3, ease: "power2.out" },
          0
        );
      }

      if (subtitle3) {
        box3Tl.fromTo(
          subtitle3,
          { x: -25, opacity: 0, immediateRender: true },
          { x: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
          0.12
        );
      }

      if (title3) {
        box3Tl.fromTo(
          title3,
          { y: 28, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
          0.2
        );
      }

      if (text3) {
        box3Tl.fromTo(
          text3,
          { y: 20, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" },
          0.28
        );
      }

      if (btn3) {
        box3Tl.fromTo(
          btn3,
          { y: 20, scale: 0.92, opacity: 0, immediateRender: true },
          { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" },
          0.36
        );
      }

      if (marquee3) {
        box3Tl.fromTo(
          marquee3,
          { opacity: 0, y: -20, immediateRender: true },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          0.3
        );
      }

      ScrollTrigger.create({
        trigger: box3,
        start: donateStart,
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        animation: box3Tl,
      });
    }

    // All-Time Continuous Ambient Motion: Infinite Horizontal Marquee Ticker
    const marqueeInner = donateSection.querySelector(".marquee-inner");
    let marqueeTween = null;
    if (marqueeInner) {
      marqueeTween = gsap.to(marqueeInner, {
        xPercent: -33.333,
        duration: 18,
        ease: "none",
        repeat: -1,
        paused: true,
      });
    }

    ScrollTrigger.create({
      trigger: donateSection,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {
        if (marqueeTween) marqueeTween.play();
      },
      onLeave: () => {
        if (marqueeTween) marqueeTween.pause();
      },
      onEnterBack: () => {
        if (marqueeTween) marqueeTween.play();
      },
      onLeaveBack: () => {
        if (marqueeTween) marqueeTween.pause();
      },
    });
  }

  // --------------------------------------------------------
  // Review Section - 3D Perspective Tilt & Stamp Badges (Bidirectional)
  // --------------------------------------------------------
  const reviewSection = document.querySelector(".review-section.two");
  if (reviewSection) {
    const titleBox = reviewSection.querySelector(".section-title-box");
    if (titleBox) {
      gsap.set(titleBox, { y: 35, scale: 0.95, opacity: 0 });
      gsap.fromTo(
        titleBox,
        { y: 35, scale: 0.95, opacity: 0, immediateRender: true },
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
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    const testiBlocks = reviewSection.querySelectorAll(".review-grid .testimonial-block");
    if (testiBlocks.length > 0) {
      gsap.set(testiBlocks, { y: 50, opacity: 0 });

      testiBlocks.forEach((block, idx) => {
        const quoteIcon = block.querySelector(".testi-quote-icon");
        const authorImg = block.querySelector(".review-image");
        const authorInfo = block.querySelector(".testi-info-box");
        const tiltAngle = idx % 2 === 0 ? -1.8 : 1.8;

        if (quoteIcon) gsap.set(quoteIcon, { scale: 0.2, rotation: -30, opacity: 0 });
        if (authorImg) gsap.set(authorImg, { scale: 0.7, opacity: 0 });
        if (authorInfo) gsap.set(authorInfo, { x: -10, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        tl.fromTo(
          block,
          { y: 50, rotationZ: tiltAngle, opacity: 0, immediateRender: true },
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
            { scale: 0.2, rotation: -30, opacity: 0, immediateRender: true },
            { scale: 1, rotation: 0, opacity: 1, duration: 0.5, ease: "back.out(2)" },
            0.2
          );
        }

        if (authorImg) {
          tl.fromTo(
            authorImg,
            { scale: 0.7, opacity: 0, immediateRender: true },
            { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.5)" },
            0.25
          );
        }

        if (authorInfo) {
          tl.fromTo(
            authorInfo,
            { x: -10, opacity: 0, immediateRender: true },
            { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
            0.3
          );
        }

        ScrollTrigger.create({
          trigger: block,
          start: "top 85%",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
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
      gsap.set(ctaWrapper, { scale: 0.94, opacity: 0.7, borderRadius: "36px" });
      if (ctaTitle) gsap.set(ctaTitle, { y: 35, opacity: 0 });
      if (ctaSpans.length > 0) gsap.set(ctaSpans, { scale: 0, opacity: 0, rotation: -12 });
      if (ctaText) gsap.set(ctaText, { y: 20, opacity: 0 });
      if (ctaBtn) gsap.set(ctaBtn, { scale: 0.88, opacity: 0 });

      const tl = gsap.timeline({ paused: true });

      // 1. Cinematic canvas expansion
      tl.fromTo(
        ctaWrapper,
        { scale: 0.94, opacity: 0.7, borderRadius: "36px", immediateRender: true },
        { scale: 1, opacity: 1, borderRadius: "20px", duration: 1, ease: "power3.out" },
        0
      );

      // 2. Headline glide
      if (ctaTitle) {
        tl.fromTo(
          ctaTitle,
          { y: 35, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          0.15
        );
      }

      // 3. Floating face capsule pill bubbles pop out with elastic bounce
      if (ctaSpans.length > 0) {
        tl.fromTo(
          ctaSpans,
          { scale: 0, opacity: 0, rotation: -12, immediateRender: true },
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
          { y: 20, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          0.35
        );
      }

      if (ctaBtn) {
        tl.fromTo(
          ctaBtn,
          { scale: 0.88, opacity: 0, immediateRender: true },
          { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.6)" },
          0.45
        );
      }

      ScrollTrigger.create({
        trigger: ctaSection,
        start: "top 80%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        animation: tl,
      });
    }
  }

  // --------------------------------------------------------
  // Blog Section - Editorial Magazine Card Elevation & Zoom (Bidirectional)
  // --------------------------------------------------------
  const blogSection = document.querySelector(".blog-section");
  if (blogSection) {
    const blogStart = "top 85%";

    // 1. Header Animation (Subtitle, Dot Pulse, Section Title)
    const titleBox = blogSection.querySelector(".section-title-box");
    const subDot = blogSection.querySelector(".section-subtitle-dot");
    const subText = blogSection.querySelector(".section-subtitle");
    const secTitle = blogSection.querySelector(".section-title");

    if (titleBox) {
      if (subText) gsap.set(subText, { x: -25, opacity: 0 });
      if (secTitle) gsap.set(secTitle, { y: 32, opacity: 0 });

      const headerTl = gsap.timeline({ paused: true });

      if (subText) {
        headerTl.fromTo(
          subText,
          { x: -25, opacity: 0, immediateRender: true },
          { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          0
        );
      }

      if (secTitle) {
        headerTl.fromTo(
          secTitle,
          { y: 32, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          0.1
        );
      }

      ScrollTrigger.create({
        trigger: titleBox,
        start: "top 78%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        animation: headerTl,
      });

      // Continuous Subtitle Dot Ambient Breathing
      if (subDot) {
        const dotAmbient = gsap.to(subDot, {
          scale: 1.45,
          opacity: 0.45,
          duration: 1.4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          paused: true,
        });

        ScrollTrigger.create({
          trigger: blogSection,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => dotAmbient.play(),
          onLeave: () => dotAmbient.pause(),
          onEnterBack: () => dotAmbient.play(),
          onLeaveBack: () => dotAmbient.pause(),
        });
      }
    }

    // 2. Blog Cards Cascade (Image zoom 1.4 -> 1, category badge pop, date icon rotation, title rise, readmore bounce)
    const blogCards = blogSection.querySelectorAll(".blog-cms .cms-item");
    if (blogCards.length > 0) {
      blogCards.forEach((card) => {
        const box = card.querySelector(".blog-box");
        const imgBox = card.querySelector(".blog-image-box");
        const img = card.querySelector(".blog-image");
        const catBadge = card.querySelector(".blog-cat");
        const dateBox = card.querySelector(".blog-date-box");
        const dateIcon = card.querySelector(".blog-date-icon");
        const dateText = card.querySelector(".blog-date");
        const blogTitle = card.querySelector(".blog-title");
        const readmore = card.querySelector(".readmore-box");
        const readmoreText = card.querySelector(".readmore-text");
        const readmoreIcon = card.querySelector(".readmore-icon");

        // Explicit Initial States on every single child element
        if (box) gsap.set(box, { y: 45, opacity: 0 });
        if (imgBox) gsap.set(imgBox, { opacity: 0, y: 15 });
        if (img) gsap.set(img, { scale: 1.4, transformOrigin: "center center" });
        if (catBadge) gsap.set(catBadge, { scale: 0.8, y: 10, opacity: 0 });
        if (dateIcon) gsap.set(dateIcon, { scale: 0, rotation: -45, opacity: 0 });
        if (dateText) gsap.set(dateText, { x: 10, opacity: 0 });
        if (blogTitle) gsap.set(blogTitle, { y: 22, opacity: 0 });
        if (readmoreText) gsap.set(readmoreText, { x: -15, opacity: 0 });
        if (readmoreIcon) gsap.set(readmoreIcon, { x: -12, scale: 0.6, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        // Card container rise
        if (box) {
          tl.fromTo(
            box,
            { y: 45, opacity: 0, immediateRender: true },
            { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
            0
          );
        }

        // Image container fade and image cinematic zoom (scale 1.4 -> 1)
        if (imgBox) {
          tl.fromTo(
            imgBox,
            { opacity: 0, y: 15, immediateRender: true },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            0.05
          );
        }

        if (img) {
          tl.fromTo(
            img,
            { scale: 1.4, transformOrigin: "center center", immediateRender: true },
            { scale: 1, duration: 1.3, ease: "power2.out" },
            0.05
          );
        }

        // Category Tag Pill Spring Pop
        if (catBadge) {
          tl.fromTo(
            catBadge,
            { scale: 0.8, y: 10, opacity: 0, immediateRender: true },
            { scale: 1, y: 0, opacity: 1, duration: 0.55, ease: "back.out(2)" },
            0.2
          );
        }

        // Date Clock Icon Rotation Pop
        if (dateIcon) {
          tl.fromTo(
            dateIcon,
            { scale: 0, rotation: -45, opacity: 0, immediateRender: true },
            { scale: 1, rotation: 0, opacity: 1, duration: 0.5, ease: "back.out(2.2)" },
            0.24
          );
        }

        // Date Text Fade
        if (dateText) {
          tl.fromTo(
            dateText,
            { x: 10, opacity: 0, immediateRender: true },
            { x: 0, opacity: 0.8, duration: 0.45, ease: "power2.out" },
            0.28
          );
        }

        // Blog Headline Rise
        if (blogTitle) {
          tl.fromTo(
            blogTitle,
            { y: 22, opacity: 0, immediateRender: true },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            0.32
          );
        }

        // Readmore Link Slide & Arrow Bounce
        if (readmoreText) {
          tl.fromTo(
            readmoreText,
            { x: -15, opacity: 0, immediateRender: true },
            { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            0.4
          );
        }

        if (readmoreIcon) {
          tl.fromTo(
            readmoreIcon,
            { x: -12, scale: 0.6, opacity: 0, immediateRender: true },
            { x: 0, scale: 1, opacity: 1, duration: 0.55, ease: "back.out(2)" },
            0.44
          );
        }

        ScrollTrigger.create({
          trigger: card,
          start: blogStart,
          end: "bottom top",
          toggleActions: "play reverse play reverse",
          animation: tl,
        });
      });
    }
  }

  // --------------------------------------------------------
  // Social Section - Rhythmic Cascade Wave & Icon Elastic Spring (Bidirectional)
  // --------------------------------------------------------
  const socialSection = document.querySelector(".social-section");
  if (socialSection) {
    const socialBoxes = socialSection.querySelectorAll(".social-box");
    const icons = socialSection.querySelectorAll(".social-icon");
    const texts = socialSection.querySelectorAll(".social-text");

    if (socialBoxes.length > 0) {
      // Explicit Initial States
      gsap.set(socialBoxes, { y: 35, opacity: 0, scale: 0.92 });
      if (icons.length > 0) gsap.set(icons, { scale: 0, rotation: -35, opacity: 0 });
      if (texts.length > 0) gsap.set(texts, { y: 15, opacity: 0 });

      const tl = gsap.timeline({ paused: true });

      // Staggered card pill entrance
      tl.fromTo(
        socialBoxes,
        { y: 35, opacity: 0, scale: 0.92, immediateRender: true },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "back.out(1.6)",
        },
        0
      );

      // Icon pop and spin
      if (icons.length > 0) {
        tl.fromTo(
          icons,
          { scale: 0, rotation: -35, opacity: 0, immediateRender: true },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: "back.out(2.2)",
          },
          0.12
        );
      }

      // Text label slide-up
      if (texts.length > 0) {
        tl.fromTo(
          texts,
          { y: 15, opacity: 0, immediateRender: true },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.08,
            ease: "power2.out",
          },
          0.2
        );
      }

      // Continuous ambient gentle floating wave across icons
      let socialAmbient = null;
      tl.eventCallback("onComplete", () => {
        if (icons.length > 0) {
          if (!socialAmbient) {
            socialAmbient = gsap.to(icons, {
              y: -4,
              duration: 2,
              stagger: 0.15,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
            });
          } else {
            socialAmbient.play();
          }
        }
      });
      tl.eventCallback("onReverseComplete", () => {
        if (socialAmbient) {
          socialAmbient.pause();
          if (icons.length > 0) gsap.set(icons, { y: 0, scale: 0, rotation: -35, opacity: 0 });
        }
      });

      ScrollTrigger.create({
        trigger: socialSection,
        start: "top 78%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        animation: tl,
      });
    }
  }

  // --------------------------------------------------------
  // Footer Section - Atmospheric Watermark Scrub Drift & Detailed Cascade (Bidirectional)
  // --------------------------------------------------------
  const footer = document.querySelector(".main-footer");
  if (footer) {
    // 1. Watermark Atmospheric Drift Scrub
    const floatText = footer.querySelector(".footer-float-text");
    if (floatText) {
      gsap.fromTo(
        floatText,
        { xPercent: -10, y: -10, opacity: 0.15 },
        {
          xPercent: 3,
          y: -10,
          opacity: 0.35,
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

    // 2. Detailed Content Cascade
    const ctaWidget = footer.querySelector(".footer-widget.about");
    const ctaTitle = ctaWidget ? ctaWidget.querySelector(".footer-title.two") : null;
    const ctaBtn = ctaWidget ? ctaWidget.querySelector(".theme-button") : null;
    const ctaIcon = ctaWidget ? ctaWidget.querySelector(".theme-btn-icon") : null;

    const navWidgets = footer.querySelectorAll(".footer-widget-wrap .footer-widget");
    const bottomBar = footer.querySelector(".footer-bottom");
    const copyrightText = footer.querySelector(".copyright-text");

    // Explicit Initial States
    if (ctaTitle) gsap.set(ctaTitle, { y: 35, opacity: 0 });
    if (ctaBtn) gsap.set(ctaBtn, { y: 22, scale: 0.9, opacity: 0 });
    if (ctaIcon) gsap.set(ctaIcon, { scale: 0, rotation: -30, opacity: 0 });

    navWidgets.forEach((w) => {
      const title = w.querySelector(".footer-title");
      const links = w.querySelectorAll(".footer-link");
      if (title) gsap.set(title, { y: 22, opacity: 0 });
      if (links.length > 0) gsap.set(links, { x: -14, opacity: 0 });
    });

    if (bottomBar) gsap.set(bottomBar, { opacity: 0 });
    if (copyrightText) gsap.set(copyrightText, { y: 15, opacity: 0 });

    const footerTl = gsap.timeline({ paused: true });

    // Callout headline
    if (ctaTitle) {
      footerTl.fromTo(
        ctaTitle,
        { y: 35, opacity: 0, immediateRender: true },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0
      );
    }

    // Callout button
    if (ctaBtn) {
      footerTl.fromTo(
        ctaBtn,
        { y: 22, scale: 0.9, opacity: 0, immediateRender: true },
        { y: 0, scale: 1, opacity: 1, duration: 0.65, ease: "back.out(1.5)" },
        0.14
      );
    }

    // Callout heart icon pop
    if (ctaIcon) {
      footerTl.fromTo(
        ctaIcon,
        { scale: 0, rotation: -30, opacity: 0, immediateRender: true },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.55, ease: "back.out(2.5)" },
        0.22
      );
    }

    // Nav widget columns
    navWidgets.forEach((w, idx) => {
      const title = w.querySelector(".footer-title");
      const links = w.querySelectorAll(".footer-link");

      if (title) {
        footerTl.fromTo(
          title,
          { y: 22, opacity: 0, immediateRender: true },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          0.1 + idx * 0.08
        );
      }

      if (links.length > 0) {
        footerTl.fromTo(
          links,
          { x: -14, opacity: 0, immediateRender: true },
          { x: 0, opacity: 0.8, duration: 0.45, stagger: 0.04, ease: "power2.out" },
          0.18 + idx * 0.08
        );
      }
    });

    // Copyright bar
    if (bottomBar) {
      footerTl.fromTo(
        bottomBar,
        { opacity: 0, immediateRender: true },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        0.35
      );
    }

    if (copyrightText) {
      footerTl.fromTo(
        copyrightText,
        { y: 15, opacity: 0, immediateRender: true },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        0.4
      );
    }

    // Ambient heartbeat on footer CTA icon
    let footerHeartAmbient = null;
    footerTl.eventCallback("onComplete", () => {
      if (ctaIcon) {
        if (!footerHeartAmbient) {
          footerHeartAmbient = gsap.to(ctaIcon, {
            scale: 1.25,
            duration: 1.6,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        } else {
          footerHeartAmbient.play();
        }
      }
    });
    footerTl.eventCallback("onReverseComplete", () => {
      if (footerHeartAmbient) {
        footerHeartAmbient.pause();
        if (ctaIcon) gsap.set(ctaIcon, { scale: 0, rotation: -30, opacity: 0 });
      }
    });

    // ScrollTrigger: Bidirectional trigger on scroll into view
    ScrollTrigger.create({
      trigger: footer,
      start: "top 88%",
      end: "bottom bottom",
      toggleActions: "play none play reverse",
      animation: footerTl,
      onEnter: () => footerTl.play(),
      onEnterBack: () => footerTl.play(),
      onLeaveBack: () => footerTl.reverse(),
    });

    // Fail-safe visibility watcher: ensure footer is visible if inside viewport or near document bottom
    const ensureFooterVisible = () => {
      const rect = footer.getBoundingClientRect();
      const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 150;
      if (rect.top <= window.innerHeight || nearBottom) {
        footerTl.play();
      }
    };
    ensureFooterVisible();
    window.addEventListener("scroll", ensureFooterVisible, { passive: true });
    window.addEventListener("resize", ensureFooterVisible, { passive: true });
  }

  // --------------------------------------------------------
  // Global ScrollTrigger Refresh & Layout Stability Handlers
  // Ensures trigger coordinates are always accurate as lazy images & content load
  // --------------------------------------------------------
  let refreshTimer = null;
  const debouncedRefresh = () => {
    if (refreshTimer) clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
  };

  // 1. Refresh whenever any image finishes loading (vital for lazy-loaded images)
  const allImgs = document.querySelectorAll("img");
  allImgs.forEach((img) => {
    if (img.complete) return;
    img.addEventListener("load", debouncedRefresh, { once: true });
    img.addEventListener("error", debouncedRefresh, { once: true });
  });

  // 2. Watch document body size changes (layout shifts, swiper updates, dynamic expansions)
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => {
      debouncedRefresh();
    });
    ro.observe(document.body);
  }

  // 3. Fonts ready check
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      debouncedRefresh();
    });
  }

  // 4. Full window load fallback
  if (document.readyState === "complete") {
    ScrollTrigger.refresh();
  } else {
    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });
  }
});

