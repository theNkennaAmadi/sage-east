gsap.registerPlugin(ScrollTrigger, Draggable, Flip);

/**
 * Lenis Initialization
 *
 */
/*
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

 */
/**
 * Class Initialization
 */

class Nav {
  constructor(container) {
    this.worksLink = container.querySelector("[nav-works]");
    this.worksIcon = container.querySelector(".nav-span");
    this.worksDropdown = container.querySelector(".menu-works-dropdown");
    this.worksLine = container.querySelector(".menu-works-line");
    this.mobileMenuIcon = container.querySelector(".mobile-menu-icon");
    this.mobileMenu = container.querySelector(".mobile-menu");
    this.mobileMenuOpen = false;
    this.main = container.querySelector(".main");
    this.desktopTL = this.desktopReveal();
    this.mobileTL = this.mobileReveal();
    this.setupEventListener();
  }

  desktopReveal() {
    let tl = gsap.timeline({ paused: true });
    tl.fromTo(
      this.worksIcon,
      { rotation: 0 },
      { rotation: 45, duration: 1, ease: "expo.out" }
    )
      .fromTo(this.main, { opacity: 1 }, { opacity: 0.3, duration: 0.6 }, "<")
      .fromTo(
        this.worksDropdown,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          display: "none",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          display: "grid",
          ease: "expo.inOut",
          delay: this.delay,
          duration: 1.5,
        },
        "<"
      )
      .fromTo(
        this.worksLine,
        { width: "0%" },
        { width: "100%", duration: 0.6, ease: "expo.out" },
        "<0.9"
      );
    return tl;
  }

  mobileReveal() {
    let tl = gsap.timeline({ paused: true });
    tl.fromTo(
      this.mobileMenuIcon,
      { rotation: 0 },
      { rotation: 45, duration: 1, ease: "expo.out" }
    )
      .fromTo(this.main, { opacity: 1 }, { opacity: 0.3, duration: 0.6 }, "<")
      .fromTo(
        this.mobileMenu,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          display: "none",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          display: "block",
          ease: "expo.inOut",
          delay: this.delay,
          duration: 1.5,
        },
        "<"
      );
    return tl;
  }

  setupEventListener() {
    this.worksLink.addEventListener("mouseenter", () => {
      this.desktopTL.play();
    });
    this.worksLink.addEventListener("mouseleave", () => {
      this.desktopTL.reverse();
    });
    this.mobileMenuIcon.addEventListener("click", () => {
      this.mobileMenuOpen ? this.mobileTL.reverse() : this.mobileTL.play();
      this.mobileMenuOpen = !this.mobileMenuOpen;
    });
  }
}

class RevealAnimator {
  constructor(container, delay = 0) {
    this.images = [...container.querySelectorAll("[data-slide-img]")];
    this.delay = delay;
    this.init();
  }
  reveal() {
    if (this.images.length !== 0) {
      this.images.forEach((img) => {
        gsap.fromTo(
          img,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "expo.inOut",
            delay: this.delay,
            duration: 1.5,
          }
        );
      });
    }
  }
  init() {
    this.reveal();
  }
}

class TextAnimator {
  constructor(container, delay = 0, y = -120, duration = 3, active = true) {
    this.words = [...container.querySelectorAll(".word")];
    this.dataText = [...container.querySelectorAll("[data-splitting]")];
    this.delay = delay;
    this.duration = duration;
    this.y = y;
    this.active = active;
    this.timeline = null;
    this.init();
  }

  wrapWords(y) {
    gsap.set(this.words, { yPercent: y });
    this.words.forEach((word) => {
      let wrapper = document.createElement("span");
      wrapper.classList.add("char-wrap");
      word.parentNode.insertBefore(wrapper, word);
      wrapper.appendChild(word);
    });
  }

  animateText(delay, y, duration, endY = 0) {
    if (this.dataText.length !== 0) {
      this.dataText.forEach((title) => {
        if (
          !title.hasAttribute("no-instance") &&
          title["🍌"].lines.length > 0
        ) {
          const chars = title.querySelectorAll(".word");
          this.timeline = gsap.timeline();
          this.timeline.fromTo(
            chars,
            {
              "will-change": "transform",
              transformOrigin: "0% 50%",
              yPercent: y,
            },
            {
              duration: duration,
              ease: "expo",
              yPercent: endY,
              delay: delay,
            }
          );
        }
      });
    }
  }

  init() {
    this.wrapWords(this.y);
    if (this.active) {
      this.animateText(this.delay, this.y, this.duration);
    }
  }
}

class IntroAnimator {
  constructor(container, delay = 0) {
    this.words = [
      ...container
        .querySelector(".hero-intro-container")
        .querySelectorAll(".word"),
    ];
    this.dataText = [
      ...container
        .querySelector(".hero-intro-container")
        .querySelectorAll("[data-splitting]"),
    ];
    this.delay = delay;
    this.init();
  }

  wrapWords() {
    gsap.set(this.words, { opacity: 0, yPercent: -120 });
    this.words.forEach((word) => {
      let wrapper = document.createElement("span");
      wrapper.classList.add("char-wrap");
      word.parentNode.insertBefore(wrapper, word);
      wrapper.appendChild(word);
    });
  }

