/* ====================== cenário: redação ilustrada ======================
   Um ambiente só, em vista lateral: mesa à esquerda, uma pessoa sentada e a
   sala ao fundo. Clicar na luminária acende/apaga a luz, cuja força acompanha
   o nível de conclusão das pautas; o calendário de parede mostra as pautas. */
const svg = document.getElementById('scene');
const INK = '#14110f';
const W = 960, H = 380, FLOOR = 318, FOOT = 362;
const CLOCK = { x: 657, y: 52 };
const FONT = 'Roboto Slab, Georgia, serif';

function rect(x, y, w, h, fill, stroke, sw, rx) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + fill + '"' + (rx ? ' rx="' + rx + '"' : '') +
    (stroke ? ' stroke="' + stroke + '" stroke-width="' + (sw || 3) + '" stroke-linejoin="round"' : '') + '/>';
}
function poly(pts, fill, sw, extra) {
  return '<polygon points="' + pts + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="' + (sw || 3) + '" stroke-linejoin="round"' + (extra || '') + '/>';
}
function line(x1, y1, x2, y2, sw, color) {
  return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (color || INK) + '" stroke-width="' + (sw || 3) + '" stroke-linecap="round"/>';
}
function plant(x, y, leaf) {
  return '<path d="M' + x + ' ' + y + ' q-16 -10 -20 -30 q14 4 20 30 q-4 -22 2 -40 q10 16 -2 40 q6 -20 22 -28 q-2 18 -22 28z" fill="' + leaf + '" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>' +
    poly((x - 11) + ',' + y + ' ' + (x + 11) + ',' + y + ' ' + (x + 8) + ',' + (y + 16) + ' ' + (x - 8) + ',' + (y + 16), '#d7301f', 2.5);
}

