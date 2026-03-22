import React, { useState, useMemo, useCallback, useEffect, useRef, Component } from "react";
import { supabase } from "./supabase";
import initialTicketsData from "./initialTickets.json";

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
const IconPeople = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
const IconClipboard = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"></rect><line x1="9" y1="10" x2="15" y2="10"></line><line x1="9" y1="14" x2="15" y2="14"></line><line x1="9" y1="6" x2="15" y2="6"></line></svg>
);
const IconWrench = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
);
const IconMapPin = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
const IconTruck = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
);
const IconClock = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
const IconPeopleGroup = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
const IconNote = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
);
const IconSun = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
);
const IconMoon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);
const IconLogout = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconResize = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
);
const IconLock = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);
const IconLockOpen = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
);
const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
const DOW_HEADERS = ["月", "火", "水", "木", "金", "土", "日"];
const TYPES = ["点検", "修理", "設置", "撤去", "メンテナンス", "その他"];
const DEFAULT_TYPE_COLORS = {
  "点検": { bg: "var(--type-bg-inspect)", text: "var(--type-text-inspect)", badge: "var(--type-badge-inspect)" },
  "修理": { bg: "var(--type-bg-repair)", text: "var(--type-text-repair)", badge: "var(--type-badge-repair)" },
  "設置": { bg: "var(--type-bg-install)", text: "var(--type-text-install)", badge: "var(--type-badge-install)" },
  "撤去": { bg: "var(--type-bg-remove)", text: "var(--type-text-remove)", badge: "var(--type-badge-remove)" },
  "メンテナンス": { bg: "var(--type-bg-maint)", text: "var(--type-text-maint)", badge: "var(--type-badge-maint)" },
  "その他": { bg: "var(--type-bg-other)", text: "var(--type-text-other)", badge: "var(--type-badge-other)" },
};
const STATUSES = ["", "フリー", "休暇"];
const AREAS = ["北海道", "東北", "関東", "中部", "近畿", "中国", "四国", "九州"];
const RESULTS = ["完了", "未完了", "キャンセル", "現地都合でキャンセル", "保留"];
const PREFECTURES = ["23", "都下", "北海道", "青森", "岩手", "宮城", "秋田", "山形", "福島", "茨城", "栃木", "群馬", "埼玉", "千葉", "東京", "神奈川", "新潟", "富山", "石川", "福井", "山梨", "長野", "岐阜", "静岡", "愛知", "三重", "滋賀", "京都", "大阪", "兵庫", "奈良", "和歌山", "鳥取", "島根", "岡山", "広島", "山口", "徳島", "香川", "愛媛", "高知", "福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄"];
const KUBUN_OPTIONS = ["FTS", "委託", "その他"];
const kubunColors = {
  "FTS":  { border: "#8b5cf6", bg: "rgba(139,92,246,0.08)", text: "#7c3aed" },
  "委託": { border: "#84cc16", bg: "rgba(132,204,22,0.08)", text: "#65a30d" },
  "その他": { border: "#94a3b8", bg: "transparent", text: "#64748b" },
};

// 地域カラーマップ（県別・エリア別）
const TOHOKU_PREFS = ["青森", "岩手", "宮城", "秋田", "山形", "福島"];
const HOKKAITO_PREFS = ["北関東"];
const KANTO_NORTH_PREFS = ["茨城", "群馬", "栃木"];
const CHUBU_PREFS = ["新潟", "富山", "石川", "福井", "山梨", "長野", "岐阜", "静岡", "愛知", "三重"];

const getRegionColor = (area, prefecture) => {
  if (area === "23" || prefecture === "23") return "#ef4444";
  if (area === "都下" || prefecture === "都下") return "#ec4899";
  if (!prefecture) return "#64748b";
  if (prefecture === "神奈川") return "#22d3ee";
  if (prefecture === "埼玉") return "#22c55e";
  if (prefecture === "千葉") return "#eab308";
  if (prefecture === "北海道") return "#f97316";
  if (TOHOKU_PREFS.includes(prefecture)) return "#3b82f6";
  if (KANTO_NORTH_PREFS.includes(prefecture)) return "#84cc16";
  if (CHUBU_PREFS.includes(prefecture)) return "#fb923c";
  return "#64748b";
};
// 後方互換
const getPrefColor = (pref) => getRegionColor("", pref);
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
    for (let m = 0; m < 60; m += 30) {
      if (h === 0 && m === 0) continue;
      if (h === 12 && m > 0) continue;
      opts.push(`${h}:${String(m).padStart(2, '0')}`);
    }
  }
  return opts;
})();

const INITIAL_WORKERS = [
  { id: "平本", name: "平本", color: "#2563eb" },
  { id: "神崎", name: "神崎", color: "#dc2626" },
  { id: "原", name: "原", color: "#16a34a" },
  { id: "佐藤", name: "佐藤", color: "#9333ea" },
  { id: "築地", name: "築地", color: "#ca8a04" },
  { id: "清水", name: "清水", color: "#0891b2" },
  { id: "岡﨑", name: "岡﨑", color: "#be123c" },
  { id: "淺沼", name: "淺沼", color: "#7c3aed" },
  { id: "中川", name: "中川", color: "#ea580c" },
  { id: "小齊平", name: "小齊平", color: "#059669" },
  { id: "豊田", name: "豊田", color: "#4f46e5" },
  { id: "濱田", name: "濱田", color: "#e11d48" },
  { id: "松下", name: "松下", color: "#0d9488" },
  { id: "阿部", name: "阿部", color: "#d97706" },
  { id: "藤井", name: "藤井", color: "#7c2d12" },
  { id: "杉山", name: "杉山", color: "#6d28d9" },
  { id: "大家", name: "大家", color: "#0369a1" },
  { id: "富本", name: "富本", color: "#b91c1c" },
  { id: "高杉", name: "高杉", color: "#15803d" },
  { id: "高橋", name: "高橋", color: "#a21caf" },
];

const ALL_COLS = [
  { key: "kubun", label: "区分", w: 60, type: "select", options: KUBUN_OPTIONS },
  { key: "type", label: "タイプ", w: 80, type: "select", options: TYPES },
  { key: "box", label: "BOX", w: 45, type: "text" },
  { key: "unit", label: "号機", w: 55, type: "text" },
  { key: "property", label: "物件名", w: 180, type: "text" },
  { key: "category", label: "種別", w: 40, type: "text" },
  { key: "work", label: "作業内容", w: 200, type: "text" },
  { key: "time", label: "時間指定", w: 60, type: "text" },
  { key: "person", label: "対応者", w: 70, type: "worker", dailyOnly: true },
  { key: "area", label: "エリア", w: 55, type: "text" },
  { key: "prefecture", label: "県別", w: 55, type: "select", options: PREFECTURES },
  { key: "travel", label: "移動", w: 44, type: "text" },
  { key: "companion", label: "同行者", w: 57, type: "text" },
  { key: "requestNo", label: "依頼番号", w: 70, type: "text" },
  { key: "timeSlot", label: "TIME", w: 50, type: "select", options: TIME_OPTIONS },
  { key: "course", label: "コース", w: 53, type: "text" },
  { key: "result", label: "結果", w: 70, type: "select", options: RESULTS },
  { key: "responseDate", label: "対応日", w: 84, type: "date" },
  { key: "faultCategory", label: "障害区分", w: 80, type: "select", options: FAULT_CATEGORIES },
  { key: "faultLevel", label: "Level", w: 40, type: "auto" },
  { key: "notes", label: "備考", w: 80, type: "text" },
];

const emptyTicket = () => ({
  id: Math.random().toString(36).substring(2, 11), date: "", kubun: "", type: "", box: "", unit: "", property: "", category: "",
  work: "", time: "", person: "", area: "", prefecture: "", travel: "", companion: "",
  requestNo: "", timeSlot: "", course: "", result: "", responseDate: "",
  faultCategory: "", faultLevel: "", notes: "", createdBy: ""
});

const typeColors = { ...DEFAULT_TYPE_COLORS };
const TYPE_COLOR_PRESETS = [
  { bg: "#eff6ff", text: "#fff", badge: "#3b82f6" }, // 青
  { bg: "#fef2f2", text: "#fff", badge: "#ef4444" }, // 赤
  { bg: "#f0fdf4", text: "#fff", badge: "#22c55e" }, // 緑
  { bg: "#faf5ff", text: "#fff", badge: "#a855f7" }, // 紫
  { bg: "#fefce8", text: "#fff", badge: "#eab308" }, // 黄
  { bg: "#fdf2f8", text: "#fff", badge: "#ec4899" }, // ピンク
  { bg: "#f0fdfa", text: "#fff", badge: "#14b8a6" }, // ティール
  { bg: "#fff7ed", text: "#fff", badge: "#f97316" }, // オレンジ
  { bg: "#f8fafc", text: "#fff", badge: "#64748b" }, // グレー
  { bg: "#eef2ff", text: "#fff", badge: "#6366f1" }, // インディゴ
  { bg: "#f5f3ff", text: "#fff", badge: "#8b5cf6" }, // バイオレット
  { bg: "#ecfdf5", text: "#fff", badge: "#10b981" }, // エメラルド
  { bg: "#fff1f2", text: "#fff", badge: "#f43f5e" }, // ローズ
  { bg: "#f0f9ff", text: "#fff", badge: "#0ea5e9" }, // スカイ
  { bg: "#ccfbf1", text: "#fff", badge: "#0d9488" }, // ターコイズ
];
const resultColors = {
  "完了": "var(--res-bg-done)",
  "未完了": "var(--res-bg-pending)",
  "キャンセル": "var(--res-bg-cancel)",
  "現地都合でキャンセル": "var(--res-bg-cancel)",
  "保留": "var(--res-bg-other)"
};

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
  if (typeof t === 'number') return t;
  const ts = String(t).trim();
  if (ts.includes(":")) {
    const [h, min] = ts.split(":").map(Number);
    return h + (min || 0) / 60;
  }
  const parsed = parseFloat(ts);
  return isNaN(parsed) ? 0 : parsed;
}

function formatExcelTime(val) {
  let n = val;
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (!trimmed) return val;
    // 数値として解釈可能かチェック
    const parsed = parseFloat(trimmed);
    if (!isNaN(parsed) && !trimmed.includes(":")) {
      n = parsed;
    } else {
      return val;
    }
  }
  
  if (typeof n !== 'number' || isNaN(n)) return val;
  if (n < 0 || n >= 1) return val; 
  
  const totalMinutes = Math.round(n * 24 * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
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

  return formatted;
}

function UserAvatar({ user, size = 24, style = {} }) {
  if (!user) return null;
  const initial = typeof user.id === "string" && !user.id.includes("-") ? (user.name?.charAt(0) || "?") : (user.name?.charAt(0) || "?");

  const baseStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    background: user.color || "var(--bg-alt)",
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: Math.max(8, Math.floor(size * 0.45)),
    fontWeight: 800,
    flexShrink: 0,
    overflow: "hidden",
    lineHeight: 1,
    ...style
  };

  if (user.avatar_url2 || user.avatar_url) {
    return (
      <div style={baseStyle}>
        <img src={user.avatar_url2 || user.avatar_url} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    );
  }

  return (
    <span style={baseStyle}>
      <span style={{ display: "block", transform: "translateY(0.5px)" }}>{initial}</span>
    </span>
  );
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