  animateText(delay) {
    if (this.dataText.length !== 0) {
      this.dataText.forEach((title) => {
        if (title["🍌"].words.length > 0) {
          const chars = title.querySelectorAll(".word");
          gsap.fromTo(
            chars,
            {
              "will-change": "transform",
              transformOrigin: "0% 50%",
              opacity: 0,
              yPercent: -120,
            },
            {
              duration: 3,
              ease: "expo",
              opacity: 1,
              yPercent: 0,
              delay: delay,
            }
          );
        }
      });
    }
  }

  init() {
    this.wrapWords();
    //this.animateText(this.delay);
  }
}

class LoaderAnimator {
  constructor(nextContainer, introA) {
    this.workImages = [...nextContainer.querySelectorAll(".works-intro-item")];
    this.flipContainers = [...nextContainer.querySelectorAll(".hero-c")];
    this.finalContainers = [
      ...nextContainer.querySelectorAll("[data-hero-visual]"),
    ];
    this.excludedIndices = [1, 6, 10];
    this.introAnimation = introA;
    this.selectedItems = this.workImages.filter((item) => {
      const flipId = parseInt(item.getAttribute("data-flip-id"));
      return !this.excludedIndices.includes(flipId);
    });
    this.mainItems = this.workImages.filter((item) => {
      const flipId = parseInt(item.getAttribute("data-flip-id"));
      return this.excludedIndices.includes(flipId);
    });

    this.items = this.mainItems.map((item) => {
      return item.querySelector("img");
    });

    this.state = Flip.getState(this.workImages);
    this.flipContainers.forEach((container, index) => {
      container.append(
        this.workImages[this.flipContainers.length - (index + 1)]
      );
    });

    this.loaderTimeline = gsap.timeline().add(() => {
      Flip.from(this.state, {
        duration: 1,
        opacity: 1,
        //absolute: true,
        zIndex: -1,
        stagger: 0.1,
        ease: "expo.out",
      })
        .fromTo(
          this.selectedItems,
          { opacity: 1, duration: 1, ease: "expo.out" },
          {
            opacity: 0,
            duration: 1,
            stagger: {
              amount: 1,
            },
            ease: "expo.out",
          },
          ">0.2"
        )
        .to(".loading-text", { opacity: 0, duration: 1, ease: "expo.out" }, "<")
        .eventCallback("onComplete", () => {
          // Run your function here
          this.introAnimation.animateText();
          this.state = Flip.getState(this.items);
          this.state2 = Flip.getState(this.finalContainers);
          setTimeout(() => {
            this.finalContainers.forEach((container, index) => {
              //container.append(this.items[index]);

              const flipId = parseInt(container.getAttribute("data-flip-id"));
              //console.log(flipId);
              let mainItem = this.mainItems.filter(
                (item) => parseInt(item.getAttribute("data-flip-id")) === flipId
              );
              container.append(mainItem[0].querySelector("img"));
            });

            Flip.from(this.state, {
              duration: 1,
              zIndex: -1,
              ease: "power4.out",
              onComplete: () => {
                //  lenis.start();
              },
            });
          }, 500);
        });
    });

    this.formatNumber = (value, decimals) => {
      let s = (+value).toLocaleString("en-US").split(".");
      return decimals
        ? s[0] + "." + ((s[1] || "") + "00000000").substr(0, decimals)
        : s[0];
    };

    gsap.to("#loaderPercentage", {
      textContent: "100",
      duration: 3,
      ease: "power1.inOut",
      modifiers: {
        textContent: (value) => this.formatNumber(value, 0) + "%",
      },
    });
  }
}

let gallerySnap = null;

class GalleryScroller {
  constructor(container) {
    this.initializeProperties(container);
    this.setupScrollTrigger();
    this.setupDraggable();
    this.setupInitialAnimations();
  }

  initializeProperties(container) {
    this.iteration = 0;
    this.spacing = 0.15;
    this.snapTime = gsap.utils.snap(this.spacing);
    this.cards = [...container.querySelectorAll(".works-list-item")];
    this.cardsList = container.querySelector(".works-list");
    this.cardsListWrapper = container.querySelector(".works-list-wrapper");
    this.sectionWrapper = container.querySelector("[visibility-hidden]");
    this.dragWrapper = container.querySelector(".drag-proxy");
    this.seamlessLoop = this.buildSeamlessLoop(
      this.cards,
      this.spacing,
      this.animateFunc.bind(this)
    );
    this.playhead = { offset: 0 };
    this.scroll = null;
    gallerySnap = () => this.scrollToOffset(this.scrub.vars.offset);
  }

  setupScrollTrigger() {
    this.trigger = ScrollTrigger.create({
      start: 0,
      onUpdate: this.onScrollUpdate.bind(this),
      end: "+=3000",
      pin: this.cardsListWrapper,
    });

    ScrollTrigger.addEventListener("scrollEnd", gallerySnap);
  }

  setupDraggable() {
    Draggable.create(this.dragWrapper, {
      type: "x",
      trigger: this.cardsList,
      onPress: this.onPress.bind(this),
      onDrag: this.onDrag.bind(this),
      onDragEnd: () => this.scrollToOffset(this.scrub.vars.offset),
    });
  }

  setupInitialAnimations() {
    gsap.set(this.cards, { x: "400%", opacity: 0, scale: 0 });
    gsap.from(this.sectionWrapper, { autoAlpha: 0, duration: 1, ease: "expo" });

    this.scrub = gsap.to(this.playhead, {
      offset: 0,
      onUpdate: this.onScrubUpdate.bind(this),
      duration: 0.5,
      ease: "power3",
      paused: true,
    });
  }

