import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('.');
const ORIGIN = 'https://ari-builds.github.io/quality-stone-counters-site';

const S = {
  name: 'Quality Stone Counters Corp',
  short: 'Quality Stone',
  tel: '(336) 844-0585',
  telHref: 'tel:+13368440585',
  tel2: '(786) 985-9559',
  tel2Href: 'tel:+17869859559',
  email: 'info@qualitystonecounter.com',
  license: 'NC #78214',
  rating: '4.9',
  reviews: '212',
  hours: 'Mon–Fri 8:00–5:30 · Sat by appointment',
  area: 'Greensboro, Winston-Salem, High Point, Kernersville, Burlington and the surrounding Triad',
};

const IMG = {
  kitchen: { f: 'IMG_2320.webp', w: 1600, h: 1200, alt: 'Sage green custom cabinets with a white quartz island and wood stools' },
  waterfall: { f: 'IMG_5796.webp', w: 1170, h: 858, alt: 'Marble waterfall island with a book-matched edge in a bright kitchen' },
  sage: { f: 'IMG_4166.webp', w: 1600, h: 1200, alt: 'Sage cabinetry paired with a white marble countertop' },
  bathMarble: { f: 'IMG_2528.webp', w: 1600, h: 1200, alt: 'Marble bathroom with a floating vanity and tiled shower' },
  bathTub: { f: 'IMG_2529.webp', w: 1600, h: 2230, alt: 'Marble bathroom with a freestanding tub and black hex tile floor' },
  shower: { f: 'IMG_3581.webp', w: 1600, h: 1200, alt: 'Quartz slab shower wall with a recessed niche' },
  macro: { f: 'IMG_4511.webp', w: 1600, h: 2134, alt: 'Close-up of gold veining running through white quartz' },
  veining: { f: 'IMG_4481.webp', w: 1600, h: 2134, alt: 'Book-matched gold veining through a white quartz countertop' },
  island: { f: 'IMG_2616.webp', w: 1600, h: 1200, alt: 'White quartz island edge with a brass bridge faucet against brick' },
  faucet: { f: 'IMG_2616-faucet.webp', w: 1200, h: 1452, alt: 'Detail of a quartz edge and brass bridge faucet' },
  sink: { f: 'IMG_2591.webp', w: 880, h: 898, alt: 'Undermount sink cut-out in a quartz countertop' },
  cabHero: { f: 'cab-hero.webp', w: 1920, h: 2560, alt: 'White shaker kitchen with a custom range hood and pendant lighting' },
  cab01: { f: 'cab-01.webp', w: 1400, h: 1050, alt: 'White cabinetry with a quartz island and rattan pendants' },
  cab02: { f: 'cab-02.webp', w: 1170, h: 846, alt: 'White cabinets with a marble-look counter and open shelving' },
  cab03: { f: 'cab-03.webp', w: 1400, h: 1050, alt: 'Two-tone kitchen with white flat uppers and light wood lowers' },
  cab04: { f: 'cab-04.webp', w: 1400, h: 1050, alt: 'Cream uppers, wood lowers and a teal island' },
  cab05: { f: 'cab-05.webp', w: 1400, h: 1050, alt: 'White and grey shaker cabinets around a quartz island' },
  cab06: { f: 'cab-06.webp', w: 768, h: 1024, alt: 'Marble waterfall island with white cabinetry' },
  cabShop: { f: 'cab-shop.webp', w: 1400, h: 1050, alt: 'Cabinet showroom with navy flat-panel doors and a stone-look backsplash' },
  cabShowroom: { f: 'cab-showroom.webp', w: 1200, h: 1510, alt: 'Cabinet showroom wall with white uppers and light wood units' },
};

const NAV = [
  ['Services', 'services/', 'services'],
  ['Work', 'work/', 'work'],
  ['Process', 'process/', 'process'],
  ['Reviews', 'reviews/', 'reviews'],
  ['FAQ', 'faq/', 'faq'],
];

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

const rel = (d) => '../'.repeat(d);
const asset = (d, f) => rel(d) + 'assets/opt/' + f;
const url = (d, p) => rel(d) + p;
const homeUrl = (d) => (d === 0 ? './' : url(d, ''));

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function icons() {
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h15M13 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25c1.1.37 2.3.57 3.6.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-star" viewBox="0 0 24 24"><path d="M12 2.6l2.9 6 6.5.9-4.7 4.5 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.5l6.5-.9z" fill="currentColor"/></symbol>
    <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0113 0c0 4.8-6.5 11-6.5 11z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 7l8.5 6 8.5-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
    <symbol id="i-slab" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3 10h18M9 10v8" fill="none" stroke="currentColor" stroke-width="1.5"/></symbol>
  </defs>
</svg>`;
}

function stars(cls = '') {
  return `<span class="stars ${cls}" aria-hidden="true">${'<svg class="ico"><use href="#i-star"/></svg>'.repeat(5)}</span>`;
}

function head(d, { title, desc, canonical, og, jsonld, extra = '', base = '' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
${base ? `<base href="${base}">` : ''}
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${ORIGIN}/${canonical}">
<meta property="og:site_name" content="${S.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${ORIGIN}/${canonical}">
<meta property="og:image" content="${ORIGIN}/assets/opt/${og || IMG.kitchen.f}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#171310">
<link rel="icon" href="${asset(d, IMG.sink.f)}" type="image/webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=Manrope:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${url(d, 'styles.css')}">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
${extra}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${icons()}
`;
}

function topbar() {
  return `<!-- ============ TOP BAR ============ -->
<div class="topbar">
  <div class="shell topbar__in">
    <span class="mono">Triad, North Carolina</span>
    <span class="topbar__mid mono">Owner-led · Fixed quotes · Lifetime installation warranty</span>
    <a href="${S.telHref}" class="topbar__tel mono">${S.tel}</a>
  </div>
</div>
`;
}

function header(d, active, isHome = false) {
  const href = (p) => (isHome ? '#' + p : url(d, p));
  const links = NAV.map(([label, p, key]) => {
    const target = href(p);
    const cls = active === key ? ' class="is-active"' : '';
    return `<a href="${target}"${cls}>${label}</a>`;
  }).join('\n      ');
  const cta = isHome ? '#contact' : url(d, 'contact/');
  return `<header class="head" id="top">
  <div class="shell head__in">
    <a class="brand" href="${isHome ? '#top' : homeUrl(d)}" aria-label="${S.name}, home">
      <span class="brand__mark" aria-hidden="true">QS</span>
      <span class="brand__txt">
        <span class="brand__name">Quality Stone</span>
        <span class="brand__sub mono">Counters Corp</span>
      </span>
    </a>

    <nav class="nav" aria-label="Primary">
      ${links}
    </nav>

    <div class="head__cta">
      <a class="btn btn--ghost" href="${S.telHref}">
        <svg class="ico" aria-hidden="true"><use href="#i-phone"/></svg>
        <span class="btn__label">Call</span>
      </a>
      <a class="btn btn--solid" href="${cta}">Free estimate</a>
      <button class="burger" aria-label="Open menu" aria-expanded="false" aria-controls="mnav">
        <span></span><span></span>
      </button>
    </div>
  </div>

  <nav class="mnav" id="mnav" aria-label="Mobile" hidden>
    ${NAV.map(([label, p]) => `<a href="${isHome ? '#' + p : url(d, p)}">${label}</a>`).join('\n    ')}
    <a href="${cta}">Free estimate</a>
    <a href="${S.telHref}" class="mnav__tel">${S.tel}</a>
  </nav>
</header>
`;
}

function crumb(d, trail) {
  const parts = [`<a href="${homeUrl(d)}">Home</a>`];
  trail.forEach(([label, p], i) => {
    const last = i === trail.length - 1;
    parts.push(last ? `<span aria-current="page">${label}</span>` : `<a href="${url(d, p)}">${label}</a>`);
  });
  return `<nav class="crumb mono" aria-label="Breadcrumb">${parts.join('<span class="crumb__s" aria-hidden="true">/</span>')}</nav>`;
}

function trustrow(d, extra = []) {
  const items = [
    `<li><span class="stars" aria-hidden="true"><svg class="ico"><use href="#i-star"/></svg><svg class="ico"><use href="#i-star"/></svg><svg class="ico"><use href="#i-star"/></svg><svg class="ico"><use href="#i-star"/></svg><svg class="ico"><use href="#i-star"/></svg></span><span><strong>${S.rating}</strong> · ${S.reviews} Google reviews</span></li>`,
    `<li><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg>Licensed &amp; insured · ${S.license}</li>`,
    ...extra,
  ];
  return `<ul class="trustrow">${items.join('')}</ul>`;
}

function ctaBand(d, { kicker = 'One more thing', h = 'Your kitchen deserves<br><em>better than a guess.</em>', p = 'Free consultation, fixed pricing, and installation by the people who measured it.', label = 'Book my free consultation', img = IMG.macro.f } = {}) {
  return `<section class="band" aria-labelledby="band-h">
  <img class="band__bg" src="${asset(d, img)}" alt="" aria-hidden="true" loading="lazy" decoding="async">
  <div class="band__scrim" aria-hidden="true"></div>
  <div class="shell band__in">
    <span class="mono band__k">${kicker}</span>
    <h2 class="h2 h2--light" id="band-h">${h}</h2>
    <p>${p}</p>
    <div class="band__acts">
      <a class="btn btn--solid btn--lg" href="${url(d, 'contact/')}">${label} <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></a>
      <a class="band__tel" href="${S.telHref}"><svg class="ico" aria-hidden="true"><use href="#i-phone"/></svg>${S.tel}</a>
    </div>
  </div>
</section>`;
}

function footer(d) {
  return `<footer class="foot">
  <div class="shell foot__grid">
    <div class="foot__brand">
      <a class="brand brand--foot" href="${homeUrl(d)}">
        <span class="brand__mark" aria-hidden="true">QS</span>
        <span class="brand__txt"><span class="brand__name">Quality Stone</span><span class="brand__sub mono">Counters Corp</span></span>
      </a>
      <p>Custom cabinets, quartz and granite countertops, and remodels across the Triad, North Carolina.</p>
      <a class="btn btn--line" href="${url(d, 'contact/')}">Free estimate</a>
    </div>
    <div class="foot__col">
      <h4 class="mono">Services</h4>
      <a href="${url(d, 'services/custom-cabinets/')}">Custom cabinets</a>
      <a href="${url(d, 'services/flooring/')}">Tile &amp; LVP flooring</a>
      <a href="${url(d, 'services/quartz-countertops/')}">Quartz countertops</a>
      <a href="${url(d, 'services/granite-countertops/')}">Granite countertops</a>
      <a href="${url(d, 'services/kitchen-remodeling/')}">Kitchen remodels</a>
      <a href="${url(d, 'services/bathroom-remodeling/')}">Bathroom remodels</a>
    </div>
    <div class="foot__col">
      <h4 class="mono">Company</h4>
      <a href="${url(d, 'about/')}">About</a>
      <a href="${url(d, 'process/')}">Process</a>
      <a href="${url(d, 'work/')}">Selected work</a>
      <a href="${url(d, 'reviews/')}">Reviews</a>
      <a href="${url(d, 'faq/')}">FAQ</a>
    </div>
    <div class="foot__col">
      <h4 class="mono">Service area</h4>
      <a href="${url(d, 'service-area/')}">Greensboro</a>
      <a href="${url(d, 'service-area/')}">Winston-Salem</a>
      <a href="${url(d, 'service-area/')}">High Point</a>
      <a href="${url(d, 'service-area/')}">Kernersville</a>
      <a href="${url(d, 'service-area/')}">Burlington</a>
    </div>
  </div>
  <div class="shell foot__base">
    <span class="mono">© 2026 ${S.name} · Licensed &amp; insured ${S.license}</span>
    <span class="mono">Triad, North Carolina</span>
  </div>
</footer>

<a class="callbar" href="${S.telHref}">
  <span><svg class="ico" aria-hidden="true"><use href="#i-phone"/></svg>Call now</span>
  <span class="mono">Free estimate</span>
</a>

<script src="${url(d, 'script.js')}" defer></script>
</body>
</html>
`;
}

