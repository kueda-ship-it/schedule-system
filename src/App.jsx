import { useState, useMemo, useCallback, useEffect } from "react";
import { supabase } from "./supabase";

const IconVacationSolid = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><path d="M11 2v4h2V2h-2zm4.3 2.3l-1.4 1.4 2.8 2.8 1.4-1.4-2.8-2.8zM19 11v2h4v-2h-4zm-2.3 4.3l-2.8 2.8 1.4 1.4 2.8-2.8-1.4-1.4zM2 13h4v-2H2v2zm2.3-4.3l1.4-1.4 2.8 2.8-1.4 1.4-2.8-2.8zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" /></svg>
);
const IconMoveAll = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10h14M7 14h14M3 10l4-4v8l-4-4zm18 4l-4 4v-8l4 4z" /></svg>
);
const IconPlus = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const IconTrash = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);
const IconEdit = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);
const IconCheck = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);
const IconVacation = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"></path><path d="M7 16V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12"></path><path d="M3 20h18"></path></svg>
);
const IconGrip = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>
);
const IconCalendar = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);
const IconGear = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);
const IconPool = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6h20v12H2z"></path><path d="M6 12h12"></path><path d="M12 6v12"></path></svg>
);
const IconTransfer = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 8 16 13"></polyline><line x1="21" y1="8" x2="3" y2="8"></line><polyline points="8 21 3 16 8 11"></polyline><line x1="3" y1="16" x2="21" y2="16"></line></svg>
);
const IconUndo = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg>
);
const IconBack = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 14 4 9l5-5"></path><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"></path></svg>
);
const IconX = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const IconPerson = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="7" r="4"></circle><path d="M5.5 21c0-3.5 3-6.5 6.5-6.5s6.5 3 6.5 6.5"></path></svg>
);
const IconClipboard = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"></rect><line x1="9" y1="10" x2="15" y2="10"></line><line x1="9" y1="14" x2="15" y2="14"></line><line x1="9" y1="6" x2="15" y2="6"></line></svg>
);
const IconWrench = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
);
const IconNote = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
);
const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
const DOW_HEADERS = ["月", "火", "水", "木", "金", "土", "日"];
const TYPES = ["点検", "修理", "設置", "撤去", "メンテナンス", "その他"];
const DEFAULT_TYPE_COLORS = {
  "点検": { bg: "#dbeafe", text: "#1e40af", badge: "#93c5fd" },
  "修理": { bg: "#fee2e2", text: "#991b1b", badge: "#fca5a5" },
  "設置": { bg: "#dcfce7", text: "#166534", badge: "#86efac" },
  "撤去": { bg: "#f3e8ff", text: "#6b21a8", badge: "#d8b4fe" },
  "メンテナンス": { bg: "#fef9c3", text: "#854d0e", badge: "#fde047" },
  "その他": { bg: "#f1f5f9", text: "#475569", badge: "#cbd5e1" },
};
const STATUSES = ["", "フリー", "休暇"];
const AREAS = ["北海道", "東北", "関東", "中部", "近畿", "中国", "四国", "九州"];
const RESULTS = ["完了", "未完了", "キャンセル", "保留"];
const PREFECTURES = ["北海道", "青森", "岩手", "宮城", "秋田", "山形", "福島", "茨城", "栃木", "群馬", "埼玉", "千葉", "東京", "神奈川", "新潟", "富山", "石川", "福井", "山梨", "長野", "岐阜", "静岡", "愛知", "三重", "滋賀", "京都", "大阪", "兵庫", "奈良", "和歌山", "鳥取", "島根", "岡山", "広島", "山口", "徳島", "香川", "愛媛", "高知", "福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄"];

const getPrefColor = (pref) => {
  if (!pref) return "#475569";
  const colors = ["#2563eb", "#dc2626", "#16a34a", "#9333ea", "#ca8a04", "#0891b2", "#be123c", "#d97706", "#059669", "#4f46e5"];
  let hash = 0;
  for (let i = 0; i < pref.length; i++) hash = pref.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};
// --- 障害区分定義 ---
const FAULT_CATEGORIES = [
  "デバイス", "扉関連", "点検、清掃", "電話・Modem関連", "F-rents関連",
  "停止関連", "PG", "HA通信", "F-ics関連", "非接触通信",
  "音声不具合", "荷物手渡し、引き上げ", "F-charge関連", "リンク、閉じ込め",
  "貼り紙、シール貼り（剥がし）", "設定変更", "複数ボックスログ異常",
  "シェアリングBOX関連", "AED関連", "F-ace関連", "プリンター用紙交換", "メールポスト関連",
];
const FAULT_LEVEL_MAP = {
  "デバイス": "D", "扉関連": "D", "点検、清掃": "E", "電話・Modem関連": "C",
  "F-rents関連": "D", "停止関連": "B", "PG": "D", "HA通信": "B",
  "F-ics関連": "A", "非接触通信": "B", "音声不具合": "D", "荷物手渡し、引き上げ": "E",
  "F-charge関連": "B", "リンク、閉じ込め": "C", "貼り紙、シール貼り（剥がし）": "E",
  "設定変更": "D", "複数ボックスログ異常": "C", "シェアリングBOX関連": "E",
  "AED関連": "D", "F-ace関連": "A", "プリンター用紙交換": "E", "メールポスト関連": "C",
};
const FAULT_LEVELS = ["A", "B", "C", "D", "E"];
const FAULT_LEVEL_COLORS = { A: "#dc2626", B: "#ea580c", C: "#ca8a04", D: "#2563eb", E: "#64748b" };

const TIME_OPTIONS = (() => {
  const opts = [];
  for (let h = 0; h <= 12; h++) {
    for (let m = 0; m < 60; m += 15) {
      if (h === 0 && m === 0) continue;
      if (h === 12 && m > 0) continue;
      opts.push(`${h}:${String(m).padStart(2, '0')}`);
    }
  }
  return opts;
})();

const INITIAL_WORKERS = [
  { id: 1, name: "田中", color: "#2563eb" },
  { id: 2, name: "佐藤", color: "#dc2626" },
  { id: 3, name: "鈴木", color: "#16a34a" },
  { id: 4, name: "高橋", color: "#9333ea" },
  { id: 5, name: "渡辺", color: "#ca8a04" },
  { id: 6, name: "伊藤", color: "#0891b2" },
  { id: 7, name: "山本", color: "#be123c" },
  { id: 8, name: "中村", color: "#7c3aed" },
];

const ALL_COLS = [
  { key: "type", label: "タイプ", w: 56, type: "select", options: TYPES },
  { key: "box", label: "BOX", w: 48, type: "text" },
  { key: "unit", label: "号機", w: 40, type: "text" },
  { key: "property", label: "物件名", w: 130, type: "text" },
  { key: "category", label: "種別", w: 48, type: "text" },
  { key: "work", label: "作業内容", w: 130, type: "text" },
  { key: "time", label: "時間指定", w: 52, type: "text" },
  { key: "person", label: "対応者", w: 52, type: "worker", dailyOnly: true },
  { key: "area", label: "エリア", w: 48, type: "text" },
  { key: "prefecture", label: "県別", w: 48, type: "select", options: PREFECTURES },
  { key: "travel", label: "移動", w: 40, type: "text" },
  { key: "companion", label: "同行者", w: 52, type: "text" },
  { key: "requestNo", label: "依頼番号", w: 72, type: "text" },
  { key: "timeSlot", label: "TIME", w: 52, type: "select", options: TIME_OPTIONS },
  { key: "course", label: "コース", w: 48, type: "text" },
  { key: "result", label: "結果", w: 52, type: "select", options: RESULTS },
  { key: "responseDate", label: "対応日", w: 76, type: "date" },
  { key: "faultCategory", label: "障害区分", w: 90, type: "select", options: FAULT_CATEGORIES },
  { key: "faultLevel", label: "Level", w: 36, type: "auto" },
  { key: "notes", label: "備考", w: 100, type: "text" },
];

const emptyTicket = () => ({
  id: Math.random().toString(36).substring(2, 11), date: "", type: "", box: "", unit: "", property: "", category: "",
  work: "", time: "", person: "", area: "", prefecture: "", travel: "", companion: "",
  requestNo: "", timeSlot: "", course: "", result: "", responseDate: "",
  faultCategory: "", faultLevel: "", notes: "",
});

const typeColors = { ...DEFAULT_TYPE_COLORS };
const TYPE_COLOR_PRESETS = [
  { bg: "#dbeafe", text: "#1e40af", badge: "#93c5fd" },
  { bg: "#fee2e2", text: "#991b1b", badge: "#fca5a5" },
  { bg: "#dcfce7", text: "#166534", badge: "#86efac" },
  { bg: "#f3e8ff", text: "#6b21a8", badge: "#d8b4fe" },
  { bg: "#fef9c3", text: "#854d0e", badge: "#fde047" },
  { bg: "#fce7f3", text: "#9d174d", badge: "#f9a8d4" },
  { bg: "#ccfbf1", text: "#115e59", badge: "#5eead4" },
  { bg: "#fff7ed", text: "#9a3412", badge: "#fdba74" },
  { bg: "#f1f5f9", text: "#475569", badge: "#cbd5e1" },
];
const resultColors = { "完了": "#bbf7d0", "未完了": "#fef08a", "キャンセル": "#e2e8f0", "保留": "#fecaca" };

// --- 祝日定義 (2026-2027) ---
const HOLIDAYS = {
  "2026-01-01": "元日", "2026-01-12": "成人の日", "2026-02-11": "建国記念の日", "2026-02-23": "天皇誕生日",
  "2026-03-20": "春分の日", "2026-04-29": "昭和の日", "2026-05-03": "憲法記念日", "2026-05-04": "みどりの日",
  "2026-05-05": "こどもの日", "2026-05-06": "振替休日", "2026-07-20": "海の日", "2026-08-11": "山の日",
  "2026-09-21": "敬老の日", "2026-09-22": "国民の休日", "2026-09-23": "秋分の日", "2026-10-12": "スポーツの日",
  "2026-11-03": "文化の日", "2026-11-23": "勤労感謝の日",
  "2027-01-01": "元日", "2027-01-11": "成人の日", "2027-02-11": "建国記念の日", "2027-02-23": "天皇誕生日",
  "2027-03-21": "春分の日", "2027-03-22": "振替休日", "2027-04-29": "昭和の日", "2027-05-03": "憲法記念日",
  "2027-05-04": "みどりの日", "2027-05-05": "こどもの日", "2027-07-19": "海の日", "2027-08-11": "山の日",
  "2027-09-20": "敬老の日", "2027-09-23": "秋分の日", "2027-10-11": "スポーツの日", "2027-11-03": "文化の日",
  "2027-11-23": "勤労感謝の日"
};
function isHoliday(dateStr) {
  return HOLIDAYS[dateStr] || false;
}