  animateFunc(element) {
    const tl = gsap.timeline();
    tl.fromTo(
      element,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        zIndex: 100,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: "power1.in",
        immediateRender: false,
      }
    ).fromTo(
      element,
      { x: "400%" },
      { x: "-400%", duration: 1, ease: "none", immediateRender: false },
      0
    );
    return tl;
  }

  buildSeamlessLoop(items, spacing, animateFunc) {
    let rawSequence = gsap.timeline({ paused: true }),
      seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat: () => {
          this._time === this._dur && (this._tTime += this._dur - 0.01);
        },
        onReverseComplete: () => {
          this.totalTime(this.rawTime() + this.duration() * 100);
        },
      }),
      cycleDuration = spacing * items.length,
      dur;

    items
      .concat(items)
      .concat(items)
      .forEach((item, i) => {
        let anim = animateFunc(items[i % items.length]);
        rawSequence.add(anim, i * spacing);
        dur || (dur = anim.duration());
      });

    seamlessLoop.fromTo(
      rawSequence,
      { time: cycleDuration + dur / 2 },
      { time: "+=" + cycleDuration, duration: cycleDuration, ease: "none" }
    );
    return seamlessLoop;
  }

  onScrubUpdate() {
    const wrapTime = gsap.utils.wrap(0, this.seamlessLoop.duration());
    this.seamlessLoop.time(wrapTime(this.playhead.offset));
  }

  onScrollUpdate(self) {
    const scroll = self.scroll();
    if (scroll > self.end - 1) {
      this.wrap(1, 2);
    } else if (scroll < 1 && self.direction < 0) {
      this.wrap(-1, self.end - 2);
    } else {
      const offset =
        (this.iteration + self.progress) * this.seamlessLoop.duration();
      if (offset !== this.scrub.vars.offset) {
        this.scrub.vars.offset = offset;
        this.scrub.invalidate().restart();
      }
    }
  }

  scrollToOffset(offset) {
    const snappedTime = this.snapTime(offset);
    const progress =
      (snappedTime - this.seamlessLoop.duration() * this.iteration) /
      this.seamlessLoop.duration();
    this.scroll = this.progressToScroll(progress);
    console.log(this.scroll);

    if (progress >= 1 || progress < 0) {
      this.wrap(Math.floor(progress), this.scroll);
      return;
    }

    this.trigger.scroll(this.scroll);
  }

  progressToScroll(progress) {
    return gsap.utils.clamp(
      1,
      this.trigger.end - 1,
      gsap.utils.wrap(0, 1, progress) * this.trigger.end
    );
  }

  wrap(iterationDelta, scrollTo) {
    this.iteration += iterationDelta;
    this.trigger.scroll(scrollTo);
    this.trigger.update();
  }

  onPress() {
    this.startOffset = this.scrub.vars.offset;
  }

  onDrag() {
    this.scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
    this.scrub.invalidate().restart();
  }
}

class SectionNavigator {
  constructor(container) {
    // Initialize properties
    this.sections = container.querySelectorAll(".work-main-item");
    this.thumbnails = [...container.querySelectorAll(".work-thumbnail-item")];
    this.thumbnailsList = container.querySelector(".work-thumbnail-list");
    this.indicator = container.querySelector(".indicator");
    this.currentIndex = -1;
    this.wrap = gsap.utils.wrap(0, this.sections.length);
    this.animating = false;
    this.desktopFlag = false;
    this.mobileFlag = false;
    this.mm = gsap.matchMedia();

    // Initial setup
    gsap.set(this.sections, { zIndex: 0, opacity: 0 });
    gsap.set(this.indicator, { opacity: 1 });

    this.desktopCheck();
    this.mobileCheck();
    this.initEventListeners();
    this.gotoSection(0, 1);
  }

  desktopCheck() {
    this.desktopFlag = this.thumbnailsList.scrollHeight > window.innerHeight;
  }

  mobileCheck() {
    this.mobileFlag = this.thumbnailsList.scrollWidth > window.innerWidth;
  }

  gotoSection(index, direction) {
    index = this.wrap(index);
    this.animating = true;
    let fromTop = direction === -1;
    let dFactor = fromTop ? -1 : 1;
    let tl = gsap.timeline({
      defaults: { duration: 1, ease: "power1.inOut" },
      onComplete: () => (this.animating = false),
    });

    if (this.currentIndex >= 0) {
      gsap.to(this.sections[this.currentIndex], { zIndex: 0, opacity: 0 });
    }

    tl.to(this.sections[index], { autoAlpha: 1, zIndex: 1 });

    this.mm.add("(min-width: 768px)", () => {
      tl.to(
        this.indicator,
        { x: 0, y: `${index * 100}%`, duration: 1, ease: "power1.inOut" },
        "<"
      );
      if (this.desktopFlag) {
        gsap.to(this.thumbnailsList, {
          duration: 1,
          y: `${-(index / this.sections.length) * 100}%`,
          x: 0,
          ease: "power3.inOut",
        });
      }
    });

    this.mm.add("(max-width: 767px)", () => {
      tl.to(
        this.indicator,
        { y: 0, x: `${index * 100}%`, duration: 1, ease: "power1.inOut" },
        "<"
      );
      if (this.mobileFlag) {
        gsap.to(this.thumbnailsList, {
          duration: 1,
          y: 0,
          x: `${-(index / this.sections.length) * 100}%`,
          ease: "power3.inOut",
        });
      }
    });

    this.currentIndex = index;
  }

