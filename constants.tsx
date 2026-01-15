
import { Injury, FAQItem, SalesHook, CommercialStrategy, StoryCase } from './types';

// Tabella Premi Integrale estratta dai PDF (Pagine 19-24)
export const PREMIUM_DATA: Record<number, { NF: Record<number, Record<number, number | null>>, F: Record<number, Record<number, number | null>> }> = {
  50000: {
    NF: {
      30: { 5: 159.0, 10: 163.5, 15: 169.5, 20: 180.5 },
      40: { 5: 187.0, 10: 201.5, 15: 219.0, 20: 248.5 },
      50: { 5: 265.5, 10: 307.5, 15: 353.5, 20: 429.5 },
      55: { 5: 349.5, 10: 414.5, 15: 488.5, 20: 605.5 },
      60: { 5: 516.0, 10: 632.5, 15: 756.0, 20: null },
      65: { 5: 753.0, 10: 930.5, 15: null, 20: null },
      70: { 5: 1118.0, 10: null, 15: null, 20: null }
    },
    F: {
      30: { 5: 176.0, 10: 183.5, 15: 194.0, 20: 212.5 },
      40: { 5: 224.0, 10: 250.0, 15: 279.0, 20: 329.5 },
      50: { 5: 360.5, 10: 431.0, 15: 509.5, 20: 638.0 },
      55: { 5: 503.5, 10: 615.5, 15: 740.0, 20: 932.5 },
      60: { 5: 791.5, 10: 989.5, 15: 1194.5, 20: null },
      65: { 5: 1200.5, 10: 1500.0, 15: null, 20: null },
      70: { 5: 1828.0, 10: null, 15: null, 20: null }
    }
  },
  75000: {
    NF: {
      30: { 5: 170.50, 10: 177.25, 15: 186.25, 20: 202.75 },
      40: { 5: 212.50, 10: 234.25, 15: 260.50, 20: 304.75 },
      50: { 5: 330.25, 10: 393.25, 15: 462.25, 20: 576.25 },
      55: { 5: 456.25, 10: 553.75, 15: 664.75, 20: 840.25 },
      60: { 5: 706.00, 10: 880.75, 15: 1066.00, 20: null },
      65: { 5: 1061.50, 10: 1327.75, 15: null, 20: null },
      70: { 5: 1609.00, 10: null, 15: null, 20: null }
    },
    F: {
      30: { 5: 196.00, 10: 207.25, 15: 223.00, 20: 250.75 },
      40: { 5: 268.00, 10: 307.00, 15: 350.50, 20: 426.25 },
      50: { 5: 472.75, 10: 578.50, 15: 696.25, 20: 889.00 },
      55: { 5: 687.25, 10: 855.25, 15: 1042.00, 20: 1330.75 },
      60: { 5: 1119.25, 10: 1416.25, 15: 1723.75, 20: null },
      65: { 5: 1732.75, 10: 2182.00, 15: null, 20: null },
      70: { 5: 2674.00, 10: null, 15: null, 20: null }
    }
  },
  100000: {
    NF: {
      30: { 5: 182, 10: 191, 15: 203, 20: 225 },
      40: { 5: 238, 10: 267, 15: 302, 20: 361 },
      50: { 5: 395, 10: 479, 15: 571, 20: 723 },
      55: { 5: 563, 10: 693, 15: 841, 20: 1075 },
      60: { 5: 896, 10: 1129, 15: 1376, 20: null },
      65: { 5: 1370, 10: 1725, 15: null, 20: null },
      70: { 5: 2100, 10: null, 15: null, 20: null }
    },
    F: {
      30: { 5: 216, 10: 231, 15: 252, 20: 289 },
      40: { 5: 312, 10: 364, 15: 422, 20: 523 },
      50: { 5: 585, 10: 726, 15: 883, 20: 1140 },
      55: { 5: 871, 10: 1095, 15: 1344, 20: 1729 },
      60: { 5: 1447, 10: 1843, 15: 2253, 20: null },
      65: { 5: 2265, 10: 2864, 15: null, 20: null },
      70: { 5: 3520, 10: null, 15: null, 20: null }
    }
  },
  150000: {
    NF: {
      30: { 5: 205.0, 10: 218.5, 15: 236.5, 20: 269.5 },
      40: { 5: 289.0, 10: 332.5, 15: 385.0, 20: 473.5 },
      50: { 5: 524.5, 10: 650.5, 15: 788.5, 20: 1016.5 },
      55: { 5: 776.5, 10: 971.5, 15: 1193.5, 20: 1544.5 },
      60: { 5: 1276.0, 10: 1625.5, 15: 1996.0, 20: null },
      65: { 5: 1987.0, 10: 2519.5, 15: null, 20: null },
      70: { 5: 3082.0, 10: null, 15: null, 20: null }
    },
    F: {
      30: { 5: 256.0, 10: 278.5, 15: 310.0, 20: 365.5 },
      40: { 5: 400.0, 10: 478.0, 15: 565.0, 20: 716.5 },
      50: { 5: 809.5, 10: 1021.0, 15: 1256.5, 20: 1642.0 },
      55: { 5: 1238.5, 10: 1574.5, 15: 1948.0, 20: 2525.5 },
      60: { 5: 2102.5, 10: 2696.5, 15: 3311.5, 20: null },
      65: { 5: 3329.5, 10: 4228.0, 15: null, 20: null },
      70: { 5: 5212.0, 10: null, 15: null, 20: null }
    }
  },
  200000: {
    NF: {
      30: { 5: 228, 10: 246, 15: 270, 20: 314 },
      40: { 5: 340, 10: 398, 15: 468, 20: 586 },
      50: { 5: 654, 10: 822, 15: 1006, 20: 1310 },
      55: { 5: 990, 10: 1250, 15: 1546, 20: 2014 },
      60: { 5: 1656, 10: 2122, 15: 2616, 20: null },
      65: { 5: 2604, 10: 3314, 15: null, 20: null },
      70: { 5: 4064, 10: null, 15: null, 20: null }
    },
    F: {
      30: { 5: 296, 10: 326, 15: 368, 20: 442 },
      40: { 5: 488, 10: 592, 15: 708, 20: 910 },
      50: { 5: 1034, 10: 1316, 15: 1630, 20: 2144 },
      55: { 5: 1606, 10: 2054, 15: 2552, 20: 3322 },
      60: { 5: 2758, 10: 3550, 15: 4370, 20: null },
      65: { 5: 4394, 10: 5592, 15: null, 20: null },
      70: { 5: 6904, 10: null, 15: null, 20: null }
    }
  },
  250000: {
    NF: {
      30: { 5: 251.0, 10: 273.5, 15: 303.5, 20: 358.5 },
      40: { 5: 391.0, 10: 463.5, 15: 551.0, 20: 698.5 },
      50: { 5: 783.5, 10: 993.5, 15: 1223.5, 20: 1603.5 },
      55: { 5: 1203.5, 10: 1528.5, 15: 1898.5, 20: 2483.5 },
      60: { 5: 2036.0, 10: 2618.5, 15: 3236.0, 20: null },
      65: { 5: 3221.0, 10: 4108.5, 15: null, 20: null },
      70: { 5: 5046.0, 10: null, 15: null, 20: null }
    },
    F: {
      30: { 5: 336.0, 10: 373.5, 15: 426.0, 20: 518.5 },
      40: { 5: 576.0, 10: 706.0, 15: 851.0, 20: 1103.5 },
      50: { 5: 1258.5, 10: 1611.0, 15: 2003.5, 20: 2646.0 },
      55: { 5: 1973.5, 10: 2533.5, 15: 3156.0, 20: 4118.5 },
      60: { 5: 3413.5, 10: 4403.5, 15: 5428.5, 20: null },
      65: { 5: 5458.5, 10: 6956.0, 15: null, 20: null },
      70: { 5: 8596.0, 10: null, 15: null, 20: null }
    }
  }
};

