(function () {
  "use strict";

  var bgHearts = document.getElementById("bgHearts");
  var askScreen = document.getElementById("askScreen");
  var celebrate = document.getElementById("celebrateScreen");
  var yesBtn = document.getElementById("yesBtn");
  var noBtn = document.getElementById("noBtn");

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- floating background hearts ---------- */
  var HEART_SVG = '<svg width="28" height="26" viewBox="0 0 32 29" fill="#e75480"><path d="M23.6 0c-3.4 0-6.3 2.7-7.6 5.6C14.7 2.7 11.8 0 8.4 0 3.8 0 0 3.8 0 8.4c0 9.4 9.5 11.9 16 20.4 6.5-8.5 16-11 16-20.4C32 3.8 28.2 0 23.6 0z"/></svg>';

  function spawnBgHearts() {
    for (var i = 0; i < 12; i++) {
      var el = document.createElement("div");
      el.className = "bg-heart";
      var size = 14 + Math.random() * 30;
      el.style.left = Math.random() * 100 + "%";
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.innerHTML = HEART_SVG;
      if (reduced) {
        el.style.bottom = "auto";
        el.style.top = Math.random() * 100 + "%";
      } else {
        el.style.animationDuration = 9 + Math.random() * 12 + "s";
        el.style.animationDelay = -Math.random() * 20 + "s";
      }
      bgHearts.appendChild(el);
    }
  }
  spawnBgHearts();

  /* ---------- No button dodging ---------- */
  var noLabels = ["No", "Are you sure?", "Really sure?", "Think again…", "Last chance!", "No isn't an option 😏", "The No button is shy", "Fine, it gives up"];
  var dodgeCount = 0;
  var dodging = false;

  function dodge() {
    if (dodging) return;
    dodging = true;
    noBtn.classList.add("dodging");

    var pad = 16;
    var btnW = noBtn.offsetWidth;
    var btnH = noBtn.offsetHeight;
    var maxX = window.innerWidth - btnW - pad;
    var maxY = window.innerHeight - btnH - pad;

    /* pick a spot that does NOT cover the Yes button */
    var yesRect = yesBtn.getBoundingClientRect();
    var x, y, tries = 0;
    do {
      x = Math.max(pad, Math.min(maxX, Math.random() * maxX));
      y = Math.max(pad, Math.min(maxY, Math.random() * maxY));
      tries++;
    } while (tries < 20 &&
             x < yesRect.right && x + btnW > yesRect.left &&
             y < yesRect.bottom && y + btnH > yesRect.top);

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    dodgeCount++;
    if (dodgeCount <= noLabels.length) {
      noBtn.textContent = noLabels[Math.min(dodgeCount, noLabels.length) - 1];
    }
    if (dodgeCount >= 6) {
      noBtn.style.transform = "scale(" + Math.max(0.55, 1 - dodgeCount * 0.07) + ")";
    }

    /* let it dodge again on later presses */
    window.setTimeout(function () { dodging = false; }, 260);
  }

  noBtn.addEventListener("click", function (e) { e.preventDefault(); dodge(); });
  noBtn.addEventListener("mouseenter", function () { if (!reduced) dodge(); });
  noBtn.addEventListener("touchstart", function (e) { e.preventDefault(); dodge(); }, { passive: false });
  window.addEventListener("resize", function () {
    if (dodging) {
      var pad = 16;
      var btnW = noBtn.offsetWidth;
      var btnH = noBtn.offsetHeight;
      var x = Math.max(pad, Math.min(window.innerWidth - btnW - pad, parseFloat(noBtn.style.left) || 0));
      var y = Math.max(pad, Math.min(window.innerHeight - btnH - pad, parseFloat(noBtn.style.top) || 0));
      noBtn.style.left = x + "px";
      noBtn.style.top = y + "px";
    }
  });

  /* ---------- Yes button celebration ---------- */
  function burstHearts() {
    for (var i = 0; i < 32; i++) {
      var el = document.createElement("div");
      el.className = "burst-heart";
      el.innerHTML = HEART_SVG;
      var size = 14 + Math.random() * 22;
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.style.left = window.innerWidth / 2 + "px";
      el.style.top = window.innerHeight / 2 + "px";
      el.style.setProperty("--dx", (Math.random() * 2 - 1) * (120 + Math.random() * 260) + "px");
      el.style.setProperty("--dy", (Math.random() * 2 - 1) * (120 + Math.random() * 260) + "px");
      el.style.setProperty("--rot", (Math.random() * 2 - 1) * 220 + "deg");
      if (reduced) {
        el.style.animation = "none";
        el.style.opacity = "0";
      }
      document.body.appendChild(el);
      (function (node) {
        window.setTimeout(function () { node.remove(); }, 1500);
      })(el);
    }
  }

  function celebrateNow() {
    burstHearts();
    askScreen.classList.add("hidden");
    celebrate.classList.add("show");
  }

  yesBtn.addEventListener("click", celebrateNow);

  /* tiny screen-height safe check for the No button */
  document.addEventListener("touchmove", function (e) {
    if (e.target === noBtn) e.preventDefault();
  }, { passive: false });
})();
