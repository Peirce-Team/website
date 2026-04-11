'use strict';

// ---- Bio Modals ----

function openBio(id) {
  var modal = document.getElementById('modal-' + id);
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBio() {
  document.querySelectorAll('.bio-modal.active').forEach(function (m) {
    m.classList.remove('active');
  });
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function () {

  // Close modal on backdrop click
  document.querySelectorAll('.bio-modal').forEach(function (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeBio();
    });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeBio();
  });

  // ---- Active nav link tracking ----
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var sections = document.querySelectorAll('section[id]');

  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.35,
    rootMargin: '-64px 0px 0px 0px'
  });

  sections.forEach(function (s) { observer.observe(s); });
});