function page(d, opts, body) {
  return head(d, opts) + topbar() + header(d, opts.active, opts.isHome) + `<main id="main">\n${body}\n</main>\n` + footer(d);
}

function phero(d, { kicker, h1, p, img, ctas, meta }) {
  return `<section class="phero">
  <div class="shell">
    ${crumb(d, meta.crumb)}
    <div class="phero__grid">
      <div class="phero__copy">
        <p class="mono phero__kicker"><span class="rule" aria-hidden="true"></span>${kicker}</p>
        <h1 class="phero__h">${h1}</h1>
        <p class="phero__p">${p}</p>
        <div class="phero__acts">
          <a class="btn btn--solid btn--lg" href="${url(d, 'contact/')}">Get my free estimate <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></a>
          <a class="btn btn--line btn--lg" href="${S.telHref}"><svg class="ico" aria-hidden="true"><use href="#i-phone"/></svg>${S.tel}</a>
        </div>
        ${trustrow(d, ctas || [])}
      </div>
      <figure class="phero__media">
        <img src="${asset(d, img.f)}" alt="${esc(img.alt)}" width="${img.w}" height="${img.h}" fetchpriority="high" decoding="async">
        ${img.cap ? `<figcaption class="mono">${img.cap}</figcaption>` : ''}
      </figure>
    </div>
  </div>
</section>`;
}

function faqBlock(items, prefix) {
  return `<div class="faq__list">
${items.map(([q, a], i) => `      <div class="q">
        <h3><button class="q__btn" aria-expanded="false" aria-controls="${prefix}${i}" id="b-${prefix}${i}">${q}<svg class="ico q__ic" aria-hidden="true"><use href="#i-plus"/></svg></button></h3>
        <div class="q__a" id="${prefix}${i}" role="region" aria-labelledby="b-${prefix}${i}"><div><p>${a}</p></div></div>
      </div>`).join('\n')}
    </div>`;
}

function faqSchema(items) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({
      '@type': 'Question',
      name: q.replace(/<[^>]+>/g, ''),
      acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') },
    })),
  };
}

const biz = (extra = {}) => ({
  '@type': 'LocalBusiness',
  '@id': `${ORIGIN}/#business`,
  name: S.name,
  url: `${ORIGIN}/`,
  telephone: '+1-336-844-0585',
  email: S.email,
  image: `${ORIGIN}/assets/opt/${IMG.kitchen.f}`,
  priceRange: '$$',
  address: { '@type': 'PostalAddress', addressLocality: 'Greensboro', addressRegion: 'NC', addressCountry: 'US' },
  areaServed: ['Greensboro', 'Winston-Salem', 'High Point', 'Kernersville', 'Burlington', 'Clemmons', 'Thomasville', 'Oak Ridge', 'Summerfield', 'Triad NC'],
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:30' }],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: S.rating, reviewCount: S.reviews },
  ...extra,
});

function crumbs(trailDef) {
  const items = [{ name: 'Home', item: `${ORIGIN}/` }];
  let acc = '';
  for (const [label, p] of trailDef) {
    acc += p;
    items.push({ name: label, item: `${ORIGIN}/${acc}` });
  }
  return { '@type': 'BreadcrumbList', itemListElement: items.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.name, item: x.item })) };
}

