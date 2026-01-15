
import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  Calculator, 
  Activity, 
  Crown, 
  Database, 
  Rocket, 
  Home, 
  Briefcase, 
  Zap, 
  HelpCircle, 
  ChevronRight, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search,
  MessageSquare,
  ArrowUpRight,
  TrendingUp,
  FileText,
  HeartPulse,
  Info,
  ChevronDown,
  Lock,
  Target,
  Lightbulb,
  ListChecks,
  Quote,
  BookOpen,
  Coffee,
  ShoppingBag,
  Ticket,
  Utensils,
  Newspaper,
  GlassWater
} from 'lucide-react';
import { 
  CAPITALS, 
  DURATIONS, 
  INJURIES, 
  FAQS, 
  SALES_HOOKS, 
  COMMERCIAL_STRATEGIES,
  STORY_CASES,
  PREMIUM_DATA 
} from './constants';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calc' | 'lesioni' | 'coach' | 'info' | 'storytelling'>('coach');
  const [selectedStrategy, setSelectedStrategy] = useState<number>(0);
  const [age, setAge] = useState(40);
  const [isSmoker, setIsSmoker] = useState(false);
  const [capital, setCapital] = useState(100000);
  const [duration, setDuration] = useState(10);
  const [searchInjury, setSearchInjury] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const calculatedPremium = useMemo(() => {
    const capitalTable = PREMIUM_DATA[capital];
    if (!capitalTable) return null;

    const smokerTable = isSmoker ? capitalTable.F : capitalTable.NF;
    
    // Snapping alla riga della tabella (30, 40, 50, 55, 60, 65, 70)
    const agesAvailable = Object.keys(smokerTable).map(Number).sort((a, b) => a - b);
    const nearestAge = agesAvailable.find(a => a >= age) || agesAvailable[agesAvailable.length - 1];
    
    const premiumValue = smokerTable[nearestAge]?.[duration];
    return premiumValue;
  }, [age, isSmoker, capital, duration]);

  const fiscalRecovery = useMemo(() => {
    if (!calculatedPremium) return 0;
    // La detrazione del 19% si applica su un premio massimo di 530€
    const applicablePremium = Math.min(calculatedPremium, 530);
    return applicablePremium * 0.19;
  }, [calculatedPremium]);

  const filteredInjuries = useMemo(() => {
    return INJURIES.filter(i => 
      i.description.toLowerCase().includes(searchInjury.toLowerCase()) || 
      i.category.toLowerCase().includes(searchInjury.toLowerCase())
    );
  }, [searchInjury]);

  // Calcolo costo giornaliero e comparazione dinamica
  const dailyCost = calculatedPremium ? (calculatedPremium / 365) : 0;
  
  const dailyComparison = useMemo(() => {
    if (dailyCost === 0) return null;
    
    const comparisons = [
      { max: 0.60, label: "Meno di una bottiglietta d'acqua", icon: GlassWater, color: 'text-blue-400' },
      { max: 1.20, label: "Meno di un caffè a Napoli", icon: Coffee, color: 'text-orange-600' },
      { max: 1.80, label: "Come un quotidiano", icon: Newspaper, color: 'text-slate-500' },
      { max: 2.50, label: "Come un biglietto del bus", icon: Ticket, color: 'text-emerald-500' },
      { max: 5.00, label: "Come una colazione al bar", icon: Utensils, color: 'text-amber-600' },
      { max: Infinity, label: "Come un panino veloce", icon: ShoppingBag, color: 'text-red-500' }
    ];

    return comparisons.find(c => dailyCost <= c.max) || comparisons[comparisons.length - 1];
  }, [dailyCost]);

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col font-sans text-[#1A202C]">
      {/* Header Advisor */}
      <header className="bg-gradient-to-r from-[#003399] to-[#0055CC] text-white sticky top-0 z-50 shadow-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-white p-2 rounded-2xl shadow-lg transform group-hover:rotate-6 transition-transform">
              <Shield className="text-[#003399]" size={28} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tighter leading-none">Vomero Unit Advisor</h1>
              <p className="text-[9px] font-bold text-blue-200 uppercase tracking-[0.2em] mt-1 italic">Smart Protection Suite</p>
            </div>
          </div>
          <nav className="hidden md:flex bg-black/10 p-1 rounded-2xl border border-white/5 backdrop-blur-sm">
            {[
              { id: 'coach', label: 'Coach Master', icon: Crown },
              { id: 'storytelling', label: 'Storytelling', icon: BookOpen },
              { id: 'calc', label: 'Preventivatore', icon: Calculator },
              { id: 'lesioni', label: 'Prontuario Lesioni', icon: Activity },
              { id: 'info', label: 'FAQ & Normativa', icon: FileText }
            ].map(t => (
              <button 
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all duration-300 ${activeTab === t.id ? 'bg-white text-[#003399] shadow-xl scale-105' : 'text-blue-50 hover:bg-white/10'}`}
              >
                <t.icon size={16} /> {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Sticky Nav */}
      <div className="md:hidden flex overflow-x-auto bg-[#003399] px-4 py-3 gap-3 scrollbar-hide border-b border-white/10 sticky top-[72px] z-40">
        {[
          { id: 'coach', label: 'Coach', icon: Crown },
          { id: 'storytelling', label: 'Storie', icon: BookOpen },
          { id: 'calc', label: 'Prev.', icon: Calculator },
          { id: 'lesioni', label: 'Lesioni', icon: Activity },
          { id: 'info', label: 'FAQ', icon: FileText }
        ].map(t => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black shrink-0 transition-all ${activeTab === t.id ? 'bg-white text-[#003399]' : 'text-blue-100'}`}
          >
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        
        {/* TAB 1: COACH MASTER */}
        {activeTab === 'coach' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Sezione Strategia Commerciale Dettagliata */}
            <section className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-[#003399] text-[9px] font-black uppercase rounded-full tracking-[0.2em]">
                    <Target size={12} /> Commercial Intelligence Hub
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                    Strategie per Segmento
                    <span className="block md:inline md:ml-4 text-lg font-medium text-[#003399]/40 lowercase italic normal-case">
                      (editing Gm Camposano)
                    </span>
                  </h2>
                  <p className="text-slate-500 font-medium italic">Seleziona la tipologia di cliente per sbloccare gli spunti di vendita dedicati.</p>
                </div>
              </div>

              {/* Segment Selector */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {COMMERCIAL_STRATEGIES.map((strat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedStrategy(idx)}
                    className={`p-6 rounded-[2rem] border-2 transition-all text-left group ${selectedStrategy === idx ? 'bg-[#003399] border-[#003399] text-white shadow-xl scale-105' : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200'}`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${selectedStrategy === idx ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-blue-50'}`}>
                       {idx === 0 ? <Home size={24} /> : idx === 1 ? <Briefcase size={24} /> : idx === 2 ? <Rocket size={24} /> : <TrendingUp size={24} />}
                    </div>
                    <h4 className={`text-xs font-black uppercase tracking-widest ${selectedStrategy === idx ? 'text-blue-100' : 'text-slate-400'}`}>Target</h4>
                    <p className={`text-sm font-black leading-tight mt-1 ${selectedStrategy === idx ? 'text-white' : 'text-slate-900'}`}>{strat.segment}</p>
                  </button>
                ))}
              </div>

              {/* Strategy Details Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 space-y-8 max-h-[1000px] overflow-y-auto scrollbar-hide">
                   <div className="space-y-4">
                     <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                       <Lightbulb className="text-orange-500" fill="currentColor" /> Idee & Strategie di Vendita
                     </h3>
                     <p className="text-sm text-slate-500 leading-relaxed font-medium italic">{COMMERCIAL_STRATEGIES[selectedStrategy].targetDescription}</p>
                   </div>

                   <div className="grid gap-6">
                     {COMMERCIAL_STRATEGIES[selectedStrategy].strategies.map((s, i) => (
                       <div key={i} className="bg-[#F8FAFC] p-6 rounded-3xl border border-slate-200 group hover:border-[#003399] transition-all">
                         <h5 className="text-sm font-black text-[#003399] uppercase tracking-widest mb-2">{s.title}</h5>
                         <p className="text-sm text-slate-600 font-medium leading-relaxed">{s.description}</p>
                       </div>
                     ))}
                   </div>

                   <div className="space-y-4">
                     <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <ListChecks size={16} className="text-emerald-500" /> Bisogni Latenti
                     </h4>
                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {COMMERCIAL_STRATEGIES[selectedStrategy].needs.map((n, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs font-bold text-slate-600">
                             <CheckCircle2 size={14} className="text-blue-500 shrink-0 mt-0.5" />
                             {n}
                          </li>
                        ))}
                     </ul>
                   </div>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-6">
                   <div className="flex-1 bg-[#1A202C] rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                      <h3 className="text-xs font-black uppercase text-emerald-400 tracking-[0.3em] mb-8 flex items-center gap-2">
                        <Zap size={18} fill="currentColor" /> Vantaggi Chiave
                      </h3>
                      <div className="space-y-6">
                        {COMMERCIAL_STRATEGIES[selectedStrategy].keyBenefits.map((b, i) => (
                          <div key={i} className="flex items-center gap-4 group">
                             <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-black group-hover:bg-emerald-500 group-hover:text-white transition-all">0{i+1}</div>
                             <p className="text-sm font-bold text-slate-300 italic">{b}</p>
                          </div>
                        ))}
                      </div>
                   </div>

                   <div className="bg-blue-50 rounded-[2.5rem] p-8 border border-blue-100">
                      <h4 className="text-xs font-black text-[#003399] uppercase tracking-widest mb-4">Gancio Pratico</h4>
                      <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-200">
                         <p className="text-sm font-bold text-slate-800 leading-relaxed italic">
                           "{SALES_HOOKS.find(h => h.segment.toLowerCase().includes(COMMERCIAL_STRATEGIES[selectedStrategy].segment.split(' ')[0].toLowerCase()))?.hook || "Garantisci oggi il valore del loro futuro."}"
                         </p>
                      </div>
                   </div>
                </div>
              </div>
            </section>

            {/* Sezione Obiezioni Originaria */}
            <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 transition-colors" />
              <div className="relative z-10 space-y-10">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#003399] to-blue-500 rounded-3xl flex items-center justify-center text-white shadow-2xl transform -rotate-3 transition-transform duration-500">
                    <MessageSquare size={40} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none">The Coach Master: Rebuttals</h2>
                    <p className="text-slate-500 font-medium italic text-lg leading-relaxed">"Trasforma ogni 'No' in un'opportunità di approfondimento."</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {SALES_HOOKS.map((hook, i) => (
                    <div key={i} className="bg-white p-7 rounded-[2rem] border-2 border-slate-100 shadow-lg relative group/rebuttal hover:border-emerald-100 transition-all">
                      <div className="absolute top-4 right-4 text-emerald-100 group-hover/rebuttal:text-emerald-200"><Info size={24} /></div>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">Obiezione <span className="text-slate-800">{hook.segment}</span> <ChevronDown size={10}/></p>
                          <p className="text-base font-bold text-slate-800 italic">"{hook.objection}"</p>
                        </div>
                        <div className="h-0.5 bg-slate-50 w-full" />
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1">Script Advisor <Zap size={10} className="fill-emerald-600" /></p>
                          <p className="text-sm font-medium text-slate-600 leading-relaxed">{hook.response}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: STORYTELLING - CASI REALI */}
        {activeTab === 'storytelling' && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-5 duration-700">
             <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#F0F7FF] text-[#003399] text-[11px] font-black uppercase rounded-full tracking-[0.3em] shadow-sm"><BookOpen size={18}/> Real-life Case Studies</div>
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Storie di Protezione</h2>
              <p className="text-slate-500 font-medium max-w-2xl mx-auto italic">Analisi di scenari reali dove Zurich Smart Protection ha fatto la differenza tra crisi e serenità.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {STORY_CASES.map((caseStudy) => (
                <div key={caseStudy.id} className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100 flex flex-col relative overflow-hidden group hover:shadow-2xl transition-all border-l-8 border-l-[#003399]">
                   <div className="absolute -top-10 -right-10 text-slate-50 opacity-10 group-hover:rotate-12 transition-transform">
                      <Quote size={160} />
                   </div>
                   
                   <div className="flex flex-wrap gap-2 mb-6">
                      {caseStudy.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-blue-50 text-[#003399] text-[10px] font-black uppercase rounded-lg tracking-widest">{tag}</span>
                      ))}
                   </div>

                   <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">{caseStudy.title}</h3>
                   <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#003399]"><User size={20} /></div>
                      <span className="text-sm font-bold text-slate-600 italic">{caseStudy.protagonist}</span>
                   </div>

                   <div className="space-y-6 flex-1">
                      <div className="space-y-2">
                         <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lo Scenario</h4>
                         <p className="text-sm font-medium text-slate-700">{caseStudy.scenario}</p>
                      </div>
                      <div className="space-y-2">
                         <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest">L'Evento</h4>
                         <p className="text-sm font-bold text-slate-900 italic">"{caseStudy.event}"</p>
                      </div>
                      <div className="space-y-2">
                         <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">L'Intervento Zurich</h4>
                         <p className="text-sm font-medium text-slate-700 bg-emerald-50 p-4 rounded-2xl border border-emerald-100">{caseStudy.benefit}</p>
                      </div>
                   </div>

                   <div className="mt-10 pt-6 border-t border-slate-100">
                      <p className="text-xs font-black text-[#003399] uppercase tracking-[0.2em] mb-2 flex items-center gap-2"><Lightbulb size={14}/> Advisor Takeaway</p>
                      <p className="text-sm font-bold text-slate-500 italic leading-relaxed">"{caseStudy.lesson}"</p>
                   </div>
                </div>
              ))}
            </div>

            <div className="bg-[#1A202C] rounded-[3rem] p-12 text-white text-center space-y-6">
               <Quote className="mx-auto text-blue-500" size={48} fill="currentColor" />
               <h3 className="text-3xl font-black uppercase tracking-tighter">"Le persone non comprano polizze, comprano la continuazione della propria storia."</h3>
               <p className="text-slate-400 font-medium italic">Usa queste storie durante l'intervista per rendere tangibile il valore della protezione.</p>
            </div>
          </div>
        )}

        {/* TAB 3: PREVENTIVATORE */}
        {activeTab === 'calc' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="lg:col-span-8 space-y-8">
              <section className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                      <Calculator className="text-[#003399]" /> Configura la Tutela
                    </h2>
                    <p className="text-xs font-medium text-slate-400">Dati basati sugli esempi di premio NETTO (PDF pag. 19-24)</p>
                  </div>
                  <div className="flex bg-[#F1F5F9] p-1.5 rounded-2xl border border-slate-200 shadow-inner">
                    <button onClick={() => setIsSmoker(false)} className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase transition-all duration-300 ${!isSmoker ? 'bg-white text-[#003399] shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>Non Fumatore</button>
                    <button onClick={() => setIsSmoker(true)} className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase transition-all duration-300 ${isSmoker ? 'bg-white text-orange-600 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>Fumatore</button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] flex items-center justify-between">
                        Età Assicurativa <span className="text-[#003399] text-xl font-black">{age} anni</span>
                      </label>
                      <input type="range" min="30" max="70" step="5" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#003399]" />
                      <div className="flex justify-between text-[11px] font-black text-slate-300"><span>30y</span><span>40y</span><span>50y</span><span>60y</span><span>70y</span></div>
                      <p className="text-[9px] font-bold text-slate-400 italic">I premi sono mappati per gli scaglioni previsti nelle tabelle ufficiali.</p>
                    </div>

                    <div className="space-y-5">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] flex items-center gap-2">
                        <Database size={14} className="text-blue-600" /> Capitale Assicurabile
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {CAPITALS.map(c => (
                          <button key={c} onClick={() => setCapital(c)} className={`py-4 rounded-2xl text-[12px] font-black border-2 transition-all duration-300 ${capital === c ? 'border-[#003399] bg-[#F0F7FF] text-[#003399] shadow-md scale-105' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'}`}>
                            {c/1000}k €
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div className="space-y-5">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] flex items-center gap-2">
                        <Clock size={14} className="text-blue-600" /> Durata Garanzia
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {DURATIONS.map(d => (
                          <button key={d} onClick={() => setDuration(d)} className={`py-4 rounded-2xl text-[12px] font-black border-2 transition-all duration-300 ${duration === d ? 'border-[#003399] bg-[#F0F7FF] text-[#003399] shadow-md scale-105' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'}`}>
                            {d}y
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200 shadow-inner relative group">
                      <h3 className="text-xs font-black uppercase text-slate-900 flex items-center gap-2 tracking-widest mb-5"><HeartPulse size={16} className="text-blue-600"/> Pilastri Protezione</h3>
                      <ul className="space-y-4">
                        {[
                          "Indennizzo Lesioni da infortunio AUTOMATICO (Fino a 50k)",
                          "Nessuna visita medica (Questionario 5 domande)",
                          "Premio COSTANTE e bloccato all'ingresso",
                          "Frazionabile mensilmente senza costi"
                        ].map((txt, i) => (
                          <li key={i} className="flex items-start gap-3 text-[11px] font-bold text-slate-600 leading-tight">
                            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                            {txt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl border border-blue-100 relative overflow-hidden flex flex-col items-center text-center">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-[#003399]" />
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">Investimento Annuo</p>
                {calculatedPremium ? (
                  <>
                    <div className="flex items-baseline gap-1 mb-8 animate-in fade-in slide-in-from-top-2">
                      <span className="text-7xl font-black text-slate-900 tracking-tighter">{calculatedPremium.toLocaleString('it-IT')}</span>
                      <span className="text-2xl font-black text-slate-400">€</span>
                    </div>
                    <div className="w-full space-y-3 mb-10 text-left">
                      <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-2xl border border-slate-100 group cursor-help">
                        <span className="text-[11px] font-black uppercase text-slate-500 flex items-center gap-1">Rata Mensile <Info size={12} className="text-slate-300"/></span>
                        <span className="text-xl font-black text-[#003399]">€ {(calculatedPremium/12).toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-slate-100 group relative overflow-hidden">
                        <div className="flex flex-col">
                           <span className="text-[11px] font-black uppercase text-slate-500 flex items-center gap-1">Costo Giornaliero 
                             {dailyComparison && <dailyComparison.icon size={12} className={`${dailyComparison.color} animate-bounce`}/>}
                           </span>
                           <span className={`text-[9px] font-bold uppercase tracking-widest ${dailyComparison?.color || 'text-slate-400'}`}>
                             ({dailyComparison?.label || 'Prezzo di un caffè'})
                           </span>
                        </div>
                        <span className="text-xl font-black text-slate-900">€ {dailyCost.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <div className="flex flex-col">
                           <span className="text-[11px] font-black uppercase text-emerald-600 flex items-center gap-1">Recupero Fiscale <Info size={10} className="text-emerald-300" /></span>
                           <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">(19% su max 530€)</span>
                        </div>
                        <span className="text-xl font-black text-emerald-700">€ {fiscalRecovery.toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-20 px-6 flex flex-col items-center gap-4 text-orange-400">
                    <AlertCircle size={64} className="animate-pulse" />
                    <p className="text-sm font-black uppercase leading-tight">Combinazione Fuori Tabella</p>
                    <p className="text-[10px] font-medium text-slate-400 italic">La combinazione scelta non è presente negli esempi del prodotto (età/durata).</p>
                  </div>
                )}
                <div className="mt-8 pt-6 border-t border-slate-50 w-full flex items-center justify-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                  <Lock size={12} /> Dati riservati advisor
                </div>
              </div>

              <div className="bg-[#1A202C] rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden group cursor-pointer" onClick={() => setActiveTab('lesioni')}>
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />
                <h3 className="text-[10px] font-black uppercase text-blue-400 mb-6 tracking-[0.3em] flex items-center gap-2">
                  <HeartPulse size={18} /> Focus Lesioni
                </h3>
                <p className="text-xl font-bold text-slate-200 mb-6 leading-relaxed italic">"Nessun costo aggiuntivo. Indennizzi certi fino a 50k € per traumi scheletrici e amputazioni."</p>
                <div className="flex items-center gap-2 text-blue-400 text-[11px] font-black uppercase tracking-widest">
                  Prontuario Completo <ChevronRight size={16} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRONTUARIO LESIONI */}
        {activeTab === 'lesioni' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500 pb-20">
            <div className="max-w-4xl flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div className="space-y-3">
                <span className="px-4 py-1.5 bg-blue-100 text-[#003399] text-[10px] font-black uppercase rounded-full tracking-[0.3em]">Documento Allegato</span>
                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">Allegato Lesioni</h2>
                <p className="text-lg text-slate-500 font-medium italic">Copertura valida per tutta la durata della polizza TCM.</p>
              </div>
              <div className="relative w-full md:w-[400px]">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                <input 
                  type="text" 
                  placeholder="Cerca trauma (es: femore, lussazione)..." 
                  className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-3xl shadow-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none font-bold text-slate-800 transition-all"
                  value={searchInjury}
                  onChange={e => setSearchInjury(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredInjuries.map(injury => (
                <div key={injury.id} className="bg-white p-7 rounded-[2.5rem] border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col h-full hover:-translate-y-2 border-t-8 border-t-slate-200 hover:border-t-[#003399]">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{injury.category}</span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-inner ${injury.level > 2 ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-[#003399]'}`}>L{injury.level}</div>
                  </div>
                  <h4 className="text-base font-black text-slate-900 mb-8 leading-snug flex-1 group-hover:text-[#003399] transition-colors">{injury.description}</h4>
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="space-y-1">
                       <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] block">Indennizzo Cash</span>
                       <span className="text-2xl font-black text-[#003399] tracking-tighter">€ {injury.amount.toLocaleString('it-IT')}</span>
                    </div>
                    <Zap size={20} className="text-orange-300 group-hover:text-orange-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: FAQ & INFO */}
        {activeTab === 'info' && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#F0F7FF] text-[#003399] text-[11px] font-black uppercase rounded-full tracking-[0.3em] shadow-sm"><HelpCircle size={18}/> Advisor Knowledge Base</div>
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Domande Frequenti (F.A.Q.)</h2>
              <p className="text-slate-500 font-medium max-w-lg mx-auto italic">Supporto normativo e risposte rapide per la proposizione commerciale.</p>
            </div>

            <div className="grid gap-5">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white rounded-[2rem] border-2 border-slate-100 overflow-hidden shadow-lg transition-all hover:border-blue-100">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full p-7 text-left flex items-center justify-between gap-6 group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[11px] font-black text-slate-400 uppercase group-hover:bg-[#003399] group-hover:text-white transition-all">{faq.category[0]}</div>
                      <h4 className="text-lg font-black text-slate-800 leading-tight uppercase tracking-tight group-hover:text-[#003399] transition-colors">{faq.question}</h4>
                    </div>
                    <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center transition-transform duration-500 ${activeFaq === i ? 'rotate-180 bg-[#003399] text-white' : 'text-slate-400'}`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>
                  {activeFaq === i && (
                    <div className="px-8 pb-8 pt-2 bg-[#F8FAFC] border-t-2 border-slate-50 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="pl-6 border-l-4 border-[#003399] py-2">
                        <p className="text-base font-medium text-slate-600 leading-relaxed italic">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-10 bg-[#1A202C] rounded-[3rem] text-white space-y-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><FileText size={200} /></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase tracking-[0.2em] flex items-center gap-4 mb-8">
                  <TrendingUp className="text-emerald-400" /> Vantaggi Fiscali & Successione
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                     <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Detraibilità</p>
                     <p className="text-base text-slate-300 font-medium leading-relaxed italic">"Il premio è detraibile del 19% fino ad un importo massimo di 530 € l'anno, ai sensi della normativa tributaria vigente."</p>
                  </div>
                  <div className="space-y-4">
                     <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Esenzione</p>
                     <p className="text-base text-slate-300 font-medium leading-relaxed italic">"Il capitale erogato ai beneficiari non è soggetto ad alcuna tassazione ed è totalmente escluso dall'asse ereditario."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Advisor Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 px-8 mt-auto shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#003399] rounded-[1.25rem] flex items-center justify-center text-white font-black italic text-3xl shadow-2xl shadow-blue-900/20 transform rotate-2">Z</div>
            <div>
              <p className="text-sm font-black uppercase text-slate-900 tracking-tighter">Gruppo Vomero Unit (Gm Camposano)</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">Advisor Intelligence Portal v3.0</p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Materiale Riservato</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uso Interno Non Condivisibile</span>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">© 2025 Gruppo Vomero Unit</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
