class Nation {
    constructor(name, enemyName) {
        this.name = name;
        this.economy = 5;
        this.stability = 7;
        this.militaryPower = 4;
        this.prestige = 3;
        this.research = 2;
        this.year = 1840;
        this.enemyName = enemyName;
        this.turnsSinceLastAttack = 0;
    }

    showStatus() {
        return `
            <p><strong>Año:</strong> ${this.year}</p>
            <p><strong>Nación:</strong> ${this.name}</p>
            <p><strong>Economía:</strong> ${this.economy}/10</p>
            <p><strong>Estabilidad:</strong> ${this.stability}/10</p>
            <p><strong>Poder Militar:</strong> ${this.militaryPower}/10</p>
            <p><strong>Prestigio:</strong> ${this.prestige}/10</p>
            <p><strong>Investigación:</strong> ${this.research}/10</p>
        `;
    }

    policy() {
        this.stability = Math.min(this.stability + 1, 10);
        this.economy = Math.max(this.economy - 1, 0);
        return "Aplicaste una reforma laboral. +1 estabilidad, -1 economía.";
    }

    economyAction() {
        this.economy = Math.min(this.economy + 2, 10);
        this.stability = Math.max(this.stability - 1, 0);
        return "Industrialización realizada. +2 economía, -1 estabilidad.";
    }

    diplomacy() {
        this.prestige = Math.min(this.prestige + 1, 10);
        return "Alianza creada. +1 prestigio.";
    }

    militarization() {
        this.militaryPower = Math.min(this.militaryPower + 1, 10);
        this.economy = Math.max(this.economy - 1, 0);
        return "Reclutamiento realizado. +1 poder militar, -1 economía.";
    }

    researchAction() {
        this.research = Math.min(this.research + 1, 10);
        this.economy = Math.min(this.economy + 1, 10);
        return "Desarrollos tecnológicos iniciados. +1 investigación, +1 economía.";
    }

    randomEvent() {
        const events = [
            {
                text: "Descubrimiento de oro",
                effect: () => {
                    this.economy = Math.min(this.economy + 1, 10);
                    return "El descubrimiento de un yacimiento de oro aumenta la economía.";
                }
            },
            {
                text: "Protestas laborales",
                effect: () => {
                    this.stability = Math.max(this.stability - 1, 0);
                    return "Las protestas laborales afectan la estabilidad de la nación.";
                }
            },
            {
                text: "Pandemia",
                effect: () => {
                    this.stability = Math.max(this.stability - 2, 0);
                    return "Una pandemia provoca una crisis de salud y reduce la estabilidad.";
                }
            },
            {
                text: "Descubrimiento científico",
                effect: () => {
                    this.research = Math.min(this.research + 1, 10);
                    return "Un descubrimiento científico impulsa la investigación.";
                }
            },
            {
                text: "Visita de Aurora",
                effect: () => {
                    this.economy = Math.min(this.economy + 2, 10);
                    this.stability = Math.min(this.stability + 2, 10);
                    this.militaryPower = Math.min(this.militaryPower + 2, 10);
                    this.prestige = Math.min(this.prestige + 2, 10);
                    this.research = Math.min(this.research + 2, 10);
                    return "La visita de Aurora trae buena fortuna y mejora todos los aspectos.";
                }
            }
        ];
        const event = events[Math.floor(Math.random() * events.length)];
        const effectMessage = event.effect();  // Obtener el mensaje del efecto
        return `Evento aleatorio: ${event.text}. ${effectMessage}`; // Mensaje completo
    }

    enemyAttack() {
        return `
            <p><strong>${this.enemyName}</strong> está atacando.</p>
            <button onclick="defend()">Defenderse</button>
            <button onclick="notDefend()">No defenderse</button>
        `;
    }
}

// Lista de nombres de naciones
const allNationsList = [
    "La República de Verdisia",
    "El Imperio de Drakoria",
    "La Confederación del Norte",
    "El Reino de Eldoria",
    "Los Clanes de Korrak",
    "La República de Novaria",
    "La Unión de Teravia",
    "El Reino de Lysoria",
    "La Confederación de Azura",
    "El Imperio de Caelum"
];

// Lista de nombres de enemigos
const enemyNames = [
    "La Alianza de Astaris",
    "La Dominion de Telsar",
    "La Ciudad-Estado de Xandria",
    "La República de Feran",
    "El Imperio de Valtoria"
];

let nation;
let gameOutput = document.getElementById("action-output");
let gameStatus = document.getElementById("status");

function startGame() {
    // Selecciona aleatoriamente 5 naciones de la lista completa
    const randomNations = allNationsList.sort(() => 0.5 - Math.random()).slice(0, 5);
    const nationSelect = document.getElementById("nationSelect");

    // Llena el select con las naciones aleatorias
    nationSelect.innerHTML = '';
    randomNations.forEach((nationName) => {
        nationSelect.innerHTML += `<option value="${nationName}">${nationName}</option>`;
    });

    document.getElementById("intro-section").style.display = "block";
    document.getElementById("game-section").style.display = "none";
}

function selectNation() {
    const nationName = document.getElementById("nationSelect").value;
    // Selecciona un nombre enemigo aleatorio
    const enemyName = enemyNames[Math.floor(Math.random() * enemyNames.length)];
    nation = new Nation(nationName, enemyName);
    document.getElementById("intro-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    updateStatus();
}

function updateStatus() {
    gameStatus.innerHTML = nation.showStatus();
}

function takeAction(actionType) {
    let result;
    switch(actionType) {
        case 'policy': result = nation.policy(); break;
        case 'economy': result = nation.economyAction(); break;
        case 'diplomacy': result = nation.diplomacy(); break;
        case 'military': result = nation.militarization(); break;
        case 'research': result = nation.researchAction(); break;
    }
    gameOutput.innerHTML = result;
    endTurn();
}

function endTurn() {
    nation.year += 1;
    nation.turnsSinceLastAttack += 1;
    
    // Evento aleatorio
    if (Math.random() < 0.3) {
        gameOutput.innerHTML += `<p>${nation.randomEvent()}</p>`;
    }

    // Verifica el ataque enemigo cada 3 turnos
    if (nation.turnsSinceLastAttack >= 3) {
        gameOutput.innerHTML += nation.enemyAttack();
        nation.turnsSinceLastAttack = 0;
    } else {
        updateStatus();
    }
}

function defend() {
    nation.prestige = Math.min(nation.prestige + 1, 10);
    nation.economy = Math.max(nation.economy - 1, 0);
    nation.stability = Math.max(nation.stability - 1, 0);
    gameOutput.innerHTML = "Defensa exitosa. +1 prestigio, -1 economía, -1 estabilidad.";
    updateStatus();
}

function notDefend() {
    nation.prestige = Math.max(nation.prestige - 1, 0);
    gameOutput.innerHTML = "No te defendiste, tu prestigio ha disminuido.";
    updateStatus();
}

function showActionValues() {
    gameOutput.innerHTML = `
        <p><strong>Valores de las Acciones:</strong></p>
        <p>Política Interior: +1 estabilidad, -1 economía</p>
        <p>Economía: +2 economía, -1 estabilidad</p>
        <p>Diplomacia: +1 prestigio</p>
        <p>Militarización: +1 poder militar, -1 economía</p>
        <p>Investigación: +1 investigación, +1 economía</p>
    `;
}
