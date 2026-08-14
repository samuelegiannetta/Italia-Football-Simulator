/**
* GIOCATORE.JS - Carriera Giocatore
*/

const LEGHE_ITALIANE = {
    "Serie A": { livello: 1, tipo: "professionistico" },
    "Serie B": { livello: 2, tipo: "professionistico" },
    "Serie C - Girone A": { livello: 3, tipo: "professionistico" },
    "Serie C - Girone B": { livello: 3, tipo: "professionistico" },
    "Serie C - Girone C": { livello: 3, tipo: "professionistico" },
    "Serie D - Girone A": { livello: 4, tipo: "dilettanti" },
    "Serie D - Girone B": { livello: 4, tipo: "dilettanti" },
    "Serie D - Girone C": { livello: 4, tipo: "dilettanti" },
    "Serie D - Girone D": { livello: 4, tipo: "dilettanti" },
    "Serie D - Girone E": { livello: 4, tipo: "dilettanti" },
    "Serie D - Girone F": { livello: 4, tipo: "dilettanti" },
    "Serie D - Girone G": { livello: 4, tipo: "dilettanti" },
    "Serie D - Girone H": { livello: 4, tipo: "dilettanti" },
    "Serie D - Girone I": { livello: 4, tipo: "dilettanti" },
};