  initEventListeners() {
    ScrollTrigger.observe({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () =>
        !this.animating && this.gotoSection(this.currentIndex - 1, -1),
      onUp: () => !this.animating && this.gotoSection(this.currentIndex + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });
    this.thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        if (index !== this.currentIndex) {
          this.gotoSection(index, index < this.currentIndex ? -1 : 1);
        }
      });
    });

    window.addEventListener("resize", () => {
      if (document.querySelector(".work-thumbnail-list")) {
        this.desktopCheck();
        this.mobileCheck();
        this.gotoSection(this.currentIndex, 1);
      }
    });
  }
}

class HomeAnimation {
  constructor(container, textAnim) {
    this.container = container;
    this.textAnim = textAnim;
    this.grid = container.querySelector(".grid");
    this.gridWrap = this.grid.querySelector(".grid-wrap");
    this.gridItems = [...this.grid.querySelectorAll(".grid__item")];
    this.gridItemsInner = this.gridItems.map((item) =>
      item.querySelector(".grid__item-inner")
    );
    this.visualLoader = container.querySelector(".hero-visual-loader");
    this.workItems = [...container.querySelectorAll(".home-works-item")];
    this.workItemsOdd = [
      ...container.querySelectorAll(".home-works-item:nth-of-type(odd)"),
    ];
    this.workItemsEven = [
      ...container.querySelectorAll(".home-works-item:nth-of-type(even)"),
    ];
    this.bgItems = [...container.querySelectorAll(".home-bg-work-item")];
    this.bgListContainer = container.querySelector(".home-bg-works");
    this.homeIntro = container.querySelector(".section.home-works-intro");
    this.homeWorksContainer = container.querySelector("#home-works");
    this.viewSwitch = container.querySelector(".view-switch");
    this.homeWorksWrapper = container.querySelector(".home-works-wrapper");
    this.z1 = [
      -2280.66439, -4090.43074, -3814.42043, -3526.10922, -3438.33831,
      -3977.22769, -2947.32029, -4917.0747, -2814.31399, -3264.86641,
      -2076.61897, -2822.42077, -4368.84388, -3575.85789, -4060.62386,
      -2997.28304, -3726.35285, -3119.24528, -4861.90888, -4942.12413,
      -2105.98518, -3063.85445, -3234.32121, -2448.31374, -4909.65988,
      -2673.39894, -2931.29392, -2609.19342, -4997.74786, -3815.48084,
    ];
    this.rotationX1 = [
      -46.88217, -30.32588, -28.24739, -45.87395, -64.4923, -41.22551,
      -56.70349, -40.52322, -28.44805, -57.75579, -31.12526, -36.47417,
      -33.61298, -27.84889, -52.21894, -53.44592, -52.7875, -60.55159,
      -50.84154, -43.58872, -41.84512, -34.50578, -51.32885, -53.09134,
      -59.61798, -36.72126, -43.09396, -63.48053, -50.89954, -47.45038,
    ];
    this.x1 = [
      31.34786, 33.75912, 78.84946, -116.37192, 46.40541, 88.96467, -74.66323,
      -46.83478, -70.30599, 81.86534, -16.7544, 62.39884, 88.75294, 91.24341,
      -47.76371, -57.57659, -94.61628, 19.8771, -12.55576, 145.99257, -58.57768,
      -1.82074, 97.72864, 94.68089, 120.50039, -1.19648, 145.40075, 52.93923,
      -70.35703, -45.39887,
    ];
    this.y1 = [
      13.10453, 291.57995, -286.78769, 194.36089, -296.30615, -103.70483,
      284.80738, -49.27964, 225.80777, -13.89143, 224.39513, -15.50033,
      37.30396, -139.84827, -282.30682, 55.85223, 34.37649, 111.7255, 273.34913,
      -243.09868, 151.2216, 250.80852, -107.12769, -231.67495, 46.84137,
      -277.76839, 265.60389, 155.55756, 205.66728, -65.64371,
    ];
    this.targetZValue = 1;
    this.closestItem = null;
    this.closestZDifference = Infinity;
    this.currIndex = 0;
    this.newIndex = 0;
    this.numItems = this.workItems.length;
    this.progress = 0;
    this.tl1 = null;
    this.tlList = null;
    this.viewBtns = container.querySelectorAll(".view-link");
    this.view = "grid-view";
    this.gridScroll = null;
    this.listViewWrapper = this.container.querySelector(
      ".home-list-view-wrapper"
    );
    this.listViewContainer = this.container.querySelector(
      ".home-list-view-list"
    );
    this.listViewItems = [
      ...this.container.querySelectorAll(".home-list-view-item"),
    ];
    this.textMask = container.querySelector(".text-mask");

    this.setUpStyles();
    this.setUpListeners();
    this.createScrollTriggers();
    this.createTimelines();
    this.init();
  }

  init() {
    gsap.set(this.visualLoader, { opacity: 1 });
    //firstLoad ? lenis.stop() : lenis.start();
    firstLoad = false;

    //Initialize the z position of the grid items for scroll
    gsap.set(this.workItems, {
      z: (i) => {
        return (i + 1) * -1800;
      },
      zIndex: (i) => {
        return i * -1;
      },
      opacity: 0,
    });
    //this.tl1.progress(this.progress / 100);
    this.getP();
  }

