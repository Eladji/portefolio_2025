(function(){
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!burgerBtn || !mobileMenu) return;

  burgerBtn.addEventListener('click', function(){
    const expanded = burgerBtn.getAttribute('aria-expanded') === 'true';
    burgerBtn.setAttribute('aria-expanded', String(!expanded));
    if (expanded) {
      mobileMenu.classList.add('hidden');
    } else {
      mobileMenu.classList.remove('hidden');
    }
  });

  // Close on outside click
  document.addEventListener('click', function(e){
    if (!mobileMenu.classList.contains('hidden')){
      const inMenu = mobileMenu.contains(e.target) || burgerBtn.contains(e.target);
      if (!inMenu) mobileMenu.classList.add('hidden');
    }
  });
})();
