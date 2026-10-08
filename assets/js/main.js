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
  /*
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const imagesSection = document.querySelector(".images-section");
    const showcase = document.querySelector(".funfact-outer-box");
    const leftBox = document.querySelector(".funfact-left-box");
    const rightBox = document.querySelector(".funfact-right-box");
    const outerLeft = document.querySelector(".outer-left");
    const outerRight = document.querySelector(".outer-right");

    if (
      imagesSection &&
      showcase &&
      leftBox &&
      rightBox &&
      outerLeft &&
      outerRight
    ) {
      const mm = gsap.matchMedia();

      // Desktop
      mm.add("(min-width: 768px)", () => {
        const getShift = () => Math.min(180, window.innerWidth * 0.12);

        gsap.set(outerLeft, {
          x: () => -getShift(),
          yPercent: -50,
          opacity: 0,
        });

        gsap.set(outerRight, {
          x: () => getShift(),
          yPercent: -50,
          opacity: 0,
        });

        gsap.set([leftBox, rightBox], {
          x: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: imagesSection,
            start: "top top",
            end: "+=1200",
            scrub: 1.2,
            pin: showcase,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: false,
          },
        });

        tl.to(
          outerLeft,
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "none",
          },
          0
        );

        tl.to(
          outerRight,
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "none",
          },
          0
        );

        tl.to(
          leftBox,
          {
            x: () => getShift(),
            duration: 1,
            ease: "none",
          },
          0
        );

        tl.to(
          rightBox,
          {
            x: () => -getShift(),
            duration: 1,
            ease: "none",
          },
          0
        );

        return () => {
          if (tl.scrollTrigger) {
            tl.scrollTrigger.kill();
          }
          tl.kill();
        };
      });

      // Mobile
      mm.add("(max-width: 767px)", () => {
        gsap.set([outerLeft, outerRight, leftBox, rightBox], {
          clearProps: "all",
        });
      });
    }
  }
  */

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