export const CAPITALS = [50000, 75000, 100000, 150000, 200000, 250000];
export const DURATIONS = [5, 10, 15, 20];

export const INJURIES: Injury[] = [
  // Livello 1 (2.500 €)
  { id: 1, category: "Apparato Scheletrico", description: "FRATTURA ACETABOLARE SCOMPOSTA", amount: 2500, level: 1 },
  { id: 2, category: "Apparato Scheletrico", description: "FRATTURA ASTRAGALO", amount: 2500, level: 1 },
  { id: 3, category: "Apparato Scheletrico", description: "FRATTURA BIOSSEA RADIO E ULNA SCOMPOSTA", amount: 2500, level: 1 },
  { id: 4, category: "Apparato Scheletrico", description: "FRATTURA BIOSSEA TIBIA E PERONE SCOMPOSTA", amount: 2500, level: 1 },
  { id: 5, category: "Apparato Scheletrico", description: "FRATTURA CORPO DALLA I ALLA XI VERTEBRA DORSALE (una)", amount: 2500, level: 1 },
  { id: 6, category: "Apparato Scheletrico", description: "FRATTURA CORPO III-IV-V-VI-VII VERTEBRA CERVICALE (una)", amount: 2500, level: 1 },
  { id: 7, category: "Apparato Scheletrico", description: "FRATTURA FEMORE", amount: 2500, level: 1 },
  { id: 8, category: "Apparato Scheletrico", description: "FRATTURA GOMITO SCOMPOSTA", amount: 2500, level: 1 },
  { id: 9, category: "Apparato Scheletrico", description: "FRATTURA ROTULA CON INTERVENTO CHIRURGICO", amount: 2500, level: 1 },
  { id: 10, category: "Apparato Scheletrico", description: "FRATTURA SCOMPOSTA DEL MASSICCIO FACCIALE", amount: 2500, level: 1 },
  { id: 11, category: "Apparato Scheletrico", description: "FRATTURA TESTA OMERO", amount: 2500, level: 1 },
  { id: 12, category: "Apparato Scheletrico", description: "TRAUMA CRANICO COMMOTIVO CON LESIONE CEREBRALE", amount: 2500, level: 1 },
  { id: 13, category: "Lesioni Particolari", description: "PERDITA ANATOMICA DI UN TESTICOLO", amount: 2500, level: 1 },
  { id: 14, category: "Lesioni Particolari", description: "PERDITA COMPLETA DI UN PADIGLIONE AURICOLARE", amount: 2500, level: 1 },
  { id: 15, category: "Lesioni Particolari", description: "ROTTURA MILZA CON SPLENECTOMIA", amount: 2500, level: 1 },
  { id: 16, category: "Lesioni Particolari", description: "SORDITÀ COMPLETA BILATERALE (protesizzabile)", amount: 2500, level: 1 },
  { id: 17, category: "Amputazioni", description: "AMPUTAZIONE DELL'ALLUCE", amount: 2500, level: 1 },
  { id: 18, category: "Amputazioni", description: "AMPUTAZIONE TOTALE DI UN ALTRO DITO DELLA MANO DIVERSO DAL POLLICE", amount: 2500, level: 1 },

  // Livello 2 (7.500 €)
  { id: 19, category: "Apparato Scheletrico", description: "FRATTURA CALCAGNO", amount: 7500, level: 2 },
  { id: 20, category: "Apparato Scheletrico", description: "FRATTURA CORPO DALLA I ALLA XI VERTEBRA DORSALE (due o più)", amount: 7500, level: 2 },
  { id: 21, category: "Apparato Scheletrico", description: "FRATTURA CORPO I-II VERTEBRA CERVICALE", amount: 7500, level: 2 },
  { id: 22, category: "Apparato Scheletrico", description: "FRATTURA CORPO III-IV-V-VI-VII VERTEBRA CERVICALE (due o più)", amount: 7500, level: 2 },
  { id: 23, category: "Apparato Scheletrico", description: "FRATTURA CORPO VERTEBRA LOMBARE", amount: 7500, level: 2 },
  { id: 24, category: "Apparato Scheletrico", description: "FRATTURA CORPO XII VERTEBRA DORSALE", amount: 7500, level: 2 },
  { id: 25, category: "Apparato Scheletrico", description: "FRATTURA FEMORE (CON PROTESI D'ANCA)", amount: 7500, level: 2 },
  { id: 26, category: "Apparato Scheletrico", description: "FRATTURA ROTULA CON PATELLECTOMIA", amount: 7500, level: 2 },
  { id: 27, category: "Lesioni Particolari", description: "PERDITA ANATOMICA DEI DUE TESTICOLI", amount: 7500, level: 2 },
  { id: 28, category: "Lesioni Particolari", description: "PERDITA ANATOMICA DELL'UTERO", amount: 7500, level: 2 },
  { id: 29, category: "Lesioni Particolari", description: "PERDITA COMPLETA DI ENTRAMBI I PADIGLIONI AURICOLARI", amount: 7500, level: 2 },
  { id: 30, category: "Lesioni Particolari", description: "ROTTURA RENE CON NEFRECTOMIA", amount: 7500, level: 2 },
  { id: 31, category: "Lesioni Particolari", description: "SORDITÀ COMPLETA UNILATERALE (non protesizzabile)", amount: 7500, level: 2 },
  { id: 32, category: "Amputazioni", description: "AMPUTAZIONE TOTALE DEL POLLICE", amount: 7500, level: 2 },

  // Livello 3 (15.000 €)
  { id: 33, category: "Lesioni Particolari", description: "PERDITA ANATOMICA DEL PENE", amount: 15000, level: 3 },
  { id: 34, category: "Lesioni Particolari", description: "PERDITA ANATOMICA DI UN GLOBO OCULARE", amount: 15000, level: 3 },
  { id: 35, category: "Lesioni Particolari", description: "PERDITA LINGUA (oltre i due terzi)", amount: 15000, level: 3 },
  { id: 36, category: "Lesioni Particolari", description: "PERDITA NASO (oltre i due terzi)", amount: 15000, level: 3 },
  { id: 37, category: "Amputazioni", description: "AMPUTAZIONE ARTO INFERIORE SOTTO IL GINOCCHIO", amount: 15000, level: 3 },
  { id: 38, category: "Amputazioni", description: "AMPUTAZIONE DI UN PIEDE (dalla linea metatarsale)", amount: 15000, level: 3 },
  { id: 39, category: "Amputazioni", description: "AMPUTAZIONE TOTALE DEL POLLICE + UNA O + DITA DELLA MANO", amount: 15000, level: 3 },

  // Livello 4 (25.000 €)
  { id: 40, category: "Lesioni Particolari", description: "CECITÀ COMPLETA", amount: 25000, level: 4 },
  { id: 41, category: "Lesioni Particolari", description: "SORDITÀ COMPLETA BILATERALE (non protesizzabile)", amount: 25000, level: 4 },
  { id: 42, category: "Amputazioni", description: "AMPUTAZIONE ARTO INFERIORE SOPRA IL GINOCCHIO", amount: 25000, level: 4 },
  { id: 43, category: "Amputazioni", description: "AMPUTAZIONE DELL'ARTO INFERIORE AL TERZO PROSSIMALE", amount: 25000, level: 4 },
  { id: 44, category: "Amputazioni", description: "AMPUTAZIONE DELL'ARTO SUPERIORE AL TERZO PROSSIMALE", amount: 25000, level: 4 }
];

