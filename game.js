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
        this.stability += 1;
        this.economy -= 1;
        return "Aplicaste una reforma laboral. +1 estabilidad, -1 economía.";
    }

    economyAction() {
        this.economy += 2;
        this.stability -= 1;
        return "Industrialización realizada. +2 economía, -1 estabilidad.";
    }

    diplomacy() {
        this.prestige += 1;
        return "Alianza creada. +1 prestigio.";
    }

    militarization() {
        this.militaryPower += 1;
        this.economy -= 1;
        return "Reclutamiento realizado. +1 poder militar, -1 economía.";
    }

    researchAction() {
        this.research += 1;
        this.economy += 1;
        return "Desarrollos tecnológicos iniciados. +1 investigación, +1 economía.";
    }

    randomEvent() {
        const events = [
            { text: "Descubrimiento de oro", effect: () => { this.economy += 1; } },
            { text: "Protestas laborales", effect: () => { this.stability -= 1; } },
            { text: "Pandemia", effect: () => { this.stability -= 2; } },
            { text: "Descubrimiento científico", effect: () => { this.research += 1; } }
        ];
        const event = events[Math.floor(Math.random() * events.length)];
        event.effect();
        return `Evento aleatorio: ${event.text}`;
    }

    enemyAttack() {
        return `
            <p><strong>${this.enemyName}</strong> está atacando.</p>
            <button onclick="defend()">Defenderse</button>
            <button onclick="notDefend()">No defenderse</button>
        `;
    }
}

// Lista de nombres de enemigos
const enemyNames = [
    "La República de Verdisia",
    "El Imperio de Drakoria",
    "La Confederación del Norte",
    "El Reino de Eldoria",
    "Los Clanes de Korrak",
    "La Alianza de Astaris",
    "La Dominion de Telsar",
    "La Ciudad-Estado de Xandria"
];

let nation;
let gameOutput = document.getElementById("action-output");
let gameStatus = document.getElementById("status");

function startGame() {
    const nationName = document.getElementById("nationName").value;
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
    nation.prestige += 1;
    nation.economy -= 1;
    nation.stability -= 1;
    gameOutput.innerHTML = "Defensa exitosa. +1 prestigio, -1 economía, -1 estabilidad.";
    updateStatus();
}

function notDefend() {
    nation.prestige -= 1;
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

