import { getStore } from "https://esm.sh/@netlify/blobs@8.1.0";

const STORE_NAME = "blog-live-cms";
const ADMIN_HTML = `<!DOCTYPE html><html lang="pl"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Neoromantyczny Live CMS</title><meta name="robots" content="noindex,nofollow"/>
<style>body{margin:0;background:#0D0D12;color:#FAF8F5;font-family:system-ui,-apple-system,sans-serif;padding:32px 20px}.wrap{max-width:880px;margin:0 auto}h1{font-family:Georgia,serif;color:#C9A84C;margin:0 0 8px}p.sub{color:rgba(250,248,245,.6);margin:0 0 24px}.card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:20px;margin-bottom:16px}input{background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.18);color:#FAF8F5;padding:10px 14px;border-radius:10px;width:100%;box-sizing:border-box;font-size:14px}button,a.btn{background:#C9A84C;color:#0D0D12;border:none;padding:9px 16px;border-radius:999px;font-weight:700;font-size:13px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:6px}.ghost{background:rgba(255,255,255,.08);color:#FAF8F5;border:1px solid rgba(255,255,255,.15)}.row{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.07)}.badge{font-size:10px;padding:3px 8px;border-radius:999px;background:rgba(201,168,76,.18);color:#C9A84C;border:1px solid rgba(201,168,76,.4);margin-left:8px}</style></head>
<body><div class="wrap"><h1>Neoromantyczny • Live CMS (0s Redeploy)</h1><p class="sub">Edycja artykułów blogowych na żywo w pamięci Netlify Blobs + Edge SSR. Na dowolnym artykule możesz też użyć skrótu Ctrl+Shift+E.</p>
<div id="auth" class="card"><div style="display:flex;gap:10px"><input id="pw" type="password" placeholder="Hasło administratora"/><button id="login">Zaloguj</button></div><div id="err" style="color:#f87171;font-size:13px;margin-top:8px"></div></div>
<div id="panel" style="display:none"><div class="card" style="display:flex;gap:10px;align-items:center"><input id="q" placeholder="Szukaj artykułu po tytule lub adresie..."/><button id="logout" class="ghost">Wyloguj</button></div><div id="list" class="card">Ładowanie listy artykułów...</div></div></div>
<script>(function(){
const auth=document.getElementById('auth'),panel=document.getElementById('panel'),list=document.getElementById('list'),err=document.getElementById('err'),pw=document.getElementById('pw'),q=document.getElementById('q');
let posts=[],overrides=new Set(),token=localStorage.getItem('neo_admin_token')||'';
async function load(){
  const r=await fetch('/api/live-cms',{headers:{'x-admin-token':token}});
  if(!r.ok){localStorage.removeItem('neo_admin_token');token='';auth.style.display='block';panel.style.display='none';if(pw.value)err.textContent='Nieprawidłowe hasło.';return;}
  const d=await r.json();overrides=new Set(d.overrides||[]);auth.style.display='none';panel.style.display='block';err.textContent='';
  const b=await fetch('/blog/').then(x=>x.text());const doc=new DOMParser().parseFromString(b,'text/html');
  posts=Array.from(doc.querySelectorAll('.blog-article-card')).map(a=>{const h=a.getAttribute('href')||'';return{href:h,slug:h.split('/blog/').pop().split('/')[0],title:(a.querySelector('h2')||{}).textContent||''};});
  render();
}
const esc=s=>String(s).replace(/[<>&"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));
function render(){
  const f=(q.value||'').toLowerCase();const rows=posts.filter(p=>p.title.toLowerCase().includes(f)||p.slug.toLowerCase().includes(f));
  list.innerHTML=rows.map(p=>'<div class="row"><div><div style="font-weight:600">'+esc(p.title)+(overrides.has(p.slug)?'<span class="badge">LIVE</span>':'')+'</div><div style="font-size:12px;opacity:.5">'+esc(p.href)+'</div></div><div style="display:flex;gap:8px">'+(overrides.has(p.slug)?'<button class="ghost reset-btn" data-slug="'+esc(p.slug)+'">Przywróć oryginał</button>':'')+'<a class="btn" href="'+esc(p.href)+'?edit=1">Edytuj na żywo →</a></div></div>').join('')||'Brak wyników.';
}
list.onclick=async function(e){const b=e.target.closest('.reset-btn');if(!b)return;const s=b.dataset.slug;if(!confirm('Przywrócić oryginalny plik HTML dla '+s+'?'))return;await fetch('/api/live-cms?slug='+encodeURIComponent(s),{method:'DELETE',headers:{'x-admin-token':token}});load();};
document.getElementById('login').onclick=()=>{token=pw.value.trim();localStorage.setItem('neo_admin_token',token);load();};
pw.onkeydown=e=>{if(e.key==='Enter')document.getElementById('login').click();};
document.getElementById('logout').onclick=()=>{localStorage.removeItem('neo_admin_token');location.reload();};
q.oninput=render;if(token)load();
})();</script></body></html>`;