/* ---------- parede, chão e objetos do fundo ---------- */
function room() {
  let s = rect(0, 0, W, FLOOR, '#3b2d5c') + rect(0, FLOOR, W, H - FLOOR, 'url(#floor)') +
    rect(0, FLOOR - 9, W, 9, '#2a1f45') + line(0, FLOOR - 9, W, FLOOR - 9, 2) + line(0, FLOOR, W, FLOOR, 3);
  for (let x = 0; x < W + 40; x += 60) s += '<line x1="' + x + '" y1="' + FLOOR + '" x2="' + (x - 30) + '" y2="' + H + '" stroke="rgba(0,0,0,.35)" stroke-width="2"/>';
  // tapete sob a cadeira
  s += '<ellipse cx="270" cy="366" rx="150" ry="11" fill="#6b3f6e" stroke="' + INK + '" stroke-width="3"/><ellipse cx="270" cy="366" rx="128" ry="7" fill="none" stroke="#f4a3c4" stroke-width="1.5" stroke-dasharray="6 5"/>';
  return s;
}
function corkBoard() {
  const cores = ['#fffdf7', '#fbe15a', '#f4a3c4', '#f3ead3', '#9fd3f2', '#ffb347'];
  // na parede atrás da mesa
  let s = rect(140, 36, 210, 142, '#6e4a2a', INK, 3) + rect(147, 43, 196, 128, '#b07a45', INK, 2);
  // fichas em grade (6 x 4) com um pouco de desalinho, para cobrir o quadro inteiro
  for (let i = 0; i < 24; i++) {
    const w = 24 + (i * 13) % 7, h = 22 + (i * 17) % 8, x = 150 + (i % 6) * 31.5 + (i * 7) % 6, y = 46 + Math.floor(i / 6) * 30 + (i * 11) % 6, r = (i * 29) % 21 - 10;
    s += '<g transform="rotate(' + r + ' ' + (x + w / 2) + ' ' + (y + h / 2) + ')">' + rect(x, y, w, h, cores[i % cores.length], INK, 1.8);
    for (let l = 0; l < 3; l++) s += rect(x + 4, y + 9 + l * 5, (w - 8) * (l === 2 ? .6 : 1), 1.4, 'rgba(20,17,15,.55)');
    s += '<circle cx="' + (x + w / 2) + '" cy="' + (y + 3) + '" r="2.2" fill="' + (i % 3 ? '#d7301f' : '#14110f') + '" stroke="' + INK + '" stroke-width="1"/></g>';
  }
  return s;
}
function wallClock() {
  const c = CLOCK;
  return '<circle cx="' + c.x + '" cy="' + c.y + '" r="23" fill="#f3ead3" stroke="' + INK + '" stroke-width="3"/>' +
    Array.from({ length: 12 }, (_, i) => '<line x1="' + c.x + '" y1="' + (c.y - 20) + '" x2="' + c.x + '" y2="' + (c.y - (i % 3 ? 18 : 16)) + '" stroke="' + INK + '" stroke-width="' + (i % 3 ? 1.2 : 2) + '" transform="rotate(' + (i * 30) + ' ' + c.x + ' ' + c.y + ')"/>').join('') +
    '<line id="clockHour" x1="' + c.x + '" y1="' + c.y + '" x2="' + c.x + '" y2="' + (c.y - 11) + '" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>' +
    '<line id="clockMin" x1="' + c.x + '" y1="' + c.y + '" x2="' + c.x + '" y2="' + (c.y - 16) + '" stroke="' + INK + '" stroke-width="2" stroke-linecap="round"/>' +
    '<line id="clockSec" x1="' + c.x + '" y1="' + (c.y + 4) + '" x2="' + c.x + '" y2="' + (c.y - 18) + '" stroke="#d7301f" stroke-width="1.2" stroke-linecap="round"/>' +
    '<circle cx="' + c.x + '" cy="' + c.y + '" r="2" fill="' + INK + '"/>';
}
// móveis encostados na parede: base perto do rodapé, um pouco menores e com sombra no chão
const WALL_BASE = 342, WALL_SCALE = .92;
function nearWall(cx, x1, x2, inner, semSombra) {
  const sx = x => cx + (x - cx) * WALL_SCALE;
  return (semSombra ? '' : '<rect x="' + (sx(x1) - 4) + '" y="' + (WALL_BASE - 3) + '" width="' + (sx(x2) - sx(x1) + 12) + '" height="9" rx="4" fill="#0a0716" opacity=".45"/>') +
    '<g transform="translate(' + cx + ' ' + WALL_BASE + ') scale(' + WALL_SCALE + ') translate(' + (-cx) + ' ' + (-FOOT) + ')">' + inner + '</g>';
}
function furniture() {
  // dois arquivos de aço e o bebedouro: mesma base, mesmo vão entre eles
  let a = cabinet(372) + rect(408, 238, 38, 8, '#fffdf7', INK, 2) + rect(411, 231, 34, 7, '#fbe15a', INK, 2) + rect(409, 225, 36, 6, '#f3ead3', INK, 2);
  a += cooler();
  // em cima do segundo arquivo: telefone e porta-lápis
  a += cabinet(520) + '<path d="M530 234 q-10 6 -2 12" fill="none" stroke="' + INK + '" stroke-width="2"/>' +
    poly('526,246 564,246 558,231 532,231', '#d7301f') + '<circle cx="545" cy="239" r="4" fill="#f3ead3" stroke="' + INK + '" stroke-width="1.8"/>' +
    rect(524, 223, 42, 8, '#2b2a33', INK, 2.5, 4) +
    line(578, 230, 575, 213, 3, '#5aa9e6') + line(581, 230, 582, 210, 3, '#d7301f') + line(585, 230, 589, 215, 3, '#6fbf4a') +
    rect(573, 228, 16, 18, '#f2c230', INK, 2.5, 2);
  // estante baixa com livros e fichários
  const livros = ['#d7301f', '#f2c230', '#9fd3f2', '#a7d97a', '#f4a3c4', '#f3ead3', '#ffb347', '#7fe0d0'];
  let b = rect(740, 246, 196, 116, '#6e4527', INK, 3) + rect(748, 254, 180, 46, '#3d2716', INK, 2) + rect(748, 308, 180, 48, '#3d2716', INK, 2);
  [[254, 46], [308, 48]].forEach((row, r) => {
    let x = 751, i = 0;
    while (x < 916) {
      const w = 8 + (i * 7 + r * 3) % 8, h = row[1] - 6 - (i * 11 + r * 5) % 12;
      b += rect(x, row[0] + row[1] - h, w, h, livros[(i + r * 3) % livros.length], INK, 1.8) + rect(x + 2, row[0] + row[1] - h + 5, w - 4, 2, 'rgba(20,17,15,.5)');
      x += w + ((i % 6 === 5) ? 7 : 0); i++;
    }
  });
  // em cima da estante: rádio (clicável), pastas e um cacto
  b += '<g class="radio" id="radio" role="button" tabindex="0" aria-label="Rádio: música do dia"><title>Música do dia</title>' +
    line(764, 222, 756, 206, 2) + rect(756, 222, 46, 24, '#2b2a33', INK, 3, 5) + '<circle cx="769" cy="234" r="7" fill="#4a4340" stroke="' + INK + '" stroke-width="2"/>' +
    rect(782, 228, 14, 4, '#f2c230', INK, 1.5, 2) + rect(782, 236, 14, 4, '#d7301f', INK, 1.5, 2) + '</g>';
  b += rect(818, 238, 54, 8, '#f3ead3', INK, 2) + rect(822, 230, 50, 8, '#9fd3f2', INK, 2) + rect(820, 223, 48, 7, '#fbe15a', INK, 2);
  b += rect(911, 224, 9, 6, '#a7d97a', INK, 2.2, 3) + rect(899, 214, 12, 20, '#a7d97a', INK, 2.5, 6) + poly('895,232 915,232 912,246 898,246', '#d7301f', 2.5);
  return nearWall(484, 372, 596, a) + nearWall(838, 740, 936, b);
}
function cabinet(x) {
  let s = rect(x, 246, 76, 116, '#7d8a9c', INK, 3);
  for (let k = 0; k < 3; k++) s += rect(x + 7, 253 + k * 36, 62, 30, '#97a4b5', INK, 2.5) + rect(x + 29, 261 + k * 36, 18, 5, '#f3ead3', INK, 1.5) + rect(x + 31, 272 + k * 36, 14, 8, '#fffdf7', INK, 1.5);
  return s;
}
// papel amassado: contorno irregular com vincos
function crumple(cx, cy, r, rot, fill) {
  const p = [1, .8, 1.02, .72, .98, .84, 1.04, .76, .94].map((f, i, k) => { const a = i / k.length * Math.PI * 2; return (Math.cos(a) * r * f).toFixed(1) + ',' + (Math.sin(a) * r * f).toFixed(1); });
  return '<g transform="translate(' + cx + ' ' + cy + ') rotate(' + rot + ')"><polygon points="' + p.join(' ') + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M' + p[1] + ' L' + (r * .1).toFixed(1) + ',' + (-r * .15).toFixed(1) + ' L' + p[4] + ' M' + (r * .1).toFixed(1) + ',' + (-r * .15).toFixed(1) + ' L' + p[7] + ' M' + p[5] + ' L' + (-r * .2).toFixed(1) + ',' + (r * .35).toFixed(1) + '" fill="none" stroke="' + INK + '" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></g>';
}
// bebedouro: clicar faz subir bolhas dentro do galão
const COOLER = { x: 462 };
function cooler() {
  const x = COOLER.x;
  return '<g class="cooler" id="cooler" role="button" tabindex="0" aria-label="Bebedouro"><title>Bebedouro</title>' +
    '<clipPath id="bottleClip"><rect x="' + (x + 7) + '" y="208" width="30" height="50" rx="8"/></clipPath>' +
    rect(x + 6, 206, 32, 52, '#9fd3f2', INK, 3, 9) + rect(x + 10, 214, 6, 30, 'rgba(255,255,255,.55)', null, 0, 3) +
    '<g id="bubbles" clip-path="url(#bottleClip)"></g>' +
    rect(x + 15, 254, 14, 10, '#7fb6d9', INK, 2.5) + rect(x, 262, 44, 100, '#e6dab8', INK, 3, 3) +
    rect(x + 7, 274, 30, 24, '#2a1f45', INK, 2.5) + rect(x + 11, 280, 7, 9, '#9fd3f2', INK, 2) + rect(x + 26, 280, 7, 9, '#d7301f', INK, 2) +
    rect(x + 5, 302, 34, 5, '#cfc6ad', INK, 2) + '</g>';
}
function bubbles() {
  const g = document.getElementById('bubbles');
  for (let i = 0; i < 10; i++) {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', (COOLER.x + 11 + Math.random() * 22).toFixed(1)); c.setAttribute('cy', 254);
    c.setAttribute('r', (1.4 + Math.random() * 2.6).toFixed(1));
    c.setAttribute('fill', 'rgba(255,255,255,.8)'); c.setAttribute('stroke', '#4f86b0'); c.setAttribute('stroke-width', .8);
    g.appendChild(c);
    c.animate([{ transform: 'translateY(0)', opacity: 0 }, { opacity: 1, offset: .15 }, { opacity: 1, offset: .8 }, { transform: 'translateY(-' + (36 + Math.random() * 10).toFixed(0) + 'px)', opacity: 0 }],
      { duration: 900 + Math.random() * 900, delay: i * 80, easing: 'ease-in', fill: 'backwards' }).onfinish = () => c.remove();
  }
}

