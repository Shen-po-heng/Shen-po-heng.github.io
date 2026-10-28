document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.getElementById('sidebar-placeholder');
  if (!placeholder) return;

  fetch('/sidebar.html')
    .then(r => r.text())
    .then(html => {
      placeholder.innerHTML = html;

      const links = placeholder.querySelectorAll('nav a');
      const currentPath = window.location.pathname;

      links.forEach(link => {
        const target = new URL(link.href, window.location.href);
        if (target.origin !== window.location.origin) return;
        const linkPath = target.pathname;
        const isHome = linkPath === '/index.html' || linkPath === '/';
        const isCurrent = isHome
          ? currentPath === '/index.html' || currentPath === '/'
          : currentPath.startsWith(linkPath.replace('index.html', ''));

        if (isCurrent) link.classList.add('active');
      });
    })
    .catch(() => {
      // silently fail — sidebar just won't load if fetch is blocked (file:// protocol)
    });
});
