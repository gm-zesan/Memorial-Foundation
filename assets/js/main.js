/**
 * ========================================================
 * Moshiur Rahman Memorial Foundation - Main JavaScript
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


  // ========================================================
  // Memorial Foundation
  // Sticky Scroll Image Reveal (Disabled as requested)
  // ========================================================

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

  // ----------------------------------------------------
  // ----------------------------------------------------
  // 6. Hero Section: Decoupled Background Fade + Directional Content Transition
  // ----------------------------------------------------

  const bgSwiperEl = document.getElementById("heroBgSlider");
  const heroContentSliderEl = document.getElementById("heroContentSlider");

  if (bgSwiperEl && heroContentSliderEl) {
    // 5 Unique Editorial Slides Data
    const heroSlidesData = [
      {
        subtitle: "Together, We Can",
        line1: "Change",
        line2: "Lives",
        text: "We work to bring hope, support, and positive change to communities in need. Your donation helps us create real impact and transform lives.",
        authors: [
          { src: "assets/images/about/69808b5b0a0747dd95550f8c_1.avif", alt: "Smiling young girl with brown hair", cls: "_1" },
          { src: "assets/images/about/69808b5b15bd5a046b93e203_2.avif", alt: "Smiling young boy with curly hair", cls: "" },
          { src: "assets/images/about/69808b5b46fd69f228563181_3.avif", alt: "Portrait of a young girl with a yellow hair bow", cls: "" }
        ],
        btn1: { text: "Explore Causes", href: "programs.html" },
        btn2: { text: "Change a Life", href: "donate.html" }
      },
      {
        subtitle: "Safe Water & Healthcare",
        line1: "Bring",
        line2: "Hope",
        text: "Providing reliable clean drinking water, sanitation facilities, and preventive medical treatment for vulnerable rural families.",
        authors: [
          { src: "assets/images/about/698089120997256bb522f5cb_2.avif", alt: "Community member", cls: "_1" },
          { src: "assets/images/about/69808b5b15bd5a046b93e203_2.avif", alt: "Smiling young boy", cls: "" },
          { src: "assets/images/about/69808b5b0a0747dd95550f8c_1.avif", alt: "Smiling girl", cls: "" }
        ],
        btn1: { text: "Water Aid", href: "programs.html" },
        btn2: { text: "Give Clean Water", href: "donate.html" }
      },
      {
        subtitle: "Emergency Food Aid",
        line1: "Nourish",
        line2: "Lives",
        text: "Delivering nutritious meals, grocery parcels, and vital sustenance to destitute families and orphaned children every single day.",
        authors: [
          { src: "assets/images/about/69808b5b46fd69f228563181_3.avif", alt: "Young girl", cls: "_1" },
          { src: "assets/images/about/69808b5b0a0747dd95550f8c_1.avif", alt: "Smiling girl", cls: "" },
          { src: "assets/images/about/69808b5b15bd5a046b93e203_2.avif", alt: "Smiling boy", cls: "" }
        ],
        btn1: { text: "Food Program", href: "programs.html" },
        btn2: { text: "Feed a Family", href: "donate.html" }
      },
      {
        subtitle: "Crisis & Winter Relief",
        line1: "Rebuild",
        line2: "Hope",
        text: "Standing with communities facing seasonal hardships and disasters—providing warm clothing, winter blankets, and temporary shelter.",
        authors: [
          { src: "assets/images/about/69808b5b15bd5a046b93e203_2.avif", alt: "Smiling young boy", cls: "_1" },
          { src: "assets/images/about/69808b5b46fd69f228563181_3.avif", alt: "Smiling young girl", cls: "" },
          { src: "assets/images/about/69808b5b0a0747dd95550f8c_1.avif", alt: "Smiling child", cls: "" }
        ],
        btn1: { text: "Relief Missions", href: "programs.html" },
        btn2: { text: "Provide Warmth", href: "donate.html" }
      },
      {
        subtitle: "Sustainable Tomorrow",
        line1: "Empower",
        line2: "Youth",
        text: "Fostering long-term dignity and self-reliance through youth vocational skills training, girl child education, and career development.",
        authors: [
          { src: "assets/images/about/698089120997256bb522f5cb_2.avif", alt: "Young woman", cls: "_1" },
          { src: "assets/images/about/69808b5b0a0747dd95550f8c_1.avif", alt: "Young student", cls: "" },
          { src: "assets/images/about/69808b5b15bd5a046b93e203_2.avif", alt: "Young boy", cls: "" }
        ],
        btn1: { text: "Youth Programs", href: "programs.html" },
        btn2: { text: "Empower a Child", href: "donate.html" }
      }
    ];

    let currentIdx = 0;
    let isTransitioning = false;
    let autoSlideTimer = null;
    const AUTO_DELAY = 4200; // Comfortable interval for smooth reading

    // DOM Target Elements inside the single rock-solid editorial container
    const subtitleEl = document.getElementById("heroSubtitle");
    const titleLine1El = document.getElementById("heroTitleLine1");
    const authorBoxEl = document.getElementById("heroAuthorBox");
    const titleLine2El = document.getElementById("heroTitleLine2");
    const textEl = document.getElementById("heroText");
    const btnBoxEl = document.getElementById("heroBtnBox");
    const btn1El = document.getElementById("heroBtn1");
    const btn2El = document.getElementById("heroBtn2");

    // 1. Swiper Background Slider: Cross-fades background images with film-like smoothness
    const heroBgSwiper = new Swiper("#heroBgSlider", {
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      speed: 900,
      loop: false,
      allowTouchMove: false,
    });

    // 2. Build custom pagination bullets
    const paginationContainer = document.querySelector(".hero-swiper-pagination");
    if (paginationContainer) {
      paginationContainer.innerHTML = "";
      heroSlidesData.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = "swiper-pagination-bullet" + (i === 0 ? " swiper-pagination-bullet-active" : "");
        dot.setAttribute("tabindex", "0");
        dot.setAttribute("aria-label", "Slide " + (i + 1));
        dot.addEventListener("click", () => {
          if (i !== currentIdx && !isTransitioning) {
            goToSlide(i, i > currentIdx ? 1 : -1);
          }
        });
        paginationContainer.appendChild(dot);
      });
    }

    // 3. Update counter and pagination bullets
    function updateControls(index) {
      const counter = document.querySelector(".hero-slide-num.current");
      if (counter) {
        counter.textContent = String(index + 1).padStart(2, "0");
      }
      const dots = document.querySelectorAll(".hero-swiper-pagination .swiper-pagination-bullet");
      dots.forEach((dot, idx) => {
        dot.classList.toggle("swiper-pagination-bullet-active", idx === index);
      });
    }

    // 4. Update the content DOM cleanly
    function renderSlideData(idx) {
      const d = heroSlidesData[idx];
      if (!d) return;

      if (subtitleEl) subtitleEl.textContent = d.subtitle;
      if (titleLine1El) titleLine1El.textContent = d.line1;
      if (titleLine2El) titleLine2El.textContent = d.line2;
      if (textEl) textEl.textContent = d.text;

      if (authorBoxEl && d.authors) {
        const imgs = authorBoxEl.querySelectorAll(".hero-author-img");
        d.authors.forEach((a, i) => {
          if (imgs[i]) {
            imgs[i].src = a.src;
            imgs[i].alt = a.alt;
          }
        });
      }

      if (btn1El && d.btn1) {
        btn1El.setAttribute("href", d.btn1.href);
        const txts = btn1El.querySelectorAll(".theme-btn-text, .theme-btn-hover-text");
        txts.forEach(t => t.textContent = d.btn1.text);
      }

      if (btn2El && d.btn2) {
        btn2El.setAttribute("href", d.btn2.href);
        const txts = btn2El.querySelectorAll(".theme-btn-text, .theme-btn-hover-text");
        txts.forEach(t => t.textContent = d.btn2.text);
      }
    }

    // 5. Distinct Editorial Slide Transition with 3D Depth & Staggered Reveal
    function goToSlide(nextIdx, dir = 1) {
      if (isTransitioning || nextIdx === currentIdx) return;
      isTransitioning = true;

      // Cross-fade the background swiper photo with gentle 900ms curve
      heroBgSwiper.slideTo(nextIdx);

      if (typeof gsap === "undefined") {
        renderSlideData(nextIdx);
        currentIdx = nextIdx;
        updateControls(currentIdx);
        isTransitioning = false;
        resetAutoSlide();
        return;
      }

      const animItems = [subtitleEl, titleLine1El, authorBoxEl, titleLine2El, textEl, btnBoxEl].filter(Boolean);
      const portraits = authorBoxEl ? authorBoxEl.querySelectorAll(".hero-author-img") : [];
      gsap.killTweensOf(animItems);
      gsap.killTweensOf(portraits);

      const tl = gsap.timeline({
        onComplete: () => {
          isTransitioning = false;
          resetAutoSlide();
        }
      });

      const exitY = dir === 1 ? -24 : 24;
      const enterY = dir === 1 ? 36 : -36;

      // Phase 1: Subtle upward/downward drift with gentle blur dissolution
      if (subtitleEl) tl.to(subtitleEl, { y: exitY * 0.7, opacity: 0, duration: 0.26, ease: "power2.in" }, 0);
      tl.to([titleLine1El, titleLine2El].filter(Boolean), { y: exitY, opacity: 0, filter: "blur(5px)", duration: 0.3, stagger: 0.03, ease: "power2.in" }, 0.02);
      if (portraits.length > 0) {
        tl.to(portraits, { scale: 0.65, rotation: -12, opacity: 0, duration: 0.25, stagger: 0.03, ease: "power2.in" }, 0.03);
      }
      if (textEl) tl.to(textEl, { y: exitY * 0.6, opacity: 0, filter: "blur(4px)", duration: 0.28, ease: "power2.in" }, 0.04);
      if (btnBoxEl) tl.to(btnBoxEl, { scale: 0.94, opacity: 0, duration: 0.24, ease: "power2.in" }, 0.05);

      // Midpoint: Seamlessly update content & images while opacity is 0
      tl.add(() => {
        renderSlideData(nextIdx);
        currentIdx = nextIdx;
        updateControls(currentIdx);

        // Pre-position elements on incoming side
        if (subtitleEl) gsap.set(subtitleEl, { y: enterY * 0.7, opacity: 0, letterSpacing: "2.5px" });
        if (titleLine1El) gsap.set(titleLine1El, { y: enterY, opacity: 0, filter: "blur(6px)" });
        if (titleLine2El) gsap.set(titleLine2El, { y: enterY, opacity: 0, filter: "blur(6px)" });
        if (textEl) gsap.set(textEl, { y: enterY * 0.7, opacity: 0, filter: "blur(5px)" });
        if (btnBoxEl) gsap.set(btnBoxEl, { y: 20, scale: 0.92, opacity: 0 });
        if (portraits.length > 0) gsap.set(portraits, { scale: 0, rotation: -22, opacity: 0 });
      });

      // Phase 2: Refined editorial entrance glide with cinematic clarity
      if (subtitleEl) tl.to(subtitleEl, { y: 0, opacity: 1, letterSpacing: "0.5px", duration: 0.52, ease: "power3.out" }, "+=0.03");
      if (titleLine1El) tl.to(titleLine1El, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.65, ease: "power4.out" }, "-=0.42");
      if (portraits.length > 0) {
        tl.to(portraits, { scale: 1, rotation: 0, opacity: 1, duration: 0.52, stagger: 0.06, ease: "back.out(2.2)" }, "-=0.48");
      }
      if (titleLine2El) tl.to(titleLine2El, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.65, ease: "power4.out" }, "-=0.45");
      if (textEl) tl.to(textEl, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.58, ease: "power3.out" }, "-=0.42");
      if (btnBoxEl) tl.to(btnBoxEl, { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" }, "-=0.38");
    }

    function nextSlide() {
      const nextIdx = (currentIdx + 1) % heroSlidesData.length;
      goToSlide(nextIdx, 1);
    }

    function prevSlide() {
      const prevIdx = (currentIdx - 1 + heroSlidesData.length) % heroSlidesData.length;
      goToSlide(prevIdx, -1);
    }

    // Controls: Arrow buttons
    const nextBtn = document.querySelector(".hero-swiper-next");
    const prevBtn = document.querySelector(".hero-swiper-prev");
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    // Controls: Autoplay Timer
    function startAutoSlide() {
      stopAutoSlide();
      autoSlideTimer = setInterval(nextSlide, AUTO_DELAY);
    }
    function stopAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }
    function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
      heroSection.addEventListener("mouseenter", stopAutoSlide);
      heroSection.addEventListener("mouseleave", startAutoSlide);
    }

    // Touch Swipe support on mobile
    if (heroSection) {
      let touchStartX = 0;
      let touchEndX = 0;
      heroSection.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      heroSection.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 50) {
          if (diff < 0) nextSlide();
          else prevSlide();
        }
      }, { passive: true });
    }

    // Enhanced Hero Initial Entrance & Ambient Floating Interactions
    if (typeof gsap !== "undefined") {
      const controls = document.querySelector(".hero-slider-controls");
      const portraits = authorBoxEl ? authorBoxEl.querySelectorAll(".hero-author-img") : [];

      // Initial Entrance Timeline
      const heroIntroTl = gsap.timeline({ delay: 0.15 });

      if (subtitleEl) {
        heroIntroTl.fromTo(subtitleEl, 
          { y: -25, opacity: 0, letterSpacing: "3px" }, 
          { y: 0, opacity: 1, letterSpacing: "0.5px", duration: 0.75, ease: "power3.out" }, 
          0
        );
      }

      if (titleLine1El) {
        heroIntroTl.fromTo(titleLine1El, 
          { y: 65, opacity: 0, filter: "blur(8px)" }, 
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.85, ease: "power4.out" }, 
          0.1
        );
      }

      if (portraits.length > 0) {
        heroIntroTl.fromTo(portraits, 
          { scale: 0, rotation: -25, opacity: 0 }, 
          { scale: 1, rotation: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "back.out(2.2)" }, 
          0.2
        );
      }

      if (titleLine2El) {
        heroIntroTl.fromTo(titleLine2El, 
          { y: 65, opacity: 0, filter: "blur(8px)" }, 
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.85, ease: "power4.out" }, 
          0.25
        );
      }

      if (textEl) {
        heroIntroTl.fromTo(textEl, 
          { y: 35, opacity: 0, filter: "blur(6px)" }, 
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.75, ease: "power3.out" }, 
          0.32
        );
      }

      const heroButtons = btnBoxEl ? btnBoxEl.querySelectorAll(".theme-button") : [];
      if (heroButtons.length > 0) {
        heroIntroTl.fromTo(heroButtons, 
          { y: 25, scale: 0.92, opacity: 0 }, 
          { y: 0, scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" }, 
          0.4
        );
      }

      if (controls) {
        heroIntroTl.fromTo(controls, 
          { y: 28, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.65, ease: "back.out(1.5)" }, 
          0.45
        );
      }

      // Continuous Ambient Floating Animations (Distinct Life in Hero)
      heroIntroTl.add(() => {
        if (portraits.length >= 3) {
          gsap.to(portraits[0], { y: -4, duration: 2.3, yoyo: true, repeat: -1, ease: "sine.inOut" });
          gsap.to(portraits[1], { y: 4, duration: 2.7, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 0.3 });
          gsap.to(portraits[2], { y: -3.5, duration: 2.5, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 0.6 });
        }

        const heroHeartIcon = document.querySelector("#heroBtn2 .theme-btn-icon");
        if (heroHeartIcon) {
          gsap.to(heroHeartIcon, {
            scale: 1.25,
            duration: 1.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });
    }

    startAutoSlide();
  }

  // ----------------------------------------------------
  // Dynamic Header Height Tracking for 100vh - header
  // ----------------------------------------------------
  function syncHeaderHeight() {
    const header = document.querySelector(".main-header");
    if (header) {
      const h = header.getBoundingClientRect().height;
      if (h > 0) {
        document.documentElement.style.setProperty("--header-height", `${Math.round(h)}px`);
      }
    }
  }
  syncHeaderHeight();
  window.addEventListener("resize", syncHeaderHeight, { passive: true });
  window.addEventListener("load", syncHeaderHeight, { passive: true });

  // ----------------------------------------------------
  // 5. Memorial Portrait Variant Switcher (Golden Halo vs Cutout)
  // ----------------------------------------------------
  const portraitSwitchBtns = document.querySelectorAll(".mm-switch-btn");
  const portraitImg = document.querySelector(".mm-portrait-img");
  if (portraitSwitchBtns.length > 0 && portraitImg) {
    portraitSwitchBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const targetSrc = this.getAttribute("data-portrait");
        if (!targetSrc || portraitImg.getAttribute("src") === targetSrc) return;

        portraitSwitchBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        if (typeof gsap !== "undefined") {
          gsap.to(portraitImg, {
            opacity: 0,
            scale: 0.96,
            duration: 0.22,
            ease: "power2.in",
            onComplete: () => {
              portraitImg.src = targetSrc;
              gsap.to(portraitImg, {
                opacity: 1,
                scale: 1,
                duration: 0.32,
                ease: "power2.out",
              });
            },
          });
        } else {
          portraitImg.src = targetSrc;
        }
      });
    });
  }
});

