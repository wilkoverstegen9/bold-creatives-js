<script src="https://unpkg.com/split-type"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/TextPlugin.min.js"></script>
<script src="https://player.vimeo.com/api/player.js"></script>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const navigationLinksWrapper = document.querySelector(".navigation-links-background-wrapper");
    const hoverEffect = document.querySelector('.menu-item-background-hover');
    const links = document.querySelectorAll('.menu-link-item-new');

    gsap.set(navigationLinksWrapper, { opacity: 0, backdropFilter: "blur(30px)", y: -50 });

    window.addEventListener("scroll", () => {
      gsap.to(navigationLinksWrapper, { 
        opacity: window.scrollY > 70 ? 1 : 0, 
        y: window.scrollY > 70 ? 0 : -50, 
        duration: 0.5 
      });
    });

    links.forEach((link, i) => {
      if (i === 0) link.classList.add('active'); // Initial active class to the first link

      link.addEventListener('mouseenter', () => {
        gsap.to(hoverEffect, { duration: 0.3, left: link.offsetLeft, width: link.offsetWidth, ease: 'power2.out' });
        links.forEach(otherLink => {
          otherLink.classList[otherLink === link ? 'add' : 'remove']('active');
        });
      });

      link.addEventListener('mouseleave', () => {
        if (i === 0) { // Only reactivate the first link on mouseleave
          gsap.to(hoverEffect, { duration: 0.3, left: '4px', width: '104px', ease: 'power2.out' });
          links[0].classList.add('active');
        }
      });
    });
  });
</script>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(CSSPlugin);
    const gsapButtons = document.querySelectorAll('[data-gsap-button]');

    gsapButtons.forEach(button => {
      const btnText = button.querySelector('.btn-text');
      const animatedText = button.querySelector('.btn-text-animated');
      gsap.set(animatedText, { yPercent: 100 });

      button.addEventListener('mouseenter', () => {
        gsap.to(btnText, { yPercent: -100, duration: 0.5 });
        gsap.to(animatedText, { yPercent: 0, duration: 0.5 });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(btnText, { yPercent: 0, duration: 0.5 });
        gsap.to(animatedText, { yPercent: 100, duration: 0.5 });
      });
    });
  });
</script>
<script>
  document.addEventListener("DOMContentLoaded", function() {
     const headers = ["BOLD DESIGNS", "websites", "visual identites", "PRODUCT DESIGNS", "Innovate solutions", "Copywriting", "Mobile apps", "User experiences"];
    let currentIndex = 0;
    const dynamicHeader = document.getElementById("dynamic-header");
    const pageLoadDiv = document.querySelector(".page_load");
    const homeSectionWrapper = document.querySelector(".home-section-wrapper");
    const navWrapper = document.querySelector(".navigation-wrapper");
    let cycleCount = 0;
		
    document.body.style.overflow = 'hidden';
    
    function changeHeader() {
      currentIndex = (currentIndex + 1) % headers.length;
      dynamicHeader.textContent = headers[currentIndex];
      
      if (currentIndex === 0) {
        cycleCount++;
        if (cycleCount === 1) {
          gsap.to(pageLoadDiv, {
        duration: 1,
        yPercent: 100,
        onComplete: function() {
            pageLoadDiv.style.visibility = 'hidden';
             document.body.style.overflow = 'auto';
        }
    });
          gsap.fromTo(homeSectionWrapper, {y: -100}, {duration: 1.2, delay: 0.2, y: 0, autoAlpha: 1});
                 gsap.fromTo(navWrapper, {y: -100}, {duration: 1.2, delay: 0.2, y: 0, autoAlpha: 1});
        }
      }
    }
    setInterval(changeHeader, 400); 
  });
</script>