// --- Month Calendar View (grouped by worker) ---
function MonthCalendar({ tickets, year, month, workers, allWorkers, vacations, onDayClick, onEdit, onView, onAdd, onReorder, onMoveTicket, isAdmin, theme, hoveredDate, setHoveredDate, isFitWidth, zoom }) {
  const colWidth = isFitWidth ? "minmax(0, 1fr)" : `calc((100vw - 64px) / 2 / ${zoom})`;
  const [collapsedWorkers, setCollapsedWorkers] = useState({}); // { "date-workerId": boolean }

  const toggleCollapse = (dateStr, workerId) => {
    const key = `${dateStr}-${workerId}`;
    setCollapsedWorkers(prev => ({ ...prev, [key]: !prev[key] }));
  };
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

    // Group tickets by worker (ID match, Full Name match, or Surname match)
    const byWorker = { "none": [] };
    workers.forEach(w => {
      byWorker[String(w.id)] = [];
      if (w.name) byWorker[w.name] = byWorker[String(w.id)];
    });
    (dayT || []).forEach(t => {
      if (!t.person) { byWorker["none"].push(t); return; }

      // 完全一致または前方一致（苗字など）でマッチさせる
      const targetWorker = workers.find(w =>
        String(w.id) === t.person ||
        w.name === t.person ||
        (w.name && t.person && (w.name.startsWith(t.person) || t.person.startsWith(w.name)))
      );

      const k = targetWorker ? String(targetWorker.id) : "none";
      if (!byWorker[k]) byWorker[k] = []; // fallback
      byWorker[k].push(t);
    });

    // Find companion IDs
    const companionIds = new Set();
    dayT.forEach(t => {
      if (typeof t.companion === "string") {
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
    <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--calendar-grid-border)", borderRadius: 10, overflow: "clip", background: "var(--glass-bg)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", boxShadow: "var(--shadow-glass)" }}>
      {/* DOW header – sticky, individual glass pills */}
      <div style={{
        display: "grid", gridTemplateColumns: `repeat(7, ${colWidth})`,
        position: "sticky", top: 0, zIndex: 20,
        background: "var(--glass-bg-panel)",
        backdropFilter: `blur(var(--glass-blur)) saturate(var(--glass-saturation))`,
        WebkitBackdropFilter: `blur(var(--glass-blur)) saturate(var(--glass-saturation))`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
        borderBottom: "1px solid var(--glass-border)",
        padding: "6px 4px",
        gap: 4,
      }}>
        {DOW_HEADERS.map((d, i) => {
          const isSat = i === 5, isSun = i === 6;
          return (
            <div key={i} style={{
              padding: "6px 0", textAlign: "center", fontSize: 11, fontWeight: 900,
              letterSpacing: "0.15em",
              color: isSun ? "var(--color-sun)" : isSat ? "var(--color-sat)" : "var(--text-sub)",
              borderRadius: 8,
              background: isSun
                ? "rgba(239,68,68,0.08)"
                : isSat
                  ? "rgba(37,99,235,0.06)"
                  : "rgba(255,255,255,0.03)",
              border: isSun
                ? "1px solid rgba(239,68,68,0.2)"
                : isSat
                  ? "1px solid rgba(37,99,235,0.15)"
                  : "1px solid var(--glass-border)",
              backdropFilter: "blur(4px)",
              textShadow: theme === "dark" ? "0 1px 2px rgba(0,0,0,0.5)" : "none",
            }}>{d}</div>
          );
        })}
      </div>

      {/* Week rows */}
      {weeks.map((week, wi) => (
        <div key={wi} style={{
          display: "grid", gridTemplateColumns: `repeat(7, ${colWidth})`,
          borderBottom: wi < weeks.length - 1 ? "1px solid var(--calendar-grid-border)" : "none",
          alignItems: "stretch",
        }}>
          {week.map((cell, ci) => {
            if (!cell) return (
              <div key={ci} style={{ background: "var(--bg-body)", borderRight: ci < 6 ? "1px solid var(--calendar-cell-border)" : "none", padding: 3 }} />
            );
            const isSat = ci === 5, isSun = ci === 6;
            const isToday = cell.dateStr === todayStr;
            const holidayName = isHoliday(cell.dateStr);
            const isHolidayDay = !!holidayName;
            const { withTickets, noTickets, onVacation, unassignedTickets, total } = buildDayData(cell.dateStr);
            const isHovered = hoveredDate === cell.dateStr;
            // 割当状態の判定
            const hasUnassigned = unassignedTickets.length > 0;
            const hasAssigned = withTickets.length > 0;
            const isFullyAssigned = total > 0 && !hasUnassigned;
            return (
              <div key={ci}
                id={"day-cell-" + cell.dateStr}
                className={isToday ? "today-premium" : ""}
                title={holidayName ? holidayName : ""}
                onMouseEnter={() => setHoveredDate(cell.dateStr)}
                onMouseLeave={() => setHoveredDate(null)}
                style={{
                  borderRight: ci < 6 ? "1px solid var(--calendar-cell-border)" : "none",
                  background: isToday
                    ? (theme === "dark" ? "linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(245,158,11,0.05) 100%)" : "rgba(251,191,36,0.15)")
                    : (isSun || isHolidayDay)
                      ? "var(--bg-sun)"
                      : isSat
                        ? "var(--bg-sat)"
                        : "var(--bg-alt)",
                  backdropFilter: `blur(var(--glass-blur)) saturate(1.2)`,
                  WebkitBackdropFilter: `blur(var(--glass-blur)) saturate(1.2)`,
                  padding: 3,
                  display: "flex", flexDirection: "column",
                  minHeight: 140,
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: isToday
                    ? "inset 0 0 0 2px rgba(251,191,36,0.4), inset 0 0 24px rgba(245,158,11,0.1)"
                    : isHovered
                      ? "inset 0 0 0 2.5px var(--text-accent), 0 0 20px rgba(56, 189, 248, 0.2)"
                      : "none",
                  zIndex: isHovered ? 10 : 1,
                  position: "relative",
                  cursor: "default"
                }}
              >
                {/* Day number + count + add button */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "3px 4px",
                  cursor: "pointer",
                  borderBottom: "1px solid var(--border-light)"
                }} onClick={() => onDayClick(cell.dateStr)}>
                  <span style={{
                    fontSize: 14, fontWeight: 900,
                    lineHeight: 1,
                    flexShrink: 0,
                    padding: "2px 0",
                    marginRight: 4,
                    letterSpacing: "-0.02em",
                    transition: "color 0.2s",
                    color: isToday
                      ? "#f59e0b"
                      : (isSun || isHolidayDay) ? "var(--color-sun)" : isSat ? "var(--color-sat)" : "var(--text-main)",
                    borderBottom: isToday ? "2px solid #f59e0b" : "2px solid transparent",
                  }}>{cell.day}</span>
                  {total > 0 && <span style={{ fontSize: 9, color: "var(--text-main)", fontWeight: 800, opacity: 0.7 }}>{total}件</span>}
                  {hasUnassigned && (
                    <span style={{
                      fontSize: 9, fontWeight: 900, color: "#ef4444",
                      background: "rgba(239,68,68,0.1)", borderRadius: 4,
                      padding: "1px 4px", border: "1px solid rgba(239,68,68,0.25)",
                    }}>{unassignedTickets.length}未</span>
                  )}
                  <button onClick={e => { e.stopPropagation(); onAdd(cell.dateStr); }} title="追加" style={{ background: "none", border: "1px solid var(--border-color)", borderRadius: 3, cursor: "pointer", padding: "0px 1px", display: "flex", alignItems: "center", lineHeight: 1, transition: "background 0.15s", marginLeft: "auto" }}
                    onMouseOver={e => e.currentTarget.style.background = "rgba(219,234,254,0.8)"}
                    onMouseOut={e => e.currentTarget.style.background = "none"}>
                    <IconPlus size={10} color="#2563eb" />
                  </button>
                </div>

                {/* Workers with tickets (grouped) */}
                <div style={{ flex: 1 }}>
                  {withTickets.map(({ worker: w, tickets: wt }) => {
                    const totalH = wt.reduce((s, ticket) => {
                      let t = s;
                      let duration = 0;
                      if (ticket.timeSlot === "AM") duration = 3;
                      else if (ticket.timeSlot === "PM") duration = 4;
                      else if (ticket.timeSlot === "終日") duration = 7;
                      else if (ticket.timeSlot === "夜間") duration = 2;
                      else if (ticket.time) {
                        // time 欄に数値（h）が入っている場合を優先
                        duration = parseHours(ticket.time);
                      }
                      
                      if (duration > 0) t += duration;
                      return t;
                    }, 0);
                    return (
                      <div key={w.id} style={{
                        marginBottom: 6, borderRadius: "var(--radius-sm)", overflow: "hidden",
                        border: "1px solid var(--border-light)",
                        display: "flex",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
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
                        <div style={{ width: 3, background: monthDragOver && monthDragOver.workerId === String(w.id) && monthDragOver.dateStr === cell.dateStr && monthDragId ? "#3b82f6" : "#c084fc", flexShrink: 0 }} />
                        <div style={{ flex: 1, background: monthDragOver && monthDragOver.workerId === String(w.id) && monthDragOver.dateStr === cell.dateStr && monthDragId ? "var(--bg-body)" : "var(--bg-app)" }}>
                          {/* Worker header */}
                          <div style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "1px 3px", background: monthDragOver && monthDragOver.workerId === String(w.id) && monthDragOver.dateStr === cell.dateStr && monthDragId ? "var(--bg-alt)" : "var(--bg-alt)",
                            cursor: "pointer",
                          }} onClick={(e) => {
                            e.stopPropagation();
                            if (window.onWorkerMenu) window.onWorkerMenu(e.clientX, e.clientY, String(w.id), w.name, cell.dateStr);
                          }}
                            onMouseOver={e => e.currentTarget.style.filter = "brightness(0.95)"}
                            onMouseOut={e => e.currentTarget.style.filter = "none"}>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <button onClick={(e) => { e.stopPropagation(); toggleCollapse(cell.dateStr, String(w.id)); }} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 10, padding: "0 2px" }}>
                                {collapsedWorkers[`${cell.dateStr}-${w.id}`] ? "▶" : "▼"}
                              </button>
                              <span style={{ fontSize: 11, fontWeight: 800, color: "var(--text-main)" }}>{w.name}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              {monthDragOver && monthDragOver.workerId === String(w.id) && monthDragOver.dateStr === cell.dateStr && monthDragId && (
                                <span style={{ fontSize: 10, fontWeight: 900, color: "#2563eb", lineHeight: 1 }}>＋</span>
                              )}
                              {totalH > 0 && (
                                <span style={{ fontSize: 8, fontWeight: 700, color: "var(--text-muted)" }}>{totalH.toFixed(1)}h</span>
                              )}
                            </div>
                          </div>
                          {/* Ticket rows */}
                          {!collapsedWorkers[`${cell.dateStr}-${w.id}`] && (
                            <>
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
                                  padding: "4px 5px", borderTop: isDragTarget ? "2px solid #2563eb" : "1px solid var(--border-light)",
                                  background: "var(--bg-body)", cursor: "grab", minHeight: 32,
                                  lineHeight: "1.2", overflow: "hidden",
                                  borderRadius: 2, margin: "1px 2px"
                                }}
                                onMouseOver={e => e.currentTarget.style.filter = "brightness(0.93)"}
                                onMouseOut={e => e.currentTarget.style.filter = "none"}>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 2, marginBottom: 2 }}>
                                  {t.kubun && kubunColors[t.kubun] && (
                                    <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 3, background: "transparent", color: kubunColors[t.kubun].text, border: `1px solid ${kubunColors[t.kubun].border}` }}>{t.kubun}</span>
                                  )}
                                  <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 3, background: "rgba(255,255,255,0.03)", color: tc?.badge || "var(--text-muted)", border: `1px solid ${tc?.badge || "var(--border-color)"}` }}>{t.type}</span>
                                  {t.unit && <span style={{ fontSize: 11, fontWeight: 700, padding: "1px 4px", borderRadius: 3, background: "rgba(100,116,139,0.12)", color: "var(--text-sub)", border: "1px solid rgba(100,116,139,0.15)" }}>{t.unit}</span>}
                                  {t.property && <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-main)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>{t.property}</span>}
                                </div>
                                {t.work && <div style={{ fontSize: 10, color: "var(--text-sub)", lineHeight: 1.2, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{t.work}</div>}
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 2 }}>
                                  {t.time && formatExcelTime(t.time) && <span style={{ fontSize: 10, fontWeight: 600, padding: "1px 4px", borderRadius: 3, background: "transparent", color: "#d97706", border: "1px solid rgba(245,158,11,0.4)" }}>{formatExcelTime(t.time)}</span>}
                                  {t.area && <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 4px", borderRadius: 3, background: "transparent", color: getRegionColor(t.area, t.prefecture), border: `1px solid ${getRegionColor(t.area, t.prefecture)}` }}>{t.area}</span>}
                                  {t.prefecture && <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 4px", borderRadius: 3, background: "transparent", color: getRegionColor(t.area, t.prefecture), border: `1px solid ${getRegionColor(t.area, t.prefecture)}` }}>{t.prefecture}</span>}
                                  {t.timeSlot && <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 4px", borderRadius: 3, background: "transparent", color: "#6366f1", border: "1px solid rgba(99,102,241,0.4)" }}>{t.timeSlot}</span>}
                                  {typeof t.companion === "string" && t.companion && (
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 10, padding: "1px 4px", borderRadius: 3, background: "transparent", color: "var(--text-sub)", border: "1px solid rgba(128,128,128,0.3)" }}>
                                      <IconPeople size={9} color="var(--text-muted)" />{t.companion.split(/[\s　]+/)[0]}
                                    </span>
                                  )}
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
                        </>
                      )}
                    </div>
                  </div>
                );
              })}

                {/* Unassigned tickets rows */}
                {unassignedTickets.length > 0 && (
                  <div style={{ marginBottom: 4, marginTop: 4, borderRadius: 3, border: "1px dashed #f87171", background: "rgba(239, 68, 68, 0.04)", overflow: "hidden", backdropFilter: "blur(4px)" }}>
                    <div style={{ fontSize: 7, fontWeight: 800, color: "#ef4444", padding: "1px 4px", background: "rgba(239, 68, 68, 0.1)", borderBottom: "1px dashed #f87171" }}>未割当 ({unassignedTickets.length})</div>
                    {unassignedTickets.map((t, i) => {
                      const tc = typeColors[t.type] || typeColors["その他"];
                      return (
                        <div key={t.id} onClick={() => isAdmin ? onEdit(t) : (onView ? onView(t) : onEdit(t))}
                          style={{ padding: "4px 5px", borderTop: i === 0 ? "none" : "1px solid var(--border-light)", background: "transparent", cursor: "pointer" }}>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 2, marginBottom: 2 }}>
                            {t.kubun && kubunColors[t.kubun] && (
                              <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 3, background: "transparent", color: kubunColors[t.kubun].text, border: `1px solid ${kubunColors[t.kubun].border}` }}>{t.kubun}</span>
                            )}
                            <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 3, background: "transparent", color: tc.text, border: `1px solid ${tc.badge}` }}>{t.type}</span>
                            {t.unit && <span style={{ fontSize: 11, fontWeight: 700, padding: "1px 4px", borderRadius: 3, background: "rgba(100,116,139,0.12)", color: "var(--text-sub)", border: "1px solid rgba(100,116,139,0.15)" }}>{t.unit}</span>}
                            {t.property && <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-main)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>{t.property}</span>}
                          </div>
                          {t.work && <div style={{ fontSize: 10, color: "var(--text-sub)", lineHeight: 1.2, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{t.work}</div>}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 2 }}>
                            {t.time && formatExcelTime(t.time) && <span style={{ fontSize: 10, fontWeight: 600, padding: "1px 4px", borderRadius: 3, background: "transparent", color: "#d97706", border: "1px solid rgba(245,158,11,0.4)" }}>{formatExcelTime(t.time)}</span>}
                            {t.area && <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 4px", borderRadius: 3, background: "transparent", color: getRegionColor(t.area, t.prefecture), border: `1px solid ${getRegionColor(t.area, t.prefecture)}` }}>{t.area}</span>}
                            {t.prefecture && <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 4px", borderRadius: 3, background: "transparent", color: getRegionColor(t.area, t.prefecture), border: `1px solid ${getRegionColor(t.area, t.prefecture)}` }}>{t.prefecture}</span>}
                            {t.timeSlot && <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 4px", borderRadius: 3, background: "transparent", color: "#6366f1", border: "1px solid rgba(99,102,241,0.4)" }}>{t.timeSlot}</span>}
                            {typeof t.companion === "string" && t.companion && (
                              <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 10, padding: "1px 4px", borderRadius: 3, background: "transparent", color: "var(--text-sub)", border: "1px solid rgba(128,128,128,0.3)" }}>
                                <IconPeople size={9} color="var(--text-muted)" />{t.companion.split(/[\s　]+/)[0]}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}



                  {/* Vacation workers */}
                  {onVacation.length > 0 && (
                    <div style={{ marginTop: 1, padding: "1px 3px" }}>
                      {onVacation.map(({ worker: w }) => (
                        <div key={w.id} style={{
                          display: "flex", alignItems: "center", gap: 2,
                          padding: "1px", opacity: 0.5, fontSize: 9, cursor: "pointer",
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
                            fontSize: 7, fontWeight: 800,
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
function DailyDetail({ tickets, dateStr, workers, allWorkers, onEdit, onDelete, onAdd, onView, onSave, vacations, onToggleVacation, onReorder, onMoveTicket, theme }) {
  const dayTickets = tickets.filter(t => t.date === dateStr);
  const d = new Date(dateStr + "T00:00:00");
  const dow = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  // デイリービュー専用の列構成定義
  const dailyHiddenKeys = ["person", "course", "responseDate", "travel", "companion"];
  const baseCols = ALL_COLS.filter(c => !dailyHiddenKeys.includes(c.key));
  // resultを最後に持ってくる（notesの右）
  const resultCol = baseCols.find(c => c.key === "result");
  const notesCol = baseCols.find(c => c.key === "notes");
  const otherCols = baseCols.filter(c => c.key !== "result" && c.key !== "notes");
  
  // 幅の再配分
  const currentCols = [...otherCols, notesCol, resultCol].filter(Boolean);
  const vacSet = vacations[dateStr] || new Set();

  const grouped = {};
  workers.forEach(w => { grouped[String(w.id)] = []; });
  grouped["none"] = [];
  dayTickets.forEach(t => {
    if (!t.person) { grouped["none"].push(t); return; }

    const targetWorker = workers.find(w =>
      String(w.id) === t.person ||
      w.name === t.person ||
      (w.name && t.person && (w.name.startsWith(t.person) || t.person.startsWith(w.name)))
    );

    const k = targetWorker ? String(targetWorker.id) : "none";
    if (!grouped[k]) grouped[k] = []; // fallback
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
  const dateColorAtDay = (isSundayAtDay || isHolidayAtDay) ? "#ef4444" : (d.getDay() === 6 ? "#2563eb" : "var(--text-main)");

  // 障害・工事別のエリアサマリー集計
  const summary = useMemo(() => {
    const stats = {
      "FTS": { fault: 0, periodic: 0, parts: 0, construct: 0 },
      "委託": { fault: 0, periodic: 0, parts: 0, construct: 0 },
    };
    const faultAreas = new Set();
    const constructAreas = new Set();

    dayTickets.forEach(t => {
      // 未割り当ては集計に含めない (ユーザー要望)
      if (!t.person || t.person === "未割り当て") return;

      const cat = String(t.category || "");
      const type = String(t.type || "");
      const area = t.area || "";

      // エリア名の収集 (障害・工事)
      if (cat.includes("障害") || cat.includes("2次")) {
        if (area) faultAreas.add(area);
      } else if (cat.includes("工事") || type.includes("設置")) {
        if (area) constructAreas.add(area);
      }

      // FTS/委託別の件数集計
      const kRaw = String(t.kubun || "").trim().toUpperCase();
      let k = null;
      if (kRaw.includes("FTS") || kRaw.includes("自社")) k = "FTS";
      else if (kRaw.includes("委託") || kRaw.includes("協社") || kRaw.includes("協力")) k = "委託";
      
      // もしkubunが空でも、名前などで判別が必要な場合はここで補完できるが、
      // 現状は明示的に設定されているもののみを集計する（ユーザー要望通りFTS,委託ごとに表示）
      if (k) {
        if (cat.includes("障害") || cat.includes("2次")) stats[k].fault++;
        else if (cat.includes("定期")) stats[k].periodic++;
        else if (cat.includes("部品交換") || cat.includes("承認済み")) stats[k].parts++;
        else if (cat.includes("工事") || cat.includes("設置") || type.includes("設置")) stats[k].construct++;
      }
    });

    return {
      stats,
      faultAreas: Array.from(faultAreas),
      constructAreas: Array.from(constructAreas)
    };
  }, [dayTickets]);

  return (
    <div style={{ padding: "60px 20px 20px 20px" }}>
      <header className="glass-panel" style={{
        display: "flex", flexDirection: "column", gap: 20,
        marginBottom: 24, padding: "24px 32px",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--shadow-lg)",
      }}>
        {/* Top Row: Date, Count, Areas, Add Button */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
              <h2 style={{ margin: 0, fontSize: 30, fontWeight: 900, color: dateColorAtDay, letterSpacing: "-0.03em", textShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                {d.getMonth() + 1}月{d.getDate()}日（{dow}）{isHolidayAtDay ? ` ${isHolidayAtDay}` : ""}
              </h2>
              <span style={{ fontSize: 18, color: "var(--text-main)", fontWeight: 800, background: "rgba(0,0,0,0.06)", padding: "4px 16px", borderRadius: "14px", border: "1px solid var(--border-light)" }}>
                {summary.stats.FTS.fault + summary.stats.FTS.periodic + summary.stats.FTS.parts + summary.stats.FTS.construct +
                 summary.stats.委託.fault + summary.stats.委託.periodic + summary.stats.委託.parts + summary.stats.委託.construct}件
              </span>
            </div>

            {/* エリアリスト */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              {summary.faultAreas.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(239, 68, 68, 0.08)", padding: "6px 16px", borderRadius: "16px", border: "1px solid rgba(239, 68, 68, 0.15)" }}>
                  <span style={{ fontSize: 11, fontWeight: 900, color: "#ef4444" }}>障害:</span>
                  <span style={{ fontSize: 14, color: "var(--text-main)", fontWeight: 800 }}>{summary.faultAreas.join("、")}</span>
                </div>
              )}
              {summary.constructAreas.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(37, 99, 235, 0.08)", padding: "6px 16px", borderRadius: "16px", border: "1px solid rgba(37, 99, 235, 0.15)" }}>
                  <span style={{ fontSize: 11, fontWeight: 900, color: "#2563eb" }}>工事:</span>
                  <span style={{ fontSize: 14, color: "var(--text-main)", fontWeight: 800 }}>{summary.constructAreas.join("、")}</span>
                </div>
              )}
            </div>
          </div>

          <button onClick={() => onAdd(dateStr)} className="glass-card" style={{ 
            padding: "10px 28px", border: "1px solid var(--border-color)", background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)", 
            color: "#fff", fontSize: 15, fontWeight: 900, cursor: "pointer", transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)", 
            boxShadow: "0 10px 20px rgba(30,64,175,0.25)" 
          }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 15px 30px rgba(30,64,175,0.4)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 10px 20px rgba(30,64,175,0.25)"; }}
          >＋ 新規チケット追加</button>
        </div>

        {/* Bottom Row: Detailed Summary (FTS/委託) */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 32, paddingTop: 20, borderTop: "1px solid var(--border-light)" }}>
          {["FTS", "委託"].map(k => {
            const s = summary.stats[k] || { fault: 0, periodic: 0, parts: 0, construct: 0 };
            const isFTS = k === "FTS";
            return (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ 
                  fontSize: 11, fontWeight: 900, 
                  color: isFTS ? "#1e40af" : "#9333ea", 
                  background: isFTS ? "rgba(30,64,175,0.08)" : "rgba(147,51,234,0.08)", 
                  padding: "4px 12px", borderRadius: "10px", 
                  border: `1px solid ${isFTS ? "rgba(30,64,175,0.2)" : "rgba(147,51,234,0.2)"}`, 
                  minWidth: 50, textAlign: "center", letterSpacing: "1px" 
                }}>{k}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "var(--text-sub)", display: "flex", gap: 12 }}>
                  <span>障害 <span style={{ color: "#ef4444", fontSize: 15 }}>{s.fault}</span></span>
                  <span>定期 <span style={{ color: "#ca8a04", fontSize: 15 }}>{s.periodic}</span></span>
                  <span>部品 <span style={{ color: "#8b5cf6", fontSize: 15 }}>{s.parts}</span></span>
                  <span>工事 <span style={{ color: "#2563eb", fontSize: 15 }}>{s.construct}</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </header>

      {/* Vacation header */}
      {vacWorkers.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", marginBottom: 6, background: "rgba(234, 179, 8, 0.15)", borderRadius: 4, border: "1px solid #eab308" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#eab308" }}>🌴 休暇:</span>
          {vacWorkers.map(w => (
            <span key={w.id} style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 12 }}>
              <UserAvatar user={w} size={22} style={{ background: "var(--text-muted)" }} />
              <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>{w.name}</span>
            </span>
          ))}
        </div>
      )}

      {/* Move ticket modal */}
      {moveTicket && (
        <div style={{ position: "fixed", inset: 0, background: "var(--bg-modal-overlay)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000 }} onClick={() => setMoveTicket(null)}>
          <div style={{ background: "var(--bg-app)", borderRadius: 8, padding: 20, width: 300, boxShadow: "var(--shadow)" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "var(--text-main)" }}>チケットを移動</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "0 0 12px" }}>{moveTicket.type} / {moveTicket.property}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {(allWorkers || workers).filter(w => String(w.id) !== moveTicket.person).map(w => (
                <button key={w.id} onClick={() => { onMoveTicket && onMoveTicket(moveTicket.id, String(w.id)); setMoveTicket(null); }}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", border: "1px solid var(--border-color)", borderRadius: 4, background: "var(--bg-app)", cursor: "pointer", fontSize: 12, fontWeight: 600 }}
                  onMouseOver={e => e.currentTarget.style.background = `${w.color}15`}
                  onMouseOut={e => e.currentTarget.style.background = "var(--bg-app)"}>
                  <UserAvatar user={w} size={20} />
                  <span style={{ color: w.color }}>{w.name}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setMoveTicket(null)} style={{ marginTop: 12, width: "100%", padding: "6px", border: "1px solid var(--border-color)", borderRadius: 4, background: "var(--bg-alt)", color: "var(--text-main)", cursor: "pointer", fontSize: 12 }}>キャンセル</button>
          </div>
        </div>
      )}

      {[...displayWorkers, UNASSIGNED_WORKER].map(w => {
        const wt = grouped[String(w.id)] || [];
        const isVac = vacSet.has(w.id);
        const isAdminUser = w.sche_role === "admin";
        const isUnassignedRow = w.isUnassigned;

        // 管理者は予定がない場合は行自体を表示しない
        if (isAdminUser && wt.length === 0 && !isVac) return null;
        // 未割当行は予定がない場合は表示しない
        if (isUnassignedRow && wt.length === 0) return null;

        return (
          <div key={w.id} className="glass-card" style={{
            marginBottom: 24,
            borderRadius: 16,
            overflow: "hidden",
            borderColor: isUnassignedRow
              ? "rgba(239,68,68,0.5)"
              : isVac
                ? "rgba(234,179,8,0.4)"
                : wt.length > 0
                  ? `${w.color}80`
                  : "var(--glass-border)",
            borderStyle: isUnassignedRow ? "dashed" : "solid",
          }}>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10, padding: "8px 14px",
                borderBottom: wt.length > 0 ? "1px solid var(--glass-border)" : "none",
                borderLeft: `4px solid ${isUnassignedRow ? "#ef4444" : isVac ? "#eab308" : wt.length > 0 ? w.color : "var(--glass-border)"}`,
                background: isUnassignedRow
                  ? "linear-gradient(90deg, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.02) 100%)"
                  : isVac
                    ? "linear-gradient(90deg, rgba(234,179,8,0.12) 0%, rgba(234,179,8,0.01) 100%)"
                    : wt.length > 0
                      ? `linear-gradient(90deg, ${w.color}25 0%, ${w.color}05 100%)`
                      : "transparent",
              }}>
                {/* Assignment status avatar */}
                <div style={{ flexShrink: 0 }}>
                  {isUnassignedRow ? (
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, fontWeight: 900, color: "#ef4444",
                      background: "rgba(239,68,68,0.1)",
                      border: "2px dashed rgba(239,68,68,0.5)",
                      boxShadow: "0 0 8px rgba(239,68,68,0.3)"
                    }} className="unassigned-pulse">?</div>
                  ) : (
                    <UserAvatar user={w} size={36} style={{ 
                      border: wt.length > 0 ? `2.5px solid ${w.color}` : `1.5px dashed ${w.color}50`,
                      boxShadow: wt.length > 0 ? `0 0 12px ${w.color}40, 0 4px 8px rgba(0,0,0,0.15)` : "none"
                    }} />
                  )}
                </div>
                <span style={{
                  fontWeight: 800,
                  fontSize: 14,
                  letterSpacing: "-0.01em",
                  color: isUnassignedRow ? "var(--color-danger-dark)" : isVac ? (theme === "dark" ? "#fbbf24" : "#b45309") : wt.length > 0 ? (theme === "dark" ? "var(--text-main)" : w.color) : "var(--text-muted)",
                  opacity: isVac && wt.length === 0 ? 0.75 : 1,
                  textShadow: theme === "dark" ? "0 1px 4px rgba(0,0,0,0.5)" : "none",
                }}>{isUnassignedRow ? "未定・未割当" : w.name}</span>
                {isVac && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 12, background: "rgba(234,179,8,0.2)", color: "#f59e0b", fontWeight: 800, border: "1px solid rgba(234,179,8,0.4)", letterSpacing: "0.05em" }}>VACATION</span>}
                
                {/* ワーカーサマリー情報の追加 */}
                {!isUnassignedRow && wt.length > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 16 }}>
                    {/* エリアまとめ */}
                    {Array.from(new Set(wt.map(t => t.area).filter(Boolean))).length > 0 && (
                      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 10px", background: "rgba(59, 130, 246, 0.15)", borderRadius: 20, border: "1px solid rgba(59, 130, 246, 0.3)" }}>
                        <IconMapPin size={12} color="#3b82f6" />
                        <span style={{ fontSize: 11, fontWeight: 800, color: theme === "dark" ? "#93c5fd" : "#1d4ed8" }}>
                          {Array.from(new Set(wt.map(t => t.area).filter(Boolean))).join(", ")}
                        </span>
                      </div>
                    )}
                    {/* 同行者まとめ */}
                    {Array.from(new Set(wt.map(t => t.companion).filter(Boolean))).length > 0 && (
                      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 10px", background: "rgba(16, 185, 129, 0.15)", borderRadius: 20, border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                        <IconPeople size={12} color="#10b981" />
                        <span style={{ fontSize: 11, fontWeight: 800, color: theme === "dark" ? "#6ee7b7" : "#065f46" }}>
                          {Array.from(new Set(wt.map(t => t.companion).filter(Boolean))).join(", ")}
                        </span>
                      </div>
                    )}
                    {/* 移動まとめ */}
                    {Array.from(new Set(wt.map(t => t.travel).filter(Boolean))).length > 0 && (
                      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 10px", background: "rgba(245, 158, 11, 0.15)", borderRadius: 20, border: "1px solid rgba(245, 158, 11, 0.3)" }}>
                        <IconTruck size={12} color="#f59e0b" />
                        <span style={{ fontSize: 11, fontWeight: 800, color: theme === "dark" ? "#fcd34d" : "#92400e" }}>
                          {Array.from(new Set(wt.map(t => t.travel).filter(Boolean))).join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                {!isVac && wt.length > 0 && (
                  <span style={{
                    fontSize: 10, padding: "2px 8px", borderRadius: 12, fontWeight: 900,
                    background: isUnassignedRow ? "rgba(239,68,68,0.15)" : (theme === "dark" ? "rgba(255,255,255,0.08)" : `${w.color}15`),
                    color: isUnassignedRow ? "var(--color-danger-dark)" : (theme === "dark" ? "var(--text-main)" : w.color),
                    border: `1px solid ${isUnassignedRow ? "rgba(239,68,68,0.3)" : (theme === "dark" ? "rgba(255,255,255,0.15)" : `${w.color}35`)}`,
                  }}>{wt.length} TASKS</span>
                )}
                <div style={{ flex: 1 }} />
                {!isUnassignedRow && (
                  <button onClick={() => {
                    if (!isVac && wt.length > 0) {
                      if (!confirm(`${w.name}さんには${wt.length}件の予定があります。休暇にしますか？`)) return;
                    }
                    onToggleVacation && onToggleVacation(dateStr, w.id);
                  }} style={{
                    padding: "4px 12px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 800,
                    border: isVac ? "1px solid rgba(234,179,8,0.5)" : "1px solid var(--glass-border)",
                    background: isVac ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : "var(--glass-bg)",
                    color: isVac ? "#000" : "var(--text-sub)",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    backdropFilter: "blur(8px)",
                  }}
                    onMouseOver={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
                    onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
                  >{isVac ? <><IconCheck size={11} color="#000" /> 出勤に戻す</> : <><IconVacation size={11} color="var(--text-muted)" /> 休暇設定</>}</button>
                )}
                <button onClick={() => { const t = emptyTicket(); t.date = dateStr; t.person = isUnassignedRow ? "" : String(w.id); onEdit(t); }} style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: 8, cursor: "pointer", color: "var(--text-muted)", fontSize: 12, padding: "4px 10px", fontWeight: 800, transition: "all 0.2s" }}
                  onMouseOver={e => { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.color = "var(--text-accent)"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "var(--glass-bg)"; e.currentTarget.style.color = "var(--text-muted)"; }}>＋</button>
              </div>
              {wt.length > 0 && (
                <div style={{ overflowX: "auto", overflowY: "visible" }}>
                  <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: 12, tableLayout: "fixed" }}>
                    <colgroup>
                      <col style={{ width: 30 }} />
                      {currentCols.map(c => (
                        <col key={c.key} style={{ width: c.w }} />
                      ))}
                      <col style={{ width: 100 }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th style={{ width: 30, background: "var(--bg-alt)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border-light)", position: "sticky", left: 0, zIndex: 11 }} />
                        {currentCols.map(c => (
                          <th key={c.key} style={{ padding: "8px 4px", fontSize: 10, fontWeight: 800, color: "var(--text-muted)", textAlign: "center", verticalAlign: "middle", borderBottom: "1px solid var(--border-light)", whiteSpace: "nowrap", background: "var(--bg-alt)", backdropFilter: "blur(10px)", width: c.w, overflow: "hidden", textOverflow: "ellipsis", textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.label}</th>
                        ))}
                        <th style={{ width: 100, position: "sticky", right: 0, background: "var(--bg-alt)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border-light)", fontSize: 10, fontWeight: 800, color: "var(--text-muted)", padding: "8px 4px", zIndex: 12, textAlign: "center", boxShadow: "-2px 0 4px rgba(0,0,0,0.02)" }}>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wt.map((t, idx) => {
                        const tc = typeColors[t.type] || typeColors["その他"];
                        const isDone = t.result === "完了";
                        const isDragTarget = dragOver === t.id;
                        return (
                          <tr key={t.id} style={{
                            background: isDone ? "var(--res-bg-done)" : (t.result === "キャンセル" ? "var(--res-bg-cancel)" : (t.result === "保留" ? "var(--res-bg-pending)" : (t.result === "他担当分" ? "var(--res-bg-other)" : tc.bg))),
                            height: 72,
                            opacity: 1,
                            borderTop: isDragTarget ? "4px solid var(--text-accent)" : "none",
                            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
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
                            <td style={{ width: 30, textAlign: "center", cursor: "grab", verticalAlign: "middle", borderBottom: "1px solid var(--border-light)" }}>
                              <IconGrip size={12} color="var(--text-muted)" />
                            </td>
                            {currentCols.map(c => {
                              let clr = "var(--text-main)";
                              if (c.key === "area" || c.key === "prefecture") {
                                clr = getRegionColor(t.area, t.prefecture);
                              }
                              const isWork = c.key === "work";
                              const isEditing = editingCell && editingCell.id === t.id && editingCell.key === c.key;
                              const cellStyle = {
                                padding: "2px 3px",
                                whiteSpace: (isWork || c.key === "property") ? "normal" : "nowrap",
                                wordBreak: (isWork || c.key === "property") ? "break-all" : "normal",
                                overflow: "hidden",
                                textOverflow: (isWork || c.key === "property") ? "unset" : "ellipsis",
                                width: c.w,
                                height: 72,
                                verticalAlign: "middle",
                                textAlign: (isWork || c.key === "property") ? "left" : "center",
                                borderBottom: "1px solid var(--border-light)",
                                background: isDone ? "rgba(0,0,0,0.03)" : (t.result === "キャンセル" ? "rgba(239, 68, 68, 0.12)" : "transparent"),
                                color: clr,
                                fontWeight: c.key === "type" || c.key === "property" || c.key === "unit" ? 800 : 500,
                                cursor: c.type === "auto" ? "default" : "text",
                              };

                              // Inline editing
                              if (isEditing && c.type !== "auto" && c.key !== "result") {
                                const inputStyle = { width: "100%", padding: "2px 3px", border: "1px solid #2563eb", borderRadius: 2, fontSize: 12, boxSizing: "border-box", background: "var(--bg-input)", color: "var(--text-main)", outline: "none", boxShadow: "0 0 0 2px rgba(37,99,235,0.2)" };
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
                                  onMouseOver={e => { if (c.type !== "auto" && c.key !== "result") e.currentTarget.style.background = "var(--bg-hover, rgba(139,92,246,0.07))"; }}
                                  onMouseOut={e => { if (c.type !== "auto" && c.key !== "result") e.currentTarget.style.background = cellStyle.background; }}
                                  onClick={e => {
                                    e.stopPropagation();
                                    if (c.key === "work") {
                                      if (onView) onView(t);
                                    } else if (c.type !== "auto" && c.key !== "result") {
                                      setEditingCell({ id: t.id, key: c.key });
                                    }
                                  }}>
                                  {c.key === "work" || c.key === "property" ? (
                                    <div style={{
                                      display: "-webkit-box",
                                      WebkitLineClamp: c.key === "work" ? 3 : 2,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                      fontSize: c.key === "work" ? 12 : 13,
                                      lineHeight: 1.3,
                                      color: "var(--text-main)",
                                      fontWeight: c.key === "property" ? 800 : 500,
                                      width: "100%",
                                      wordBreak: "break-all"
                                    }}>
                                      {t[c.key] || ""}
                                    </div>
                                  ) : c.key === "kubun" && t.kubun ? (
                                    <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 3, background: "transparent", color: kubunColors[t.kubun]?.text || "inherit", border: `1px solid ${kubunColors[t.kubun]?.border || "var(--border-color)"}` }}>{t.kubun}</span>
                                  ) : c.key === "type" && t.type ? (
                                    <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 3, background: "transparent", color: tc?.badge || "var(--text-main)", border: `1px solid ${tc?.badge || "var(--border-color)"}` }}>{t.type}</span>
                                  ) : c.key === "unit" && t.unit ? (
                                    <span style={{ fontSize: 11, fontWeight: 700, padding: "1px 4px", borderRadius: 3, background: "rgba(100,116,139,0.08)", color: "var(--text-sub)", border: "1px solid rgba(100,116,139,0.15)" }}>{t.unit}</span>
                                  ) : c.key === "time" && t.time ? (
                                    <span style={{ fontSize: 10, fontWeight: 600, padding: "1px 4px", borderRadius: 3, background: "transparent", color: "#d97706", border: "1px solid rgba(245,158,11,0.4)" }}>{formatExcelTime(t.time) || t.time}</span>
                                  ) : (c.key === "area" || c.key === "prefecture") && t[c.key] ? (
                                    <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 3, background: "transparent", color: getRegionColor(t.area, t.prefecture), border: `1px solid ${getRegionColor(t.area, t.prefecture)}` }}>{t[c.key]}</span>
                                  ) : c.key === "timeSlot" && t.timeSlot ? (
                                    <span style={{ fontSize: 10, fontWeight: 600, padding: "1px 4px", borderRadius: 3, background: "rgba(59,130,246,0.1)", color: "#2563eb", border: "1px solid rgba(37,99,235,0.2)" }}>{t.timeSlot}</span>
                                  ) : c.key === "requestNo" && t.requestNo ? (
                                    <span style={{ fontSize: 10, fontWeight: 500, color: "var(--text-muted)", background: "var(--bg-alt)", padding: "1px 4px", borderRadius: 2 }}>{t.requestNo}</span>
                                  ) : (
                                    t[c.key] || ""
                                  )}
                                </td>
                              );
                            })}
                            <td style={{ position: "sticky", right: 0, zIndex: 10, background: isDone ? "var(--bg-alt)" : "var(--bg-app)", padding: "4px", borderBottom: "1px solid var(--border-light)", width: 100, height: 48, verticalAlign: "middle", boxShadow: "-2px 0 4px rgba(0,0,0,0.05)" }}>
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
                                  <button onClick={e => { e.stopPropagation(); onEdit(t); }} title="詳細編集" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 3, border: "1px solid var(--border-color)", background: "var(--bg-alt)", cursor: "pointer", transition: "background 0.15s" }}
                                    onMouseOver={e => e.currentTarget.style.background = "var(--calendar-cell-border)"}
                                    onMouseOut={e => e.currentTarget.style.background = "var(--bg-alt)"}>
                                    <IconEdit size={12} color="var(--text-sub)" />
                                  </button>
                                  <button onClick={e => { e.stopPropagation(); setMoveTicket(t); }} title="移動" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 3, border: "1px solid var(--border-color)", background: "var(--bg-alt)", cursor: "pointer", transition: "background 0.15s" }}
                                    onMouseOver={e => e.currentTarget.style.background = "var(--calendar-cell-border)"}
                                    onMouseOut={e => e.currentTarget.style.background = "var(--bg-alt)"}>
                                    <IconTransfer size={12} color="var(--text-muted)" />
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
                          <td colSpan={currentCols.length + 2} style={{ height: 16, borderTop: dragOver === `end_${w.id}` ? "3px solid #2563eb" : "none", transition: "border-top 0.1s" }} />
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
function ProcessingPool({ tickets, workers, allWorkers, onEdit, onDelete, onAssign }) {
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
          <IconPool size={20} color="#3b82f6" />
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "var(--text-main)" }}>Processing Pool</h2>
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-muted)" }}>{poolTickets.length}件</span>
        </div>
        <button onClick={() => { const t = emptyTicket(); t.date = ""; onEdit(t); }} style={{ padding: "6px 16px", borderRadius: 4, border: "none", background: "#1e40af", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
          <IconPlus size={12} color="#fff" /> 新規追加
        </button>
      </div>

      {/* Search */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "10px 16px",
        background: "var(--bg-alt)", backdropFilter: "blur(10px)",
        borderRadius: 10, border: "1px solid var(--border-color)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)"
      }}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        <input type="text" placeholder="依頼番号・号機・物件名で検索..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, border: "none", background: "transparent", fontSize: 13, outline: "none", color: "var(--text-main)", fontWeight: 500 }} />
        {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 14 }}>×</button>}
      </div>

      {/* Assign modal */}
      {assignTicket && (
        <div style={{ position: "fixed", inset: 0, background: "var(--bg-modal-overlay)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000 }} onClick={() => setAssignTicket(null)}>
          <div style={{ background: "var(--bg-app)", borderRadius: 8, padding: 24, width: 340, boxShadow: "var(--shadow)" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, color: "var(--text-main)" }}>
              <IconCalendar size={16} color="#3b82f6" /> スケジュールに配置
            </h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "0 0 14px" }}>{assignTicket.type} / {assignTicket.property}</p>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 3 }}>日付</label>
              <input type="date" value={assignDate} onChange={e => setAssignDate(e.target.value)}
                style={{ width: "100%", padding: "6px 8px", border: "1px solid var(--border-color)", borderRadius: 4, fontSize: 12, boxSizing: "border-box", background: "var(--bg-input)", color: "var(--text-main)" }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 3 }}>対応者（任意）</label>
              <select value={assignWorker} onChange={e => setAssignWorker(e.target.value)}
                style={{ width: "100%", padding: "6px 8px", border: "1px solid var(--border-color)", borderRadius: 4, fontSize: 12, background: "var(--bg-input)", color: "var(--text-main)" }}>
                <option value="">未定</option>
                {(allWorkers || workers).map(w => <option key={w.id} value={String(w.id)}>{w.name}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => setAssignTicket(null)} style={{ padding: "6px 14px", borderRadius: 4, border: "1px solid var(--border-color)", background: "var(--bg-app)", color: "var(--text-main)", fontSize: 11, cursor: "pointer" }}>キャンセル</button>
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
        <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>
          <IconPool size={40} color="var(--border-color)" />
          <p style={{ fontSize: 13, marginTop: 10 }}>{search ? "検索結果がありません" : "Poolにチケットはありません"}</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          {filtered.map(t => {
            const tc = typeColors[t.type] || typeColors["その他"];
            const w = workers.find(x => String(x.id) === t.person || x.name === t.person);
            return (
              <div key={t.id} className="glass-card" style={{
                borderRadius: 14,
                overflow: "hidden",
                display: "flex",
                boxShadow: "var(--shadow-glass)",
                borderColor: "var(--glass-border)"
              }}>
                <div style={{ width: 4, background: tc?.badge || "var(--border-color)", flexShrink: 0 }} />
                <div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 3, background: "rgba(255,255,255,0.03)", color: tc?.badge || "var(--text-muted)", border: `1px solid ${tc?.badge || "var(--border-color)"}`, flexShrink: 0 }}>{t.type}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-main)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.property || "未設定"}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-main)", fontWeight: 800, marginBottom: 4, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.2 }}>{t.work}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                    {t.requestNo && <span style={{ fontSize: 10, fontWeight: 500, color: "var(--text-muted)", background: "var(--bg-alt)", padding: "1px 4px", borderRadius: 2 }}>{t.requestNo}</span>}
                    {t.unit && <span style={{ fontSize: 11, fontWeight: 700, padding: "1px 4px", borderRadius: 3, background: "rgba(100,116,139,0.12)", color: "var(--text-sub)", border: "1px solid rgba(100,116,139,0.15)" }}>{t.unit}</span>}
                    {w && <span style={{ color: w.color, fontWeight: 700 }}>{w.name}</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <button onClick={() => { setAssignTicket(t); setAssignDate(""); setAssignWorker(t.person || ""); }} title="配置" style={{ display: "flex", alignItems: "center", gap: 3, padding: "3px 8px", borderRadius: 4, border: "1px solid #2563eb", background: "#eff6ff", color: "#2563eb", fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "background 0.15s" }}
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
function TicketDetailModal({ ticket, workers, perms, onClose, onEdit, onDelete }) {
  const tc = typeColors[ticket.type] || typeColors["その他"];
  const w = workers.find(x => String(x.id) === ticket.person);
  const d = new Date(ticket.date + "T00:00:00");
  const dow = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  const labelStyle = { fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 4, marginLeft: 2 };
  const valStyle = { 
    fontSize: 14, 
    fontWeight: 500, 
    color: "var(--text-main)", 
    height: 38, 
    display: "flex", 
    alignItems: "center", 
    padding: "0 12px", 
    background: "rgba(128,128,128,0.05)", 
    border: "1px solid var(--border-light)", 
    borderRadius: 6, 
    wordBreak: "break-all",
    boxSizing: "border-box",
    overflow: "hidden"
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "var(--bg-modal-overlay)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }} onClick={onClose}>
      <div className="glass-panel" style={{
        width: 720, maxWidth: "100%", maxHeight: "90vh", borderRadius: 24, overflow: "hidden", display: "flex", flexDirection: "column",
        boxShadow: "var(--shadow-lg), 0 0 100px rgba(0,0,0,0.2)",
        borderColor: "var(--glass-border)",
        animation: "modalFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
      }} onClick={e => e.stopPropagation()}>
        {/* Header (Title: タイプ 号機 物件名) */}
        <div style={{ background: tc?.bg || "var(--bg-app)", borderRadius: "24px 24px 0 0", padding: "18px 24px", borderBottom: `3px solid ${tc?.badge || "var(--border-color)"}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: tc?.badge || "var(--text-main)", padding: "4px 10px", background: "rgba(255,255,255,0.03)", border: `2px solid ${tc?.badge || "var(--border-color)"}`, borderRadius: 6, lineHeight: 1, alignSelf: "center" }}>{ticket.type || "未設定"}</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: tc.text, opacity: 0.9, lineHeight: 1, whiteSpace: "nowrap" }}>{ticket.unit || "号機なし"}</span>
            <span style={{ 
              fontSize: 20, 
              fontWeight: 800, 
              color: tc.text, 
              lineHeight: 1.2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}>{ticket.property || "物件名なし"}</span>
          </div>
          <button onClick={onClose} style={{ background: "rgba(0,0,0,0.1)", border: "none", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: tc.text, transition: "0.2s" }} className="hover-scale">
            <IconX size={18} color={tc.text} />
          </button>
        </div>

        <div style={{ padding: "20px 24px", overflowY: "auto" }}>
          {/* Sub Row (Date, Time, Person, Companion, TIME) */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 24px", marginBottom: 24, padding: "14px 18px", background: "var(--bg-alt)", borderRadius: 14, border: "1px solid var(--border-light)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <IconCalendar size={16} color="var(--text-muted)" />
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-main)" }}>{d.getFullYear()}/{d.getMonth() + 1}/{d.getDate()}({dow})</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <IconClock size={16} color="var(--text-muted)" />
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-main)" }}>{formatExcelTime(ticket.time) || "時間未指定"}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <IconPerson size={16} color="var(--text-muted)" />
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {w && <UserAvatar user={w} size={26} />}
                <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text-main)" }}>{w ? w.name : (ticket.person || "未割当")}</span>
              </div>
            </div>
            {ticket.companion && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <IconPeople size={16} color="var(--text-muted)" />
                <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text-main)" }}>{ticket.companion}</span>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "var(--text-muted)", letterSpacing: "0.05em" }}>TIME</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text-main)" }}>{ticket.timeSlot || "—"}</span>
            </div>
          </div>

          {/* Item 1: Grid (RequestNo, BOX, Category, Result / Area, Prefecture, Travel, Course) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px 20px", marginBottom: 24, alignItems: "start" }}>
            {[
              { label: "依頼番号", val: ticket.requestNo },
              { label: "BOX", val: ticket.box },
              { label: "種別", val: ticket.category },
              { label: "結果", val: ticket.result, isResult: true },
              { label: "エリア", val: ticket.area },
              { label: "県別", val: ticket.prefecture },
              { label: "移動", val: ticket.travel },
              { label: "コース", val: ticket.course },
            ].map(({ label, val, isResult }) => (
              <div key={label}>
                <div style={labelStyle}>{label}</div>
                {isResult ? (
                  <div style={{ ...valStyle, background: val ? (resultColors[val] || "var(--bg-alt)") : "rgba(128,128,128,0.05)", fontWeight: val ? 700 : 500, color: val ? "var(--text-main)" : "var(--text-muted)" }}>{val || "—"}</div>
                ) : (
                  <div style={valStyle}>{val || "—"}</div>
                )}
              </div>
            ))}
          </div>

          {/* Item 2: Work content (Full width, large) */}
          <div style={{ marginBottom: 24 }}>
            <div style={labelStyle}><IconWrench size={12} color="var(--text-muted)" /> 作業内容</div>
            <div style={{ ...valStyle, height: "auto", minHeight: 140, padding: "16px 20px", alignItems: "flex-start", lineHeight: "1.7", whiteSpace: "pre-wrap", background: "rgba(30,64,175,0.04)", border: "1px solid rgba(30,64,175,0.12)", color: "var(--text-main)", fontSize: 15.5 }}>{ticket.work || "—"}</div>
          </div>

          {/* Item 3: Notes */}
          <div style={{ marginBottom: 8 }}>
            <div style={labelStyle}><IconNote size={12} color="var(--text-muted)" /> 備考</div>
            <div style={{ ...valStyle, height: "auto", minHeight: 48, padding: "12px 18px", alignItems: "flex-start", lineHeight: "1.6", whiteSpace: "pre-wrap", background: "rgba(0,0,0,0.03)" }}>{ticket.notes || "なし"}</div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 14, borderTop: "1px solid var(--border-color)" }}>
            {perms?.canDeleteTicket(ticket) && (
              <button onClick={() => { if (window.confirm("本当に削除しますか？")) { onClose(); onDelete(ticket.id); } }} style={{ padding: "7px 16px", borderRadius: 4, border: "1px solid #fca5a5", background: "var(--bg-app)", color: "#dc2626", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><IconTrash size={13} color="#dc2626" /> 削除</button>
            )}
            {perms?.canEditTicket(ticket) && (
              <button onClick={() => { onClose(); onEdit({ ...ticket, _lockPerson: true }); }} style={{ padding: "7px 20px", borderRadius: 4, border: "none", background: "#1e40af", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><IconEdit size={13} color="#fff" /> 編集</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Form Modal ---
function TicketFormModal({ ticket, perms, onSave, onClose, isNew, workers, lockPerson }) {
  const [isManualUnlock, setIsManualUnlock] = useState(false);
  const isLocked = (lockPerson || ticket?._lockPerson) && !isManualUnlock;
  const canUnlock = perms?.isAdmin || perms?.userRole === "dispatcher";

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
  const iStyle = { width: "100%", padding: "5px 7px", border: "1px solid var(--border-color)", borderRadius: 3, fontSize: 12, boxSizing: "border-box", background: "var(--bg-input)", color: "var(--text-main)" };
  return (
    <div style={{ position: "fixed", inset: 0, background: "var(--bg-modal-overlay)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: 20 }} onClick={onClose}>
      <div className="glass-panel" style={{
        width: 760, maxWidth: "100%", maxHeight: "92vh", borderRadius: 28, overflow: "hidden", display: "flex", flexDirection: "column",
        boxShadow: "var(--shadow-lg), 0 0 120px rgba(0,0,0,0.25)",
        borderColor: "var(--glass-border)",
        animation: "modalFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        padding: 22
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "var(--text-main)" }}>{isNew ? "新規チケット" : "チケット編集"}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "var(--text-muted)" }}>✕</button>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)" }}>日付</label>
            {isLocked && canUnlock && (
              <button onClick={() => setIsManualUnlock(true)} title="ロック解除" style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 3, color: "var(--text-accent)", fontSize: 10, fontWeight: 700 }}>
                <IconLock size={12} /> ロック中
              </button>
            )}
            {!isLocked && (lockPerson || ticket?._lockPerson) && canUnlock && (
              <button onClick={() => setIsManualUnlock(false)} title="再ロック" style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 3, color: "var(--text-muted)", fontSize: 10 }}>
                <IconLockOpen size={12} /> 解除済み
              </button>
            )}
          </div>
          <input type="date" value={form.date} onChange={e => set("date", e.target.value)} style={{ ...iStyle, fontSize: 13, opacity: isLocked ? 0.6 : 1, pointerEvents: isLocked ? "none" : "auto" }} readOnly={isLocked} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px 10px", marginBottom: 12 }}>
          {ALL_COLS.filter(c => c.key !== "notes" && c.key !== "work").map(c => (
            <div key={c.key}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: c.key === "faultLevel" && form.faultLevel ? FAULT_LEVEL_COLORS[form.faultLevel] : "var(--text-muted)" }}>
                  {c.label}{c.key === "faultLevel" && form.faultLevel ? ` (${form.faultLevel})` : ""}
                </label>
                {c.key === "person" && isLocked && canUnlock && (
                  <button onClick={() => setIsManualUnlock(true)} title="ロック解除" style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--text-accent)" }}>
                    <IconLock size={12} />
                  </button>
                )}
                {c.key === "person" && !isLocked && (lockPerson || ticket?._lockPerson) && canUnlock && (
                  <button onClick={() => setIsManualUnlock(false)} title="再ロック" style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--text-muted)" }}>
                    <IconLockOpen size={12} />
                  </button>
                )}
              </div>
              {c.key === "person" || c.key === "companion" ? (
                <select value={form[c.key]} onChange={e => set(c.key, e.target.value)} style={{ ...iStyle, opacity: (c.key === "person" && isLocked) ? 0.6 : 1, pointerEvents: (c.key === "person" && isLocked) ? "none" : "auto" }} disabled={c.key === "person" && isLocked}>
                  <option value="">—</option>
                  {workers
                    .filter(w => ["admin", "dispatcher", "field_engineer"].includes(w.sche_role))
                    .map(w => <option key={w.id} value={String(w.id)}>{w.name}</option>)}
                </select>
              ) : c.key === "faultLevel" ? (
                <input type="text" value={form.faultLevel || ""} readOnly style={{ ...iStyle, background: form.faultLevel ? (FAULT_LEVEL_COLORS[form.faultLevel] || "var(--bg-alt)") : "var(--bg-alt)", color: form.faultLevel ? "#fff" : "var(--text-muted)", fontWeight: 700, textAlign: "center" }} />
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

        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)" }}>作業内容</label>
          <textarea value={form.work || ""} onChange={e => set("work", e.target.value)} style={{ ...iStyle, height: 60, resize: "none" }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)" }}>備考</label>
          <textarea value={form.notes || ""} onChange={e => set("notes", e.target.value)} style={{ ...iStyle, height: 60, resize: "none" }} />
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 18, paddingTop: 12, borderTop: "1px solid var(--border-color)" }}>
          <button onClick={onClose} style={{ padding: "6px 16px", borderRadius: 4, border: "1px solid var(--border-color)", background: "var(--bg-app)", color: "var(--text-main)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>キャンセル</button>
          {perms?.canEditTicket(form) && (
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
            }} style={{ padding: "6px 20px", borderRadius: 4, border: "none", background: "#1e40af", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>保存</button>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Admin Modal (Type & Worker master + sche_role) ---
function AdminModal({ types, workers, perms, onSaveTypes, onSaveWorkers, onClose }) {
  const [tab, setTab] = useState("types");

  // Type master state
  const [typeList, setTypeList] = useState(types.map(t => ({ name: t, color: typeColors[t] || DEFAULT_TYPE_COLORS["その他"] })));
  const [newTypeName, setNewTypeName] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(0);

  // Worker master state
  const [workerList, setWorkerList] = useState(workers.map(w => ({ ...w, sche_role: w.sche_role || "view" })));
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

  const SCHE_ROLES = ["admin", "dispatcher", "field_engineer", "editor", "view"];
  const SCHE_ROLE_LABELS = { 
    admin: "管理者 (Admin)", 
    dispatcher: "配車担当 (Dispatcher)", 
    field_engineer: "案件担当 (FE)", 
    editor: "編集専従 (Editor)", 
    view: "閲覧者 (View)" 
  };
  const SCHE_ROLE_COLORS = { 
    admin: "#dc2626", 
    dispatcher: "#ea580c", 
    field_engineer: "#2563eb", 
    editor: "#9333ea", 
    view: "#64748b" 
  };

  const addType = () => {
    if (editingTypeIdx !== null) {
      if (!newTypeName.trim()) { alert("タイプ名を入力してください"); return; }
      if (typeList.some((t, i) => i !== editingTypeIdx && t.name === newTypeName.trim())) { alert("同名のタイプが存在します"); return; }
      const n = [...typeList];
      const color = TYPE_COLOR_PRESETS[selectedPreset] || TYPE_COLOR_PRESETS[0];
      n[editingTypeIdx] = { name: newTypeName.trim(), color };
      setTypeList(n);
      setEditingTypeIdx(null);
    } else {
      if (!newTypeName.trim()) return;
      if (typeList.some(t => t.name === newTypeName.trim())) { alert("同名のタイプが存在します"); return; }
      const color = TYPE_COLOR_PRESETS[selectedPreset] || TYPE_COLOR_PRESETS[0];
      setTypeList([...typeList, { name: newTypeName.trim(), color }]);
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
      .select("id, email, display_name, sche_role, avatar_url, avatar_url2")
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
    // 新規追加時のデフォルトRoleはView
    const roleToSet = profile.sche_role || "view";
    if (!profile.sche_role) {
      await supabase.from("profiles").update({ sche_role: "view" }).eq("id", profile.id);
    }
    const newW = {
      id: profile.id,
      name: profile.display_name || profile.email,
      color: workerColors[workerList.length % workerColors.length],
      sche_role: roleToSet,
      email: profile.email,
      avatar_url: profile.avatar_url,
      avatar_url2: profile.avatar_url2
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
    <div style={{ position: "fixed", inset: 0, background: "var(--bg-modal-overlay)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={onClose}>
      <div className="glass-panel" style={{
        width: 840, maxWidth: "95%", height: "92vh", borderRadius: 32, display: "flex", flexDirection: "column",
        boxShadow: "var(--shadow-lg), 0 0 150px rgba(0,0,0,0.3)",
        borderColor: "var(--glass-border)",
        overflow: "hidden",
        animation: "modalFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: "16px 24px", background: "var(--bg-header)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <h2 style={{ margin: 0, color: "var(--bg-header-text)", fontSize: 18, fontWeight: 900 }}>管理者設定 / Master Data</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--bg-header-text)", cursor: "pointer", padding: 4, borderRadius: "50%" }}>
            <IconX size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: "var(--bg-header)", padding: "0 24px" }}>
          {["types", "workers", "equipment"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "12px 20px", border: "none", background: "none",
              color: tab === t ? "var(--bg-header-text)" : "rgba(255,255,255,0.5)",
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              borderBottom: tab === t ? "3px solid #60a5fa" : "3px solid transparent",
              transition: "all 0.2s"
            }}>
              {t === "types" ? "案件タイプ設定" : t === "workers" ? "対応者(ユーザー)管理" : "号機・物件マスタ管理"}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 24, background: "var(--bg-app)" }}>
          {tab === "types" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div>
                <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 800, color: "var(--text-main)", borderLeft: "4px solid #3b82f6", paddingLeft: 10 }}>タイプの新規追加 / 編集</h4>
                <div style={{ background: "var(--bg-alt)", padding: 16, borderRadius: 8, border: "1px solid var(--border-color)" }}>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 4 }}>タイプ名</label>
                    <input type="text" value={newTypeName} onChange={e => setNewTypeName(e.target.value)} placeholder="例: 定期点検" style={{ width: "100%", padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: 4, fontSize: 13, background: "var(--bg-input)", color: "var(--text-main)", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 4 }}>カラープリセット</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {TYPE_COLOR_PRESETS.map((p, pi) => (
                        <button key={pi} onClick={() => setSelectedPreset(pi)}
                          style={{ width: 28, height: 28, borderRadius: "50%", border: selectedPreset === pi ? "3px solid #3b82f6" : "1px solid var(--border-color)", background: p.badge, cursor: "pointer", transition: "all 0.1s" }} />
                      ))}
                    </div>
                  </div>
                  <button onClick={addType} style={{ width: "100%", padding: "10px", borderRadius: 4, border: "none", background: "#3b82f6", color: "#fff", fontWeight: 700, cursor: "pointer" }}>{editingTypeIdx !== null ? "変更を保存" : "タイプを追加"}</button>
                  {editingTypeIdx !== null && (
                    <button onClick={() => { setEditingTypeIdx(null); setNewTypeName(""); }} style={{ width: "100%", padding: "8px", marginTop: 8, borderRadius: 4, border: "1px solid var(--border-color)", background: "var(--bg-app)", color: "var(--text-main)", cursor: "pointer", fontSize: 12 }}>キャンセル</button>
                  )}
                </div>
              </div>
              <div>
                <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 800, color: "var(--text-main)" }}>登録済みタイプ一覧</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {typeList.map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "var(--bg-app)", border: "1px solid var(--border-color)", borderRadius: 6, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ width: 14, height: 14, borderRadius: "50%", background: t.color?.badge || "#cbd5e1" }} />
                        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-main)" }}>{t.name}</span>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => { 
                          setEditingTypeIdx(i); 
                          setNewTypeName(t.name); 
                          const idx = TYPE_COLOR_PRESETS.findIndex(p => p.badge === t.color?.badge);
                          setSelectedPreset(idx === -1 ? 0 : idx); 
                        }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--text-muted)" }} onMouseOver={e => e.currentTarget.style.color = "#3b82f6"} onMouseOut={e => e.currentTarget.style.color = "#94a3b8"}><IconEdit size={14} /></button>
                        <button onClick={() => removeType(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--text-muted)" }} onMouseOver={e => e.currentTarget.style.color = "#ef4444"} onMouseOut={e => e.currentTarget.style.color = "#94a3b8"}><IconTrash size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "workers" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {workerList.map(w => (
                <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "var(--bg-app)", border: "1px solid var(--border-color)", borderRadius: 6 }}>
                  <UserAvatar user={w} size={24} />
                  {editingWorkerId === w.id ? (
                    <>
                      <input value={newWorkerName} onChange={e => setNewWorkerName(e.target.value)}
                        style={{ flex: 1, padding: "3px 8px", border: "1px solid #3b82f6", borderRadius: 3, fontSize: 13, background: "var(--bg-input)", color: "var(--text-main)" }} autoFocus />
                      <button onClick={updateWorkerName} style={{ padding: "3px 8px", borderRadius: 3, border: "none", background: "#1e40af", color: "#fff", fontSize: 11, cursor: "pointer" }}>OK</button>
                      <button onClick={() => { setEditingWorkerId(null); setNewWorkerName(""); }} style={{ padding: "3px 8px", borderRadius: 3, border: "1px solid var(--border-color)", background: "var(--bg-app)", color: "var(--text-main)", fontSize: 11, cursor: "pointer" }}>×</button>
                    </>
                  ) : (
                    <>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "var(--text-main)" }}>{w.name}</span>
                      <select value={w.sche_role || "view"} onChange={e => changeRole(w.id, e.target.value)}
                        disabled={!perms?.canManageRoles}
                        style={{ padding: "2px 4px", border: "1px solid var(--border-color)", borderRadius: 3, fontSize: 11, background: "var(--bg-input)", color: SCHE_ROLE_COLORS[w.sche_role || "view"] || SCHE_ROLE_COLORS["view"], fontWeight: 700, cursor: perms?.canManageRoles ? "pointer" : "default", opacity: perms?.canManageRoles ? 1 : 0.8 }}>
                        {SCHE_ROLES.map(r => <option key={r} value={r}>{SCHE_ROLE_LABELS[r] || r}</option>)}
                      </select>
                      <button onClick={() => { setEditingWorkerId(w.id); setNewWorkerName(w.name); }} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", color: "var(--text-muted)" }}><IconEdit size={13} /></button>
                      <button onClick={() => removeWorker(w.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", padding: "2px" }}><IconTrash size={13} color="#ef4444" /></button>
                    </>
                  )}
                </div>
              ))}

              {/* 案件担当 FE追加（メール確認） */}
              <div style={{ margin: "14px 0 6px", padding: "10px", background: "var(--bg-alt)", borderRadius: 6, border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-main)", marginBottom: 6 }}>案件担当 (FE) を追加（メールアドレスで検索）</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <input value={newWorkerEmail} onChange={e => setNewWorkerEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && searchByEmail()}
                    placeholder="email@example.com" style={{ flex: 1, padding: "5px 8px", border: "1px solid var(--border-color)", borderRadius: 3, fontSize: 12, background: "var(--bg-input)", color: "var(--text-main)" }} />
                  <button onClick={searchByEmail} disabled={emailSearching}
                    style={{ padding: "5px 12px", borderRadius: 3, border: "none", background: "#475569", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", opacity: emailSearching ? 0.6 : 1 }}>
                    {emailSearching ? "検索中..." : "検索"}
                  </button>
                </div>
                {emailSearchResult && (
                  <div style={{ marginTop: 8 }}>
                    {emailSearchResult.found ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", background: "rgba(22, 163, 74, 0.1)", borderRadius: 4, border: "1px solid #16a34a" }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#16a34a", flex: 1 }}>
                          {emailSearchResult.profile.display_name || emailSearchResult.profile.email} を追加しますか？
                        </span>
                        <button onClick={addWorkerFromProfile}
                          style={{ padding: "4px 12px", borderRadius: 3, border: "none", background: "#16a34a", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>追加</button>
                      </div>
                    ) : (
                      <div style={{ fontSize: 12, color: "#ef4444", padding: "4px 0" }}>{emailSearchResult.message}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "equipment" && (
            <div style={{ padding: "10px", background: "var(--bg-alt)", borderRadius: 6, border: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-main)", marginBottom: 12 }}>新規号機の追加</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>号機 (Machine number)</label>
                  <input type="number" value={eqMachine} onChange={e => setEqMachine(e.target.value)}
                    placeholder="例: 1234" style={{ width: "100%", padding: "6px 8px", border: "1px solid var(--border-color)", borderRadius: 4, fontSize: 13, boxSizing: "border-box", background: "var(--bg-input)", color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>物件名 (Property name)</label>
                  <input type="text" value={eqProp} onChange={e => setEqProp(e.target.value)}
                    placeholder="例: フルタイムレジデンス" style={{ width: "100%", padding: "6px 8px", border: "1px solid var(--border-color)", borderRadius: 4, fontSize: 13, boxSizing: "border-box", background: "var(--bg-input)", color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>県別 (prefectures)</label>
                  <input type="text" value={eqPref} onChange={e => setEqPref(e.target.value)}
                    placeholder="例: 東京都" style={{ width: "100%", padding: "6px 8px", border: "1px solid var(--border-color)", borderRadius: 4, fontSize: 13, boxSizing: "border-box", background: "var(--bg-input)", color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>エリア (address)</label>
                  <input type="text" value={eqAddr} onChange={e => setEqAddr(e.target.value)}
                    placeholder="例: 千代田区" style={{ width: "100%", padding: "6px 8px", border: "1px solid var(--border-color)", borderRadius: 4, fontSize: 13, boxSizing: "border-box", background: "var(--bg-input)", color: "var(--text-main)" }} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 12, color: eqMsg?.error ? "#ef4444" : "#16a34a", fontWeight: 600 }}>{eqMsg?.text}</div>
                <button onClick={addEquipment} disabled={eqAdding}
                  style={{ padding: "6px 20px", borderRadius: 4, border: "none", background: "#1e40af", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: eqAdding ? 0.6 : 1 }}>
                  {eqAdding ? "追加中..." : "追加"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", padding: "16px 24px", borderTop: "1px solid var(--border-color)", background: "var(--bg-alt)" }}>
          <button onClick={onClose} style={{ padding: "6px 14px", borderRadius: 3, border: "1px solid var(--border-color)", background: "var(--bg-app)", color: "var(--text-main)", fontSize: 12, cursor: "pointer" }}>キャンセル</button>
          <button onClick={save} style={{ padding: "6px 18px", borderRadius: 3, border: "none", background: "#1e40af", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>保存</button>
        </div>
      </div>
    </div>
  );
}

// --- Legend ---
function Legend({ workers, hoveredDate, tickets }) {
  const dayTickets = hoveredDate ? tickets.filter(t => t.date === hoveredDate) : [];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", padding: "6px 0" }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)" }}>対応者:</span>
      {workers.map(w => {
        const wTickets = dayTickets.filter(t => String(t.person) === String(w.id));
        const hasAssigned = wTickets.length > 0;
        let borderColor = "transparent";
        if (hoveredDate && hasAssigned) borderColor = "#3b82f6";
        return (
          <span key={w.id} style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10 }}>
            <UserAvatar user={w} size={22} style={{
              border: `2px solid ${borderColor}`,
              boxShadow: hasAssigned && hoveredDate ? `0 0 6px ${borderColor}40` : "none",
              transition: "border 0.2s, box-shadow 0.2s"
            }} />
            <span style={{ color: "var(--text-main)", fontWeight: 600 }}>{w.name}</span>
          </span>
        );
      })}
    </div>
  );
}
// --- Login Screen ---
// --- Floating Mini Calendar Widget ---
function MiniCalendarWidget({ onNavigate, todayStr, initialDate }) {
  const now = new Date(initialDate + "T00:00:00");
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [pos, setPos] = useState({ x: 20, y: 110 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const weeks = useMemo(() => getMonthCalendar(calYear, calMonth), [calYear, calMonth]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
    setDragOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  }, [pos]);

  useEffect(() => {
    if (!dragging) return;
    const move = (e) => setPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    const up = () => setDragging(false);
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    return () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseup", up); };
  }, [dragging, dragOffset]);

  const prevM = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); };
  const nextM = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); };

  return (
    <div className="glass-panel" style={{
      position: "fixed", left: pos.x, top: pos.y, zIndex: 8000,
      width: 230,
      borderRadius: 20,
      boxShadow: "var(--shadow-lg), 0 10px 40px rgba(0,0,0,0.2)",
      overflow: "hidden",
      userSelect: "none",
      animation: "modalFadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
    }}>
      {/* Drag handle / header */}
      <div onMouseDown={handleMouseDown} style={{
        cursor: dragging ? "grabbing" : "grab",
        padding: "8px 10px",
        background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(99,102,241,0.1))",
        borderBottom: "1px solid var(--glass-border)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button onClick={prevM} style={{ background: "none", border: "none", color: "var(--text-accent)", cursor: "pointer", fontSize: 14, padding: "0 2px", fontWeight: 700 }}>‹</button>
          <span style={{ fontSize: 11, fontWeight: 800, color: "var(--text-main)", minWidth: 80, textAlign: "center" }}>{calYear}年{calMonth + 1}月</span>
          <button onClick={nextM} style={{ background: "none", border: "none", color: "var(--text-accent)", cursor: "pointer", fontSize: 14, padding: "0 2px", fontWeight: 700 }}>›</button>
        </div>
        <button onClick={() => onNavigate(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 14, padding: "0 2px", lineHeight: 1 }}>
          <IconX size={12} color="var(--text-muted)" />
        </button>
      </div>
      {/* DOW mini */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", padding: "4px 4px 0" }}>
        {DOW_HEADERS.map((d, i) => (
          <div key={i} style={{
            textAlign: "center", fontSize: 9, fontWeight: 800, padding: "2px 0",
            color: i === 6 ? "var(--color-sun)" : i === 5 ? "var(--color-sat)" : "var(--text-muted)",
          }}>{d}</div>
        ))}
      </div>
      {/* Day grid */}
      <div style={{ padding: "2px 4px 6px" }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1 }}>
            {week.map((cell, ci) => {
              if (!cell) return <div key={ci} />;
              const isToday = cell.dateStr === todayStr;
              const isSun = ci === 6, isSat = ci === 5;
              const holidayName = isHoliday(cell.dateStr);
              return (
                <button key={ci} onClick={() => onNavigate(cell.dateStr)} style={{
                  width: "100%", aspectRatio: "1", border: "none", borderRadius: 5, cursor: "pointer",
                  fontSize: 10, fontWeight: isToday ? 900 : 600,
                  background: isToday ? "var(--accent-today)" : "transparent",
                  color: isToday ? "#fff" : (isSun || !!holidayName) ? "var(--color-sun)" : isSat ? "var(--color-sat)" : "var(--text-main)",
                  transition: "background 0.15s, transform 0.1s",
                  padding: 0,
                }}
                  onMouseOver={e => { if (!isToday) e.currentTarget.style.background = "rgba(37,99,235,0.12)"; e.currentTarget.style.transform = "scale(1.15)"; }}
                  onMouseOut={e => { if (!isToday) e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
                >{cell.day}</button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'email profile',
        redirectTo: window.location.origin.replace(/\/$/, '')
      }
    });
    if (error) {
      alert("ログインエラー: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(circle at top left, #1e293b 0%, #0f172a 100%)",
      margin: 0, padding: 0, overflow: "hidden", position: "relative",
      fontFamily: "'Inter', 'Noto Sans JP', sans-serif"
    }}>
      {/* Abstract Background Elements */}
      <div style={{ position: "absolute", top: "10%", left: "5%", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", bottom: "5%", right: "5%", width: "45vw", height: "45vw", background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)" }} />
      
      <div style={{
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(24px) saturate(1.8)",
        WebkitBackdropFilter: "blur(24px) saturate(1.8)",
        padding: "54px 44px",
        borderRadius: 28,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.08)",
        textAlign: "center",
        maxWidth: 440,
        width: "90%",
        zIndex: 10,
        animation: "fadeIn 0.8s ease-out"
      }}>
        <h1 style={{
          fontSize: 34, fontWeight: 900, color: "#fff", margin: "0 0 10px",
          letterSpacing: "-0.04em", lineHeight: 1.1
        }}>Schedule System</h1>
        <p style={{
          fontSize: 14, color: "rgba(255, 255, 255, 0.55)", margin: "0 0 44px",
          fontWeight: 500, letterSpacing: "0.02em"
        }}>Microsoft アカウントでサインインしてください</p>
        
        <button
          onClick={handleLogin}
          disabled={loading}
          onMouseOver={e => {
            if (!loading) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.25)";
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#000";
            }
          }}
          onMouseOut={e => {
            if (!loading) {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.color = "#fff";
            }
          }}
          style={{
            width: "100%", padding: "16px", background: "rgba(255, 255, 255, 0.1)",
            color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: 14, fontSize: 15,
            fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center",
            justifyContent: "center", gap: 14, transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            backdropFilter: "blur(5px)"
          }}
        >
          {loading ? "認証中..." : (
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

      <style>{`
        body { margin: 0; padding: 0; overflow: hidden; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
// --- Error Boundary ---
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error("ErrorBoundary caught:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: "red", background: "#fff", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h2 style={{ fontSize: 18, marginBottom: 12 }}>アプリの描画中にエラーが発生しました</h2>
          <pre style={{ fontSize: 11, background: "#f1f5f9", padding: 12, borderRadius: 6, maxWidth: "90%", overflow: "auto" }}>{this.state.error?.toString()}</pre>
          <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
            <button onClick={() => window.location.reload()} style={{ padding: "8px 24px", borderRadius: 4, background: "#1e293b", color: "#fff", cursor: "pointer", border: "none" }}>リロード</button>
            <button onClick={() => { this.setState({ hasError: false, error: null }); }} style={{ padding: "8px 24px", borderRadius: 4, background: "#e2e8f0", color: "#1e293b", cursor: "pointer", border: "1px solid #cbd5e1" }}>エラー解消を試みる</button>
          </div>
        </div>
      );

    }
    return this.props.children;
  }
}

// --- Global Styles ---
const GlobalStyles = () => (
  <style>{`
    :root {
      /* Light Mode - Premium Glass */
      --bg-body: #f1f5f9;
      --bg-body-gradient: radial-gradient(circle at top left, #f8fafc 0%, #e2e8f0 100%);
      --bg-app: rgba(255, 255, 255, 0.4);
      --bg-header: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%);
      --bg-header-solid: #0f172a;
      --bg-header-text: #ffffff;
      --bg-alt: rgba(255, 255, 255, 0.3);
      --bg-hover: rgba(59, 130, 246, 0.08);
      --bg-input: rgba(255, 255, 255, 0.5);
      --bg-modal-overlay: rgba(15, 23, 42, 0.3);
      --border-color: rgba(255, 255, 255, 0.35);
      --border-light: rgba(255, 255, 255, 0.25);
      --text-main: #0f172a;
      --text-sub: #334155;
      --text-muted: #64748b;
      --text-accent: #2563eb;
      --text-on-dark: #ffffff;
      --color-danger-dark: #ef4444;
      --color-warning-light: rgba(254, 243, 199, 0.5);
      --color-warning-dark: #92400e;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
      --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      --shadow-glass: 0 8px 32px rgba(31,38,135,0.05), inset 0 1px 1px rgba(255,255,255,0.4);
      --shadow-glass-intense: 0 12px 40px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.6);
      --calendar-grid-border: rgba(255, 255, 255, 0.35);
      --calendar-cell-border: rgba(255, 255, 255, 0.2);
      --bg-sat: rgba(241, 247, 255, 0.4);
      --bg-sun: rgba(255, 241, 242, 0.4);
      --bg-today: rgba(37, 99, 235, 0.08);
      --accent-today: #2563eb;
      --glass-bg: rgba(255, 255, 255, 0.65);
      --glass-border: rgba(255, 255, 255, 0.5);
      --glass-bg-panel: rgba(255, 255, 255, 0.45);
      --glass-saturation: 2.2;
      --glass-blur: 32px;
      --radius-lg: 28px;
      --radius-md: 18px;
      --radius-sm: 10px;
      --color-sat: #1d4ed8;
      --color-sun: #dc2626;

      /* Type Colors - Light */
      --type-bg-inspect: rgba(255, 247, 237, 0.5); --type-badge-inspect: #f97316; --type-text-inspect: #9a3412;
      --type-bg-repair: rgba(240, 249, 255, 0.5); --type-badge-repair: #0ea5e9; --type-text-repair: #0c4a6e;
      --type-bg-install: rgba(240, 253, 244, 0.5); --type-badge-install: #22c55e; --type-text-install: #166534;
      --type-bg-remove: rgba(250, 245, 255, 0.5); --type-badge-remove: #a855f7; --type-text-remove: #6b21a8;
      --type-bg-maint: rgba(255, 241, 242, 0.5); --type-badge-maint: #f43f5e; --type-text-maint: #9f1239;
      --type-bg-other: rgba(241, 245, 249, 0.5); --type-badge-other: #64748b; --type-text-other: #334155;

      /* Result Colors - Light */
      --res-bg-done: rgba(220, 252, 231, 0.6);
      --res-bg-cancel: rgba(254, 226, 226, 0.6);
      --res-bg-pending: rgba(254, 243, 199, 0.6);
      --res-bg-other: rgba(241, 245, 249, 0.6);
    }

    [data-theme='dark'] {
      /* Deep Midnight Dark Mode */
      --bg-body: #02040a;
      --bg-body-gradient: radial-gradient(circle at top left, #0f172a 0%, #02040a 100%);
      --bg-app: rgba(15, 23, 42, 0.6);
      --bg-header: linear-gradient(135deg, #000000 0%, #0f172a 100%);
      --bg-header-solid: #000000;
      --bg-header-text: #ffffff;
      --bg-alt: rgba(30, 41, 59, 0.4);
      --bg-hover: rgba(99, 102, 241, 0.15);
      --bg-input: rgba(15, 23, 42, 0.7);
      --bg-modal-overlay: rgba(0, 0, 0, 0.75);
      --border-color: rgba(255, 255, 255, 0.08);
      --border-light: rgba(255, 255, 255, 0.04);
      --text-main: #f8fafc;
      --text-sub: #e2e8f0;
      --text-muted: #94a3b8;
      --text-accent: #38bdf8;
      --text-on-dark: #ffffff;
      --color-danger-dark: #fb7185;
      --color-warning-light: rgba(234, 179, 8, 0.1);
      --color-warning-dark: #facc15;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.5);
      --shadow: 0 10px 30px rgba(0,0,0,0.6);
      --shadow-lg: 0 30px 60px rgba(0,0,0,0.8);
      --shadow-glass: 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.05);
      --shadow-glass-intense: 0 12px 48px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.1);
      --calendar-grid-border: rgba(255, 255, 255, 0.07);
      --calendar-cell-border: rgba(255, 255, 255, 0.03);
      --bg-sat: rgba(30, 41, 59, 0.4);
      --bg-sun: rgba(69, 10, 10, 0.35);
      --bg-today: rgba(56, 189, 248, 0.12);
      --accent-today: #38bdf8;
      --glass-bg: rgba(10, 14, 23, 0.88);
      --glass-border: rgba(255, 255, 255, 0.12);
      --glass-bg-panel: rgba(15, 23, 42, 0.8);
      --glass-saturation: 2.0;
      --glass-blur: 40px;
      --radius-lg: 28px;
      --radius-md: 18px;
      --radius-sm: 10px;
      --color-sat: #60a5fa;
      --color-sun: #f87171;

      /* Type Colors - Dark */
      --type-bg-inspect: rgba(124, 45, 18, 0.35); --type-badge-inspect: #fb923c; --type-text-inspect: #ffedd5;
      --type-bg-repair: rgba(12, 74, 110, 0.35); --type-badge-repair: #38bdf8; --type-text-repair: #e0f2fe;
      --type-bg-install: rgba(20, 83, 45, 0.35); --type-badge-install: #4ade80; --type-text-install: #dcfce7;
      --type-bg-remove: rgba(76, 29, 149, 0.35); --type-badge-remove: #c084fc; --type-text-remove: #f3e8ff;
      --type-bg-maint: rgba(159, 18, 57, 0.35); --type-badge-maint: #fb7185; --type-text-maint: #ffe4e6;
      --type-bg-other: rgba(30, 41, 59, 0.35); --type-badge-other: #94a3b8; --type-text-other: #f1f5f9;

      /* Result Colors - Dark */
      --res-bg-done: rgba(5, 46, 22, 0.45);
      --res-bg-cancel: rgba(69, 10, 10, 0.45);
      --res-bg-pending: rgba(67, 20, 7, 0.45);
      --res-bg-other: rgba(30, 41, 59, 0.45);
    }

    .glass-panel {
      background: var(--glass-bg);
      backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
      -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-lg);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .glass-card {
      background: var(--bg-app);
      backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
      -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-glass);
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .glass-card:hover {
      transform: translateY(-4px) scale(1.005);
      box-shadow: var(--shadow-glass-intense);
      border-color: rgba(255, 255, 255, 0.35);
    }
    [data-theme='dark'] .glass-card:hover {
      border-color: rgba(255, 255, 255, 0.15);
      background: rgba(30, 41, 59, 0.7);
    }

    body {
      background: var(--bg-body-gradient);
      background-attachment: fixed;
      color: var(--text-main);
      transition: background 0.5s, color 0.3s;
      font-family: 'Inter', 'Noto Sans JP', 'Hiragino Sans', system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      min-height: 100vh;
      margin: 0;
    }

    .today-premium {
      position: relative;
      box-shadow: inset 0 0 20px rgba(14, 165, 233, 0.1), 0 0 0 2px var(--accent-today) !important;
      z-index: 10;
    }

    /* Scrollbar - Premium Slim */
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.3); border-radius: 10px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(148, 163, 184, 0.5); }

    /* Input / select glassmorphism optimization */
    input, select, textarea {
      font-family: inherit;
      background: var(--bg-input);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      backdrop-filter: blur(8px);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--text-accent) !important;
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
      background: var(--bg-app);
      transform: translateY(-1px);
    }

    @keyframes pulse-red {
      0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
      50% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
    }
    @keyframes modalFadeUp {
      from { opacity: 0; transform: translateY(20px) scale(0.97); filter: blur(10px); }
      to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
    }
  `}</style>
);


// --- Main App ---
export default function App() {
  const now = new Date();
  const todayStr = fmtDate(now.getFullYear(), now.getMonth(), now.getDate());
  const [workers, setWorkers] = useState(INITIAL_WORKERS);
  const [tickets, setTickets] = useState(Array.isArray(initialTicketsData) ? initialTicketsData : []);
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [view, setView] = useState("monthly");
  const [selectedDate, setSelectedDate] = useState(todayStr);
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
  const [isFitWidth, setIsFitWidth] = useState(() => localStorage.getItem("isFitWidth") === "true");
  const [isAdmin, setIsAdmin] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [session, setSession] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [showMiniCal, setShowMiniCal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef(null);
  useEffect(() => {
    if (!showSettings) return;
    const handler = (e) => { if (settingsRef.current && !settingsRef.current.contains(e.target)) setShowSettings(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showSettings]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("isFitWidth", isFitWidth);
  }, [isFitWidth]);

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
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, display_name, sche_role, avatar_url, avatar_url2");

      if (!error && data) {
        // カラーマッピング用の色配列
        const presetColors = ["#2563eb", "#dc2626", "#16a34a", "#9333ea", "#ca8a04", "#0891b2", "#be123c", "#7c3aed"];
        
        // INITIAL_WORKERS を名前ベースの色引き出し用マップに変換
        const colorRefMap = new Map();
        INITIAL_WORKERS.forEach(w => colorRefMap.set(w.name, w.color));

        const fetched = data.map((d, i) => {
          const name = d.display_name || d.email || "Unknown";
          // 既存の INITIAL_WORKERS に名前があればその色を、なければ配布配列から
          const color = colorRefMap.get(name) || presetColors[i % presetColors.length];
          
          return {
            id: d.id,
            name: name,
            color: color,
            sche_role: d.sche_role || "view",
            email: d.email,
            avatar_url: d.avatar_url,
            avatar_url2: d.avatar_url2
          };
        });

        setWorkers(fetched);
      } else if (error) {
        console.error("Fetch workers error:", error);
        // エラー時はフォールバックとして INITIAL_WORKERS を表示（オプション）
        setWorkers(INITIAL_WORKERS);
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

  // Update userRole based on session and worker list
  const [userRole, setUserRole] = useState("view");
  useEffect(() => {
    if (session && workers.length > 0) {
      const myProfile = workers.find(w => w.email === session?.user?.email);
      const role = myProfile?.sche_role || 'view';
      setUserRole(role);
      setIsAdmin(role === 'admin');
    } else {
      setUserRole("view");
      setIsAdmin(false);
    }
  }, [session, workers]);

  // 権限判定ヘルパー
  const perms = useMemo(() => {
    const myEmail = session?.user?.email;
    const myProfile = workers.find(w => w.email === myEmail);
    const myId = String(myProfile?.id || "");

    return {
      userRole,
      isAdmin: userRole === "admin",
      canManageRoles: userRole === "admin",
      canAssign: ["admin", "dispatcher", "field_engineer"].includes(userRole),
      // チケットを編集可能か
      canEditTicket: (t) => {
        if (["admin", "dispatcher"].includes(userRole)) return true;
        if (userRole === "field_engineer") {
          // FEは自分の担当分のみ編集可能
          return t.person === myId;
        }
        if (userRole === "editor") {
          // Editorは自分で作成したもののみ編集可能
          return t.createdBy === myEmail;
        }
        return false;
      },
      // チケットを削除可能か
      canDeleteTicket: (t) => {
        if (["admin", "dispatcher"].includes(userRole)) return true;
        if (userRole === "editor") {
          // Editorは自分で作成したもののみ削除可能
          return t.createdBy === myEmail;
        }
        return false;
      },
      // チケット作成・追加可能か
      canCreate: ["admin", "dispatcher", "field_engineer", "editor"].includes(userRole)
    };
  }, [userRole, workers, session]);

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
    if (!tickets || tickets.length === 0) return [];
    
    // 検索語やフィルタがない場合は全件をそのまま返さず、メモ化の利点を活かす
    if (!filterType && !filterWorker && !search) return tickets;

    const s = search ? search.toLowerCase() : "";
    
    return tickets.filter(t => {
      // 1. タイプフィルタ
      if (filterType && t.type !== filterType) return false;
      
      // 2. 対応者フィルタ
      if (filterWorker) {
        const w = workers.find(x => String(x.id) === filterWorker);
        const filterName = w ? w.name : filterWorker;
        // 苗字一致等の判定
        const isMatch = t.person === filterWorker || 
                        t.person === filterName || 
                        (filterName && t.person && (filterName.startsWith(t.person) || t.person.startsWith(filterName)));
        if (!isMatch) return false;
      }
      
      // 3. 検索ワード
      if (s) {
        const found = Object.values(t).some(v => 
          typeof v === "string" && v.toLowerCase().includes(s)
        );
        if (!found) return false;
      }
      
      return true;
    });
  }, [tickets, workers, filterType, filterWorker, search]);


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
    // 保存時に作成者のemailを記録（既存のものがなければ追加）
    const finalTicket = { ...ticket };
    if (!finalTicket.createdBy && session?.user?.email) {
      finalTicket.createdBy = session.user.email;
    }
    setTickets(prev => { const i = prev.findIndex(t => t.id === finalTicket.id); if (i >= 0) { const n = [...prev]; n[i] = finalTicket; return n; } return [...prev, finalTicket]; });
    setEditTicket(null); setIsNew(false);
  }, [session]);

  const handleDelete = useCallback(id => {
    const t = tickets.find(x => x.id === id);
    if (!t) return;
    if (!perms.canDeleteTicket(t)) { alert("削除権限がありません"); return; }
    setTickets(prev => prev.filter(t => t.id !== id));
  }, [perms.canDeleteTicket, tickets]);

  const handleAdd = useCallback((dateStr, workerId) => {
    if (!perms.canCreate) { alert("予定を追加する権限がありません"); return; }
    const t = emptyTicket();
    t.date = dateStr || todayStr;
    if (workerId && workerId !== "none") t.person = workerId;
    setEditTicket(t);
    setIsNew(true);
  }, [todayStr, perms.canCreate]);

  // マンスリービューの自動スクロール
  useEffect(() => {
    if (view === "monthly" && selectedDate && !isFitWidth) {
      setTimeout(() => {
        const el = document.getElementById("day-cell-" + selectedDate);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
        }
      }, 100);
    }
  }, [selectedDate, view, isFitWidth]);

  const handleEdit = useCallback(t => { 
    if (!perms.canEditTicket(t)) { alert("この予定を編集する権限がありません"); return; }
    setEditTicket({ ...t }); 
    setIsNew(!t.type); 
  }, [perms.canEditTicket]);
  const openDaily = dateStr => { setSelectedDate(dateStr); setView("daily"); };

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };
  const prevDay = () => { if (!selectedDate) return; const dd = new Date(selectedDate + "T00:00:00"); dd.setDate(dd.getDate() - 1); setSelectedDate(fmtDate(dd.getFullYear(), dd.getMonth(), dd.getDate())); };
  const nextDay = () => { if (!selectedDate) return; const dd = new Date(selectedDate + "T00:00:00"); dd.setDate(dd.getDate() + 1); setSelectedDate(fmtDate(dd.getFullYear(), dd.getMonth(), dd.getDate())); };

  if (isInitializing) {
    return <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", color: "#64748b", fontSize: 15, fontWeight: 600 }}>Loading...</div>;
  }
  if (!session) {
    return <LoginScreen />;
  }

  return (
    <ErrorBoundary>
      <GlobalStyles />
      <div style={{
        fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
        background: "transparent",
        height: "100vh",
        color: "var(--text-main)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        {/* Mini Calendar Widget */}
        {showMiniCal && (
          <MiniCalendarWidget
            todayStr={todayStr}
            initialDate={selectedDate || todayStr}
            onNavigate={(dateStr) => {
              if (dateStr === null) { setShowMiniCal(false); return; }
              const d = new Date(dateStr + "T00:00:00");
              setYear(d.getFullYear());
              setMonth(d.getMonth());
              setSelectedDate(dateStr);
              if (view === "pool") setView("monthly");
            }}
          />
        )}

        {/* Worker Action Menu */}
        {workerActionMenu && (
          <div style={{ position: "fixed", inset: 0, zIndex: 9999 }} onClick={() => setWorkerActionMenu(null)}>
            <div style={{
              position: "absolute",
              left: Math.min(workerActionMenu.x, window.innerWidth - 160),
              top: Math.min(workerActionMenu.y, window.innerHeight - 120),
              background: "var(--bg-app)",
              boxShadow: "var(--shadow)",
              borderRadius: 6,
              padding: 6,
              border: "1px solid var(--border-color)",
              display: "flex", flexDirection: "column", gap: 2,
              minWidth: 160
            }} onClick={e => e.stopPropagation()}>
              <div style={{ fontSize: 14, fontWeight: 800, padding: "8px 10px", borderBottom: "1px solid var(--border-light)", marginBottom: 6, color: "var(--text-main)", background: "var(--bg-alt)", borderRadius: "6px 6px 0 0" }}>
                {workerActionMenu.workerName}
              </div>
              <button onClick={() => {
                handleAdd(workerActionMenu.dateStr, workerActionMenu.workerId);
                setWorkerActionMenu(null);
              }} style={{ display: "flex", alignItems: "center", gap: 8, textAlign: "left", padding: "10px 12px", fontSize: 13, fontWeight: 700, background: "none", border: "none", cursor: "pointer", borderRadius: 4, color: "#2563eb" }} onMouseOver={e => e.currentTarget.style.background = "#eff6ff"} onMouseOut={e => e.currentTarget.style.background = "none"}>
                <IconPlus size={14} color="#2563eb" />
                <span>予定を追加する</span>
              </button>
              <button onClick={() => {
                toggleVacation(workerActionMenu.dateStr, workerActionMenu.workerId);
                setWorkerActionMenu(null);
              }} style={{ display: "flex", alignItems: "center", gap: 8, textAlign: "left", padding: "10px 12px", fontSize: 12, fontWeight: 700, background: "none", border: "none", cursor: "pointer", borderRadius: 4, color: "var(--text-main)" }} onMouseOver={e => e.currentTarget.style.background = "var(--border-light)"} onMouseOut={e => e.currentTarget.style.background = "none"}>
                {vacations[workerActionMenu.dateStr]?.has(workerActionMenu.workerId) ? (
                  <><IconVacationSolid size={14} color="#f59e0b" /><span>出勤にする</span></>
                ) : (
                  <><IconVacationSolid size={14} color="#94a3b8" /><span>休暇にする</span></>
                )}
              </button>
              <button onClick={() => {
                setMoveAllMenu({ workerId: workerActionMenu.workerId, workerName: workerActionMenu.workerName, dateStr: workerActionMenu.dateStr });
                setWorkerActionMenu(null);
              }} style={{ display: "flex", alignItems: "center", gap: 8, textAlign: "left", padding: "10px 12px", fontSize: 12, fontWeight: 700, background: "none", border: "none", cursor: "pointer", borderRadius: 4, color: "var(--text-main)" }} onMouseOver={e => e.currentTarget.style.background = "var(--border-light)"} onMouseOut={e => e.currentTarget.style.background = "none"}>
                <IconMoveAll size={14} color="#3b82f6" />
                <span>この日の予定を一括移動</span>
              </button>
            </div>
          </div>
        )}

        {/* Move All Tickets Modal */}
        {moveAllMenu && (
          <div style={{ position: "fixed", inset: 0, background: "var(--bg-modal-overlay)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000 }} onClick={() => setMoveAllMenu(null)}>
            <div style={{ background: "var(--bg-app)", borderRadius: 8, padding: 20, width: 320, boxShadow: "var(--shadow)" }} onClick={e => e.stopPropagation()}>
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
                    <UserAvatar user={w} size={20} />
                    <span style={{ color: w.color }}>{w.name} に移動する</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setMoveAllMenu(null)} style={{ marginTop: 16, width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: 4, background: "#f8fafc", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>キャンセル</button>
            </div>
          </div>
        )}

        {/* Top bar */}
        <div style={{
          background: "var(--bg-header)",
          backdropFilter: "blur(20px) saturate(1.8)",
          WebkitBackdropFilter: "blur(20px) saturate(1.8)",
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--glass-border)",
          zIndex: 100,
          flexShrink: 0,
          boxShadow: "0 4px 30px rgba(0,0,0,0.1)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setShowMiniCal(v => !v)}
              title={showMiniCal ? "ミニカレンダーを閉じる" : "ミニカレンダーを開く"}
              style={{
                background: showMiniCal ? "rgba(147,197,253,0.25)" : "rgba(255,255,255,0.08)",
                border: showMiniCal ? "1px solid rgba(147,197,253,0.5)" : "1px solid rgba(255,255,255,0.15)",
                borderRadius: 7, cursor: "pointer", padding: "5px 7px",
                display: "flex", alignItems: "center",
                transition: "all 0.2s",
                boxShadow: showMiniCal ? "0 0 10px rgba(147,197,253,0.3)" : "none",
              }}
              onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
              onMouseOut={e => e.currentTarget.style.background = showMiniCal ? "rgba(147,197,253,0.25)" : "rgba(255,255,255,0.08)"}
            >
              <IconCalendar size={16} color={showMiniCal ? "#93c5fd" : "rgba(255,255,255,0.7)"} />
            </button>
            <span style={{ fontSize: 20, fontWeight: 900, color: "var(--bg-header-text)" }}>Total Scheduling System</span>
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {/* Settings gear with theme toggle */}
            <div ref={settingsRef} style={{ position: "relative" }}>
              <button
                onClick={() => setShowSettings(v => !v)}
                title="設定"
                style={{ padding: "5px 8px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.2)", background: showSettings ? "rgba(255,255,255,0.2)" : "transparent", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", transition: "background 0.2s" }}
                onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                onMouseOut={e => e.currentTarget.style.background = showSettings ? "rgba(255,255,255,0.2)" : "transparent"}
              >
                <IconGear size={16} color="rgba(255,255,255,0.75)" />
              </button>
              {showSettings && (
                <div style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 9999,
                  minWidth: 180,
                  background: "var(--glass-bg)",
                  backdropFilter: "blur(20px) saturate(1.8)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.8)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: 10,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)",
                  padding: "10px 14px",
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", marginBottom: 8, letterSpacing: "0.08em" }}>表示設定</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-main)", display: "flex", alignItems: "center", gap: 5 }}>
                      {theme === "light" ? <IconSun size={13} color="#f59e0b" /> : <IconMoon size={13} color="#a5b4fc" />}
                      {theme === "light" ? "ライトモード" : "ダークモード"}
                    </span>
                    <button
                      onClick={() => { const next = theme === "light" ? "dark" : "light"; setTheme(next); localStorage.setItem("theme", next); }}
                      style={{
                        width: 40, height: 22, borderRadius: 11, border: "none", cursor: "pointer", position: "relative",
                        background: theme === "dark" ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(148,163,184,0.3)",
                        transition: "background 0.3s", flexShrink: 0,
                      }}
                    >
                      <div style={{
                        position: "absolute", top: 3, left: theme === "dark" ? 21 : 3,
                        width: 16, height: 16, borderRadius: "50%",
                        background: "#fff",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
                        transition: "left 0.3s",
                      }} />
                    </button>
                  </div>
                  {perms.canManageRoles && (
                    <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--glass-border)" }}>
                      <button onClick={() => { setShowAdmin(true); setShowSettings(false); }} style={{ width: "100%", padding: "5px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", color: "var(--text-main)", cursor: "pointer", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                        <IconGear size={12} color="var(--text-muted)" />管理者設定
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", margin: "0 6px" }} />
            <button
              onClick={() => setIsFitWidth(!isFitWidth)}
              title={isFitWidth ? "通常モード（ズーム有効）" : "画面幅に合わせる"}
              style={{
                padding: "5px 10px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.2)",
                background: isFitWidth ? "rgba(37, 99, 235, 0.4)" : "transparent",
                color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                fontSize: 11, fontWeight: 700, transition: "all 0.2s"
              }}
              onMouseOver={e => e.currentTarget.style.background = isFitWidth ? "rgba(37, 99, 235, 0.5)" : "rgba(255,255,255,0.2)"}
              onMouseOut={e => e.currentTarget.style.background = isFitWidth ? "rgba(37, 99, 235, 0.4)" : "transparent"}
            >
              <IconResize size={14} color="#fff" />
              <span>{isFitWidth ? "幅固定中" : "幅に合わせる"}</span>
            </button>
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", margin: "0 6px" }} />
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 2, 
              marginRight: 10, 
              background: "rgba(255,255,255,0.1)", 
              borderRadius: 4, 
              padding: "2px 6px",
              border: "none",
              transition: "border 0.2s"
            }}>
              <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 16, padding: "0 4px" }}>－</button>
              <span style={{ color: "#fff", fontSize: 11, minWidth: 32, textAlign: "center" }}>{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 16, padding: "0 4px" }}>＋</button>
            </div>
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", margin: "0 6px" }} />
            <button onClick={() => supabase.auth.signOut()} title="ログアウト" style={{ padding: "5px 8px", borderRadius: 4, border: "1px solid rgba(220,38,38,0.4)", background: "rgba(220,38,38,0.15)", color: "#fca5a5", cursor: "pointer", display: "flex", alignItems: "center", transition: "background 0.2s" }}
              onMouseOver={e => e.currentTarget.style.background = "rgba(220,38,38,0.3)"}
              onMouseOut={e => e.currentTarget.style.background = "rgba(220,38,38,0.15)"}
            >
              <IconLogout size={16} color="#fca5a5" />
            </button>
          </div>
        </div>

        {/* View switcher tabs - glass badge pills */}
        <div style={{
          background: "var(--glass-bg-panel)",
          backdropFilter: "blur(16px) saturate(1.6)",
          WebkitBackdropFilter: "blur(16px) saturate(1.6)",
          borderBottom: "1px solid var(--glass-border)",
          padding: "7px 20px",
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexShrink: 0,
          zIndex: 99,
          boxShadow: "0 1px 0 var(--glass-border)",
        }}>
          {[
            {
              key: "monthly", label: "Monthly", icon: <IconCalendar size={12} color="currentColor" />,
              activeColor: "#2563eb", activeBg: "rgba(37,99,235,0.15)", activeShadow: "0 0 12px rgba(37,99,235,0.25)",
            },
            {
              key: "daily",   label: "Daily",   icon: <IconClipboard size={12} color="currentColor" />,
              activeColor: "#10b981", activeBg: "rgba(16,185,129,0.15)", activeShadow: "0 0 12px rgba(16,185,129,0.25)",
            },
            {
              key: "pool",    label: "Pool",    icon: <IconPool size={12} color="currentColor" />,
              activeColor: "#ec4899", activeBg: "rgba(236,72,153,0.15)", activeShadow: "0 0 12px rgba(236,72,153,0.25)",
            },
          ].map(v => {
            const isActive = view === v.key;
            return (
              <button key={v.key} onClick={() => setView(v.key)} style={{
                padding: "5px 14px",
                borderRadius: 20,
                border: isActive ? `1px solid ${v.activeColor}` : "1px solid var(--glass-border)",
                background: isActive ? v.activeBg : "var(--glass-bg)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                color: isActive ? v.activeColor : "var(--text-muted)",
                fontWeight: isActive ? 700 : 500,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 5,
                letterSpacing: "0.02em",
                boxShadow: isActive ? `${v.activeShadow}, 0 1px 4px rgba(0,0,0,0.08)` : "0 1px 3px rgba(0,0,0,0.06)",
              }}
                onMouseOver={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = "var(--bg-alt)";
                    e.currentTarget.style.borderColor = "var(--border-color)";
                    e.currentTarget.style.color = "var(--text-sub)";
                  }
                }}
                onMouseOut={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = "var(--glass-bg)";
                    e.currentTarget.style.borderColor = "var(--glass-border)";
                    e.currentTarget.style.color = "var(--text-muted)";
                  }
                }}
              >{v.icon}{v.label}</button>
            );
          })}
        </div>

        {/* Filters + legend - Fixed at top below bar */}
        <div className="glass-panel" style={{
          borderBottom: "1px solid var(--glass-border)",
          borderTop: "none", borderLeft: "none", borderRight: "none",
          borderRadius: 0,
          padding: "6px 20px",
          flexShrink: 0,
          zIndex: 98
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <input type="text" placeholder="検索..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "5px 12px", border: "1px solid var(--border-color)", borderRadius: 8, fontSize: 12, width: 280, background: "var(--glass-bg)", color: "var(--text-main)", backdropFilter: "blur(8px)" }} />
            <select value={filterWorker} onChange={e => setFilterWorker(e.target.value)} style={{ padding: "5px 8px", border: "1px solid var(--border-color)", borderRadius: 8, fontSize: 12, background: "var(--glass-bg)", color: "var(--text-main)", backdropFilter: "blur(8px)" }}>
              <option value="">全案件担当 (FE)</option>{workers.filter(w => w.sche_role === "field_engineer").map(w => <option key={w.id} value={String(w.id)}>{w.name}</option>)}
            </select>
            {types.map(k => {
              const v = typeColors[k] || typeColors["その他"];
              return (
                <button key={k} onClick={() => setFilterType(filterType === k ? "" : k)} style={{
                  fontSize: 10, padding: "2px 8px", borderRadius: 20, cursor: "pointer", fontWeight: 700,
                  border: `1px solid ${v?.badge || "var(--border-color)"}`,
                  background: filterType === k ? (v?.badge || "#3b82f6") : "transparent",
                  color: filterType === k ? "#fff" : (v?.badge || "var(--text-main)"),
                  transition: "all 0.2s",
                }}>{k}</button>
              );
            })}
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", gap: 4, alignItems: "center" }}>合計:<b style={{ color: "#3b82f6", minWidth: "2.5em", textAlign: "right", lineHeight: 1 }}>{stats.total}</b></span>
            <span style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", gap: 4, alignItems: "center" }}>完了:<b style={{ color: "#16a34a", minWidth: "2.5em", textAlign: "right", lineHeight: 1 }}>{stats.done}</b></span>
            <span style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", gap: 4, alignItems: "center" }}>未対応:<b style={{ color: "#f59e0b", minWidth: "2.5em", textAlign: "right", lineHeight: 1 }}>{stats.pending}</b></span>
          </div>
          <Legend workers={workers.filter(w => w.sche_role === "field_engineer")} hoveredDate={hoveredDate} tickets={filtered} />
        </div>

        {/* Main content scroll container */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          overflowX: (isFitWidth || view === "daily") ? "hidden" : "auto",
          position: "relative",
          paddingBottom: 60, // Bottom tabs space
          scrollbarGutter: "stable"
        }}>
          <div style={{
            padding: "12px 20px",
            width: (isFitWidth || view === "daily") ? "100%" : (zoom < 1 ? `calc(100% / ${zoom})` : "max-content"),
            minWidth: (isFitWidth || view === "daily") ? "100%" : (zoom < 1 ? `calc(100% / ${zoom})` : "100%"),
            boxSizing: "border-box",
            transformOrigin: "top left",
            transform: (isFitWidth || view === "daily") ? "none" : `scale(${zoom})`,
            transition: "all 0.2s"
          }}>
            {view === "monthly" ? (
              <MonthCalendar
                tickets={filtered}
                year={year} month={month}
                workers={workers.filter(w => w.sche_role === "field_engineer")}
                allWorkers={workers.filter(w => ["admin", "dispatcher", "field_engineer"].includes(w.sche_role))}
                vacations={vacations}
                onDayClick={openDaily}
                onEdit={handleEdit}
                onView={t => setViewingTicket({ ...t })}
                onAdd={handleAdd}
                isAdmin={perms.isAdmin}
                theme={theme}
                hoveredDate={hoveredDate}
                setHoveredDate={setHoveredDate}
                isFitWidth={isFitWidth}
                zoom={zoom}
                onReorder={(dateStr, workerId, fromId, toId) => {
                  setTickets(prev => {
                    const next = [...prev];
                    const fromGlobalIdx = next.findIndex(t => t.id === fromId);
                    if (fromGlobalIdx < 0) return prev;
                    const [moved] = next.splice(fromGlobalIdx, 1);
                    moved.date = dateStr;
                    moved.person = workerId;

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
                onMoveTicket={(ticketId, newWorkerId, newDateStr) => {
                  setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, person: newWorkerId, date: newDateStr || t.date } : t));
                }}
              />
            ) : view === "pool" ? (
              <ProcessingPool tickets={tickets} workers={workers.filter(w => w.sche_role === "field_engineer")} allWorkers={workers.filter(w => ["admin", "dispatcher", "field_engineer"].includes(w.sche_role))} onEdit={handleEdit} onDelete={handleDelete}
                onAssign={(ticketId, date, workerId) => {
                  setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, date, person: workerId } : t));
                }} />
            ) : selectedDate ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <button onClick={() => setView("monthly")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-accent)", fontSize: 13, fontWeight: 600 }}>◂ 月間に戻る</button>
                  <div style={{ flex: 1 }} />
                  <button onClick={prevDay} style={{ padding: "4px 10px", borderRadius: 3, border: "1px solid var(--border-color)", background: "var(--bg-app)", color: "var(--text-main)", fontSize: 11, cursor: "pointer" }}>◂ 前日</button>
                  <button onClick={nextDay} style={{ padding: "4px 10px", borderRadius: 3, border: "1px solid var(--border-color)", background: "var(--bg-app)", color: "var(--text-main)", fontSize: 11, cursor: "pointer" }}>翌日 ▸</button>
                </div>
                <DailyDetail tickets={filtered} dateStr={selectedDate} workers={workers.filter(w => w.sche_role === "field_engineer")} allWorkers={workers.filter(w => ["admin", "dispatcher", "field_engineer"].includes(w.sche_role))} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} onView={t => setViewingTicket({ ...t })} onSave={handleSave} vacations={vacations} onToggleVacation={toggleVacation} theme={theme} onReorder={(dateStr, workerId, fromId, toId) => {
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
        </div>


        {/* Month tabs (bottom, like spreadsheet) */}
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: "var(--glass-bg)",
          backdropFilter: "blur(20px) saturate(1.8)",
          WebkitBackdropFilter: "blur(20px) saturate(1.8)",
          borderTop: "1px solid var(--glass-border)",
          display: "flex", alignItems: "center", padding: "0 8px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.08), 0 -1px 4px rgba(0,0,0,0.04)",
          zIndex: 100,
        }}>
          <button onClick={() => setYear(y => y - 1)} style={{
            background: "var(--glass-bg)", border: "1px solid var(--glass-border)",
            borderRadius: 6, cursor: "pointer", padding: "4px 8px", fontSize: 11,
            color: "var(--text-sub)", fontWeight: 700, margin: "4px 2px",
            backdropFilter: "blur(8px)", transition: "all 0.2s",
          }}
            onMouseOver={e => e.currentTarget.style.background = "var(--bg-alt)"}
            onMouseOut={e => e.currentTarget.style.background = "var(--glass-bg)"}
          >◂年</button>
          <button onClick={prevMonth} style={{
            background: "var(--glass-bg)", border: "1px solid var(--glass-border)",
            borderRadius: 6, cursor: "pointer", padding: "4px 8px", fontSize: 13,
            color: "var(--text-sub)", fontWeight: 700, margin: "4px 2px",
            backdropFilter: "blur(8px)", transition: "all 0.2s",
          }}
            onMouseOver={e => e.currentTarget.style.background = "var(--bg-alt)"}
            onMouseOut={e => e.currentTarget.style.background = "var(--glass-bg)"}
          >◂</button>
          {MONTHS.map((m, i) => (
            <button key={i} onClick={() => setMonth(i)} style={{
              padding: "5px 10px", cursor: "pointer",
              fontSize: 12, fontWeight: month === i ? 800 : 500,
              color: month === i ? "var(--text-accent)" : "var(--text-muted)",
              background: month === i ? "var(--glass-bg)" : "transparent",
              border: month === i ? "1px solid var(--glass-border)" : "1px solid transparent",
              borderRadius: 6,
              margin: "4px 1px",
              boxShadow: month === i ? "var(--shadow-sm)" : "none",
              backdropFilter: month === i ? "blur(8px)" : "none",
              transition: "all 0.2s",
              opacity: month === i ? 1 : 0.65,
            }}
              onMouseOver={e => { if (i !== month) { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = "var(--text-sub)"; }}}
              onMouseOut={e => { if (i !== month) { e.currentTarget.style.opacity = "0.65"; e.currentTarget.style.color = "var(--text-muted)"; }}}
            >{m}</button>
          ))}
          <button onClick={nextMonth} style={{
            background: "var(--glass-bg)", border: "1px solid var(--glass-border)",
            borderRadius: 6, cursor: "pointer", padding: "4px 8px", fontSize: 13,
            color: "var(--text-sub)", fontWeight: 700, margin: "4px 2px",
            backdropFilter: "blur(8px)", transition: "all 0.2s",
          }}
            onMouseOver={e => e.currentTarget.style.background = "var(--bg-alt)"}
            onMouseOut={e => e.currentTarget.style.background = "var(--glass-bg)"}
          >▸</button>
          <button onClick={() => setYear(y => y + 1)} style={{
            background: "var(--glass-bg)", border: "1px solid var(--glass-border)",
            borderRadius: 6, cursor: "pointer", padding: "4px 8px", fontSize: 11,
            color: "var(--text-sub)", fontWeight: 700, margin: "4px 2px",
            backdropFilter: "blur(8px)", transition: "all 0.2s",
          }}
            onMouseOver={e => e.currentTarget.style.background = "var(--bg-alt)"}
            onMouseOut={e => e.currentTarget.style.background = "var(--glass-bg)"}
          >年▸</button>
        </div>

        {/* Modals */}
        {viewingTicket && <TicketDetailModal perms={perms} ticket={viewingTicket} workers={workers} onClose={() => setViewingTicket(null)} onEdit={t => { setViewingTicket(null); handleEdit(t); }} onDelete={id => { setViewingTicket(null); handleDelete(id); }} />}
        {editTicket && <TicketFormModal perms={perms} ticket={editTicket} isNew={isNew} onSave={handleSave} onClose={() => { setEditTicket(null); setIsNew(false); }} workers={workers} />}
        {showAdmin && <AdminModal perms={perms} types={types} workers={workers} onSaveTypes={t => { setTypes(t); setShowAdmin(false); }} onSaveWorkers={w => { setWorkers(w); setShowAdmin(false); }} onClose={() => setShowAdmin(false)} />}
      </div>
    </ErrorBoundary>
  );
}
