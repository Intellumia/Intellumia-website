/* intellumia.com: the only script (Brand System v5.0.5, the approved mockup index-leaks.html). One job:
   the phone bottom bar: shown once the hero has scrolled away, hidden while the closing plate is on
   screen. Hidden from 900 px by CSS. Without this script the bar stays hidden; the hero and plate
   buttons still work. The leaks drawing needs no script: its drops fall by CSS inside the drawing. */
(function(){var b=document.getElementById('bar'),h=document.getElementById('hero'),c=document.getElementById('close');if(!b||!h||!c||!('IntersectionObserver' in window))return;var hv=true,cv=false;function u(){var on=!hv&&!cv;b.classList.toggle('on',on);b.setAttribute('aria-hidden',on?'false':'true');b.querySelector('a').tabIndex=on?0:-1}
new IntersectionObserver(function(e){hv=e[0].isIntersecting;u()}).observe(h);new IntersectionObserver(function(e){cv=e[0].isIntersecting;u()}).observe(c)})();
