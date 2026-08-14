const App = {
    currentMode: null,

    init() {
        this.populateLeagues();
    },

    showScreen(screenId) {
        document.querySelectorAll('.view-screen').forEach(screen => {
            screen.classList.add('hidden');
        });
        const target = document.getElementById(screenId);
        if (target) {
            target.classList.remove('hidden');
        }
    },

    selectMode(mode) {
        this.currentMode = mode;
        const setupTitle = document.getElementById('setup-title');
        const ruoloContainer = document.getElementById('field-ruolo-container');
        const tatticaContainer = document.getElementById('field-tattica-container');

        if (mode === 'allenatore') {
            setupTitle.textContent = 'Crea Profilo Allenatore';
            if (ruoloContainer) ruoloContainer.classList.add('hidden');
            if (tatticaContainer) tatticaContainer.classList.remove('hidden');
        } else {
            setupTitle.textContent = 'Crea Profilo Calciatore';
            if (ruoloContainer) ruoloContainer.classList.remove('hidden');
            if (tatticaContainer) tatticaContainer.classList.add('hidden');
        }

        this.showScreen('setup-screen');
    },

    populateLeagues() {
        const selectLega = document.getElementById('setup-lega');
        if (!selectLega || typeof Engine === 'undefined' || !Engine.leagues) return;

        selectLega.innerHTML = '';
        Engine.leagues.forEach((lega, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = lega.name;
            selectLega.appendChild(option);
        });

        this.onLegaChange();
    },

    onLegaChange() {
        const selectLega = document.getElementById('setup-lega');
        const selectGirone = document.getElementById('setup-girone');
        const gironeContainer = document.getElementById('field-girone-container');
        const squadraContainer = document.getElementById('field-squadra-container');
        if (!selectLega) return;

        const legaIndex = selectLega.value;
        const lega = Engine.leagues[legaIndex];

        selectGirone.innerHTML = '';
        if (lega.groups && lega.groups.length > 0) {
            if (gironeContainer) gironeContainer.classList.remove('hidden');
            if (squadraContainer) {
                squadraContainer.classList.remove('col-span-2');
                squadraContainer.classList.add('col-span-1');
            }
            lega.groups.forEach((girone, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = girone.name;
                selectGirone.appendChild(option);
            });
        } else {
            if (gironeContainer) gironeContainer.classList.add('hidden');
            if (squadraContainer) {
                squadraContainer.classList.remove('col-span-1');
                squadraContainer.classList.add('col-span-2');
            }
        }

        this.onGironeChange();
    },

    onGironeChange() {
        const selectLega = document.getElementById('setup-lega');
        const selectGirone = document.getElementById('setup-girone');
        const selectSquadra = document.getElementById('setup-squadra');
        if (!selectLega || !selectSquadra) return;

        const lega = Engine.leagues[selectLega.value];
        selectSquadra.innerHTML = '';

        let teams = [];
        if (lega.groups && lega.groups.length > 0) {
            const gironeIndex = selectGirone.value || 0;
            if (lega.groups[gironeIndex]) {
                teams = lega.groups[gironeIndex].teams;
            }
        } else {
            teams = lega.teams;
        }

        teams.forEach((squadra, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = squadra;
            selectSquadra.appendChild(option);
        });
    },

    handleSetupSubmit(event) {
        event.preventDefault();

        const nome = document.getElementById('setup-nome').value;
        const cognome = document.getElementById('setup-cognome').value;
        const eta = document.getElementById('setup-eta').value;
        const legaIndex = document.getElementById('setup-lega').value;
        const gironeIndex = document.getElementById('setup-girone').value || 0;
        const squadraIndex = document.getElementById('setup-squadra').value;

        const legaObj = Engine.leagues[legaIndex];
        let nomeGirone = '';
        let squadraNome = '';

        if (legaObj.groups && legaObj.groups.length > 0) {
            nomeGirone = legaObj.groups[gironeIndex].name;
            squadraNome = legaObj.groups[gironeIndex].teams[squadraIndex];
        } else {
            squadraNome = legaObj.teams[squadraIndex];
        }

        // Calcolo automatico e realistico delle giornate totali basato sulle squadre
        const totGiornate = Engine.getTotaleGiornate(legaIndex, gironeIndex);

        document.getElementById('header-user-info').classList.remove('hidden');
        document.getElementById('nav-user-name').textContent = `${nome} ${cognome}`;
        document.getElementById('nav-user-team').textContent = squadraNome;

        if (this.currentMode === 'allenatore') {
            const tattica = document.getElementById('setup-tattica').value;
            AllenatoreMode.init({
                nome: `${nome} ${cognome}`,
                squadra: squadraNome,
                lega: `${legaObj.name} ${nomeGirone}`,
                tattica: tattica,
                totGiornate: totGiornate
            });
            this.showScreen('allenatore-screen');
        } else {
            const ruolo = document.getElementById('setup-ruolo').value;
            GiocatoreMode.init({
                nome: `${nome} ${cognome}`,
                eta: eta,
                squadra: squadraNome,
                lega: `${legaObj.name} ${nomeGirone}`,
                ruolo: ruolo,
                totGiornate: totGiornate
            });
            this.showScreen('giocatore-screen');
        }
    }
};

window.onload = () => {
    App.init();
};