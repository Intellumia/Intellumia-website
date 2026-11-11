/* intellumia.com: the only script (Rounds 5 and 10). One job: the phone bottom bar, with its one button: shown once
   the hero has scrolled away, hidden while the close is on screen. Hidden from 900 px by CSS. Without this script the
   bar stays hidden; the hero and closing buttons still work. Nothing on the page animates. */
(function(){var b=document.getElementById('bar'),h=document.getElementById('hero'),c=document.getElementById('close');if(!b||!h||!c||!('IntersectionObserver' in window))return;var hv=true,cv=false;function u(){var on=!hv&&!cv;b.classList.toggle('on',on);b.setAttribute('aria-hidden',on?'false':'true');b.querySelector('a').tabIndex=on?0:-1}
new IntersectionObserver(function(e){hv=e[0].isIntersecting;u()}).observe(h);new IntersectionObserver(function(e){cv=e[0].isIntersecting;u()}).observe(c)})();
