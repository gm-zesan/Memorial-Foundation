/**
 * ========================================================
 * Moshiur Memorial Foundation - Main JavaScript
 * Dedicated to Continuing a Legacy of Compassion and Humanity
 * ========================================================
 */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // ----------------------------------------------------
  // 1. Mobile Navigation Menu Toggle
  // ----------------------------------------------------
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileCloseBtn = document.querySelector(".menu-close-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.add("open");
      mobileMenu.style.display = "block";
    });
  }

  if (mobileCloseBtn && mobileMenu) {
    mobileCloseBtn.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
      mobileMenu.style.display = "none";
    });
  }

  // ----------------------------------------------------
  // 2. Desktop Dropdown Menu Handling (Hover & Click)
  // ----------------------------------------------------
  const dropdownPages = document.querySelectorAll(".dropdown-page");
  dropdownPages.forEach((drop) => {
    const list = drop.querySelector(".dropdown-list-pages");
    const toggle = drop.querySelector(".menu-link.pages");
    const plusIcon = drop.querySelector(".page-text-block.down");

    // Hover effect
    drop.addEventListener("mouseenter", function () {
      drop.classList.add("open");
      if (list) list.classList.add("open");
      if (plusIcon) plusIcon.textContent = "×";
    });

    drop.addEventListener("mouseleave", function () {
      drop.classList.remove("open");
      if (list) list.classList.remove("open");
      if (plusIcon) plusIcon.textContent = "+";
    });

    // Click toggle fallback
    if (toggle) {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = drop.classList.toggle("open");
        if (list) list.classList.toggle("open", isOpen);
        if (plusIcon) plusIcon.textContent = isOpen ? "×" : "+";
      });
    }
  });

  // Close dropdown on outside click
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown-page")) {
      dropdownPages.forEach((drop) => {
        drop.classList.remove("open");
        const list = drop.querySelector(".dropdown-list-pages");
        if (list) list.classList.remove("open");
        const plusIcon = drop.querySelector(".page-text-block.down");
        if (plusIcon) plusIcon.textContent = "+";
      });
    }
  });

  // ----------------------------------------------------
  // 3. Testimonial / Review Carousel Slider
  // ----------------------------------------------------
  const slider = document.querySelector(".review-slider");
  if (slider) {
    const slides = slider.querySelectorAll(".review-slide");
    const prevBtn = slider.querySelector(".review-arrow.slider-arrow-prev");
    const nextBtn = slider.querySelector(".review-arrow.slider-arrow-next");
    const dots = slider.querySelectorAll(".slider-dot");
    let currentSlide = 0;

    function showSlide(idx) {
      if (idx < 0) idx = slides.length - 1;
      if (idx >= slides.length) idx = 0;
      currentSlide = idx;

      slides.forEach((slide, i) => {
        slide.style.display = i === currentSlide ? "block" : "none";
      });

      dots.forEach((dot, i) => {
        if (i === currentSlide) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    if (slides.length > 0) {
      showSlide(0);

      if (prevBtn) {
        prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
      }
      dots.forEach((dot, i) => {
        dot.addEventListener("click", () => showSlide(i));
      });
    }
  }

  // ----------------------------------------------------
  // 4. Smooth Anchor Scrolling for Page Links
  // ----------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#" && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });

  // ----------------------------------------------------
  // 5. Rolling Number Counter Animation on Scroll
  // ----------------------------------------------------
  const counterElements = document.querySelectorAll(".counter-inner .counter");
  if (counterElements.length > 0) {
    const targets = [];
    counterElements.forEach((el) => {
      const currentTransform = el.style.transform || "";
      const match = currentTransform.match(/translate3d\([^,]+,\s*([^,]+),/);
      let targetY = "-90%";
      if (match && match[1]) {
        targetY = match[1].trim();
      }
      targets.push({ element: el, targetY: targetY });

      el.style.transform = "translate3d(0px, 0%, 0px)";
    });

    let animated = false;
    const animateCounters = () => {
      if (animated) return;
      animated = true;
      targets.forEach((item, index) => {
        setTimeout(() => {
          item.element.style.transform = `translate3d(0px, ${item.targetY}, 0px)`;
        }, index * 80);
      });
    };

    const resultSection = document.querySelector(".result-wrapper") || document.querySelector(".result-grid");
    if (resultSection && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounters();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.25 }
      );
      observer.observe(resultSection);
    } else {
      setTimeout(animateCounters, 600);
    }
  }

  // ========================================================
  // Memorial Foundation
  // Sticky Scroll Image Reveal (Temporarily paused for static structure review)
  // ========================================================
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const outerBox = document.querySelector(".funfact-outer-box");
    const centerBox = document.querySelector(".funfact-center-box.large-image");
    const outerLeft = document.querySelector(".funfact-image-box.outer-left");
    const outerRight = document.querySelector(".funfact-image-box.outer-right");

    if (outerBox && centerBox && outerLeft && outerRight) {
      const mm = gsap.matchMedia();

      // Desktop & Tablets (>= 768px)
      mm.add("(min-width: 768px)", () => {
        // Initial setup for the 5-image state
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

        // Pin ONLY .funfact-outer-box, scrub reveal animation, then unpin
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outerBox,
            pin: outerBox,
            pinSpacing: true,
            start: "center 58%", // Pinned slightly lower on screen so title stays fully in view
            end: "+=1600",       // Increased pin duration: stays pinned longer on screen
            scrub: 0.6,          // Faster, snappier scroll response
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Animation completes faster in the first 60% of scroll
        // leaving the remaining 40% holding the fully revealed 7-image showcase before release
        tl.to(
          centerBox,
          {
            width: "28vw",
            duration: 0.6,
            ease: "power2.out",
          },
          0
        );

        // 2. Reveal outer-left image quickly
        tl.to(
          outerLeft,
          {
            width: "12vw",
            maxWidth: "180px",
            marginRight: "0rem",
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0
        );

        // 3. Reveal outer-right image quickly
        tl.to(
          outerRight,
          {
            width: "12vw",
            maxWidth: "180px",
            marginLeft: "0rem",
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0
        );

        // 4. Hold frame: Keep fully revealed 7-image showcase pinned for the remaining duration
        tl.to({}, { duration: 0.4 }, 0.6);

        window.addEventListener("load", () => {
          ScrollTrigger.refresh();
        });

        return () => {
          if (tl.scrollTrigger) {
            tl.scrollTrigger.kill();
          }
          tl.kill();
        };
      });

      // Mobile devices (< 768px)
      mm.add("(max-width: 767px)", () => {
        gsap.set([outerBox, centerBox, outerLeft, outerRight], {
          clearProps: "all",
        });
      });
    }
  }

  // ----------------------------------------------------
  // Video Popup Lightbox Modal
  // ----------------------------------------------------
  const videoPopupTrigger = document.querySelector(".video-popup-trigger");
  if (videoPopupTrigger) {
    videoPopupTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      const videoUrl = "https://www.youtube.com/embed/-t-Um5td6Ic?autoplay=1";

      let overlay = document.querySelector(".video-modal-overlay");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "video-modal-overlay";
        overlay.innerHTML = `
          <div class="video-modal-container">
            <button class="video-modal-close" aria-label="Close modal">&times;</button>
            <div class="video-modal-frame">
              <iframe src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
        `;
        document.body.appendChild(overlay);

        const closeBtn = overlay.querySelector(".video-modal-close");
        const closeModal = () => {
          overlay.classList.remove("active");
          const iframe = overlay.querySelector("iframe");
          if (iframe) iframe.src = "";
          document.body.style.overflow = "";
        };

        closeBtn.addEventListener("click", closeModal);
        overlay.addEventListener("click", (ev) => {
          if (ev.target === overlay) closeModal();
        });
        document.addEventListener("keydown", (ev) => {
          if (ev.key === "Escape" && overlay.classList.contains("active")) {
            closeModal();
          }
        });
      }

      const iframe = overlay.querySelector("iframe");
      if (iframe) iframe.src = videoUrl;
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }
});

