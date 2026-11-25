/* =========================================================================
 * viz.js — กราฟิก SVG และแอนิเมชัน (ไอคอนบนแผนที่ + กราฟิกในป๊อปอัป)
 * ========================================================================= */
window.RW = window.RW || {};

(function (RW) {
  let uid = 0;
  const id = (p) => `${p}${++uid}`;
  const f = (n, d = 2) => Number(n).toLocaleString(RW.i18n.lang === 'en' ? 'en-US' : 'th-TH', { minimumFractionDigits: d, maximumFractionDigits: d });

  /* ---------------------------------------------------------------------
   * สถานะอ่างเก็บน้ำ
   * ------------------------------------------------------------------- */
  const STATUS_COLORS = ['#f0642d', '#f5b51b', '#22b35e', '#2a8cf0', '#c81e3c'];
  function damStatus(pct) {
    const i = pct <= 30 ? 0 : pct <= 50 ? 1 : pct <= 80 ? 2 : pct <= 100 ? 3 : 4;
    return { i, color: STATUS_COLORS[i], label: RW.t(`st${i}`) };
  }

  /* ---------------------------------------------------------------------
   * ไอคอนบนแผนที่
   * ------------------------------------------------------------------- */
  // เขื่อน: รูปสี่เหลี่ยมคางหมู มีระดับน้ำภายในตาม %
  function damIcon(pct, color) {
    const c = id('dc');
    const lvl = Math.max(0, Math.min(1, pct / 100));
    const y = 3 + (1 - lvl) * 17;
    return `<svg viewBox="0 0 34 24"><defs><clipPath id="${c}"><path d="M8 3h18l6 18H2z"/></clipPath></defs>
      <path d="M8 3h18l6 18H2z" fill="rgba(255,255,255,.92)"/>
      <rect class="dam-fill" clip-path="url(#${c})" x="0" y="${y}" width="34" height="${24 - y}" fill="${color}"/>
      <path d="M8 3h18l6 18H2z" fill="none" stroke="${pct > 100 ? '#fff' : color}" stroke-width="2" stroke-linejoin="round"/></svg>`;
  }
  const gateIcon = (c = '#e040c8') => `<svg viewBox="0 0 24 22"><path d="M12 2 22.5 20h-21z" fill="${c}" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>`;
  const pumpIcon = (c = '#f2c200') => `<svg viewBox="0 0 22 22"><rect x="2" y="2" width="18" height="18" rx="3" fill="${c}" stroke="#fff" stroke-width="2"/><path d="M11 6.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" fill="#5a4600"/></svg>`;
  const stationIcon = (c) => `<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="7.5" fill="${c}" stroke="#fff" stroke-width="2.5"/></svg>`;
  const warnIcon = (c = '#fbbf24') => `<svg viewBox="0 0 30 27"><path d="M15 2 28.5 25h-27z" fill="${c}" stroke="#1b2430" stroke-width="2" stroke-linejoin="round"/><rect x="13.5" y="9" width="3" height="8.5" rx="1.2" fill="#1b2430"/><circle cx="15" cy="21" r="1.8" fill="#1b2430"/></svg>`;
  const plotIcon = () => `<svg viewBox="0 0 22 22"><rect x="3" y="3" width="6" height="16" fill="#9be15d" stroke="#fff" stroke-width="1.5"/><rect x="10" y="3" width="6" height="16" fill="#4caf50" stroke="#fff" stroke-width="1.5"/></svg>`;
  const riverIcon = () => `<svg viewBox="0 0 24 16"><path d="M1 10c4-6 7 2 11-3s7 2 11-3" stroke="#3aa0ff" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
  const flowIcon = () => `<svg viewBox="0 0 24 24"><path d="M4 11h11l-4-4 1.4-1.4L19 12l-6.6 6.4L11 17l4-4H4z" fill="#0a74c4"/></svg>`;
  const hydroIcon = () => `<svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18M8 3v18M16 3v18" stroke="#3aa0ff" stroke-width="1.6"/></svg>`;
  const labelIcon = () => `<svg viewBox="0 0 24 24"><path d="M4 6h16v3h-6v11h-4V9H4z" fill="#56708a"/></svg>`;

  /* ---------------------------------------------------------------------
   * กราฟิกในป๊อปอัป
   * ------------------------------------------------------------------- */
  // หน้าตัดเขื่อนพร้อมคลื่นน้ำเคลื่อนไหว
  function reservoirGauge(pct, color) {
    const c = id('rg');
    const lvl = Math.max(0.03, Math.min(1.08, pct / 100));
    const top = 18, bottom = 104, H = bottom - top;
    const y = bottom - H * Math.min(lvl, 1.05);
    return `<svg viewBox="0 0 120 112" class="rg">
      <defs>
        <clipPath id="${c}"><path d="M6 18h86l22 86H6z"/></clipPath>
        <linearGradient id="${c}g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".95"/><stop offset="1" stop-color="${color}" stop-opacity=".55"/></linearGradient>
      </defs>
      <path d="M6 18h86l22 86H6z" fill="#e6eef6"/>
      <g clip-path="url(#${c})">
        <g class="rg-water" style="transform:translateY(${bottom}px)" data-y="${y}">
          <path class="wv1" d="M-120 0q15-6 30 0t30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0V120H-120z" fill="url(#${c}g)"/>
          <path class="wv2" d="M-120 3q15-5 30 0t30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0V120H-120z" fill="${color}" opacity=".6"/>
        </g>
      </g>
      <!-- ตัวเขื่อน -->
      <path d="M92 10h8l18 94H96z" fill="#9aa9b8"/><path d="M92 10h8l-2 8h-6z" fill="#7d8c9b"/>
      <line x1="6" x2="92" y1="${top}" y2="${top}" stroke="#c81e3c" stroke-dasharray="3 3" stroke-width="1"/>
      <text x="8" y="${top - 4}" font-size="8" fill="#c81e3c">100%</text>
    </svg>`;
  }
  // ให้น้ำ "เติม" ขึ้นมาหลังแสดงผล
  function animateGauge(root) {
    root.querySelectorAll('.rg-water').forEach((g) => {
      requestAnimationFrame(() => requestAnimationFrame(() => { g.style.transform = `translateY(${g.dataset.y}px)`; }));
    });
  }

  // บานระบาย spillway
  function spillwayViz(total, open, lift) {
    const w = 300, gw = Math.min(46, (w - 40) / total - 8), gap = 8;
    const x0 = (w - (gw * total + gap * (total - 1))) / 2;
    let g = '';
    for (let i = 0; i < total; i++) {
      const x = x0 + i * (gw + gap);
      const isOpen = i < open;
      const up = isOpen ? Math.min(26, 8 + lift * 9) : 0;
      g += `<rect x="${x - 3}" y="14" width="3" height="54" fill="#8696a6"/>
        <rect x="${x}" y="${22 - up}" width="${gw}" height="30" rx="2" fill="${isOpen ? '#0a84d6' : '#a7b4c1'}"/>
        ${isOpen ? `<path class="spill" d="M${x + 2} ${52 - up + 2}v24" stroke="#7fd3ff" stroke-width="${gw - 6}" stroke-dasharray="4 5" opacity=".9"/>` : ''}`;
    }
    return `<svg viewBox="0 0 ${w} 82"><rect x="0" y="40" width="${w}" height="12" fill="#cfe9ff"/>
      <rect x="0" y="68" width="${w}" height="14" fill="#6fb8f0" opacity=".6"/>${g}
      <rect x="${x0 + total * (gw + gap) - 5}" y="14" width="3" height="54" fill="#8696a6"/></svg>`;
  }

  // หน้าตัดประตูระบายน้ำ: ระดับเหนือ/ท้ายประตู
  function gateViz(gt) {
    const W = 300, H = 120, base = 108;
    const lo = Math.min(gt.down, gt.up) - 1.2, hi = Math.max(gt.up, gt.down) + 0.8;
    const sy = (v) => base - ((v - lo) / (hi - lo)) * 86;
    const yu = sy(gt.up), yd = sy(gt.down);
    const gx = 140, gw = 20;
    const opening = Math.min(base - 18, base - (gt.open ? 10 + gt.lift * 12 : 0));
    return `<svg viewBox="0 0 ${W} ${H}">
      <rect x="0" y="${yu}" width="${gx}" height="${base - yu}" fill="#4aa8f0" opacity=".85"/>
      <path class="wv1" d="M-60 ${yu}q10-3 20 0t20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0V${yu + 4}H-60z" fill="#8fd0ff"/>
      <rect x="${gx + gw}" y="${yd}" width="${W - gx - gw}" height="${base - yd}" fill="#4aa8f0" opacity=".65"/>
      ${gt.open ? `<path class="gflow" d="M${gx - 30} ${base - 5}H${W}" stroke="#d8f1ff" stroke-width="3" stroke-dasharray="6 10"/>
        <path class="gflow" d="M${gx - 20} ${opening + 6}C${gx + 30} ${opening + 6} ${gx + 40} ${yd + 6} ${W} ${yd + 8}" stroke="#d8f1ff" stroke-width="2" fill="none" stroke-dasharray="5 9"/>` : ''}
      <rect x="${gx - 4}" y="6" width="${gw + 8}" height="8" fill="#5c6d7e"/>
      <rect x="${gx - 4}" y="6" width="4" height="${base - 6}" fill="#5c6d7e"/><rect x="${gx + gw}" y="6" width="4" height="${base - 6}" fill="#5c6d7e"/>
      <rect class="gate-leaf" x="${gx}" y="${opening - 62}" width="${gw}" height="62" fill="#e040c8" rx="2"/>
      <rect x="0" y="${base}" width="${W}" height="${H - base}" fill="#8a7a62"/>
      <g font-size="10" font-weight="600" fill="#0f2133">
        <text x="8" y="${yu - 6}">▼ ${f(gt.up)} ${RW.t('msl')}</text>
        <text x="${W - 8}" y="${yd - 6}" text-anchor="end">▼ ${f(gt.down)} ${RW.t('msl')}</text>
      </g>
      ${gt.open ? `<text x="${gx + gw + 8}" y="${opening + 2}" font-size="9" fill="#a61b8f">↑ ${f(gt.lift)} ${RW.t('m')}</text>` : ''}
    </svg>`;
  }

  // เครื่องสูบน้ำ: ใบพัดหมุนตามสถานะ
  function pumpViz(units) {
    const n = units.length, W = 300, cw = Math.min(70, W / n);
    const x0 = (W - cw * n) / 2;
    return `<svg viewBox="0 0 ${W} 86">${units.map((u, i) => {
      const cx = x0 + cw * i + cw / 2;
      const blade = 'M0-14a5 14 0 0 1 0 14a5 14 0 0 1 0-14z';
      return `<g transform="translate(${cx} 38)">
        <circle r="24" fill="${u.on ? '#fff6cc' : '#eef1f4'}" stroke="${u.on ? '#f2c200' : '#c2ccd6'}" stroke-width="3"/>
        <g class="${u.on ? 'imp' : ''}" style="--spd:${(1.6 - Math.min(1.2, u.rate / 10)).toFixed(2)}s">
          ${[0, 90, 180, 270].map((a) => `<path d="${blade}" fill="${u.on ? '#c79a00' : '#a7b4c1'}" transform="rotate(${a})"/>`).join('')}
          <circle r="4" fill="${u.on ? '#5a4600' : '#7d8c9b'}"/>
        </g>
        <text y="38" text-anchor="middle" font-size="10" font-weight="600" fill="#0f2133">#${i + 1}</text>
      </g>`;
    }).join('')}</svg>`;
  }

  // วงแหวนสัดส่วน (ภาพรวม)
  function ring(pct, color) {
    const r = 46, C = 2 * Math.PI * r;
    return `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="${r}" fill="none" stroke="#e5edf4" stroke-width="14"/>
      <circle class="ring-arc" cx="60" cy="60" r="${r}" fill="none" stroke="${color}" stroke-width="14" stroke-linecap="round"
        stroke-dasharray="${C}" stroke-dashoffset="${C}" data-off="${C * (1 - Math.min(1, pct / 100))}" transform="rotate(-90 60 60)"
        style="transition:stroke-dashoffset 1.2s cubic-bezier(.3,.9,.3,1)"/>
      <text x="60" y="66" text-anchor="middle" font-size="22" font-weight="700" fill="#0f2133">${f(pct, 0)}%</text></svg>`;
  }
  function animateRing(root) {
    root.querySelectorAll('.ring-arc').forEach((a) => requestAnimationFrame(() => requestAnimationFrame(() => (a.style.strokeDashoffset = a.dataset.off))));
  }

  /* ---------------------------------------------------------------------
   * กราฟเส้นขนาดเล็ก + crosshair/tooltip
   * series: [{ name, color, dash, area, pts:[{x,y}] }]
   * ------------------------------------------------------------------- */
  function lineChart(o) {
    const W = o.w || 308, H = o.h || 130, m = { t: 12, r: 10, b: 20, l: 36 };
    const all = o.series.flatMap((s) => s.pts);
    const xs = all.map((p) => p.x), ys = all.map((p) => p.y).concat((o.refs || []).map((r) => r.y));
    const xMin = Math.min(...xs), xMax = Math.max(...xs);
    let yMin = Math.min(...ys), yMax = Math.max(...ys);
    const pad = (yMax - yMin) * 0.12 || 0.5; yMin -= pad; yMax += pad;
    const sx = (x) => m.l + ((x - xMin) / (xMax - xMin || 1)) * (W - m.l - m.r);
    const sy = (y) => H - m.b - ((y - yMin) / (yMax - yMin || 1)) * (H - m.t - m.b);
    const gid = id('lc');
    let s = `<svg viewBox="0 0 ${W} ${H}" class="lc" data-cid="${gid}">`;
    // grid
    for (let i = 0; i <= 3; i++) {
      const v = yMin + ((yMax - yMin) * i) / 3, y = sy(v);
      s += `<line x1="${m.l}" x2="${W - m.r}" y1="${y}" y2="${y}" stroke="#e3eaf1"/>
        <text x="${m.l - 5}" y="${y + 3}" text-anchor="end" font-size="9" fill="#7c8b9b">${(o.yFmt || ((v) => f(v, 1)))(v)}</text>`;
    }
    (o.xTicks || []).forEach((t) => (s += `<text x="${sx(t)}" y="${H - 5}" text-anchor="middle" font-size="9" fill="#7c8b9b">${(o.xFmt || String)(t)}</text>`));
    (o.refs || []).forEach((r) => (s += `<line x1="${m.l}" x2="${W - m.r}" y1="${sy(r.y)}" y2="${sy(r.y)}" stroke="${r.color}" stroke-dasharray="4 3"/>
      <text x="${W - m.r - 2}" y="${sy(r.y) - 3}" text-anchor="end" font-size="9" font-weight="600" fill="${r.color}">${r.label}</text>`));
    if (o.vline != null) s += `<line x1="${sx(o.vline.x)}" x2="${sx(o.vline.x)}" y1="${m.t}" y2="${H - m.b}" stroke="#7c8b9b" stroke-dasharray="2 3"/>
      <text x="${sx(o.vline.x) + 3}" y="${m.t + 6}" font-size="9" fill="#44566a">${o.vline.label}</text>`;
    o.series.forEach((se, k) => {
      const d = se.pts.map((p, i) => `${i ? 'L' : 'M'}${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join('');
      if (se.area) {
        s += `<defs><linearGradient id="${gid}a${k}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${se.color}" stop-opacity=".28"/><stop offset="1" stop-color="${se.color}" stop-opacity="0"/></linearGradient></defs>
          <path d="${d}L${sx(se.pts[se.pts.length - 1].x)},${H - m.b}L${sx(se.pts[0].x)},${H - m.b}Z" fill="url(#${gid}a${k})"/>`;
      }
      s += `<path class="lc-line" d="${d}" fill="none" stroke="${se.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" ${se.dash ? 'stroke-dasharray="5 4"' : ''}/>`;
    });
    s += `<line class="lc-x" y1="${m.t}" y2="${H - m.b}" stroke="#0f2133" opacity="0"/>`;
    o.series.forEach((se) => (s += `<circle class="lc-dot" r="4" fill="${se.color}" stroke="#fff" stroke-width="2" opacity="0"/>`));
    s += `<rect class="lc-hit" x="${m.l}" y="0" width="${W - m.l - m.r}" height="${H}" fill="transparent"/></svg>`;
    CHARTS[gid] = { o, sx, sy, W, H };
    return `<div class="lc-wrap" style="position:relative">${s}<div class="lc-tip" hidden></div></div>`;
  }
  const CHARTS = {};
  function attachCharts(root) {
    root.querySelectorAll('svg.lc').forEach((svg) => {
      const c = CHARTS[svg.dataset.cid];
      if (!c) return;
      const tip = svg.parentElement.querySelector('.lc-tip');
      const xl = svg.querySelector('.lc-x'), dots = svg.querySelectorAll('.lc-dot');
      const hit = svg.querySelector('.lc-hit');
      // จุดอ้างอิงแกน X รวมจากทุกเส้น
      const xsAll = [...new Set(c.o.series.flatMap((s) => s.pts.map((p) => p.x)))].sort((a, b) => a - b);
      hit.addEventListener('pointermove', (e) => {
        const r = svg.getBoundingClientRect();
        const px = ((e.clientX - r.left) / r.width) * c.W;
        let best = xsAll[0], bd = Infinity;
        xsAll.forEach((x) => { const d = Math.abs(c.sx(x) - px); if (d < bd) { bd = d; best = x; } });
        xl.setAttribute('x1', c.sx(best)); xl.setAttribute('x2', c.sx(best)); xl.setAttribute('opacity', 0.3);
        let html = `<b>${(c.o.tipX || c.o.xFmt || String)(best)}</b>`, topY = c.H;
        c.o.series.forEach((s, i) => {
          const p = s.pts.find((q) => q.x === best);
          if (!p) { dots[i].setAttribute('opacity', 0); return; }
          dots[i].setAttribute('cx', c.sx(p.x)); dots[i].setAttribute('cy', c.sy(p.y)); dots[i].setAttribute('opacity', 1);
          topY = Math.min(topY, c.sy(p.y));
          html += `<br><i style="background:${s.color}"></i>${s.name}: ${(c.o.yTip || ((v) => f(v)))(p.y)}`;
        });
        tip.innerHTML = html; tip.hidden = false;
        tip.style.left = `${(c.sx(best) / c.W) * 100}%`;
        tip.style.top = `${(topY / c.H) * r.height}px`;
      });
      hit.addEventListener('pointerleave', () => {
        tip.hidden = true; xl.setAttribute('opacity', 0); dots.forEach((d) => d.setAttribute('opacity', 0));
      });
    });
  }

  RW.viz = {
    STATUS_COLORS, damStatus, damIcon, gateIcon, pumpIcon, stationIcon, warnIcon, plotIcon, riverIcon, flowIcon, hydroIcon, labelIcon,
    reservoirGauge, animateGauge, spillwayViz, gateViz, pumpViz, ring, animateRing, lineChart, attachCharts, f,
  };
})(window.RW);