const GiocatoreMode = {
    profile: null,
    giornata: 1,
    maxGiornate: 6,
    stats: { presenze: 0, gol: 0, assist: 0, parate: 0, porteInviolate: 0, voti: [], valore: 5000 },
    
    attributi: {},
    puntiAbilita: 0,
    resetDisponibili: 3,

    legheData: {},
    legaVisualizzataClassificaModal: "serie_a",
    legaVisualizzataCalendario: "",

    datiSquadreInterni: {
        "serie_a": [
            "Atalanta", "Bologna", "Cagliari", "Como", "Empoli",
            "Fiorentina", "Genoa", "Inter", "Juventus", "Lazio",
            "Lecce", "Milan", "Monza", "Napoli", "Parma",
            "Roma", "Torino", "Udinese", "Venezia", "Verona"
        ],
        "serie_b": [
            "Bari", "Brescia", "Carrarese", "Catanzaro", "Cesena",
            "Cittadella", "Cosenza", "Cremonese", "Frosinone", "Juve Stabia",
            "Mantova", "Modena", "Palermo", "Pisa", "Reggiana",
            "Salernitana", "Sampdoria", "Sassuolo", "Spezia", "Südtirol"
        ],
        "serie_c_a": [
            "AlbinoLeffe", "Alcione Milano", "Arzignano Valchiampo", "Atalanta U23", "Clodiense",
            "Feralpisalò", "Giana Erminio", "L.R. Vicenza", "Lumezzane", "Novara",
            "Padova", "Pergolettese", "Pro Patria", "Pro Vercelli", "Renate",
            "Trento", "Triestina", "Virtus Verona", "Lecco", "Caldiero Terme"
        ],
        "serie_c_b": [
            "Arezzo", "Ascoli", "Campobasso", "Carpi", "Entella",
            "Gubbio", "Lucchese", "Milan Futuro", "Perugia", "Pescara",
            "Pianese", "Pineto", "Pontedera", "Rimini", "Sestri Levante",
            "SPAL", "Ternana", "Torres", "Vis Pesaro", "Legnago Salus"
        ],
        "serie_c_c": [
            "Audace Cerignola", "Avellino", "Benevento", "Casertana", "Catania",
            "Cavese", "Crotone", "Foggia", "Giugliano", "Juventus Next Gen",
            "Latina", "Messina", "Monopoli", "Picerno", "Potenza",
            "Sorrento", "Taranto", "Team Altamura", "Trapani", "Turris"
        ],
        "serie_d_a": [
            "Albenga", "Asti", "Borgaro Nobis", "Bra", "Cairese", "Chieri", "Chisola",
            "Città di Varese", "Derthona", "Fossano", "Gozzano", "Imperia", "Lavagnese",
            "Ligorna", "NovaRomentin", "Oltrepò", "Saluzzo", "Sanremese", "Vado", "Vogherese"
        ],
        "serie_d_b": [
            "Arconatese", "Breno", "Casatese Merate", "Castellanzese", "Chievo Verona",
            "Ciliverghe", "Club Milano", "Crema", "Desenzano", "Fanfulla", "Folgore Caratese",
            "Magenta", "Nuova Sondrio", "Ospitaletto", "Pro Palazzolo", "Pro Sesto",
            "San Giuliano City", "Sant'Angelo", "Varesina", "Vigasio"
        ],
        "serie_d_c": [
            "Adriese", "Bassano Virtus", "Brian Lignano", "Brusaporto", "Calvi Noale",
            "Campodarsego", "Caravaggio", "Chions", "Cjarlins Muzane", "Dolomiti Bellunesi",
            "Este", "Lavis", "Luparense", "Mestre", "Montecchio Maggiore", "Portogruaro",
            "Real Calepina", "Treviso", "Villa Valle", "Virtus CiseranoBergamo"
        ],
        "serie_d_d": [
            "Cittadella Vis Modena", "Corticella", "Fiorenzuola", "Forlì", "Imolese",
            "Lentigione", "Piacenza", "Pistoiese", "Prato", "Progresso", "Ravenna",
            "Sammaurese", "Sasso Marconi", "Tuttocuoio", "United Riccione", "Zenith Prato", "Correggese", "Forlimpopoli", "Mezzolara", "Sammaurese B"
        ],
        "serie_d_e": [
            "Aquila Montevarchi", "Fezzanese", "Flaminia Civitacastellana", "Follonica Gavorrano",
            "Ghiviborgo", "Figline", "Grosseto", "Livorno", "Orvietana", "Ostiamare",
            "Poggibonsi", "San Donato Tavarnelle", "Sangiovannese", "Seravezza Pozzi",
            "Siena", "Sporting Trestina", "Terranuova Traiana", "Trestina", "Massese", "Real Forte Querceta"
        ],
        "serie_d_f": [
            "Ancona", "Atletico Ascoli", "Avezzano", "Castelfidardo", "Chieti", "Città di Teramo",
            "Fermana", "Fossombrone", "Isernia", "L'Aquila", "Maceratese", "Notaresco",
            "Recanatese", "Roma City", "Sambenedettese", "Sora", "Termoli", "Vigor Senigallia", "Tolentino", "Jesina"
        ],
        "serie_d_g": [
            "Anzio", "Ardea", "Atletico Lodigiani", "Cassino", "Cynthialbalonga", "Gelbison",
            "Guidonia Montecelio", "Ilvamaddalena", "Latte Dolce", "Lupa Frascati",
            "Olbia", "Paganese", "Real Monterotondo", "Sarnese", "Savoia", "Terracina", "Trastevere", "Ugento", "Ostia", "Nocera"
        ],
        "serie_d_h": [
            "Acerrana", "Brindisi", "Casarano", "Costa d'Amalfi", "Fasano", "Fidelis Andria",
            "Francavilla", "Gravina", "Ischia", "Manfredonia", "Martina", "Matera",
            "Nardò", "Nocerina", "Palmese", "Real Acerrana", "Virtus Francavilla", "Barletta", "Bisceglie", "Bitonto"
        ],
        "serie_d_i": [
            "Acireale", "Akragas", "CastrumFavara", "Città di Sant'Agata", "Enna", "Licata",
            "Locri", "Nissa", "Nuova Igea Virtus", "Paternò", "Pompei", "Ragusa",
            "Reggina", "Sambiase", "Sancataldese", "Scafatese", "Siracusa", "Vibonese", "Giarre", "Igea"
        ]
    },

    async init(profileData) {
        let etaValida = this.richiediEtaValida(profileData ? profileData.eta : null);
       
        this.profile = profileData || {};
        this.profile.eta = etaValida;
        this.giornata = 1;
        this.stats = { presenze: 0, gol: 0, assist: 0, parate: 0, porteInviolate: 0, voti: [], valore: 5000 };
        this.puntiAbilita = 0;
        this.resetDisponibili = 3;

        this.setupAttributiRuolo();
        this.applicaModificatoriEta();
        this.aggiornaValoreMercato();
        this.inizializzaTutteLeLeghe();

        this.renderHeader();
        this.renderAttributi();
        this.updateStatsUI();
        this.renderClassifica();
        this.renderCalendario();
        this.configuraPulsantiSimulazioneAffiancati();
        this.renderPulsanteGestioneAbilita();

        const logEl = document.getElementById('ply-match-log');
        if (logEl) logEl.innerHTML = 'Premi "Gioca Partita" o "Simula Stagione" per iniziare...';
       
        this.abilitaPulsantiSimulazione();
    },

    richiediEtaValida(etaIniziale) {
        const ETA_MIN = 16;
        const ETA_MAX = 40;
        let etaInput = etaIniziale;

        while (true) {
            let etaNum = parseInt(etaInput, 10);
            if (!isNaN(etaNum) && etaNum >= ETA_MIN && etaNum <= ETA_MAX) {
                return etaNum;
            }

            let erroreMsg = "";
            if (isNaN(etaNum)) {
                erroreMsg = "Inserisci un numero valido per l'età.";
            } else if (etaNum < ETA_MIN) {
                erroreMsg = `L'età inserita (${etaNum} anni) è troppo bassa! Deve avere almeno ${ETA_MIN} anni.`;
            } else if (etaNum > ETA_MAX) {
                erroreMsg = `L'età inserita (${etaNum} anni) è troppo alta! Può avere al massimo ${ETA_MAX} anni.`;
            }

            etaInput = prompt(`${erroreMsg}\n\nInserisci un'età compresa tra ${ETA_MIN} e ${ETA_MAX} anni:`);
        }
    },

    isPortiere() {
        return (this.profile.ruolo || "").toUpperCase() === "POR";
    },

    setupAttributiRuolo() {
        if (this.isPortiere()) {
            this.attributi = { tuffo: 55, presa: 55, rinvio: 50, riflessi: 58, posizionamento: 55 };
        } else {
            this.attributi = { ritmo: 60, tiro: 60, passaggio: 60, dribbling: 60, difesa: 50, fisico: 50 };
        }
    },

    calcolaOverall() {
        const valori = Object.values(this.attributi);
        if (valori.length === 0) return 50;
        const somma = valori.reduce((acc, val) => acc + val, 0);
        return Math.round(somma / valori.length);
    },

    aggiornaValoreMercato() {
        let ovr = this.calcolaOverall();
        let eta = this.profile.eta;
        
        let fattoreEta = 1.0;
        if (eta <= 21) fattoreEta = 1.4;
        else if (eta <= 27) fattoreEta = 1.2;
        else if (eta >= 33) fattoreEta = 0.6;

        let valoreBase = Math.pow(ovr, 3.2) * 2;
        this.stats.valore = Math.round(valoreBase * fattoreEta);
    },

    applicaModificatoriEta() {
        const eta = this.profile.eta;
        let modBase = 0;
        let modFisico = 0;
        let modTecnica = 0;

        if (eta <= 21) {
            const gap = 22 - eta;
            modBase = gap * 1;
            modFisico = -gap * 2;
            if (!this.isPortiere() && this.attributi.difesa !== undefined) {
                this.attributi.difesa = Math.max(10, this.attributi.difesa - (gap * 2));
            }
        } else if (eta >= 22 && eta <= 29) {
            modBase = 3;
            modFisico = 3;
            modTecnica = 2;
        } else {
            const anniOltre29 = eta - 29;
            modBase = -anniOltre29 * 2;
            modFisico = -Math.floor(anniOltre29 * 1.5);
            modTecnica = Math.min(10, anniOltre29 * 1);
            if (!this.isPortiere() && this.attributi.difesa !== undefined) {
                this.attributi.difesa = Math.min(99, this.attributi.difesa + Math.floor(anniOltre29 * 0.8));
            }
        }

        for (let chiave in this.attributi) {
            if (chiave === 'ritmo' || chiave === 'tuffo' || chiave === 'riflessi') {
                this.attributi[chiave] = this.clamp(this.attributi[chiave] + modBase, 10, 99);
            } else if (chiave === 'fisico' || chiave === 'presa') {
                this.attributi[chiave] = this.clamp(this.attributi[chiave] + modFisico, 10, 99);
            } else {
                this.attributi[chiave] = this.clamp(this.attributi[chiave] + modTecnica, 10, 99);
            }
        }
    },

    clamp(valore, min, max) {
        return Math.min(Math.max(valore, min), max);
    },

    normalizzaNomeLega(nomeLega) {
        let l = (nomeLega || "").toLowerCase();
        if (l.includes("serie a")) return "serie_a";
        if (l.includes("serie b")) return "serie_b";
        
        if (l.includes("serie c")) {
            if (l.includes("girone a") || l.includes(" - a")) return "serie_c_a";
            if (l.includes("girone b") || l.includes(" - b")) return "serie_c_b";
            if (l.includes("girone c") || l.includes(" - c")) return "serie_c_c";
            return "serie_c_a";
        }
        
        if (l.includes("serie d")) {
            if (l.includes("girone a")) return "serie_d_a";
            if (l.includes("girone b")) return "serie_d_b";
            if (l.includes("girone c")) return "serie_d_c";
            if (l.includes("girone d")) return "serie_d_d";
            if (l.includes("girone e")) return "serie_d_e";
            if (l.includes("girone f")) return "serie_d_f";
            if (l.includes("girone g")) return "serie_d_g";
            if (l.includes("girone h")) return "serie_d_h";
            if (l.includes("girone i")) return "serie_d_i";
            return "serie_d_a";
        }

        if (l.includes("eccellenza")) return "eccellenza";
        if (l.includes("promozione")) return "promozione";
        if (l.includes("prima categoria")) return "prima_categoria";
        if (l.includes("seconda categoria")) return "seconda_categoria";
        if (l.includes("terza categoria")) return "terza_categoria";
        return "serie_a";
    },

    inizializzaTutteLeLeghe() {
        this._listeSquadreAttuali = {};
        for (let k in this.datiSquadreInterni) {
            this._listeSquadreAttuali[k] = [...this.datiSquadreInterni[k]];
        }

        this.legheData = {};
        const squadraUtente = this.profile.squadra || "Mia Squadra";
        const chiaveLegaUtente = this.normalizzaNomeLega(this.profile.lega);

        this.legaVisualizzataClassificaModal = chiaveLegaUtente;
        this.legaVisualizzataCalendario = chiaveLegaUtente;

        for (let [chiave, listaSquadreBase] of Object.entries(this._listeSquadreAttuali)) {
            let pool = [...listaSquadreBase];

            if (chiave === chiaveLegaUtente) {
                if (!pool.some(s => s.toLowerCase() === squadraUtente.toLowerCase())) {
                    pool.pop();
                    pool.push(squadraUtente);
                }
            }

            let classifica = pool.map(nome => ({
                nome: nome,
                punti: 0,
                partite: 0,
                vittorie: 0,
                pareggi: 0,
                sconfitte: 0,
                isUser: (chiave === chiaveLegaUtente && nome.toLowerCase() === squadraUtente.toLowerCase())
            }));

            let calendario = [];
            let n = pool.length;
            let squadreCopia = [...pool];
            if (n % 2 !== 0) {
                squadreCopia.push("Riposo");
                n++;
            }

            let coppiePerTurnoAndata = [];
            let fisso = squadreCopia[0];
            let rotanti = squadreCopia.slice(1);
            let turniAndata = n - 1;

            for (let turno = 0; turno < turniAndata; turno++) {
                let matchDelTurno = [];
                let teamCasa = fisso;
                let teamTrasferta = rotanti[turno % rotanti.length];
               
                if (teamCasa !== "Riposo" && teamTrasferta !== "Riposo") {
                    matchDelTurno.push({ casa: teamCasa, trasferta: teamTrasferta });
                }

                for (let i = 1; i < n / 2; i++) {
                    let c = rotanti[(turno + i) % rotanti.length];
                    let t = rotanti[(turno + rotanti.length - i) % rotanti.length];
                    if (c !== "Riposo" && t !== "Riposo") {
                        matchDelTurno.push({ casa: c, trasferta: t });
                    }
                }
                coppiePerTurnoAndata.push(matchDelTurno);
            }

            let gIndex = 1;
            coppiePerTurnoAndata.forEach(turno => {
                turno.forEach(m => {
                    calendario.push({
                        giornata: gIndex,
                        casa: m.casa,
                        trasferta: m.trasferta,
                        risultato: null,
                        completata: false
                    });
                });
                gIndex++;
            });

            coppiePerTurnoAndata.forEach(turno => {
                turno.forEach(m => {
                    calendario.push({
                        giornata: gIndex,
                        casa: m.trasferta,
                        trasferta: m.casa,
                        risultato: null,
                        completata: false
                    });
                });
                gIndex++;
            });

            let maxG = Math.max(...calendario.map(c => c.giornata));
            if (chiave === chiaveLegaUtente) {
                this.maxGiornate = maxG;
            }

            this.legheData[chiave] = {
                classifica: classifica,
                calendario: calendario,
                maxGiornate: maxG
            };
        }
    },

    configuraPulsantiSimulazioneAffiancati() {
        const btnSim = document.getElementById('ply-sim-btn');
        if (!btnSim) return;

        btnSim.innerText = "Gioca Partita";
        btnSim.className = 'py-2 px-3 sm:px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-[11px] sm:text-xs uppercase shadow-lg transition-all whitespace-nowrap';
        btnSim.onclick = () => GiocatoreMode.simulaPartita();

        let parent = btnSim.parentNode;
        
        if (!parent || parent.id !== 'ply-buttons-container') {
            let wrapper = document.getElementById('ply-buttons-container');
            if (!wrapper) {
                wrapper = document.createElement('div');
                wrapper.id = 'ply-buttons-container';
                wrapper.className = 'flex items-center gap-2 flex-shrink-0';
                if (btnSim.parentNode) {
                    btnSim.parentNode.insertBefore(wrapper, btnSim);
                }
            }
            wrapper.appendChild(btnSim);
            parent = wrapper;
        } else {
            parent.className = 'flex items-center gap-2 flex-shrink-0';
        }

        let btnAll = document.getElementById('ply-sim-all-btn');
        if (!btnAll) {
            btnAll = document.createElement('button');
            btnAll.id = 'ply-sim-all-btn';
            parent.appendChild(btnAll);
        }
        btnAll.onclick = () => GiocatoreMode.simulaTuttaStagione();
        btnAll.style.display = 'inline-block';
        btnAll.innerText = "Simula Stagione";
        btnAll.className = 'py-2 px-3 sm:px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-[11px] sm:text-xs uppercase shadow-lg transition-all whitespace-nowrap';
    },

    simulaPartita() {
        if (this.giornata > this.maxGiornate) {
            this.gestisciFineStagione();
            return;
        }

        const chiaveLegaUtente = this.normalizzaNomeLega(this.profile.lega);
        let legaUtenteObj = this.legheData[chiaveLegaUtente];

        let golfatti = 0;
        let assistfatti = 0;
        let parateFatte = 0;
        let portaInviolataMatch = 0;
        let golSubitiPortiere = 0;

        let infortunato = Math.random() < 0.05;

        if (!infortunato) {
            if (this.isPortiere()) {
                let coefficienteParate = ((this.attributi.riflessi + this.attributi.presa + this.attributi.tuffo + this.attributi.posizionamento) / 400);
                golSubitiPortiere = Math.random() < (1 - coefficienteParate * 0.7) ? Math.floor(Math.random() * 3) : 0;
                parateFatte = Math.floor(Math.random() * 6) + (golSubitiPortiere > 0 ? 1 : 3);
                if (golSubitiPortiere === 0) {
                    portaInviolataMatch = 1;
                }
            } else {
                let coeffTiro = this.attributi.tiro / 100;
                let coeffPassaggio = this.attributi.passaggio / 100;
                let coeffRitmo = this.attributi.ritmo / 100;

                golfatti = Math.random() < (coeffTiro * 0.45 * (coeffRitmo > 0.5 ? 1.1 : 0.9)) ? 1 : 0;
                assistfatti = Math.random() < (coeffPassaggio * 0.35) ? 1 : 0;
            }

            this.stats.presenze++;
            this.stats.gol += golfatti;
            this.stats.assist += assistfatti;
            this.stats.parate += parateFatte;
            this.stats.porteInviolate += portaInviolataMatch;
        }

        let votoBase = infortunato ? 5.0 : (this.isPortiere() 
            ? (6.5 - (golSubitiPortiere * 0.8) + ((this.attributi.riflessi / 100) * 1.5) + ((Math.random() * 1.0) - 0.5))
            : (6.0 + (golfatti * 1.5) + (assistfatti * 0.8) + ((this.attributi.ritmo / 100) * 0.5) + ((Math.random() * 1.2) - 0.6)));
        
        let voto = Math.min(10, Math.max(4, Math.round(votoBase * 10) / 10));

        if (!infortunato) {
            this.stats.voti.push(voto);
        }
        
        this.aggiornaValoreMercato();

        const matchUtente = legaUtenteObj.calendario.find(c => c.giornata === this.giornata && (c.casa.toLowerCase() === this.profile.squadra.toLowerCase() || c.trasferta.toLowerCase() === this.profile.squadra.toLowerCase()));
       
        let golSquadra = 0;
        let golAvversario = 0;
        let nomeAvversario = "Avversario";

        if (matchUtente) {
            let eInCasa = matchUtente.casa.toLowerCase() === this.profile.squadra.toLowerCase();
            
            if (this.isPortiere()) {
                golAvversario = golSubitiPortiere;
                golSquadra = Math.floor(Math.random() * 3);
            } else {
                golSquadra = golfatti + (Math.random() < (this.attributi.dribbling / 200) ? 1 : 0) + (Math.random() < 0.4 ? 1 : 0);
                golAvversario = Math.floor(Math.random() * 3);
            }

            matchUtente.risultato = `${golSquadra} - ${golAvversario}`;
            matchUtente.completata = true;

            nomeAvversario = eInCasa ? matchUtente.trasferta : matchUtente.casa;
            this.aggiornaClassificaLega(chiaveLegaUtente, matchUtente.casa, matchUtente.trasferta, golSquadra, golAvversario);
        }

        for (let [chiaveLega, datiLega] of Object.entries(this.legheData)) {
            let matchesGiornata = datiLega.calendario.filter(c => c.giornata === this.giornata && !c.completata);
            matchesGiornata.forEach(m => {
                let gA = Math.floor(Math.random() * 3);
                let gB = Math.floor(Math.random() * 3);
                m.risultato = `${gA} - ${gB}`;
                m.completata = true;
                this.aggiornaClassificaLega(chiaveLega, m.casa, m.trasferta, gA, gB);
            });
        }

        this.updateStatsUI();
        this.renderMatchLog(golfatti, assistfatti, parateFatte, portaInviolataMatch, voto, nomeAvversario, golSquadra, golAvversario, infortunato);
        this.renderClassifica();
        this.renderCalendario();

        this.giornata++;
        const gElem = document.getElementById('ply-giornata');
        if (gElem) {
            gElem.innerText = this.giornata <= this.maxGiornate ? this.giornata : "FINE";
        }

        if (this.giornata > this.maxGiornate) {
            const btnSim = document.getElementById('ply-sim-btn');
            if (btnSim) {
                btnSim.innerText = "Passa alla Prossima Stagione";
                btnSim.className = 'py-2 px-3 sm:px-4 bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-xl text-[11px] sm:text-xs uppercase shadow-lg transition-all whitespace-nowrap animate-pulse';
            }
            const btnAll = document.getElementById('ply-sim-all-btn');
            if (btnAll) {
                btnAll.style.display = 'none';
            }
        }
    },

    simulaTuttaStagione() {
        while (this.giornata <= this.maxGiornate) {
            this.simulaPartita();
        }
    },

    disabilitaPulsantiSimulazione() {
        const btn = document.getElementById('ply-sim-btn');
        if (btn) {
            btn.disabled = true;
            btn.classList.add('opacity-50', 'cursor-not-allowed');
        }
        const btnAll = document.getElementById('ply-sim-all-btn');
        if (btnAll) {
            btnAll.disabled = true;
            btnAll.classList.add('opacity-50', 'cursor-not-allowed');
        }
    },

    abilitaPulsantiSimulazione() {
        const btn = document.getElementById('ply-sim-btn');
        if (btn) {
            btn.disabled = false;
            btn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
        const btnAll = document.getElementById('ply-sim-all-btn');
        if (btnAll) {
            btnAll.disabled = false;
            btnAll.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    },

    aggiornaClassificaLega(chiaveLega, teamA, teamB, golA, golB) {
        let legaObj = this.legheData[chiaveLega];
        if (!legaObj) return;

        const sqA = legaObj.classifica.find(s => s.nome.toLowerCase() === teamA.toLowerCase());
        const sqB = legaObj.classifica.find(s => s.nome.toLowerCase() === teamB.toLowerCase());
        if (!sqA || !sqB) return;

        sqA.partite++;
        sqB.partite++;

        if (golA > golB) {
            sqA.punti += 3;
            sqA.vittorie++;
            sqB.sconfitte++;
        } else if (golA < golB) {
            sqB.punti += 3;
            sqB.vittorie++;
            sqA.sconfitte++;
        } else {
            sqA.punti += 1;
            sqB.punti += 1;
            sqA.pareggi++;
            sqB.pareggi++;
        }
       
        legaObj.classifica.sort((a, b) => b.punti - a.punti || (b.vittorie - a.vittorie));
    },

    gestisciFineStagione() {
        const chiaveLega = this.normalizzaNomeLega(this.profile.lega);
        const legaData = this.legheData[chiaveLega];
        if (!legaData || !legaData.classifica) return;

        const classifica = [...legaData.classifica].sort((a, b) => b.punti - a.punti || b.vittorie - a.vittorie);
        const totaleSquadre = classifica.length;
        const squadraUtente = (this.profile.squadra || "").toLowerCase();
        
        const indexPos = classifica.findIndex(s => s.nome.toLowerCase() === squadraUtente);
        const posizione = indexPos !== -1 ? indexPos + 1 : totaleSquadre;

        let nomeCategoria = "Serie D";
        if (chiaveLega === "serie_a") nomeCategoria = "Serie A";
        else if (chiaveLega === "serie_b") nomeCategoria = "Serie B";
        else if (chiaveLega.startsWith("serie_c")) nomeCategoria = "Serie C";

        let verdettoCodice = "PERMANENZA";

        switch (nomeCategoria) {
            case "Serie A":
                if (posizione === 1) {
                    this.mostraMessaggioModal("Campioni d'Italia! Hai vinto lo Scudetto!");
                    verdettoCodice = "CAMPIONE";
                } else if (posizione >= totaleSquadre - 2) { 
                    this.mostraMessaggioModal("Stagione difficile: la tua squadra è retrocessa in Serie B.");
                    verdettoCodice = "RETROCESSIONE_DIRETTA";
                } else {
                    this.mostraMessaggioModal("Hai concluso il campionato salvandoti in Serie A.");
                }
                break;

            case "Serie B":
                if (posizione <= 2) { 
                    this.mostraMessaggioModal("Promozione Diretta! La tua squadra vola in Serie A!");
                    verdettoCodice = "PROMOZIONE_DIRETTA";
                } else if (posizione >= 3 && posizione <= 8) { 
                    let vintoPlayoff = Math.random() < 0.25; 
                    if (vintoPlayoff) {
                        this.mostraMessaggioModal("Vittoria ai Playoff di Serie B! Promozione conquistata!");
                        verdettoCodice = "PROMOZIONE_PLAYOFF";
                    } else {
                        this.mostraMessaggioModal("Eliminato ai Playoff di Serie B. Rimani in categoria.");
                        verdettoCodice = "ELIMINATO_PLAYOFF";
                    }
                } else if (posizione === totaleSquadre - 4 || posizione === totaleSquadre - 3) { 
                    let vintoPlayout = Math.random() < 0.5;
                    if (vintoPlayout) {
                        this.mostraMessaggioModal("Vittoria ai Play-out di Serie B! La squadra si salva.");
                        verdettoCodice = "SALVO_PLAYOUT";
                    } else {
                        this.mostraMessaggioModal("Sconfitta ai Play-out. La squadra retrocede in Serie C.");
                        verdettoCodice = "RETROCESSIONE_PLAYOUT";
                    }
                } else if (posizione >= totaleSquadre - 2) { 
                    this.mostraMessaggioModal("Ultimi posti in classifica. Retrocessione diretta in Serie C.");
                    verdettoCodice = "RETROCESSIONE_DIRETTA";
                } else {
                    this.mostraMessaggioModal("Stagione conclusa a metà classifica in Serie B.");
                }
                break;

            case "Serie C":
                if (posizione === 1) { 
                    this.mostraMessaggioModal("Primo posto! Promozione diretta in Serie B!");
                    verdettoCodice = "PROMOZIONE_DIRETTA";
                } else if (posizione >= 2 && posizione <= 10) { 
                    let vintoPlayoff = Math.random() < 0.15;
                    if (vintoPlayoff) {
                        this.mostraMessaggioModal("Che cavalcata! Hai vinto i Playoff di Serie C e vai in Serie B!");
                        verdettoCodice = "PROMOZIONE_PLAYOFF";
                    } else {
                        this.mostraMessaggioModal("Eliminato dalla fase Playoff di Serie C.");
                        verdettoCodice = "ELIMINATO_PLAYOFF";
                    }
                } else if (posizione >= totaleSquadre - 4 && posizione <= totaleSquadre - 1) { 
                    let vintoPlayout = Math.random() < 0.5;
                    if (vintoPlayout) {
                        this.mostraMessaggioModal("Salvezza ottenuta dopo la lotteria dei Play-out di Serie C!");
                        verdettoCodice = "SALVO_PLAYOUT";
                    } else {
                        this.mostraMessaggioModal("Sconfitta ai Play-out. Retrocessione nei dilettanti (Serie D).");
                        verdettoCodice = "RETROCESSIONE_PLAYOUT";
                    }
                } else if (posizione === totaleSquadre) { 
                    this.mostraMessaggioModal("Ultimo posto nel girone: retrocessione diretta in Serie D.");
                    verdettoCodice = "RETROCESSIONE_DIRETTA";
                } else {
                    this.mostraMessaggioModal("Campionato tranquillo senza lodi né infamia in Serie C.");
                }
                break;

            case "Serie D":
                if (posizione === 1) { 
                    this.mostraMessaggioModal("Primo posto nel girone di Serie D! Benvenuto tra i professionisti (Serie C)!");
                    verdettoCodice = "PROMOZIONE_DIRETTA";
                } else if (posizione >= 2 && posizione <= 5) { 
                    let vintoPlayoff = Math.random() < 0.2;
                    if (vintoPlayoff) {
                        this.mostraMessaggioModal("Vittoria nei Playoff di Serie D! Ripescaggio ottenuto in Serie C!");
                        verdettoCodice = "PROMOZIONE_PLAYOFF";
                    } else {
                        this.mostraMessaggioModal("Playoff disputati ma senza promozione.");
                        verdettoCodice = "ELIMINATO_PLAYOFF";
                    }
                } else if (posizione >= totaleSquadre - 5 && posizione <= totaleSquadre - 2) { 
                    let vintoPlayout = Math.random() < 0.5;
                    if (vintoPlayout) {
                        this.mostraMessaggioModal("Salvezza conquistata ai Play-out di Serie D!");
                        verdettoCodice = "SALVO_PLAYOUT";
                    } else {
                        this.mostraMessaggioModal("Sconfitta ai Play-out. Retrocessione in Eccellenza.");
                        verdettoCodice = "RETROCESSIONE_PLAYOUT";
                    }
                } else if (posizione >= totaleSquadre - 1) { 
                    this.mostraMessaggioModal("Ultimi posti nel girone: retrocessione diretta in Eccellenza.");
                    verdettoCodice = "RETROCESSIONE_DIRETTA";
                } else {
                    this.mostraMessaggioModal("Stagione regolare conclusa in Serie D.");
                }
                break;

            default:
                console.log("Campionato non riconosciuto.");
                break;
        }

        const verdettoObj = { verdettoUtente: verdettoCodice };
        this.aggiornaLegaSquadraInBaseAVerdetto(verdettoObj);
        
        const offerte = this.generaOfferteContratto(this.calcolaOverall());
        this.mostraModalOfferteContratto(offerte, verdettoObj);
    },

    mostraMessaggioModal(msg) {
        console.log("[FINE STAGIONE]: " + msg);
    },

    aggiornaLegaSquadraInBaseAVerdetto(verdetto) {
        if (!verdetto) return;

        let infoLegaAttuale = LEGHE_ITALIANE[this.profile.lega];
        let livelloAttuale = infoLegaAttuale ? infoLegaAttuale.livello : 1;

        let nuovoLivello = livelloAttuale;

        if (verdetto.verdettoUtente === "PROMOZIONE_DIRETTA" || verdetto.verdettoUtente === "PROMOZIONE_PLAYOFF") {
            nuovoLivello = Math.max(1, livelloAttuale - 1);
        } else if (verdetto.verdettoUtente === "RETROCESSIONE_DIRETTA" || verdetto.verdettoUtente === "RETROCESSIONE_PLAYOUT") {
            nuovoLivello = Math.min(9, livelloAttuale + 1);
        }

        if (nuovoLivello !== livelloAttuale) {
            let leghePossibili = Object.keys(LEGHE_ITALIANE).filter(l => LEGHE_ITALIANE[l].livello === nuovoLivello);
            if (leghePossibili.length > 0) {
                this.profile.lega = leghePossibili[Math.floor(Math.random() * leghePossibili.length)];
            }
        }
    },

    generaOfferteContratto(overall) {
        let legheArray = Object.keys(LEGHE_ITALIANE);
        let offerte = [];

        let livelloTarget = 4; 
        if (overall >= 82) livelloTarget = 1; 
        else if (overall >= 75) livelloTarget = 2; 
        else if (overall >= 68) livelloTarget = 3; 

        for (let i = 0; i < 3; i++) {
            let offset = i === 0 ? -1 : (i === 1 ? 0 : 1);
            let livelloProposto = Math.max(1, Math.min(9, livelloTarget + offset));

            let legheDelLivello = legheArray.filter(l => LEGHE_ITALIANE[l].livello === livelloProposto);
            let legaScelta = legheDelLivello[Math.floor(Math.random() * legheDelLivello.length)] || "Serie D - Girone A";

            let nomeSquadra = this.generaNomeSquadraCasuale(legaScelta);
            let stipendioOfferto = livelloProposto * 12000 + (overall * 1500);

            offerte.push({
                squadra: nomeSquadra,
                lega: legaScelta,
                stipendio: stipendioOfferto,
                prestigio: Math.max(1, 10 - livelloProposto)
            });
        }

        return offerte;
    },

    generaNomeSquadraCasuale(lega) {
        let citta = ["Pro", "Atletico", "Virtus", "Real", "F.C.", "U.S.", "Audax"];
        let nomi = ["Vigor", "Fulgor", "Juvenilia", "Etrusca", "Boreale", "Savoia", "Piceno", "Eagles"];
        return `${citta[Math.floor(Math.random() * citta.length)]} ${nomi[Math.floor(Math.random() * nomi.length)]}`;
    },

    mostraModalOfferteContratto(offerte, verdetto) {
        let modal = document.getElementById('modal-app');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modal-app';
            document.body.appendChild(modal);
        }
        modal.className = "fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4";

        let messaggioVerdetto = "";
        if (verdetto) {
            switch (verdetto.verdettoUtente) {
                case "CAMPIONE":
                    messaggioVerdetto = `<div class="p-3 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-xl font-bold text-center text-xs">🇮🇹 CAMPIONI D'ITALIA! Hai conquistato lo Scudetto!</div>`;
                    break;
                case "PROMOZIONE_DIRETTA":
                    messaggioVerdetto = `<div class="p-3 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-xl font-bold text-center text-xs">🎉 CAMPIONI! La tua squadra è stata PROMOSSA direttamente!</div>`;
                    break;
                case "PROMOZIONE_PLAYOFF":
                    messaggioVerdetto = `<div class="p-3 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-xl font-bold text-center text-xs">🏆 VITTORIA AI PLAYOFF! La tua squadra conquista la PROMOZIONE!</div>`;
                    break;
                case "ELIMINATO_PLAYOFF":
                    messaggioVerdetto = `<div class="p-3 bg-amber-500/20 border border-amber-500 text-amber-400 rounded-xl font-bold text-center text-xs">🛑 Sconfitta ai Playoff. La squadra resta in questa categoria.</div>`;
                    break;
                case "RETROCESSIONE_PLAYOUT":
                    messaggioVerdetto = `<div class="p-3 bg-rose-500/20 border border-rose-500 text-rose-400 rounded-xl font-bold text-center text-xs">⚠️ Sconfitta ai PLAYOUT: La tua squadra è RETROCESSA!</div>`;
                    break;
                case "RETROCESSIONE_DIRETTA":
                    messaggioVerdetto = `<div class="p-3 bg-rose-500/20 border border-rose-500 text-rose-400 rounded-xl font-bold text-center text-xs">🔻 Retrocesso: La tua squadra scende di categoria.</div>`;
                    break;
                case "SALVO_PLAYOUT":
                    messaggioVerdetto = `<div class="p-3 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-xl font-bold text-center text-xs">🛡️ VITTORIA AI PLAYOUT! La squadra si salva e rimane in categoria.</div>`;
                    break;
                default:
                    messaggioVerdetto = `<div class="p-3 bg-slate-800 text-slate-300 rounded-xl font-bold text-center text-xs">⚓ Campionato terminato a metà classifica. Nessun playoff o playout.</div>`;
            }
        }

        let htmlOfferte = "";
        offerte.forEach((off) => {
            htmlOfferte += `
                <div class="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3 hover:border-amber-500/50 transition-all">
                    <div>
                        <span class="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-md font-bold">${off.lega}</span>
                        <h3 class="text-white font-extrabold text-base mt-2">${off.squadra}</h3>
                    </div>
                    <div class="text-xs text-slate-400 space-y-1">
                        <p>Ingaggio stimato: <span class="text-white font-bold">€ ${off.stipendio.toLocaleString()} / anno</span></p>
                    </div>
                    <button onclick="GiocatoreMode.firmaContratto('${off.squadra}', '${off.lega}')" class="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs uppercase transition-colors">
                        Firma Contratto
                    </button>
                </div>
            `;
        });

        modal.innerHTML = `
            <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 space-y-4 shadow-2xl">
                <div class="border-b border-slate-800 pb-3 text-center">
                    <h2 class="text-lg font-extrabold text-amber-400 uppercase tracking-wider">Mercato Trasferimenti - Fine Stagione</h2>
                    <p class="text-xs text-slate-400 mt-1">Esamina l'esito della tua stagione e scegli il tuo futuro:</p>
                </div>

                ${messaggioVerdetto}

                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    ${htmlOfferte}
                </div>

                <div class="pt-2 border-t border-slate-800">
                    <button onclick="GiocatoreMode.rimaniNellaSquadra()" class="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-xs uppercase transition-colors shadow-lg">
                        Rimani nella squadra attuale (${this.profile.squadra})
                    </button>
                </div>
            </div>
        `;
    },

    firmaContratto(squadra, lega) {
        this.profile.squadra = squadra;
        this.profile.lega = lega;
        const chiaveNuovaLega = this.normalizzaNomeLega(lega);
        this.legaVisualizzataClassificaModal = chiaveNuovaLega;
        this.legaVisualizzataCalendario = chiaveNuovaLega;

        this.chiudiModal();
        this.passaAnnoSuccessivo();
    },

    rimaniNellaSquadra() {
        const chiaveNuovaLega = this.normalizzaNomeLega(this.profile.lega);
        this.legaVisualizzataClassificaModal = chiaveNuovaLega;
        this.legaVisualizzataCalendario = chiaveNuovaLega;

        this.chiudiModal();
        this.passaAnnoSuccessivo();
    },

    passaAnnoSuccessivo() {
        this.profile.eta++;

        let puntiGuadagnati = 5 + Math.floor(this.stats.gol * 1) + Math.floor(this.stats.assist * 0.3) + Math.floor(this.stats.parate * 0.2) + (this.stats.porteInviolate * 1.0);
        this.puntiAbilita += puntiGuadagnati;

        this.giornata = 1;
        this.stats.presenze = 0;
        this.stats.gol = 0;
        this.stats.assist = 0;
        this.stats.parate = 0;
        this.stats.porteInviolate = 0;
        this.stats.voti = [];

        this.applicaModificatoriEta();
        this.aggiornaValoreMercato();
        this.inizializzaTutteLeLeghe();
        
        this.renderHeader();
        this.renderAttributi();
        this.updateStatsUI();
        this.renderClassifica();
        this.renderCalendario();
        this.configuraPulsantiSimulazioneAffiancati();
        this.renderPulsanteGestioneAbilita();

        const logEl = document.getElementById('ply-match-log');
        if (logEl) {
            logEl.innerHTML = `
                <div class="bg-slate-950 p-4 rounded-xl border border-emerald-500/40 space-y-2 text-xs">
                    <div class="font-bold text-emerald-400 uppercase">Benvenuto nella nuova stagione! (+1 Anno, +${puntiGuadagnati} Punti Abilità)</div>
                    <div class="text-slate-300">La tua squadra ora gioca in: <span class="text-amber-400 font-bold">${this.profile.lega}</span> (${this.profile.squadra})</div>
                    <div>Clicca su <span class="text-amber-400 font-bold">"Gestisci Abilità"</span> per potenziare il tuo giocatore.</div>
                </div>
            `;
        }

        this.abilitaPulsantiSimulazione();
    },

    renderPulsanteGestioneAbilita() {
        let container = document.getElementById('ply-skill-panel');
        if (!container) {
            const parent = document.getElementById('ply-attributes')?.parentNode;
            if (parent) {
                container = document.createElement('div');
                container.id = 'ply-skill-panel';
                parent.appendChild(container);
            }
        }
        if (!container) return;

        container.innerHTML = `
            <div class="mt-4">
                <button onclick="GiocatoreMode.apriModalAbilita()" class="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs uppercase shadow-lg transition-all flex items-center justify-center gap-2">
                    ⚡ Gestisci Abilità e Punti (${this.puntiAbilita})
                </button>
            </div>
        `;
    },

    apriModalAbilita() {
        if (!this.attributiBaseOriginaliRun) {
            this.attributiBaseOriginaliRun = { ...this.attributi };
        }

        let puntiSpesiFinoAdOra = 0;
        for (let chiave in this.attributi) {
            let base = this.attributiBaseOriginaliRun[chiave] || this.attributi[chiave];
            if (this.attributi[chiave] > base) {
                puntiSpesiFinoAdOra += (this.attributi[chiave] - base);
            }
        }
        
        this.montePuntiTotaleRun = this.puntiAbilita + puntiSpesiFinoAdOra;

        this.tempPuntiAbilita = this.puntiAbilita;
        this.tempAttributi = { ...this.attributi };

        this.mostraRenderModalAbilita();
    },

    incrementaAttributoModal(attr) {
        if (this.tempPuntiAbilita > 0 && this.tempAttributi[attr] < 99) {
            this.tempAttributi[attr]++;
            this.tempPuntiAbilita--;
            this.mostraRenderModalAbilita();
        }
    },

    decrementaAttributoModal(attr) {
        if (this.tempAttributi[attr] > this.attributi[attr]) {
            this.tempAttributi[attr]--;
            this.tempPuntiAbilita++;
            this.mostraRenderModalAbilita();
        }
    },

    resettaAbilita() {
        if (this.resetDisponibili <= 0) {
            alert("Hai esaurito i reset disponibili per questa run!");
            return;
        }

        if (!confirm("Sei sicuro di voler azzerare e riassegnare tutti i punti spesi?")) return;

        this.tempAttributi = { ...this.attributiBaseOriginaliRun };
        this.tempPuntiAbilita = this.montePuntiTotaleRun;
        this.resetDisponibili--;

        this.mostraRenderModalAbilita();
    },

    confermaModificheAbilita() {
        this.puntiAbilita = this.tempPuntiAbilita;
        this.attributi = { ...this.tempAttributi };

        this.aggiornaValoreMercato();
        this.renderAttributi();
        this.updateStatsUI();
        this.renderPulsanteGestioneAbilita();
        this.chiudiModal();
    },

    mostraRenderModalAbilita() {
        let modal = document.getElementById('modal-app');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modal-app';
            document.body.appendChild(modal);
        }
        modal.className = "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4";

        let htmlAttr = "";
        for (let [attr, val] of Object.entries(this.tempAttributi)) {
            let puoScendere = val > this.attributi[attr];

            htmlAttr += `
                <div class="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
                    <span class="uppercase text-slate-300 font-semibold">${attr} (${val})</span>
                    <div class="flex items-center gap-1.5">
                        <button onclick="GiocatoreMode.decrementaAttributoModal('${attr}')" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-xs transition-colors ${!puoScendere ? 'opacity-40 cursor-not-allowed' : ''}">
                            -
                        </button>
                        <button onclick="GiocatoreMode.incrementaAttributoModal('${attr}')" class="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors">
                            +
                        </button>
                    </div>
                </div>
            `;
        }

        modal.innerHTML = `
            <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 space-y-4 shadow-2xl">
                <div class="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h2 class="text-base font-bold text-amber-400 uppercase tracking-wider">Gestione Abilità</h2>
                    <button onclick="GiocatoreMode.chiudiModal()" class="text-slate-400 hover:text-white text-lg font-bold px-2">✕</button>
                </div>
                
                <div class="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-amber-500/30 text-xs">
                    <span class="text-amber-400 font-bold uppercase">Punti Disponibili:</span>
                    <span class="text-white text-sm font-extrabold">${this.tempPuntiAbilita}</span>
                </div>

                <div class="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-1">
                    ${htmlAttr}
                </div>

                <div class="pt-2 border-t border-slate-800 flex justify-between items-center">
                    <button onclick="GiocatoreMode.resettaAbilita()" class="py-2 px-3 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 font-bold rounded-xl text-[11px] uppercase transition-colors">
                        🔄 Reset Punti (${this.resetDisponibili} rimasti)
                    </button>
                    <button onclick="GiocatoreMode.confermaModificheAbilita()" class="py-2 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase transition-colors">
                        Conferma
                    </button>
                </div>
            </div>
        `;
    },

    cambiaLegaClassificaModal(selettore) {
        this.legaVisualizzataClassificaModal = selettore.value;
        this.apriModalClassifica();
    },

    cambiaLegaCalendario(selettore) {
        this.legaVisualizzataCalendario = selettore.value;
        this.renderCalendario();
    },

    apriModalCalendario() {
        let modal = document.getElementById('modal-app');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modal-app';
            document.body.appendChild(modal);
        }
        modal.className = "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4";

        let legaCorrente = this.legaVisualizzataCalendario || this.normalizzaNomeLega(this.profile.lega);
        let datiLega = this.legheData[legaCorrente];

        let listaPartiteHtml = "";
        if (datiLega && datiLega.calendario) {
            datiLega.calendario.forEach(m => {
                let status = m.completata
                    ? `<span class="text-emerald-400 font-bold">${m.risultato}</span>`
                    : `<span class="text-slate-500 font-bold">vs</span>`;
                let highlight = m.giornata === this.giornata ? "border-amber-400/50 bg-amber-400/10" : "border-slate-800 bg-slate-950/60";

                listaPartiteHtml += `
                    <div class="flex justify-between items-center p-2 rounded-lg border ${highlight} text-xs">
                        <span class="text-slate-400 font-bold w-10">G${m.giornata}</span>
                        <div class="flex-1 text-center font-medium">
                            <span class="text-slate-200">${m.casa}</span>
                            <span class="mx-2">${status}</span>
                            <span class="text-slate-200">${m.trasferta}</span>
                        </div>
                    </div>
                `;
            });
        }

        modal.innerHTML = `
            <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 space-y-4 shadow-2xl">
                <div class="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h2 class="text-base font-bold text-amber-400 uppercase tracking-wider">Calendario Completo</h2>
                    <button onclick="GiocatoreMode.chiudiModal()" class="text-slate-400 hover:text-white text-lg font-bold px-2">✕</button>
                </div>
                <div class="max-h-80 overflow-y-auto space-y-2 pr-1">
                    ${listaPartiteHtml}
                </div>
                <button onclick="GiocatoreMode.chiudiModal()" class="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs uppercase transition-colors">
                    Chiudi
                </button>
            </div>
        `;
    },

    apriModalClassifica() {
        let modal = document.getElementById('modal-app');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modal-app';
            document.body.appendChild(modal);
        }
        modal.className = "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4";

        let legaCorrente = this.legaVisualizzataClassificaModal;
        let datiLega = this.legheData[legaCorrente];

        let rowsHtml = "";
        if (datiLega && datiLega.classifica) {
            datiLega.classifica.forEach((team, idx) => {
                let rowStyle = team.isUser ? "text-amber-400 font-bold bg-amber-400/10" : "text-slate-300";
                rowsHtml += `
                    <tr class="border-b border-slate-800/60 ${rowStyle}">
                        <td class="py-2.5 pl-2">${idx + 1}</td>
                        <td class="py-2.5 font-semibold">${team.nome}</td>
                        <td class="py-2.5 text-center">${team.partite}</td>
                        <td class="py-2.5 text-center text-emerald-400 font-bold">${team.vittorie}</td>
                        <td class="py-2.5 text-center text-amber-400 font-bold">${team.pareggi}</td>
                        <td class="py-2.5 text-center text-rose-400 font-bold">${team.sconfitte}</td>
                        <td class="py-2.5 text-center text-base font-bold text-emerald-400 pr-2">${team.punti}</td>
                    </tr>
                `;
            });
        }

        modal.innerHTML = `
            <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-5 space-y-4 shadow-2xl">
                <div class="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h2 class="text-base font-bold text-amber-400 uppercase tracking-wider">Classifica Dettagliata</h2>
                    <div class="flex items-center space-x-2">
                        <select onchange="GiocatoreMode.cambiaLegaClassificaModal(this)" class="bg-slate-950 border border-slate-800 text-amber-400 text-xs font-semibold rounded px-2 py-1 outline-none">
                            <option value="serie_a" ${legaCorrente === 'serie_a' ? 'selected' : ''}>Serie A</option>
                            <option value="serie_b" ${legaCorrente === 'serie_b' ? 'selected' : ''}>Serie B</option>
                            <option value="serie_c_a" ${legaCorrente === 'serie_c_a' ? 'selected' : ''}>Serie C (Girone A)</option>
                            <option value="serie_c_b" ${legaCorrente === 'serie_c_b' ? 'selected' : ''}>Serie C (Girone B)</option>
                            <option value="serie_c_c" ${legaCorrente === 'serie_c_c' ? 'selected' : ''}>Serie C (Girone C)</option>
                            <option value="serie_d_a" ${legaCorrente === 'serie_d_a' ? 'selected' : ''}>Serie D (Girone A)</option>
                            <option value="serie_d_b" ${legaCorrente === 'serie_d_b' ? 'selected' : ''}>Serie D (Girone B)</option>
                            <option value="serie_d_c" ${legaCorrente === 'serie_d_c' ? 'selected' : ''}>Serie D (Girone C)</option>
                            <option value="serie_d_d" ${legaCorrente === 'serie_d_d' ? 'selected' : ''}>Serie D (Girone D)</option>
                            <option value="serie_d_e" ${legaCorrente === 'serie_d_e' ? 'selected' : ''}>Serie D (Girone E)</option>
                            <option value="serie_d_f" ${legaCorrente === 'serie_d_f' ? 'selected' : ''}>Serie D (Girone F)</option>
                            <option value="serie_d_g" ${legaCorrente === 'serie_d_g' ? 'selected' : ''}>Serie D (Girone G)</option>
                            <option value="serie_d_h" ${legaCorrente === 'serie_d_h' ? 'selected' : ''}>Serie D (Girone H)</option>
                            <option value="serie_d_i" ${legaCorrente === 'serie_d_i' ? 'selected' : ''}>Serie D (Girone I)</option>
                            <option value="eccellenza" ${legaCorrente === 'eccellenza' ? 'selected' : ''}>Eccellenza</option>
                            <option value="promozione" ${legaCorrente === 'promozione' ? 'selected' : ''}>Promozione</option>
                            <option value="prima_categoria" ${legaCorrente === 'prima_categoria' ? 'selected' : ''}>Prima Categoria</option>
                            <option value="seconda_categoria" ${legaCorrente === 'seconda_categoria' ? 'selected' : ''}>Seconda Categoria</option>
                            <option value="terza_categoria" ${legaCorrente === 'terza_categoria' ? 'selected' : ''}>Terza Categoria</option>
                        </select>
                        <button onclick="GiocatoreMode.chiudiModal()" class="text-slate-400 hover:text-white text-lg font-bold px-2">✕</button>
                    </div>
                </div>
                <div class="max-h-80 overflow-y-auto">
                    <table class="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr class="text-slate-400 border-b border-slate-800 uppercase">
                                <th class="pb-2 pl-2">#</th>
                                <th class="pb-2">Squadra</th>
                                <th class="pb-2 text-center">P</th>
                                <th class="pb-2 text-center">V</th>
                                <th class="pb-2 text-center">N</th>
                                <th class="pb-2 text-center">S</th>
                                <th class="pb-2 text-center pr-2">PTS</th>
                            </tr>
                        </thead>
                        <tbody>${rowsHtml}</tbody>
                    </table>
                </div>
                <button onclick="GiocatoreMode.chiudiModal()" class="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs uppercase transition-colors">
                    Chiudi
                </button>
            </div>
        `;
    },

    chiudiModal() {
        const modal = document.getElementById('modal-app');
        if (modal) modal.remove();
    },

    renderHeader() {
        const setTxt = (id, val) => { 
            const el = document.getElementById(id); 
            if (el) el.innerText = val; 
        };

        let cognomePulito = (this.profile.cognome && this.profile.cognome !== "undefined") ? this.profile.cognome : "";
        let nomeCompleto = `${this.profile.nome || "Giocatore"} ${cognomePulito}`.trim();

        setTxt('ply-name', nomeCompleto);
        setTxt('ply-team', this.profile.squadra || "Svincolato");
        setTxt('ply-ruolo', `${this.profile.ruolo || "ATT"} (${this.profile.eta || 18} anni)`);
        setTxt('ply-league', this.profile.lega || "Campionato");
        setTxt('ply-giornata', this.giornata <= this.maxGiornate ? this.giornata : "FINE");
        setTxt('ply-tot-giornate', this.maxGiornate);
    },

    renderAttributi() {
        const container = document.getElementById('ply-attributes');
        if (!container) return;
        container.innerHTML = "";
        
        let overall = this.calcolaOverall();

        container.innerHTML = `
            <div class="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-amber-500/30 mb-3">
                <span class="text-xs font-bold text-slate-400 uppercase">Overall</span>
                <span class="text-amber-400 font-black text-base">${overall}</span>
            </div>
        `;

        for (let [attr, val] of Object.entries(this.attributi)) {
            container.innerHTML += `
                <div class="mb-1.5">
                    <div class="flex justify-between text-[11px] font-semibold mb-0.5">
                        <span class="uppercase text-slate-400">${attr}</span>
                        <span class="text-amber-400 font-bold">${val}</span>
                    </div>
                    <div class="w-full bg-slate-950 rounded-full h-1.5 border border-slate-800">
                        <div class="bg-gradient-to-r from-amber-500 to-emerald-400 h-1.5 rounded-full" style="width: ${val}%"></div>
                    </div>
                </div>
            `;
        }
    },

    renderClassifica() {
        const container = document.getElementById('ply-classifica');
        if (!container) return;

        let chiaveLegaUtente = this.normalizzaNomeLega(this.profile.lega);
        let datiLega = this.legheData[chiaveLegaUtente];

        let rowsHtml = "";
        if (datiLega && datiLega.classifica) {
            datiLega.classifica.slice(0, 10).forEach((team, idx) => {
                let rowStyle = team.isUser ? "text-amber-400 font-bold bg-amber-400/10" : "text-slate-300";
                rowsHtml += `
                    <tr class="border-b border-slate-800/40 ${rowStyle}">
                        <td class="py-1.5 pl-1">${idx + 1}</td>
                        <td class="py-1.5">${team.nome}</td>
                        <td class="py-1.5 text-center">${team.partite}</td>
                        <td class="py-1.5 text-center font-bold text-emerald-400">${team.punti}</td>
                    </tr>
                `;
            });
        }

        container.innerHTML = `
            <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="text-sm font-bold text-amber-400 uppercase">Classifica</h3>
                    <span class="text-slate-400 text-[11px] font-semibold">${this.profile.lega || "Campionato"}</span>
                </div>
                <div class="max-h-48 overflow-y-auto pr-1 mb-2">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="text-slate-400 border-b border-slate-800">
                                <th class="pb-1">#</th>
                                <th class="pb-1">Squadra</th>
                                <th class="pb-1 text-center">P</th>
                                <th class="pb-1 text-center">PTS</th>
                            </tr>
                        </thead>
                        <tbody>${rowsHtml}</tbody>
                    </table>
                </div>
                <button onclick="GiocatoreMode.apriModalClassifica()" class="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-[11px] uppercase transition-colors">
                    Espandi Classifica
                </button>
            </div>
        `;
    },

    renderCalendario() {
        const container = document.getElementById('ply-calendario');
        if (!container) return;

        let chiaveLegaUtente = this.normalizzaNomeLega(this.profile.lega);
        let datiLega = this.legheData[chiaveLegaUtente];

        let matchesHtml = "";
        if (datiLega && datiLega.calendario) {
            datiLega.calendario.forEach(m => {
                let status = m.completata
                    ? `<span class="text-emerald-400 font-bold">${m.risultato}</span>`
                    : `<span class="text-slate-500 font-bold">vs</span>`;
               
                let highlight = m.giornata === this.giornata ? "border-amber-400/50 bg-amber-400/5" : "border-slate-800";

                matchesHtml += `
                    <div class="flex justify-between items-center p-1.5 rounded border ${highlight} bg-slate-950/50 text-[11px]">
                        <span class="text-slate-400 font-medium">G${m.giornata}</span>
                        <div class="flex-1 text-center px-1">
                            <span class="text-slate-200">${m.casa}</span>
                            <span class="mx-1">${status}</span>
                            <span class="text-slate-200">${m.trasferta}</span>
                        </div>
                    </div>
                `;
            });
        }

        container.innerHTML = `
            <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="text-sm font-bold text-amber-400 uppercase">Calendario</h3>
                    <span class="text-slate-400 text-[11px] font-semibold">${this.profile.lega || "Campionato"}</span>
                </div>
                <div class="max-h-48 overflow-y-auto space-y-1.5 pr-1 mb-2">
                    ${matchesHtml}
                </div>
                <button onclick="GiocatoreMode.apriModalCalendario()" class="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-[11px] uppercase transition-colors">
                    Espandi Calendario
                </button>
            </div>
        `;
    },

    updateStatsUI() {
        const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
        setTxt('ply-stat-presenze', this.stats.presenze);

        const labelGol = document.getElementById('ply-stat-label-gol');
        const labelAssist = document.getElementById('ply-stat-label-assist');
        const valGol = document.getElementById('ply-stat-gol');
        const valAssist = document.getElementById('ply-stat-assist');

        if (this.isPortiere()) {
            if (labelGol) labelGol.innerText = "Parate";
            if (labelAssist) labelAssist.innerText = "Porte Inv.";
            if (valGol) valGol.innerText = this.stats.parate;
            if (valAssist) valAssist.innerText = this.stats.porteInviolate;
        } else {
            if (labelGol) labelGol.innerText = "Gol";
            if (labelAssist) labelAssist.innerText = "Assist";
            if (valGol) valGol.innerText = this.stats.gol;
            if (valAssist) valAssist.innerText = this.stats.assist;
        }

        let mediaVoti = this.stats.voti.length > 0
            ? (this.stats.voti.reduce((a, b) => a + b, 0) / this.stats.voti.length).toFixed(1)
            : "0.0";

        setTxt('ply-stat-voto', mediaVoti);
        setTxt('ply-valore', `€ ${this.stats.valore.toLocaleString('it-IT')}`);
    },

    renderMatchLog(gol, assist, parate, portaInviolata, voto, avversario, golSquadra, golAvversario, infortunato = false) {
        const container = document.getElementById('ply-match-log');
        if (!container) return;

        if (infortunato) {
            container.innerHTML = `
                <div class="bg-slate-950 p-4 rounded-xl border border-rose-500/40 space-y-2">
                    <div class="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span class="text-xs font-bold uppercase text-rose-400">🚨 Infortunio (Giornata ${this.giornata - 1}) vs ${avversario}</span>
                        <span class="font-bold text-rose-500">S.V.</span>
                    </div>
                    <div class="text-xs text-slate-300">
                        Hai subito un infortunio durante il riscaldamento e non sei potuto scendere in campo per questo match.
                    </div>
                </div>
            `;
            return;
        }

        let colorVoto = voto >= 6.5 ? 'text-emerald-400' : (voto >= 6.0 ? 'text-amber-400' : 'text-rose-400');
       
        container.innerHTML = `
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div class="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span class="text-xs font-bold uppercase text-slate-400">Ultima Partita (Giornata ${this.giornata - 1}) vs ${avversario}</span>
                    <span class="font-bold ${colorVoto}">Voto: ${voto}</span>
                </div>
                <div class="text-xs text-slate-200 font-semibold">
                    Risultato Finale: <span class="text-amber-400">${this.profile.squadra} ${golSquadra} - ${golAvversario} ${avversario}</span>
                </div>
                <ul class="text-xs space-y-1 text-slate-300">
                    ${this.isPortiere() ? `<li>🧤 Parate effettuate: <strong class="text-amber-400">${parate}</strong></li><li>🛡️ Porte inviolate: <strong class="text-emerald-400">${portaInviolata}</strong></li><li>⚽ Gol subiti: <strong class="text-rose-400">${golAvversario}</strong></li>` : `<li>⚽ Gol segnati: <strong class="text-amber-400">${gol}</strong></li><li>🎯 Assist forniti: <strong class="text-emerald-400">${assist}</strong></li>`}
                </ul>
            </div>
        `;
    }
};