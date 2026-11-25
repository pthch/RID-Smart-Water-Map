/* =========================================================================
 * i18n.js — ข้อความ 2 ภาษา (TH / EN)
 * ========================================================================= */
window.RW = window.RW || {};

(function (RW) {
  const D = {
    th: {
      appSub: 'ระบบแผนที่ติดตามสถานการณ์น้ำ',
      province: 'กรุณาเลือกจังหวัด', district: 'กรุณาเลือกอำเภอ', subdistrict: 'กรุณาเลือกตำบล',
      search: 'ค้นหา', login: 'เข้าสู่ระบบ / ลงทะเบียน', placeSearch: 'เลือกสถานที่สำคัญ',
      home: 'กลับหน้าหลัก', basemap: 'แผนที่ฐาน', layers: 'ชั้นข้อมูล', menu: 'เมนู',
      zoomIn: 'ขยาย', zoomOut: 'ย่อ', more: 'เพิ่มเติม',
      noDistrict: 'ไม่มีข้อมูลตัวอย่าง',
      // basemaps
      bmSat: 'ดาวเทียม', bmTopo: 'ภูมิประเทศ', bmStreet: 'แผนที่ถนน', bmDark: 'โหมดกลางคืน',
      // layers
      lyDam: 'เขื่อน / อ่างเก็บน้ำ', lyGate: 'ประตูระบายน้ำ', lyPump: 'สถานีสูบน้ำ', lyStation: 'สถานีตรวจวัดน้ำ',
      lyRiver: 'ทิศทางการไหลของแม่น้ำ', lyFlow: 'ป้ายอัตราการไหล', lyHydro: 'ลำน้ำและคลอง (ละเอียด)',
      lyComplaint: 'เรื่องร้องเรียน', lyPlot: 'แปลงสมาชิกผู้ใช้น้ำ', lyLabels: 'ชื่อสถานที่',
      // dam status
      st0: 'น้ำน้อยวิกฤต', st1: 'น้ำน้อย', st2: 'น้ำปกติ', st3: 'น้ำมาก', st4: 'น้ำล้นอ่าง',
      // dam popup
      capacity: 'ความจุอ่างฯ', storage: 'ปริมาณน้ำกักเก็บปัจจุบัน', change: 'ปริมาณน้ำในอ่างเพิ่มขึ้น / ลดลง',
      perDay: '/วัน', mcm: 'ล้าน ลบ.ม.', cms: 'cms', m: 'เมตร', msl: 'ม.รทก.',
      spillway: 'Spillway', gatesOpen: 'เปิดบานระบายจำนวน', channels: 'ช่อง', lift: 'ยกบานสูง',
      rate: 'อัตราการระบาย', riverOutlet: 'River Outlet', irrOutlet: 'Irrigation Outlet',
      totalRelease: 'รวมอัตราการระบายทั้งหมด', inflow: 'น้ำไหลเข้าอ่าง', trend30: 'ปริมาณน้ำย้อนหลัง 30 วัน',
      closed: 'ปิดบาน', of: 'จาก',
      // gate
      upLevel: 'ระดับน้ำเหนือประตู', downLevel: 'ระดับน้ำท้ายประตู', gateStatus: 'สถานะบานระบาย',
      gateOpenN: 'เปิดประตูระบายน้ำจำนวน', bays: 'บาน', flowThrough: 'ปริมาณน้ำไหลผ่านประตู', head: 'ผลต่างระดับน้ำ',
      // pump
      pumpStation: 'สถานีสูบน้ำ', pumpN: 'เครื่องสูบน้ำที่', pumpRate: 'อัตราการสูบน้ำ', pumpTotal: 'รวมอัตราการสูบน้ำ',
      running: 'กำลังทำงาน', stopped: 'หยุดเดินเครื่อง',
      // station
      stationT: 'สถานีตรวจวัดน้ำ', levelNow: 'ระดับน้ำปัจจุบัน', flowRate: 'อัตราการไหลน้ำ', riseRate: 'อัตราการเพิ่ม / ลดระดับน้ำ',
      cmh: 'ซม./ชม.', forecastT: 'คาดการณ์สถานการณ์น้ำ', mass: 'มวลน้ำปริมาณ', travel: 'ระยะเวลาเดินทาง', hr: 'ชม.',
      fcLevel: 'ระดับน้ำคาดการณ์', bank: 'ระดับตลิ่ง', arriveIn: 'มวลน้ำจะมาถึงใน', observed: 'ตรวจวัด', forecast: 'คาดการณ์',
      lvNormal: 'ปกติ', lvWatch: 'เฝ้าระวัง', lvCrit: 'วิกฤต', noForecast: 'ไม่มีมวลน้ำเคลื่อนตัวเข้ามา',
      mcmShort: 'ล้าน ลบ.ม.',
      // flow
      flowLabel: 'อัตราการไหล',
      // complaint
      complaintForm: 'แบบฟอร์มร้องเรียน', cTitle: 'หัวข้อ', cDetail: 'รายละเอียด', cOffice: 'ผู้รับผิดชอบ',
      cStatus: 'สถานะการดำเนินงาน', cReporter: 'ผู้แจ้ง', cPhoto: 'แนบรูปภาพ (คลิกหรือลากไฟล์มาวาง)', cPick: 'คลิกบนแผนที่เพื่อปักหมุดตำแหน่ง',
      cs0: 'รับเรื่อง', cs1: 'ตรวจสอบพื้นที่', cs2: 'กำลังซ่อมแซม', cs3: 'ดำเนินการเสร็จสิ้น',
      submit: 'ส่งเรื่องร้องเรียน', cancel: 'ยกเลิก', report: 'แจ้งเรื่องร้องเรียน', sent: 'ส่งเรื่องเรียบร้อย เลขที่',
      required: 'กรุณากรอกหัวข้อและรายละเอียด', location: 'ตำแหน่ง', change2: 'เปลี่ยน',
      // plot
      plotT: 'แปลงที่', member: 'สมาชิกผู้ใช้น้ำชลประทาน', memberName: 'ชื่อสมาชิก', demand: 'ความต้องการใช้น้ำ',
      floodRisk: 'ความเสี่ยงทางอุทกภัย', safe: 'ปลอดภัย', watch: 'เฝ้าระวัง', high: 'เสี่ยงสูง', crop: 'พืชที่ปลูก', area: 'พื้นที่', rai: 'ไร่',
      m3day: 'ลบ.ม./วัน', memberId: 'รหัสสมาชิก',
      // overview
      overview: 'ภาพรวมสถานการณ์น้ำ', totalStorage: 'ปริมาณน้ำในเขื่อนขนาดใหญ่', damsCount: 'เขื่อน', ofCapacity: 'ของความจุ',
      byStatus: 'จำแนกตามสถานะ', alerts: 'แจ้งเตือนล่าสุด', damList: 'เขื่อนทั้งหมด (เรียงตาม % ความจุ)',
      timeMachine: 'ย้อนดูสถานการณ์', today: 'วันนี้', play: 'เล่น', pause: 'หยุด',
      locate: 'ตำแหน่งของฉัน', fullscreen: 'เต็มจอ', legend: 'สัญลักษณ์', share: 'คัดลอกลิงก์มุมมองนี้', copied: 'คัดลอกลิงก์แล้ว',
      tour: 'ทัวร์ชมระบบ', mockNote: 'ใช้ตัวเลขเพื่อทดสอบระบบ ตำแหน่งสถานีและอาคารเป็นค่าประมาณ',
      updated: 'อัปเดต', back: 'ย้อนกลับ', zoomTo: 'ซูมไปที่ตำแหน่ง', noResult: 'ไม่พบสถานที่',
      loginT: 'เข้าสู่ระบบ', registerT: 'ลงทะเบียน', email: 'อีเมล', password: 'รหัสผ่าน', fullname: 'ชื่อ - นามสกุล',
      loginMock: 'ระบบตัวอย่าง: ยังไม่ได้เชื่อมต่อระบบสมาชิกจริง', logout: 'ออกจากระบบ', hello: 'สวัสดี',
      geoFail: 'ไม่สามารถระบุตำแหน่งได้', zoomPlots: 'ซูมเข้าเพื่อดูแปลงสมาชิก', critical: 'วิกฤต',
      ticker1: 'ระดับน้ำเพิ่มขึ้น', ticker2: 'ปริมาณน้ำเกินความจุ', ticker3: 'ปริมาณน้ำน้อยวิกฤต',
      date: 'วันที่',
    },
    en: {
      appSub: 'Water situation monitoring map',
      province: 'Select province', district: 'Select district', subdistrict: 'Select sub-district',
      search: 'Search', login: 'Sign in / Register', placeSearch: 'Find a key location',
      home: 'Home', basemap: 'Basemap', layers: 'Layers', menu: 'Menu',
      zoomIn: 'Zoom in', zoomOut: 'Zoom out', more: 'More',
      noDistrict: 'No sample data',
      bmSat: 'Satellite', bmTopo: 'Terrain', bmStreet: 'Streets', bmDark: 'Night',
      lyDam: 'Dams / reservoirs', lyGate: 'Regulators', lyPump: 'Pumping stations', lyStation: 'Gauging stations',
      lyRiver: 'River flow direction', lyFlow: 'Flow-rate tags', lyHydro: 'Rivers & canals (detailed)',
      lyComplaint: 'Complaints', lyPlot: 'Water-user plots', lyLabels: 'Place names',
      st0: 'Critically low', st1: 'Low', st2: 'Normal', st3: 'High', st4: 'Overflowing',
      capacity: 'Reservoir capacity', storage: 'Current storage', change: 'Storage change',
      perDay: '/day', mcm: 'MCM', cms: 'cms', m: 'm', msl: 'm MSL',
      spillway: 'Spillway', gatesOpen: 'Gates open', channels: 'bays', lift: 'Gate lift',
      rate: 'Discharge', riverOutlet: 'River Outlet', irrOutlet: 'Irrigation Outlet',
      totalRelease: 'Total discharge', inflow: 'Inflow', trend30: 'Storage, last 30 days',
      closed: 'Closed', of: 'of',
      upLevel: 'Upstream water level', downLevel: 'Downstream water level', gateStatus: 'Gate status',
      gateOpenN: 'Gates open', bays: 'bays', flowThrough: 'Flow through gate', head: 'Head difference',
      pumpStation: 'Pumping station', pumpN: 'Pump', pumpRate: 'Pumping rate', pumpTotal: 'Total pumping rate',
      running: 'Running', stopped: 'Stopped',
      stationT: 'Gauging station', levelNow: 'Current water level', flowRate: 'Flow rate', riseRate: 'Rise / fall rate',
      cmh: 'cm/h', forecastT: 'Water forecast', mass: 'Water mass', travel: 'Travel time', hr: 'h',
      fcLevel: 'Forecast level', bank: 'Bank level', arriveIn: 'Water mass arrives in', observed: 'Observed', forecast: 'Forecast',
      lvNormal: 'Normal', lvWatch: 'Watch', lvCrit: 'Critical', noForecast: 'No incoming water mass',
      mcmShort: 'MCM',
      flowLabel: 'Flow',
      complaintForm: 'Complaint form', cTitle: 'Subject', cDetail: 'Details', cOffice: 'Responsible office',
      cStatus: 'Progress', cReporter: 'Reported by', cPhoto: 'Attach a photo (click or drop a file)', cPick: 'Click on the map to drop a pin',
      cs0: 'Received', cs1: 'Site inspection', cs2: 'Repairing', cs3: 'Completed',
      submit: 'Send complaint', cancel: 'Cancel', report: 'Report an issue', sent: 'Complaint sent, ref.',
      required: 'Please fill in the subject and details', location: 'Location', change2: 'Change',
      plotT: 'Plot', member: 'Irrigation water user', memberName: 'Member', demand: 'Water demand',
      floodRisk: 'Flood risk', safe: 'Safe', watch: 'Watch', high: 'High', crop: 'Crop', area: 'Area', rai: 'rai',
      m3day: 'm³/day', memberId: 'Member ID',
      overview: 'Water situation overview', totalStorage: 'Storage in large dams', damsCount: 'dams', ofCapacity: 'of capacity',
      byStatus: 'By status', alerts: 'Latest alerts', damList: 'All dams (by % capacity)',
      timeMachine: 'Look back', today: 'Today', play: 'Play', pause: 'Pause',
      locate: 'My location', fullscreen: 'Full screen', legend: 'Legend', share: 'Copy link to this view', copied: 'Link copied',
      tour: 'Take a tour', mockNote: 'Water figures are for testing. Station and structure locations are approximate.',
      updated: 'Updated', back: 'Back', zoomTo: 'Zoom to', noResult: 'No places found',
      loginT: 'Sign in', registerT: 'Register', email: 'Email', password: 'Password', fullname: 'Full name',
      loginMock: 'Demo only: no real account system is connected', logout: 'Sign out', hello: 'Hi',
      geoFail: 'Could not get your location', zoomPlots: 'Zoom in to see member plots', critical: 'Critical',
      ticker1: 'water level rising', ticker2: 'storage above capacity', ticker3: 'critically low storage',
      date: 'Date',
    },
  };

  let lang = 'th';
  try { lang = localStorage.getItem('rw.lang') || 'th'; } catch (e) { /* ignore */ }

  RW.i18n = {
    get lang() { return lang; },
    set(l) {
      lang = l;
      try { localStorage.setItem('rw.lang', l); } catch (e) { /* ignore */ }
      document.documentElement.lang = l;
      document.querySelectorAll('[data-i18n]').forEach((el) => (el.textContent = RW.t(el.dataset.i18n)));
      document.querySelectorAll('[data-i18n-ph]').forEach((el) => (el.placeholder = RW.t(el.dataset.i18nPh)));
      document.querySelectorAll('[data-i18n-title]').forEach((el) => {
        el.title = RW.t(el.dataset.i18nTitle);
        el.setAttribute('aria-label', el.title);
      });
    },
  };
  RW.t = (k) => D[lang][k] ?? D.th[k] ?? k;
  /** ชื่อของวัตถุตามภาษา */
  RW.nm = (o) => (lang === 'en' ? o.name_en || o.en || o.name || o.th : o.name || o.th);
})(window.RW);