  setUpListeners() {
    this.container.addEventListener("click", (event) => {
      if (event.target.classList.contains("view-link")) {
        this.view = event.target.getAttribute("data-view");
        this.viewBtns.forEach((btn) => btn.classList.remove("current"));
        event.target.classList.add("current");
        this.switchViews(this.view);
      }
    });
  }

  switchViews(view) {
    if (view === "list-view") {
      this.textAnim.animateText(0.5, 120, 2);
      this.tlList.play();
    } else {
      this.textAnim.animateText(0, 0, 1, 120);
      this.tlList.reverse();
    }
  }

  setUpStyles() {
    // Set some CSS related style values
    this.grid.style.setProperty("--grid-width", "105%");
    this.grid.style.setProperty("--grid-columns", "8");
    this.grid.style.setProperty("--perspective", "1500px");
    this.grid.style.setProperty("--grid-inner-scale", "0.5");
  }

  getTotalHeight = (index) => {
    let height = 0;
    let mTitles = this.listViewItems.slice(0, index);
    mTitles.forEach(
      (el) => (height += el.offsetHeight + window.innerHeight * 0.12)
    );
    return height;
  };

  createScrollTriggers() {
    // ScrollTrigger for page background toggle
    ScrollTrigger.create({
      trigger: this.homeIntro,
      start: "top 80%",
      onEnter: () => {
        this.container.classList.toggle("bg-white");
      },
      onLeaveBack: () => {
        this.container.classList.toggle("bg-white");
      },
    });

    this.gridScroll = ScrollTrigger.create({
      trigger: this.homeWorksContainer,
      start: "top top",
      end: () => this.numItems * window.innerHeight,
      pin: this.homeIntro,
      scrub: 0.1,
      immediateRender: false,
      //animation: this.tl1,
      onUpdate: (self) => {
        this.progress = self.progress * 100;
        this.progress = gsap.utils.clamp(0, 100, this.progress);
        let m = (this.progress / 100) * 1800 * this.numItems;
        // Refactored to apply the z transformation directly
        gsap.set(this.workItems, {
          z: (i) => {
            return (i + 1) * -1800 + m;
          },
        });
        this.getP();
      },
    });

    ScrollTrigger.create({
      trigger: this.container,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        let scroll = self.progress * 100;
        this.container.querySelector("#home-scroll-percentage").innerHTML =
          parseInt(scroll, 10).toString() + "%";
      },
    });
  }

  createTimelines() {
    // Define GSAP timeline with ScrollTrigger
    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: this.gridWrap,
        start: "top bottom+=5%",
        end: "bottom top-=5%",
        scrub: true,
      },
    });

    // Define animations in the timeline
    timeline
      .set(this.gridItems, {
        transformOrigin: "50% 0%",
        z: (i) => this.z1[i],
        rotationX: (i) => this.rotationX1[i],
        filter: "brightness(0%)",
      })
      .to(
        this.gridItems,
        {
          xPercent: (i) => this.x1[i],
          yPercent: (i) => this.y1[i],
          rotationX: 0,
          filter: "brightness(100%)",
        },
        0
      )
      .to(
        this.gridWrap,
        {
          z: 6500,
        },
        0
      )
      .fromTo(
        this.gridItemsInner,
        {
          scale: 1.5,
        },
        {
          scale: 0.5,
        },
        0
      );

    // Additional timeline configurations
    // ...
    /*
    this.tl1 = gsap.timeline({ paused: true });

    this.tl1.to(this.workItems, {
      z: 1300,
      duration: (i) => {
        return (i + 1) * 0.5;
      },
      ease: "linear",
    });

     */

    let tlZoom = gsap
      .timeline({
        scrollTrigger: {
          trigger: this.homeWorksContainer,
          start: "top 15%",
          end: "top top",
          scrub: 1,
          ease: "linear",
          onEnter: () => {
            gsap.to(this.viewSwitch, {
              opacity: 1,
              visibility: "visible",
              duration: 0.3,
            });
          },
          onLeaveBack: () => {
            gsap.to(this.viewSwitch, {
              opacity: 0,
              visibility: "hidden",
              duration: 0.3,
            });
          },
          // markers: true,
        },
      })
      .to(this.homeWorksWrapper, { z: 0 })
      .from(this.homeWorksWrapper, { opacity: 0 }, "0");

    let tlZoom2 = gsap
      .timeline({
        scrollTrigger: {
          trigger: this.homeWorksContainer,
          start: "top top",
          scrub: true,
        },
      })
      .to(this.bgListContainer, { opacity: 1 })
      .from(this.textMask, { opacity: 0 });

    this.tlList = gsap.timeline({
      paused: true,
    });
    this.tlList
      .to(this.workItemsOdd, {
        x: "25vw",
      })
      .to(this.workItemsEven, { x: "-25vw" }, "<")
      .to(".home-works-name", { opacity: 0 }, "<")
      .to(this.bgListContainer, { filter: "blur(0px)" }, "<")
      .to(this.listViewWrapper, { opacity: 1, zIndex: 3 }, "<")
      .fromTo(
        this.workItems,
        {
          "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
        { "clip-path": "polygon(45% 50%, 55% 50%, 50% 50%, 50% 50%)" }
      );
  }

  getP = () => {
    this.resetClosestItem();
    this.workItems.forEach((item) => {
      let z = gsap.utils.normalize(-3000, 0, gsap.getProperty(item, "z"));
      item.setAttribute("data-z", z);
      gsap.to(item, { opacity: z + 0.2 });
      gsap.to(item.querySelector("img"), {
        scale: z * 0.5 + 0.75,
        ease: "expo.out",
        duration: 0.5,
      });
      let zDifference = Math.abs(z - this.targetZValue);
      if (zDifference < this.closestZDifference) {
        this.closestZDifference = zDifference;
        this.closestItem = item;
      }
    });
    this.currIndex = this.workItems.indexOf(this.closestItem);
    if (this.currIndex !== this.newIndex) {
      gsap.to(this.bgItems[this.newIndex], { opacity: 0, duration: 0.3 });
      gsap.to(this.listViewItems[this.newIndex], {
        filter: "blur(4px)",
        duration: 0.3,
      });
      this.newIndex = this.currIndex;
      gsap.to(this.bgItems[this.newIndex], { opacity: 1, duration: 0.3 });
      gsap.to(this.listViewItems[this.newIndex], {
        filter: "blur(0px)",
        duration: 0.3,
      });
      gsap.to(this.listViewContainer, {
        y: () => -this.getTotalHeight(this.newIndex),
      });
    }
  };

  resetClosestItem = () => {
    if (this.closestItem) {
      //closestItem.classList.remove("highlighted");
    }
    this.closestItem = null;
    this.closestZDifference = Infinity;
  };
}