/* ---------- janela: dia e noite, persiana que sobe e desce ---------- */
const WIN = { x: 752, y: 44, w: 172, h: 152, blind: 26 };
function windowScene() {
  const w = WIN, bottom = w.y + w.h, box = ' x="' + w.x + '" y="' + w.y + '" width="' + w.w + '" height="' + w.h + '"';
  let s = rect(744, 196, 188, 8, '#6e4527', INK, 3) +
    '<defs><linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5aa9e6"/><stop offset="1" stop-color="#d6eafa"/></linearGradient>' +
    '<clipPath id="winClip"><rect' + box + '/></clipPath></defs>' +
    '<g class="win" id="win" role="button" tabindex="0" aria-label="Janela: trocar entre dia e noite"><title>Trocar entre dia e noite</title>' +
    rect(w.x, w.y, w.w, w.h, 'url(#sky)', INK, 4) + '<g clip-path="url(#winClip)"><rect class="day-only"' + box + ' fill="url(#skyDay)"/><g class="night-only">';
  for (let i = 0; i < 16; i++) s += '<circle class="star" style="animation-delay:-' + ((i * .37) % 3) + 's" cx="' + (758 + (i * 47) % 160) + '" cy="' + (76 + (i * 23) % 50) + '" r="1.3" fill="#fff"/>';
  s += '</g><g class="day-only" fill="#fffdf7" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"><path d="M850 96 q2 -10 12 -8 q6 -10 16 -2 q10 0 8 10 z"/><path d="M768 118 q2 -8 10 -6 q6 -8 14 0 q8 0 6 8 z"/></g>';
  // a lua desce enquanto o sol sobe
  s += '<g class="moon"><circle cx="892" cy="92" r="14" fill="#fff2c2" stroke="' + INK + '" stroke-width="3"/><circle cx="899" cy="88" r="11" fill="#1a1238"/></g>' +
    '<g class="sun">' + Array.from({ length: 8 }, (_, i) => '<line x1="806" y1="70" x2="806" y2="64" stroke="#f2c230" stroke-width="3" stroke-linecap="round" transform="rotate(' + (i * 45) + ' 806 92)"/>').join('') +
    '<circle cx="806" cy="92" r="15" fill="#f2c230" stroke="' + INK + '" stroke-width="3"/></g>';
  let noite = '', dia = '', x = 754, i = 0;
  while (x < 924) {
    const bw = 24 + (i * 37) % 30, bh = 40 + (i * 53) % 56, top = bottom - bh;
    noite += rect(x, top, bw, bh, i % 2 ? '#1a1330' : '#221a3c', INK, 3);
    dia += rect(x, top, bw, bh, i % 2 ? '#8d84a8' : '#a79fc0', INK, 3);
    for (let wy = top + 8; wy < 190; wy += 12) for (let wx = x + 5; wx < x + bw - 6; wx += 10) {
      dia += rect(wx, wy, 5, 7, '#d6eafa');
      if (((wx * 7 + wy * 13 + i) % 5) < 3) noite += '<rect class="' + (((wx + wy) % 17 === 0) ? 'flk' : '') + '" x="' + wx + '" y="' + wy + '" width="5" height="7" fill="' + (((wx + wy) % 4) ? '#ffcc66' : '#ffe9a8') + '"/>';
    }
    x += bw + 3; i++;
  }
  s += '<g>' + noite + '</g><g class="day-only">' + dia + '</g></g>' + line(838, w.y, 838, bottom, 5) + line(w.x, 134, w.x + w.w, 134, 5) + '</g>';
  // persiana: a folha inteira fica recolhida acima da janela e desliza para baixo
  s += '<g clip-path="url(#winClip)"><g class="blind" id="blind" role="button" tabindex="0" aria-label="Persiana: abaixar ou subir"><title>Abaixar ou subir a persiana</title>' + rect(w.x, w.y, w.w, w.h, '#8d84a8', INK, 3);
  for (let y = w.y + 6; y < bottom - 6; y += 6) s += line(w.x + 2, y, w.x + w.w - 2, y, 1.5);
  s += rect(w.x, bottom - 6, w.w, 6, '#6f6790', INK, 2) + '</g></g>' + rect(w.x, w.y, w.w, w.h, 'none', INK, 4).replace('<rect', '<rect pointer-events="none"');
  return s;
}

