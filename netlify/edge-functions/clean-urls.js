import { getStore } from "https://esm.sh/@netlify/blobs@8.1.0";

const STORE_NAME = "blog-live-cms";
const COOKIE_NAME = "neo_cms_session";
const ADMIN_HTML = `<!DOCTYPE html><html lang="pl"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Neoromantyczny Live CMS</title><meta name="robots" content="noindex,nofollow"/>
<style>body{margin:0;background:#0D0D12;color:#FAF8F5;font-family:system-ui,-apple-system,sans-serif;padding:32px 20px}.wrap{max-width:880px;margin:0 auto}h1{font-family:Georgia,serif;color:#C9A84C;margin:0 0 8px}p.sub{color:rgba(250,248,245,.6);margin:0 0 24px}.card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:20px;margin-bottom:16px}input{background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.18);color:#FAF8F5;padding:10px 14px;border-radius:10px;width:100%;box-sizing:border-box;font-size:14px}button,a.btn{background:#C9A84C;color:#0D0D12;border:none;padding:9px 16px;border-radius:999px;font-weight:700;font-size:13px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:6px}.ghost{background:rgba(255,255,255,.08);color:#FAF8F5;border:1px solid rgba(255,255,255,.15)}.row{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.07)}.badge{font-size:10px;padding:3px 8px;border-radius:999px;background:rgba(201,168,76,.18);color:#C9A84C;border:1px solid rgba(201,168,76,.4);margin-left:8px}</style></head>
<body><div class="wrap"><h1>Neoromantyczny • Live CMS (0s Redeploy)</h1><p class="sub">Edycja artykułów blogowych na żywo w pamięci Netlify Blobs + Edge SSR. Na dowolnym artykule możesz też użyć skrótu Ctrl+Shift+E.</p>
<div id="auth" class="card"><div style="display:flex;gap:10px"><input id="pw" type="password" placeholder="Hasło administratora"/><button id="login">Zaloguj</button></div><div id="err" style="color:#f87171;font-size:13px;margin-top:8px"></div></div>
<div id="panel" style="display:none"><div class="card" style="display:flex;gap:10px;align-items:center"><input id="q" placeholder="Szukaj artykułu po tytule lub adresie..."/><button id="logout" class="ghost">Wyloguj</button></div><div id="list" class="card">Ładowanie listy artykułów...</div></div></div>
<script>(function(){
const auth=document.getElementById('auth'),panel=document.getElementById('panel'),list=document.getElementById('list'),err=document.getElementById('err'),pw=document.getElementById('pw'),q=document.getElementById('q');
localStorage.removeItem('neo_admin_token');let posts=[],overrides=new Set();
async function load(){
  const r=await fetch('/api/live-cms',{credentials:'same-origin'});
  if(!r.ok){localStorage.removeItem('neo_cms_ui');auth.style.display='block';panel.style.display='none';return;}
  localStorage.setItem('neo_cms_ui','1');const d=await r.json();overrides=new Set(d.overrides||[]);auth.style.display='none';panel.style.display='block';err.textContent='';
  const b=await fetch('/blog/').then(x=>x.text());const doc=new DOMParser().parseFromString(b,'text/html');
  posts=Array.from(doc.querySelectorAll('.blog-article-card')).map(a=>{const h=a.getAttribute('href')||'';return{href:h,slug:h.split('/blog/').pop().split('/')[0],title:(a.querySelector('h2')||{}).textContent||''};});
  render();
}
const esc=s=>String(s).replace(/[<>&"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));
function render(){
  const f=(q.value||'').toLowerCase();const rows=posts.filter(p=>p.title.toLowerCase().includes(f)||p.slug.toLowerCase().includes(f));
  list.innerHTML=rows.map(p=>'<div class="row"><div><div style="font-weight:600">'+esc(p.title)+(overrides.has(p.slug)?'<span class="badge">LIVE</span>':'')+'</div><div style="font-size:12px;opacity:.5">'+esc(p.href)+'</div></div><div style="display:flex;gap:8px">'+(overrides.has(p.slug)?'<button class="ghost reset-btn" data-slug="'+esc(p.slug)+'">Przywróć oryginał</button>':'')+'<a class="btn" href="'+esc(p.href)+'?edit=1">Edytuj na żywo →</a></div></div>').join('')||'Brak wyników.';
}
list.onclick=async function(e){const b=e.target.closest('.reset-btn');if(!b)return;const s=b.dataset.slug;if(!confirm('Przywrócić oryginalny plik HTML dla '+s+'?'))return;await fetch('/api/live-cms?slug='+encodeURIComponent(s),{method:'DELETE',credentials:'same-origin'});load();};
document.getElementById('login').onclick=async()=>{const r=await fetch('/api/live-cms/login',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',body:JSON.stringify({password:pw.value.trim()})});if(!r.ok){err.textContent='Nieprawidłowe hasło.';return;}await load();};
pw.onkeydown=e=>{if(e.key==='Enter')document.getElementById('login').click();};
document.getElementById('logout').onclick=async()=>{await fetch('/api/live-cms/logout',{method:'POST',credentials:'same-origin'});localStorage.removeItem('neo_cms_ui');location.reload();};
q.oninput=render;load();
})();</script></body></html>`;

const jsonRes = (data, status = 200, extra = {}) => new Response(JSON.stringify(data), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...extra }
});