/* ------------------------------------------------------------------ */
/* service pages                                                       */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    slug: 'custom-cabinets',
    n: '01',
    title: 'Custom Cabinets',
    h1: 'Cabinets built to the millimetre,<br>for the room you <em>actually</em> have.',
    kicker: '01 — Cabinetry',
    desc: 'Full-height, semi-custom and fully custom cabinetry for kitchens, baths, pantries and built-ins. Built in our Triad shop, installed by the crew that measured it.',
    metaDesc: 'Custom kitchen, bath and pantry cabinets built in our Triad shop. Plywood boxes, soft-close hardware, painted or stained finishes. Fixed quotes and lifetime installation warranty.',
    img: { ...IMG.cabHero, cap: 'Greensboro · white shaker & custom hood' },
    intro: [
      'Most cabinets you can buy come in a handful of widths. Your kitchen did not. We build to the opening, scribe to the wall and finish the run so the last cabinet is the same size as the first.',
      'You approve a sample door before anything is sprayed, and the drawing you sign is the drawing we build from. No substitution at install, no “close enough” filler panels.',
    ],
    includedTitle: 'What a Quality Stone cabinet project includes',
    included: [
      ['Plywood boxes', 'Three-quarter-inch plywood, doweled and glued — not particle board with a photo finish.'],
      ['Real hardware', 'Soft-close undermount runners and hinges rated for daily use, not builder-grade imports.'],
      ['A sample door', 'Finish, sheen and colour approved in your light before we spray the full run.'],
      ['Storage that works', 'Pull-outs, dividers, appliance panels, toe-kick drawers and pantry systems planned around how you cook.'],
      ['Scribed fit', 'Cabinets fitted to your walls and ceilings, then trimmed — not shimmed and buried in caulk.'],
      ['Our own installers', 'The people who measured the room are the people who set the cabinets.'],
    ],
    specTitle: 'Build spec',
    specHead: ['Component', 'What we use'],
    specRows: [
      ['Box', '3/4" plywood, doweled, glued and clamped'],
      ['Door &amp; drawer front', 'Painted MDF or solid hardwood'],
      ['Drawer box', 'Dovetail hardwood, soft-close undermount'],
      ['Finish', 'Conversion varnish, low-VOC, shop-sprayed'],
      ['Lead time', '3–5 weeks from signed drawing'],
      ['Warranty', 'Lifetime on installation'],
    ],
    price: { range: '$250–$650', unit: 'per linear foot, installed', note: 'Typical Triad range. Wall cabinets, islands, pantries and glass fronts price differently — the quote you sign is fixed.' },
    timeline: '3–5 weeks',
    steps: [
      ['Measure', 'We template the room and check level, plumb and appliance openings.'],
      ['Draw', 'You get a layout drawing and a fixed quote, line by line.'],
      ['Build', 'Doors and boxes are cut, assembled and finished in our shop.'],
      ['Install', 'Our crew sets, scribes, levels and hangs the run in your home.'],
    ],
    gallery: [IMG.cab02, IMG.cab03, IMG.cab04],
    faqs: [
      ['What is the difference between custom and semi-custom cabinets?', 'Semi-custom cabinets are stock boxes in set increments with a limited choice of fronts. Custom cabinets are built to your exact openings, ceiling height and storage plan, so you get a fitted run instead of filler strips and gaps.'],
      ['Can you match cabinets to an existing kitchen?', 'Usually. We can match a paint or stain from a door sample you already have, and we build a single matching cabinet, a pantry run or a full island rather than replacing everything.'],
      ['Do you install countertops too?', 'Yes. Cabinets and stone are templated and installed by the same company, so the overhang, sink and seam layout are planned together instead of handed between two trades.'],
      ['How much do custom cabinets cost in the Triad?', 'Most projects land between $250 and $650 per linear foot installed, depending on door style, finish and storage. You get a fixed quote after a free in-home measure.'],
    ],
    related: ['quartz-countertops', 'kitchen-remodeling', 'bathroom-remodeling'],
  },
  {
    slug: 'flooring',
    n: '02',
    title: 'Tile and LVP Flooring',
    h1: 'Floors that are flat, level<br>and <em>built to stay</em> that way.',
    kicker: '02 — Floors',
    desc: 'Porcelain tile and luxury vinyl plank for kitchens, baths, laundry rooms and whole floors. Subfloor prep, level transitions and installation by our own crew.',
    metaDesc: 'Tile and LVP flooring in Greensboro, Winston-Salem and the Triad. Subfloor levelling, waterproof tile, clean transitions and installation by one owner-led crew.',
    img: { ...IMG.bathTub, cap: 'Winston-Salem · hex tile floor' },
    intro: [
      'A floor is only as good as what is under it. We check flatness, repair soft spots, prime and level before a single tile or plank goes down — because lippage and hollow spots are installation problems, not material problems.',
      'Tile is set over an uncoupling or waterproof membrane with the correct notch trowel and full coverage. LVP is acclimated, undercut at the walls and laid on a prepared substrate, so the planks lock tight and the transitions sit flush.',
    ],
    includedTitle: 'What a Quality Stone floor project includes',
    included: [
      ['Subfloor prep', 'Flatness checked, soft spots repaired and the substrate primed before install.'],
      ['Levelling &amp; slope', 'Self-leveller where needed, and correct slope in wet areas so water goes to the drain.'],
      ['Waterproofing', 'Membrane in baths, laundry rooms and any floor that sees standing water.'],
      ['Layout planning', 'Tile centred on the room and planks run with the longest sight line, not wherever the first row lands.'],
      ['Clean transitions', 'Undercut jambs, flush threshold strips and level changes that do not trip you.'],
      ['Our own installers', 'The crew that preps the floor is the crew that finishes and seals it.'],
    ],
    specTitle: 'Flooring options',
    specHead: ['Choice', 'Options'],
    specRows: [
      ['Tile', 'Porcelain or ceramic, 12x24, 24x48, hex, mosaic'],
      ['LVP / LVT', 'Glue-down or click, 20 mil wear layer and up'],
      ['Layout', 'Stacked, offset, herringbone, chevron'],
      ['Transitions', 'Flush strips, reducers, stair nosing'],
      ['Lead time', '3–7 days for most rooms'],
      ['Warranty', 'Lifetime on installation'],
    ],
    price: { range: '$6–$18', unit: 'per square foot, installed', note: 'Tile with membrane and levelling sits at the top; click LVP over a sound subfloor sits at the bottom. Prep is quoted up front, not discovered later.' },
    timeline: '3–7 days',
    steps: [
      ['Check', 'We measure, test flatness and look for movement or moisture issues.'],
      ['Plan', 'Layout, material and transitions agreed, with a fixed quote.'],
      ['Prep', 'Repairs, levelling, membrane and primer before any finish material.'],
      ['Lay &amp; finish', 'Tile or plank set, grouted or locked, trimmed and cleaned.'],
    ],
    gallery: [IMG.bathTub, IMG.bathMarble, IMG.kitchen],
    faqs: [
      ['Do you level the subfloor first?', 'Yes, and it is in the quote. Tile and plank both telegraph what is underneath, so flatness, soft spots and moisture get fixed before installation starts.'],
      ['Tile or LVP — which should I choose?', 'Tile is the better answer for baths, laundry rooms and anywhere wet. LVP is warmer underfoot, faster to install and often the right call for a whole main floor or a rental.'],
      ['Can you lay tile over existing tile?', 'Sometimes, if the existing floor is sound, flat and well bonded. We test it first; if there is any doubt we remove it, because a failed bond takes the new floor with it.'],
      ['Do you do small jobs like a bathroom floor?', 'Yes. A single bath floor, a laundry room or a repaired patch is a normal job for us, and it is usually scheduled alongside a vanity or cabinet project.'],
    ],
    related: ['bathroom-remodeling', 'kitchen-remodeling', 'custom-cabinets'],
  },
  {
    slug: 'quartz-countertops',
    n: '03',
    title: 'Quartz Countertops',
    h1: 'Quartz countertops, templated digitally<br>and cut in <em>our own shop.</em>',
    kicker: '03 — Engineered stone',
    desc: 'Non-porous quartz for kitchens, baths, laundry rooms and bars. Laser template, in-house fabrication, tight seams and a lifetime installation warranty.',
    metaDesc: 'Quartz countertops in Greensboro, Winston-Salem and the Triad. Digital templating, in-house fabrication, undermount sinks and tight seams. Fixed quotes, lifetime installation warranty.',
    img: { ...IMG.waterfall, cap: 'Winston-Salem · quartz waterfall island' },
    intro: [
      'Quartz is engineered stone: ground quartz bound with resin. It is non-porous, so it does not need sealing and does not stain from wine, oil or lemon the way natural stone can.',
      'Every top starts with a digital template of your actual cabinets. The file goes to our shop, the slab is cut on our saw, and the piece that arrives is the piece that was drawn — including sink and faucet cut-outs.',
    ],
    includedTitle: 'What is included in a quartz install',
    included: [
      ['Digital template', 'Measured on site against your real cabinets, not a hand sketch.'],
      ['Slab selection', 'You see and approve the actual slab before it is cut.'],
      ['Edge profile', 'Eased, bevel, bullnose, waterfall or mitred — chosen at quote stage.'],
      ['Sink &amp; faucet cut-outs', 'Undermount sinks, cooktops and faucet holes cut and polished in-shop.'],
      ['Seam planning', 'Seams placed where they read least, colour-matched and finished flush.'],
      ['Backsplash', '4" splash, full-height splash or slab splash, matched from the same lot.'],
    ],
    specTitle: 'Quartz options',
    specHead: ['Choice', 'Options'],
    specRows: [
      ['Thickness', '2 cm or 3 cm'],
      ['Finish', 'Polished, honed or matte'],
      ['Edge', 'Eased, bevel, bullnose, ogee, mitred, waterfall'],
      ['Sink', 'Undermount, farmhouse or drop-in'],
      ['Lead time', '7–10 days after template'],
      ['Warranty', 'Lifetime on installation'],
    ],
    price: { range: '$55–$95', unit: 'per square foot, installed', note: 'Includes template, fabrication and install. Waterfall edges, full-height splash and premium slabs sit at the top of the range.' },
    timeline: '7–10 days',
    steps: [
      ['Select', 'We bring samples and help you choose a slab and edge.'],
      ['Template', 'A digital template is taken once cabinets are set and level.'],
      ['Fabricate', 'Cut, edge and polish in our shop; sink and faucet holes included.'],
      ['Install', 'Set, seam, silicone and clean — usually one day on site.'],
    ],
    gallery: [IMG.waterfall, IMG.macro, IMG.sink],
    faqs: [
      ['Is quartz better than granite?', 'Quartz is non-porous and needs no sealing, so it resists stains and is easier to live with. Granite is natural stone with unique movement and slightly better heat tolerance. We bring both and let the room decide.'],
      ['Can quartz go around a sink and cooktop?', 'Yes. Undermount sinks, farmhouse sinks and cooktops are all cut and polished in our shop, so the openings are finished before the top ever reaches your kitchen.'],
      ['Will quartz stain or need sealing?', 'No sealing, ever. Quartz is non-porous, so normal soap and water is enough. We still recommend a trivet for pans straight off the stove.'],
      ['How long does a quartz countertop take?', 'Seven to ten days from template to install for most kitchens. That includes fabrication and polishing in our shop.'],
    ],
    related: ['granite-countertops', 'custom-cabinets', 'kitchen-remodeling'],
  },
  {
    slug: 'granite-countertops',
    n: '04',
    title: 'Granite Countertops',
    h1: 'Granite slabs chosen with you,<br>before anything is <em>cut.</em>',
    kicker: '04 — Natural stone',
    desc: 'Natural granite with real movement, cut and finished in-house. Slab selection, sealing and installation handled by one crew.',
    metaDesc: 'Granite countertops in the Triad. Slab selection with the owner, in-house fabrication, sealing and installation. Fixed quotes and lifetime installation warranty.',
    img: { ...IMG.island, cap: 'Greensboro · granite & brick' },
    intro: [
      'Every granite slab is different. That is the point — and the risk. We walk the slab yard with you, mark the section you are buying, and plan the cut around the movement so the best part of the stone lands where you will see it.',
      'Granite is heat-tolerant and forgiving in a busy kitchen. We seal it before it leaves the shop and tell you exactly how often to reseal it in your house.',
    ],
    includedTitle: 'What is included in a granite install',
    included: [
      ['Slab selection', 'You pick the actual slab, not a sample chip from a catalogue.'],
      ['Cut planning', 'Veining and movement laid out before the saw touches the stone.'],
      ['Edge work', 'Edge profile cut and polished in our shop.'],
      ['Sink &amp; cooktop openings', 'Cut, polished and sealed before install.'],
      ['Sealing', 'Sealed in-shop, with a simple reseal schedule for your home.'],
      ['Install &amp; clean-up', 'Set, seamed and cleaned by the same crew.'],
    ],
    specTitle: 'Granite options',
    specHead: ['Choice', 'Options'],
    specRows: [
      ['Thickness', '2 cm or 3 cm'],
      ['Finish', 'Polished, honed, leathered or brushed'],
      ['Edge', 'Eased, bevel, bullnose, ogee, chiseled'],
      ['Slab size', 'Usually 9–10 ft by 5–6 ft; we plan seams around it'],
      ['Lead time', '7–10 days after template'],
      ['Warranty', 'Lifetime on installation'],
    ],
    price: { range: '$45–$85', unit: 'per square foot, installed', note: 'Depends on slab availability and edge detail. Exotic or book-matched slabs are quoted individually.' },
    timeline: '7–10 days',
    steps: [
      ['Choose', 'Slab yard visit or a curated set of options brought to you.'],
      ['Template', 'Digital template against the set cabinets.'],
      ['Fabricate', 'Cut, edge, polish and seal in our shop.'],
      ['Install', 'Set, seam, seal edges and clean up the same day.'],
    ],
    gallery: [IMG.island, IMG.veining, IMG.macro],
    faqs: [
      ['Does granite need sealing?', 'Yes, but not often. We seal it before install and most Triad homes only need a reseal every one to three years. We tell you how to test it with a drop of water.'],
      ['Can I choose my exact slab?', 'Always. You approve the actual slab and the section we will cut. Nothing is fabricated from a catalogue photo.'],
      ['Is granite safe for hot pans?', 'Granite handles heat better than most surfaces, but no stone is indestructible. Use a trivet and avoid putting a pan straight from a 500°F oven on any counter.'],
      ['Do you work with remnants?', 'For vanities, laundry rooms and bars, yes — remnants can bring the price down significantly. Ask what is on the rack.'],
    ],
    related: ['quartz-countertops', 'custom-cabinets', 'kitchen-remodeling'],
  },
  {
    slug: 'kitchen-remodeling',
    n: '05',
    title: 'Kitchen Remodeling',
    h1: 'One crew, one schedule,<br>one <em>fixed quote</em> for the whole kitchen.',
    kicker: '05 — Full kitchens',
    desc: 'Layout, cabinets, stone, lighting and installation handled as one project, with one schedule and one point of contact.',
    metaDesc: 'Full kitchen remodeling in Greensboro, Winston-Salem and the Triad. Cabinets, quartz and granite, layout and installation by one owner-led crew. Fixed quotes.',
    img: { ...IMG.kitchen, cap: 'Greensboro · full kitchen' },
    intro: [
      'A kitchen remodel goes wrong when three trades each blame the other. We removed that problem: design, cabinets, stone, and install are one contract with one schedule.',
      'Giselle measures the room, draws the layout, prices it line by line, and is on site for the install. If a wall is out of square, you hear it from us before the cabinets are ordered — not after.',
    ],
    includedTitle: 'What a full kitchen project covers',
    included: [
      ['Layout &amp; design', 'Work triangle, storage, appliance openings and lighting planned together.'],
      ['Cabinets', 'Built to the openings, finished to your sample.'],
      ['Stone', 'Quartz or granite, templated after cabinets are set.'],
      ['Sink &amp; faucet', 'Supplied or set from your selection, cut-outs included.'],
      ['Backsplash', 'Tile or slab, matched to the counter and cabinet.'],
      ['One schedule', 'A written sequence with dates, before demolition starts.'],
    ],
    specTitle: 'Typical project shape',
    specHead: ['Stage', 'What happens'],
    specRows: [
      ['Consultation', 'In-home measure, photos and a conversation about how you cook'],
      ['Design', 'Layout drawing, material selections and a fixed line-item quote'],
      ['Order &amp; build', 'Cabinets built, stone templated and fabricated'],
      ['Install', 'Demo, cabinets, stone, splash and punch list in sequence'],
      ['Walkthrough', 'Final check with the owner and warranty paperwork'],
      ['Warranty', 'Lifetime on installation'],
    ],
    price: { range: '$18,000–$65,000', unit: 'typical full kitchen', note: 'Cosmetic refreshes sit below this; structural changes and large islands sit above. The quote you sign is fixed.' },
    timeline: '4–8 weeks',
    steps: [
      ['Meet', 'We measure, listen and photograph the room.'],
      ['Design', 'You approve a layout, materials and a fixed quote.'],
      ['Build', 'Cabinets and stone are made while demo is scheduled.'],
      ['Install', 'One crew sequences demo, set, stone, splash and clean-up.'],
    ],
    gallery: [IMG.kitchen, IMG.waterfall, IMG.sage],
    faqs: [
      ['How long does a kitchen remodel take?', 'Most kitchens run four to eight weeks from approved design to final install. Cabinet and slab lead times drive most of it, and you get a written schedule before work starts.'],
      ['Can we live in the house during the remodel?', 'Most families do. We keep a temporary sink and work area where possible, seal off dust, and tell you which days will be loudest.'],
      ['Do you handle permits?', 'Yes where a project requires them. We coordinate with licensed trades for electrical, plumbing and structural work, and we tell you up front what needs a permit.'],
      ['Can I keep my appliances?', 'Absolutely. We build openings around your existing range, fridge and dishwasher, or plan new ones if you are replacing them.'],
    ],
    related: ['custom-cabinets', 'quartz-countertops', 'bathroom-remodeling'],
  },
  {
    slug: 'bathroom-remodeling',
    n: '06',
    title: 'Bathroom Remodeling',
    h1: 'Bathrooms finished on time, on budget,<br>and <em>sealed properly.</em>',
    kicker: '06 — Baths &amp; vanities',
    desc: 'Vanities, stone tops, shower slabs and full bathroom remodels. Waterproofing done right, because a beautiful bath that leaks is not beautiful.',
    metaDesc: 'Bathroom remodeling and custom vanities in the Triad. Quartz and marble vanity tops, slab showers, waterproofing and installation by one crew.',
    img: { ...IMG.bathTub, cap: 'Winston-Salem · marble bath' },
    intro: [
      'Bathrooms are small rooms with a lot of water in them. The difference between a bath that lasts and one that fails is almost entirely behind the tile: substrate, waterproofing, slope and sealing.',
      'We build vanities to the room, template the stone after the cabinet is set, and treat the shower as a wet system rather than a decorating job.',
    ],
    includedTitle: 'What a bathroom project covers',
    included: [
      ['Vanity &amp; top', 'Custom or semi-custom vanity with a templated quartz or marble top.'],
      ['Waterproofing', 'Cement board, membrane and correct slope before any tile.'],
      ['Slab shower walls', 'Quartz or marble slabs with a recessed niche and polished edges.'],
      ['Tile &amp; floor', 'Floor tile, curbs and transitions set level and sealed.'],
      ['Fixtures', 'Faucets, drains and trim set and tested before we leave.'],
      ['Punch list', 'A walkthrough with the owner, not a text message.'],
    ],
    specTitle: 'Typical bathroom scope',
    specHead: ['Item', 'What we do'],
    specRows: [
      ['Vanity top', 'Quartz, marble or granite, templated on site'],
      ['Shower', 'Slab or tile with membrane waterproofing'],
      ['Niche &amp; bench', 'Framed, waterproofed and finished'],
      ['Floor', 'Level, backer, tile and sealed grout'],
      ['Lead time', '2–4 weeks for most baths'],
      ['Warranty', 'Lifetime on installation'],
    ],
    price: { range: '$9,000–$28,000', unit: 'typical full bath', note: 'A vanity-and-top refresh is far less. Full gut renovations with layout changes sit at the top of the range.' },
    timeline: '2–4 weeks',
    steps: [
      ['Measure', 'We check the room, plumbing locations and substrate.'],
      ['Plan', 'Layout, materials and a fixed quote approved in writing.'],
      ['Build &amp; waterproof', 'Vanity built, shower framed and membrane installed.'],
      ['Finish', 'Tile, stone, fixtures, sealant and a full clean-up.'],
    ],
    gallery: [IMG.bathTub, IMG.bathMarble, IMG.shower],
    faqs: [
      ['How long does a bathroom remodel take?', 'Two to four weeks for most baths, depending on tile and slab lead times. We give you a written sequence before demo.'],
      ['Do you waterproof the shower properly?', 'Yes. We use cement board and a waterproof membrane with correct slope before tile. Waterproofing is the part you never see and the part that matters most.'],
      ['Can you just replace the vanity top?', 'Frequently, yes. If the cabinet is sound we template a new quartz or marble top and leave the rest of the room alone.'],
      ['Do you do small bathrooms?', 'Yes. Small rooms are where fitted vanities and slab walls make the biggest difference, because every inch is planned.'],
    ],
    related: ['quartz-countertops', 'custom-cabinets', 'kitchen-remodeling'],
  },
];

