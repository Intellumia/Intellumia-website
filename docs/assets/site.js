/* intellumia.com: the only script (Brand System v5.0.4, the approved mockup index-motion.html). Two jobs:
   1. The phone bottom bar: shown once the hero has scrolled away, hidden while the closing plate is on
      screen. Hidden from 900 px by CSS. Without this script the bar stays hidden; the hero and plate
      buttons still work.
   2. The plant scene: a slow silent loop. Nothing of it loads until the band is near the screen; then the
      still becomes its poster and the loop plays (WebM, or MP4 for Safari). The Pause button stops and
      restarts it (WCAG 2.2.2). Off screen it rests. Readers who ask for reduced motion, and pages without
      this script, see the still only. */
(function(){var b=document.getElementById('bar'),h=document.getElementById('hero'),c=document.getElementById('close');if(!b||!h||!c||!('IntersectionObserver' in window))return;var hv=true,cv=false;function u(){var on=!hv&&!cv;b.classList.toggle('on',on);b.setAttribute('aria-hidden',on?'false':'true');b.querySelector('a').tabIndex=on?0:-1}
new IntersectionObserver(function(e){hv=e[0].isIntersecting;u()}).observe(h);new IntersectionObserver(function(e){cv=e[0].isIntersecting;u()}).observe(c)})();

(function(){
  var f = document.querySelector('.scene--motion'), v = f && f.querySelector('video'), p = f && f.querySelector('.scene-pause');
  if (!v || !p || !('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('js-motion');
  var started = false, paused = false, near = false;
  function play() { var r = v.play(); if (r && r.catch) r.catch(function () {}); }
  function set(x) { paused = x; p.textContent = x ? 'Play' : 'Pause'; p.setAttribute('aria-label', x ? 'Play the animation' : 'Pause the animation'); }
  p.addEventListener('click', function () { if (paused) { set(false); play(); } else { set(true); v.pause(); } });
  v.addEventListener('playing', function () { p.hidden = false; });
  new IntersectionObserver(function (e) {
    near = e[0].isIntersecting;
    if (near && !started) {
      started = true;
      v.poster = v.getAttribute('data-poster');
      v.src = v.canPlayType('video/webm; codecs="vp9"') === 'probably' ? v.getAttribute('data-webm') : v.getAttribute('data-mp4');
    }
    if (near && !paused) play(); else v.pause();
  }, { rootMargin: '100px 0px' }).observe(f);
})();
