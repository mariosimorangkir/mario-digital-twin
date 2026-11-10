import type { DecisionItem, CashRunwayFeed, SentinelStatus } from '../types';

export const INITIAL_DECISIONS: DecisionItem[] = [
  {
    id: "DEC-MWAGYB57",
    timestamp: "2026-11-10T09:09:41.227Z",
    category: "TECH_ARCH",
    decision: "Configured Google Cloud Data Agent Kit (DAK) and gcloud CLI for project mario-twin-bot-78312 in region asia-southeast2 with BigQuery, Cloud Storage, and Firestore.",
    rationale: "Automate cross-platform data pipeline with zero cost.",
    expectedImpact: "Autonomous GCP agent workflows active.",
    status: "ACTIVE"
  },
  {
    id: "DEC-MW8NDYDO",
    timestamp: "2026-11-09T02:34:16.524Z",
    category: "STRATEGY",
    decision: "Deploy Ayemva v5 (88b0d285) ke www.ayemva.com, Android APK/AAB, dan iOS IPA — akun MasterAdmin aktif dengan akses tanpa batas ke data sintesis 50 karyawan lintas 5 departemen.",
    rationale: "Live B2B demonstration ready for executive prospects.",
    expectedImpact: "Unlocks Rp10-25M pilot closes.",
    status: "ACTIVE"
  },
  {
    id: "DEC-MW7XAQM7",
    timestamp: "2026-11-08T14:23:56.479Z",
    category: "OPERATIONS",
    decision: "Seluruh sheet gabungan & terbaru SmartID per 8 Nov 2026 malam dipetakan ke Digital Twin — CI-CO feed, PAO tracker, dan Emergency Payment Gating Tracker P3-P5.",
    rationale: "Absolute cash gating protocol enforcement.",
    expectedImpact: "Prevents unauthorized liquidity burn.",
    status: "ACTIVE"
  },
  {
    id: "DEC-MW7V51SZ",
    timestamp: "2026-11-08T13:23:31.811Z",
    category: "INVESTMENT",
    decision: "Strategi harga dua jalur Ayemva — penawaran langsung B2B menggunakan paket Pilot Diagnostik 30 Hari Rp10–25 juta (target awal: Amartha, Primaya, Privy).",
    rationale: "Accelerate B2B enterprise cash inflows.",
    expectedImpact: "Immediate non-dilutive liquidity injection.",
    status: "ACTIVE"
  }
];

export const INITIAL_FEED: CashRunwayFeed = {
  lastRealizationDate: "2026-11-09",
  effectiveCashBalance: 741598733.8,
  firstDeficitDate: "2026-11-16",
  dailyBurnRate: 258000000,
  projections: [
    { date: "2026-11-10", day: "Selasa", ciOps: 0, coOps: 182194211.7, coFunding: 81375000, closingBalance: 478029522.1 },
    { date: "2026-11-11", day: "Rabu", ciOps: 250000000, coOps: 129750003.9, coFunding: 43610000, closingBalance: 554669518.3 },
    { date: "2026-11-12", day: "Kamis", ciOps: 0, coOps: 100224036.9, coFunding: 0, closingBalance: 454445481.4 },
    { date: "2026-11-13", day: "Jumat", ciOps: 19797055, coOps: 145272856.9, coFunding: 119175000, closingBalance: 209794679.6 },
    { date: "2026-11-14", day: "Sabtu", ciOps: 0, coOps: 90689028.38, coFunding: 0, closingBalance: 119105651.2 },
    { date: "2026-11-15", day: "Minggu", ciOps: 0, coOps: 0, coFunding: 0, closingBalance: 119105651.2 },
    { date: "2026-11-16", day: "Senin", ciOps: 4000000, coOps: 149210761.9, coFunding: 1917192515, closingBalance: -1943297626 }
  ]
};

export const INITIAL_SENTINEL: SentinelStatus = {
  lastChecked: "2026-11-10T16:17:42+07:00",
  engine: "Gemini-3.6-Flash",
  status: "ALERT",
  activePriorities: [
    "SmartID Cash Runway: Saldo Rp741,6 jt. Titik defisit kas tanpa dana baru: 16 Nov 2026 (lonjakan funding Rp1,92 M). Gating P3-P5 wajib terkunci.",
    "Ayemva B2B Closing: Aset Pilot Diagnostik 30 Hari (Rp10-25M) + Deck + Video siap dikirim ke CPO Amartha (Rine), Primaya, Privy.",
    "Multi-Platform $0 Engine: Desktop Mac DMG, Android APK, iOS Sideload, dan Web Vercel aktif tersinkronisasi."
  ]
};