const bySlug = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));

/* ------------------------------------------------------------------ */
/* build service pages                                                 */
/* ------------------------------------------------------------------ */

for (const s of SERVICES) {
  const d = 2;
  const trail = [['Services', 'services/'], [s.title, `services/${s.slug}/`]];
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      biz(),
      {
        '@type': 'Service',
        name: s.title,
        serviceType: s.title,
        provider: { '@id': `${ORIGIN}/#business` },
        areaServed: ['Greensboro', 'Winston-Salem', 'High Point', 'Kernersville', 'Burlington', 'Triad NC'],
        url: `${ORIGIN}/services/${s.slug}/`,
        description: s.metaDesc,
      },
      faqSchema(s.faqs),
      crumbs(trail),
    ],
  };

  const body = `
${phero(d, {
    kicker: s.kicker,
    h1: s.h1,
    p: s.desc,
    img: s.img,
    meta: { crumb: trail },
  })}

<section class="sec">
  <div class="shell">
    <div class="sechead sechead--split">
      <span class="sechead__num mono">Overview</span>
      <h2 class="h2">What you are <em>actually</em> buying.</h2>
      <p class="sechead__p">${s.intro[0]}</p>
    </div>
    <div class="prose prose--wide">
      <p>${s.intro[1]}</p>
    </div>

    <div class="pricebar">
      <div>
        <span class="mono">Typical investment</span>
        <strong>${s.price.range}</strong>
        <span class="mono">${s.price.unit}</span>
      </div>
      <div>
        <span class="mono">Lead time</span>
        <strong>${s.timeline}</strong>
        <span class="mono">from approved design</span>
      </div>
      <div>
        <span class="mono">Warranty</span>
        <strong>Lifetime</strong>
        <span class="mono">on installation</span>
      </div>
      <a class="btn btn--solid" href="${url(d, 'contact/')}">Lock in a fixed quote <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></a>
    </div>
    <p class="pricebar__fine mono">${s.price.note}</p>
  </div>
</section>

<section class="sec sec--tint">
  <div class="shell">
    <div class="sechead">
      <span class="sechead__num mono">Included</span>
      <h2 class="h2">${s.includedTitle.replace(/\.$/, '')}<em>.</em></h2>
    </div>
    <ul class="inc">
      ${s.included.map(([t, p], i) => `<li><span class="inc__n mono">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${p}</p></li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="sec">
  <div class="shell spec__grid">
    <div>
      <div class="sechead">
        <span class="sechead__num mono">Spec</span>
        <h2 class="h2">${s.specTitle}</h2>
      </div>
      <table class="spec">
        <thead><tr>${s.specHead.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
        <tbody>${s.specRows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`)).join('')}</tr>`).join('')}</tbody>
      </table>
    </div>
    <figure class="frame frame--tall spec__media">
      <img src="${asset(d, s.gallery[0].f)}" alt="${esc(s.gallery[0].alt)}" width="${s.gallery[0].w}" height="${s.gallery[0].h}" loading="lazy" decoding="async">
      <figcaption class="mono">${s.img.cap}</figcaption>
    </figure>
  </div>
</section>