/* ---------- mesa, cadeira e a pessoa ---------- */
function deskAndChair() {
  let s = '';
  // lixeira embaixo da mesa, transbordando de papel amassado
  // lixeira embaixo da mesa, com papel amassado
  s += crumple(113, 321, 8, 10, '#f3ead3') + crumple(134, 320, 8, 50, '#fffdf7') +
    poly('104,326 144,326 138,362 110,362', '#4a5a8a') + line(107, 338, 141, 338, 2) + crumple(123, 319, 9, 120, '#fffdf7');
  // mesa de perfil: lateral do gaveteiro (gavetas viradas para quem senta), pé e tampo
  s += rect(0, 248, 86, 114, '#6e4527', INK, 3) + line(14, 262, 14, 348, 1.5, 'rgba(20,17,15,.35)') + line(40, 258, 40, 352, 1.5, 'rgba(20,17,15,.35)') + line(64, 264, 64, 344, 1.5, 'rgba(20,17,15,.35)');
  for (let k = 0; k < 3; k++) s += rect(86, 264 + k * 35, 5, 12, '#f3ead3', INK, 2, 2) + (k ? line(80, 248 + k * 37, 86, 248 + k * 37, 2) : '');
  s += rect(150, 248, 9, 114, '#5c3a20', INK, 3) + rect(-6, 236, 226, 12, '#a8703f', INK, 3, 2);
  // monitor de tubo, de perfil, com cantos arredondados
  s += rect(106, 226, 38, 10, '#e6dab8', INK, 3, 5) +
    '<path d="M148 160 Q162 160 162 174 L162 214 Q162 228 148 228 L112 227 Q86 225 80 203 Q75 180 98 169 Q120 159 148 160 Z" fill="#f3ead3" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M148 160 Q162 160 162 174 L162 214 Q162 228 148 228 Q151 194 148 160 Z" fill="#e6dab8" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>';
  for (let k = 0; k < 3; k++) s += line(93 + k * 7, 188 - k * 2, 94 + k * 7, 200 - k * 2, 2.5);
  s += '<g transform="rotate(-8 128 198)">' + rect(119, 189, 18, 17, '#fbe15a', INK, 1.8, 2) + rect(122, 194, 12, 1.4, INK) + rect(122, 199, 8, 1.4, INK) + '</g>';
  // teclado
  s += rect(164, 228, 40, 8, '#e6dab8', INK, 2.5, 4);
  // cadeira giratória
  s += rect(318, 204, 14, 86, '#d7301f', INK, 3, 7) + line(325, 288, 325, 298, 5) + rect(284, 304, 8, 38, '#2b2a33', INK, 2.5) +
    line(288, 342, 250, 354, 5) + line(288, 342, 326, 354, 5) + line(288, 342, 288, 354, 5) +
    [250, 288, 326].map(x => '<circle cx="' + x + '" cy="358" r="4.5" fill="#2b2a33" stroke="' + INK + '" stroke-width="2"/>').join('') +
    rect(246, 292, 88, 13, '#d7301f', INK, 3, 6);
  return s;
}
function person() {
  let s = '';
  // boneco sem traços humanos: um corpo branco e arredondado, só com dois olhinhos
  const tubo = (pts, w) => '<polyline points="' + pts + '" fill="none" stroke="' + INK + '" stroke-width="' + (w + 6) + '" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<polyline points="' + pts + '" fill="none" stroke="#fffdf7" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"/>';
  // corpo e perna formam uma silhueta só: primeiro os contornos, depois os preenchimentos
  const corpo = 'M300 297 C324 297 328 262 326 232 C323 188 306 148 270 145 C244 143 231 164 233 186 C234 200 240 208 240 222 C240 248 230 268 236 284 C240 296 256 297 300 297 Z';
  const perna = '292,280 228,280 223,346 204,348';
  s += '<polyline points="' + perna + '" fill="none" stroke="' + INK + '" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="' + corpo + '" fill="#fffdf7" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>' +
    '<polyline points="' + perna + '" fill="none" stroke="#fffdf7" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="' + corpo + '" fill="#fffdf7"/>' +
    '<circle cx="242" cy="176" r="2.4" fill="' + INK + '"/><circle cx="253" cy="174" r="2.4" fill="' + INK + '"/>';
  s += '<g class="typing">' + tubo('272,216 248,242 198,228', 17) + '</g>';
  return s;
}

/* ---------- luz ---------- */
function lamp() {
  const cupula = 'M60 114 Q60 82 94 82 Q128 82 128 114 Z';
  return '<g class="lamp" id="lamp" role="button" tabindex="0" aria-label="Luminária: acender ou apagar a luz"><title>Acender ou apagar a luminária</title>' +
    '<rect x="4" y="70" width="134" height="170" fill="transparent"/>' +
    rect(14, 227, 40, 9, '#3a3a44', INK, 3, 4.5) +
    '<path d="M34 227 C12 168 30 102 92 86" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>' +
    '<ellipse class="shade-on" cx="94" cy="115" rx="26" ry="6" fill="#fff5c2"/>' +
    '<path class="shade" d="' + cupula + '" fill="#5f5a72" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>' +
    '<path class="shade shade-on" d="' + cupula + '" fill="#f2c230" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>' +
    '<circle cx="94" cy="82" r="4" fill="#3a3a44" stroke="' + INK + '" stroke-width="2.5"/></g>';
}
// placa luminosa: caixa branca acesa, cinza quando apagada
function sign() {
  const t = '<text x="482" y="37" text-anchor="middle" font-family="' + FONT + '" font-weight="900" font-size="19" letter-spacing="4" ';
  return '<g class="sign" id="sign" role="button" tabindex="0" aria-label="Placa Redação: acender ou apagar"><title>Acender ou apagar a placa</title>' +
    line(424, 0, 424, 12, 2.5) + line(540, 0, 540, 12, 2.5) +
    '<g class="sign-on"><rect x="384" y="2" width="196" height="56" rx="14" fill="#fffdf7" opacity=".5" filter="url(#soft)"/></g>' +
    rect(396, 12, 172, 36, '#6f6790', INK, 3, 7) + t + 'fill="#2a1f45">REDAÇÃO</text>' +
    '<g class="sign-on"><g class="neon">' + rect(396, 12, 172, 36, '#fffdf7', INK, 3, 7) +
    '<rect x="402" y="18" width="160" height="24" rx="4" fill="none" stroke="#d7301f" stroke-width="2"/>' + t + 'fill="#d7301f">REDAÇÃO</text></g></g></g>';
}

