(() => {
  const root = document.documentElement;
  const toneSections = [...document.querySelectorAll("[data-tone]")];
  const navLinks = [...document.querySelectorAll(".nav a")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let scrollQueued = false;

  function updateScrollTone() {
    let currentSection = toneSections[0];

    for (const section of toneSections) {
      if (section.getBoundingClientRect().top <= 240) {
        currentSection = section;
      }
    }

    if (currentSection) {
      root.style.setProperty("--page-bg", currentSection.dataset.tone);
      const activeId = currentSection.id === "experience" ? "about" : currentSection.id;
      for (const link of navLinks) {
        const isActive = link.getAttribute("href") === `#${activeId}`;
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    }

    scrollQueued = false;
  }

  function queueToneUpdate() {
    if (!scrollQueued) {
      scrollQueued = true;
      window.requestAnimationFrame(updateScrollTone);
    }
  }

  window.addEventListener("scroll", queueToneUpdate, { passive: true });
  window.addEventListener("resize", queueToneUpdate);
  updateScrollTone();

  function startShapes() {
    if (reduceMotion.matches || !window.gsap) return;

    const shapes = document.querySelectorAll(".shape");
    shapes.forEach((shape, index) => {
      window.gsap.to(shape, {
        x: index % 2 === 0 ? 10 : -8,
        y: index % 2 === 0 ? -12 : 12,
        rotation: index % 2 === 0 ? "+=7" : "-=6",
        duration: 3 + index * 0.35,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    });
  }

  startShapes();

  const copyButton = document.querySelector("[data-copy]");
  const copyStatus = document.querySelector("#copy-status");
  let resetTimer;

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand("copy");
    textArea.remove();
    if (!copied) throw new Error("Copy command was unavailable");
  }

  if (copyButton && copyStatus) {
    copyButton.addEventListener("click", async () => {
      window.clearTimeout(resetTimer);
      copyButton.disabled = true;

      try {
        await copyText(copyButton.dataset.copy);
        copyStatus.textContent = "Dummy email copied to clipboard.";
        copyButton.textContent = "Copied";
      } catch {
        copyStatus.textContent = "Copy unavailable. Dummy email: hello@example.com";
        copyButton.textContent = "Try again";
      } finally {
        copyButton.disabled = false;
        resetTimer = window.setTimeout(() => {
          copyButton.textContent = "Copy dummy email";
          copyStatus.textContent = "";
        }, 3000);
      }
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
