var E=Object.defineProperty;var k=(r,t,e)=>t in r?E(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var u=(r,t,e)=>(k(r,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();gsap.registerPlugin(ScrollTrigger,Flip);const p=new Lenis;p.on("scroll",ScrollTrigger.update);gsap.ticker.add(r=>{p.raf(r*1e3)});gsap.ticker.lagSmoothing(0);class c{constructor(t){this.worksLink=t.querySelector("[nav-works]"),this.worksIcon=t.querySelector(".nav-span"),this.worksDropdown=t.querySelector(".menu-works-dropdown"),this.worksLine=t.querySelector(".menu-works-line"),this.mobileMenuIcon=t.querySelector(".mobile-menu-icon"),this.mobileMenu=t.querySelector(".mobile-menu"),this.mobileMenuOpen=!1,this.main=t.querySelector(".main"),this.desktopTL=this.desktopReveal(),this.mobileTL=this.mobileReveal(),this.setupEventListener()}desktopReveal(){let t=gsap.timeline({paused:!0});return t.fromTo(this.worksIcon,{rotation:0},{rotation:45,duration:1,ease:"expo.out"}).fromTo(this.main,{opacity:1},{opacity:.3,duration:.6},"<").fromTo(this.worksDropdown,{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",display:"none"},{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",display:"grid",ease:"expo.inOut",delay:this.delay,duration:1.5},"<").fromTo(this.worksLine,{width:"0%"},{width:"100%",duration:.6,ease:"expo.out"},"<0.9"),t}mobileReveal(){let t=gsap.timeline({paused:!0});return t.fromTo(this.mobileMenuIcon,{rotation:0},{rotation:45,duration:1,ease:"expo.out"}).fromTo(this.main,{opacity:1},{opacity:.3,duration:.6},"<").fromTo(this.mobileMenu,{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",display:"none"},{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",display:"block",ease:"expo.inOut",delay:this.delay,duration:1.5},"<"),t}setupEventListener(){this.worksLink.addEventListener("mouseenter",()=>{this.desktopTL.play()}),this.worksLink.addEventListener("mouseleave",()=>{this.desktopTL.reverse()}),this.mobileMenuIcon.addEventListener("click",()=>{this.mobileMenuOpen?this.mobileTL.reverse():this.mobileTL.play(),this.mobileMenuOpen=!this.mobileMenuOpen})}}class v{constructor(t,e=0){this.images=[...t.querySelectorAll("[data-slide-img]")],this.delay=e,this.init()}reveal(){this.images.length!==0&&this.images.forEach(t=>{gsap.fromTo(t,{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"},{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",ease:"expo.inOut",delay:this.delay,duration:1.5})})}init(){this.reveal()}}class m{constructor(t,e=0,i=-120,s=3,o=!0){this.words=[...t.querySelectorAll(".word")],this.dataText=[...t.querySelectorAll("[data-splitting]")],this.delay=e,this.duration=s,this.y=i,this.active=o,this.timeline=null,this.init()}wrapWords(t){gsap.set(this.words,{yPercent:t}),this.words.forEach(e=>{let i=document.createElement("span");i.classList.add("char-wrap"),e.parentNode.insertBefore(i,e),i.appendChild(e)})}animateText(t,e,i,s=0){this.dataText.length!==0&&this.dataText.forEach(o=>{if(!o.hasAttribute("no-instance")&&o["🍌"].lines.length>0){const a=o.querySelectorAll(".word");this.timeline=gsap.timeline(),this.timeline.fromTo(a,{"will-change":"transform",transformOrigin:"0% 50%",yPercent:e},{duration:i,ease:"expo",yPercent:s,delay:t})}})}init(){this.wrapWords(this.y),this.active&&this.animateText(this.delay,this.y,this.duration)}}class L{constructor(t,e=0){this.words=[...t.querySelector(".hero-intro-container").querySelectorAll(".word")],this.dataText=[...t.querySelector(".hero-intro-container").querySelectorAll("[data-splitting]")],this.arrowTop=t.querySelector(".arrow-wrapper.top"),this.arrowBottom=t.querySelector(".arrow-wrapper.bottom"),this.delay=e,this.init()}wrapWords(){gsap.set(this.words,{opacity:0,yPercent:-120}),this.words.forEach(t=>{let e=document.createElement("span");e.classList.add("char-wrap"),t.parentNode.insertBefore(e,t),e.appendChild(t)})}arrowLoop(){let t=gsap.timeline({repeat:-1});t.set([this.arrowTop,this.arrowBottom],{opacity:0}),t.set(this.arrowTop,{yPercent:-10}),t.to(this.arrowTop,{opacity:1,yPercent:0,duration:.5}),t.to(this.arrowBottom,{opacity:1,duration:.5}),t.to([this.arrowTop,this.arrowBottom],{opacity:0,duration:.5}),t.to(this.arrowTop,{yPercent:-10,duration:.5})}animateText(t){this.dataText.length!==0&&this.dataText.forEach(e=>{if(e["🍌"].words.length>0){const i=e.querySelectorAll(".word");gsap.fromTo(i,{"will-change":"transform",transformOrigin:"0% 50%",opacity:0,yPercent:-120},{duration:3,ease:"expo",opacity:1,yPercent:0,delay:t})}})}init(){this.wrapWords(),this.arrowLoop()}}class P{constructor(t,e){this.workImages=[...t.querySelectorAll(".works-intro-item")],this.flipContainers=[...t.querySelectorAll(".hero-c")],this.finalContainers=[...t.querySelectorAll("[data-hero-visual]")],this.excludedIndices=[1,6,10],this.introAnimation=e,this.selectedItems=this.workImages.filter(i=>{const s=parseInt(i.getAttribute("data-flip-id"));return!this.excludedIndices.includes(s)}),this.mainItems=this.workImages.filter(i=>{const s=parseInt(i.getAttribute("data-flip-id"));return this.excludedIndices.includes(s)}),this.items=this.mainItems.map(i=>i.querySelector("img")),this.state=Flip.getState(this.workImages),this.flipContainers.forEach((i,s)=>{i.append(this.workImages[this.flipContainers.length-(s+1)])}),this.loaderTimeline=gsap.timeline().add(()=>{Flip.from(this.state,{duration:1,opacity:1,zIndex:-1,stagger:.1,ease:"expo.out"}).fromTo(this.selectedItems,{opacity:1,duration:1,ease:"expo.out"},{opacity:0,duration:1,stagger:{amount:1},ease:"expo.out"},">0.2").to(".loading-text",{opacity:0,duration:1,ease:"expo.out"},"<").eventCallback("onComplete",()=>{this.introAnimation.animateText(),this.state=Flip.getState(this.items),this.state2=Flip.getState(this.finalContainers),setTimeout(()=>{this.finalContainers.forEach((i,s)=>{const o=parseInt(i.getAttribute("data-flip-id"));let a=this.mainItems.filter(n=>parseInt(n.getAttribute("data-flip-id"))===o);i.append(a[0].querySelector("img"))}),Flip.from(this.state,{duration:1,zIndex:-1,ease:"power4.out",onComplete:()=>{p.start()}})},500)})}),this.formatNumber=(i,s)=>{let o=(+i).toLocaleString("en-US").split(".");return s?o[0]+"."+((o[1]||"")+"00000000").substr(0,s):o[0]},gsap.to("#loaderPercentage",{textContent:"100",duration:3,ease:"power1.inOut",modifiers:{textContent:i=>this.formatNumber(i,0)+"%"}})}}let w=null;class A{constructor(t){this.initializeProperties(t),this.setupScrollTrigger(),this.setupInitialAnimations()}initializeProperties(t){this.iteration=0,this.spacing=.15,this.snapTime=gsap.utils.snap(this.spacing),this.cards=[...t.querySelectorAll(".works-list-item")],this.cardsCount=this.cards.length,this.cardsList=t.querySelector(".works-list"),this.cardsListWrapper=t.querySelector(".works-list-wrapper"),this.sectionWrapper=t.querySelector("[visibility-hidden]"),this.workNavigator=t.querySelector(".work-navigator"),this.seamlessLoop=this.buildSeamlessLoop(this.cards,this.spacing,this.animateFunc.bind(this)),this.playhead={offset:0},this.scroll=null,w=()=>this.scrollToOffset(this.scrub.vars.offset)}setupScrollTrigger(){this.trigger=ScrollTrigger.create({start:0,onUpdate:this.onScrollUpdate.bind(this),end:`+=${this.cardsCount*4*100}`,pin:this.cardsListWrapper}),ScrollTrigger.addEventListener("scrollEnd",w)}setupInitialAnimations(){gsap.set(this.cards,{x:"400%",opacity:0,scale:0}),gsap.from(this.sectionWrapper,{autoAlpha:0,duration:1,ease:"expo"}),this.scrub=gsap.to(this.playhead,{offset:0,onUpdate:this.onScrubUpdate.bind(this),duration:.5,ease:"power3",paused:!0}),this.cardsListWrapper.appendChild(this.workNavigator),this.navigator(),window.scroll(0,1)}animateFunc(t){const e=gsap.timeline();return e.fromTo(t,{scale:0,opacity:0},{scale:1,opacity:1,zIndex:100,duration:.5,yoyo:!0,repeat:1,ease:"power1.in",immediateRender:!1}).fromTo(t,{x:"400%"},{x:"-400%",duration:1,ease:"none",immediateRender:!1},0),e}buildSeamlessLoop(t,e,i){let s=gsap.timeline({paused:!0}),o=gsap.timeline({paused:!0,repeat:-1,onRepeat:()=>{this._time===this._dur&&(this._tTime+=this._dur-.01)},onReverseComplete:()=>{this.totalTime(this.rawTime()+this.duration()*100)}}),a=e*t.length,n;return t.concat(t).concat(t).forEach((f,d)=>{let l=i(t[d%t.length]);s.add(l,d*e),n||(n=l.duration())}),o.fromTo(s,{time:a+n/2},{time:"+="+a,duration:a,ease:"none"}),o}onScrubUpdate(){const t=gsap.utils.wrap(0,this.seamlessLoop.duration());this.seamlessLoop.time(t(this.playhead.offset))}onScrollUpdate(t){const e=t.scroll();if(e>t.end-1)this.wrap(1,2);else if(e<1&&t.direction<0)this.wrap(-1,t.end-2);else{const i=(this.iteration+t.progress)*this.seamlessLoop.duration();i!==this.scrub.vars.offset&&(this.scrub.vars.offset=i,this.scrub.invalidate().restart())}}scrollToOffset(t){const i=(this.snapTime(t)-this.seamlessLoop.duration()*this.iteration)/this.seamlessLoop.duration();if(this.scroll=this.progressToScroll(i),i>=1||i<0){this.wrap(Math.floor(i),this.scroll);return}this.trigger.scroll(this.scroll)}progressToScroll(t){return gsap.utils.clamp(1,this.trigger.end-1,gsap.utils.wrap(0,1,t)*this.trigger.end)}wrap(t,e){this.iteration+=t,this.trigger.scroll(e),this.trigger.update()}navigator(){let t=this.scrollToOffset.bind(this),e=this.scrub,i=this.spacing;this.workNavigator.addEventListener("click",function(s){let o=s.target.closest("[data-work-nav]");console.log(o),o&&(o.dataset.workNav==="next"?t(e.vars.offset+i):o.dataset.workNav==="prev"&&t(e.vars.offset-i))})}}class C{constructor(t){this.sections=t.querySelectorAll(".work-main-item"),this.thumbnails=[...t.querySelectorAll(".work-thumbnail-item")],this.thumbnailsList=t.querySelector(".work-thumbnail-list"),this.indicator=t.querySelector(".indicator"),this.currentIndex=-1,this.wrap=gsap.utils.wrap(0,this.sections.length),this.animating=!1,this.desktopFlag=!1,this.mobileFlag=!1,this.mm=gsap.matchMedia(),gsap.set(this.sections,{zIndex:0,opacity:0}),gsap.set(this.indicator,{opacity:1}),this.desktopCheck(),this.mobileCheck(),this.initEventListeners(),this.gotoSection(0,1)}desktopCheck(){this.desktopFlag=this.thumbnailsList.scrollHeight>window.innerHeight}mobileCheck(){this.mobileFlag=this.thumbnailsList.scrollWidth>window.innerWidth}gotoSection(t,e){t=this.wrap(t),this.animating=!0;let i=gsap.timeline({defaults:{duration:1,ease:"power1.inOut"},onComplete:()=>this.animating=!1});this.currentIndex>=0&&gsap.to(this.sections[this.currentIndex],{zIndex:0,opacity:0}),i.to(this.sections[t],{autoAlpha:1,zIndex:1}),this.mm.add("(min-width: 768px)",()=>{i.to(this.indicator,{x:0,y:`${t*100}%`,duration:1,ease:"power1.inOut"},"<"),this.desktopFlag&&gsap.to(this.thumbnailsList,{duration:1,y:`${-(t/this.sections.length)*100}%`,x:0,ease:"power3.inOut"})}),this.mm.add("(max-width: 767px)",()=>{i.to(this.indicator,{y:0,x:`${t*100}%`,duration:1,ease:"power1.inOut"},"<"),this.mobileFlag&&gsap.to(this.thumbnailsList,{duration:1,y:0,x:`${-(t/this.sections.length)*100}%`,ease:"power3.inOut"})}),this.currentIndex=t}initEventListeners(){ScrollTrigger.observe({type:"wheel,touch,pointer",wheelSpeed:-1,onDown:()=>!this.animating&&this.gotoSection(this.currentIndex-1,-1),onUp:()=>!this.animating&&this.gotoSection(this.currentIndex+1,1),tolerance:10,preventDefault:!0}),this.thumbnails.forEach((t,e)=>{t.addEventListener("click",()=>{e!==this.currentIndex&&this.gotoSection(e,e<this.currentIndex?-1:1)})}),window.addEventListener("resize",()=>{document.querySelector(".work-thumbnail-list")&&(this.desktopCheck(),this.mobileCheck(),this.gotoSection(this.currentIndex,1))})}}class q{constructor(t,e){u(this,"getTotalHeight",t=>{let e=0;return this.listViewItems.slice(0,t).forEach(s=>e+=s.offsetHeight+window.innerHeight*.12),e});u(this,"getP",()=>{this.resetClosestItem(),this.workItems.forEach(t=>{let e=gsap.utils.normalize(-3e3,0,gsap.getProperty(t,"z"));t.setAttribute("data-z",e),gsap.to(t,{opacity:e+.2}),gsap.to(t.querySelector("img"),{scale:e*.5+.75,ease:"expo.out",duration:.5});let i=Math.abs(e-this.targetZValue);i<this.closestZDifference&&(this.closestZDifference=i,this.closestItem=t)}),this.currIndex=this.workItems.indexOf(this.closestItem),this.currIndex!==this.newIndex&&(gsap.to(this.bgItems[this.newIndex],{opacity:0,duration:.3}),gsap.to(this.listViewItems[this.newIndex],{filter:"blur(4px)",duration:.3}),this.newIndex=this.currIndex,gsap.to(this.bgItems[this.newIndex],{opacity:1,duration:.3}),gsap.to(this.listViewItems[this.newIndex],{filter:"blur(0px)",duration:.3}),gsap.to(this.listViewContainer,{y:()=>-this.getTotalHeight(this.newIndex)}))});u(this,"resetClosestItem",()=>{this.closestItem,this.closestItem=null,this.closestZDifference=1/0});this.container=t,this.textAnim=e,this.grid=t.querySelector(".grid"),this.gridWrap=this.grid.querySelector(".grid-wrap"),this.gridItems=[...this.grid.querySelectorAll(".grid__item")],this.gridItemsInner=this.gridItems.map(i=>i.querySelector(".grid__item-inner")),this.visualLoader=t.querySelector(".hero-visual-loader"),this.workItems=[...t.querySelectorAll(".home-works-item")],this.workItemsOdd=[...t.querySelectorAll(".home-works-item:nth-of-type(odd)")],this.workItemsEven=[...t.querySelectorAll(".home-works-item:nth-of-type(even)")],this.bgItems=[...t.querySelectorAll(".home-bg-work-item")],this.bgListContainer=t.querySelector(".home-bg-works"),this.homeIntro=t.querySelector(".section.home-works-intro"),this.homeWorksContainer=t.querySelector("#home-works"),this.viewSwitch=t.querySelector(".view-switch"),this.homeWorksWrapper=t.querySelector(".home-works-wrapper"),this.z1=[-2280.66439,-4090.43074,-3814.42043,-3526.10922,-3438.33831,-3977.22769,-2947.32029,-4917.0747,-2814.31399,-3264.86641,-2076.61897,-4822.42077,-4368.84388,-3575.85789,-4060.62386,-2997.28304,-3726.35285,-3119.24528,-4861.90888,-4942.12413,-2105.98518,-3063.85445,-3234.32121,-2448.31374,-4909.65988,-2673.39894,-2931.29392,-2609.19342,-4997.74786,-3815.48084],this.rotationX1=[-46.88217,-30.32588,-28.24739,-45.87395,-64.4923,-41.22551,-56.70349,-40.52322,-28.44805,-57.75579,-31.12526,-36.47417,-33.61298,-27.84889,-52.21894,-53.44592,-52.7875,-60.55159,-50.84154,-43.58872,-41.84512,-34.50578,-51.32885,-53.09134,-59.61798,-36.72126,-43.09396,-63.48053,-50.89954,-47.45038],this.x1=[31.34786,33.75912,78.84946,-116.37192,46.40541,88.96467,-74.66323,-46.83478,-70.30599,81.86534,-16.7544,-41.39884,88.75294,91.24341,-47.76371,-57.57659,-94.61628,19.8771,-12.55576,145.99257,-58.57768,-1.82074,97.72864,94.68089,120.50039,-1.19648,145.40075,52.93923,-70.35703,-45.39887],this.y1=[13.10453,291.57995,-286.78769,194.36089,-296.30615,-103.70483,284.80738,-49.27964,225.80777,-13.89143,224.39513,120.50033,37.30396,-139.84827,-282.30682,55.85223,34.37649,111.7255,273.34913,-243.09868,151.2216,250.80852,-107.12769,-231.67495,46.84137,-277.76839,265.60389,155.55756,205.66728,-65.64371],this.targetZValue=1,this.closestItem=null,this.closestZDifference=1/0,this.currIndex=0,this.newIndex=0,this.numItems=this.workItems.length,this.progress=0,this.tl1=null,this.tlList=null,this.viewBtns=t.querySelectorAll(".view-link"),this.view="grid-view",this.gridScroll=null,this.listViewWrapper=this.container.querySelector(".home-list-view-wrapper"),this.listViewContainer=this.container.querySelector(".home-list-view-list"),this.listViewItems=[...this.container.querySelectorAll(".home-list-view-item")],this.textMask=t.querySelector(".text-mask"),this.setUpStyles(),this.setUpListeners(),this.createScrollTriggers(),this.createTimelines(),this.init()}init(){gsap.set(this.visualLoader,{opacity:1}),y?p.stop():p.start(),y=!1,gsap.set(this.workItems,{z:t=>(t+1)*-1800,zIndex:t=>t*-1,opacity:0}),this.getP()}setUpListeners(){this.container.addEventListener("click",t=>{t.target.classList.contains("view-link")&&(this.view=t.target.getAttribute("data-view"),this.viewBtns.forEach(e=>e.classList.remove("current")),t.target.classList.add("current"),this.switchViews(this.view))})}switchViews(t){t==="list-view"?(this.textAnim.animateText(.5,120,2),this.tlList.play()):(this.textAnim.animateText(0,0,1,120),this.tlList.reverse())}setUpStyles(){this.grid.style.setProperty("--grid-width","105%"),this.grid.style.setProperty("--grid-columns","8"),this.grid.style.setProperty("--perspective","1500px"),this.grid.style.setProperty("--grid-inner-scale","0.5")}createScrollTriggers(){ScrollTrigger.create({trigger:this.homeIntro,start:"top 80%",onEnter:()=>{this.container.classList.toggle("bg-white")},onLeaveBack:()=>{this.container.classList.toggle("bg-white")}}),this.gridScroll=ScrollTrigger.create({trigger:this.homeWorksContainer,start:"top top",end:()=>this.numItems*window.innerHeight,pin:this.homeIntro,scrub:.1,immediateRender:!1,onUpdate:t=>{this.progress=t.progress*100,this.progress=gsap.utils.clamp(0,100,this.progress);let e=this.progress/100*1800*this.numItems;gsap.set(this.workItems,{z:i=>(i+1)*-1800+e}),this.getP()}}),ScrollTrigger.create({trigger:this.container,start:"top top",end:"bottom bottom",onUpdate:t=>{let e=t.progress*100;this.container.querySelector("#home-scroll-percentage").innerHTML=parseInt(e,10).toString()+"%"}})}createTimelines(){gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:this.gridWrap,start:"top bottom+=5%",end:"bottom top-=5%",scrub:!0}}).set(this.gridItems,{transformOrigin:"50% 0%",z:e=>this.z1[e],rotationX:e=>this.rotationX1[e],filter:"brightness(0%)"}).to(this.gridItems,{xPercent:e=>this.x1[e],yPercent:e=>this.y1[e],rotationX:0,filter:"brightness(100%)"},0).to(this.gridWrap,{z:6500},0).fromTo(this.gridItemsInner,{scale:1.5},{scale:.5},0),gsap.timeline({scrollTrigger:{trigger:this.homeWorksContainer,start:"top 15%",end:"top top",scrub:1,ease:"linear",onEnter:()=>{gsap.to(this.viewSwitch,{opacity:1,visibility:"visible",duration:.3})},onLeaveBack:()=>{gsap.to(this.viewSwitch,{opacity:0,visibility:"hidden",duration:.3})}}}).to(this.homeWorksWrapper,{z:0}).from(this.homeWorksWrapper,{opacity:0},"0"),gsap.timeline({scrollTrigger:{trigger:this.homeWorksContainer,start:"top top",scrub:!0}}).to(this.bgListContainer,{opacity:1}).from(this.textMask,{opacity:0}),this.tlList=gsap.timeline({paused:!0}),this.tlList.to(this.workItemsOdd,{x:"25vw"}).to(this.workItemsEven,{x:"-25vw"},"<").to(".home-works-name",{opacity:0},"<").to(this.bgListContainer,{filter:"blur(0px)"},"<").to(this.listViewWrapper,{opacity:1,zIndex:3},"<").fromTo(this.workItems,{"clip-path":"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"},{"clip-path":"polygon(45% 50%, 55% 50%, 50% 50%, 50% 50%)"})}}class H{constructor(){this.home=null,this.canvas=null,this.title=null,this.camera=null,this.scene=null,this.renderer=null,this.mouse=new THREE.Vector2,this.windowHalfX=window.innerWidth/2,this.windowHalfY=window.innerHeight/2,this.raycaster=null,this.clock=null,this.orbit=null,this.particles={},this.imageParticlesSystem=null,this.planeHelperObject=[],this.particleCanvas=null,this.guiParams={},this.cameraNearPlane=.1,this.cameraFarPlane=1e3,this.init()}init(){window.onload=this.initParticleImage.bind(this)}initParticleImage(){this.canvas=document.getElementById("canvas"),this.home=document.getElementById("home"),this.scene=new THREE.Scene,this.camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,this.cameraNearPlane,this.cameraFarPlane),this.camera.lookAt(new THREE.Vector3(0,0,0)),this.camera.position.set(0,0,700),this.scene.add(this.camera),this.mouse=new THREE.Vector2;let t=document.createElement("canvas"),e=t.getContext("2d");this.particleCanvas={},this.particleCanvas.width=1500,this.particleCanvas.height=600,t.width=this.particleCanvas.width,t.height=this.particleCanvas.height,e.translate(0,this.particleCanvas.height),e.scale(1,-1),e.font="250pt Romie",e.textAlign="center",e.textBaseline="middle",e.fillStyle="#ffffff",e.fillText("404",t.width/2,t.height/2);let i=e.getImageData(0,0,t.width,t.height);e.clearRect(0,0,t.width,t.height),this.particles.initPositions=new Array,this.particles.minPositions=new Array,this.particles.maxPositions=new Array,this.particles.noiseValues=new Array,this.particles.colors=new Array;for(let l=0,S=i.height;l<S;l++)for(let h=0,x=i.width;h<x;h++)if(i.data[h*4+l*4*i.width]>128){let b=Math.random()*2e3+(this.camera.position.z+10);this.particles.initPositions.push(h),this.particles.initPositions.push(l),this.particles.initPositions.push(b),this.particles.minPositions.push(h),this.particles.minPositions.push(l),this.particles.minPositions.push(0),this.particles.maxPositions.push(h),this.particles.maxPositions.push(l),this.particles.maxPositions.push(b);let g=new THREE.Color("#B5650E");this.particles.colors.push(g.r,g.g,g.b);let T=Math.random()*20-10,I=Math.random()*20-10;this.particles.noiseValues.push(T),this.particles.noiseValues.push(I)}let s=new THREE.PlaneGeometry(1e4,1e4),o=new THREE.MeshBasicMaterial({color:0,transparent:!0,opacity:0}),a=new THREE.Mesh(s,o);this.planeHelperObject.push(a),this.scene.add(a);let n=new THREE.BufferGeometry;n.setAttribute("position",new THREE.Float32BufferAttribute(this.particles.initPositions,3)),n.setAttribute("minPosition",new THREE.Float32BufferAttribute(this.particles.minPositions,3)),n.setAttribute("maxPosition",new THREE.Float32BufferAttribute(this.particles.maxPositions,3)),n.setAttribute("color",new THREE.Float32BufferAttribute(this.particles.colors,3)),n.setAttribute("noiseValue",new THREE.Float32BufferAttribute(this.particles.noiseValues,2)),n.setAttribute("mouseRepulsion",new THREE.Float32BufferAttribute(this.particles.mouseRepulsion,1));let f={uDuration:{type:"f",value:180},uElapsedTime:{type:"f",value:0},uSize:{type:"f",value:3},uNoise:{type:"f",value:8},uMousePosition:{type:"v2",value:new THREE.Vector2},uMouseRadius:{type:"f",value:100},uMouseStrength:{type:"f",value:.75}},d=new THREE.ShaderMaterial({uniforms:f,vertexShader:document.getElementById("particle-image-vs").textContent,fragmentShader:document.getElementById("particle-image-fs").textContent});this.imageParticlesSystem=new THREE.Points(n,d),this.imageParticlesSystem.position.x=-1*this.particleCanvas.width/2,this.imageParticlesSystem.position.y=-1*this.particleCanvas.height/2,this.scene.add(this.imageParticlesSystem),this.renderer=new THREE.WebGLRenderer({alpha:!0,antialias:!1}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.canvas.appendChild(this.renderer.domElement),this.title=document.getElementById("title").getElementsByTagName("h2")[0],document.addEventListener("mousemove",this.onMousemove.bind(this),!1),window.addEventListener("resize",this.onResize.bind(this),!1),this.clock=new THREE.Clock,this.clock.start(),this.raycaster=new THREE.Raycaster,document.body.classList.add("renderer-ready"),this.animate()}onMousemove(t){this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-(t.clientY/window.innerHeight)*2+1;let e={x:-(t.clientX-window.innerWidth/2)/10,y:-(t.clientY-window.innerHeight/2)/10};this.title.style.transform="translate3d("+e.x+"px, "+e.y+"px, 0)"}onResize(t){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}animate(){requestAnimationFrame(this.animate.bind(this));let t,e;this.raycaster.setFromCamera(this.mouse,this.camera);let i;if(i=this.raycaster.intersectObjects(this.planeHelperObject,!0),i.length>0){let s=i[0];t=s.point.x+this.particleCanvas.width/2,e=s.point.y+this.particleCanvas.height/2}this.imageParticlesSystem.material.uniforms&&(this.imageParticlesSystem.material.uniforms.uElapsedTime.value++,this.imageParticlesSystem.material.uniforms.uMousePosition.value.x=t,this.imageParticlesSystem.material.uniforms.uMousePosition.value.y=e),this.renderer.render(this.scene,this.camera)}}barba.hooks.beforeLeave(r=>{gsap.getTweensOf("*").forEach(t=>{t.kill()}),ScrollTrigger.clearScrollMemory(),ScrollTrigger.removeEventListener("scrollEnd",w),Observer.getAll().forEach(t=>t.kill()),ScrollTrigger.getAll().forEach(t=>t.kill()),window.scroll(0,0),history.scrollRestoration&&(history.scrollRestoration="manual")});let y=!0;barba.init({preventRunning:!0,views:[{namespace:"home",beforeEnter(r){let t=r.next.container;Splitting(),new c(t);let e=new L(t);y?new P(t,e):(gsap.to(".hero-visual-loader",{opacity:0}),gsap.to(".hero-visual-img",{opacity:1,display:"block",duration:1}),p.start(),e.animateText());let i=new m(t.querySelector(".home-list-view-wrapper"),0,120,2,!1);new q(t,i)}},{namespace:"contact",beforeEnter(r){let t=r.next.container;Splitting(),new m(t,.8),new v(t,.4),new c(t)}},{namespace:"about",beforeEnter(r){let t=r.next.container;Splitting(),new m(t,.8),new v(t,.4),new c(t)}},{namespace:"work-category",beforeEnter(r){let t=r.next.container;Splitting(),new A(t),new c(t)}},{namespace:"work",beforeEnter(r){let t=r.next.container;Splitting(),new m(t,.8),new c(t),new C(t)}},{namespace:"archive",beforeEnter(r){let t=r.next.container;new c(t)}},{namespace:"404",beforeEnter(){new H}}],transitions:[{sync:!0,enter(r){let t=r.next.container,e=r.current.container;return gsap.set(e,{opacity:.4,duration:1}),gsap.fromTo(t,{clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"},{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",ease:"expo.inOut",duration:2})},after(r){r.next.container}}]});window.addEventListener("DOMContentLoaded",()=>{gsap.from("body",{autoAlpha:0,duration:1,ease:"linear"}),gsap.to(":root",{duration:1,delay:window.location.pathname==="/"?5:0,ease:"power1.out","--visual-hidden":1})});
