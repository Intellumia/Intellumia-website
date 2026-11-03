/* intellumia.com: the only script (Brand System v5.0.3, the approved mockup). Two jobs:
   1. The phone bottom bar: shown once the hero has scrolled away, hidden while the closing plate is on
      screen. Hidden from 900 px by CSS. Without this script the bar stays hidden; the hero and plate
      buttons still work.
   2. The plant scene: the still picture always shows; the muted loop plays over it only while it is on
      screen, never when the reader asks for reduced motion, and the icon button pauses and restarts it
      (WCAG 2.2.2). WebM first, MP4 for Safari; if neither plays, the still stays. Without this script,
      the still picture only. */
(function(){var b=document.getElementById('bar'),h=document.getElementById('hero'),c=document.getElementById('close');if(!b||!h||!c||!('IntersectionObserver' in window))return;var hv=true,cv=false;function u(){var on=!hv&&!cv;b.classList.toggle('on',on);b.setAttribute('aria-hidden',on?'false':'true');b.querySelector('a').tabIndex=on?0:-1}
new IntersectionObserver(function(e){hv=e[0].isIntersecting;u()}).observe(h);new IntersectionObserver(function(e){cv=e[0].isIntersecting;u()}).observe(c)})();

(function(){
  var v = document.querySelector('.scene__video'), t = document.querySelector('.scene__toggle');
  if (!v || !t || !('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var paused = false, inView = false;
  function label() { t.setAttribute('aria-label', paused ? 'Play the animation' : 'Pause the animation'); t.classList.toggle('is-paused', paused); }
  function sync() { if (inView && !paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else { v.pause(); } }
  v.addEventListener('playing', function () { v.hidden = false; t.hidden = false; });
  t.addEventListener('click', function () { paused = !paused; label(); sync(); });
  label();
  new IntersectionObserver(function (e) { inView = e[0].isIntersecting; sync(); }, { rootMargin: '200px 0px' }).observe(v.parentNode);
})();