/* ---------- rádio: uma música do System of a Down por dia ---------- */
const SOAD = [
  ['Chop Suey!', 'Toxicity', 2001], ['Spiders', 'System of a Down', 1998], ['B.Y.O.B.', 'Mezmerize', 2005], ['Lonely Day', 'Hypnotize', 2005],
  ['Aerials', 'Toxicity', 2001], ['Innervision', 'Steal This Album!', 2002], ['Question!', 'Mezmerize', 2005], ['Sugar', 'System of a Down', 1998],
  ['Hypnotize', 'Hypnotize', 2005], ['Toxicity', 'Toxicity', 2001], ['Boom!', 'Steal This Album!', 2002], ['Lost in Hollywood', 'Mezmerize', 2005],
  ['ATWA', 'Toxicity', 2001], ['Dreaming', 'Hypnotize', 2005], ['War?', 'System of a Down', 1998], ['I-E-A-I-A-I-O', 'Steal This Album!', 2002],
  ['Forest', 'Toxicity', 2001], ['Radio/Video', 'Mezmerize', 2005], ['Holy Mountains', 'Hypnotize', 2005], ['Suite-Pee', 'System of a Down', 1998],
  ['Prison Song', 'Toxicity', 2001], ['Mr. Jack', 'Steal This Album!', 2002], ['Revenga', 'Mezmerize', 2005], ['Soldier Side', 'Hypnotize', 2005],
  ['Deer Dance', 'Toxicity', 2001], ['P.L.U.C.K.', 'System of a Down', 1998], ['Roulette', 'Steal This Album!', 2002], ['Sad Statue', 'Mezmerize', 2005],
  ['Science', 'Toxicity', 2001], ['Kill Rock \'n Roll', 'Hypnotize', 2005], ['Know', 'System of a Down', 1998], ['Highway Song', 'Steal This Album!', 2002],
  ['Needles', 'Toxicity', 2001], ['Cigaro', 'Mezmerize', 2005], ['Tentative', 'Hypnotize', 2005], ['Suggestions', 'System of a Down', 1998],
  ['Psycho', 'Toxicity', 2001], ['Streamline', 'Steal This Album!', 2002], ['Old School Hollywood', 'Mezmerize', 2005], ['Vicinity of Obscenity', 'Hypnotize', 2005],
  ['Bounce', 'Toxicity', 2001], ['Ego Brain', 'Steal This Album!', 2002], ['Mind', 'System of a Down', 1998], ['Attack', 'Hypnotize', 2005],
  ['Protect the Land', 'single', 2020]
];
function songOfTheDay() { const d = new Date(); return SOAD[Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5) % SOAD.length]; }
function openRadioPop(e) {
  if (e) e.stopPropagation();
  const pop = document.getElementById('radioPop'), m = songOfTheDay(), aberto = !pop.hidden;
  closeCalPop();
  if (aberto) return; // segundo clique no rádio fecha a sugestão
  pop.innerHTML = '<h4>&#9835; Música do dia</h4><strong>' + esc(m[0]) + '</strong><p>System of a Down · ' + esc(m[1]) + ' (' + m[2] + ')</p>';
  pop.hidden = false;
  const wrap = pop.parentNode.getBoundingClientRect(), b = document.getElementById('radio').getBoundingClientRect();
  pop.style.left = Math.max(8, Math.min(wrap.width - pop.offsetWidth - 8, b.left - wrap.left + b.width / 2 - pop.offsetWidth / 2)) + 'px';
  pop.style.top = Math.max(8, b.top - wrap.top - pop.offsetHeight - 10) + 'px';
}

