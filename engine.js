/**
 * ENGINE.JS - Motore di simulazione e calcoli di gioco
 */

const Engine = {
    // Piramide completa del calcio italiano: Serie A -> Terza Categoria
    leagues: [
        {
            name: "Serie A",
            teams: [
                "Atalanta", "Bologna", "Cagliari", "Como", "Fiorentina", "Frosinone", "Genoa", "Inter", "Juventus",
                "Lazio", "Lecce", "Milan", "Monza", "Napoli", "Parma", "Roma", "Sassuolo", "Torino", "Udinese", "Venezia"
            ]
        },
        {
            name: "Serie B",
            teams: [
                "Arezzo", "Ascoli", "Avellino", "Benevento", "Carrarese", "Catanzaro", "Cesena", "Cremonese", "Empoli",
                "Hellas Verona", "Juve Stabia", "L.R. Vicenza", "Mantova", "Modena", "Padova", "Palermo", "Pisa", "Sampdoria", "Sudtirol", "Virtus Entella"
            ]
        },
        {
            name: "Serie C",
            groups: [
                {
                    name: "Girone A",
                    teams: ["Padova", "Vicenza", "Triestina", "Feralpisalò", "Lecco", "Trento", "Virtus Verona", "Pro Patria", "Albinoleffe", "Pergolettese"]
                },
                {
                    name: "Girone B",
                    teams: ["Ternana", "Perugia", "Pescara", "Spal", "Entella", "Arezzo", "Gubbio", "Rimini", "Torres", "Vis Pesaro"]
                },
                {
                    name: "Girone C",
                    teams: ["Avellino", "Benevento", "Catania", "Crotone", "Foggia", "Juve Stabia", "Latina", "Messina", "Monopoli", "Potenza"]
                }
            ]
        },
        {
            name: "Serie D",
            groups: [
                { name: "Girone A", teams: ["Chieri", "Varese", "Gozzano", "Bra", "Ligorna", "Sanremese", "Derthona", "RG Ticino"] },
                { name: "Girone B", teams: ["Piacenza", "Pro Sesto", "Desenzano", "Arconatese", "Brusaporto", "Varesina", "Folgore Caratese", "Villa Valle"] },
                { name: "Girone C", teams: ["Treviso", "Carlins Muzane", "Campodarsego", "Adriese", "Luparense", "Mestre", "Dolomiti Bellunesi", "Montebelluna"] },
                { name: "Girone D", teams: ["Treviso", "Carlins Muzane", "Campodarsego", "Adriese", "Luparense", "Mestre", "Dolomiti Bellunesi", "Montebelluna"] },
                { name: "Girone E", teams: ["Treviso", "Carlins Muzane", "Campodarsego", "Adriese", "Luparense", "Mestre", "Dolomiti Bellunesi", "Montebelluna"] },
                { name: "Girone F", teams: ["Treviso", "Carlins Muzane", "Campodarsego", "Adriese", "Luparense", "Mestre", "Dolomiti Bellunesi", "Montebelluna"] },
                { name: "Girone G", teams: ["Treviso", "Carlins Muzane", "Campodarsego", "Adriese", "Luparense", "Mestre", "Dolomiti Bellunesi", "Montebelluna"] },
                { name: "Girone H", teams: ["Treviso", "Carlins Muzane", "Campodarsego", "Adriese", "Luparense", "Mestre", "Dolomiti Bellunesi", "Montebelluna"] },
                { name: "Girone I", teams: ["Treviso", "Carlins Muzane", "Campodarsego", "Adriese", "Luparense", "Mestre", "Dolomiti Bellunesi", "Montebelluna"] }
            ]
        }
    ],

    getTotaleGiornate(legaIndex, gironeIndex = 0) {
        const lega = this.leagues[legaIndex];
        let numSquadre = 0;

        if (lega.groups && lega.groups.length > 0) {
            const girone = lega.groups[gironeIndex] || lega.groups[0];
            numSquadre = girone.teams.length;
        } else {
            numSquadre = lega.teams.length;
        }

        return (numSquadre - 1) * 2;
    }
};

/**
 * SISTEMA PLAYOFF E PLAYOUT
 */
