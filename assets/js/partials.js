// assets/js/partials-and-helio.js
(async () => {
  // Helper - fetch and inject partials
  async function injectPartials(selector = '[data-include]') {
    const slots = document.querySelectorAll(selector);
    await Promise.all([...slots].map(async el => {
      const file = el.getAttribute('data-include');
      const res = await fetch(file, { cache: 'no-cache' });
      if (!res.ok) {
        el.innerHTML = `<p style="color:red">Failed to load ${file}</p>`;
        return;
      }
      el.innerHTML = await res.text();
    }));
  }

  // Helper - load scripts in order
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  // Determine base to your JS folder from the current page
  // Adjust to your setup if you prefer root-relative paths
  const jsBase = 'assets/js/';

  // 1) Inject header and footer so #nav exists
  await injectPartials();

  // 2) Load Helios scripts in sequence
  await loadScript(jsBase + 'jquery.min.js');
  await loadScript(jsBase + 'jquery.dropotron.min.js');
  await loadScript(jsBase + 'jquery.scrolly.min.js');
  await loadScript(jsBase + 'jquery.scrollex.min.js');
  await loadScript(jsBase + 'browser.min.js');
  await loadScript(jsBase + 'breakpoints.min.js');
  await loadScript(jsBase + 'util.js');
  await loadScript(jsBase + 'main.js');
})();
