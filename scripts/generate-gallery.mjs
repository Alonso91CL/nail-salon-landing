import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "images", "gallery");
mkdirSync(OUT, { recursive: true });

const W = 1000;
const H = 1000;

const starPath =
  "M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z";

const star = (cx, cy, s, color, rot = 0) =>
  `<path transform="rotate(${rot} ${cx} ${cy}) translate(${cx - s} ${cy - s}) scale(${s / 24})" d="${starPath}" fill="${color}"/>`;

// almond nail pointing up, centered at (cx, cy)
function nailPath(cx, cy, w, h) {
  const rw = w / 2;
  const rh = h / 2;
  return `M ${cx - rw} ${cy + rh}
    C ${cx - rw} ${cy - rh * 0.05}, ${cx - rw * 0.92} ${cy - rh * 0.85}, ${cx} ${cy - rh}
    C ${cx + rw * 0.92} ${cy - rh * 0.85}, ${cx + rw} ${cy - rh * 0.05}, ${cx + rw} ${cy + rh}
    C ${cx + rw * 0.5} ${cy + rh * 1.16}, ${cx - rw * 0.5} ${cy + rh * 1.16}, ${cx - rw} ${cy + rh}
    Z`;
}

function frenchTip(cx, cy, w, h) {
  const rw = w / 2;
  const rh = h / 2;
  return `M ${cx} ${cy - rh}
    C ${cx - rw * 0.5} ${cy - rh * 0.72}, ${cx - rw * 0.95} ${cy - rh * 0.55}, ${cx - rw} ${cy - rh * 0.12}
    Q ${cx} ${cy - rh * 0.42}, ${cx + rw} ${cy - rh * 0.12}
    C ${cx + rw * 0.95} ${cy - rh * 0.55}, ${cx + rw * 0.5} ${cy - rh * 0.72}, ${cx} ${cy - rh} Z`;
}

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// nails arranged in a gentle fan
const NAILS = [
  { x: 235, y: 512, w: 118, h: 336, rot: -11 },
  { x: 402, y: 508, w: 118, h: 340, rot: -4 },
  { x: 569, y: 508, w: 118, h: 340, rot: 4 },
  { x: 736, y: 512, w: 118, h: 336, rot: 11 },
];

const shadow = (cx, cy, rh) =>
  `<ellipse cx="${cx}" cy="${cy + rh * 1.18}" rx="${56}" ry="16" fill="#1b0f16" opacity="0.16" filter="url(#blur)"/>`;