class ParticleImage {
  constructor() {
    this.home = null;
    this.canvas = null;
    this.title = null;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.mouse = new THREE.Vector2();
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.raycaster = null;
    this.clock = null;
    this.orbit = null;
    this.particles = {};
    this.imageParticlesSystem = null;
    this.planeHelperObject = [];
    this.particleCanvas = null;
    this.guiParams = {};
    this.cameraNearPlane = 0.1;
    this.cameraFarPlane = 1000;

    this.init();
  }

  init() {
    window.onload = this.initParticleImage.bind(this);
  }

  initParticleImage() {
    // creating canvas and context objects
    this.canvas = document.getElementById("canvas");
    this.home = document.getElementById("home");

    // preparing scene
    this.scene = new THREE.Scene();

    // preparing camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      this.cameraNearPlane,
      this.cameraFarPlane
    );
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, 0, 700);
    this.scene.add(this.camera);

    this.mouse = new THREE.Vector2();

    // preparing canvas to get image data
    let coordinateCanvas = document.createElement("canvas");
    let ctx = coordinateCanvas.getContext("2d");

    this.particleCanvas = {};

    this.particleCanvas.width = 1500;
    this.particleCanvas.height = 600;

    coordinateCanvas.width = this.particleCanvas.width;
    coordinateCanvas.height = this.particleCanvas.height;

    // translate context to center of canvas
    ctx.translate(0, this.particleCanvas.height);

    // flip context vertically
    ctx.scale(1, -1);

    // write on canvas
    ctx.font = "250pt Romie";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      "404",
      coordinateCanvas.width / 2,
      coordinateCanvas.height / 2
    );

    // get image data
    let data = ctx.getImageData(
      0,
      0,
      coordinateCanvas.width,
      coordinateCanvas.height
    );
    ctx.clearRect(0, 0, coordinateCanvas.width, coordinateCanvas.height);

    // fill our particles coordinate array
    this.particles.initPositions = new Array();
    this.particles.minPositions = new Array();
    this.particles.maxPositions = new Array();
    this.particles.noiseValues = new Array();
    this.particles.colors = new Array();

    for (let y = 0, y2 = data.height; y < y2; y++) {
      for (let x = 0, x2 = data.width; x < x2; x++) {
        // if we got a white pixel from our text, create a particle
        if (data.data[x * 4 + y * 4 * data.width] > 128) {
          let maxZ = Math.random() * 2000 + (this.camera.position.z + 10);

          // before imploding
          this.particles.initPositions.push(x);
          this.particles.initPositions.push(y);
          this.particles.initPositions.push(maxZ);

          // after imploding
          this.particles.minPositions.push(x);
          this.particles.minPositions.push(y);
          this.particles.minPositions.push(0);

          // before imploding
          this.particles.maxPositions.push(x);
          this.particles.maxPositions.push(y);
          this.particles.maxPositions.push(maxZ);

          let color = new THREE.Color("#B5650E");
          this.particles.colors.push(color.r, color.g, color.b);

          let noiseX = Math.random() * 20 - 10;
          let noiseY = Math.random() * 20 - 10;

          this.particles.noiseValues.push(noiseX);
          this.particles.noiseValues.push(noiseY);
        }
      }
    }

    // plane helper for the raycaster
    let planeHelperGeometry = new THREE.PlaneGeometry(10000, 10000);
    let planeHelperMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0,
    });

    let planeHelper = new THREE.Mesh(planeHelperGeometry, planeHelperMaterial);

    this.planeHelperObject.push(planeHelper);
    this.scene.add(planeHelper);

    // preparing our buffer geometry
    let imageParticlesGeometry = new THREE.BufferGeometry();

    imageParticlesGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(this.particles.initPositions, 3)
    );
    imageParticlesGeometry.setAttribute(
      "minPosition",
      new THREE.Float32BufferAttribute(this.particles.minPositions, 3)
    );
    imageParticlesGeometry.setAttribute(
      "maxPosition",
      new THREE.Float32BufferAttribute(this.particles.maxPositions, 3)
    );
    imageParticlesGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(this.particles.colors, 3)
    );
    imageParticlesGeometry.setAttribute(
      "noiseValue",
      new THREE.Float32BufferAttribute(this.particles.noiseValues, 2)
    );
    imageParticlesGeometry.setAttribute(
      "mouseRepulsion",
      new THREE.Float32BufferAttribute(this.particles.mouseRepulsion, 1)
    );

    // our uniforms
    let uniforms = {
      uDuration: {
        type: "f",
        value: 180, // 3 seconds
      },
      uElapsedTime: {
        type: "f",
        value: 0,
      },
      uSize: {
        type: "f",
        value: 3,
      },
      uNoise: {
        type: "f",
        value: 8,
      },
      uMousePosition: {
        type: "v2",
        value: new THREE.Vector2(),
      },
      uMouseRadius: {
        type: "f",
        value: 100,
      },
      uMouseStrength: {
        type: "f",
        value: 0.75,
      },
    };

    let imageParticlesMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: document.getElementById("particle-image-vs").textContent,
      fragmentShader: document.getElementById("particle-image-fs").textContent,
    });

    // create the particle system
    this.imageParticlesSystem = new THREE.Points(
      imageParticlesGeometry,
      imageParticlesMaterial
    );

    this.imageParticlesSystem.position.x = (-1 * this.particleCanvas.width) / 2;
    this.imageParticlesSystem.position.y =
      (-1 * this.particleCanvas.height) / 2;

    // add it to the scene
    this.scene.add(this.imageParticlesSystem);

    // preparing new renderer and drawing it
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.canvas.appendChild(this.renderer.domElement);

    // get the main title HTML element
    this.title = document.getElementById("title").getElementsByTagName("h2")[0];

    // change positions by mouse
    document.addEventListener("mousemove", this.onMousemove.bind(this), false);

    // change canvas size on resize
    window.addEventListener("resize", this.onResize.bind(this), false);

    this.clock = new THREE.Clock();
    this.clock.start();

    // mouse interaction
    this.raycaster = new THREE.Raycaster();

    // ready to go
    document.body.classList.add("renderer-ready");

    this.animate();
  }

  onMousemove(event) {
    // used in the raycaster
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // translate the title
    let titleTranslation = {
      x: -(event.clientX - window.innerWidth / 2) / 10,
      y: -(event.clientY - window.innerHeight / 2) / 10,
    };

    this.title.style.transform =
      "translate3d(" +
      titleTranslation.x +
      "px, " +
      titleTranslation.y +
      "px, 0)";
  }

  onResize(event) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    let mouseX, mouseY;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    let intersects;
    intersects = this.raycaster.intersectObjects(this.planeHelperObject, true);

    if (intersects.length > 0) {
      let intersection = intersects[0];
      mouseX = intersection.point.x + this.particleCanvas.width / 2;
      mouseY = intersection.point.y + this.particleCanvas.height / 2;
    }

    // animate here
    if (this.imageParticlesSystem.material.uniforms) {
      this.imageParticlesSystem.material.uniforms.uElapsedTime.value++;

      this.imageParticlesSystem.material.uniforms.uMousePosition.value.x =
        mouseX;
      this.imageParticlesSystem.material.uniforms.uMousePosition.value.y =
        mouseY;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

/*
class SeamlessLoopAnimator {
  constructor() {
    this.iteration = 0; // Iteration counter
    this.spacing = 0.15; // Spacing of the cards
    this.cards = gsap.utils.toArray(".works-list-item");
    this.cardsListWrapper = document.querySelector(".works-list-wrapper");
    this.seamlessLoop = this.buildSeamlessLoop(this.cards, this.spacing);
    this.scrub = gsap.to(this.seamlessLoop, {
      totalTime: 0,
      duration: 0.5,
      ease: "power3",
      paused: true,
    });

    // Initialize the scroll trigger
    this.initScrollTrigger();
  }

  wrapForward(trigger) {
    this.iteration++;
    trigger.wrapping = true;
    trigger.scroll(trigger.start + 1);
  }

  wrapBackward(trigger) {
    this.iteration--;
    if (this.iteration < 0) {
      this.iteration = 9;
      this.seamlessLoop.totalTime(
        this.seamlessLoop.totalTime() + this.seamlessLoop.duration() * 10
      );
      this.scrub.pause();
    }
    trigger.wrapping = true;
    trigger.scroll(trigger.end - 1);
  }

  scrubTo(totalTime) {
    let progress =
      (totalTime - this.seamlessLoop.duration() * this.iteration) /
      this.seamlessLoop.duration();
    if (progress > 1) {
      this.wrapForward(this.trigger);
    } else if (progress < 0) {
      this.wrapBackward(this.trigger);
    } else {
      this.trigger.scroll(
        this.trigger.start + progress * (this.trigger.end - this.trigger.start)
      );
    }
  }

  buildSeamlessLoop(items, spacing) {
    let overlap = Math.ceil(1 / spacing), // number of EXTRA animations on either side of the start/end to accommodate the seamless looping
      startTime = items.length * spacing + 0.5, // the time on the rawSequence at which we'll start the seamless loop
      loopTime = (items.length + overlap) * spacing + 1, // the spot at the end where we loop back to the startTime
      rawSequence = gsap.timeline({ paused: true }), // this is where all the "real" animations live
      seamlessLoop = gsap.timeline({
        // this merely scrubs the playhead of the rawSequence so that it appears to seamlessly loop
        paused: true,
        repeat: -1, // to accommodate infinite scrolling/looping
        onRepeat() {
          // works around a super rare edge case bug that's fixed GSAP 3.6.1
          this._time === this._dur && (this._tTime += this._dur - 0.01);
        },
      }),
      l = items.length + overlap * 2,
      time = 0,
      i,
      index,
      item;

    // set initial state of items
    gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 });

    // now loop through and create all the animations in a staggered fashion. Remember, we must create EXTRA animations at the end to accommodate the seamless looping.
    for (i = 0; i < l; i++) {
      index = i % items.length;
      item = items[index];
      time = i * spacing;
      rawSequence
        .fromTo(
          item,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            zIndex: 100,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power1.in",
            immediateRender: false,
          },
          time
        )
        .fromTo(
          item,
          { xPercent: 400 },
          { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
          time
        );
      i <= items.length && seamlessLoop.add("label" + i, time); // we don't really need these, but if you wanted to jump to key spots using labels, here ya go.
    }

    // here's where we set up the scrubbing of the playhead to make it appear seamless.
    rawSequence.time(startTime);
    seamlessLoop
      .to(rawSequence, {
        time: loopTime,
        duration: loopTime - startTime,
        ease: "none",
      })
      .fromTo(
        rawSequence,
        { time: overlap * spacing + 1 },
        {
          time: startTime,
          duration: startTime - (overlap * spacing + 1),
          immediateRender: false,
          ease: "power1.in",
        }
      );
    return seamlessLoop;
  }

  initScrollTrigger() {
    this.trigger = ScrollTrigger.create({
      start: 0,
      onUpdate: (self) => {
        const snap = gsap.utils.snap(this.spacing);
        if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
          this.wrapForward(self);
        } else if (
          self.progress < 1e-5 &&
          self.direction < 0 &&
          !self.wrapping
        ) {
          this.wrapBackward(self);
        } else {
          this.scrub.vars.totalTime = snap(
            (this.iteration + self.progress) * this.seamlessLoop.duration()
          );
          this.scrub.invalidate().restart();
          self.wrapping = false;
        }
      },
      end: "+" + `${this.cards.length * 100}`,
      pin: ".works-list-wrapper",
    });
  }
}

 */

barba.hooks.beforeLeave((data) => {
  gsap.getTweensOf("*").forEach((animation) => {
    animation.kill();
  });
  ScrollTrigger.clearScrollMemory();
  ScrollTrigger.removeEventListener("scrollEnd", gallerySnap);
  // Observer.getAll().forEach((o) => o.kill());
  ScrollTrigger.getAll().forEach((t) => t.kill());
  console.log(gsap.getTweensOf("*"));

  window.scroll(0, 0);
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }
});