export const FAQS: FAQItem[] = [
  {
    category: "Proposizione",
    question: "L’Assicurato ha già sottoscritto una polizza TCM con Zurich, posso proporre la Smart Protection?",
    answer: "Sì, è possibile proporla. Il capitale massimo assicurabile dipende dal cumulo: fino a 400.000€ (età ≤45), 300.000€ (46-55) e 200.000€ (≥56). Esempio: cliente di 50 anni con polizza da 150k può sottoscrivere Smart Protection fino a 150k (300k - 150k)."
  },
  {
    category: "Scontistica",
    question: "È possibile applicare delle scontistiche sul premio annuo?",
    answer: "Sì, sono previste convenzioni (Codice ZUL) come SBPR1 (50% provv. acquisto), SBPR2 (100% provv. acquisto) e sconti speciali per contraente Consulente Finanziario (SBPRCF)."
  },
  {
    category: "Normativa",
    question: "Che cos’è l’oblio oncologico e si applica alla Smart Protection?",
    answer: "È il diritto di non fornire informazioni su patologie oncologiche guarite da più di 10 anni (5 se insorte prima dei 21). Si applica: l’Assicurato può rispondere NO alle domande del questionario medico in tali condizioni."
  },
  {
    category: "Copertura",
    question: "È previsto un periodo di carenza?",
    answer: "Sì, 6 mesi. In caso di decesso Zurich restituisce i premi pagati al netto dei costi fissi. La carenza NON si applica se il decesso è dovuto a Infortunio, shock anafilattico o specifiche malattie infettive acute."
  },
  {
    category: "Fiscalità",
    question: "Quali sono i benefici fiscali?",
    answer: "Il capitale è esente da tasse quando erogato. Il premio è detraibile al 19% fino a un massimo di 530€ di premio (corrispondente a circa 100€ di risparmio fiscale)."
  }
];

