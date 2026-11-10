import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Radio, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Zap, 
  FileText, 
  Smartphone, 
  Laptop, 
  Globe, 
  Clock
} from 'lucide-react';
import { syncLayer, type SyncPayload } from './services/syncLayer';
import { INITIAL_DECISIONS, INITIAL_FEED, INITIAL_SENTINEL } from './services/twinState';
import type { DecisionItem } from './types';

export default function App() {
  const [platform, setPlatform] = useState<string>('web');
  const [syncStatus, setSyncStatus] = useState<'connected' | 'syncing'>('connected');
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString());
  const [decisions, setDecisions] = useState<DecisionItem[]>(INITIAL_DECISIONS);
  const [feed] = useState(INITIAL_FEED);
  const [sentinel] = useState(INITIAL_SENTINEL);

  // New Decision Input Form
  const [newCat, setNewCat] = useState<DecisionItem['category']>('STRATEGY');
  const [newText, setNewText] = useState('');

  // Ghostwriter Tab
  const [ghostwriterType, setGhostwriterType] = useState<'MEMO' | 'DIRECTIVE' | 'EMAIL'>('MEMO');
  const [ghostTopic, setGhostTopic] = useState('');
  const [ghostOutput, setGhostOutput] = useState('');

  // Outreach simulation state
  const [outreachSent, setOutreachSent] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setPlatform(syncLayer.platform);

    const unsubscribe = syncLayer.subscribe((payload: SyncPayload) => {
      setSyncStatus('syncing');
      setLastSyncTime(new Date(payload.timestamp).toLocaleTimeString());

      if (payload.type === 'DECISION_ADD') {
        setDecisions((prev) => [payload.data, ...prev.filter((d) => d.id !== payload.data.id)]);
      }

      setTimeout(() => setSyncStatus('connected'), 600);
    });

    return () => unsubscribe();
  }, []);

  const handleAddDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newDec: DecisionItem = {
      id: `DEC-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      category: newCat,
      decision: newText.trim(),
      rationale: 'Logged via Mario Twin Multi-Platform Studio',
      expectedImpact: 'Executive visibility & governance',
      status: 'ACTIVE',
    };

    setDecisions((prev) => [newDec, ...prev]);
    setNewText('');
    syncLayer.broadcast('DECISION_ADD', newDec);
  };

  const handleGenerateGhostwriter = () => {
    if (!ghostTopic.trim()) return;
    let out = '';
    const now = new Date().toLocaleDateString('id-ID', { dateStyle: 'full' });

    if (ghostwriterType === 'MEMO') {
      out = `MEMORANDUM EKSEKUTIF\n` +
        `Kepada  : C-Level & Board of Directors\n` +
        `Dari    : Mario Simorangkir · Co-VP Finance\n` +
        `Tanggal : ${now}\n` +
        `Perihal : ${ghostTopic}\n\n` +
        `1. RINGKASAN EKSEKUTIF\n` +
        `Izin menyampaikan telaah berkala terkait penguatan arus kas dan runway operasional. Saldo efektif per 9 Nov tercatat Rp741,6 jt dengan titik defisit tanpa dana baru tertimbang per 16 Nov 2026.\n\n` +
        `2. LANGKAH MITIGASI TERTINGGANG RISIKO\n` +
        `- Penguncian total pengeluaran P3–P5 via Emergency Payment Gating Tracker.\n` +
        `- Pengawalan pencairan tagihan tertimbang risiko (PSAK 207/115).\n\n` +
        `Keputusannya kami serahkan kepada Bapak/Ibu pimpinan.`;
    } else if (ghostwriterType === 'DIRECTIVE') {
      out = `STRATEGIC DIRECTIVE — MANDAT KEUANGAN & FUNDING\n` +
        `Disetujui: Mario Simorangkir (Co-VP of Finance)\n` +
        `Instruksi: Segera sinkronkan feed CI-CO harian ke baris 208 tanpa deviasi.\n` +
        `Target: Memastikan zero default menjelang jatuh tempo funding 16 Nov 2026.`;
    } else {
      out = `Subjek: [Kajian Arus Kas & Runway] Pemutakhiran Posisi Terkini — ${ghostTopic}\n\n` +
        `Yth. Bapak/Ibu Pimpinan,\n\n` +
        `Izin berbagi pembaruan singkat terkait status likuiditas per hari ini. Seluruh alokasi kas keluar telah kami sesuaikan dengan skala prioritas P1–P2.\n\n` +
        `Bila berkenan, kami siap memaparkan rincian proyeksi pada daily meeting besok pagi pukul 08.00 WIB.\n\n` +
        `Salam hormat,\nMario Simorangkir\nCo-VP Finance, SmartID`;
    }

    setGhostOutput(out);
  };

  const handleSendOutreach = (targetName: string) => {
    setOutreachSent((prev) => ({ ...prev, [targetName]: true }));
    syncLayer.broadcast('SENTINEL_DISPATCH', { target: targetName, status: 'SENT' });
  };

  return (
    <div className="min-h-screen bg-[#0b132b] text-slate-100 flex flex-col font-sans selection:bg-[#8B1E2D] selection:text-white pb-12">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-[#070b19]/90 backdrop-blur sticky top-0 z-50 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B2545] via-[#8B1E2D] to-[#E3B931] flex items-center justify-center font-bold text-white shadow-lg shadow-black/40">
              MS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base lg:text-lg font-bold tracking-tight text-white">
                  MARIO DIGITAL TWIN <span className="text-xs px-2 py-0.5 rounded bg-[#E3B931]/20 text-[#E3B931] font-semibold border border-[#E3B931]/30">v4.0</span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                Co-VP Finance SmartID · Pendiri Ayemva · Executive Autonomous Ecosystem
              </p>
            </div>
          </div>

          {/* Platform & Sync Pills */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
              {platform === 'mac-desktop' && <Laptop className="w-3.5 h-3.5 text-blue-400" />}
              {platform === 'android' && <Smartphone className="w-3.5 h-3.5 text-emerald-400" />}
              {platform === 'ios' && <Smartphone className="w-3.5 h-3.5 text-cyan-400" />}
              {platform === 'pwa-standalone' && <Smartphone className="w-3.5 h-3.5 text-amber-400" />}
              {platform === 'web' && <Globe className="w-3.5 h-3.5 text-purple-400" />}
              <span className="capitalize font-mono font-medium">{platform}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-700/50 text-emerald-300 font-mono">
              <Radio className={`w-3 h-3 text-emerald-400 ${syncStatus === 'syncing' ? 'animate-ping' : ''}`} />
              <span>SYNC LIVE</span>
              <span className="text-slate-500 hidden sm:inline">({lastSyncTime})</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex-1 w-full space-y-6">
        
        {/* Top Alert Banner: Sentinel Dispatch */}
        <section className="p-4 rounded-2xl bg-gradient-to-r from-[#8B1E2D]/20 via-[#0B2545]/30 to-[#070b19] border border-[#8B1E2D]/40 shadow-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-white tracking-wide uppercase flex items-center gap-2">
                  Proactive Sentinel Alert · Engine: {sentinel.engine}
                </h2>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 10 Nov 2026, 16:17 WIB
                </span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1 pt-1">
                {sentinel.activePriorities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: SmartID Arus Kas Feed & Ayemva Pipeline (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* CARD 1: SmartID Arus Kas (Baris 208) */}
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0B2545] border border-[#0B2545]/60 flex items-center justify-center text-[#E3B931]">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">SmartID Arus Kas & Runway Kas Harian</h3>
                    <p className="text-xs text-slate-400">Feed Live CI-CO Baris 208 · Realisasi s.d. {feed.lastRealizationDate}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-blue-950/60 border border-blue-800 text-blue-300">
                  CONFIDENTIAL BoD
                </span>
              </div>

              {/* Stat Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Saldo Kas Efektif</p>
                  <p className="text-base sm:text-lg font-bold text-emerald-400 font-mono mt-0.5">
                    Rp741,6 jt
                  </p>
                  <p className="text-[10px] text-slate-500">Official + Unofficial</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Titik Defisit Kas</p>
                  <p className="text-base sm:text-lg font-bold text-rose-400 font-mono mt-0.5">
                    {feed.firstDeficitDate}
                  </p>
                  <p className="text-[10px] text-rose-300/80">CO Funding Rp1,92 M</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 col-span-2 sm:col-span-1">
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Payment Gating</p>
                  <p className="text-base sm:text-lg font-bold text-amber-300 font-mono mt-0.5">
                    P3–P5 LOCKED
                  </p>
                  <p className="text-[10px] text-slate-500">Kuat / Sedang / Lemah</p>
                </div>
              </div>

              {/* Daily Projection Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#070b19]/60">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-800/60 text-slate-400 text-[11px] uppercase">
                    <tr>
                      <th className="py-2 px-3">Tanggal</th>
                      <th className="py-2 px-2">Hari</th>
                      <th className="py-2 px-2 text-right">CI Ops</th>
                      <th className="py-2 px-2 text-right">CO Ops + Funding</th>
                      <th className="py-2 px-3 text-right">Saldo Akhir</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {feed.projections.map((p, idx) => {
                      const totalOut = p.coOps + p.coFunding;
                      const isNeg = p.closingBalance < 0;
                      return (
                        <tr key={idx} className={isNeg ? 'bg-rose-950/20' : 'hover:bg-slate-800/30'}>
                          <td className="py-2 px-3 font-semibold text-slate-200">{p.date}</td>
                          <td className="py-2 px-2 text-slate-400">{p.day}</td>
                          <td className="py-2 px-2 text-right text-emerald-400">
                            {p.ciOps > 0 ? `Rp${(p.ciOps / 1e6).toFixed(1)} jt` : '-'}
                          </td>
                          <td className="py-2 px-2 text-right text-rose-300">
                            {totalOut > 0 ? `Rp${(totalOut / 1e6).toFixed(1)} jt` : '-'}
                          </td>
                          <td className={`py-2 px-3 text-right font-bold ${isNeg ? 'text-rose-400' : 'text-slate-100'}`}>
                            {isNeg ? `(Rp${Math.abs(p.closingBalance / 1e6).toFixed(1)} jt)` : `Rp${(p.closingBalance / 1e6).toFixed(1)} jt`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CARD 2: Ayemva B2B Enterprise Outreach */}
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#8B1E2D]/40 border border-[#8B1E2D]/70 flex items-center justify-center text-rose-300">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">Ayemva Commercial Outreach Engine</h3>
                    <p className="text-xs text-slate-400">Pilot Diagnostik 30 Hari (Rp10–25 jt) · 7 AI Agent</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-emerald-950/60 border border-emerald-800 text-emerald-300">
                  Target: Rp10-25M
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'CPO Amartha (Rine)', role: 'Chief People Officer', status: 'Priority 1', pitch: 'Proposal Pilot 30 Hari + Deck HTML + Video 4m13s' },
                  { name: 'Primaya Hospital Group', role: 'Head of People & Org', status: 'Priority 2', pitch: 'Pilot Diagnostik Shift Medis 7 AI Agent' },
                  { name: 'Privy Executive Team', role: 'VP People & Culture', status: 'Priority 3', pitch: 'Intelijen Psikososial & Permenaker 5/2018' },
                ].map((target, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{target.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">{target.status}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{target.role} · {target.pitch}</p>
                    </div>

                    <button
                      onClick={() => handleSendOutreach(target.name)}
                      disabled={outreachSent[target.name]}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                        outreachSent[target.name]
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 cursor-default'
                          : 'bg-[#0B2545] hover:bg-[#0f3460] text-white border border-[#E3B931]/40 shadow-sm'
                      }`}
                    >
                      {outreachSent[target.name] ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Draf Terkirim</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-[#E3B931]" />
                          <span>Kirim Proposal</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Decision Matrix & Ghostwriter Studio (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* CARD 3: Decision Matrix v4.0 */}
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-300">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">Decision Matrix v4.0</h3>
                    <p className="text-xs text-slate-400">{decisions.length} Active Mandates</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-900/40 text-indigo-300 border border-indigo-700/40">
                  BROADCAST LIVE
                </span>
              </div>

              {/* Log New Decision */}
              <form onSubmit={handleAddDecision} className="mb-4 space-y-2">
                <div className="flex gap-2">
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value as any)}
                    className="bg-slate-800 border border-slate-700 text-xs rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-[#E3B931]"
                  >
                    <option value="STRATEGY">STRATEGY</option>
                    <option value="OPERATIONS">OPERATIONS</option>
                    <option value="TECH_ARCH">TECH_ARCH</option>
                    <option value="INVESTMENT">INVESTMENT</option>
                    <option value="COMMUNICATION">COMMUNICATION</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Catat keputusan terstruktur..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 text-xs rounded-lg px-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#E3B931]"
                  />
                  <button
                    type="submit"
                    className="bg-[#8B1E2D] hover:bg-[#a32435] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0"
                  >
                    Log
                  </button>
                </div>
              </form>

              {/* Decision List */}
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {decisions.map((dec) => (
                  <div key={dec.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span className="text-[#E3B931] font-bold">{dec.id}</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-300">{dec.category}</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium leading-relaxed">{dec.decision}</p>
                    <p className="text-[10px] text-slate-500">{new Date(dec.timestamp).toLocaleString('id-ID')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 4: Executive Ghostwriter Studio */}
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">Ghostwriter Studio</h3>
                    <p className="text-xs text-slate-400">Format C-Level & BoD SmartID/Ayemva</p>
                  </div>
                </div>
                <div className="flex rounded-lg bg-slate-800 p-0.5 border border-slate-700 text-[10px]">
                  {(['MEMO', 'DIRECTIVE', 'EMAIL'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setGhostwriterType(t)}
                      className={`px-2 py-1 rounded-md font-medium transition-all ${
                        ghostwriterType === t ? 'bg-[#0B2545] text-[#E3B931] font-bold' : 'text-slate-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Topik / Mandat eksekutif..."
                    value={ghostTopic}
                    onChange={(e) => setGhostTopic(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 text-xs rounded-lg px-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#E3B931]"
                  />
                  <button
                    onClick={handleGenerateGhostwriter}
                    className="bg-[#0B2545] hover:bg-[#0f3460] text-white border border-[#E3B931]/40 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0"
                  >
                    Draf
                  </button>
                </div>

                {ghostOutput && (
                  <div className="p-3 rounded-xl bg-[#070b19] border border-slate-700/60 font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                    {ghostOutput}
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070b19] px-4 lg:px-8 py-3 text-center text-xs text-slate-500">
        Prepared by: Mario Simorangkir · Co VP Finance, SmartID · Pendiri Ayemva · $0 Multi-Platform Engine
      </footer>
    </div>
  );
}