function wrap(bgGrad, defs, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    ${bgGrad}
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12"/></filter>
    ${defs}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${body}
</svg>`;
}

const BG_LIGHT = `<radialGradient id="bg" cx="50%" cy="38%" r="80%">
    <stop offset="0%" stop-color="#faf4f7"/>
    <stop offset="60%" stop-color="#efe4ea"/>
    <stop offset="100%" stop-color="#e2d4dc"/>
  </radialGradient>`;

const designs = [
  {
    name: "rojo-laca",
    defs: `<radialGradient id="n" cx="36%" cy="24%" r="85%">
      <stop offset="0%" stop-color="#ff7a97"/><stop offset="45%" stop-color="#d61c54"/><stop offset="100%" stop-color="#5f0c26"/>
    </radialGradient><linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff3b0"/><stop offset="50%" stop-color="#f5c542"/><stop offset="100%" stop-color="#b8860b"/>
    </linearGradient>`,
    body: () =>
      NAILS.map((n, i) =>
        `<g>${shadow(n.x, n.y, n.h / 2)}
          <path transform="rotate(${n.rot} ${n.x} ${n.y})" d="${nailPath(n.x, n.y, n.w, n.h)}" fill="url(#n)"/>
          ${i === 2 ? `<g transform="rotate(${n.rot} ${n.x} ${n.y})"><path d="M ${n.x} ${n.y - n.h * 0.15} Q ${n.x} ${n.y} ${n.x} ${n.y + n.h * 0.35}" stroke="url(#gold)" stroke-width="5" fill="none" stroke-linecap="round"/></g>` : ""}
          ${star(n.x, n.y - n.h * 0.2, 26, "#ffe9a8", 22)}
        </g>`,
      ).join(""),
  },
  {
    name: "francesa-estrella",
    defs: `<radialGradient id="n" cx="40%" cy="30%" r="85%">
      <stop offset="0%" stop-color="#fbeae3"/><stop offset="55%" stop-color="#ecc9bc"/><stop offset="100%" stop-color="#d6a896"/>
    </radialGradient><linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff3b0"/><stop offset="50%" stop-color="#e8b830"/><stop offset="100%" stop-color="#9c7a12"/>
    </linearGradient>`,
    body: () =>
      NAILS.map((n, i) =>
        `<g>${shadow(n.x, n.y, n.h / 2)}
          <path transform="rotate(${n.rot} ${n.x} ${n.y})" d="${nailPath(n.x, n.y, n.w, n.h)}" fill="url(#n)"/>
          <g transform="rotate(${n.rot} ${n.x} ${n.y})"><path d="${frenchTip(n.x, n.y, n.w, n.h)}" fill="#ffffff"/></g>
          ${i === 1 ? star(n.x, n.y + n.h * 0.1, 34, "url(#gold)") : ""}
        </g>`,
      ).join(""),
  },
  {
    name: "cromo-verde",
    defs: `<linearGradient id="n" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#04311f"/><stop offset="30%" stop-color="#0f7a52"/><stop offset="50%" stop-color="#9cffd8"/>
      <stop offset="70%" stop-color="#0f7a52"/><stop offset="100%" stop-color="#03301d"/>
    </linearGradient><linearGradient id="shimmer" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>`,
    body: () =>
      NAILS.map((n) =>
        `<g>${shadow(n.x, n.y, n.h / 2)}
          <path transform="rotate(${n.rot} ${n.x} ${n.y})" d="${nailPath(n.x, n.y, n.w, n.h)}" fill="url(#n)"/>
          <g transform="rotate(${n.rot} ${n.x} ${n.y})"><path d="${frenchTip(n.x, n.y, n.w, n.h)}" fill="url(#shimmer)" opacity="0.5"/></g>
          ${star(n.x + 40, n.y - n.h * 0.1, 16, "#eafff5", 30)}
        </g>`,
      ).join(""),
  },
  {
    name: "lavanda-y2k",
    defs: `<radialGradient id="n" cx="38%" cy="26%" r="85%">
      <stop offset="0%" stop-color="#d9c8ff"/><stop offset="50%" stop-color="#9d7bf0"/><stop offset="100%" stop-color="#5a37b8"/>
    </radialGradient>`,
    body: () => {
      const r = rng(7);
      return NAILS.map((n) => {
        const dots = [];
        for (let k = 0; k < 5; k++) {
          const a = r() * Math.PI * 2;
          const d = r() * (n.w * 0.32);
          dots.push(
            star(
              n.x + Math.cos(a) * d,
              n.y + Math.sin(a) * d * (n.h / n.w),
              10 + r() * 10,
              "#ffffff",
              r() * 45,
            ),
          );
        }
        return `<g>${shadow(n.x, n.y, n.h / 2)}
          <path transform="rotate(${n.rot} ${n.x} ${n.y})" d="${nailPath(n.x, n.y, n.w, n.h)}" fill="url(#n)"/>
          <g transform="rotate(${n.rot} ${n.x} ${n.y})" opacity="0.9">${dots.join("")}</g>
        </g>`;
      }).join("");
    },
  },
  {
    name: "magenta-glitter",
    defs: `<radialGradient id="n" cx="36%" cy="24%" r="85%">
      <stop offset="0%" stop-color="#ff7ec0"/><stop offset="50%" stop-color="#e51d7b"/><stop offset="100%" stop-color="#6d0f40"/>
    </radialGradient>`,
    body: () => {
      const r = rng(42);
      return NAILS.map((n) => {
        const dots = [];
        for (let k = 0; k < 40; k++) {
          const a = r() * Math.PI * 2;
          const d = r() * (n.w * 0.34);
          const py = Math.sin(a) * d * (n.h / n.w);
          const gold = r() > 0.5;
          dots.push(
            `<circle cx="${n.x + Math.cos(a) * d}" cy="${n.y + py}" r="${0.8 + r() * 2.2}" fill="${gold ? "#ffd76a" : "#ffffff"}" opacity="${0.5 + r() * 0.5}"/>`,
          );
        }
        return `<g>${shadow(n.x, n.y, n.h / 2)}
          <path transform="rotate(${n.rot} ${n.x} ${n.y})" d="${nailPath(n.x, n.y, n.w, n.h)}" fill="url(#n)"/>
          <g transform="rotate(${n.rot} ${n.x} ${n.y})">${dots.join("")}</g>
          ${star(n.x, n.y - n.h * 0.15, 22, "#ffd76a", 20)}
        </g>`;
      }).join("");
    },
  },
  {
    name: "negro-cromo",
    defs: `<linearGradient id="n" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0b0b10"/><stop offset="35%" stop-color="#4a4f5c"/><stop offset="52%" stop-color="#e6ebf2"/>
      <stop offset="68%" stop-color="#4a4f5c"/><stop offset="100%" stop-color="#0b0b10"/>
    </linearGradient>`,
    body: () =>
      NAILS.map((n, i) =>
        `<g>${shadow(n.x, n.y, n.h / 2)}
          <path transform="rotate(${n.rot} ${n.x} ${n.y})" d="${nailPath(n.x, n.y, n.w, n.h)}" fill="url(#n)"/>
          ${i === 1 ? star(n.x, n.y + n.h * 0.05, 28, "#dfe6ee", 45) : ""}
          ${i === 3 ? star(n.x - 20, n.y - n.h * 0.25, 14, "#dfe6ee", 15) : ""}
        </g>`,
      ).join(""),
  },
];

for (const d of designs) {
  const svg = wrap(BG_LIGHT, d.defs, d.body());
  await sharp(Buffer.from(svg), { density: 144 }).webp({ quality: 86 }).toFile(join(OUT, `${d.name}.webp`));
  console.log("generated", `${d.name}.webp`);
}