const PostSeasonEngine = {
    /**
     * Calcola la griglia dei Playoff e dei Playout in base alla classifica finale.
     * @param {Array} classifica - Classifica ordinata per punti/DR (dal 1° all'ultimo)
     */
    calcolaGrigliaPostSeason(classifica) {
        const totaleSquadre = classifica.length;
        if (totaleSquadre < 6) return null; // Troppo poche squadre per gestire Playoff/Playout

        // Struttura standard per campionati dilettantistici/Serie C
        const promossaDiretta = classifica[0]; // 1ª Classificata
        const playoffTeams = classifica.slice(1, 5); // 2ª, 3ª, 4ª e 5ª classificata
        const playoutTeams = classifica.slice(totaleSquadre - 4, totaleSquadre - 0); // Ultime 4 (tranne retrocessa diretta se presente)

        return {
            promossaDiretta: promossaDiretta.nome,
            playoff: {
                semifinale1: { casa: playoffTeams[0].nome, trasferta: playoffTeams[3].nome }, // 2ª vs 5ª
                semifinale2: { casa: playoffTeams[1].nome, trasferta: playoffTeams[2].nome }  // 3ª vs 4ª
            },
            playout: {
                sfida1: { casa: playoutTeams[0].nome, trasferta: playoutTeams[3].nome }, // Antepenultima vs Ultima
                sfida2: { casa: playoutTeams[1].nome, trasferta: playoutTeams[2].nome }  // Penultima vs Terzultima
            }
        };
    },

    /**
     * Simula i playoff (eliminazione diretta con vantaggio casa in caso di pareggio)
     */
    simulaPlayoff(griglia) {
        // Semifinale 1
        const resSemi1 = MatchEngine.simulaPartita(griglia.playoff.semifinale1.casa, griglia.playoff.semifinale1.trasferta);
        let vincenteSemi1 = resSemi1.golCasa >= resSemi1.golOspite ? resSemi1.casa : resSemi1.ospite;

        // Semifinale 2
        const resSemi2 = MatchEngine.simulaPartita(griglia.playoff.semifinale2.casa, griglia.playoff.semifinale2.trasferta);
        let vincenteSemi2 = resSemi2.golCasa >= resSemi2.golOspite ? resSemi2.casa : resSemi2.ospite;

        // Finale
        const resFinale = MatchEngine.simulaPartita(vincenteSemi1, vincenteSemi2);
        let vincitorePlayoff = resFinale.golCasa >= resFinale.golOspite ? resFinale.casa : resFinale.ospite;

        return {
            semifinali: [resSemi1, resSemi2],
            finale: resFinale,
            vincitorePlayoff: vincitorePlayoff
        };
    },

    /**
     * Simula i playout (chi perde retrocede)
     */
    simulaPlayout(griglia) {
        const resPlayout1 = MatchEngine.simulaPartita(griglia.playout.sfida1.casa, griglia.playout.sfida1.trasferta);
        // In caso di pareggio si salva la squadra di casa (meglio piazzata in campionato)
        let retrocessa1 = resPlayout1.golCasa < resPlayout1.golOspite ? resPlayout1.casa : resPlayout1.ospite;

        const resPlayout2 = MatchEngine.simulaPartita(griglia.playout.sfida2.casa, griglia.playout.sfida2.trasferta);
        let retrocessa2 = resPlayout2.golCasa < resPlayout2.golOspite ? resPlayout2.casa : resPlayout2.ospite;

        return {
            sfide: [resPlayout1, resPlayout2],
            retrocesse: [retrocessa1, retrocessa2]
        };
    }
};

const MatchEngine = {
    simulaPartita(squadraCasa, squadraOspite) {
        const nomeCasa = typeof squadraCasa === 'string' ? squadraCasa : (squadraCasa.nome || 'Casa');
        const nomeOspite = typeof squadraOspite === 'string' ? squadraOspite : (squadraOspite.nome || 'Ospite');

        const golCasa = this.calcolaGol();
        const golOspite = this.calcolaGol();

        let puntiCasa = 1;
        let puntiOspite = 1;

        if (golCasa > golOspite) {
            puntiCasa = 3;
            puntiOspite = 0;
        } else if (golOspite > golCasa) {
            puntiCasa = 0;
            puntiOspite = 3;
        }

        return {
            casa: nomeCasa,
            ospite: nomeOspite,
            golCasa: golCasa,
            golOspite: golOspite,
            puntiCasa: puntiCasa,
            puntiOspite: puntiOspite,
            differenzaCasa: golCasa - golOspite,
            differenzaOspite: golOspite - golCasa
        };
    },

    calcolaGol() {
        const rand = Math.random();
        if (rand < 0.35) return 0;
        if (rand < 0.68) return 1;
        if (rand < 0.88) return 2;
        if (rand < 0.96) return 3;
        return 4;
    },

    simulaPrestazioneGiocatore(ruolo) {
        let probGol = 0.10;
        let probAssist = 0.10;

        if (ruolo === 'ATT') {
            probGol = 0.45;
            probAssist = 0.20;
        } else if (ruolo === 'COC' || ruolo === 'CC') {
            probGol = 0.25;
            probAssist = 0.35;
        } else if (ruolo === 'DC' || ruolo === 'DD' || ruolo === 'DS') {
            probGol = 0.08;
            probAssist = 0.12;
        }

        const gol = Math.random() < probGol ? 1 : 0;
        const assist = Math.random() < probAssist ? 1 : 0;
        
        let votoBase = Math.random() * 2.5 + 5.5; 
        if (gol > 0) votoBase += 1.0;
        if (assist > 0) votoBase += 0.5;

        const votoFinale = Math.min(10, Math.max(4, votoBase)).toFixed(1);

        return {
            gol: gol,
            assist: assist,
            voto: parseFloat(votoFinale)
        };
    }
};