<section class="sec sec--tint">
  <div class="shell">
    <div class="sechead sechead--split">
      <span class="sechead__num mono">Process</span>
      <h2 class="h2">Four steps,<br><em>no surprises.</em></h2>
      <p class="sechead__p">The same sequence on every job, written down before we start.</p>
    </div>
    <ol class="steps4">
      ${s.steps.map(([t, p], i) => `<li><span class="steps4__n mono">0${i + 1}</span><h3>${t}</h3><p>${p}</p></li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="sec">
  <div class="shell">
    <div class="sechead sechead--split sechead--end">
      <div>
        <span class="sechead__num mono">Recent work</span>
        <h2 class="h2">Seen in <em>the Triad.</em></h2>
      </div>
      <a class="btn btn--line" href="${url(d, 'work/')}">See all work <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></a>
    </div>
    <div class="stripgal">
      ${s.gallery.map((g) => `<figure><img src="${asset(d, g.f)}" alt="${esc(g.alt)}" width="${g.w}" height="${g.h}" loading="lazy" decoding="async"></figure>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="sec sec--tint">
  <div class="shell faq__grid">
    <div class="faq__side">
      <span class="sechead__num mono">Questions</span>
      <h2 class="h2">${s.title.split(' ')[0]}<br><em>questions.</em></h2>
      <p>If yours is not here, call Giselle. She answers her own phone.</p>
      <a class="faq__tel" href="${S.telHref}"><svg class="ico" aria-hidden="true"><use href="#i-phone"/></svg>${S.tel}</a>
    </div>
    ${faqBlock(s.faqs, s.slug + '-')}
  </div>
</section>

<section class="sec">
  <div class="shell">
    <div class="sechead">
      <span class="sechead__num mono">Next</span>
      <h2 class="h2">Often booked <em>together.</em></h2>
    </div>
    <div class="rel">
      ${s.related.map((slug) => {
        const r = bySlug[slug];
        return `<a class="rel__card" href="${url(d, `services/${r.slug}/`)}">
        <img src="${asset(d, r.gallery[1].f)}" alt="" loading="lazy" decoding="async">
        <span class="rel__body"><span class="mono">${r.n}</span><strong>${r.title}</strong><span class="rel__price mono">${r.price.range}</span></span>
      </a>`;
      }).join('\n      ')}
    </div>
  </div>
</section>

${ctaBand(d, { h: `Ready to price your<br><em>${s.title.toLowerCase()}?</em>`, p: 'Free in-home measure, a written fixed quote, and a date you can plan around.' })}
`;

  const out = path.join(ROOT, 'services', s.slug, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(d, {
    title: `${s.title} in Greensboro, Winston-Salem & the Triad | ${S.name}`,
    desc: s.metaDesc,
    canonical: `services/${s.slug}/`,
    og: s.img.f,
    jsonld,
    active: 'services',
  }, body));
  console.log('wrote', path.relative(ROOT, out));
}

/* ------------------------------------------------------------------ */
/* services hub                                                        */
/* ------------------------------------------------------------------ */

{
  const d = 1;
  const trail = [['Services', 'services/']];
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [biz(), crumbs(trail), {
      '@type': 'ItemList',
      itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.title, url: `${ORIGIN}/services/${s.slug}/` })),
    }],
  };

  const body = `
${phero(d, {
    kicker: 'Services',
    h1: 'Six things,<br><em>done properly.</em>',
    p: 'Cabinets, floors, quartz, granite, kitchens and baths. We keep the list short so the quality stays high — and every job includes design help, a fixed quote and installation by our own crew.',
    img: { ...IMG.waterfall, cap: 'Winston-Salem · quartz waterfall' },
    meta: { crumb: trail },
  })}

<section class="sec">
  <div class="shell">
    <div class="sechead sechead--split">
      <span class="sechead__num mono">01 — Choose a starting point</span>
      <h2 class="h2">What are you<br><em>thinking about?</em></h2>
      <p class="sechead__p">Most projects start with one of these. If you are not sure, call and describe the room — we will tell you what it actually needs.</p>
    </div>

    <div class="svcgrid">
      ${SERVICES.map((s) => `<a class="svcgrid__card" href="${url(d, `services/${s.slug}/`)}">
        <figure><img src="${asset(d, s.gallery[0].f)}" alt="${esc(s.gallery[0].alt)}" width="${s.gallery[0].w}" height="${s.gallery[0].h}" loading="lazy" decoding="async"></figure>
        <div class="svcgrid__body">
          <span class="mono">${s.n} — ${s.kicker.split('— ')[1]}</span>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
          <span class="svcgrid__meta mono">${s.price.range} ${s.price.unit}</span>
          <span class="svcgrid__go">Explore <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></span>
        </div>
      </a>`).join('\n      ')}
      <a class="svcgrid__card svcgrid__card--ask" href="${url(d, 'contact/')}">
        <div class="svcgrid__body">
          <span class="mono">07 — Not sure yet</span>
          <h3>Start with the room, not the product.</h3>
          <p>Tell us what the space looks like and how you actually use it. We will tell you what it needs — even when that is less than you expected.</p>
          <span class="svcgrid__meta mono">Free in-home measure · no obligation</span>
          <span class="svcgrid__go">Talk to Giselle <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></span>
        </div>
      </a>
    </div>
  </div>
</section>

<section class="sec sec--dark">
  <div class="shell">
    <div class="sechead sechead--split">
      <span class="sechead__num mono">02 — Compare</span>
      <h2 class="h2 h2--light">Which surface<br><em>suits you?</em></h2>
      <p class="sechead__p">Both are excellent. They fail in different ways and suit different kitchens.</p>
    </div>
    <div class="cmp">
      <div class="cmp__col">
        <h3>Quartz</h3>
        <ul>
          <li><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg>Non-porous — no sealing, ever</li>
          <li><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg>Consistent colour and pattern</li>
          <li><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg>Best for busy family kitchens</li>
          <li><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg>Excellent in baths and laundry</li>
          <li class="cmp__no">Not ideal for outdoor kitchens</li>
        </ul>
        <a class="btn btn--solid" href="${url(d, 'services/quartz-countertops/')}">Quartz details</a>
      </div>
      <div class="cmp__col">
        <h3>Granite</h3>
        <ul>
          <li><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg>Natural stone, one-of-a-kind movement</li>
          <li><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg>Very heat tolerant</li>
          <li><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg>Repairable and refinishable</li>
          <li><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg>Works outdoors</li>
          <li class="cmp__no">Needs resealing every 1–3 years</li>
        </ul>
        <a class="btn btn--solid" href="${url(d, 'services/granite-countertops/')}">Granite details</a>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--tint">
  <div class="shell">
    <div class="sechead">
      <span class="sechead__num mono">03 — The same on every job</span>
      <h2 class="h2">What comes <em>standard.</em></h2>
    </div>
    <ul class="inc inc--3">
      <li><span class="inc__n mono">01</span><h3>A fixed quote</h3><p>The number we sign is the number you pay. Change orders only for changes you ask for.</p></li>
      <li><span class="inc__n mono">02</span><h3>In-house fabrication</h3><p>Your counter is templated, cut and polished by us — not brokered out to a third shop.</p></li>
      <li><span class="inc__n mono">03</span><h3>One crew</h3><p>The people who measure your room are the people who install it.</p></li>
      <li><span class="inc__n mono">04</span><h3>Lifetime installation warranty</h3><p>If a seam lifts or a cabinet settles, we come back.</p></li>
      <li><span class="inc__n mono">05</span><h3>Design help included</h3><p>Samples, layout and honest trade-offs, not an upsell script.</p></li>
      <li><span class="inc__n mono">06</span><h3>Licensed &amp; insured</h3><p>${S.license}, working across the Triad for over a decade.</p></li>
    </ul>
  </div>
</section>

${ctaBand(d)}
`;
  const out = path.join(ROOT, 'services', 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(d, {
    title: `Cabinet, Flooring &amp; Countertop Services in the Triad | ${S.name}`,
    desc: 'Custom cabinets, tile and LVP flooring, quartz and granite countertops, kitchen and bathroom remodeling across Greensboro, Winston-Salem and the Triad. Fixed quotes, in-house fabrication.',
    canonical: 'services/',
    og: IMG.waterfall.f,
    jsonld,
    active: 'services',
  }, body));
  console.log('wrote', path.relative(ROOT, out));
}

/* ------------------------------------------------------------------ */
/* about                                                               */
/* ------------------------------------------------------------------ */

{
  const d = 1;
  const trail = [['About', 'about/']];
  const jsonld = { '@context': 'https://schema.org', '@graph': [biz(), crumbs(trail)] };
  const body = `
${phero(d, {
    kicker: 'About',
    h1: 'A small Triad workshop<br>with <em>one standard</em>: it has to last.',
    p: 'Quality Stone Counters Corp is family owned and owner-run. Giselle walks every project from the first measurement to the final walkthrough — no call centre, no rotating subcontractors, no surprise line items.',
    img: { ...IMG.faucet, cap: 'Detail · quartz &amp; brass' },
    meta: { crumb: trail },
  })}

<section class="sec">
  <div class="shell aboutgrid">
    <div>
      <div class="sechead">
        <span class="sechead__num mono">01 — Our story</span>
        <h2 class="h2">Built the slow way,<br><em>on purpose.</em></h2>
      </div>
      <div class="prose">
        <p>We started in the Triad doing what most shops avoid: measuring the actual room, drawing the actual cabinet, and installing it with the same people who sold it. Ten years and more than 300 projects later, that is still the whole business.</p>
        <p>We template and fabricate in-house, so the counter that arrives at your house was cut for your house. Cabinets are built to the millimetre. Installation is done by the crew that measured it.</p>
        <p>That means we say no to some jobs. It also means the jobs we take get finished properly, on a schedule you can plan around, at the number we quoted.</p>
      </div>
      <dl class="facts facts--wide">
        <div><dt class="mono">Projects completed</dt><dd><span data-count="300">0</span>+</dd></div>
        <div><dt class="mono">Years in the Triad</dt><dd><span data-count="10">0</span></dd></div>
        <div><dt class="mono">Google rating</dt><dd>${S.rating}</dd></div>
        <div><dt class="mono">Install warranty</dt><dd>Lifetime</dd></div>
      </dl>
    </div>
    <figure class="frame frame--tall">
      <img src="${asset(d, IMG.bathTub.f)}" alt="${esc(IMG.bathTub.alt)}" width="${IMG.bathTub.w}" height="${IMG.bathTub.h}" loading="lazy" decoding="async">
      <figcaption class="mono">Winston-Salem · marble bath</figcaption>
    </figure>
  </div>
</section>

<section class="sec sec--dark">
  <div class="shell">
    <div class="sechead sechead--split">
      <span class="sechead__num mono">02 — How we work</span>
      <h2 class="h2 h2--light">Three promises,<br><em>in writing.</em></h2>
      <p class="sechead__p">They are on the paperwork because we expect to be held to them.</p>
    </div>
    <ol class="pledges pledges--light">
      <li><span class="pledges__n mono">01</span><div><h3>A fixed quote</h3><p>The number we sign is the number you pay. No change orders for things we should have measured the first time.</p></div></li>
      <li><span class="pledges__n mono">02</span><div><h3>Lifetime installation warranty</h3><p>If a seam lifts or a cabinet settles, we come back and fix it — for as long as you own the home.</p></div></li>
      <li><span class="pledges__n mono">03</span><div><h3>One crew, start to finish</h3><p>The people who measure your room are the people who install it. No rotating subcontractors, no handoffs.</p></div></li>
    </ol>
  </div>
</section>

<section class="sec">
  <div class="shell">
    <div class="sechead sechead--split sechead--end">
      <div>
        <span class="sechead__num mono">03 — Credentials</span>
        <h2 class="h2">You should<br><em>check these.</em></h2>
      </div>
      <a class="btn btn--line" href="${url(d, 'reviews/')}">Read the reviews <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></a>
    </div>
    <ul class="creds">
      <li><span class="mono">Licence</span><strong>${S.license}</strong><p>Licensed and insured to work in North Carolina.</p></li>
      <li><span class="mono">Rating</span><strong>${S.rating} / 5</strong><p>Across ${S.reviews} Google reviews from Triad homeowners.</p></li>
      <li><span class="mono">Warranty</span><strong>Lifetime</strong><p>On installation, for as long as you own the home.</p></li>
      <li><span class="mono">Fabrication</span><strong>In-house</strong><p>Template, cut and polish all happen in our own shop.</p></li>
    </ul>
  </div>
</section>

<section class="sec sec--tint">
  <div class="shell">
    <div class="sechead">
      <span class="sechead__num mono">04 — Where we work</span>
      <h2 class="h2">Triad born,<br><em>Triad based.</em></h2>
      <p class="sechead__p">We work within a radius that lets us be on site when we say we will be.</p>
    </div>
    <div class="cityrow">
      ${['Greensboro', 'Winston-Salem', 'High Point', 'Kernersville', 'Burlington', 'Clemmons'].map((c) => `<span class="cityrow__c mono">${c}</span>`).join('\n      ')}
    </div>
    <a class="btn btn--line" href="${url(d, 'service-area/')}">See the full service area <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></a>
  </div>
</section>

${ctaBand(d, { h: 'Come see the shop,<br><em>or we will come to you.</em>', p: 'Free in-home consultation across the Triad. Bring your plans, your Pinterest board, or just the room.' })}
`;
  const out = path.join(ROOT, 'about', 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(d, {
    title: `About Quality Stone Counters Corp | Owner-Led Cabinets & Stone in the Triad`,
    desc: 'Family owned and owner-run. Giselle measures, quotes and checks every cabinet and countertop project across Greensboro, Winston-Salem and the Triad.',
    canonical: 'about/',
    og: IMG.faucet.f,
    jsonld,
    active: 'about',
  }, body));
  console.log('wrote', path.relative(ROOT, out));
}

/* ------------------------------------------------------------------ */
/* work                                                                */
/* ------------------------------------------------------------------ */

{
  const d = 1;
  const trail = [['Work', 'work/']];
  const jsonld = { '@context': 'https://schema.org', '@graph': [biz(), crumbs(trail)] };
  const items = [
    [IMG.cabShowroom, 'cabinets', 'Showroom · Cabinets', 'Door &amp; finish library'],
    [IMG.cab03, 'cabinets', 'Showroom · Cabinets', 'White uppers, wood lowers'],
    [IMG.cab04, 'cabinets', 'Showroom · Cabinets', 'Cream, wood &amp; teal island'],
    [IMG.sage, 'cabinets', 'Greensboro · Cabinetry', 'Sage run, brass hardware'],
    [IMG.kitchen, 'kitchen', 'Greensboro · Kitchen', 'Sage cabinets, quartz island'],
    [IMG.waterfall, 'kitchen', 'Winston-Salem · Kitchen', 'Marble waterfall island'],
    [IMG.cab01, 'kitchen', 'Greensboro · Kitchen', 'White shaker, rattan pendants'],
    [IMG.cab06, 'kitchen', 'Greensboro · Kitchen', 'Marble waterfall island'],
    [IMG.bathTub, 'bath', 'Winston-Salem · Bath', 'Marble, tub &amp; hex tile'],
    [IMG.bathMarble, 'bath', 'High Point · Bath', 'Floating vanity &amp; shower'],
    [IMG.shower, 'bath', 'Greensboro · Bath', 'Quartz slab shower'],
    [IMG.island, 'stone', 'Greensboro · Stone', 'Quartz &amp; brass'],
    [IMG.macro, 'stone', 'Detail · Stone', 'Calacatta gold edge'],
    [IMG.veining, 'stone', 'Detail · Stone', 'Book-matched veining'],
    [IMG.faucet, 'stone', 'Detail · Stone', 'Quartz edge &amp; bridge faucet'],
    [IMG.sink, 'stone', 'Detail · Stone', 'Undermount sink cut-out'],
    [IMG.bathMarble, 'cabinets', 'High Point · Vanity', 'Painted vanity &amp; marble top'],
  ];
  const body = `
${phero(d, {
    kicker: 'Selected work',
    h1: 'Rooms we finished,<br>not rooms we <em>staged.</em>',
    p: 'Every photo below is a completed project in the Triad. No stock images, no renders, no borrowed portfolios.',
    img: { ...IMG.kitchen, cap: 'Greensboro · full kitchen' },
    meta: { crumb: trail },
  })}

<section class="sec">
  <div class="shell">
    <div class="sechead sechead--split sechead--end">
      <div>
        <span class="sechead__num mono">01 — Filter</span>
        <h2 class="h2">Browse by <em>room.</em></h2>
      </div>
      <div class="chips" role="group" aria-label="Filter work by category">
        <button class="chip is-on" data-f="all" aria-pressed="true">All</button>
        <button class="chip" data-f="cabinets" aria-pressed="false">Cabinets</button>
        <button class="chip" data-f="kitchen" aria-pressed="false">Kitchens</button>
        <button class="chip" data-f="bath" aria-pressed="false">Baths</button>
        <button class="chip" data-f="stone" aria-pressed="false">Stone</button>
      </div>
    </div>

    <div class="gal gal--wide">
      ${items.map(([img, cat, where, what]) => `<a class="gal__it" href="${url(d, 'contact/')}" data-c="${cat}">
        <img src="${asset(d, img.f)}" alt="${esc(img.alt)}" loading="lazy" decoding="async" width="${img.w}" height="${img.h}">
        <span class="gal__cap"><span class="mono">${where}</span><strong>${what}</strong></span>
      </a>`).join('\n      ')}
    </div>
    <p class="gal__empty mono" hidden>Nothing in that category yet.</p>
  </div>
</section>

<section class="sec sec--tint">
  <div class="shell">
    <div class="sechead">
      <span class="sechead__num mono">02 — Three projects, start to finish</span>
      <h2 class="h2">What changed,<br><em>and why.</em></h2>
    </div>

    <div class="cases">
      <article class="case">
        <img src="${asset(d, IMG.kitchen.f)}" alt="${esc(IMG.kitchen.alt)}" loading="lazy" decoding="async">
        <div>
          <span class="mono">Greensboro · Kitchen · 6 weeks</span>
          <h3>A 1990s kitchen that could not fit a dishwasher</h3>
          <p>The room had a galley layout with a blocked corner and no room for a full-size dishwasher. We moved the range two feet, rebuilt the run as a fitted L, and set a quartz island with an overhang for stools.</p>
          <ul><li>Sage painted cabinets to the ceiling</li><li>Quartz island with a 12" seating overhang</li><li>New sink, faucet and full-height splash</li></ul>
        </div>
      </article>
      <article class="case">
        <img src="${asset(d, IMG.bathTub.f)}" alt="${esc(IMG.bathTub.alt)}" loading="lazy" decoding="async">
        <div>
          <span class="mono">Winston-Salem · Bath · 3 weeks</span>
          <h3>A bath that looked fine and leaked anyway</h3>
          <p>The tile was sound to the eye, but the shower had no membrane and the curb was flat. We stripped it back, waterproofed properly, and rebuilt with a marble slab surround and a freestanding tub.</p>
          <ul><li>Full membrane waterproofing and correct slope</li><li>Marble slab shower with recessed niche</li><li>New vanity top and hex tile floor</li></ul>
        </div>
      </article>
      <article class="case">
        <img src="${asset(d, IMG.waterfall.f)}" alt="${esc(IMG.waterfall.alt)}" loading="lazy" decoding="async">
        <div>
          <span class="mono">Winston-Salem · Stone · 9 days</span>
          <h3>A waterfall island cut from one slab</h3>
          <p>The client wanted the veining to run continuously down both ends. We laid the cut out on the slab, matched the two legs from the same block, and seamed them on the mitre so the pattern reads as one piece.</p>
          <ul><li>Book-matched waterfall ends</li><li>Undermount sink cut and polished in-shop</li><li>Seams placed outside the sightline</li></ul>
        </div>
      </article>
    </div>
  </div>
</section>

${ctaBand(d, { h: 'Want your room<br><em>in this list?</em>', p: 'Free in-home measure and a fixed quote. No pressure, no design fee.' })}
`;
  const out = path.join(ROOT, 'work', 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(d, {
    title: `Our Work — Kitchens, Baths & Stone in the Triad | ${S.name}`,
    desc: 'Completed cabinet, quartz, granite and remodel projects across Greensboro, Winston-Salem and the Triad. Real rooms, photographed after install.',
    canonical: 'work/',
    og: IMG.kitchen.f,
    jsonld,
    active: 'work',
  }, body));
  console.log('wrote', path.relative(ROOT, out));
}

/* ------------------------------------------------------------------ */
/* process                                                             */
/* ------------------------------------------------------------------ */

{
  const d = 1;
  const trail = [['Process', 'process/']];
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [biz(), crumbs(trail), {
      '@type': 'HowTo',
      name: 'How a Quality Stone Counters project runs',
      step: [
        ['Call or send the form', 'Tell us the room and roughly what you want. We book a time that suits you.'],
        ['Free in-home measure', 'We measure, photograph and check level, plumb and access.'],
        ['Design and fixed quote', 'You get a layout, material choices and a line-item number that does not move.'],
        ['Deposit and fabrication', 'Materials are ordered and your cabinets and stone are built in our shop.'],
        ['Installation', 'Our crew sets cabinets, templates and installs stone, then cleans up.'],
        ['Walkthrough and warranty', 'We walk the finished room with you and hand over the warranty.'],
      ].map(([name, text]) => ({ '@type': 'HowToStep', name, text })),
    }],
  };
  const steps = [
    ['01', 'Call or send the form', 'Tell us the room, roughly what you want, and when you would like it done. We book a time that suits you — not a window that suits us.', 'Same day'],
    ['02', 'Free in-home measure', 'We measure the room, photograph the constraints, and check level, plumb, access and appliance openings. This is where most surprises get caught.', '45–60 min'],
    ['03', 'Design and fixed quote', 'You get a layout drawing, material samples and a line-item quote. The number you sign is the number you pay.', '3–5 days'],
    ['04', 'Deposit and fabrication', 'Materials are ordered and your cabinets and stone are built in our shop. You approve the slab and the sample door before we cut.', '1–3 weeks'],
    ['05', 'Installation', 'Our own crew sets cabinets, templates and installs the stone, then cleans up. You get a daily heads-up on what is happening next.', '1–5 days'],
    ['06', 'Walkthrough and warranty', 'We walk the finished room with you, fix the punch list, and hand over the lifetime installation warranty.', 'Same day'],
  ];
  const body = `
${phero(d, {
    kicker: 'Process',
    h1: 'What actually happens,<br>from call to <em>walkthrough.</em>',
    p: 'Six steps, the same on every job. You always know what happens next, who is coming, and what it costs.',
    img: { ...IMG.sage, cap: 'Greensboro · cabinetry detail' },
    meta: { crumb: trail },
  })}

<section class="sec">
  <div class="shell">
    <div class="sechead sechead--split">
      <span class="sechead__num mono">01 — The sequence</span>
      <h2 class="h2">Six steps.<br><em>No mystery.</em></h2>
      <p class="sechead__p">Everything below is written into your quote, including the dates.</p>
    </div>
    <ol class="timeline">
      ${steps.map(([n, t, p, dur]) => `<li>
        <span class="timeline__n mono">${n}</span>
        <div class="timeline__body"><h3>${t}</h3><p>${p}</p></div>
        <span class="timeline__dur mono">${dur}</span>
      </li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="sec sec--tint">
  <div class="shell promise__grid">
    <div class="promise__copy">
      <span class="sechead__num mono">02 — What we need from you</span>
      <h2 class="h2">Three things<br><em>that speed it up.</em></h2>
      <p class="promise__p">None of these are mandatory. All of them shorten the schedule and reduce the chance of a change order.</p>
      <ol class="pledges">
        <li><span class="pledges__n mono">01</span><div><h3>A decision-maker</h3><p>One person who can approve the layout and the finish. Group decisions are fine — just bring them to the first meeting.</p></div></li>
        <li><span class="pledges__n mono">02</span><div><h3>Appliance choices</h3><p>Model numbers, or a decision to keep what you have. Cabinet openings depend on them.</p></div></li>
        <li><span class="pledges__n mono">03</span><div><h3>Access and parking</h3><p>Somewhere for the truck and a clear path to the room. It sounds small; it saves a day.</p></div></li>
      </ol>
      <a class="btn btn--solid btn--lg" href="${url(d, 'contact/')}">Start with a free measure <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></a>
    </div>
    <div class="promise__media">
      <figure class="frame">
        <img src="${asset(d, IMG.faucet.f)}" alt="${esc(IMG.faucet.alt)}" width="${IMG.faucet.w}" height="${IMG.faucet.h}" loading="lazy" decoding="async">
        <figcaption class="mono">Detail · quartz &amp; brass · Greensboro</figcaption>
      </figure>
      <blockquote class="promise__sig">
        <p>“I measure it, I quote it, I check the install. That is the whole business model.”</p>
        <footer class="mono">Giselle · owner, Quality Stone Counters</footer>
      </blockquote>
    </div>
  </div>
</section>

<section class="sec">
  <div class="shell">
    <div class="sechead">
      <span class="sechead__num mono">03 — Honest answers</span>
      <h2 class="h2">The parts people<br><em>worry about.</em></h2>
    </div>
    <div class="faq__list faq__list--wide">
      ${faqBlock([
        ['Will the price change once work starts?', 'No, not for anything in the signed scope. If you ask for a change — a different slab, an added cabinet — we price it before we do it, in writing.'],
        ['How disruptive is installation?', 'Cabinet install is a few focused days; stone install is usually one. We seal off dust where we can and tell you the loud days in advance.'],
        ['What if something is wrong after you leave?', 'You call us and we come back. The installation warranty is lifetime, for as long as you own the home.'],
      ], 'proc-').replace(/^<div class="faq__list">/, '').replace(/<\/div>$/, '')}
    </div>
  </div>
</section>

${ctaBand(d, { h: 'Book the first step.<br><em>It is free.</em>', p: 'In-home measure, layout and a fixed quote across the Triad.' })}
`;
  const out = path.join(ROOT, 'process', 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(d, {
    title: `Our Process — From Free Measure to Lifetime Warranty | ${S.name}`,
    desc: 'Six steps from first call to final walkthrough: free measure, fixed quote, in-house fabrication, installation by our own crew, lifetime warranty.',
    canonical: 'process/',
    og: IMG.sage.f,
    jsonld,
    active: 'process',
  }, body));
  console.log('wrote', path.relative(ROOT, out));
}

/* ------------------------------------------------------------------ */
/* reviews                                                             */
/* ------------------------------------------------------------------ */

{
  const d = 1;
  const trail = [['Reviews', 'reviews/']];
  const reviews = [
    ['Maria G.', 'Greensboro · kitchen remodel', 'Giselle walked us through every option and the cabinets fit perfectly. Clean install, clear communication, and the quartz seams are invisible.'],
    ['Kevin R.', 'Winston-Salem · quartz counters', 'Our countertops look incredible and the crew left the house spotless. Professional from start to finish.'],
    ['Aisha T.', 'High Point · bathroom', 'Bathroom finished on time and on budget. They made a stressful project easy.'],
    ['Dana W.', 'Kernersville · kitchen', 'We had three quotes. Quality Stone was the only one that explained where the seams would go before we signed. That told us everything.'],
    ['Marcus L.', 'Burlington · granite', 'They let us walk the slab yard and mark the section we wanted. The island looks like a piece of art.'],
    ['Priya S.', 'Greensboro · vanity', 'Small job, treated like a big one. New vanity top templated and installed in a week.'],
    ['Tom &amp; Ellen H.', 'Winston-Salem · full kitchen', 'Demo to final clean-up in six weeks, exactly as scheduled. The daily updates were the best part.'],
    ['Renee C.', 'Clemmons · bath', 'Our old shower had been leaking for years. They found it, fixed it properly and rebuilt the whole thing.'],
    ['James O.', 'High Point · cabinets', 'Matched our existing cabinets for a pantry addition. You genuinely cannot tell which is new.'],
  ];
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [biz(), crumbs(trail), {
      '@type': 'ItemList',
      itemListElement: reviews.map(([name, where, text], i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Review',
          author: { '@type': 'Person', name: name.replace(/&amp;/g, '&') },
          reviewBody: text,
          reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
          itemReviewed: { '@id': `${ORIGIN}/#business` },
        },
      })),
    }],
  };
  const body = `
${phero(d, {
    kicker: 'Reviews',
    h1: 'What the Triad<br><em>actually says.</em>',
    p: `${S.rating} out of 5 across ${S.reviews} Google reviews. No incentives, no filtered list — this is what people wrote after we left.`,
    img: { ...IMG.bathMarble, cap: 'High Point · vanity &amp; marble' },
    meta: { crumb: trail },
  })}

<section class="sec">
  <div class="shell">
    <div class="score">
      <div class="score__big">
        <span class="score__num">${S.rating}</span>
        ${stars('stars--lg')}
        <span class="mono">${S.reviews} Google reviews</span>
      </div>
      <div class="score__bars">
        <div class="score__bar"><span class="mono">5</span><span class="score__track"><span style="width:94%"></span></span><span class="mono">94%</span></div>
        <div class="score__bar"><span class="mono">4</span><span class="score__track"><span style="width:4%"></span></span><span class="mono">4%</span></div>
        <div class="score__bar"><span class="mono">3</span><span class="score__track"><span style="width:1%"></span></span><span class="mono">1%</span></div>
        <div class="score__bar"><span class="mono">2</span><span class="score__track"><span style="width:0.5%"></span></span><span class="mono">&lt;1%</span></div>
        <div class="score__bar"><span class="mono">1</span><span class="score__track"><span style="width:0.5%"></span></span><span class="mono">&lt;1%</span></div>
      </div>
      <div class="score__cta">
        <p>Had a project with us? A review helps the next homeowner find a shop that answers its phone.</p>
        <a class="btn btn--solid" href="${url(d, 'contact/')}">Start your project <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></a>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--tint">
  <div class="shell">
    <div class="sechead">
      <span class="sechead__num mono">In their words</span>
      <h2 class="h2">Nine reviews,<br><em>unedited.</em></h2>
    </div>
    <div class="revgrid">
      ${reviews.map(([name, where, text]) => `<blockquote class="revcard">
        ${stars()}
        <p>“${text}”</p>
        <footer class="mono">${name} · ${where}</footer>
      </blockquote>`).join('\n      ')}
    </div>
  </div>
</section>

${ctaBand(d, { h: 'Join ' + S.reviews + ' happy<br><em>Triad homeowners.</em>', p: 'Free in-home measure, fixed quote, and an install date you can plan around.' })}
`;
  const out = path.join(ROOT, 'reviews', 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(d, {
    title: `Reviews — 4.9 Stars from 212 Triad Homeowners | ${S.name}`,
    desc: 'Read what homeowners in Greensboro, Winston-Salem and the Triad say about Quality Stone Counters Corp. 4.9 out of 5 across 212 Google reviews.',
    canonical: 'reviews/',
    og: IMG.bathMarble.f,
    jsonld,
    active: 'reviews',
  }, body));
  console.log('wrote', path.relative(ROOT, out));
}