export const SALES_HOOKS: SalesHook[] = [
  {
    segment: "GIOVANI",
    title: "Blocca il Futuro",
    hook: "Assicurarsi da giovani è come comprare una casa oggi al prezzo di 15 anni fa. Blocchi ora un capitale importante con un premio minimo che rimane costante nel tempo.",
    objection: "Costa troppo.",
    response: "Il costo è pari o inferiore a un abbonamento Netflix o un caffè al giorno. Puoi anche frazionarlo mensilmente senza costi aggiuntivi.",
    icon: "Rocket"
  },
  {
    segment: "FAMIGLIE",
    title: "Proteggi il tenore di vita",
    hook: "Se domani il tuo stipendio non arrivasse più, per quanti mesi la tua famiglia potrebbe mantenere lo stesso stile di vita? Zurich garantisce liquidità immediata.",
    objection: "Ho già il patrimonio investito.",
    response: "Smart Protection protegge proprio il tuo patrimonio: evita che i tuoi cari debbano svendere immobili o disinvestire in perdita per far fronte a imprevisti o spese di successione.",
    icon: "Home"
  },
  {
    segment: "IMPRENDITORI",
    title: "Continuità Aziendale",
    hook: "Nelle società di persone, in caso di morte di un socio, i superstiti devono liquidare la quota agli eredi. Zurich fornisce la cassa pronta per non bloccare l'attività.",
    objection: "Siamo una società di capitali.",
    response: "Utile anche lì: permette ai soci superstiti di avere la liquidità necessaria per rilevare la quota dagli eredi e mantenere il controllo dell'azienda.",
    icon: "Briefcase"
  },
  {
    segment: "SPORTIVI",
    title: "Indennizzo Lesioni",
    hook: "Giocando a Padel o sciando il rischio infortunio è reale. Zurich ti riconosce un indennizzo forfettario cash sulla base della sola diagnosi del pronto soccorso.",
    objection: "Ho già l'assicurazione infortuni.",
    response: "Questa si somma ad altre polizze! E paga senza franchigie basate su invalidità permanenti: basta il referto per la frattura o la lesione specifica.",
    icon: "Activity"
  }
];