<script>
gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-content-wrapper-large",
    start: "top top",
    end: "bottom top",
    scrub: true,
  }
});
tl.to('.home-hero-video-wrapper', {
  scale: 1,
  ease: "none",
}, 0); 
tl.to('.hero-content-wrapper-large', {
  y: '-50vh',
  opacity: 0,
  ease: "none",
}, 0); 
</script>
<script>
gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('.hiw-card-wrapper').forEach((card, index) => {
  ScrollTrigger.create({
    trigger: `.move-card-${index + 1}`,
    start: 'top bottom', 
    end: 'top center', 
    onEnter: () => {
      gsap.to(card, {
        y: '0vh',
        ease: 'power4.out',
        duration: 1.2
      });
    },
    onLeaveBack: () => {
      gsap.to(card, {
        y: '100vh', 
        ease: 'power4.in',
        duration: 1.2
      });
    },

  });
});
</script>
<script>
window.addEventListener("DOMContentLoaded", (event) => {
  setTimeout(() => {
    $("[js-line-animation]").each(function (index) {
      gsap.set($(this), { autoAlpha: 1 });
      let textEl = $(this);
      let textContent = $(this).text();
      let tl;
      function splitText() {
        new SplitType(textEl, { types: "lines", tagName: "span" });
        textEl.find(".line").each(function (index) {
          let lineContent = $(this).html();
          $(this).html("");
          $(this).append(`<span class="line-inner" style="display: block;">${lineContent}</span>`);
        });
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: textEl,
            start: "top bottom",
            end: "bottom bottom",
            toggleActions: "none play none reset",
            once: true, 
          }
        });
        tl.fromTo(textEl.find(".line-inner"), { yPercent: 100 }, { yPercent: 0, duration: 0.45, stagger: { amount: 0.5, ease: "power1.out" } });
        if (!$(".arrow-animation-wrapper").hasClass("animated")) {
          tl.fromTo(".arrow-animation-wrapper .arrow-turned", { yPercent: 100 }, { yPercent: 0, duration: 0.45, ease: "power1.out" }, "<");
          $(".arrow-animation-wrapper").addClass("animated"); 
        }
      }
      splitText();
      let windowWidth = window.innerWidth;
      window.addEventListener("resize", function () {
        if (windowWidth !== window.innerWidth) {
          windowWidth = window.innerWidth;
          tl.kill();
          textEl.text(textContent);
          splitText();
        }
      });
    });
  }, 700);
});
</script>
<script>
gsap.registerPlugin(ScrollTrigger);
gsap.fromTo('.howit-works', 
  { lineHeight: '100%' }, 
  { lineHeight: '130%',  
    duration: 0.8,       
    delay: 1,          
    ease: "power4.out", 
    scrollTrigger: {
      trigger: '.howit-works',
      start: "top top", 
      end: "bottom top", 
    }
});
gsap.fromTo('.hiw-content-centered', 
  { scaleY: 0, opacity: 1, transformOrigin: 'center' },
  {
    scaleY: 1,
    opacity: 1,
     delay: 1,
    duration: 0.8,
    ease: "power4.out", 
    scrollTrigger: {
    trigger: '.howit-works',
      start: "top top",
      end: "bottom top",
    }
  }
);
</script>
<script>
function animateImagesAndText() {
  let images = document.querySelectorAll('.services-image');
  let textItems = document.querySelectorAll('.services-text-item');
  let paragraphs = document.querySelectorAll('.services-text-paragraph');
  let delayBetweenImages = 5;
  let animationDuration = 1;
  let paragraphOutDuration = 0.5;
  let paragraphInDuration = 0.5;
  let totalCycleTime = delayBetweenImages * images.length + animationDuration + paragraphOutDuration + paragraphInDuration;
  images.forEach((img, index) => {
    let textItem = textItems[index];
    let paragraph = paragraphs[index];
    let borderProgress = textItem.querySelector('.border-progress');
    gsap.set(borderProgress, { width: '0%' });
    let delayTime = delayBetweenImages * index;
    gsap.fromTo(img, {
      clipPath: 'inset(50% 50% 50% 50%)',
      opacity: 1,
      zIndex: 1,
    }, {
      delay: delayTime,
      duration: animationDuration,
      ease: 'power4.out',
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      onStart: () => {
        img.style.zIndex = 3;
        gsap.to(textItems, {opacity: 0.35, duration: 0.5});
        gsap.to(textItem, {opacity: 1, duration: 0.5});
        gsap.to(borderProgress, {width: '100%', duration: delayBetweenImages, ease: 'linear'});
      },
    });
    let prevParagraph = index === 0 ? paragraphs[paragraphs.length - 1] : paragraphs[index - 1];
    gsap.to(prevParagraph, {
      delay: delayTime,
      duration: paragraphOutDuration,
      y: '2rem',
      opacity: 0,
    });
    gsap.fromTo(paragraph, {
      y: '-2rem',
      opacity: 0,
    }, {
      delay: delayTime + paragraphOutDuration,
      duration: paragraphInDuration,
      y: '0rem',
      opacity: 1,
    });
  });
  gsap.delayedCall(totalCycleTime, () => {
    gsap.set(images, {clipPath: 'inset(50% 50% 50% 50%)', opacity: 1, zIndex: 1});
    gsap.set(textItems, {opacity: 0.35});
    gsap.set(paragraphs, {y: '-2rem', opacity: 0});
    document.querySelectorAll('.border-progress').forEach((el) => gsap.set(el, {width: '0%'}));
    animateImagesAndText();
  });
}
animateImagesAndText();
</script>
<script>
document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(CSSPlugin);
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const arrow = item.querySelector('.faq-arrow');
    const content = item.querySelector('.faq-content');
    item.addEventListener('click', () => {
      let isOpen = content.style.display !== 'none';
      if (!isOpen) {
        content.style.display = 'block';
        let fullHeight = content.scrollHeight + 'px';
        gsap.to(content, { height: fullHeight, duration: 0.5, onComplete: () => {
          content.style.height = 'auto';
        }});
        gsap.to(arrow, { rotation: 180, duration: 0.5 });
      } else {
        content.style.height = content.scrollHeight + 'px';
        gsap.to(content, {
          height: 0,
          duration: 0.5,
          onComplete: () => {
            content.style.display = 'none';
          }
        });
        gsap.to(arrow, { rotation: 0, duration: 0.5 });
      }
    });
  });
});
</script>