async function getSessionToken(secret) {
  const bytes = new TextEncoder().encode(secret + ":neo_cms_salt_v1");
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function getCookie(req, name) {
  const raw = req.headers.get("cookie") || "";
  const m = raw.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : "";
}

function sanitizeCmsHtml(html) {
  return String(html || "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
}

function applyLiveOverride(html, doc) {
  let out = html;
  if (doc.h1) {
    const safeH1 = String(doc.h1).replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "\"": "&quot;" }[c]));
    const h1Open = out.indexOf("<h1");
    const h1Start = h1Open !== -1 ? out.indexOf(">", h1Open) : -1;
    const h1End = h1Start !== -1 ? out.indexOf("</h1>", h1Start) : -1;
    if (h1Start !== -1 && h1End !== -1) out = out.slice(0, h1Start + 1) + safeH1 + out.slice(h1End);
  }
  if (doc.articleInnerHtml) {
    const artOpen = out.indexOf("<article");
    const artStart = artOpen !== -1 ? out.indexOf(">", artOpen) : -1;
    const artEnd = artStart !== -1 ? out.indexOf("</article>", artStart) : -1;
    if (artStart !== -1 && artEnd !== -1) out = out.slice(0, artStart + 1) + sanitizeCmsHtml(doc.articleInnerHtml) + out.slice(artEnd);
  }
  return out;
}

export default async (request, context) => {
  try {
    const url = new URL(request.url);
    const path = url.pathname || "/";

    if (path.endsWith(".html")) {
      url.pathname = path === "/index.html" ? "/" : path.endsWith("/index.html") ? path.slice(0, -10) + "/" : path.slice(0, -5);
      return Response.redirect(url.toString(), 301);
    }
    if (path === "/admin" || path === "/admin/") {
      return new Response(ADMIN_HTML, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
    }

    const expected = (typeof Netlify !== "undefined" && Netlify.env ? Netlify.env.get("ADMIN_PASSWORD") : "") || "";
    const secFlag = url.protocol === "https:" ? "; Secure" : "";

    if (path === "/api/live-cms/login" && request.method === "POST") {
      if (!expected) return jsonRes({ error: "CMS not configured" }, 503);
      const body = await request.json().catch(() => ({}));
      if (String(body.password || "") !== expected) return jsonRes({ error: "Unauthorized" }, 401);
      const tok = await getSessionToken(expected);
      return jsonRes({ ok: true }, 200, { "Set-Cookie": `${COOKIE_NAME}=${tok}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800${secFlag}` });
    }
    if (path === "/api/live-cms/logout" && request.method === "POST") {
      return jsonRes({ ok: true }, 200, { "Set-Cookie": `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secFlag}` });
    }
    if (path === "/api/live-cms") {
      if (!expected) return jsonRes({ error: "CMS not configured" }, 503);
      const tok = await getSessionToken(expected);
      const okAuth = getCookie(request, COOKIE_NAME) === tok || request.headers.get("x-admin-token") === expected;
      if (!okAuth) return jsonRes({ error: "Unauthorized" }, 401);
      const store = getStore(STORE_NAME);
      if (request.method === "GET") {
        const slug = url.searchParams.get("slug");
        if (slug) return jsonRes({ override: await store.get(slug, { type: "json" }) });
        const { blobs } = await store.list();
        return jsonRes({ overrides: (blobs || []).map((b) => b.key) });
      }
      if (request.method === "POST") {
        const body = await request.json();
        if (!body.slug || !/^[a-z0-9-]+$/.test(body.slug) || !body.articleInnerHtml || body.articleInnerHtml.length < 50) return jsonRes({ error: "Invalid payload" }, 400);
        const record = { slug: body.slug, h1: String(body.h1 || ""), articleInnerHtml: sanitizeCmsHtml(body.articleInnerHtml), updatedAt: new Date().toISOString() };
        await store.setJSON(body.slug, record);
        return jsonRes({ ok: true, slug: body.slug, updatedAt: record.updatedAt });
      }
      if (request.method === "DELETE") {
        const slug = url.searchParams.get("slug");
        if (!slug || !/^[a-z0-9-]+$/.test(slug)) return jsonRes({ error: "Invalid slug" }, 400);
        await store.delete(slug);
        return jsonRes({ ok: true, deleted: slug });
      }
      return jsonRes({ error: "Method not allowed" }, 405);
    }

    const res = await context.next();
    const rawSlug = path.startsWith("/blog/") ? path.slice(6).replace(/\/$/, "") : "";
    if ((request.method === "GET" || request.method === "HEAD") && rawSlug && !rawSlug.includes("/") && !rawSlug.includes(".") && res.ok && (res.headers.get("content-type") || "").includes("text/html")) {
      const doc = await getStore(STORE_NAME).get(decodeURIComponent(rawSlug), { type: "json" });
      if (doc) {
        const headers = new Headers(res.headers);
        headers.delete("content-length"); headers.delete("etag");
        headers.set("Cache-Control", "public, max-age=0, must-revalidate");
        headers.set("Netlify-CDN-Cache-Control", "public, max-age=0, must-revalidate");
        headers.set("X-Live-CMS", "override");
        return new Response(request.method === "HEAD" ? null : applyLiveOverride(await res.text(), doc), { status: res.status, headers });
      }
    }
    return res;
  } catch (_err) {
    return await context.next();
  }
};

export const config = {
  path: "/*",
  onError: "bypass",
  excludedPath: [
    "/*.webp", "/*.png", "/*.jpg", "/*.jpeg", "/*.svg", "/*.ico",
    "/*.css", "/*.js", "/*.woff2", "/*.woff", "/*.ttf", "/*.json", "/*.xml", "/*.txt",
    "/assets/*", "/_next/*"
  ]
};
