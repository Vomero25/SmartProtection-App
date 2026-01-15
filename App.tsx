
import React, { useState, useMemo, useRef, useEffect } from 'react';
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
  GlassWater,
  Send,
  Loader2,
  Sparkles
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
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
  const [activeTab, setActiveTab] = useState<'calc' | 'lesioni' | 'coach' | 'info' | 'storytelling' | 'ai'>('coach');
  const [selectedStrategy, setSelectedStrategy] = useState<number>(0);
  const [age, setAge] = useState(40);
  const [isSmoker, setIsSmoker] = useState(false);
  const [capital, setCapital] = useState(100000);
  const [duration, setDuration] = useState(10);
  const [searchInjury, setSearchInjury] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // AI Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'assistant', text: string}[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleAiChat = async () => {
    if (!chatInput.trim() || isAiLoading) return;
    
    const userMessage = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsAiLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const context = `
        Sei un assistente esperto per i consulenti assicurativi Zurich (Vomero Unit).
        Il prodotto è Zurich Smart Protection.
        Dati prodotto disponibili:
        - FAQ: ${JSON.stringify(FAQS)}
        - Strategie: ${JSON.stringify(COMMERCIAL_STRATEGIES)}
        - Lesioni coperte: ${JSON.stringify(INJURIES.slice(0, 15))} (estratto)
        - Casi reali: ${JSON.stringify(STORY_CASES)}
        
        Usa queste informazioni per supportare il consulente nel superare obiezioni, spiegare garanzie o creare script di vendita.
        Rispondi in modo professionale, conciso e orientato alla vendita. Usa il tono di un senior mentor.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: context + "\nDomanda del consulente: " + userMessage }] }
        ],
      });

      setChatHistory(prev => [...prev, { role: 'assistant', text: response.text || "Mi dispiace, non ho potuto elaborare la risposta." }]);
    } catch (error) {
      console.error(error);
      setChatHistory(prev => [...prev, { role: 'assistant', text: "Errore di connessione con l'intelligenza artificiale. Verifica la tua connessione." }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const calculatedPremium = useMemo(() => {
    const capitalTable = PREMIUM_DATA[capital];
    if (!capitalTable) return null;
    const smokerTable = isSmoker ? capitalTable.F : capitalTable.NF;
    const agesAvailable = Object.keys(smokerTable).map(Number).sort((a, b) => a - b);
    const nearestAge = agesAvailable.find(a => a >= age) || agesAvailable[agesAvailable.length - 1];
    const premiumValue = smokerTable[nearestAge]?.[duration];
    return premiumValue;
  }, [age, isSmoker, capital, duration]);

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

  const filteredInjuries = useMemo(() => {
    return INJURIES.filter(i => 
      i.description.toLowerCase().includes(searchInjury.toLowerCase()) || 
      i.category.toLowerCase().includes(searchInjury.toLowerCase())
    );
  }, [searchInjury]);

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col font-sans text-[#1A202C]">
      {/* Header Advisor */}
      <header className="bg-gradient-to-r from-[#003399] to-[#0055CC] text-white sticky top-0 z-50 shadow-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveTab('coach')}>
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
              { id: 'lesioni', label: 'Lesioni', icon: Activity },
              { id: 'ai', label: 'AI Advisor', icon: Sparkles },
              { id: 'info', label: 'FAQ', icon: FileText }
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

      {/* Mobile Nav */}
      <div className="md:hidden flex overflow-x-auto bg-[#003399] px-4 py-3 gap-3 scrollbar-hide border-b border-white/10 sticky top-[72px] z-40">
        {[
          { id: 'coach', label: 'Coach', icon: Crown },
          { id: 'ai', label: 'AI', icon: Sparkles },
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
        
        {/* TAB AI ASSISTANT */}
        {activeTab === 'ai' && (
          <div className="max-w-4xl mx-auto h-[calc(100vh-250px)] flex flex-col bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="p-6 bg-[#003399] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl"><Sparkles size={24} /></div>
                <div>
                  <h3 className="font-black uppercase text-sm tracking-widest">AI Strategy Mentor</h3>
                  <p className="text-[10px] text-blue-200 font-bold uppercase italic tracking-wider">Powered by Gemini Flash</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Online
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {chatHistory.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-10 space-y-4">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-[#003399] mb-4">
                    <MessageSquare size={40} />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 uppercase">Coach Zurich AI</h4>
                  <p className="text-slate-500 text-sm font-medium italic max-w-sm">Chiedimi come superare un'obiezione o approfondimenti sulle lesioni.</p>
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-[2rem] shadow-sm ${msg.role === 'user' ? 'bg-[#003399] text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'}`}>
                    <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isAiLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-50 p-5 rounded-[2rem] rounded-tl-none border border-slate-200 flex items-center gap-3">
                    <Loader2 className="animate-spin text-[#003399]" size={18} />
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Analisi prodotto in corso...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAiChat()}
                  placeholder="Scrivi una domanda sulla Smart Protection..." 
                  className="flex-1 bg-white border-2 border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 outline-none focus:border-[#003399] transition-all"
                />
                <button 
                  onClick={handleAiChat}
                  disabled={isAiLoading || !chatInput.trim()}
                  className="bg-[#003399] text-white p-4 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                >
                  <Send size={24} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB PREVENTIVATORE (Ripristinato) */}
        {activeTab === 'calc' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="lg:col-span-8 space-y-8">
              <section className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                      <Calculator className="text-[#003399]" /> Configura la Tutela
                    </h2>
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
                        Età <span className="text-[#003399] text-xl font-black">{age} anni</span>
                      </label>
                      <input type="range" min="30" max="70" step="5" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#003399]" />
                    </div>
                    <div className="space-y-5">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] flex items-center gap-2">
                        <Database size={14} /> Capitale Assicurabile
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {CAPITALS.map(c => (
                          <button key={c} onClick={() => setCapital(c)} className={`py-4 rounded-2xl text-[12px] font-black border-2 transition-all duration-300 ${capital === c ? 'border-[#003399] bg-[#F0F7FF] text-[#003399]' : 'border-slate-50 bg-slate-50 text-slate-400'}`}>
                            {c/1000}k €
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-10">
                     <div className="space-y-5">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] flex items-center gap-2">
                        <Clock size={14} /> Durata
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {DURATIONS.map(d => (
                          <button key={d} onClick={() => setDuration(d)} className={`py-4 rounded-2xl text-[12px] font-black border-2 transition-all duration-300 ${duration === d ? 'border-[#003399] bg-[#F0F7FF] text-[#003399]' : 'border-slate-50 bg-slate-50 text-slate-400'}`}>
                            {d}y
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-blue-100 text-center flex flex-col items-center">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">Investimento Annuo</p>
                {calculatedPremium ? (
                  <>
                    <div className="flex items-baseline gap-1 mb-8 animate-in fade-in">
                      <span className="text-7xl font-black text-slate-900 tracking-tighter">{calculatedPremium.toLocaleString('it-IT')}</span>
                      <span className="text-2xl font-black text-slate-400">€</span>
                    </div>
                    <div className="w-full space-y-4 text-left">
                       <div className="p-4 bg-white rounded-2xl border-2 border-slate-100 flex justify-between items-center">
                          <div className="flex flex-col">
                             <span className="text-[11px] font-black uppercase text-slate-500">Giornaliero</span>
                             <span className={`text-[9px] font-bold uppercase ${dailyComparison?.color}`}>{dailyComparison?.label}</span>
                          </div>
                          <span className="text-xl font-black">€ {dailyCost.toFixed(2)}</span>
                       </div>
                    </div>
                  </>
                ) : (
                  <div className="py-10 text-orange-400 font-black uppercase">Combinazione Non Disponibile</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ALTRE TAB (Coach, Lesioni, Info) - Logica come definita precedentemente */}
        {activeTab === 'coach' && (
          <div className="space-y-12 animate-in fade-in duration-700">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {COMMERCIAL_STRATEGIES.map((strat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedStrategy(idx)}
                    className={`p-6 rounded-[2rem] border-2 transition-all text-left ${selectedStrategy === idx ? 'bg-[#003399] border-[#003399] text-white shadow-xl' : 'bg-white border-slate-100 text-slate-400'}`}
                  >
                    <h4 className="text-xs font-black uppercase tracking-widest mb-2">Target</h4>
                    <p className="text-sm font-black leading-tight uppercase">{strat.segment}</p>
                  </button>
                ))}
              </div>
              <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-slate-100">
                 <h3 className="text-2xl font-black text-slate-900 uppercase mb-8">{COMMERCIAL_STRATEGIES[selectedStrategy].segment}</h3>
                 <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <h4 className="text-xs font-black text-[#003399] uppercase tracking-widest">Idee di vendita</h4>
                       {COMMERCIAL_STRATEGIES[selectedStrategy].strategies.map((s, i) => (
                         <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                            <p className="font-black text-sm uppercase mb-2">{s.title}</p>
                            <p className="text-sm text-slate-600 font-medium italic">{s.description}</p>
                         </div>
                       ))}
                    </div>
                    <div className="bg-[#1A202C] p-8 rounded-[2.5rem] text-white">
                       <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-6">Vantaggi Chiave</h4>
                       <ul className="space-y-4">
                          {COMMERCIAL_STRATEGIES[selectedStrategy].keyBenefits.map((b, i) => (
                            <li key={i} className="flex gap-3 text-sm font-bold italic text-slate-300">
                               <CheckCircle2 className="text-emerald-500 shrink-0" size={18} /> {b}
                            </li>
                          ))}
                       </ul>
                    </div>
                 </div>
              </div>
          </div>
        )}

        {activeTab === 'lesioni' && (
          <div className="space-y-10 animate-in fade-in duration-500">
             <div className="flex flex-col md:flex-row justify-between gap-6">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Prontuario Lesioni</h2>
                <div className="relative w-full md:w-96">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                   <input 
                      type="text" 
                      placeholder="Cerca trauma..." 
                      className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-[#003399] font-bold"
                      value={searchInjury}
                      onChange={e => setSearchInjury(e.target.value)}
                   />
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredInjuries.map(injury => (
                  <div key={injury.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-lg transition-all border-t-4 border-t-[#003399]">
                     <span className="text-[10px] font-black text-slate-400 uppercase block mb-2">{injury.category}</span>
                     <h4 className="text-sm font-black text-slate-900 mb-6 h-10 overflow-hidden">{injury.description}</h4>
                     <div className="flex justify-between items-end">
                        <span className="text-xl font-black text-[#003399]">€ {injury.amount.toLocaleString()}</span>
                        <div className="px-2 py-1 bg-blue-50 text-[10px] font-black rounded-lg">LIVELLO {injury.level}</div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'storytelling' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-700">
             {STORY_CASES.map(sc => (
               <div key={sc.id} className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 relative group">
                  <div className="absolute top-6 right-6 text-slate-100 group-hover:text-blue-50 transition-colors"><Quote size={80} /></div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 relative z-10">{sc.title}</h3>
                  <div className="space-y-6 relative z-10">
                     <div>
                        <p className="text-[10px] font-black text-[#003399] uppercase tracking-widest mb-1">Scenario</p>
                        <p className="text-sm font-medium text-slate-600 italic">{sc.scenario}</p>
                     </div>
                     <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">L'Intervento</p>
                        <p className="text-sm font-bold text-slate-800">{sc.benefit}</p>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        )}

      </main>

      <footer className="bg-white border-t border-slate-200 py-8 px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#003399] rounded-xl flex items-center justify-center text-white font-black italic text-xl">Z</div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Gruppo Vomero Unit - Smart Protection Advisor v3.5 (AI Enabled)</p>
          </div>
          <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">© 2025 Riservato Advisor Interno</p>
        </div>
      </footer>
    </div>
  );
}