export const COMMERCIAL_STRATEGIES: CommercialStrategy[] = [
  {
    segment: "FAMIGLIE CON MUTUO O FIGLI",
    targetDescription: "Nuclei familiari con impegni finanziari a lungo termine (mutui, prestiti) e figli minori o studenti dipendenti dal reddito dei genitori.",
    needs: [
      "Protezione del tetto coniugale: estinzione immediata del mutuo residuo.",
      "Garanzia del percorso di studi: fondo per università o master esteri.",
      "Tappe evolutive: liquidità per i momenti critici (matrimoni, avvio attività dei figli).",
      "Pace mentale: eliminazione dell'ansia da 'cosa accadrebbe se...'.",
      "Copertura per il coniuge non lavoratore: valore economico della gestione domestica."
    ],
    strategies: [
      {
        title: "L'Integrità del Patrimonio",
        description: "Invece di focalizzarti sul decesso, parla di 'scudo patrimoniale'. Spiega che la polizza è un 'conto corrente di emergenza' pre-alimentato che evita lo smobilizzo forzoso di investimenti o immobili in momenti di mercato sfavorevoli."
      },
      {
        title: "Approccio 'Valore del Tempo'",
        description: "Usa la regola del 10: un capitale pari a 10 anni di reddito garantisce alla famiglia il tempo necessario per riorganizzarsi psicologicamente ed economicamente senza dover prendere decisioni affrettate sotto stress."
      },
      {
        title: "Il Costo dell'Inazione",
        description: "Confronta il premio mensile (es. 20€) con spese superflue. 'Proteggere il futuro di tuo figlio costa meno di due aperitivi al mese. Quale dei due ha un impatto reale sulla sua vita tra 15 anni?'"
      },
      {
        title: "Successione Senza Attriti",
        description: "Sottolinea che il capitale TCM è fuori dall'asse ereditario: arriva subito, senza tasse e senza passare per burocrazie legali lunghe mesi, fornendo liquidità per pagare proprio le tasse di successione degli altri beni."
      }
    ],
    keyBenefits: ["Liquidità immediata non tassata", "Esclusione totale asse ereditario", "Nessun costo di frazionamento", "Detrazione fiscale 19%"]
  },
  {
    segment: "PROFESSIONISTI E PARTITE IVA",
    targetDescription: "Lavoratori autonomi, consulenti e imprenditori esposti a rischi professionali con tutele previdenziali (INAIL/Cassa) insufficienti.",
    needs: [
      "Cash flow durante il recupero: copertura costi fissi studio/ufficio.",
      "Indennizzo infortuni 'senza burocrazia': focus su Allegato Lesioni.",
      "Protezione della reputazione: fondi per delegare compiti durante l'assenza.",
      "Key Man Protection: garantire la continuità dello studio in caso di perdita del titolare.",
      "Ottimizzazione fiscale: massimizzare il risparmio sulle imposte tramite detrazione."
    ],
    strategies: [
      {
        title: "Indennizzo vs Invalidità",
        description: "Punta sulla differenza fondamentale: mentre le comuni infortuni pagano solo per invalidità permanenti (spesso sopra franchigie alte), Smart Protection paga 'a diagnosi'. 'Se ti rompi un polso e non puoi firmare o operare, Zurich ti paga subito 2.500€ senza aspettare perizie mediche infinite'."
      },
      {
        title: "Business Continuity Plan",
        description: "Presenta la polizza come un asset aziendale. La somma assicurata può essere usata per assumere un sostituto temporaneo o pagare i collaboratori, mantenendo i clienti attivi anche durante una convalescenza."
      },
      {
        title: "Il Rischio dello Sport 'Relazionale'",
        description: "Molti professionisti fanno networking tramite lo sport (Padel, Golf, Sci). Sottolinea che un infortunio durante un'attività ricreativa ha lo stesso impatto devastante sul business di un incidente sul lavoro."
      },
      {
        title: "Leverage Fiscale Strategico",
        description: "Dimostra come la detrazione del 19% renda l'investimento netto estremamente basso, quasi interamente assorbito dal risparmio sulle tasse per determinati scaglioni di reddito."
      }
    ],
    keyBenefits: ["Indennizzi certi (Allegato Lesioni)", "Velocità di liquidazione (Referto PS)", "Flessibilità di capitale", "Cumulabilità con altre polizze"]
  },
  {
    segment: "GIOVANI ADULTI (UNDER 35)",
    targetDescription: "Single o giovani coppie che iniziano l'indipendenza, spesso sportivi, con grandi sogni ma basi patrimoniali ancora da costruire.",
    needs: [
      "Indipendenza dai genitori: coprire prestiti auto o master senza gravare sulla famiglia.",
      "Tutela dello stile di vita attivo: protezione per infortuni durante sport o viaggi.",
      "Investimento sulla salute: 'congelare' i premi bassi legati alla giovane età.",
      "Accesso semplificato: nessuna visita medica, tutto basato sulla fiducia (questionario).",
      "Costruzione pilastro protezione: primo passo verso una pianificazione seria."
    ],
    strategies: [
      {
        title: "La Strategia del 'Lock-in'",
        description: "Spiega che l'assicurabilità è un bene deperibile. Assicurarsi ora, quando si è sani, permette di bloccare un prezzo basso per 20 anni. Aspettare significa rischiare che una piccola patologia futura renda la copertura costosissima o impossibile."
      },
      {
        title: "Digital Nomad & Sport",
        description: "Punta sulla protezione infortuni globale. 'Viaggi spesso? Fai sport ogni weekend? Zurich ti segue ovunque. Se cadi e ti rompi una caviglia, hai un indennizzo cash che ti aiuta a gestire l'emergenza fuori casa'."
      },
      {
        title: "Costo 'Micro-Subscription'",
        description: "Presenta il premio mensile come una delle tante sottoscrizioni digitali. 'Paghi già per musica, film e cloud. Questa è la sottoscrizione per la tua sicurezza: costa meno di una di quelle ma vale immensamente di più se succede qualcosa'."
      },
      {
        title: "Responsabilità Finanziaria",
        description: "Incoraggia l'orgoglio dell'indipendenza. 'Avere questa polizza significa che, qualunque cosa accada, non dovrai mai chiedere un euro a nessuno per le tue spese o i tuoi debiti'."
      }
    ],
    keyBenefits: ["Premi estremamente bassi (bloccati)", "Nessuna visita medica (Under 40)", "Copertura sportiva inclusa", "Rata mensile 'Netflix-style'"]
  },
  {
    segment: "SENIOR E PAS passaggio GENERAZIONALE",
    targetDescription: "Clienti sopra i 55 anni, spesso con figli grandi, nipoti e patrimoni immobiliari/aziendali significativi da trasmettere.",
    needs: [
      "Ottimizzazione fiscale: ridurre l'impatto delle imposte di successione.",
      "Liquidità per gli eredi: fondi pronti per pagare tasse e spese legali senza vendere immobili.",
      "Equalizzazione (L'Equalizzatore): lasciare somme uguali a figli con situazioni diverse (es. chi riceve l'azienda vs chi riceve liquidità).",
      "Donazioni protette: somme dedicate a nipoti o enti benefici fuori dalle quote di legittima.",
      "Garanzia di fine vita: eliminare il peso economico delle spese finali dalla famiglia."
    ],
    strategies: [
      {
        title: "La Polizza 'Paga-Tasse'",
        description: "Inquadra la TCM come lo strumento per pagare allo Stato le imposte di successione. Invece di far sì che i tuoi figli debbano svendere la casa di famiglia per pagare le tasse, Zurich fornisce la liquidità necessaria per tenere i beni intatti."
      },
      {
        title: "Tutela dei Nipoti",
        description: "Punta sull'emozione: 'Puoi destinare un capitale specifico ai tuoi nipoti. È un regalo che non passa per la successione ordinaria, arriva direttamente a loro per i loro studi o il loro primo acquisto importante'."
      },
      {
        title: "Lo Strumento di Equità",
        description: "Se un figlio eredita l'attività commerciale e l'altro no, la polizza può compensare finanziariamente il secondo figlio, evitando liti familiari e garantendo armonia post-passaggio."
      },
      {
        title: "Semplificazione Burocratica",
        description: "Enfatizza che con Smart Protection non servono visite mediche complicate (fino a certi limiti), rendendo l'attivazione della protezione semplice e veloce anche in età matura."
      }
    ],
    keyBenefits: ["Esenzione tasse successione", "Capitale insequestrabile e impignorabile", "Beneficiari modificabili in ogni momento", "Liquidazione rapida"]
  }
];

