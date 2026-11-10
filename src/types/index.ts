export interface DecisionItem {
  id: string;
  timestamp: string;
  category: 'STRATEGY' | 'OPERATIONS' | 'TECH_ARCH' | 'INVESTMENT' | 'COMMUNICATION';
  decision: string;
  rationale: string;
  expectedImpact: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'SUPERSEDED';
}

export interface CashRunwayFeed {
  lastRealizationDate: string;
  effectiveCashBalance: number; // in IDR
  firstDeficitDate: string;
  dailyBurnRate: number;
  projections: {
    date: string;
    day: string;
    ciOps: number;
    coOps: number;
    coFunding: number;
    closingBalance: number;
  }[];
}

export interface SentinelStatus {
  lastChecked: string;
  engine: string;
  status: 'OK' | 'WARNING' | 'ALERT';
  activePriorities: string[];
}

