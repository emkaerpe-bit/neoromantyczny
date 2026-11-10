// Netlify Edge Function: Instant 301 Redirect from .html to Clean URLs
export default async (request, context) => {
  try {
    const url = new URL(request.url);
    const path = url.pathname;

    // Only process explicit .html URLs that are NOT root
    if (path && typeof path === 'string' && path.endsWith('.html')) {
      // 1. Root /index.html -> /
      if (path === '/index.html') {
        url.pathname = '/';
        return Response.redirect(url.toString(), 301);
      }

      // 2. Subdirectory index.html (e.g. /blog/index.html -> /blog/)
      if (path.endsWith('/index.html')) {
        url.pathname = path.slice(0, -10) + '/';
        return Response.redirect(url.toString(), 301);
      }

      // 3. Regular .html pages (e.g. /blog/prezent-dla-raka-co-kupic.html -> /blog/prezent-dla-raka-co-kupic)
      url.pathname = path.slice(0, -5);
      return Response.redirect(url.toString(), 301);
    }

    // Await response from origin
    return await context.next();
  } catch (_err) {
    // Zero-crash guarantee: bypass function on any edge error
    return await context.next();
  }
};

export const config = {
  path: "/*",
  onError: "bypass",
  excludedPath: [
    "/*.webp",
    "/*.png",
    "/*.jpg",
    "/*.jpeg",
    "/*.svg",
    "/*.ico",
    "/*.css",
    "/*.js",
    "/*.woff2",
    "/*.woff",
    "/*.ttf",
    "/*.json",
    "/*.xml",
    "/*.txt",
    "/assets/*",
    "/_next/*"
  ]
};