let firstLoad = true;

barba.init({
  preventRunning: true,
  views: [
    {
      namespace: "home",
      beforeEnter(data) {
        let nextContainer = data.next.container;
        Splitting();
        new Nav(nextContainer);
        let introA = new IntroAnimator(nextContainer);
        if (firstLoad) {
          new LoaderAnimator(nextContainer, introA);
        } else {
          gsap.to(".hero-visual-loader", { opacity: 0 });
          gsap.to(".hero-visual-img", {
            opacity: 1,
            display: "block",
            duration: 1,
          });
          // lenis.start();
          introA.animateText();
        }
        let textAnim = new TextAnimator(
          nextContainer.querySelector(".home-list-view-wrapper"),
          0,
          120,
          2,
          false
        );
        new HomeAnimation(nextContainer, textAnim);
      },
    },
    {
      namespace: "contact",
      beforeEnter(data) {
        let nextContainer = data.next.container;
        Splitting();
        new TextAnimator(nextContainer, 0.8);
        new RevealAnimator(nextContainer, 0.4);
        new Nav(nextContainer);
      },
    },
    {
      namespace: "about",
      beforeEnter(data) {
        let nextContainer = data.next.container;
        Splitting();
        new TextAnimator(nextContainer, 0.8);
        new RevealAnimator(nextContainer, 0.4);
        new Nav(nextContainer);
      },
    },
    {
      namespace: "work-category",
      beforeEnter(data) {
        let nextContainer = data.next.container;
        Splitting();
        //new SeamlessLoopAnimator();
        new GalleryScroller(nextContainer);
        new Nav(nextContainer);
      },
    },
    {
      namespace: "work",
      beforeEnter(data) {
        let nextContainer = data.next.container;
        Splitting();
        new TextAnimator(nextContainer, 0.8);
        new Nav(nextContainer);
        new SectionNavigator(nextContainer);
      },
    },
    {
      namespace: "archive",
      beforeEnter(data) {
        let nextContainer = data.next.container;
        new Nav(nextContainer);
      },
    },
    {
      namespace: "404",
      beforeEnter() {
        new ParticleImage();
      },
    },
  ],
  transitions: [
    {
      sync: true, //keep the previous and next container on the page at the same time
      enter(data) {
        let nextContainer = data.next.container;
        let currentContainer = data.current.container;
        gsap.set(currentContainer, { opacity: 0.4, duration: 1 });
        return gsap.fromTo(
          nextContainer,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "expo.inOut",
            duration: 2,
          }
        );
      },
      after(data) {
        let nextContainer = data.next.container;
      },
    },
  ],
});

window.addEventListener("DOMContentLoaded", () => {
  gsap.from("body", { autoAlpha: 0, duration: 1, ease: "linear" });
  gsap.to(":root", {
    duration: window.location.pathname === "/" ? 8 : 1,
    ease: "power1.out",
    "--visual-hidden": 1, // Targeting the CSS variable
  });
});
