gsap.registerPlugin(ScrollTrigger, Draggable);

class Nav {
  constructor(container) {
    this.nav = container.querySelector(".nav");
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
    );
    tl.fromTo(this.main, { opacity: 1 }, { opacity: 0.3, duration: 0.6 }, "<");
    tl.fromTo(
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
    );
    tl.fromTo(
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
    );
    tl.fromTo(this.main, { opacity: 1 }, { opacity: 0.3, duration: 0.6 }, "<");
    tl.fromTo(
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
  constructor(container, delay = 0) {
    this.words = [...container.querySelectorAll(".word")];
    this.dataText = [...container.querySelectorAll("[data-splitting]")];
    this.delay = delay;
    this.init();
  }

  wrapWords() {
    gsap.set(this.words, { yPercent: -120 });
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
        if (!title.hasAttribute("no-instance")) {
          const chars = title.querySelectorAll(".word");
          gsap.fromTo(
            chars,
            {
              "will-change": "transform",
              transformOrigin: "0% 50%",
              yPercent: -120,
            },
            {
              duration: 3,
              ease: "expo",
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
    this.animateText(this.delay);
  }
}

class GalleryScroller {
  constructor(container) {
    this.iteration = 0;

    this.spacing = 0.15; // spacing of the cards (stagger)
    this.snapTime = gsap.utils.snap(this.spacing); // we'll use this to snapTime the playhead on the seamlessLoop
    this.cards = [...container.querySelectorAll(".works-list-item")];
    this.cardsList = container.querySelector(".works-list");
    this.cardsListWrapper = container.querySelector(".works-list-wrapper");
    this.dragWrapper = container.querySelector(".drag-proxy");
    this.seamlessLoop = this.buildSeamlessLoop(
      this.cards,
      this.spacing,
      this.animateFunc.bind(this)
    );
    this.playhead = { offset: 0 }; // a proxy object we use to simulate the playhead position

    // Set initial state of items
    gsap.set(this.cards, { xPercent: 400, opacity: 0, scale: 0 });

    this.scrub = gsap.to(this.playhead, {
      offset: 0,
      onUpdate: this.onScrubUpdate.bind(this),
      duration: 0.5,
      ease: "power3",
      paused: true,
    });

    this.trigger = ScrollTrigger.create({
      start: 0,
      onUpdate: this.onScrollUpdate.bind(this),
      end: "+=3000",
      pin: this.cardsListWrapper,
    });

    ScrollTrigger.addEventListener("scrollEnd", () =>
      this.scrollToOffset(this.scrub.vars.offset)
    );

    Draggable.create(this.dragWrapper, {
      type: "x",
      trigger: this.cardsList,
      onPress: this.onPress.bind(this),
      onDrag: this.onDrag.bind(this),
      onDragEnd: () => this.scrollToOffset(this.scrub.vars.offset),
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
      { xPercent: 400 },
      { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
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
      this.scrub.vars.offset =
        (this.iteration + self.progress) * this.seamlessLoop.duration();
      this.scrub.invalidate().restart();
    }
  }

  scrollToOffset(offset) {
    const snappedTime = this.snapTime(offset);
    const progress =
      (snappedTime - this.seamlessLoop.duration() * this.iteration) /
      this.seamlessLoop.duration();
    const scroll = this.progressToScroll(progress);

    if (progress >= 1 || progress < 0) {
      this.wrap(Math.floor(progress), scroll);
      return;
    }

    this.trigger.scroll(scroll);
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
function gallery() {
  let iteration = 0; // gets iterated when we scroll all the way to the end or start and wraps around - allows us to smoothly continue the playhead scrubbing in the correct direction.

  // set initial state of items
  gsap.set(".works-list-item", { xPercent: 400, opacity: 0, scale: 0 });

  const spacing = 0.15, // spacing of the cards (stagger)
    snapTime = gsap.utils.snap(spacing), // we'll use this to snapTime the playhead on the seamlessLoop
    cards = gsap.utils.toArray(".works-list-item"),
    // this function will get called for each element in the buildSeamlessLoop() function, and we just need to return an animation that'll get inserted into a master timeline, spaced
    animateFunc = (element) => {
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
        { xPercent: 400 },
        { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
        0
      );
      return tl;
    },
    seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc),
    playhead = { offset: 0 }, // a proxy object we use to simulate the playhead position, but it can go infinitely in either direction and we'll just use an onUpdate to convert it to the corresponding time on the seamlessLoop timeline.
    wrapTime = gsap.utils.wrap(0, seamlessLoop.duration()), // feed in any offset (time) and it'll return the corresponding wrapped time (a safe value between 0 and the seamlessLoop's duration)
    scrub = gsap.to(playhead, {
      // we reuse this tween to smoothly scrub the playhead on the seamlessLoop
      offset: 0,
      onUpdate() {
        seamlessLoop.time(wrapTime(playhead.offset)); // convert the offset to a "safe" corresponding time on the seamlessLoop timeline
      },
      duration: 0.5,
      ease: "power3",
      paused: true,
    }),
    trigger = ScrollTrigger.create({
      start: 0,
      onUpdate(self) {
        let scroll = self.scroll();
        if (scroll > self.end - 1) {
          wrap(1, 2);
        } else if (scroll < 1 && self.direction < 0) {
          wrap(-1, self.end - 2);
        } else {
          scrub.vars.offset =
            (iteration + self.progress) * seamlessLoop.duration();
          scrub.invalidate().restart(); // to improve performance, we just invalidate and restart the same tween. No need for overwrites or creating a new tween on each update.
        }
      },
      end: "+=3000",
      pin: ".works-list-wrapper",
    }),
    // converts a progress value (0-1, but could go outside those bounds when wrapping) into a "safe" scroll value that's at least 1 away from the start or end because we reserve those for sensing when the user scrolls ALL the way up or down, to wrap.
    progressToScroll = (progress) =>
      gsap.utils.clamp(
        1,
        trigger.end - 1,
        gsap.utils.wrap(0, 1, progress) * trigger.end
      ),
    wrap = (iterationDelta, scrollTo) => {
      iteration += iterationDelta;
      trigger.scroll(scrollTo);
      trigger.update(); // by default, when we trigger.scroll(), it waits 1 tick to update().
    };

  // when the user stops scrolling, snap to the closest item.
  ScrollTrigger.addEventListener("scrollEnd", () =>
    scrollToOffset(scrub.vars.offset)
  );

  // feed in an offset (like a time on the seamlessLoop timeline, but it can exceed 0 and duration() in either direction; it'll wrap) and it'll set the scroll position accordingly. That'll call the onUpdate() on the trigger if there's a change.
  function scrollToOffset(offset) {
    // moves the scroll playhead to the place that corresponds to the totalTime value of the seamlessLoop, and wraps if necessary.
    let snappedTime = snapTime(offset),
      progress =
        (snappedTime - seamlessLoop.duration() * iteration) /
        seamlessLoop.duration(),
      scroll = progressToScroll(progress);
    if (progress >= 1 || progress < 0) {
      return wrap(Math.floor(progress), scroll);
    }
    trigger.scroll(scroll);
  }

  function buildSeamlessLoop(items, spacing, animateFunc) {
    let rawSequence = gsap.timeline({ paused: true }), // this is where all the "real" animations live
      seamlessLoop = gsap.timeline({
        // this merely scrubs the playhead of the rawSequence so that it appears to seamlessly loop
        paused: true,
        repeat: -1, // to accommodate infinite scrolling/looping
        onRepeat() {
          // works around a super rare edge case bug that's fixed GSAP 3.6.1
          this._time === this._dur && (this._tTime += this._dur - 0.01);
        },
        onReverseComplete() {
          this.totalTime(this.rawTime() + this.duration() * 100); // seamless looping backwards
        },
      }),
      cycleDuration = spacing * items.length,
      dur; // the duration of just one animateFunc() (we'll populate it in the .forEach() below...

    // loop through 3 times so we can have an extra cycle at the start and end - we'll scrub the playhead only on the 2nd cycle
    items
      .concat(items)
      .concat(items)
      .forEach((item, i) => {
        let anim = animateFunc(items[i % items.length]);
        rawSequence.add(anim, i * spacing);
        dur || (dur = anim.duration());
      });

    // animate the playhead linearly from the start of the 2nd cycle to its end (so we'll have one "extra" cycle at the beginning and end)
    seamlessLoop.fromTo(
      rawSequence,
      {
        time: cycleDuration + dur / 2,
      },
      {
        time: "+=" + cycleDuration,
        duration: cycleDuration,
        ease: "none",
      }
    );
    return seamlessLoop;
  }

  // below is the dragging functionality (mobile-friendly too)...
  Draggable.create(".drag-proxy", {
    type: "x",
    trigger: ".works-list",
    onPress() {
      this.startOffset = scrub.vars.offset;
    },
    onDrag() {
      scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
      scrub.invalidate().restart(); // same thing as we do in the ScrollTrigger's onUpdate
    },
    onDragEnd() {
      scrollToOffset(scrub.vars.offset);
    },
  });
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
      gsap.to(this.thumbnails[this.currentIndex].querySelector("img"), {
        filter: "saturate(0%)",
      });
    }

    tl.to(this.sections[index], { autoAlpha: 1, zIndex: 1 });
    tl.to(
      this.thumbnails[index].querySelector("img"),
      { filter: "saturate(100%)" },
      "<"
    );

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
    Observer.create({
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

barba.hooks.enter((data) => {
  window.scroll(0, 0);
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }
});

let run = true;

barba.init({
  preventRunning: true,
  views: [
    {
      namespace: "home",
      beforeEnter(data) {
        let nextContainer = data.next.container;
        new Nav(nextContainer);
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
        gallery();
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
  ],
  transitions: [
    {
      sync: true, //keep the previous and next container on the page at the same time
      enter(data) {
        let nextContainer = data.next.container;
        let currentContainer = data.current.container;
        //nextContainer.classList.add("fixed");
        gsap.set(currentContainer, { opacity: 0.4, duration: 1 });
        //window.scroll(0, 0);
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
        //Scrolls to the top of document
        //nextContainer.classList.remove("fixed");
      },
    },
  ],
});

window.addEventListener("DOMContentLoaded", () => {
  gsap.to("body", { autoAlpha: 1, duration: 0.1, ease: "linear" });
});
