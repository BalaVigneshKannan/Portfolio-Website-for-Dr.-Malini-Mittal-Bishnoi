(function () {
  var nav = document.getElementById('siteNav');
  var toggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('navMobile');
  var iconOpen = toggle ? toggle.querySelector('.icon-open') : null;
  var iconClose = toggle ? toggle.querySelector('.icon-close') : null;
  var isOpen = false;

  function updateNavClass() {
    var scrolled = window.scrollY > 40;
    nav.classList.toggle('is-scrolled', scrolled || isOpen);
  }

  window.addEventListener('scroll', updateNavClass, { passive: true });
  updateNavClass();

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      isOpen = !isOpen;
      toggle.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.style.display = isOpen ? 'flex' : 'none';
      if (iconOpen && iconClose) {
        iconOpen.style.display = isOpen ? 'none' : '';
        iconClose.style.display = isOpen ? '' : 'none';
      }
      updateNavClass();
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        isOpen = false;
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.style.display = 'none';
        if (iconOpen && iconClose) {
          iconOpen.style.display = '';
          iconClose.style.display = 'none';
        }
        updateNavClass();
      });
    });
  }

  // Publications filter
  var filterBar = document.getElementById('pubFilters');
  var pubGrid = document.getElementById('pubGrid');
  if (filterBar && pubGrid) {
    var cards = pubGrid.querySelectorAll('.pub-card');
    filterBar.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBar.querySelectorAll('button').forEach(function (b) {
          b.classList.remove('is-active');
        });
        btn.classList.add('is-active');

        var filter = btn.getAttribute('data-filter');
        cards.forEach(function (card) {
          var show = filter === 'All' || card.getAttribute('data-category') === filter;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  var yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = '© ' + new Date().getFullYear() + ' Dr. Malini Mittal Bishnoi. All rights reserved.';
  }

  // TODO: replace with Dr. Malini's real contact email once available.
  var CONTACT_EMAIL = 'hello@example.com';

  var contactSection = document.getElementById('contact');
  if (contactSection && 'IntersectionObserver' in window) {
    var contactObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          contactSection.classList.add('is-visible');
          contactObserver.unobserve(contactSection);
        }
      });
    }, { threshold: 0.25 });
    contactObserver.observe(contactSection);
  } else if (contactSection) {
    contactSection.classList.add('is-visible');
  }

  var contactForm = document.getElementById('contactForm');
  var contactNote = document.getElementById('contactNote');
  var contactSubmit = document.getElementById('contactSubmit');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = contactForm.name.value.trim();
      var email = contactForm.email.value.trim();
      var subject = contactForm.subject.value.trim();
      var message = contactForm.message.value.trim();

      if (!name || !email || !message) {
        if (contactNote) {
          contactNote.textContent = 'Please fill in your name, email and message.';
        }
        return;
      }

      var mailSubject = subject || 'Message from ' + name;
      var mailBody = message + '\n\n— ' + name + ' (' + email + ')';
      var mailtoLink = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(mailSubject) +
        '&body=' + encodeURIComponent(mailBody);

      window.location.href = mailtoLink;

      if (contactNote) {
        contactNote.textContent = 'Opening your email app to send this message…';
      }

      if (contactSubmit) {
        var labelEl = contactSubmit.querySelector('.contact__submit-label');
        contactSubmit.classList.add('is-sent');
        if (labelEl) {
          labelEl.textContent = 'Message Ready';
        }
        setTimeout(function () {
          contactSubmit.classList.remove('is-sent');
          if (labelEl) {
            labelEl.textContent = 'Send Message';
          }
        }, 4000);
      }
    });
  }
})();