const jsonRes = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
});

function applyLiveOverride(html, doc) {
  let out = html;
  if (doc.h1) {
    const h1Open = out.indexOf("<h1");
    const h1Start = h1Open !== -1 ? out.indexOf(">", h1Open) : -1;
    const h1End = h1Start !== -1 ? out.indexOf("</h1>", h1Start) : -1;
    if (h1Start !== -1 && h1End !== -1) out = out.slice(0, h1Start + 1) + doc.h1 + out.slice(h1End);
  }
  if (doc.articleInnerHtml) {
    const artOpen = out.indexOf("<article");
    const artStart = artOpen !== -1 ? out.indexOf(">", artOpen) : -1;
    const artEnd = artStart !== -1 ? out.indexOf("</article>", artStart) : -1;
    if (artStart !== -1 && artEnd !== -1) out = out.slice(0, artStart + 1) + doc.articleInnerHtml + out.slice(artEnd);
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

    if (path === "/api/live-cms") {
      const expected = (typeof Netlify !== "undefined" && Netlify.env ? Netlify.env.get("ADMIN_PASSWORD") : "") || "neoromantyczny2026";
      if (request.headers.get("x-admin-token") !== expected) return jsonRes({ error: "Unauthorized" }, 401);
      const store = getStore(STORE_NAME);
      if (request.method === "GET") {
        const slug = url.searchParams.get("slug");
        if (slug) return jsonRes({ override: await store.get(slug, { type: "json" }) });
        const { blobs } = await store.list();
        return jsonRes({ overrides: (blobs || []).map((b) => b.key) });
      }
      if (request.method === "POST") {
        const body = await request.json();
        if (!body.slug || !/^[a-z0-9-]+$/.test(body.slug) || !body.articleInnerHtml || body.articleInnerHtml.length < 50) {
          return jsonRes({ error: "Invalid payload" }, 400);
        }
        const record = { slug: body.slug, h1: String(body.h1 || ""), articleInnerHtml: String(body.articleInnerHtml), updatedAt: new Date().toISOString() };
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
    if (
      (request.method === "GET" || request.method === "HEAD") &&
      rawSlug &&
      !rawSlug.includes("/") &&
      !rawSlug.includes(".") &&
      res.ok &&
      (res.headers.get("content-type") || "").includes("text/html")
    ) {
      const slug = decodeURIComponent(rawSlug);
      const store = getStore(STORE_NAME);
      const doc = await store.get(slug, { type: "json" });
      if (doc) {
        const html = applyLiveOverride(await res.text(), doc);
        const headers = new Headers(res.headers);
        headers.delete("content-length");
        headers.delete("etag");
        headers.set("Cache-Control", "public, max-age=0, must-revalidate");
        headers.set("Netlify-CDN-Cache-Control", "public, max-age=0, must-revalidate");
        headers.set("X-Live-CMS", "override");
        return new Response(request.method === "HEAD" ? null : html, { status: res.status, headers });
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
