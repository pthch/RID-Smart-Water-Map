/* =========================================================================
 * data.js — ข้อมูลตัวอย่าง RID WaterMaps
 * -------------------------------------------------------------------------
 * ตำแหน่งอาคารเป็นค่าประมาณ ตัวเลขสถานการณ์น้ำใช้ทดสอบระบบ
 *   เมื่อเชื่อมระบบจริง ให้แทนที่ด้วยข้อมูลจาก API ของกรมชลประทาน
 * ========================================================================= */
window.RW = window.RW || {};

(function (RW) {
  // ---------- ตัวสุ่มแบบกำหนด seed (ข้อมูลเหมือนเดิมทุกครั้งที่เปิด) ----------
  function seeded(seed) {
    return () => {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rnd = seeded(2569);
  const r2 = (v, d = 2) => +v.toFixed(d);
  const HISTORY_DAYS = 30;

  /* ---------------------------------------------------------------------
   * เขื่อน / อ่างเก็บน้ำขนาดใหญ่
   * [id, ชื่อไทย, ชื่ออังกฤษ, lat, lng, ความจุ (ล้าน ลบ.ม.), % ปัจจุบัน, จังหวัด, สำนักงานชลประทาน]
   * ------------------------------------------------------------------- */
  const DAM_ROWS = [
    ['bhumibol', 'เขื่อนภูมิพล', 'Bhumibol Dam', 17.2427, 98.9722, 13462, 71, 'ตาก', 1],
    ['sirikit', 'เขื่อนสิริกิติ์', 'Sirikit Dam', 17.7636, 100.5617, 9510, 83, 'อุตรดิตถ์', 3],
    ['khwaenoi', 'เขื่อนแควน้อยบำรุงแดน', 'Khwae Noi Bamrung Daen Dam', 17.17, 100.45, 939, 88, 'พิษณุโลก', 3],
    ['maengat', 'เขื่อนแม่งัดสมบูรณ์ชล', 'Mae Ngat Somboon Chon Dam', 19.165, 99.04, 265, 76, 'เชียงใหม่', 1],
    ['maekuang', 'เขื่อนแม่กวงอุดมธารา', 'Mae Kuang Udom Thara Dam', 18.93, 99.13, 263, 64, 'เชียงใหม่', 1],
    ['kiewlom', 'เขื่อนกิ่วลม', 'Kiew Lom Dam', 18.53, 99.62, 106, 92, 'ลำปาง', 2],
    ['maemok', 'เขื่อนแม่มอก', 'Mae Mok Dam', 17.76, 99.40, 110, 47, 'ลำปาง', 2],
    ['pasak', 'เขื่อนป่าสักชลสิทธิ์', 'Pa Sak Jolasid Dam', 14.865, 101.075, 960, 95, 'ลพบุรี', 10],
    ['srinagarind', 'เขื่อนศรีนครินทร์', 'Srinagarind Dam', 14.41, 99.13, 17745, 78, 'กาญจนบุรี', 13],
    ['vajiralongkorn', 'เขื่อนวชิราลงกรณ', 'Vajiralongkorn Dam', 14.80, 98.60, 8860, 81, 'กาญจนบุรี', 13],
    ['khundan', 'เขื่อนขุนด่านปราการชล', 'Khun Dan Prakan Chon Dam', 14.318, 101.318, 224, 102, 'นครนายก', 11],
    ['ubolratana', 'เขื่อนอุบลรัตน์', 'Ubol Ratana Dam', 16.775, 102.618, 2431, 58, 'ขอนแก่น', 6],
    ['lampao', 'เขื่อนลำปาว', 'Lam Pao Dam', 16.60, 103.45, 1980, 86, 'กาฬสินธุ์', 6],
    ['sirindhorn', 'เขื่อนสิรินธร', 'Sirindhorn Dam', 15.205, 105.43, 1966, 62, 'อุบลราชธานี', 7],
    ['chulabhorn', 'เขื่อนจุฬาภรณ์', 'Chulabhorn Dam', 16.53, 101.65, 164, 41, 'ชัยภูมิ', 6],
    ['namoon', 'เขื่อนน้ำอูน', 'Nam Oon Dam', 17.30, 103.75, 520, 73, 'สกลนคร', 5],
    ['lamtakhong', 'เขื่อนลำตะคอง', 'Lam Takhong Dam', 14.87, 101.57, 314, 27, 'นครราชสีมา', 8],
    ['lamphraphloeng', 'เขื่อนลำพระเพลิง', 'Lam Phra Phloeng Dam', 14.60, 101.84, 152, 35, 'นครราชสีมา', 8],
    ['munbon', 'เขื่อนมูลบน', 'Mun Bon Dam', 14.45, 102.13, 141, 22, 'นครราชสีมา', 8],
    ['huailuang', 'เขื่อนห้วยหลวง', 'Huai Luang Dam', 17.43, 102.67, 136, 69, 'อุดรธานี', 5],
    ['lamnangrong', 'เขื่อนลำนางรอง', 'Lam Nang Rong Dam', 14.33, 102.75, 121, 55, 'บุรีรัมย์', 8],
    ['naruebodin', 'เขื่อนนฤบดินทรจินดา', 'Naruebodindrachinda Dam', 14.07, 101.98, 295, 90, 'ปราจีนบุรี', 9],
    ['khlongsiyat', 'เขื่อนคลองสียัด', 'Khlong Si Yat Dam', 13.32, 101.58, 420, 49, 'ฉะเชิงเทรา', 9],
    ['bangphra', 'อ่างเก็บน้ำบางพระ', 'Bang Phra Reservoir', 13.21, 101.00, 117, 38, 'ชลบุรี', 9],
    ['prasae', 'เขื่อนประแสร์', 'Prasae Dam', 12.86, 101.67, 295, 66, 'ระยอง', 9],
    ['kaengkrachan', 'เขื่อนแก่งกระจาน', 'Kaeng Krachan Dam', 12.92, 99.63, 710, 57, 'เพชรบุรี', 14],
    ['pranburi', 'เขื่อนปราณบุรี', 'Pran Buri Dam', 12.45, 99.80, 445, 44, 'ประจวบคีรีขันธ์', 14],
    ['ratchaprapha', 'เขื่อนรัชชประภา', 'Ratchaprapha Dam', 8.97, 98.81, 5639, 74, 'สุราษฎร์ธานี', 15],
    ['banglang', 'เขื่อนบางลาง', 'Bang Lang Dam', 6.15, 101.27, 1454, 97, 'ยะลา', 17],
  ];

  const dams = DAM_ROWS.map(([id, th, en, lat, lng, cap, pct, prov, office]) => {
    // ประวัติย้อนหลัง 30 วัน (% ความจุ)
    const trend = (rnd() - 0.35) * 14;
    const hist = [];
    for (let d = 0; d < HISTORY_DAYS; d++) {
      const k = d / (HISTORY_DAYS - 1);
      hist.push(r2(Math.max(5, pct - trend * (1 - k) + Math.sin(d * 0.7 + rnd() * 2) * 0.8), 1));
    }
    hist[HISTORY_DAYS - 1] = pct;
    const gatesTotal = cap > 5000 ? 4 : cap > 900 ? 3 : 2;
    const spillOpen = pct >= 100 ? gatesTotal : pct >= 92 ? Math.max(1, gatesTotal - 2) : 0;
    const base = Math.sqrt(cap) * 0.9;
    return {
      id, kind: 'dam', name: th, name_en: en, lat, lng, province: prov,
      office: `สำนักงานชลประทานที่ ${office}`, office_en: `Regional Irrigation Office ${office}`,
      capacity: cap, hist,
      spill: {
        type: 'แบบบานโค้ง (Radial Gate)', type_en: 'Radial gate',
        total: gatesTotal, open: spillOpen,
        lift: spillOpen ? r2(0.5 + rnd() * 1.5, 2) : 0,
      },
      riverOutlet: r2(base * (0.25 + rnd() * 0.3), 1),
      irrigationOutlet: r2(base * (0.35 + rnd() * 0.4), 1),
      inflow: r2(base * (0.6 + rnd() * 0.9), 1),
    };
  });

  /* ---------------------------------------------------------------------
   * ประตูระบายน้ำ / อาคารบังคับน้ำ
   * ------------------------------------------------------------------- */
  const gates = [
    { id: 'g-chaophraya', name: 'เขื่อนเจ้าพระยา (ประตูระบายน้ำ)', name_en: 'Chao Phraya Barrage', lat: 15.155, lng: 100.182, province: 'ชัยนาท', up: 16.45, down: 14.92, total: 16, open: 12, lift: 2.4, q: 1350 },
    { id: 'g-ramahok', name: 'เขื่อนพระรามหก', name_en: 'Rama VI Barrage', lat: 14.553, lng: 100.735, province: 'พระนครศรีอยุธยา', up: 7.85, down: 5.10, total: 6, open: 4, lift: 1.8, q: 420 },
    { id: 'g-ekathotsarot', name: 'ประตูระบายน้ำพระเอกาทศรถ', name_en: 'Phra Ekathotsarot Regulator', lat: 14.090, lng: 100.905, province: 'ปทุมธานี', up: 2.35, down: 1.62, total: 3, open: 2, lift: 1.2, q: 38.5 },
    { id: 'g-chulalongkorn', name: 'ปตร.จุฬาลงกรณ์ (ปากคลองรังสิต)', name_en: 'Chulalongkorn Regulator', lat: 14.020, lng: 100.548, province: 'ปทุมธานี', up: 1.95, down: 1.45, total: 4, open: 3, lift: 1.5, q: 62.0 },
    { id: 'g-khlong7', name: 'ปตร.ปากคลอง 7', name_en: 'Khlong 7 Regulator', lat: 14.052, lng: 100.760, province: 'ปทุมธานี', up: 2.05, down: 1.71, total: 2, open: 1, lift: 0.8, q: 12.4 },
    { id: 'g-khlong10', name: 'ปตร.ปากคลอง 10', name_en: 'Khlong 10 Regulator', lat: 14.066, lng: 100.836, province: 'ปทุมธานี', up: 2.12, down: 1.88, total: 2, open: 2, lift: 1.0, q: 16.8 },
    { id: 'g-khlong13', name: 'ปตร.ปากคลอง 13', name_en: 'Khlong 13 Regulator', lat: 14.078, lng: 100.873, province: 'ปทุมธานี', up: 2.20, down: 1.95, total: 2, open: 1, lift: 0.6, q: 8.6 },
    { id: 'g-manorom', name: 'ประตูระบายน้ำมโนรมย์', name_en: 'Manorom Regulator', lat: 15.32, lng: 100.13, province: 'ชัยนาท', up: 17.10, down: 15.60, total: 3, open: 2, lift: 1.4, q: 95 },
    { id: 'g-uthaithani', name: 'ประตูระบายน้ำพลเทพ', name_en: 'Phonlathep Regulator', lat: 15.14, lng: 100.16, province: 'ชัยนาท', up: 16.20, down: 15.10, total: 3, open: 3, lift: 1.9, q: 140 },
    { id: 'g-bangpakong', name: 'เขื่อนทดน้ำบางปะกง', name_en: 'Bang Pakong Diversion Dam', lat: 13.79, lng: 101.08, province: 'ฉะเชิงเทรา', up: 1.20, down: 0.85, total: 10, open: 6, lift: 2.0, q: 260 },
  ];

  /* ---------------------------------------------------------------------
   * สถานีสูบน้ำ
   * ------------------------------------------------------------------- */
  const pumps = [
    { id: 'p-rangsit', name: 'สถานีสูบน้ำปากคลองรังสิต', name_en: 'Rangsit Canal Pumping Station', lat: 14.017, lng: 100.540, province: 'ปทุมธานี', units: [{ rate: 3.0, on: true }, { rate: 3.0, on: true }, { rate: 3.0, on: false }] },
    { id: 'p-khlong13', name: 'สถานีสูบน้ำคลอง 13', name_en: 'Khlong 13 Pumping Station', lat: 14.083, lng: 100.876, province: 'ปทุมธานี', units: [{ rate: 1.5, on: true }, { rate: 1.5, on: true }] },
    { id: 'p-ongkharak', name: 'สถานีสูบน้ำองครักษ์', name_en: 'Ongkharak Pumping Station', lat: 14.115, lng: 101.005, province: 'นครนายก', units: [{ rate: 2.0, on: true }, { rate: 2.0, on: false }] },
    { id: 'p-bangkhla', name: 'สถานีสูบน้ำบางคล้า', name_en: 'Bang Khla Pumping Station', lat: 13.725, lng: 101.205, province: 'ฉะเชิงเทรา', units: [{ rate: 6.0, on: true }, { rate: 6.0, on: true }, { rate: 6.0, on: true }, { rate: 6.0, on: false }] },
    { id: 'p-samutprakan', name: 'สถานีสูบน้ำชายทะเล สมุทรปราการ', name_en: 'Samut Prakan Coastal Pumping Station', lat: 13.555, lng: 100.700, province: 'สมุทรปราการ', units: [{ rate: 12.0, on: true }, { rate: 12.0, on: true }, { rate: 12.0, on: false }] },
  ];

  /* ---------------------------------------------------------------------
   * สถานีตรวจวัดน้ำ (ระดับตลิ่ง = bank, ม.รทก.)
   * ------------------------------------------------------------------- */
  const stations = [
    { id: 's-c2', code: 'C.2', name: 'สถานี C.2 นครสวรรค์', name_en: 'C.2 Nakhon Sawan', lat: 15.70, lng: 100.115, province: 'นครสวรรค์', level: 23.65, bank: 26.20, q: 1820, rate: 4.2, travel: 22, mass: 157 },
    { id: 's-c13', code: 'C.13', name: 'สถานี C.13 ท้ายเขื่อนเจ้าพระยา', name_en: 'C.13 Chao Phraya Dam (downstream)', lat: 15.150, lng: 100.185, province: 'ชัยนาท', level: 14.92, bank: 17.40, q: 1350, rate: 2.8, travel: 18, mass: 117 },
    { id: 's-c3', code: 'C.3', name: 'สถานี C.3 สิงห์บุรี', name_en: 'C.3 Sing Buri', lat: 14.89, lng: 100.40, province: 'สิงห์บุรี', level: 11.40, bank: 13.10, q: 1280, rate: 1.9, travel: 14, mass: 64 },
    { id: 's-c29a', code: 'C.29A', name: 'สถานี C.29A บางไทร', name_en: 'C.29A Bang Sai', lat: 14.195, lng: 100.505, province: 'พระนครศรีอยุธยา', level: 4.38, bank: 4.85, q: 2150, rate: 3.5, travel: 10, mass: 77 },
    { id: 's-p1', code: 'P.1', name: 'สถานี P.1 สะพานนวรัฐ', name_en: 'P.1 Nawarat Bridge', lat: 18.787, lng: 99.004, province: 'เชียงใหม่', level: 302.10, bank: 304.70, q: 145, rate: -1.2, travel: 0, mass: 0 },
    { id: 's-n1', code: 'N.1', name: 'สถานี N.1 น่าน', name_en: 'N.1 Nan', lat: 18.78, lng: 100.78, province: 'น่าน', level: 196.30, bank: 199.80, q: 260, rate: -0.6, travel: 0, mass: 0 },
    { id: 's-y1c', code: 'Y.1C', name: 'สถานี Y.1C แพร่', name_en: 'Y.1C Phrae', lat: 18.13, lng: 100.15, province: 'แพร่', level: 155.20, bank: 157.30, q: 310, rate: 0.8, travel: 30, mass: 34 },
    { id: 's-m7', code: 'M.7', name: 'สถานี M.7 อุบลราชธานี', name_en: 'M.7 Ubon Ratchathani', lat: 15.23, lng: 104.86, province: 'อุบลราชธานี', level: 110.85, bank: 112.00, q: 2480, rate: 5.6, travel: 16, mass: 143 },
    { id: 's-e20a', code: 'E.20A', name: 'สถานี E.20A ยโสธร', name_en: 'E.20A Yasothon', lat: 15.79, lng: 104.14, province: 'ยโสธร', level: 117.30, bank: 120.50, q: 890, rate: 1.1, travel: 40, mass: 128 },
    { id: 's-ny1b', code: 'NY.1B', name: 'สถานี NY.1B นครนายก', name_en: 'NY.1B Nakhon Nayok', lat: 14.205, lng: 101.215, province: 'นครนายก', level: 8.42, bank: 9.20, q: 96, rate: 6.4, travel: 9, mass: 3.1 },
    { id: 's-kgt3', code: 'KGT.3', name: 'สถานี KGT.3 ปราจีนบุรี', name_en: 'KGT.3 Prachin Buri', lat: 14.05, lng: 101.37, province: 'ปราจีนบุรี', level: 5.95, bank: 6.80, q: 410, rate: 3.0, travel: 12, mass: 17.7 },
    { id: 's-bpk', code: 'BPK.1', name: 'สถานีบางปะกอง (บางแตน)', name_en: 'BPK.1 Bang Taen', lat: 13.985, lng: 101.195, province: 'ปราจีนบุรี', level: 3.10, bank: 4.20, q: 505, rate: 2.2, travel: 20, mass: 36.4 },
  ];
  // ประวัติ 48 ชม. + คาดการณ์ 24 ชม.
  stations.forEach((s) => {
    s.watchMargin = ({ 's-c29a': .45, 's-ny1b': .7, 's-kgt3': .55, 's-m7': .8 })[s.id] ?? .6;
    const obs = [];
    for (let h = -48; h <= 0; h++) {
      const k = (h + 48) / 48;
      obs.push({ h, v: r2(s.level - (s.rate / 100) * (-h) + Math.sin(h / 5) * 0.03 * (1 - k)) });
    }
    obs[obs.length - 1].v = s.level;
    s.obs = obs;
    const fc = [];
    for (let h = 0; h <= 24; h++) {
      const decay = Math.exp(-h / 18);
      fc.push({ h, v: r2(s.level + (s.rate / 100) * h * decay) });
    }
    s.fc = fc;
    s.forecastLevel = fc[fc.length - 1].v;
  });

  /* ---------------------------------------------------------------------
   * แม่น้ำสายหลัก (เส้นโดยประมาณ ใช้แสดงทิศการไหลที่ระดับซูมประเทศ/ภาค)
   * ------------------------------------------------------------------- */
  const rivers = [
    { id: 'ping', name: 'แม่น้ำปิง', name_en: 'Ping River', q: 520, line: [[18.95, 98.95], [18.79, 99.0], [18.5, 98.95], [18.19, 98.62], [17.8, 98.75], [17.24, 98.97], [16.87, 99.12], [16.48, 99.52], [16.1, 99.85], [15.7, 100.12]] },
    { id: 'wang', name: 'แม่น้ำวัง', name_en: 'Wang River', q: 140, line: [[18.6, 99.6], [18.29, 99.49], [17.95, 99.4], [17.4, 99.2], [17.04, 99.08]] },
    { id: 'yom', name: 'แม่น้ำยม', name_en: 'Yom River', q: 310, line: [[18.6, 100.1], [18.14, 100.14], [17.43, 99.79], [17.0, 99.83], [16.5, 100.05], [16.1, 100.25], [15.89, 100.3]] },
    { id: 'nan', name: 'แม่น้ำน่าน', name_en: 'Nan River', q: 760, line: [[18.78, 100.78], [18.2, 100.75], [17.76, 100.56], [17.62, 100.1], [17.2, 100.2], [16.82, 100.26], [16.44, 100.35], [15.89, 100.3], [15.7, 100.14]] },
    { id: 'chaophraya', name: 'แม่น้ำเจ้าพระยา', name_en: 'Chao Phraya River', q: 1820, line: [[15.7, 100.13], [15.18, 100.17], [14.89, 100.4], [14.59, 100.45], [14.35, 100.57], [14.02, 100.53], [13.86, 100.5], [13.75, 100.49], [13.55, 100.58], [13.5, 100.6]] },
    { id: 'pasak', name: 'แม่น้ำป่าสัก', name_en: 'Pa Sak River', q: 380, line: [[16.78, 101.24], [16.42, 101.16], [15.8, 101.1], [15.3, 101.05], [14.86, 101.07], [14.53, 100.92], [14.35, 100.58]] },
    { id: 'thachin', name: 'แม่น้ำท่าจีน', name_en: 'Tha Chin River', q: 320, line: [[15.18, 100.17], [14.8, 100.1], [14.47, 100.12], [14.1, 100.13], [13.82, 100.2], [13.55, 100.27]] },
    { id: 'mun', name: 'แม่น้ำมูล', name_en: 'Mun River', q: 2480, line: [[14.6, 101.9], [14.97, 102.1], [15.22, 102.49], [15.15, 103.1], [15.29, 103.3], [15.13, 103.9], [15.12, 104.33], [15.23, 104.86], [15.32, 105.5]] },
    { id: 'chi', name: 'แม่น้ำชี', name_en: 'Chi River', q: 890, line: [[15.8, 101.9], [16.1, 102.3], [16.4, 102.8], [16.18, 103.3], [16.05, 103.65], [15.79, 104.14], [15.27, 104.6]] },
    { id: 'mekong', name: 'แม่น้ำโขง', name_en: 'Mekong River', q: 9800, line: [[20.27, 100.08], [19.9, 101.0], [19.89, 102.13], [19.0, 101.9], [18.2, 101.6], [17.9, 101.67], [17.88, 102.74], [18.36, 103.65], [17.4, 104.78], [16.54, 104.73], [15.9, 105.4], [15.32, 105.5], [14.9, 105.8]] },
    { id: 'prachin', name: 'แม่น้ำปราจีนบุรี', name_en: 'Prachin Buri River', q: 410, line: [[13.98, 101.71], [14.05, 101.37], [13.985, 101.195]] },
    { id: 'nakhonnayok', name: 'แม่น้ำนครนายก', name_en: 'Nakhon Nayok River', q: 96, line: [[14.318, 101.318], [14.205, 101.215], [14.12, 101.17], [13.985, 101.195]] },
    { id: 'bangpakong', name: 'แม่น้ำบางปะกง', name_en: 'Bang Pakong River', q: 505, line: [[13.985, 101.195], [13.79, 101.08], [13.69, 101.07], [13.48, 100.95]] },
  ];

  // ป้ายอัตราการไหล (วางตามสัดส่วนความยาวของแม่น้ำ)
  const flowTags = [
    ['ping', 0.55, 520], ['nan', 0.6, 760], ['yom', 0.55, 310], ['chaophraya', 0.25, 1820],
    ['chaophraya', 0.62, 2150], ['pasak', 0.7, 380], ['mun', 0.7, 2480], ['chi', 0.6, 890],
    ['prachin', 0.6, 410], ['nakhonnayok', 0.55, 96], ['bangpakong', 0.35, 505], ['thachin', 0.5, 320],
  ];

  /* ---------------------------------------------------------------------
   * แปลงเกษตรตัวอย่าง (ทุ่งรังสิต — แปลงยาวแนวเหนือ-ใต้)
   * ------------------------------------------------------------------- */
  const FIRST = ['สมชาย', 'สมศรี', 'บุญมี', 'มาลี', 'ประเสริฐ', 'วันเพ็ญ', 'สุรชัย', 'ทองใบ', 'อำนวย', 'จันทร์เพ็ญ', 'ชูชาติ', 'สายสุนีย์'];
  const LAST = ['ใจดี', 'รุ่งเรือง', 'ศรีสุข', 'ทองคำ', 'แก้วมณี', 'บุญมา', 'สุขสวัสดิ์', 'พึ่งน้ำ'];
  const CROPS = [['ข้าวนาปรัง', 'Off-season rice', 12], ['ข้าวนาปี', 'Rice', 10], ['พืชผัก', 'Vegetables', 8], ['ไม้ผล', 'Orchard', 6]];
  const plots = [];
  (function () {
    const lat0 = 14.0705, lng0 = 100.795, w = 0.0016, h = 0.0085;
    let n = 101;
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 14; col++) {
        if (rnd() < 0.08) continue;
        const x = lng0 + col * (w + 0.00012) + (rnd() - 0.5) * 0.0002;
        const y = lat0 - row * (h + 0.0006);
        const c = CROPS[Math.floor(rnd() * CROPS.length)];
        const rai = Math.round(18 + rnd() * 14);
        const riskV = rnd();
        plots.push({
          id: `plot-${n}`, kind: 'plot', no: n,
          name: `แปลงที่ ${n}`, name_en: `Plot ${n}`,
          lat: y - h / 2, lng: x + w / 2,
          polygon: [[y, x], [y, x + w], [y - h, x + w + 0.0001], [y - h, x + 0.0001]],
          member: `${FIRST[Math.floor(rnd() * FIRST.length)]} ${LAST[Math.floor(rnd() * LAST.length)]}`,
          memberId: `WUG-${String(4000 + n)}`,
          crop: c[0], crop_en: c[1], rai,
          demand: Math.round(c[2] * rai), // ลบ.ม./วัน
          risk: riskV < 0.6 ? 'safe' : riskV < 0.85 ? 'watch' : 'high',
        });
        n++;
      }
    }
  })();

  /* ---------------------------------------------------------------------
   * จังหวัด / อำเภอ / ตำบล (ชุดตัวอย่าง — พิกัดศูนย์กลางโดยประมาณ)
   * ------------------------------------------------------------------- */
  const provinces = RW.administrativeAreas.map(([code,th,en,c,bounds,children])=>({
    code,th,en,c,bounds,d:children.map(([code,th,en,c,bounds,children])=>({
      code,th,en,c,bounds,s:children.map(([code,th,en,lat,lon,shared])=>({code,th,en,c:[lat,lon],shared}))
    }))
  }));

  /* ---------------------------------------------------------------------
   * เรื่องร้องเรียนตัวอย่าง
   * ------------------------------------------------------------------- */
  const H = 3600e3, now = Date.now();
  const complaints = [
    { id: 'RC-2569-0012', lat: 14.074, lng: 100.812, title: 'คันคลองรังสิตทรุดตัว', detail: 'คันคลองฝั่งเหนือทรุดยาวประมาณ 15 เมตร น้ำซึมเข้าแปลงนา', reporter: 'บุญมี ศรีสุข', office: 'สำนักงานชลประทานที่ 11', status: 2, createdAt: new Date(now - 30 * H).toISOString(), photo: null },
    { id: 'RC-2569-0015', lat: 14.215, lng: 101.19, title: 'ผักตบชวากีดขวางทางน้ำ', detail: 'ผักตบชวาสะสมหน้าประตูระบายน้ำ ทำให้น้ำไหลช้า', reporter: 'มาลี ทองคำ', office: 'สำนักงานชลประทานที่ 11', status: 1, createdAt: new Date(now - 7 * H).toISOString(), photo: null },
    { id: 'RC-2569-0009', lat: 15.69, lng: 100.16, title: 'น้ำเอ่อล้นตลิ่งบริเวณชุมชน', detail: 'ระดับน้ำสูงขึ้นต่อเนื่อง ขอให้ติดตั้งเครื่องสูบน้ำ', reporter: 'ประเสริฐ บุญมา', office: 'สำนักงานชลประทานที่ 3', status: 3, createdAt: new Date(now - 96 * H).toISOString(), photo: null },
  ];

  Object.assign(RW, { dams, gates, pumps, stations, rivers, flowTags, plots, provinces, complaints, HISTORY_DAYS });
})(window.RW);