function fmtDate(y, m, d) { return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`; }
function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function parseHours(t) {
  if (!t) return 0;
  if (t.includes(":")) {
    const [h, min] = t.split(":").map(Number);
    return h + (min || 0) / 60;
  }
  return parseFloat(t) || 0;
}
function formatArea(address, prefectures) {
  if (!address) return "";
  const raw = address.trim();
  const isTokyo = prefectures && prefectures.includes("東京都");

  if (isTokyo) {
    const wards23 = ["千代田区", "中央区", "港区", "新宿区", "文京区", "台東区", "墨田区", "江東区", "品川区", "目黒区", "大田区", "世田谷区", "渋谷区", "中野区", "杉並区", "豊島区", "北区", "荒川区", "板橋区", "練馬区", "足立区", "葛飾区", "江戸川区"];
    if (wards23.some(w => raw.includes(w))) return "23";
    return "都下";
  }

  const prefMap = { "神奈川県": "K", "千葉県": "C", "埼玉県": "S", "大阪府": "O", "愛知県": "A", "福岡県": "F", "京都府": "K", "兵庫県": "H", "広島県": "H", "宮城県": "M", "岡山県": "O", "静岡県": "S", "熊本県": "K", "新潟県": "N", "北海道": "S" };
  const cityMap = { "横浜市": "Y", "川崎市": "K", "相模原市": "S", "千葉市": "C", "さいたま市": "S", "大阪市": "O", "堺市": "S", "名古屋市": "N", "福岡市": "F", "北九州市": "K", "京都市": "K", "神戸市": "K", "広島市": "H", "仙台市": "S", "岡山市": "O", "静岡市": "S", "浜松市": "H", "熊本市": "K", "新潟市": "N", "札幌市": "S" };

  let formatted = raw;
  const wardIdx = raw.indexOf("区");
  const cityIdx = raw.indexOf("市");
  const gunIdx = raw.indexOf("郡");

  if (wardIdx !== -1) {
    let start = 0;
    if (cityIdx !== -1 && cityIdx < wardIdx) start = cityIdx + 1;
    formatted = raw.substring(start, wardIdx + 1);
  } else if (cityIdx !== -1) {
    formatted = raw.substring(0, cityIdx + 1);
  } else if (gunIdx !== -1) {
    formatted = raw.substring(0, gunIdx + 1);
  }

  let suffixes = "";
  const cKey = Object.keys(cityMap).find(k => raw.includes(k));
  if (cKey) {
    if (prefectures) {
      const pKey = Object.keys(prefMap).find(k => prefectures.includes(k));
      if (pKey) suffixes += prefMap[pKey];
    }
    suffixes += cityMap[cKey];
  }

  return formatted + suffixes;
}

function getMonthCalendar(year, month) {
  const days = getDaysInMonth(year, month);
  const firstDow = new Date(year, month, 1).getDay();
  const startOffset = firstDow === 0 ? 6 : firstDow - 1;
  const weeks = [];
  let week = Array(7).fill(null);
  for (let d = 1; d <= days; d++) {
    const dow = new Date(year, month, d).getDay();
    const idx = dow === 0 ? 6 : dow - 1;
    week[idx] = { day: d, dateStr: fmtDate(year, month, d), dow };
    if (idx === 6 || d === days) {
      weeks.push(week);
      week = Array(7).fill(null);
    }
  }
  return weeks;
}

function generateSampleData(workers) {
  const data = [];
  const properties = ["プリンスハイツ品川", "ダイバーシティ台場", "グローベル品川", "コスモタウン新橋", "ライフレジデンス中野", "パークハウス錦糸町", "HARUM FLAG", "フォルテアストリア", "TOWER&GARDEN", "フランス橋本", "パークシティ中央湊", "BRITH THE TOWER", "マイキャッスル新宿", "セーサイドレジデンス", "アティーナ大森", "オーベルグランディオ"];
  const works = ["通常開閉", "給排水管更新", "全面改修", "外壁洗浄", "設備点検", "消防設備点検", "エレベーター保守", "配管更新", "電気設備点検", "空調機器点検"];
  const now = new Date();
  for (let mo = 0; mo < 3; mo++) {
    const month = (now.getMonth() + mo) % 12;
    const year = now.getFullYear() + (now.getMonth() + mo >= 12 ? 1 : 0);
    const days = getDaysInMonth(year, month);
    for (let d = 1; d <= days; d++) {
      const dow = new Date(year, month, d).getDay();
      if ((dow === 0 || dow === 6) && Math.random() > 0.15) continue;
      const count = Math.floor(Math.random() * 10) + 4;
      for (let i = 0; i < count; i++) {
        const w = workers[Math.floor(Math.random() * workers.length)];
        data.push({
          id: Math.random().toString(36).substring(2, 11),
          date: fmtDate(year, month, d),
          type: TYPES[Math.floor(Math.random() * TYPES.length)],
          box: `B${String(Math.floor(Math.random() * 50) + 1).padStart(3, "0")}`,
          unit: `${Math.floor(Math.random() * 20) + 1}`,
          property: properties[Math.floor(Math.random() * properties.length)],
          category: ["工事", "押替", "管理", "フリー"][Math.floor(Math.random() * 4)],
          work: works[Math.floor(Math.random() * works.length)],
          time: `${Math.floor(Math.random() * 4) + 1}h`,
          person: String(w.id),
          area: AREAS[Math.floor(Math.random() * AREAS.length)],
          prefecture: PREFECTURES[Math.floor(Math.random() * PREFECTURES.length)],
          travel: ["", "車", "電車", "新幹線"][Math.floor(Math.random() * 4)],
          companion: Math.random() > 0.7 ? String(workers[Math.floor(Math.random() * workers.length)].id) : "",
          requestNo: Math.random() > 0.5 ? `REQ-${Math.floor(Math.random() * 9000) + 1000}` : "",
          timeSlot: ["AM", "PM", "終日", ""][Math.floor(Math.random() * 4)],
          course: ["A", "B", "C", "D", ""][Math.floor(Math.random() * 5)],
          result: Math.random() > 0.5 ? RESULTS[Math.floor(Math.random() * RESULTS.length)] : "",
          notes: Math.random() > 0.8 ? "特記事項あり" : "",
        });
      }
    }
  }
  return data;
}



// --- Month Calendar View (grouped by worker) ---
function MonthCalendar({ tickets, year, month, workers, vacations, onDayClick, onEdit, onView, onAdd, onReorder, onMoveTicket, isAdmin }) {
  const weeks = useMemo(() => getMonthCalendar(year, month), [year, month]);
  const ticketsByDate = useMemo(() => {
    const m = {};
    tickets.forEach(t => { if (!m[t.date]) m[t.date] = []; m[t.date].push(t); });
    return m;
  }, [tickets]);

  const today = new Date();
  const todayStr = fmtDate(today.getFullYear(), today.getMonth(), today.getDate());

  // Drag state for monthly reorder
  const [monthDragId, setMonthDragId] = useState(null);
  const [monthDragOver, setMonthDragOver] = useState(null); // {id} or {workerId, dateStr}

  // Build grouped data for a given dateStr
  const buildDayData = useCallback((dateStr) => {
    const dayT = ticketsByDate[dateStr] || [];
    const vacSet = vacations[dateStr] || new Set();

    // Group tickets by worker
    const byWorker = { "none": [] };
    workers.forEach(w => { byWorker[String(w.id)] = []; });
    dayT.forEach(t => {
      const k = (t.person && byWorker[t.person]) ? t.person : "none";
      byWorker[k].push(t);
    });

    // Find companion IDs
    const companionIds = new Set();
    dayT.forEach(t => {
      if (t.companion) {
        t.companion.split(/[,、\s]+/).forEach(c => { if (c.trim()) companionIds.add(c.trim()); });
      }
    });

    const withTickets = [];
    const noTickets = []; // Workers with 0 tickets (not on vacation)
    const onVacation = [];
    const unassignedTickets = byWorker["none"]; // Tickets with no assigned worker

    workers.forEach(w => {
      const wId = String(w.id);
      const wTickets = byWorker[wId] || [];
      const isAdminUser = w.sche_role === "admin";

      if (vacSet.has(w.id)) {
        // 管理者でも休暇設定されている場合は表示（または予定があれば表示）
        if (!isAdminUser || wTickets.length > 0) {
          onVacation.push({ worker: w, tickets: wTickets });
        }
      } else if (wTickets.length > 0) {
        withTickets.push({ worker: w, tickets: wTickets });
      } else if (!companionIds.has(wId)) {
        // 管理者は予定がない（かつ同行者でもない）場合は「noTickets」に含めない
        if (!isAdminUser) {
          noTickets.push({ worker: w, tickets: [] });
        }
      }
    });

    return { withTickets, noTickets, onVacation, unassignedTickets, total: dayT.length };
  }, [ticketsByDate, workers, vacations]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid #c7cbd1", borderRadius: 4, overflow: "hidden", background: "#fff" }}>
      {/* DOW header */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderBottom: "2px solid #94a3b8" }}>
        {DOW_HEADERS.map((d, i) => {
          const isSat = i === 5, isSun = i === 6;
          return (
            <div key={i} style={{
              padding: "6px 0", textAlign: "center", fontSize: 12, fontWeight: 800,
              letterSpacing: 2,
              color: isSun ? "#dc2626" : isSat ? "#2563eb" : "#1e293b",
              background: isSun ? "#fef2f2" : isSat ? "#eff6ff" : "#f1f5f9",
              borderRight: i < 6 ? "1px solid #d1d5db" : "none",
            }}>{d}</div>
          );
        })}
      </div>

      {/* Week rows */}
      {weeks.map((week, wi) => (
        <div key={wi} style={{
          display: "grid", gridTemplateColumns: "repeat(7,1fr)",
          borderBottom: wi < weeks.length - 1 ? "1px solid #cbd5e1" : "none",
          alignItems: "stretch",
        }}>
          {week.map((cell, ci) => {
            if (!cell) return (
              <div key={ci} style={{ background: "#f8fafc", borderRight: ci < 6 ? "1px solid #e2e8f0" : "none", padding: 3 }} />
            );
            const isSat = ci === 5, isSun = ci === 6;
            const isToday = cell.dateStr === todayStr;
            const { withTickets, noTickets, onVacation, unassignedTickets, total } = buildDayData(cell.dateStr);
            const holidayName = isHoliday(cell.dateStr);
            const isHolidayDay = !!holidayName;

            return (
              <div key={ci} style={{
                borderRight: ci < 6 ? "1px solid #e2e8f0" : "none",
                background: isToday ? "#fffbeb" : (isSun || isHolidayDay) ? "#fff1f2" : isSat ? "#f8faff" : "#fff",
                padding: 2,
                display: "flex", flexDirection: "column",
                minHeight: 28,
              }}>
                {/* Day number + count + unassigned */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "1px 3px 2px", marginBottom: 1,
                  cursor: "pointer",
                  borderBottom: "1px solid #f1f5f9"
                }} onClick={() => onDayClick(cell.dateStr)}>
                  <span style={{
                    fontSize: 13, fontWeight: 800,
                    background: isToday ? "#f59e0b" : "transparent",
                    color: isToday ? "#fff" : (isSun || isHolidayDay) ? "#dc2626" : isSat ? "#2563eb" : "#1e293b",
                    borderRadius: isToday ? 10 : 0,
                    padding: isToday ? "0 5px" : "0",
                    lineHeight: "18px",
                  }}>{cell.day}</span>
                  {holidayName && <span style={{ fontSize: 7, color: "#dc2626", fontWeight: 700 }}>({holidayName})</span>}
                  {total > 0 && <span style={{ fontSize: 8, color: "#94a3b8", fontWeight: 700 }}>{total}件</span>}
                  <button onClick={e => { e.stopPropagation(); onAdd(cell.dateStr); }} title="追加" style={{ background: "none", border: "1px solid #e2e8f0", borderRadius: 3, cursor: "pointer", padding: "0px 1px", display: "flex", alignItems: "center", lineHeight: 1, transition: "background 0.15s" }}
                    onMouseOver={e => e.currentTarget.style.background = "#dbeafe"}
                    onMouseOut={e => e.currentTarget.style.background = "none"}>
                    <IconPlus size={10} color="#2563eb" />
                  </button>
                  <div style={{ flex: 1 }} />
                  {/* Unassigned tickets & no-ticket workers */}
                  <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {unassignedTickets.length > 0 && (
                      <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#f87171", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 900, boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }} title="未対応チケットあり">{unassignedTickets.length}</span>
                    )}
                    {noTickets.length > 0 && (
                      <div style={{ display: "flex", gap: 1 }}>
                        {noTickets.map(({ worker: w }) => (
                          <div key={w.id} style={{ display: "inline-block", cursor: "pointer" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.onWorkerMenu) window.onWorkerMenu(e.clientX, e.clientY, String(w.id), w.name, cell.dateStr);
                            }}>
                            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#e9d5ff", color: "#6b21a8", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 800 }} title={w.name}>{typeof w.id === "string" ? w.name?.charAt(0) : w.id}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Unassigned tickets rows */}
                {unassignedTickets.length > 0 && (
                  <div style={{ marginBottom: 4, borderRadius: 3, border: "1px dashed #f87171", background: "#fef2f2", overflow: "hidden" }}>
                    <div style={{ fontSize: 7, fontWeight: 800, color: "#ef4444", padding: "1px 4px", background: "#fee2e2", borderBottom: "1px dashed #f87171" }}>未割当 ({unassignedTickets.length})</div>
                    {unassignedTickets.map((t, i) => {
                      const tc = typeColors[t.type] || typeColors["その他"];
                      return (
                        <div key={t.id} onClick={() => isAdmin ? onEdit(t) : (onView ? onView(t) : onEdit(t))}
                          style={{ padding: "1px 3px", borderTop: i === 0 ? "none" : "1px solid #e5e7eb", background: tc.bg, cursor: "pointer", fontSize: 8 }}>
                          <div style={{ display: "flex", flexWrap: "wrap", rowGap: 0, columnGap: 4, lineHeight: 1.1 }}>
                            <div style={{ fontWeight: 900, color: tc.text }}>{t.type} {t.unit}</div>
                            <div style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 700 }}>{t.property}</div>
                            {t.timeSlot && <div style={{ color: "#64748b", fontWeight: 800 }}>{t.timeSlot}</div>}
                          </div>
                          <div style={{ display: "flex", gap: 3, fontSize: 7, color: "#475569", marginTop: 1, opacity: 0.9, lineHeight: 1.1 }}>
                            {t.time && <span style={{ fontWeight: 700 }}>{t.time}</span>}
                            <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.work}</span>
                            <span>{t.area}</span>
                            <span>{t.prefecture}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Workers with tickets (grouped) */}
                <div style={{ flex: 1 }}>
                  {withTickets.map(({ worker: w, tickets: wt }) => {
                    const totalH = wt.reduce((s, ticket) => {
                      let t = s;
                      const start = ticket.timeSlot ? parseHours(ticket.timeSlot) : parseHours(ticket.time);
                      const end = ticket.timeSlot === "AM" ? 12 : ticket.timeSlot === "PM" ? 17 : ticket.timeSlot === "終日" ? 17 : start + parseHours(ticket.time);
                      const bh = end - start;
                      if (bh > 0) t += bh;
                      return t;
                    }, 0);
                    return (
                      <div key={w.id} style={{
                        marginBottom: 2, borderRadius: 3, overflow: "hidden",
                        border: `1px solid #e9d5ff`,
                        display: "flex",
                        background: monthDragOver && monthDragOver.workerId === String(w.id) && monthDragOver.dateStr === cell.dateStr && monthDragId ? "#eff6ff" : "transparent"
                      }}
                        onDragOver={(e) => { e.preventDefault(); if (monthDragId) setMonthDragOver({ workerId: String(w.id), dateStr: cell.dateStr }); }}
                        onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setMonthDragOver(null); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (monthDragId && onMoveTicket) {
                            onMoveTicket(monthDragId, String(w.id), cell.dateStr);
                          }
                          setMonthDragOver(null); setMonthDragId(null);
                        }}>
                        {/* Left color bar */}
                        <div style={{ width: 3, background: monthDragOver && monthDragOver.workerId === String(w.id) && monthDragOver.dateStr === cell.dateStr && monthDragId ? "#3b82f6" : "#d8b4fe", flexShrink: 0 }} />
                        <div style={{ flex: 1, background: monthDragOver && monthDragOver.workerId === String(w.id) && monthDragOver.dateStr === cell.dateStr && monthDragId ? "#eff6ff" : "#faf5ff" }}>
                          {/* Worker header */}
                          <div style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "1px 3px", background: monthDragOver && monthDragOver.workerId === String(w.id) && monthDragOver.dateStr === cell.dateStr && monthDragId ? "#dbeafe" : "#fdf4ff",
                            cursor: "pointer",
                          }} onClick={(e) => {
                            e.stopPropagation();
                            if (window.onWorkerMenu) window.onWorkerMenu(e.clientX, e.clientY, String(w.id), w.name, cell.dateStr);
                          }}
                            onMouseOver={e => e.currentTarget.style.filter = "brightness(0.95)"}
                            onMouseOut={e => e.currentTarget.style.filter = "none"}>
                            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <span style={{
                                width: 12, height: 12, borderRadius: "50%",
                                background: "#c084fc", color: "#fff",
                                display: "inline-flex", alignItems: "center", justifyContent: "center",
                                fontSize: 7, fontWeight: 800,
                              }}>{typeof w.id === "string" ? w.name?.charAt(0) : w.id}</span>
                              <span style={{ fontSize: 8, fontWeight: 700, color: "#9333ea" }}>{w.name}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              {monthDragOver && monthDragOver.workerId === String(w.id) && monthDragOver.dateStr === cell.dateStr && monthDragId && (
                                <span style={{ fontSize: 10, fontWeight: 900, color: "#2563eb", lineHeight: 1 }}>＋</span>
                              )}
                              {totalH > 0 && (
                                <span style={{ fontSize: 7, fontWeight: 700, color: "#64748b" }}>{totalH}h</span>
                              )}
                            </div>
                          </div>
                          {/* Ticket rows */}
                          {wt.map(t => {
                            const tc = typeColors[t.type] || typeColors["その他"];
                            const isDragTarget = monthDragOver && monthDragOver.id === t.id;
                            return (
                              <div key={t.id}
                                draggable
                                onDragStart={(e) => { setMonthDragId(t.id); e.dataTransfer.effectAllowed = "move"; e.stopPropagation(); }}
                                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setMonthDragOver({ id: t.id }); }}
                                onDragLeave={() => setMonthDragOver(null)}
                                onDrop={(e) => {
                                  e.preventDefault(); e.stopPropagation();
                                  setMonthDragOver(null);
                                  if (monthDragId && monthDragId !== t.id && onReorder) {
                                    onReorder(cell.dateStr, String(w.id), monthDragId, t.id);
                                  }
                                  setMonthDragId(null);
                                }}
                                onClick={() => isAdmin ? onEdit(t) : (onView ? onView(t) : onEdit(t))} style={{
                                  display: "flex", flexDirection: "column", gap: 2,
                                  padding: "2px 3px", borderTop: isDragTarget ? "2px solid #2563eb" : `1px solid #e9d5ff`,
                                  background: tc.bg, cursor: "grab", minHeight: 28,
                                  fontSize: 8, lineHeight: "1.2", overflow: "hidden",
                                }}
                                onMouseOver={e => e.currentTarget.style.filter = "brightness(0.93)"}
                                onMouseOut={e => e.currentTarget.style.filter = "none"}>
                                <div style={{ display: "flex", flexWrap: "wrap", rowGap: 0, columnGap: 4, lineHeight: 1.1 }}>
                                  <div style={{ fontWeight: 900, color: tc.text }}>{t.type} {t.unit}</div>
                                  <div style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 700 }}>{t.property}</div>
                                  {t.timeSlot && <div style={{ color: "#64748b", fontWeight: 800 }}>{t.timeSlot}</div>}
                                </div>
                                <div style={{ display: "flex", gap: 3, fontSize: 7, color: "#475569", marginTop: 1, opacity: 0.9, lineHeight: 1.1 }}>
                                  {t.time && <span style={{ fontWeight: 700 }}>{t.time}</span>}
                                  <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.work}</span>
                                  <span>{t.area}</span>
                                  <span style={{ color: getPrefColor(t.prefecture), fontWeight: 700 }}>{t.prefecture}</span>
                                </div>
                              </div>
                            );
                          })}
                          {monthDragId && (
                            <div
                              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setMonthDragOver({ appendTo: String(w.id) }); }}
                              onDragLeave={() => setMonthDragOver(null)}
                              onDrop={(e) => {
                                e.preventDefault(); e.stopPropagation();
                                setMonthDragOver(null);
                                if (monthDragId && onMoveTicket) {
                                  onMoveTicket(monthDragId, String(w.id), cell.dateStr);
                                }
                                setMonthDragId(null);
                              }}
                              style={{
                                height: 8, borderRadius: 3, margin: "2px 3px",
                                background: monthDragOver?.appendTo === String(w.id) ? "#eff6ff" : "transparent"
                              }}>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}



                  {/* Vacation workers */}
                  {onVacation.length > 0 && (
                    <div style={{ marginTop: 1, padding: "1px 3px" }}>
                      {onVacation.map(({ worker: w }) => (
                        <div key={w.id} style={{
                          display: "flex", alignItems: "center", gap: 2,
                          padding: "1px", opacity: 0.5, fontSize: 8, cursor: "pointer",
                        }} onClick={(e) => {
                          e.stopPropagation();
                          if (window.onWorkerMenu) window.onWorkerMenu(e.clientX, e.clientY, String(w.id), w.name, cell.dateStr);
                        }}
                          onMouseOver={e => e.currentTarget.style.background = "#f1f5f9"}
                          onMouseOut={e => e.currentTarget.style.background = "none"}>
                          <span style={{
                            width: 10, height: 10, borderRadius: "50%",
                            background: "#94a3b8", color: "#fff",
                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                            fontSize: 6, fontWeight: 800,
                          }}>{w.id}</span>
                          <span style={{ color: "#94a3b8", textDecoration: "line-through" }}>{w.name}</span>
                          <IconVacation size={9} color="#f59e0b" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// --- Daily Detail View ---
function DailyDetail({ tickets, dateStr, workers, onEdit, onDelete, onAdd, onView, onSave, vacations, onToggleVacation, onReorder, onMoveTicket }) {
  const dayTickets = tickets.filter(t => t.date === dateStr);
  const d = new Date(dateStr + "T00:00:00");
  const dow = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  const currentCols = ALL_COLS.filter(c => c.key !== "person");
  const vacSet = vacations[dateStr] || new Set();

  const grouped = {};
  workers.forEach(w => { grouped[String(w.id)] = []; });
  grouped["none"] = [];
  dayTickets.forEach(t => {
    const k = t.person && grouped[t.person] ? t.person : "none";
    grouped[k].push(t);
  });

  const activeWorkers = workers.filter(w => !vacSet.has(w.id));
  const vacWorkers = workers.filter(w => vacSet.has(w.id));
  const unassignedList = grouped["none"] || [];
  const displayWorkers = [...activeWorkers, ...vacWorkers];

  // 「未割当」を仮想的な作業員として扱うための定義
  const UNASSIGNED_WORKER = { id: "none", name: "未定", color: "#64748b", isUnassigned: true };
  // Drag & drop reorder
  const [dragId, setDragId] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  // Inline edit state
  const [editingCell, setEditingCell] = useState(null); // {id, key}

  // Move ticket modal
  const [moveTicket, setMoveTicket] = useState(null);

  const isHolidayAtDay = isHoliday(dateStr);
  const isSundayAtDay = d.getDay() === 0;
  const dateColorAtDay = (isSundayAtDay || isHolidayAtDay) ? "#ef4444" : (d.getDay() === 6 ? "#2563eb" : "#1e293b");

  return (
    <div style={{ padding: "0 4px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#1e293b", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: dateColorAtDay }}>{d.getMonth() + 1}月{d.getDate()}日（{dow}）{isHolidayAtDay ? ` ${isHolidayAtDay}` : ""}</span>
          <span style={{ fontSize: 12, fontWeight: 500, background: "#f1f5f9", padding: "2px 8px", borderRadius: 12, color: "#475569" }}>{dayTickets.length}件</span>
        </h2>
        <button onClick={() => onAdd(dateStr)} style={{ padding: "6px 16px", borderRadius: 4, border: "none", background: "#1e40af", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>＋ 追加</button>
      </div>

      {/* Vacation header */}
      {vacWorkers.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", marginBottom: 6, background: "#fef9c3", borderRadius: 4, border: "1px solid #fde047" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#854d0e" }}>🌴 休暇:</span>
          {vacWorkers.map(w => (
            <span key={w.id} style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11 }}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#94a3b8", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800 }}>{typeof w.id === "string" ? w.name?.charAt(0) : w.id}</span>
              <span style={{ color: "#94a3b8", fontWeight: 600 }}>{w.name}</span>
            </span>
          ))}
        </div>
      )}

      {/* Move ticket modal */}
      {moveTicket && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000 }} onClick={() => setMoveTicket(null)}>
          <div style={{ background: "#fff", borderRadius: 8, padding: 20, width: 300, boxShadow: "0 16px 48px rgba(0,0,0,0.25)" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700 }}>チケットを移動</h3>
            <p style={{ fontSize: 11, color: "#64748b", margin: "0 0 12px" }}>{moveTicket.type} / {moveTicket.property}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {workers.filter(w => String(w.id) !== moveTicket.person).map(w => (
                <button key={w.id} onClick={() => { onMoveTicket && onMoveTicket(moveTicket.id, String(w.id)); setMoveTicket(null); }}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", border: "1px solid #e2e8f0", borderRadius: 4, background: "#fff", cursor: "pointer", fontSize: 11, fontWeight: 600 }}
                  onMouseOver={e => e.currentTarget.style.background = `${w.color}15`}
                  onMouseOut={e => e.currentTarget.style.background = "#fff"}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: w.color, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800 }}>{typeof w.id === "string" ? w.name?.charAt(0) : w.id}</span>
                  <span style={{ color: w.color }}>{w.name}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setMoveTicket(null)} style={{ marginTop: 12, width: "100%", padding: "6px", border: "1px solid #d1d5db", borderRadius: 4, background: "#f8fafc", cursor: "pointer", fontSize: 11 }}>キャンセル</button>
          </div>
        </div>
      )}

      {[UNASSIGNED_WORKER, ...displayWorkers].map(w => {
        const wt = grouped[String(w.id)] || [];
        const isVac = vacSet.has(w.id);
        const isAdminUser = w.sche_role === "admin";
        const isUnassignedRow = w.isUnassigned;

        // 管理者は予定がない場合は行自体を表示しない
        if (isAdminUser && wt.length === 0 && !isVac) return null;
        // 未割当行は予定がない場合は表示しない
        if (isUnassignedRow && wt.length === 0) return null;

        return (
          <div key={w.id} style={{
            marginBottom: 4, border: isUnassignedRow ? "1px dashed #f87171" : "1px solid #e2e8f0",
            borderRadius: 4,
            display: "flex", overflow: "hidden",
            opacity: 1,
          }}>
            <div style={{ width: 5, background: isUnassignedRow ? "#f87171" : (isVac ? "#94a3b8" : w.color), flexShrink: 0 }} />
            <div style={{ flex: 1, background: isUnassignedRow ? "#fef2f2" : "#fff", overflow: "hidden" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8, padding: "5px 10px",
                background: isUnassignedRow ? "#fee2e2" : (isVac ? "#fefce8" : wt.length > 0 ? `${w.color}08` : "#fafbfc"),
                borderBottom: wt.length > 0 ? "1px solid #e5e7eb" : "none",
              }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: isUnassignedRow ? "#f87171" : (isVac ? "#cbd5e1" : w.color), color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>{isUnassignedRow ? "？" : (typeof w.id === "string" ? w.name?.charAt(0) : w.id)}</span>
                <span style={{ fontWeight: 700, fontSize: 12, color: isUnassignedRow ? "#ef4444" : (isVac ? "#94a3b8" : w.color) }}>{isUnassignedRow ? "未定 (Unassigned)" : w.name}</span>
                {isVac && <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 3, background: "#fef3c7", color: "#92400e", fontWeight: 700 }}>🌴 休暇</span>}
                {!isVac && <span style={{ fontSize: 10, color: "#94a3b8" }}>{wt.length}件</span>}
                <div style={{ flex: 1 }} />
                {!isUnassignedRow && (
                  <button onClick={() => {
                    if (!isVac && wt.length > 0) {
                      if (!confirm(`${w.name}さんには${wt.length}件の予定があります。休暇にしますか？`)) return;
                    }
                    onToggleVacation && onToggleVacation(dateStr, w.id);
                  }} style={{
                    padding: "4px 12px", borderRadius: 4, cursor: "pointer", fontSize: 10, fontWeight: 700,
                    border: isVac ? "2px solid #eab308" : "1px solid #e2e8f0",
                    background: isVac ? "#fef08a" : "#fff",
                    color: isVac ? "#854d0e" : "#475569",
                    transition: "all 0.15s ease",
                  }}
                    onMouseOver={e => { e.currentTarget.style.background = isVac ? "#fde047" : "#f1f5f9"; e.currentTarget.style.transform = "scale(1.05)"; }}
                    onMouseOut={e => { e.currentTarget.style.background = isVac ? "#fef08a" : "#fff"; e.currentTarget.style.transform = "scale(1)"; }}
                  >{isVac ? <><IconCheck size={10} color="#854d0e" /> 出勤にする</> : <><IconVacation size={10} color="#64748b" /> 休暇</>}</button>
                )}
                <button onClick={() => { const t = emptyTicket(); t.date = dateStr; t.person = isUnassignedRow ? "" : String(w.id); onEdit(t); }} style={{ background: "none", border: "1px solid #e2e8f0", borderRadius: 3, cursor: "pointer", color: "#64748b", fontSize: 9, padding: "2px 8px", fontWeight: 600 }}>＋</button>
              </div>
              {wt.length > 0 && (
                <div style={{ overflowX: "auto", overflowY: "visible" }}>
                  <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: 11, tableLayout: "fixed" }}>
                    <colgroup>
                      <col style={{ width: 22 }} />
                      {currentCols.map(c => (
                        <col key={c.key} style={{ width: c.w }} />
                      ))}
                      <col style={{ width: 60 }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th style={{ width: 22, background: "#f8fafc", borderBottom: "1px solid #e5e7eb", position: "sticky", left: 0, zIndex: 11 }} />
                        {currentCols.map(c => (
                          <th key={c.key} style={{ padding: "3px 4px", fontSize: 9, fontWeight: 700, color: "#64748b", textAlign: "left", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap", background: "#f8fafc", width: c.w, overflow: "hidden", textOverflow: "ellipsis" }}>{c.label}</th>
                        ))}
                        <th style={{ width: 90, position: "sticky", right: 0, background: "#f8fafc", borderBottom: "1px solid #e5e7eb", fontSize: 9, fontWeight: 700, color: "#64748b", padding: "3px 4px", zIndex: 12, textAlign: "center", boxShadow: "-2px 0 4px rgba(0,0,0,0.02)" }}>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wt.map((t, idx) => {
                        const tc = typeColors[t.type] || typeColors["その他"];
                        const isDone = t.result === "完了";
                        const isDragTarget = dragOver === t.id;
                        return (
                          <tr key={t.id} style={{
                            background: isDone ? "#f1f5f9" : (t.result === "キャンセル" ? "#fff1f2" : tc.bg),
                            height: 48,
                            opacity: 1,
                            borderTop: isDragTarget ? "3px solid #2563eb" : "none",
                            transition: "border-top 0.1s",
                          }}
                            draggable
                            onDragStart={(e) => { setDragId(t.id); e.dataTransfer.effectAllowed = "move"; }}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(t.id); }}
                            onDragLeave={() => setDragOver(null)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setDragOver(null);
                              if (dragId && dragId !== t.id && onReorder) {
                                onReorder(dateStr, String(w.id), dragId, t.id);
                              }
                              setDragId(null);
                            }}
                            onMouseOver={e => { if (!isDone) e.currentTarget.style.filter = "brightness(0.97)"; }}
                            onMouseOut={e => e.currentTarget.style.filter = "none"}>
                            {/* Grip handle */}
                            <td style={{ width: 22, textAlign: "center", cursor: "grab", verticalAlign: "middle", borderBottom: "1px solid #f1f5f9" }}>
                              <IconGrip size={12} />
                            </td>
                            {currentCols.map(c => {
                              let bg = "transparent", clr = isDone ? "#1e293b" : "#1e293b";
                              if (c.key === "type" && !isDone) { bg = tc.badge; clr = tc.text; }
                              if (c.key === "result" && t.result && !isDone) bg = resultColors[t.result] || "transparent";
                              if (c.key === "result" && isDone) { bg = "#d1d5db"; clr = "#1e293b"; }
                              if (c.key === "faultLevel" && t.faultLevel) { bg = FAULT_LEVEL_COLORS[t.faultLevel] || "transparent"; clr = "#fff"; }
                              const isWork = c.key === "work";
                              const isEditing = editingCell && editingCell.id === t.id && editingCell.key === c.key;
                              const cellStyle = {
                                padding: "2px 3px",
                                whiteSpace: isWork ? "normal" : "nowrap",
                                wordBreak: isWork ? "break-all" : "normal",
                                overflow: "hidden",
                                textOverflow: isWork ? "unset" : "ellipsis",
                                width: c.w,
                                height: 48,
                                verticalAlign: "middle",
                                lineHeight: isWork ? "14px" : "normal",
                                borderBottom: "1px solid #f1f5f9",
                                background: isDone ? "#cbd5e1" : (t.result === "キャンセル" ? "#fca5a5" : (bg !== "transparent" ? bg : "transparent")),
                                color: clr,
                                fontWeight: c.key === "type" || c.key === "property" ? 700 : 500,
                                cursor: c.type === "auto" ? "default" : "text",
                              };

                              // Inline editing
                              if (isEditing && c.type !== "auto" && c.key !== "result") {
                                const inputStyle = { width: "100%", padding: "2px 3px", border: "1px solid #2563eb", borderRadius: 2, fontSize: 11, boxSizing: "border-box", background: "#fff", outline: "none", boxShadow: "0 0 0 2px rgba(37,99,235,0.2)" };
                                const save = (val) => {
                                  let updates = { [c.key]: val };
                                  if (c.key === "faultCategory") updates.faultLevel = FAULT_LEVEL_MAP[val] || "";
                                  if (c.key === "responseDate" && val) updates.date = val;
                                  onSave({ ...t, ...updates });
                                  setEditingCell(null);
                                };
                                return (
                                  <td key={c.key} style={cellStyle}>
                                    {c.type === "select" ? (
                                      <select autoFocus value={t[c.key] || ""} onChange={e => save(e.target.value)} onBlur={() => setEditingCell(null)} style={inputStyle}>
                                        <option value="">—</option>
                                        {c.options.map(o => <option key={o}>{o}</option>)}
                                      </select>
                                    ) : (
                                      <input autoFocus type={c.type === "date" ? "date" : "text"} defaultValue={t[c.key] || ""}
                                        onBlur={e => {
                                          let val = e.target.value;
                                          if (c.key === "time" && val.includes("：")) {
                                            alert("コロンは半角指定です");
                                            val = val.split("：").join("");
                                            e.target.value = val;
                                          }
                                          save(val);
                                        }}
                                        onKeyDown={e => {
                                          if (e.key === "Enter") {
                                            let val = e.currentTarget.value;
                                            if (c.key === "time" && val.includes("：")) {
                                              alert("コロンは半角指定です");
                                              val = val.split("：").join("");
                                              e.currentTarget.value = val;
                                            }
                                            save(val);
                                          }
                                          if (e.key === "Escape") setEditingCell(null);
                                        }} style={inputStyle} />
                                    )}
                                  </td>
                                );
                              }

                              return (
                                <td key={c.key} style={cellStyle} title={c.type !== "auto" && c.key !== "result" ? "クリックして編集" : ""}
                                  onMouseOver={e => { if (c.type !== "auto" && c.key !== "result") e.currentTarget.style.background = "#f8fafc"; }}
                                  onMouseOut={e => { if (c.type !== "auto" && c.key !== "result") e.currentTarget.style.background = cellStyle.background; }}
                                  onClick={e => { e.stopPropagation(); if (c.type !== "auto" && c.key !== "result") setEditingCell({ id: t.id, key: c.key }); }}>
                                  {t[c.key] || ""}
                                </td>
                              );
                            })}
                            <td style={{ position: "sticky", right: 0, zIndex: 10, background: isDone ? "#f8fafc" : "#fff", padding: "4px", borderBottom: "1px solid #f1f5f9", width: 90, height: 48, verticalAlign: "middle", boxShadow: "-2px 0 4px rgba(0,0,0,0.05)" }}>
                              <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
                                  {!isDone ? (
                                    <button onClick={e => { e.stopPropagation(); onSave({ ...t, result: "完了" }); }} title="完了" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 3, border: "1px solid #16a34a", background: "#dcfce7", cursor: "pointer", transition: "background 0.15s" }}
                                      onMouseOver={e => e.currentTarget.style.background = "#bbf7d0"}
                                      onMouseOut={e => e.currentTarget.style.background = "#dcfce7"}>
                                      <IconCheck size={12} color="#16a34a" />
                                    </button>
                                  ) : (
                                    <button onClick={e => { e.stopPropagation(); onSave({ ...t, result: "" }); }} title="未完に戻す" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 3, border: "1px solid #fdba74", background: "#ffedd5", cursor: "pointer", transition: "background 0.15s" }}
                                      onMouseOver={e => e.currentTarget.style.background = "#fed7aa"}
                                      onMouseOut={e => e.currentTarget.style.background = "#ffedd5"}>
                                      <IconUndo size={12} color="#ea580c" />
                                    </button>
                                  )}
                                  <button onClick={e => { e.stopPropagation(); onSave({ ...t, result: "キャンセル", person: "" }); }} title="キャンセルして未定に戻す" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 3, border: "1px solid #fca5a5", background: "#fee2e2", cursor: "pointer", transition: "background 0.15s" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#fecaca"}
                                    onMouseOut={e => e.currentTarget.style.background = "#fee2e2"}>
                                    <IconBack size={12} color="#ef4444" />
                                  </button>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
                                  <button onClick={e => { e.stopPropagation(); onEdit(t); }} title="詳細編集" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 3, border: "1px solid #cbd5e1", background: "#f8fafc", cursor: "pointer", transition: "background 0.15s" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#e2e8f0"}
                                    onMouseOut={e => e.currentTarget.style.background = "#f8fafc"}>
                                    <IconEdit size={12} color="#475569" />
                                  </button>
                                  <button onClick={e => { e.stopPropagation(); setMoveTicket(t); }} title="移動" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 3, border: "1px solid #cbd5e1", background: "#f8fafc", cursor: "pointer", transition: "background 0.15s" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#e2e8f0"}
                                    onMouseOut={e => e.currentTarget.style.background = "#f8fafc"}>
                                    <IconTransfer size={12} color="#64748b" />
                                  </button>
                                  <button onClick={e => { e.stopPropagation(); onDelete(t.id); }} title="削除" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 3, border: "1px solid #fca5a5", background: "#fee2e2", cursor: "pointer", transition: "background 0.15s" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#fecaca"}
                                    onMouseOut={e => e.currentTarget.style.background = "#fee2e2"}>
                                    <IconTrash size={12} />
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {dragId && (
                        <tr
                          onDragOver={(e) => { e.preventDefault(); setDragOver(`end_${w.id}`); }}
                          onDragLeave={() => setDragOver(null)}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (dragId && onReorder) {
                              onReorder(dateStr, String(w.id), dragId, "end");
                            }
                            setDragOver(null); setDragId(null);
                          }}
                        >
                          <td colSpan={cols.length + 2} style={{ height: 16, borderTop: dragOver === `end_${w.id}` ? "3px solid #2563eb" : "none", transition: "border-top 0.1s" }} />
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- Processing Pool ---
function ProcessingPool({ tickets, workers, onEdit, onDelete, onAssign }) {
  const poolTickets = tickets.filter(t => !t.date);
  const [search, setSearch] = useState("");
  const [assignTicket, setAssignTicket] = useState(null);
  const [assignDate, setAssignDate] = useState("");
  const [assignWorker, setAssignWorker] = useState("");

  const filtered = poolTickets.filter(t => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (t.requestNo || "").toLowerCase().includes(s) || (t.unit || "").toLowerCase().includes(s) || (t.property || "").toLowerCase().includes(s) || (t.type || "").toLowerCase().includes(s);
  });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <IconPool size={20} color="#1e40af" />
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#1e293b" }}>Processing Pool</h2>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#64748b" }}>{poolTickets.length}件</span>
        </div>
        <button onClick={() => { const t = emptyTicket(); t.date = ""; onEdit(t); }} style={{ padding: "6px 16px", borderRadius: 4, border: "none", background: "#1e40af", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
          <IconPlus size={12} color="#fff" /> 新規追加
        </button>
      </div>

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, padding: "8px 12px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        <input type="text" placeholder="依頼番号・号機・物件名で検索..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, border: "none", background: "transparent", fontSize: 12, outline: "none" }} />
        {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 14 }}>×</button>}
      </div>

      {/* Assign modal */}
      {assignTicket && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000 }} onClick={() => setAssignTicket(null)}>
          <div style={{ background: "#fff", borderRadius: 8, padding: 24, width: 340, boxShadow: "0 16px 48px rgba(0,0,0,0.25)" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
              <IconCalendar size={16} color="#1e40af" /> スケジュールに配置
            </h3>
            <p style={{ fontSize: 11, color: "#64748b", margin: "0 0 14px" }}>{assignTicket.type} / {assignTicket.property}</p>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#64748b", display: "block", marginBottom: 3 }}>日付</label>
              <input type="date" value={assignDate} onChange={e => setAssignDate(e.target.value)}
                style={{ width: "100%", padding: "6px 8px", border: "1px solid #d1d5db", borderRadius: 4, fontSize: 12, boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#64748b", display: "block", marginBottom: 3 }}>対応者（任意）</label>
              <select value={assignWorker} onChange={e => setAssignWorker(e.target.value)}
                style={{ width: "100%", padding: "6px 8px", border: "1px solid #d1d5db", borderRadius: 4, fontSize: 12 }}>
                <option value="">未定</option>
                {workers.map(w => <option key={w.id} value={String(w.id)}>{w.name}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => setAssignTicket(null)} style={{ padding: "6px 14px", borderRadius: 4, border: "1px solid #d1d5db", background: "#fff", fontSize: 11, cursor: "pointer" }}>キャンセル</button>
              <button onClick={() => {
                if (!assignDate) return;
                onAssign(assignTicket.id, assignDate, assignWorker);
                setAssignTicket(null); setAssignDate(""); setAssignWorker("");
              }} disabled={!assignDate} style={{ padding: "6px 18px", borderRadius: 4, border: "none", background: assignDate ? "#1e40af" : "#94a3b8", color: "#fff", fontSize: 11, fontWeight: 700, cursor: assignDate ? "pointer" : "not-allowed" }}>配置</button>
            </div>
          </div>
        </div>
      )}

      {/* Pool cards */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
          <IconPool size={40} color="#cbd5e1" />
          <p style={{ fontSize: 13, marginTop: 10 }}>{search ? "検索結果がありません" : "Poolにチケットはありません"}</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          {filtered.map(t => {
            const tc = typeColors[t.type] || typeColors["その他"];
            const w = workers.find(x => String(x.id) === t.person);
            return (
              <div key={t.id} style={{ border: "1px solid #e2e8f0", borderRadius: 6, background: "#fff", overflow: "hidden", display: "flex" }}>
                <div style={{ width: 4, background: tc.badge, flexShrink: 0 }} />
                <div style={{ flex: 1, padding: "8px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 3, background: tc.bg, color: tc.text, fontWeight: 700 }}>{t.type}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.property || "未設定"}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "#64748b", marginBottom: 6 }}>
                    {t.requestNo && <span style={{ background: "#f1f5f9", padding: "1px 5px", borderRadius: 2 }}>{t.requestNo}</span>}
                    {t.unit && <span>号機:{t.unit}</span>}
                    {t.work && <span>{t.work}</span>}
                    {w && <span style={{ color: w.color, fontWeight: 600 }}>{w.name}</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <button onClick={() => { setAssignTicket(t); setAssignDate(""); setAssignWorker(t.person || ""); }} title="配置" style={{ display: "flex", alignItems: "center", gap: 3, padding: "3px 8px", borderRadius: 4, border: "1px solid #2563eb", background: "#eff6ff", color: "#2563eb", fontSize: 10, fontWeight: 700, cursor: "pointer", transition: "background 0.15s" }}
                      onMouseOver={e => e.currentTarget.style.background = "#dbeafe"}
                      onMouseOut={e => e.currentTarget.style.background = "#eff6ff"}>
                      <IconCalendar size={11} color="#2563eb" /> 配置
                    </button>
                    <button onClick={() => onEdit(t)} title="編集" style={{ background: "none", border: "none", cursor: "pointer", padding: "3px", display: "flex", borderRadius: 3, transition: "background 0.15s" }}
                      onMouseOver={e => e.currentTarget.style.background = "#dbeafe"}
                      onMouseOut={e => e.currentTarget.style.background = "none"}>
                      <IconEdit size={13} />
                    </button>
                    <button onClick={() => onDelete(t.id)} title="削除" style={{ background: "none", border: "none", cursor: "pointer", padding: "3px", display: "flex", borderRadius: 3, transition: "background 0.15s" }}
                      onMouseOver={e => e.currentTarget.style.background = "#fee2e2"}
                      onMouseOut={e => e.currentTarget.style.background = "none"}>
                      <IconTrash size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// --- Detail Modal (read-only) ---
function TicketDetailModal({ ticket, workers, onClose, onEdit, onDelete }) {
  const tc = typeColors[ticket.type] || typeColors["その他"];
  const w = workers.find(x => String(x.id) === ticket.person);
  const d = new Date(ticket.date + "T00:00:00");
  const dow = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  const labelStyle = { fontSize: 10, fontWeight: 700, color: "#64748b", marginBottom: 2 };
  const valStyle = { fontSize: 13, fontWeight: 500, color: "#1e293b", minHeight: 20, padding: "4px 8px", background: "#f8fafc", borderRadius: 4, wordBreak: "break-all" };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 10, padding: 0, width: 620, maxHeight: "85vh", overflowY: "auto", boxShadow: "0 16px 48px rgba(0,0,0,0.25)" }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ background: tc.bg, borderRadius: "10px 10px 0 0", padding: "16px 22px", borderBottom: `3px solid ${tc.badge}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: tc.text, padding: "3px 12px", background: tc.badge, borderRadius: 4 }}>{ticket.type || "未設定"}</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#1e293b" }}>{ticket.property || "物件名なし"}</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#94a3b8", lineHeight: 1 }}>✕</button>
        </div>

        <div style={{ padding: "18px 22px" }}>
          {/* Date + Worker */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, padding: "10px 14px", background: "#f1f5f9", borderRadius: 6 }}>
            <div>
              <div style={labelStyle}><IconCalendar size={10} color="#64748b" /> 日付</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>{d.getFullYear()}年{d.getMonth() + 1}月{d.getDate()}日（{dow}）</div>
            </div>
            <div style={{ width: 1, height: 32, background: "#d1d5db" }} />
            <div>
              <div style={labelStyle}><IconPerson size={10} color="#64748b" /> 対応者</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {w && <span style={{ width: 22, height: 22, borderRadius: "50%", background: w.color, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800 }}>{typeof w.id === "string" ? w.name?.charAt(0) : w.id}</span>}
                <span style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>{w ? w.name : "未割当"}</span>
              </div>
            </div>
            {ticket.result && (
              <>
                <div style={{ width: 1, height: 32, background: "#d1d5db" }} />
                <div>
                  <div style={labelStyle}><IconClipboard size={10} color="#64748b" /> 結果</div>
                  <span style={{ padding: "3px 10px", borderRadius: 4, fontSize: 12, fontWeight: 700, background: resultColors[ticket.result] || "#e2e8f0", color: "#1e293b" }}>{ticket.result}</span>
                </div>
              </>
            )}
          </div>

          {/* Main info grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px 14px", marginBottom: 16 }}>
            {[
              { label: "BOX", val: ticket.box },
              { label: "号機", val: ticket.unit },
              { label: "種別", val: ticket.category },
              { label: "時間指定", val: ticket.time },
              { label: "エリア", val: ticket.area },
              { label: "県別", val: ticket.prefecture },
              { label: "移動", val: ticket.travel },
              { label: "同行者", val: ticket.companion },
              { label: "依頼番号", val: ticket.requestNo },
              { label: "TIME", val: ticket.timeSlot },
              { label: "コース", val: ticket.course },
            ].map(({ label, val }) => (
              <div key={label}>
                <div style={labelStyle}>{label}</div>
                <div style={valStyle}>{val || "—"}</div>
              </div>
            ))}
          </div>

          {/* Work content (full width) */}
          <div style={{ marginBottom: 16 }}>
            <div style={labelStyle}><IconWrench size={10} color="#64748b" /> 作業内容</div>
            <div style={{ ...valStyle, fontSize: 14, minHeight: 48, lineHeight: "22px", whiteSpace: "pre-wrap" }}>{ticket.work || "—"}</div>
          </div>

          {/* Notes */}
          {ticket.notes && (
            <div style={{ marginBottom: 16 }}>
              <div style={labelStyle}><IconNote size={10} color="#64748b" /> 備考</div>
              <div style={{ ...valStyle, minHeight: 32, lineHeight: "20px", whiteSpace: "pre-wrap" }}>{ticket.notes}</div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 14, borderTop: "1px solid #e5e7eb" }}>
            <button onClick={() => { onClose(); onDelete(ticket.id); }} style={{ padding: "7px 16px", borderRadius: 4, border: "1px solid #fca5a5", background: "#fff", color: "#dc2626", fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><IconTrash size={13} color="#dc2626" /> 削除</button>
            <button onClick={() => { onClose(); onEdit(ticket); }} style={{ padding: "7px 20px", borderRadius: 4, border: "none", background: "#1e40af", color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><IconEdit size={13} color="#fff" /> 編集</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Form Modal ---
function TicketFormModal({ ticket, onSave, onClose, isNew, workers }) {
  const [form, setForm] = useState({ ...ticket });
  const set = (k, v) => {
    if (k === "faultCategory") {
      const level = FAULT_LEVEL_MAP[v] || "";
      setForm(p => ({ ...p, [k]: v, faultLevel: level }));
    } else if (k === "responseDate" && v) {
      setForm(p => ({ ...p, [k]: v, date: v }));
    } else {
      setForm(p => ({ ...p, [k]: v }));
    }
  };

  // Supabase equipment lookup
  useEffect(() => {
    // 号機（unit）が数値のみ、かつ1〜9桁の場合のみ検索を実行
    const unitVal = form.unit?.trim() || "";
    if (!/^\d{1,9}$/.test(unitVal)) return;

    const timer = setTimeout(async () => {
      // RLS修正後・API検証済みのカラム名:
      // テーブル名: "Equipment" (大文字)
      // 検索キー: "Machine number"
      // 取得カラム: "Property name" (物件名), "prefectures" (県別), "address" (エリア)
      const { data, error } = await supabase
        .from("Equipment")
        .select('*') // 全カラム取得して確実にマッチさせる
        .eq("Machine number", parseInt(unitVal, 10))
        .maybeSingle();

      if (!error && data) {
        const rawAddr = data.address || "";
        const rawPref = (data.prefectures || "").replace(/[都道府県]$/, ""); // プルダウン値に合わせる
        setForm(p => ({
          ...p,
          property: data["Property name"] || p.property,
          prefecture: rawPref || p.prefecture,
          area: formatArea(rawAddr, data.prefectures) || p.area
        }));
      } else if (error) {
        console.error("Equipment lookup error:", error);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [form.unit]);
  const iStyle = { width: "100%", padding: "5px 7px", border: "1px solid #d1d5db", borderRadius: 3, fontSize: 11, boxSizing: "border-box", background: "#fff" };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 8, padding: 22, width: 640, maxHeight: "85vh", overflowY: "auto", boxShadow: "0 16px 48px rgba(0,0,0,0.25)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1e293b" }}>{isNew ? "新規チケット" : "チケット編集"}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#94a3b8" }}>✕</button>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 10, fontWeight: 600, color: "#64748b" }}>日付</label>
          <input type="date" value={form.date} onChange={e => set("date", e.target.value)} style={{ ...iStyle, fontSize: 12 }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px 10px" }}>
          {ALL_COLS.map(c => (
            <div key={c.key}>
              <label style={{ fontSize: 10, fontWeight: 600, color: c.key === "faultLevel" && form.faultLevel ? FAULT_LEVEL_COLORS[form.faultLevel] : "#64748b" }}>
                {c.label}{c.key === "faultLevel" && form.faultLevel ? ` (${form.faultLevel})` : ""}
              </label>
              {c.key === "person" || c.key === "companion" ? (
                <select value={form[c.key]} onChange={e => set(c.key, e.target.value)} style={iStyle}>
                  <option value="">—</option>
                  {workers.map(w => <option key={w.id} value={String(w.id)}>{w.name}</option>)}
                </select>
              ) : c.key === "faultLevel" ? (
                <input type="text" value={form.faultLevel || ""} readOnly style={{ ...iStyle, background: form.faultLevel ? (FAULT_LEVEL_COLORS[form.faultLevel] || "#f1f5f9") : "#f9fafb", color: form.faultLevel ? "#fff" : "#94a3b8", fontWeight: 700, textAlign: "center" }} />
              ) : c.type === "date" ? (
                <input type="date" value={form[c.key] || ""} onChange={e => set(c.key, e.target.value)} style={iStyle} />
              ) : c.type === "select" ? (
                <select value={form[c.key] || ""} onChange={e => set(c.key, e.target.value)} style={iStyle}>
                  <option value="">—</option>
                  {c.options.map(o => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input type="text" value={form[c.key] || ""} onChange={e => set(c.key, e.target.value)}
                  onBlur={e => {
                    if (c.key === "time" && e.target.value.includes("：")) {
                      alert("コロンは半角指定です");
                      const val = e.target.value.split("：").join("");
                      set(c.key, val);
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === "Enter" && c.key === "time" && e.currentTarget.value.includes("：")) {
                      alert("コロンは半角指定です");
                      const val = e.currentTarget.value.split("：").join("");
                      set(c.key, val);
                    }
                  }}
                  style={iStyle}
                  maxLength={c.key === "unit" ? 9 : (c.key === "requestNo" ? 11 : undefined)}
                  placeholder={c.key === "unit" ? "数字1〜9桁" : (c.key === "requestNo" ? "数字11桁" : "")}
                />
              )}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 18, paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
          <button onClick={onClose} style={{ padding: "6px 16px", borderRadius: 4, border: "1px solid #d1d5db", background: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>キャンセル</button>
          <button onClick={() => {
            // 保存前の最終バリデーション
            if (form.unit && !/^\d{1,9}$/.test(form.unit.trim())) {
              alert("号機は半角数字1桁〜9桁で入力してください。");
              return;
            }
            if (form.requestNo && form.requestNo.trim() !== "" && !/^\d{11}$/.test(form.requestNo.trim())) {
              alert("依頼番号は半角数字11桁固定で入力してください。");
              return;
            }
            onSave(form);
          }} style={{ padding: "6px 20px", borderRadius: 4, border: "none", background: "#1e40af", color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>保存</button>
        </div>
      </div>
    </div>
  );
}

// --- Admin Modal (Type & Worker master + sche_role) ---
function AdminModal({ types, workers, onSaveTypes, onSaveWorkers, onClose }) {
  const [tab, setTab] = useState("types");

  // Type master state
  const [typeList, setTypeList] = useState(types.map(t => ({ name: t, color: typeColors[t] || DEFAULT_TYPE_COLORS["その他"] })));
  const [newTypeName, setNewTypeName] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(0);

  // Worker master state
  const [workerList, setWorkerList] = useState(workers.map(w => ({ ...w, sche_role: w.sche_role || "worker" })));
  const [newWorkerEmail, setNewWorkerEmail] = useState("");
  const [emailSearchResult, setEmailSearchResult] = useState(null);
  const [emailSearching, setEmailSearching] = useState(false);
  const workerColors = ["#2563eb", "#dc2626", "#16a34a", "#9333ea", "#ca8a04", "#0891b2", "#be123c", "#7c3aed", "#b45309", "#0d9488"];

  const [editingTypeIdx, setEditingTypeIdx] = useState(null);
  const [editingWorkerId, setEditingWorkerId] = useState(null);
  const [newWorkerName, setNewWorkerName] = useState("");

  // Equipment master state
  const [eqMachine, setEqMachine] = useState("");
  const [eqProp, setEqProp] = useState("");
  const [eqPref, setEqPref] = useState("");
  const [eqAddr, setEqAddr] = useState("");
  const [eqAdding, setEqAdding] = useState(false);
  const [eqMsg, setEqMsg] = useState(null);

  const SCHE_ROLES = ["admin", "worker", "viewer"];
  const SCHE_ROLE_LABELS = { admin: "管理者", worker: "対応者", viewer: "閲覧者" };
  const SCHE_ROLE_COLORS = { admin: "#dc2626", worker: "#2563eb", viewer: "#64748b" };

  const addType = () => {
    if (editingTypeIdx !== null) {
      if (!newTypeName.trim()) { alert("タイプ名を入力してください"); return; }
      if (typeList.some((t, i) => i !== editingTypeIdx && t.name === newTypeName.trim())) { alert("同名のタイプが存在します"); return; }
      const n = [...typeList];
      n[editingTypeIdx] = { name: newTypeName.trim(), color: TYPE_COLOR_PRESETS[selectedPreset] };
      setTypeList(n);
      setEditingTypeIdx(null);
    } else {
      if (!newTypeName.trim()) return;
      if (typeList.some(t => t.name === newTypeName.trim())) { alert("同名のタイプが存在します"); return; }
      setTypeList([...typeList, { name: newTypeName.trim(), color: TYPE_COLOR_PRESETS[selectedPreset] }]);
    }
    setNewTypeName("");
  };
  const removeType = (idx) => { setTypeList(typeList.filter((_, i) => i !== idx)); };

  // メールアドレスで profiles を検索
  const searchByEmail = async () => {
    if (!newWorkerEmail.trim()) return;
    setEmailSearching(true);
    setEmailSearchResult(null);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, display_name")
      .eq("email", newWorkerEmail.trim())
      .maybeSingle();
    setEmailSearching(false);
    if (error) {
      setEmailSearchResult({ found: false, message: "検索エラー: " + error.message });
    } else if (!data) {
      setEmailSearchResult({ found: false, message: "このメールアドレスは登録されていません" });
    } else if (workerList.some(w => w.id === data.id)) {
      setEmailSearchResult({ found: false, message: `${data.display_name || data.email} は既に対応者として登録されています` });
    } else {
      setEmailSearchResult({ found: true, profile: data });
    }
  };

  // メール確認後に対応者を追加
  const addWorkerFromProfile = async () => {
    if (!emailSearchResult || !emailSearchResult.found) return;
    const profile = emailSearchResult.profile;
    // Supabase の sche_role を worker に設定
    await supabase.from("profiles").update({ sche_role: "worker" }).eq("id", profile.id);
    const newW = {
      id: profile.id,
      name: profile.display_name || profile.email,
      color: workerColors[workerList.length % workerColors.length],
      sche_role: "worker",
      email: profile.email
    };
    setWorkerList([...workerList, newW]);
    setNewWorkerEmail("");
    setEmailSearchResult(null);
  };

  // 既存対応者の名前編集
  const updateWorkerName = () => {
    if (editingWorkerId !== null && newWorkerName.trim()) {
      setWorkerList(workerList.map(w => w.id === editingWorkerId ? { ...w, name: newWorkerName.trim() } : w));
      setEditingWorkerId(null);
      setNewWorkerName("");
    }
  };

  // sche_role 変更
  const changeRole = async (workerId, newRole) => {
    await supabase.from("profiles").update({ sche_role: newRole }).eq("id", workerId);
    setWorkerList(workerList.map(w => w.id === workerId ? { ...w, sche_role: newRole } : w));
  };

  // 対応者削除（sche_role を null に）
  const removeWorker = async (id) => {
    if (!confirm("この対応者を削除しますか？")) return;
    await supabase.from("profiles").update({ sche_role: null }).eq("id", id);
    setWorkerList(workerList.filter(x => x.id !== id));
  };

  // 号機追加
  const addEquipment = async () => {
    if (!eqMachine.trim() || !eqProp.trim() || !eqPref.trim() || !eqAddr.trim()) {
      setEqMsg({ error: true, text: "すべての項目を入力してください" });
      return;
    }
    setEqAdding(true);
    const { error } = await supabase.from('Equipment').insert([{
      "Machine number": Number(eqMachine),
      "Property name": eqProp.trim(),
      "prefectures": eqPref.trim(),
      "address": eqAddr.trim()
    }]);
    setEqAdding(false);
    if (error) {
      setEqMsg({ error: true, text: `追加失敗: ${error.message}` });
    } else {
      setEqMsg({ error: false, text: `号機 ${eqMachine} を追加しました！` });
      setEqMachine(""); setEqProp(""); setEqPref(""); setEqAddr("");
    }
  };

  const save = () => {
    if (tab === "types") {
      const names = typeList.map(t => t.name);
      typeList.forEach(t => { typeColors[t.name] = t.color; });
      onSaveTypes(names);
    } else {
      onSaveWorkers(workerList);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 8, padding: 22, width: 540, maxHeight: "80vh", display: "flex", flexDirection: "column", boxShadow: "0 16px 48px rgba(0,0,0,0.25)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: 6 }}><IconGear size={16} color="#1e293b" /> 管理者設定</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#94a3b8" }}>✕</button>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 16, borderBottom: "1px solid #e2e8f0" }}>
          <button onClick={() => setTab("types")} style={{ padding: "8px 12px", border: "none", background: "none", cursor: "pointer", fontWeight: tab === "types" ? 700 : 500, color: tab === "types" ? "#1e40af" : "#64748b", borderBottom: tab === "types" ? "2px solid #1e40af" : "2px solid transparent" }}>タイプマスタ</button>
          <button onClick={() => setTab("workers")} style={{ padding: "8px 12px", border: "none", background: "none", cursor: "pointer", fontWeight: tab === "workers" ? 700 : 500, color: tab === "workers" ? "#1e40af" : "#64748b", borderBottom: tab === "workers" ? "2px solid #1e40af" : "2px solid transparent" }}>対応者管理</button>
          <button onClick={() => setTab("equipment")} style={{ padding: "8px 12px", border: "none", background: "none", cursor: "pointer", fontWeight: tab === "equipment" ? 700 : 500, color: tab === "equipment" ? "#1e40af" : "#64748b", borderBottom: tab === "equipment" ? "2px solid #1e40af" : "2px solid transparent" }}>号機管理</button>
        </div>

        <div style={{ overflowY: "auto", flex: 1, paddingRight: 4 }}>
          {tab === "types" && (
            <>
              {typeList.map((t, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <span style={{ padding: "2px 10px", borderRadius: 3, fontSize: 11, fontWeight: 700, background: t.color.badge, color: t.color.text }}>{t.name}</span>
                  <div style={{ display: "flex", gap: 2, flex: 1 }}>
                    {TYPE_COLOR_PRESETS.map((p, pi) => (
                      <button key={pi} onClick={() => { const n = [...typeList]; n[idx] = { ...n[idx], color: p }; setTypeList(n); }}
                        style={{ width: 16, height: 16, borderRadius: "50%", border: t.color.badge === p.badge ? "2px solid #1e293b" : "1px solid #e2e8f0", background: p.badge, cursor: "pointer" }} />
                    ))}
                  </div>
                  <button onClick={() => { setEditingTypeIdx(idx); setNewTypeName(t.name); setSelectedPreset(TYPE_COLOR_PRESETS.findIndex(p => p.badge === t.color.badge) || 0); }} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", color: "#64748b" }}><IconEdit size={13} /></button>
                  <button onClick={() => removeType(idx)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px" }}><IconTrash size={13} color="#ef4444" /></button>
                </div>
              ))}
              <div style={{ display: "flex", gap: 6, margin: "12px 0 6px", alignItems: "center" }}>
                <input value={newTypeName} onChange={e => setNewTypeName(e.target.value)} onKeyDown={e => e.key === "Enter" && addType()} placeholder="タイプ名..." style={{ flex: 1, padding: "5px 8px", border: "1px solid #d1d5db", borderRadius: 3, fontSize: 11 }} />
                <div style={{ display: "flex", gap: 2 }}>
                  {TYPE_COLOR_PRESETS.map((p, pi) => (
                    <button key={pi} onClick={() => setSelectedPreset(pi)}
                      style={{ width: 14, height: 14, borderRadius: "50%", border: selectedPreset === pi ? "2px solid #1e293b" : "1px solid #d1d5db", background: p.badge, cursor: "pointer" }} />
                  ))}
                </div>
                {editingTypeIdx !== null && <button onClick={() => { setEditingTypeIdx(null); setNewTypeName(""); }} style={{ padding: "5px 8px", borderRadius: 3, border: "1px solid #d1d5db", background: "#f8fafc", color: "#64748b", fontSize: 11, cursor: "pointer" }}>キャンセル</button>}
                <button onClick={addType} style={{ padding: "5px 12px", borderRadius: 3, border: "none", background: "#1e40af", color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{editingTypeIdx !== null ? "更新" : "追加"}</button>
              </div>
            </>
          )}

          {tab === "workers" && (
            <>
              {/* 対応者一覧（sche_role 付き） */}
              {workerList.map(w => (
                <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: w.color, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800 }}>{typeof w.id === "string" ? w.name?.charAt(0) : w.id}</span>
                  {editingWorkerId === w.id ? (
                    <>
                      <input value={newWorkerName} onChange={e => setNewWorkerName(e.target.value)} onKeyDown={e => e.key === "Enter" && updateWorkerName()} style={{ flex: 1, padding: "3px 6px", border: "1px solid #93c5fd", borderRadius: 3, fontSize: 11 }} />
                      <button onClick={updateWorkerName} style={{ padding: "3px 8px", borderRadius: 3, border: "none", background: "#1e40af", color: "#fff", fontSize: 10, cursor: "pointer" }}>OK</button>
                      <button onClick={() => { setEditingWorkerId(null); setNewWorkerName(""); }} style={{ padding: "3px 8px", borderRadius: 3, border: "1px solid #d1d5db", background: "#f8fafc", color: "#64748b", fontSize: 10, cursor: "pointer" }}>×</button>
                    </>
                  ) : (
                    <>
                      <span style={{ flex: 1, fontSize: 12, fontWeight: 600 }}>{w.name}</span>
                      <select value={w.sche_role || "worker"} onChange={e => changeRole(w.id, e.target.value)}
                        style={{ padding: "2px 4px", border: "1px solid #d1d5db", borderRadius: 3, fontSize: 10, color: SCHE_ROLE_COLORS[w.sche_role || "worker"], fontWeight: 700 }}>
                        {SCHE_ROLES.map(r => <option key={r} value={r}>{SCHE_ROLE_LABELS[r]}</option>)}
                      </select>
                      <button onClick={() => { setEditingWorkerId(w.id); setNewWorkerName(w.name); }} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", color: "#64748b" }}><IconEdit size={13} /></button>
                      <button onClick={() => removeWorker(w.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", padding: "2px" }}><IconTrash size={13} color="#ef4444" /></button>
                    </>
                  )}
                </div>
              ))}

              {/* 対応者追加（メール確認） */}
              <div style={{ margin: "14px 0 6px", padding: "10px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 6 }}>対応者を追加（メールアドレスで検索）</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <input value={newWorkerEmail} onChange={e => setNewWorkerEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && searchByEmail()}
                    placeholder="email@example.com" style={{ flex: 1, padding: "5px 8px", border: "1px solid #d1d5db", borderRadius: 3, fontSize: 11 }} />
                  <button onClick={searchByEmail} disabled={emailSearching}
                    style={{ padding: "5px 12px", borderRadius: 3, border: "none", background: "#475569", color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer", opacity: emailSearching ? 0.6 : 1 }}>
                    {emailSearching ? "検索中..." : "検索"}
                  </button>
                </div>
                {emailSearchResult && (
                  <div style={{ marginTop: 8 }}>
                    {emailSearchResult.found ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", background: "#dcfce7", borderRadius: 4 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: "#166534", flex: 1 }}>
                          {emailSearchResult.profile.display_name || emailSearchResult.profile.email} を追加しますか？
                        </span>
                        <button onClick={addWorkerFromProfile}
                          style={{ padding: "4px 12px", borderRadius: 3, border: "none", background: "#16a34a", color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>追加</button>
                      </div>
                    ) : (
                      <div style={{ fontSize: 11, color: "#dc2626", padding: "4px 0" }}>{emailSearchResult.message}</div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {tab === "equipment" && (
            <div style={{ padding: "10px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 12 }}>新規号機の追加</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ fontSize: 10, fontWeight: 700, color: "#64748b", display: "block", marginBottom: 4 }}>号機 (Machine number)</label>
                  <input type="number" value={eqMachine} onChange={e => setEqMachine(e.target.value)}
                    placeholder="例: 1234" style={{ width: "100%", padding: "6px 8px", border: "1px solid #d1d5db", borderRadius: 4, fontSize: 12, boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 10, fontWeight: 700, color: "#64748b", display: "block", marginBottom: 4 }}>物件名 (Property name)</label>
                  <input type="text" value={eqProp} onChange={e => setEqProp(e.target.value)}
                    placeholder="例: フルタイムレジデンス" style={{ width: "100%", padding: "6px 8px", border: "1px solid #d1d5db", borderRadius: 4, fontSize: 12, boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 10, fontWeight: 700, color: "#64748b", display: "block", marginBottom: 4 }}>県別 (prefectures)</label>
                  <input type="text" value={eqPref} onChange={e => setEqPref(e.target.value)}
                    placeholder="例: 東京都" style={{ width: "100%", padding: "6px 8px", border: "1px solid #d1d5db", borderRadius: 4, fontSize: 12, boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 10, fontWeight: 700, color: "#64748b", display: "block", marginBottom: 4 }}>エリア (address)</label>
                  <input type="text" value={eqAddr} onChange={e => setEqAddr(e.target.value)}
                    placeholder="例: 千代田区" style={{ width: "100%", padding: "6px 8px", border: "1px solid #d1d5db", borderRadius: 4, fontSize: 12, boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 11, color: eqMsg?.error ? "#dc2626" : "#16a34a", fontWeight: 600 }}>{eqMsg?.text}</div>
                <button onClick={addEquipment} disabled={eqAdding}
                  style={{ padding: "6px 20px", borderRadius: 4, border: "none", background: "#1e40af", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", opacity: eqAdding ? 0.6 : 1 }}>
                  {eqAdding ? "追加中..." : "追加"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 12, borderTop: "1px solid #e5e7eb", marginTop: 10 }}>
          <button onClick={onClose} style={{ padding: "6px 14px", borderRadius: 3, border: "1px solid #d1d5db", background: "#fff", fontSize: 11, cursor: "pointer" }}>キャンセル</button>
          <button onClick={save} style={{ padding: "6px 18px", borderRadius: 3, border: "none", background: "#1e40af", color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>保存</button>
        </div>
      </div>
    </div>
  );
}

// --- Legend ---
function Legend({ workers }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", padding: "6px 0" }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: "#64748b" }}>対応者:</span>
      {workers.map(w => (
        <span key={w.id} style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10 }}>
          <span style={{ width: 14, height: 14, borderRadius: "50%", background: w.color, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 800 }}>{typeof w.id === "string" ? w.name?.charAt(0) : w.id}</span>
          <span style={{ color: "#475569", fontWeight: 600 }}>{w.name}</span>
        </span>
      ))}
      <div style={{ width: 1, height: 14, background: "#e2e8f0", margin: "0 4px" }} />
      <span style={{ fontSize: 10, fontWeight: 700, color: "#64748b" }}>タイプ:</span>
      {Object.entries(typeColors).map(([k, v]) => (
        <span key={k} style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: v.bg, color: v.text, fontWeight: 700, border: `1px solid ${v.badge}` }}>{k}</span>
      ))}
    </div>
  );
}
// --- Login Screen ---
function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'email profile',
        // 末尾のスラッシュなどを省き、Supabaseの許可URLと厳密に一致させるための処理
        redirectTo: window.location.origin.replace(/\/$/, '')
      }
    });
    if (error) {
      alert("ログインエラー: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
      <div style={{ background: "#fff", padding: "40px 32px", borderRadius: 12, boxShadow: "0 10px 25px rgba(0,0,0,0.05)", textAlign: "center", maxWidth: 400, width: "100%" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1e293b", margin: "0 0 12px" }}>Schedule System</h1>
        <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 32px" }}>Microsoft アカウントでサインインしてください</p>
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ width: "100%", padding: "12px", background: "#fff", color: "#333", border: "1px solid #c8c8c8", borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
        >
          {loading ? "接続中..." : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
              </svg>
              <span>Microsoft アカウントでログイン</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
// --- Main App ---
export default function App() {
  const now = new Date();
  const [workers, setWorkers] = useState(INITIAL_WORKERS);
  const [tickets, setTickets] = useState(() => generateSampleData(INITIAL_WORKERS));
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [view, setView] = useState("monthly");
  const [selectedDate, setSelectedDate] = useState(null);
  const [editTicket, setEditTicket] = useState(null);
  const [viewingTicket, setViewingTicket] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [types, setTypes] = useState(() => [...TYPES]);
  const [filterType, setFilterType] = useState("");
  const [filterWorker, setFilterWorker] = useState("");
  const [search, setSearch] = useState("");
  const [vacations, setVacations] = useState({}); // {dateStr: Set<workerId> }
  const [workerActionMenu, setWorkerActionMenu] = useState(null);
  const [moveAllMenu, setMoveAllMenu] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [session, setSession] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Auth observer
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsInitializing(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Fetch workers from Supabase (sche_role ベース)
    const fetchWorkers = async () => {
      // sche_role が設定されたメンバーを取得（worker, admin）
      // sche_role が null ではない = スケジュール管理の対応者
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, display_name, sche_role")
        .not("sche_role", "is", null);

      if (!error && data && data.length > 0) {
        const colors = ["#2563eb", "#dc2626", "#16a34a", "#9333ea", "#ca8a04", "#0891b2", "#be123c", "#7c3aed"];
        const fetched = data.map((d, i) => ({
          id: d.id,
          name: d.display_name || d.email || "Unknown",
          color: colors[i % colors.length],
          sche_role: d.sche_role,
          email: d.email
        }));
        setWorkers(fetched);
      } else if (error) {
        console.error("Fetch workers error:", error);
      }
    };
    fetchWorkers();

    window.onWorkerMenu = (x, y, workerId, workerName, dateStr) => {
      setWorkerActionMenu({ x, y, workerId, workerName, dateStr });
    };
    return () => {
      delete window.onWorkerMenu;
      subscription.unsubscribe();
    };
  }, []);

  // Update isAdmin based on session and worker list
  useEffect(() => {
    if (session && workers.length > 0) {
      const myProfile = workers.find(w => w.email === session?.user?.email);
      setIsAdmin(myProfile?.sche_role === 'admin');
    } else {
      setIsAdmin(false);
    }
  }, [session, workers]);

  const handleMoveAll = useCallback((dateStr, fromWorkerId, toWorkerId) => {
    setTickets(prev => prev.map(t => (t.date === dateStr && t.person === fromWorkerId) ? { ...t, person: toWorkerId } : t));
  }, []);

  const toggleVacation = useCallback((dateStr, workerId) => {
    setVacations(prev => {
      const next = { ...prev };
      const set = new Set(next[dateStr] || []);
      if (set.has(workerId)) set.delete(workerId); else set.add(workerId);
      next[dateStr] = set;
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    return tickets.filter(t => {
      if (filterType && t.type !== filterType) return false;
      if (filterWorker && t.person !== filterWorker) return false;
      if (search) { const s = search.toLowerCase(); return Object.values(t).some(v => typeof v === "string" && v.toLowerCase().includes(s)); }
      return true;
    });
  }, [tickets, filterType, filterWorker, search]);

  const monthTickets = useMemo(() => {
    const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
    return filtered.filter(t => t.date.startsWith(prefix));
  }, [filtered, year, month]);

  const stats = useMemo(() => ({
    total: monthTickets.length,
    done: monthTickets.filter(t => t.result === "完了").length,
    pending: monthTickets.filter(t => !t.result).length,
  }), [monthTickets]);

  const handleSave = useCallback(ticket => {
    setTickets(prev => { const i = prev.findIndex(t => t.id === ticket.id); if (i >= 0) { const n = [...prev]; n[i] = ticket; return n; } return [...prev, ticket]; });
    setEditTicket(null); setIsNew(false);
  }, []);
  const handleDelete = useCallback(id => { setTickets(prev => prev.filter(t => t.id !== id)); }, []);
  const todayStr = fmtDate(now.getFullYear(), now.getMonth(), now.getDate());
  const handleAdd = useCallback(dateStr => { const t = emptyTicket(); t.date = dateStr || todayStr; setEditTicket(t); setIsNew(true); }, [todayStr]);
  const handleEdit = useCallback(t => { setEditTicket({ ...t }); setIsNew(!t.type); }, []);
  const openDaily = dateStr => { setSelectedDate(dateStr); setView("daily"); };

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };
  const prevDay = () => { if (!selectedDate) return; const dd = new Date(selectedDate + "T00:00:00"); dd.setDate(dd.getDate() - 1); setSelectedDate(fmtDate(dd.getFullYear(), dd.getMonth(), dd.getDate())); };
  const nextDay = () => { if (!selectedDate) return; const dd = new Date(selectedDate + "T00:00:00"); dd.setDate(dd.getDate() + 1); setSelectedDate(fmtDate(dd.getFullYear(), dd.getMonth(), dd.getDate())); };

  if (isInitializing) {
    return <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", color: "#64748b", fontSize: 14, fontWeight: 600 }}>Loading...</div>;
  }
  if (!session) {
    return <LoginScreen />;
  }

  return (
    <div style={{ fontFamily: "'Noto Sans JP','Hiragino Sans','Yu Gothic','Meiryo',sans-serif", background: "#e8ecf1", minHeight: "100vh", color: "#1e293b", paddingBottom: 48 }}>
      {/* Worker Action Menu */}
      {workerActionMenu && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999 }} onClick={() => setWorkerActionMenu(null)}>
          <div style={{
            position: "absolute",
            left: Math.min(workerActionMenu.x, window.innerWidth - 160),
            top: Math.min(workerActionMenu.y, window.innerHeight - 120),
            background: "#fff",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            borderRadius: 6,
            padding: 6,
            border: "1px solid #cbd5e1",
            display: "flex", flexDirection: "column", gap: 2,
            minWidth: 160
          }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 12, fontWeight: 700, padding: "6px 8px", borderBottom: "1px solid #e2e8f0", marginBottom: 4, color: "#334155" }}>
              {workerActionMenu.workerName}
            </div>
            <button onClick={() => {
              toggleVacation(workerActionMenu.dateStr, workerActionMenu.workerId);
              setWorkerActionMenu(null);
            }} style={{ display: "flex", alignItems: "center", gap: 6, textAlign: "left", padding: "8px 10px", fontSize: 11, fontWeight: 600, background: "none", border: "none", cursor: "pointer", borderRadius: 4, color: "#1e293b" }} onMouseOver={e => e.currentTarget.style.background = "#f1f5f9"} onMouseOut={e => e.currentTarget.style.background = "none"}>
              {vacations[workerActionMenu.dateStr]?.has(workerActionMenu.workerId) ? (
                <><IconVacationSolid size={14} color="#f59e0b" /><span>出勤にする</span></>
              ) : (
                <><IconVacationSolid size={14} color="#94a3b8" /><span>休暇にする</span></>
              )}
            </button>
            <button onClick={() => {
              setMoveAllMenu({ workerId: workerActionMenu.workerId, workerName: workerActionMenu.workerName, dateStr: workerActionMenu.dateStr });
              setWorkerActionMenu(null);
            }} style={{ display: "flex", alignItems: "center", gap: 6, textAlign: "left", padding: "8px 10px", fontSize: 11, fontWeight: 600, background: "none", border: "none", cursor: "pointer", borderRadius: 4, color: "#1e293b" }} onMouseOver={e => e.currentTarget.style.background = "#f1f5f9"} onMouseOut={e => e.currentTarget.style.background = "none"}>
              <IconMoveAll size={14} color="#3b82f6" />
              <span>この日の予定を一括移動</span>
            </button>
          </div>
        </div>
      )}

      {/* Move All Tickets Modal */}
      {moveAllMenu && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000 }} onClick={() => setMoveAllMenu(null)}>
          <div style={{ background: "#fff", borderRadius: 8, padding: 20, width: 320, boxShadow: "0 16px 48px rgba(0,0,0,0.25)" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 800 }}>全チケット一括移動</h3>
            <p style={{ fontSize: 12, color: "#475569", margin: "0 0 12px", lineHeight: "1.4" }}>
              {moveAllMenu.dateStr}の<b>{moveAllMenu.workerName}</b>さんの全チケットを別の人に移動します。
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: "50vh", overflowY: "auto", paddingRight: 4 }}>
              {workers.filter(w => String(w.id) !== moveAllMenu.workerId).map(w => (
                <button key={w.id} onClick={() => { handleMoveAll(moveAllMenu.dateStr, moveAllMenu.workerId, String(w.id)); setMoveAllMenu(null); }}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 4, background: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "background 0.15s" }}
                  onMouseOver={e => e.currentTarget.style.background = `${w.color}15`}
                  onMouseOut={e => e.currentTarget.style.background = "#fff"}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: w.color, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800 }}>{w.id}</span>
                  <span style={{ color: w.color }}>{w.name} に移動する</span>
                </button>
              ))}
            </div>
            <button onClick={() => setMoveAllMenu(null)} style={{ marginTop: 16, width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: 4, background: "#f8fafc", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>キャンセル</button>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div style={{ background: "#1e293b", padding: "8px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <IconCalendar size={18} color="#93c5fd" />
          <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>Total Scheduling System</span>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 2, marginRight: 10, background: "rgba(255,255,255,0.1)", borderRadius: 4, padding: "2px 6px" }}>
            <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 16, padding: "0 4px" }}>－</button>
            <span style={{ color: "#fff", fontSize: 10, minWidth: 32, textAlign: "center" }}>{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 16, padding: "0 4px" }}>＋</button>
          </div>
          <button onClick={() => setShowAdmin(true)} title="管理者設定" style={{ padding: "5px 8px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.2)", background: showAdmin ? "rgba(255,255,255,0.2)" : "transparent", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"} onMouseOut={e => e.currentTarget.style.background = showAdmin ? "rgba(255,255,255,0.2)" : "transparent"}><IconGear size={14} color={showAdmin ? "#fff" : "rgba(255,255,255,0.7)"} /></button>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", margin: "0 6px" }} />
          <button onClick={() => setView("monthly")} style={{ padding: "5px 14px", borderRadius: 3, border: "none", background: view === "monthly" ? "rgba(255,255,255,0.15)" : "transparent", color: view === "monthly" ? "#93c5fd" : "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Monthly</button>
          <button onClick={() => { if (!selectedDate) setSelectedDate(fmtDate(now.getFullYear(), now.getMonth(), now.getDate())); setView("daily"); }} style={{ padding: "5px 14px", borderRadius: 3, border: "none", background: view === "daily" ? "rgba(255,255,255,0.15)" : "transparent", color: view === "daily" ? "#93c5fd" : "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Daily</button>
          <button onClick={() => setView("pool")} style={{ padding: "5px 14px", borderRadius: 3, border: "none", background: view === "pool" ? "rgba(255,255,255,0.15)" : "transparent", color: view === "pool" ? "#93c5fd" : "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><IconPool size={13} color={view === "pool" ? "#93c5fd" : "rgba(255,255,255,0.5)"} /> Pool</button>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", margin: "0 6px" }} />
          <button onClick={() => supabase.auth.signOut()} style={{ padding: "5px 14px", borderRadius: 3, border: "none", background: "rgba(220,38,38,0.2)", color: "#fca5a5", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center" }}>ログアウト</button>
        </div>
      </div>

      {/* Filters + legend */}
      <div style={{ background: "#fff", borderBottom: "1px solid #d1d5db", padding: "4px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <input type="text" placeholder="検索..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "3px 8px", border: "1px solid #d1d5db", borderRadius: 3, fontSize: 10, width: 120 }} />
          <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ padding: "3px 6px", border: "1px solid #d1d5db", borderRadius: 3, fontSize: 10 }}>
            <option value="">全タイプ</option>{types.map(t => <option key={t}>{t}</option>)}
          </select>
          <select value={filterWorker} onChange={e => setFilterWorker(e.target.value)} style={{ padding: "3px 6px", border: "1px solid #d1d5db", borderRadius: 3, fontSize: 10 }}>
            <option value="">全対応者</option>{workers.map(w => <option key={w.id} value={String(w.id)}>{w.name}</option>)}
          </select>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 10, color: "#64748b" }}>合計:<b style={{ color: "#1e40af" }}>{stats.total}</b></span>
          <span style={{ fontSize: 10, color: "#64748b" }}>完了:<b style={{ color: "#16a34a" }}>{stats.done}</b></span>
          <span style={{ fontSize: 10, color: "#64748b" }}>未対応:<b style={{ color: "#d97706" }}>{stats.pending}</b></span>
        </div>
        <Legend workers={workers} />
      </div>

      {/* Main content */}
      <div style={{ padding: "10px 16px", transform: `scale(${zoom})`, transformOrigin: "top center", transition: "transform 0.2s" }}>
        {view === "monthly" ? (
          <MonthCalendar
            tickets={monthTickets}
            year={year} month={month}
            workers={workers}
            vacations={vacations}
            onDayClick={openDaily}
            onEdit={handleEdit}
            onView={t => setViewingTicket({ ...t })}
            onAdd={handleAdd}
            isAdmin={isAdmin}
            onReorder={(dateStr, workerId, fromId, toId) => {
              setTickets(prev => {
                const next = [...prev];
                const fromGlobalIdx = next.findIndex(t => t.id === fromId);
                if (fromGlobalIdx < 0) return prev;
                const [moved] = next.splice(fromGlobalIdx, 1);

                if (toId && toId !== "end") {
                  const newToIdx = next.findIndex(t => t.id === toId);
                  if (newToIdx < 0) { next.push(moved); } else { next.splice(newToIdx, 0, moved); }
                } else {
                  const workerTicketsToday = next.filter(t => t.date === dateStr && t.person === workerId);
                  if (workerTicketsToday.length > 0) {
                    const lastId = workerTicketsToday[workerTicketsToday.length - 1].id;
                    const lastGlobalIdx = next.findIndex(t => t.id === lastId);
                    next.splice(lastGlobalIdx + 1, 0, moved);
                  } else {
                    next.push(moved);
                  }
                }
                return next;
              });
            }}
            onMoveTicket={(ticketId, newWorkerId) => {
              setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, person: newWorkerId } : t));
            }}
          />
        ) : view === "pool" ? (
          <ProcessingPool tickets={tickets} workers={workers} onEdit={handleEdit} onDelete={handleDelete}
            onAssign={(ticketId, date, workerId) => {
              setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, date, person: workerId } : t));
            }} />
        ) : selectedDate ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <button onClick={() => setView("monthly")} style={{ background: "none", border: "none", cursor: "pointer", color: "#2563eb", fontSize: 12, fontWeight: 600 }}>◂ 月間に戻る</button>
              <div style={{ flex: 1 }} />
              <button onClick={prevDay} style={{ padding: "4px 10px", borderRadius: 3, border: "1px solid #d1d5db", background: "#fff", fontSize: 11, cursor: "pointer" }}>◂ 前日</button>
              <button onClick={nextDay} style={{ padding: "4px 10px", borderRadius: 3, border: "1px solid #d1d5db", background: "#fff", fontSize: 11, cursor: "pointer" }}>翌日 ▸</button>
            </div>
            <DailyDetail tickets={filtered} dateStr={selectedDate} workers={workers} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} onView={t => setViewingTicket({ ...t })} onSave={handleSave} vacations={vacations} onToggleVacation={toggleVacation} onReorder={(dateStr, workerId, fromId, toId) => {
              if (toId === "end") {
                setTickets(prev => {
                  const next = [...prev];
                  const fromGlobalIdx = next.findIndex(t => t.id === fromId);
                  if (fromGlobalIdx < 0) return prev;
                  const [moved] = next.splice(fromGlobalIdx, 1);
                  const workerTicketsToday = next.filter(t => t.date === dateStr && t.person === workerId);
                  if (workerTicketsToday.length > 0) {
                    const lastId = workerTicketsToday[workerTicketsToday.length - 1].id;
                    const lastGlobalIdx = next.findIndex(t => t.id === lastId);
                    next.splice(lastGlobalIdx + 1, 0, moved);
                  } else {
                    next.push(moved);
                  }
                  return next;
                });
                return;
              }
              setTickets(prev => {
                const next = [...prev];
                const fromGlobalIdx = next.findIndex(t => t.id === fromId);
                const toGlobalIdx = next.findIndex(t => t.id === toId);
                if (fromGlobalIdx < 0 || toGlobalIdx < 0) return prev;
                const [moved] = next.splice(fromGlobalIdx, 1);
                const newToIdx = next.findIndex(t => t.id === toId);
                if (newToIdx < 0) { next.push(moved); } else { next.splice(newToIdx, 0, moved); }
                return next;
              });
            }} onMoveTicket={(ticketId, newWorkerId) => {
              setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, person: newWorkerId } : t));
            }} />
          </>
        ) : null}
      </div>

      {/* Month tabs (bottom, like spreadsheet) */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#fff", borderTop: "1px solid #c7cbd1",
        display: "flex", alignItems: "center", padding: "0 8px",
        boxShadow: "0 -2px 6px rgba(0,0,0,0.06)", zIndex: 100,
      }}>
        <button onClick={() => setYear(y => y - 1)} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", fontSize: 11, color: "#64748b" }}>◂年</button>
        <button onClick={prevMonth} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", fontSize: 13, color: "#64748b" }}>◂</button>
        {MONTHS.map((m, i) => (
          <button key={i} onClick={() => setMonth(i)} style={{
            padding: "8px 12px", border: "none", cursor: "pointer",
            fontSize: 12, fontWeight: month === i ? 800 : 500,
            color: month === i ? "#1e40af" : "#64748b",
            background: month === i ? "#dbeafe" : "transparent",
            borderTop: month === i ? "3px solid #2563eb" : "3px solid transparent",
          }}>{m}</button>
        ))}
        <button onClick={nextMonth} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", fontSize: 13, color: "#64748b" }}>▸</button>
        <button onClick={() => setYear(y => y + 1)} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", fontSize: 11, color: "#64748b" }}>年▸</button>
      </div>

      {/* Modals */}
      {viewingTicket && <TicketDetailModal ticket={viewingTicket} workers={workers} onClose={() => setViewingTicket(null)} onEdit={t => { setViewingTicket(null); handleEdit(t); }} onDelete={id => { setViewingTicket(null); handleDelete(id); }} />}
      {editTicket && <TicketFormModal ticket={editTicket} isNew={isNew} onSave={handleSave} onClose={() => { setEditTicket(null); setIsNew(false); }} workers={workers} />}
      {showAdmin && <AdminModal types={types} workers={workers} onSaveTypes={t => { setTypes(t); setShowAdmin(false); }} onSaveWorkers={w => { setWorkers(w); setShowAdmin(false); }} onClose={() => setShowAdmin(false)} />}
    </div>
  );
}