function buildScene() {
  let s = '<defs>' +
    '<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>' +
    '<filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>' +
    '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0820"/><stop offset="1" stop-color="#3a2560"/></linearGradient>' +
    '<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2140"/><stop offset="1" stop-color="#15101f"/></linearGradient>' +
    '<radialGradient id="hole"><stop offset="0" stop-color="#000"/><stop offset=".5" stop-color="#2a2a2a"/><stop offset="1" stop-color="#fff"/></radialGradient>' +
    '<mask id="lampMask" maskUnits="userSpaceOnUse" x="0" y="0" width="' + W + '" height="' + H + '"><rect width="' + W + '" height="' + H + '" fill="#fff"/><ellipse cx="200" cy="250" rx="470" ry="320" fill="url(#hole)"/></mask>' +
    '</defs>';
  s += room() + corkBoard() + wallClock() + furniture() + deskAndChair() + person();
  // escuridão: sala apagada ou penumbra com o foco da luminária
  s += '<rect class="dark-off" width="' + W + '" height="' + H + '" fill="#0a0716" pointer-events="none"/>' +
    '<rect class="dark-on" width="' + W + '" height="' + H + '" fill="#0a0716" mask="url(#lampMask)" pointer-events="none"/>';
  // luz quente da luminária
  s += '<g class="warm" pointer-events="none"><ellipse cx="94" cy="128" rx="46" ry="22" fill="#ffd27a" opacity=".3" filter="url(#glow)"/>' +
    '<ellipse cx="150" cy="236" rx="150" ry="40" fill="#ffb347" opacity=".35" filter="url(#glow)"/></g>';
  // o que brilha por conta própria: janela, tela do monitor, neon
  // a planta do arquivo fica na frente do calendário
  s += '<g id="cal"></g><g class="cal-dim" pointer-events="none">' + nearWall(484, 372, 596, plant(392, 230, '#a7d97a'), true) + '</g>' + windowScene() +
    '<g pointer-events="none"><ellipse cx="222" cy="188" rx="64" ry="50" fill="#7fe0d0" opacity=".3" filter="url(#glow)"/>' +
    rect(153, 171, 7, 46, "#7fe0d0", null, 0, 3.5).replace("<rect", "<rect class=\"scr\"") + "</g>" +
    sign() + lamp() +
    // cesta e bolinhas por último: as bolinhas voam na frente da janela, do calendário e da placa
    '<g class="cal-dim">' + hoopBack() + '<g id="ballsBack"></g>' + hoopFront() + '<g id="ballsFront"></g></g><g id="aim" pointer-events="none"></g>' +
    '<g id="confetti" pointer-events="none"></g>';
  svg.innerHTML = s;
  press('lamp', toggleLamp);
  press('cooler', bubbles);
  press('win', () => { meta.dia = !meta.dia; saveMeta(); updateLight(); });
  press('blind', () => { meta.persiana = !meta.persiana; saveMeta(); updateLight(); });
  press('sign', () => { meta.placa = meta.placa === false; saveMeta(); updateLight(); });
  press('radio', openRadioPop);
  initBalls();
}
// clique ou Enter/espaço num objeto do cenário
function press(id, fn) {
  const el = document.getElementById(id);
  el.addEventListener('click', fn);
  el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); } });
}

function lampOn() { return meta.luz !== false; }
function toggleLamp() {
  meta.luz = !lampOn(); saveMeta(); updateLight();
}
// a luz fica mais forte conforme as pautas avançam
function updateLight() {
  const total = pautas.length, prog = total ? pautas.reduce((a, p) => a + p.status, 0) / (3 * total) : 0;
  svg.style.setProperty('--on', lampOn() ? 1 : 0);
  svg.style.setProperty('--prog', prog.toFixed(2));
  // janela: dia/noite e persiana; o sol só clareia a sala com a persiana erguida
  svg.style.setProperty('--day', meta.dia ? 1 : 0);
  svg.style.setProperty('--blind', meta.persiana ? 1 : 0);
  svg.style.setProperty('--sun', meta.dia && !meta.persiana ? 1 : 0);
  svg.style.setProperty('--sign', meta.placa === false ? 0 : 1);
  document.getElementById('lamp').setAttribute('aria-pressed', lampOn());
  document.getElementById('blind').setAttribute('aria-pressed', !!meta.persiana);
}

/* ---------- cesta de basquete ----------
   Bolinhas de papel no chão: arrastar uma para trás e soltar arremessa no
   sentido oposto (estilingue). A cesta é vista de frente, então a bolinha
   passa por cima do aro na subida e só bate nele ou cai dentro na descida. */
// relógio e cesta formam uma coluna centrada entre o calendário e a janela,
// no alto da parede
const HOOP = { x: 657, y: 142, half: 21 };
const BALL_R = 7, GRAV = .34, FLOOR_Y = 372, PULL_MAX = 130, PULL_K = .13;
let balls = [], aim = null, ballRaf = null;