export const STORY_CASES: StoryCase[] = [
  {
    id: 1,
    title: "Il Mutuo non è più un peso",
    protagonist: "Marco e Giulia, 38 anni",
    scenario: "Giovane coppia con due figli piccoli e un mutuo residuo di 180.000€.",
    event: "Marco viene a mancare improvvisamente per un malore cardiaco.",
    impact: "Giulia rimane sola con un unico stipendio e l'impossibilità di sostenere la rata del mutuo.",
    benefit: "Grazie alla TCM Smart Protection da 200.000€, Giulia riceve il capitale esentasse entro 30 giorni. Estingue il mutuo e le rimane una riserva per l'università dei figli.",
    lesson: "La protezione TCM non è per chi muore, ma per chi resta.",
    tags: ["TCM", "Famiglia", "Mutuo"]
  },
  {
    id: 2,
    title: "Il polso del Libero Professionista",
    protagonist: "Alessandro, Architetto 45 anni",
    scenario: "Alessandro lavora a partita IVA e non ha coperture INAIL.",
    event: "Durante una partita di Padel del weekend, cade e riporta una 'Frattura Acetabolare Scomposta' (Livello 1).",
    impact: "Alessandro deve stare fermo 40 giorni. Non può andare in cantiere, ritarda le consegne e perde i compensi del mese.",
    benefit: "L'Allegato Lesioni scatta automaticamente. Con la sola diagnosi, Zurich gli eroga 2.500€ cash. Una somma che copre esattamente l'affitto dello studio e le bollette del mese di stop.",
    lesson: "L'infortunio sportivo è un rischio professionale per chi lavora in proprio.",
    tags: ["Lesioni", "Sport", "Professionista"]
  },
  {
    id: 3,
    title: "Continuità nel Business",
    protagonist: "Società 'Beta Arredamenti'",
    scenario: "Due soci al 50%. In caso di morte di uno, gli eredi entrano in società o vanno liquidati.",
    event: "Uno dei soci decede in un incidente stradale.",
    impact: "La vedova e i figli chiedono la liquidazione della quota (300.000€) per non entrare nella gestione operativa. La società non ha quella liquidità in cassa.",
    benefit: "I soci avevano stipulato una Smart Protection incrociata. Il socio superstite riceve il capitale e liquida gli eredi immediatamente, mantenendo il 100% del controllo senza debiti bancari.",
    lesson: "La protezione è uno strumento di governance aziendale.",
    tags: ["TCM", "Azienda", "Soci"]
  },
  {
    id: 4,
    title: "L'incidente domestico 'invisibile'",
    protagonist: "Elena, Insegnante 52 anni",
    scenario: "Elena pensa che le polizze infortuni siano solo per chi fa sport estremi.",
    event: "Cade dalle scale di casa mentre sistema degli scatoloni. Riporta una 'Frattura Scomposta del Massiccio Facciale' (Livello 1).",
    impact: "Intervento chirurgico e lunga riabilitazione estetica.",
    benefit: "Elena riceve 2.500€ di indennizzo lesioni. Usa questa somma per coprire le spese dei trattamenti estetici d'eccellenza non coperti dal SSN.",
    lesson: "La casa è il luogo dove avvengono più infortuni. La protezione serve ovunque.",
    tags: ["Lesioni", "Domestico", "Spese Mediche"]
  },
  {
    id: 5,
    title: "Bloccare la salute a 30 anni",
    protagonist: "Davide, Consulente 29 anni",
    scenario: "Davide è sano e sportivo, pensa di avere tempo.",
    event: "Decide di sottoscrivere Smart Protection per 100.000€ a un premio irrisorio (15€/mese).",
    impact: "Due anni dopo gli viene diagnosticata una patologia cronica non invalidante ma che lo renderebbe 'non assicurabile'.",
    benefit: "La sua polizza è già attiva e il premio è bloccato. Zurich continuerà a proteggerlo per i prossimi 20 anni alle stesse condizioni di quando era perfettamente sano.",
    lesson: "L'assicurabilità è un bene deperibile. Va comprata quando si è sani.",
    tags: ["TCM", "Giovani", "Prevenzione"]
  },
  {
    id: 6,
    title: "Il 'Key Man' Artigiano",
    protagonist: "Roberto, Falegname 48 anni",
    scenario: "Roberto è l'unico che sa far funzionare i macchinari complessi della sua piccola falegnameria con 3 operai.",
    event: "Durante una gita in montagna inciampa e riporta una 'Frattura di Tibia e Perone Scomposta' (Livello 1).",
    impact: "Tre mesi di stop forzato. Gli operai possono fare solo piccoli lavori di montaggio, il fatturato crolla del 70% mentre l'affitto del capannone e i contributi restano invariati.",
    benefit: "L'indennizzo di 2.500€ scatta subito. Non salva l'anno, ma permette a Roberto di pagare il commercialista e le bollette energetiche senza intaccare il conto famiglia.",
    lesson: "In una piccola impresa, se si ferma l'uomo chiave, si ferma la cassa. L'indennizzo è ossigeno puro.",
    tags: ["Lesioni", "Artigiano", "Lavoro"]
  },
  {
    id: 7,
    title: "Sciatori e Fratture",
    protagonist: "Luca, Studente 22 anni",
    scenario: "Luca ama lo sci ma lo pratica solo una settimana all'anno.",
    event: "Una brutta caduta in pista causa la 'Frattura della Rotula con intervento chirurgico' (Livello 1).",
    impact: "Luca deve fare riabilitazione intensiva per non perdere l'anno di università. Le sedute fisioterapiche private costano 80€ l'una.",
    benefit: "L'indennizzo lesioni di 2.500€ copre interamente un ciclo completo di fisioterapia privata d'eccellenza, permettendogli di tornare a camminare e studiare in tempi record.",
    lesson: "Anche un infortunio 'leggero' può costare caro in termini di cure. Zurich trasforma la sfortuna in risorse.",
    tags: ["Lesioni", "Sport", "Giovani"]
  },
  {
    id: 8,
    title: "Pianificazione per i Nipoti",
    protagonist: "Nonno Giorgio, 68 anni",
    scenario: "Giorgio ha un patrimonio immobiliare ma poca liquidità sui conti correnti.",
    event: "Sottoscrive una Smart Protection da 150.000€ nominando beneficiari i suoi due nipoti, fuori dalla quota di legittima dei figli.",
    impact: "Al momento del decesso, i figli di Giorgio scoprono che le tasse di successione sugli immobili sono molto alte (circa 40.000€).",
    benefit: "I nipoti ricevono i 150.000€ esentasse e subito. Con parte di questa liquidità aiutano i genitori a pagare le tasse di successione degli immobili, evitando che la casa di famiglia debba essere svenduta.",
    lesson: "La TCM senior non è solo protezione, è un'arma tattica per la pianificazione del patrimonio.",
    tags: ["TCM", "Senior", "Successione"]
  },
  {
    id: 9,
    title: "L'infortunio in vacanza",
    protagonist: "Sara, 41 anni, Impiegata",
    scenario: "Sara si considera 'molto attenta' e non pratica sport pericolosi.",
    event: "In vacanza alle Baleari, scivola sul bordo piscina bagnato. Risultato: 'Frattura del Calcagno' (Livello 2).",
    impact: "Gesso, sedia a rotelle per settimane, impossibilità di guidare l'auto per andare a lavoro (che è a 30km da casa).",
    benefit: "L'indennizzo di 7.500€ arriva poco dopo il rientro. Sara usa la somma per pagare un servizio di trasporto privato casa-ufficio e un aiuto domestico per i mesi di convalescenza.",
    lesson: "Il valore della polizza non è solo il denaro, è la possibilità di mantenere la propria dignità e indipendenza.",
    tags: ["Lesioni", "Vacanza", "Domestico"]
  },
  {
    id: 10,
    title: "Protezione della 'Sandwich Generation'",
    protagonist: "Paola, 54 anni",
    scenario: "Paola si prende cura della madre anziana non autosufficiente e dei figli universitari fuori sede.",
    event: "Paola decede a causa di una complicazione post-operatoria imprevista.",
    impact: "I figli rischiano di dover tornare a casa interrompendo gli studi e la nonna non ha più chi la assiste quotidianamente.",
    benefit: "Il capitale Zurich (250.000€) permette ai figli di terminare l'università e di pagare una badante convivente d'alto livello per la nonna, garantendo che l'equilibrio familiare non collassi.",
    lesson: "Quando una donna 'pivot' viene a mancare, serve un enorme polmone finanziario per sostituire il suo lavoro invisibile.",
    tags: ["TCM", "Donne", "Famiglia"]
  }
];
