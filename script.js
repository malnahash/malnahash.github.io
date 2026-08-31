// Pointer-tracked 3D tilt on project cards and hero stat panels.
// Progressive enhancement only: the page is complete without this file.
// Gated: fine pointer with hover, and no reduced-motion preference.
// Rotation is capped at 2.5deg so link targets never move more than a
// few pixels — hit areas stay under the cursor (WCAG 2.5.8 stability).
(function () {
  "use strict";
  var wantsMotion = window.matchMedia("(prefers-reduced-motion: no-preference)");
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (!wantsMotion.matches || !canHover.matches) return;

  var MAX_DEG = 2.5;
  var cards = document.querySelectorAll(".project:not(.project-quiet), .stat");

  cards.forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;  // -0.5 .. 0.5
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform =
        "translateY(-3px) perspective(40rem)" +
        " rotateX(" + (-y * MAX_DEG).toFixed(2) + "deg)" +
        " rotateY(" + (x * MAX_DEG).toFixed(2) + "deg)";
    });
    card.addEventListener("pointerleave", function () {
      card.style.transform = "";
    });
  });

  // If the user flips reduced-motion on mid-session, stand down.
  wantsMotion.addEventListener("change", function (ev) {
    if (!ev.matches) {
      cards.forEach(function (card) { card.style.transform = ""; });
    }
  });
})();