function hoopBack() {
  const h = HOOP;
  return rect(h.x - 38, h.y - 60, 76, 56, '#fffdf7', INK, 3, 3) + rect(h.x - 16, h.y - 42, 32, 28, 'none', '#d7301f', 3) +
    '<text id="hoopScore" x="' + h.x + '" y="' + (h.y - 22) + '" text-anchor="middle" font-family="' + FONT + '" font-weight="900" font-size="15" fill="' + INK + '"><title>Cestas</title>0</text>' +
    rect(h.x - 4, h.y - 7, 8, 7, '#2b2a33', INK, 2) +
    '<path d="M' + (h.x - h.half) + ' ' + h.y + ' A' + h.half + ' 5 0 0 1 ' + (h.x + h.half) + ' ' + h.y + '" fill="none" stroke="' + INK + '" stroke-width="6"/>' +
    '<path d="M' + (h.x - h.half) + ' ' + h.y + ' A' + h.half + ' 5 0 0 1 ' + (h.x + h.half) + ' ' + h.y + '" fill="none" stroke="#e8702a" stroke-width="3"/>';
}
function hoopFront() {
  const h = HOOP, l = h.x - h.half, r = h.x + h.half;
  let net = '';
  for (let i = 0; i <= 6; i++) { const t = i / 6, x1 = l + 2 + t * (2 * h.half - 4), x2 = h.x - 12 + t * 24; net += '<path d="M' + x1 + ' ' + (h.y + 3) + ' L' + x2 + ' ' + (h.y + 26) + '"/>'; }
  net += '<path d="M' + (l + 4) + ' ' + (h.y + 11) + ' Q' + h.x + ' ' + (h.y + 16) + ' ' + (r - 4) + ' ' + (h.y + 11) + ' M' + (l + 7) + ' ' + (h.y + 19) + ' Q' + h.x + ' ' + (h.y + 24) + ' ' + (r - 7) + ' ' + (h.y + 19) + '"/>';
  return '<g pointer-events="none"><g id="net" class="net" fill="none" stroke="#fffdf7" stroke-width="1.4" stroke-linecap="round">' + net + '</g>' +
    '<path d="M' + l + ' ' + h.y + ' A' + h.half + ' 5 0 0 0 ' + r + ' ' + h.y + '" fill="none" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>' +
    '<path d="M' + l + ' ' + h.y + ' A' + h.half + ' 5 0 0 0 ' + r + ' ' + h.y + '" fill="none" stroke="#e8702a" stroke-width="3.5" stroke-linecap="round"/></g>';
}
function initBalls() {
  const front = document.getElementById('ballsFront');
  balls = [606, 632, 658, 684, 710].map((x, i) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    el.setAttribute('class', 'ball'); el.setAttribute('data-i', i);
    el.innerHTML = '<title>Arraste para trás e solte para arremessar</title><circle r="12" fill="transparent"/>' + crumple(0, 0, BALL_R + 1, 0, '#fffdf7');
    front.appendChild(el);
    return { x, y: FLOOR_Y - BALL_R, vx: 0, vy: 0, a: i * 40, moving: false, el };
  });
  balls.forEach(placeBall);
  document.getElementById('hoopScore').lastChild.textContent = meta.cestas || 0;
}
function placeBall(b) {
  b.el.setAttribute('transform', 'translate(' + b.x.toFixed(1) + ' ' + b.y.toFixed(1) + ') rotate(' + b.a.toFixed(0) + ')');
  // descendo perto do aro, a bolinha passa por trás dele e da rede
  const layer = document.getElementById(b.moving && b.vy > 0 && b.y < HOOP.y + 34 ? 'ballsBack' : 'ballsFront');
  if (b.el.parentNode !== layer) layer.appendChild(b.el);
}
function scoreBasket(b) {
  b.vx *= .25;
  meta.cestas = (meta.cestas || 0) + 1; saveMeta();
  document.getElementById('hoopScore').lastChild.textContent = meta.cestas;
  const net = document.getElementById('net'); net.classList.remove('swish'); void net.getBoundingClientRect(); net.classList.add('swish');
}
function stepBalls() {
  balls.forEach(b => {
    if (!b.moving) return;
    const py = b.y;
    b.vy += GRAV; b.x += b.vx; b.y += b.vy; b.a += b.vx * 4;
    if (b.x < BALL_R) { b.x = BALL_R; b.vx = -b.vx * .6; }
    if (b.x > W - BALL_R) { b.x = W - BALL_R; b.vx = -b.vx * .6; }
    if (b.vy > 0) {
      [-1, 1].forEach(s => {
        const rx = HOOP.x + s * HOOP.half, dx = b.x - rx, dy = b.y - HOOP.y, d = Math.hypot(dx, dy), min = BALL_R + 2;
        if (d >= min || !d) return;
        const nx = dx / d, ny = dy / d, dot = b.vx * nx + b.vy * ny;
        if (dot < 0) { b.vx = (b.vx - 2 * dot * nx) * .6; b.vy = (b.vy - 2 * dot * ny) * .6; }
        b.x = rx + nx * min; b.y = HOOP.y + ny * min;
      });
      if (py < HOOP.y && b.y >= HOOP.y && Math.abs(b.x - HOOP.x) < HOOP.half - 3) scoreBasket(b);
    }
    if (b.y > FLOOR_Y - BALL_R) {
      b.y = FLOOR_Y - BALL_R; b.vy = -b.vy * .5; b.vx *= .8;
      if (Math.abs(b.vy) < 1.2) { b.vy = 0; if (Math.abs(b.vx) < .2) { b.vx = 0; b.moving = false; } }
    }
    placeBall(b);
  });
  ballRaf = balls.some(b => b.moving) ? requestAnimationFrame(stepBalls) : null;
}
function drawAim() {
  const g = document.getElementById('aim');
  if (!aim || Math.hypot(aim.dx, aim.dy) < 8) { g.innerHTML = ''; return; }
  let x = aim.b.x, y = aim.b.y, vx = aim.dx * PULL_K, vy = aim.dy * PULL_K, s = '';
  for (let i = 1; i <= 48 && y < FLOOR_Y; i++) {
    vy += GRAV; x += vx; y += vy;
    if (i % 3 === 0) s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="1.8" fill="#fffdf7" opacity="' + (1 - i / 60).toFixed(2) + '"/>';
  }
  g.innerHTML = s;
}
function svgPoint(e) { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }
svg.addEventListener('pointerdown', e => {
  const el = e.target.closest('.ball'); if (!el) return;
  const b = balls[+el.getAttribute('data-i')]; if (!b || b.moving) return;
  e.preventDefault(); aim = { b, dx: 0, dy: 0 }; svg.setPointerCapture(e.pointerId); svg.classList.add('aiming');
});
svg.addEventListener('pointermove', e => {
  if (!aim) return;
  const p = svgPoint(e), dx = aim.b.x - p.x, dy = aim.b.y - p.y, len = Math.hypot(dx, dy), k = len > PULL_MAX ? PULL_MAX / len : 1;
  aim.dx = dx * k; aim.dy = dy * k; drawAim();
});
function endAim() {
  if (!aim) return;
  const a = aim; aim = null; drawAim(); svg.classList.remove('aiming');
  if (Math.hypot(a.dx, a.dy) < 8) return;
  a.b.vx = a.dx * PULL_K; a.b.vy = a.dy * PULL_K; a.b.moving = true;
  if (!ballRaf) ballRaf = requestAnimationFrame(stepBalls);
}
svg.addEventListener('pointerup', endAim);
svg.addEventListener('pointercancel', endAim);

/* ---------- calendário de parede ----------
   Cada dia é pintado com a cor da etapa das pautas que estão em andamento
   nele (do início ao encerramento). Clicar num dia lista essas pautas. */