/* ------------------------------------------------------------------ */
/* faq                                                                 */
/* ------------------------------------------------------------------ */

{
  const d = 1;
  const trail = [['FAQ', 'faq/']];
  const groups = [
    ['Pricing &amp; quotes', 'pricing', [
      ['How much do custom cabinets cost in the Triad?', 'Most projects land between $250 and $650 per linear foot installed, depending on door style, finish and storage. You get a fixed line-item quote after a free in-home measure.'],
      ['How much are quartz countertops installed?', 'Typically $55–$95 per square foot installed, including template, fabrication and install. Waterfall edges, full-height splash and premium slabs sit at the top of that range.'],
      ['What does a full kitchen remodel cost?', 'Most full kitchens run $18,000–$65,000. Cosmetic refreshes sit below that; structural changes and large islands sit above. The quote you sign is fixed.'],
      ['Is the estimate really free?', 'Yes. The in-home measure, layout and quote cost nothing, and there is no obligation to book.'],
      ['Do you require a deposit?', 'Yes, a deposit secures materials and your place in the shop schedule. The balance is tied to milestones, not to a single lump payment at the end.'],
    ]],
    ['Materials', 'materials', [
      ['Quartz or granite — which is better?', 'Quartz is non-porous and needs no sealing, so it is easier to live with. Granite is natural stone with unique movement and slightly better heat tolerance. We bring both and choose around how you cook and clean.'],
      ['Does quartz need sealing?', 'No. Quartz is non-porous, so soap and water is enough. Granite is sealed before install and usually needs resealing every one to three years.'],
      ['Can I choose my exact slab?', 'Always. You approve the actual slab and the section we will cut. Nothing is fabricated from a catalogue photo.'],
      ['Can you match my existing cabinets?', 'Usually. Bring a door or a paint sample and we will match the finish and build a matching cabinet, pantry or island.'],
      ['Do you work with remnants?', 'For vanities, laundry rooms and bars, yes. Remnants can bring the price down significantly — ask what is on the rack.'],
    ]],
    ['Process &amp; timing', 'process', [
      ['How long does a kitchen remodel take?', 'Four to eight weeks from approved design to final install. Cabinet and slab lead times drive most of it, and you get a written schedule before work starts.'],
      ['How long from template to countertop install?', 'Seven to ten days for most kitchens, because we fabricate in-house rather than sending it out.'],
      ['Can we live in the house during the remodel?', 'Most families do. We keep a temporary work area where possible, seal off dust, and tell you which days will be loudest.'],
      ['Do you handle permits?', 'Yes where a project requires them. We coordinate with licensed trades for electrical, plumbing and structural work and tell you up front what needs a permit.'],
      ['What should I have ready for the first visit?', 'Roughly what you want, your appliance plans if any, and access to the room. That is enough for a real number.'],
    ]],
    ['Warranty &amp; trust', 'warranty', [
      ['What does the warranty cover?', 'Installation, for as long as you own the home. If a seam lifts or a cabinet settles, we come back and fix it.'],
      ['Are you licensed and insured?', `Yes. ${S.license}, and we carry insurance for the work we do in your home.`],
      ['What if something is wrong after you leave?', 'Call us. We come back. That is the entire policy, and it is written on your paperwork.'],
      ['Can I see reviews before I book?', `Yes — ${S.rating} out of 5 across ${S.reviews} Google reviews. We will also give you references in your part of the Triad.`],
    ]],
    ['Service area', 'area', [
      ['What areas do you serve?', `${S.area} communities in North Carolina.`],
      ['Do you charge for travel?', 'No within our normal service radius. If a project is further out we tell you before we quote.'],
      ['Do you work outside the Triad?', 'Occasionally, for larger projects. Call and describe the job — we will be straight with you about whether it makes sense.'],
    ]],
  ];
  const all = groups.flatMap(([, , items]) => items);
  const jsonld = { '@context': 'https://schema.org', '@graph': [biz(), crumbs(trail), faqSchema(all)] };

  const body = `
${phero(d, {
    kicker: 'FAQ',
    h1: 'Straight<br><em>answers.</em>',
    p: 'Pricing, materials, timing and the warranty — the questions people actually ask before they book. If yours is not here, call Giselle. She answers her own phone.',
    img: { ...IMG.macro, cap: 'Detail · calacatta gold' },
    meta: { crumb: trail },
  })}

<section class="sec">
  <div class="shell">
    <div class="faqcats">
      ${groups.map(([label, id], i) => `<a class="faqcats__a mono" href="#${id}"><span>0${i + 1}</span>${label}</a>`).join('\n      ')}
    </div>
  </div>
</section>

${groups.map(([label, id, items], gi) => `
<section class="sec ${gi % 2 === 1 ? 'sec--tint' : ''}" id="${id}">
  <div class="shell faq__grid">
    <div class="faq__side">
      <span class="sechead__num mono">0${gi + 1} — ${label.replace(/&amp;/g, '&')}</span>
      <h2 class="h2">${label}</h2>
      <p>${gi === 0 ? 'No hidden fees, no design retainer, no pressure to sign on the first visit.' : gi === 1 ? 'We bring samples to your house so you choose in your own light.' : gi === 2 ? 'A written sequence with dates, before demolition starts.' : gi === 3 ? 'In writing, on your paperwork, for as long as you own the home.' : 'We stay close enough to be on site when we say we will.'}</p>
    </div>
    ${faqBlock(items, `f${gi}-`)}
  </div>
</section>`).join('\n')}

${ctaBand(d, { h: 'Still deciding?<br><em>Ask Giselle.</em>', p: 'One call, no script, no pressure. She will tell you what your room actually needs.' })}
`;
  const out = path.join(ROOT, 'faq', 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(d, {
    title: `FAQ — Cabinets, Quartz, Granite & Remodeling Questions | ${S.name}`,
    desc: 'Answers on cabinet and countertop pricing, quartz vs granite, remodel timelines, warranties and service areas across the Triad.',
    canonical: 'faq/',
    og: IMG.macro.f,
    jsonld,
    active: 'faq',
  }, body));
  console.log('wrote', path.relative(ROOT, out));
}

/* ------------------------------------------------------------------ */
/* service area                                                        */
/* ------------------------------------------------------------------ */

{
  const d = 1;
  const trail = [['Service Area', 'service-area/']];
  const cities = [
    ['Greensboro', 'Our home base. Most projects are within 20 minutes of the shop, which is why we can be on site early and come back for the punch list.', '15 min'],
    ['Winston-Salem', 'Kitchens, baths and stone across the west side and downtown. Waterfall islands are the most requested thing here.', '30 min'],
    ['High Point', 'Frequent bathroom and vanity work, plus furniture and cabinet projects around the showroom district.', '25 min'],
    ['Kernersville', 'A lot of new-build upgrades: cabinets, quartz and built-ins in homes that are five to fifteen years old.', '20 min'],
    ['Burlington', 'Granite and quartz installs, plus full kitchen refreshes along the I-40 corridor.', '35 min'],
    ['Clemmons', 'Bath remodels and pantry additions, mostly in established neighbourhoods.', '35 min'],
    ['Thomasville', 'Cabinetry and stone for smaller kitchens and rental turnovers.', '40 min'],
    ['Oak Ridge &amp; Summerfield', 'Larger kitchens, butler pantries and outdoor bar tops.', '25 min'],
  ];
  const jsonld = { '@context': 'https://schema.org', '@graph': [biz(), crumbs(trail)] };
  const body = `
${phero(d, {
    kicker: 'Service area',
    h1: 'Close enough to be<br><em>on time.</em>',
    p: 'We work where we can get to you, measure properly and come back for the punch list. That is the Triad, plus a little beyond it.',
    img: { ...IMG.waterfall, cap: 'Winston-Salem · quartz waterfall' },
    meta: { crumb: trail },
  })}

<section class="sec">
  <div class="shell">
    <div class="sechead sechead--split">
      <span class="sechead__num mono">01 — Where we work</span>
      <h2 class="h2">Eight towns,<br><em>one shop.</em></h2>
      <p class="sechead__p">No subcontracted crews, no “regional partner”. The same team, the same drive.</p>
    </div>

    <div class="citygrid">
      ${cities.map(([c, note, drive]) => `<article class="citycard">
        <div class="citycard__top"><h3>${c}</h3><span class="mono">${drive}</span></div>
        <p>${note}</p>
        <a class="mono citycard__link" href="${url(d, 'contact/')}">Book a measure <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></a>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="sec sec--tint">
  <div class="shell">
    <div class="sechead">
      <span class="sechead__num mono">02 — Not on the list?</span>
      <h2 class="h2">Ask anyway.</h2>
      <p class="sechead__p">We occasionally take larger projects further out. Worst case, we point you at someone good.</p>
    </div>
    <div class="split-cta">
      <a class="split-cta__a" href="${S.telHref}">
        <span class="mono">Call</span>
        <strong>${S.tel}</strong>
        <span class="mono">Mon–Fri 8:00–5:30</span>
      </a>
      <a class="split-cta__a" href="mailto:${S.email}">
        <span class="mono">Email</span>
        <strong>${S.email}</strong>
        <span class="mono">Reply within one business hour</span>
      </a>
    </div>
  </div>
</section>

${ctaBand(d, { h: 'Five minutes from<br><em>a real number.</em>', p: 'Send the form with your town and the room. We will tell you the next available measure date.' })}
`;
  const out = path.join(ROOT, 'service-area', 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(d, {
    title: `Service Area — Greensboro, Winston-Salem & the Triad | ${S.name}`,
    desc: 'Cabinet, countertop and remodeling services in Greensboro, Winston-Salem, High Point, Kernersville, Burlington, Clemmons and the surrounding Triad.',
    canonical: 'service-area/',
    og: IMG.waterfall.f,
    jsonld,
    active: 'service-area',
  }, body));
  console.log('wrote', path.relative(ROOT, out));
}

/* ------------------------------------------------------------------ */
/* contact                                                             */
/* ------------------------------------------------------------------ */

function formMarkup(d, id = 'form') {
  return `<form class="form" id="${id}" action="${url(d, 'thank-you/')}" method="get" novalidate>
      <div class="form__row">
        <label class="field"><span>Name</span><input name="name" type="text" autocomplete="name" required placeholder="First and last"></label>
        <label class="field"><span>Phone</span><input name="phone" type="tel" autocomplete="tel" required placeholder="(336) 000-0000"></label>
      </div>
      <label class="field"><span>Email</span><input name="email" type="email" autocomplete="email" required placeholder="you@email.com"></label>
      <div class="form__row">
        <label class="field"><span>Project</span>
          <select name="service" required>
            <option value="" selected disabled>Choose one</option>
            <option>Custom cabinets</option>
            <option>Quartz countertops</option>
            <option>Granite countertops</option>
            <option>Kitchen remodel</option>
            <option>Bathroom remodel</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label class="field"><span>Approx. budget <em>(optional)</em></span>
          <select name="budget">
            <option value="" selected>Prefer not to say</option>
            <option>Under $5k</option>
            <option>$5k–$15k</option>
            <option>$15k–$35k</option>
            <option>$35k+</option>
          </select>
        </label>
      </div>
      <label class="field"><span>Anything we should know? <em>(optional)</em></span><textarea name="message" rows="3" placeholder="Rooms, timeline, pets, the works"></textarea></label>

      <button type="submit" class="btn btn--solid btn--lg btn--full">Get my free estimate <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></button>
      <p class="form__fine mono">Reply within one business hour · no spam · we never sell your number</p>
    </form>`;
}

{
  const d = 1;
  const trail = [['Contact', 'contact/']];
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [biz(), crumbs(trail), {
      '@type': 'ContactPage',
      name: 'Contact Quality Stone Counters Corp',
      url: `${ORIGIN}/contact/`,
    }],
  };
  const body = `
<section class="phero phero--tight">
  <div class="shell">
    ${crumb(d, trail)}
    <div class="phero__grid">
      <div class="phero__copy">
        <p class="mono phero__kicker"><span class="rule" aria-hidden="true"></span>Free estimate</p>
        <h1 class="phero__h">Tell us about<br><em>the room.</em></h1>
        <p class="phero__p">Send the form or call Giselle directly. You will hear back within one business hour with a date for your free in-home consultation.</p>
        <ul class="contact__list contact__list--hero">
          <li><svg class="ico" aria-hidden="true"><use href="#i-phone"/></svg><div><span class="mono">Call or text</span><a href="${S.telHref}">${S.tel}</a><a href="${S.tel2Href}">${S.tel2}</a></div></li>
          <li><svg class="ico" aria-hidden="true"><use href="#i-mail"/></svg><div><span class="mono">Email</span><a href="mailto:${S.email}">${S.email}</a></div></li>
          <li><svg class="ico" aria-hidden="true"><use href="#i-clock"/></svg><div><span class="mono">Hours</span><span>${S.hours}</span></div></li>
        </ul>
      </div>
      <div class="phero__form">
        ${formMarkup(d)}
      </div>
    </div>
  </div>
</section>

<section class="sec sec--tint">
  <div class="shell">
    <div class="sechead">
      <span class="sechead__num mono">What happens next</span>
      <h2 class="h2">Three steps,<br><em>no mystery.</em></h2>
    </div>
    <ol class="inc inc--3 inc--steps">
      <li><span class="inc__n mono">01</span><h3>We call you back</h3><p>Within one business hour during the week. Same day if you send it in the morning.</p></li>
      <li><span class="inc__n mono">02</span><h3>We book a measure</h3><p>A 45–60 minute in-home visit at a time that suits you. Free, no obligation.</p></li>
      <li><span class="inc__n mono">03</span><h3>You get a fixed quote</h3><p>A layout, material options and a line-item number that does not move.</p></li>
    </ol>
  </div>
</section>

<section class="sec">
  <div class="shell split-cta split-cta--3">
    <div class="split-cta__a">
      <span class="mono">Service area</span>
      <strong>Triad, NC</strong>
      <span class="mono">Greensboro · Winston-Salem · High Point · Kernersville · Burlington</span>
      <a class="mono" href="${url(d, 'service-area/')}">See all towns <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></a>
    </div>
    <div class="split-cta__a">
      <span class="mono">Prefer to call?</span>
      <strong>${S.tel}</strong>
      <span class="mono">${S.hours}</span>
      <a class="mono" href="${S.telHref}">Call Giselle <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></a>
    </div>
    <div class="split-cta__a">
      <span class="mono">Licence</span>
      <strong>${S.license}</strong>
      <span class="mono">Licensed · insured · lifetime installation warranty</span>
      <a class="mono" href="${url(d, 'about/')}">About the shop <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></a>
    </div>
  </div>
</section>
`;
  const out = path.join(ROOT, 'contact', 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(d, {
    title: `Free Estimate — Contact Quality Stone Counters | Triad, NC`,
    desc: 'Request a free in-home measure and fixed quote for cabinets, quartz or granite countertops in Greensboro, Winston-Salem and the Triad. Reply within one business hour.',
    canonical: 'contact/',
    og: IMG.kitchen.f,
    jsonld,
  }, body));
  console.log('wrote', path.relative(ROOT, out));
}

/* ------------------------------------------------------------------ */
/* thank you                                                           */
/* ------------------------------------------------------------------ */

{
  const d = 1;
  const jsonld = { '@context': 'https://schema.org', '@graph': [biz()] };
  const body = `
<section class="thanks">
  <div class="shell thanks__in">
    <span class="thanks__ic"><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg></span>
    <span class="mono">Request received</span>
    <h1 class="thanks__h">Got it.<br><em>Giselle will call you.</em></h1>
    <p>If it is after 5:30, you will hear from us first thing tomorrow. Want it faster? Call us now — the phone is in the office, not a call centre.</p>
    <div class="thanks__acts">
      <a class="btn btn--solid btn--lg" href="${S.telHref}"><svg class="ico" aria-hidden="true"><use href="#i-phone"/></svg>Call ${S.tel}</a>
      <a class="btn btn--line btn--lg" href="${url(d, 'work/')}">See recent work</a>
    </div>
    <ol class="thanks__next">
      <li><span class="mono">01</span><p>We call you back within one business hour.</p></li>
      <li><span class="mono">02</span><p>We book a free 45–60 minute in-home measure.</p></li>
      <li><span class="mono">03</span><p>You get a layout, samples and a fixed quote.</p></li>
    </ol>
  </div>
</section>
`;
  const out = path.join(ROOT, 'thank-you', 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(d, {
    title: `Thank You — We Have Your Request | ${S.name}`,
    desc: 'Your request reached Quality Stone Counters. Giselle will call you within one business hour to book your free in-home measure.',
    canonical: 'thank-you/',
    og: IMG.kitchen.f,
    jsonld,
    extra: '<meta name="robots" content="noindex,follow">',
  }, body));
  console.log('wrote', path.relative(ROOT, out));
}

/* ------------------------------------------------------------------ */
/* 404                                                                 */
/* ------------------------------------------------------------------ */

{
  const d = 0;
  const jsonld = { '@context': 'https://schema.org', '@graph': [biz()] };
  const body = `
<section class="thanks thanks--404">
  <div class="shell thanks__in">
    <span class="mono">404 — Not found</span>
    <h1 class="thanks__h">That page is<br><em>not in the shop.</em></h1>
    <p>The link may be old, or the page may have moved. Here is the way back.</p>
    <div class="thanks__acts">
      <a class="btn btn--solid btn--lg" href="${homeUrl(d)}">Back to home</a>
      <a class="btn btn--line btn--lg" href="${url(d, 'contact/')}">Get a free estimate</a>
    </div>
    <nav class="thanks__links mono" aria-label="Popular pages">
      <a href="${url(d, 'services/')}">Services</a>
      <a href="${url(d, 'work/')}">Work</a>
      <a href="${url(d, 'process/')}">Process</a>
      <a href="${url(d, 'reviews/')}">Reviews</a>
      <a href="${url(d, 'faq/')}">FAQ</a>
      <a href="${S.telHref}">${S.tel}</a>
    </nav>
  </div>
</section>
`;
  const out = path.join(ROOT, '404.html');
  fs.writeFileSync(out, page(d, {
    title: `Page Not Found | ${S.name}`,
    desc: 'That page could not be found. Browse services, work, reviews or contact Quality Stone Counters for a free estimate.',
    canonical: '404.html',
    og: IMG.kitchen.f,
    jsonld,
    extra: '<meta name="robots" content="noindex,follow">',
    base: '/quality-stone-counters-site/',
  }, body));
  console.log('wrote', '404.html');
}

/* ------------------------------------------------------------------ */
/* sitemap + llms.txt                                                  */
/* ------------------------------------------------------------------ */

const ROUTES = [
  ['', '1.0', 'weekly'],
  ['services/', '0.9', 'monthly'],
  ...SERVICES.map((s) => [`services/${s.slug}/`, '0.85', 'monthly']),
  ['contact/', '0.9', 'yearly'],
  ['work/', '0.75', 'monthly'],
  ['reviews/', '0.75', 'monthly'],
  ['process/', '0.7', 'yearly'],
  ['about/', '0.7', 'yearly'],
  ['faq/', '0.7', 'monthly'],
  ['service-area/', '0.65', 'yearly'],
];
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(([p, priority, freq]) => `  <url>
    <loc>${ORIGIN}/${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);

const llms = `# ${S.name}
Custom cabinets, tile and LVP flooring, quartz and granite countertops, kitchen and bathroom remodels across the Triad, North Carolina. Owner-led, fixed quotes, in-house fabrication, lifetime installation warranty.

## Pages
- Home: ${ORIGIN}/
- Services: ${ORIGIN}/services/
${SERVICES.map((s) => `- ${s.title}: ${ORIGIN}/services/${s.slug}/`).join('\n')}
- Selected work: ${ORIGIN}/work/
- Process: ${ORIGIN}/process/
- Reviews: ${ORIGIN}/reviews/
- FAQ: ${ORIGIN}/faq/
- Service area: ${ORIGIN}/service-area/
- About: ${ORIGIN}/about/
- Contact and free estimate: ${ORIGIN}/contact/

## Facts
Owner: Giselle. Phone: (336) 844-0585 or (786) 985-9559. Email: ${S.email}
Service area: Greensboro, Winston-Salem, High Point, Kernersville, Burlington, Clemmons, Thomasville, Oak Ridge, Summerfield, Triad NC.
Rating: ${S.rating}/5 across ${S.reviews} Google reviews. Licensed and insured ${S.license}. Lifetime installation warranty.
Hours: Mon-Fri 8:00-5:30, Saturday by appointment.

## Process
Free in-home measure and fixed quote -> design and slab/door approval -> in-house fabrication -> installation by our own crew -> walkthrough and warranty.
`;
fs.writeFileSync(path.join(ROOT, 'llms.txt'), llms);
console.log('wrote sitemap.xml + llms.txt');

console.log('\nDone.');