const CAL = { x: 402, y: 58, w: 160, h: 138, cw: 22, ch: 17 };
const S_COLORS = ['#5aa9e6', '#f2c230', '#d7301f', '#6fbf4a'];
const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
let calMes = null;
const pad2 = n => String(n).padStart(2, '0');
function isoLocal(d) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
function pautaRange(p) {
  const ini = p.inicio || isoLocal(new Date(p.criadaEm)), fim = p.prazo || ini;
  return ini <= fim ? [ini, fim] : [fim, ini];
}
function pautasDoDia(iso) { return pautas.filter(p => { const r = pautaRange(p); return r[0] <= iso && iso <= r[1]; }); }
function renderCalendar() {
  const g = document.getElementById('cal'); if (!g) return;
  if (!calMes) { const d = new Date(); calMes = { y: d.getFullYear(), m: d.getMonth() }; }
  const c = CAL, hoje = isoLocal(new Date()), y = calMes.y, m = calMes.m;
  const txt = (x, yy, t, size, fill, w) => '<text x="' + x + '" y="' + yy + '" text-anchor="middle" font-family="' + FONT + '" font-weight="' + (w || 700) + '" font-size="' + size + '" fill="' + fill + '" pointer-events="none">' + t + '</text>';
  let s = rect(c.x, c.y, c.w, c.h, '#f3ead3', INK, 2.5) + rect(c.x, c.y, c.w, 20, '#d7301f', INK, 2.5) +
    txt(c.x + c.w / 2, c.y + 14, MESES[m].toUpperCase() + ' ' + y, 10, '#fffdf7', 800);
  [[-1, c.x, '‹'], [1, c.x + c.w - 22, '›']].forEach(n => s += '<g class="cal-nav" data-d="' + n[0] + '"><title>' + (n[0] < 0 ? 'Mês anterior' : 'Próximo mês') + '</title><rect x="' + n[1] + '" y="' + c.y + '" width="22" height="20" fill="transparent"/>' + txt(n[1] + 11, c.y + 16, n[2], 17, '#fffdf7', 900) + '</g>');
  'DSTQQSS'.split('').forEach((d, i) => s += txt(c.x + 3.5 + i * c.cw + (c.cw - 2) / 2, c.y + 30, d, 7, '#4a4340'));
  const first = new Date(y, m, 1).getDay(), n = new Date(y, m + 1, 0).getDate();
  for (let d = 1; d <= n; d++) {
    const idx = first + d - 1, cx = c.x + 3.5 + (idx % 7) * c.cw, cy = c.y + 34 + Math.floor(idx / 7) * c.ch, w = c.cw - 2, h = c.ch - 2;
    const iso = y + '-' + pad2(m + 1) + '-' + pad2(d), lista = pautasDoDia(iso), sts = [...new Set(lista.map(p => p.status))].sort();
    s += '<g class="cal-day" data-iso="' + iso + '"><title>' + pad2(d) + '/' + pad2(m + 1) + (lista.length ? ' — ' + lista.map(p => esc(p.titulo) + ' (' + STATUS[p.status] + ')').join(', ') : ' — sem pautas') + '</title>' +
      rect(cx, cy, w, h, '#fffdf7');
    sts.forEach((st, i) => s += rect(cx + i * w / sts.length, cy, w / sts.length, h, S_COLORS[st]));
    s += '<rect class="cal-cell" x="' + cx + '" y="' + cy + '" width="' + w + '" height="' + h + '" fill="none" stroke="' + INK + '" stroke-width="' + (iso === hoje ? 2.6 : 1) + '"/>' +
      txt(cx + w / 2, cy + h / 2 + 3, d, 8.5, sts.length === 1 && sts[0] === 2 ? '#fffdf7' : INK, iso === hoje ? 900 : 600) + '</g>';
  }
  g.innerHTML = s;
}
function closeCalPop() { document.getElementById('calPop').hidden = true; document.getElementById('radioPop').hidden = true; }
function openCalPop(dayEl) {
  const pop = document.getElementById('calPop'), iso = dayEl.dataset.iso, lista = pautasDoDia(iso), p = iso.split('-');
  const aberto = !pop.hidden && pop.dataset.iso === iso;
  closeCalPop();
  if (aberto) return; // segundo clique no mesmo dia fecha a lista
  pop.dataset.iso = iso;
  pop.innerHTML = '<h4>' + p[2] + '/' + p[1] + '/' + p[0] + '</h4>' + (lista.length
    ? lista.map(x => { const r = pautaRange(x); return '<button type="button" data-id="' + x.id + '"><b style="--c:' + S_COLORS[x.status] + '"></b><span>' + esc(x.titulo) + '<small>' + STATUS[x.status] + ' · ' + fmtData(r[0]) + ' a ' + fmtData(r[1]) + '</small></span></button>'; }).join('')
    : '<p>Nenhuma pauta neste dia.</p>');
  pop.hidden = false;
  const wrap = pop.parentNode.getBoundingClientRect(), b = dayEl.getBoundingClientRect();
  pop.style.left = Math.max(8, Math.min(wrap.width - pop.offsetWidth - 8, b.left - wrap.left + b.width / 2 - pop.offsetWidth / 2)) + 'px';
  pop.style.top = Math.max(8, Math.min(wrap.height - pop.offsetHeight - 8, b.bottom - wrap.top + 6)) + 'px';
}
svg.addEventListener('click', e => {
  const nav = e.target.closest('.cal-nav'), day = e.target.closest('.cal-day');
  if (nav) { const d = new Date(calMes.y, calMes.m + (+nav.dataset.d), 1); calMes = { y: d.getFullYear(), m: d.getMonth() }; closeCalPop(); renderCalendar(); }
  else if (day) { e.stopPropagation(); openCalPop(day); }
});
document.getElementById('calPop').addEventListener('click', e => {
  e.stopPropagation();
  const b = e.target.closest('button[data-id]'); if (!b) return;
  const p = pautas.find(x => x.id === b.dataset.id); closeCalPop(); if (p) openDlg(p);
});
document.addEventListener('click', closeCalPop);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCalPop(); });
