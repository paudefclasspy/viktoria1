class President {
    constructor() {
        this.name = this.generateRandomName();
        this.age = this.getRandomAge();
        this.administration = 1; // Valor inicial
        this.intelligence = this.getRandomInt(1, 5); // Valor aleatorio entre 1 y 5
        this.military = this.getRandomInt(1, 5); // Valor aleatorio entre 1 y 5
        this.nationalStrength = this.getRandomInt(1, 5); // Valor aleatorio entre 1 y 5
    }

    generateRandomName() {
        const names = ['Andrés', 'Beatriz', 'Carlos', 'Daniela', 'Eduardo', 'Fernanda'];
        return names[Math.floor(Math.random() * names.length)];
    }

    getRandomAge() {
        return Math.floor(Math.random() * (60 - 30 + 1)) + 30; // Edad entre 30 y 60
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    increaseAdministration() {
        this.administration++;
    }

    showProfile() {
        return `
            <p><strong>Presidente:</strong> ${this.name}, ${this.age} años</p>
            <p><strong>Administración:</strong> ${this.administration}</p>
            <p><strong>Inteligencia:</strong> ${this.intelligence}</p>
            <p><strong>Militar:</strong> ${this.military}</p>
            <p><strong>Fuerza Nacional:</strong> ${this.nationalStrength}</p>
        `;
    }
}

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
        this.territories = 1; // Cada nación empieza con 1 territorio
        this.maxTerritories = 7; // Máximo de territorios
        this.president = new President(); // Asignar un presidente aleatorio
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
            <p><strong>Territorios:</strong> ${this.territories}/${this.maxTerritories}</p>
            ${this.president.showProfile()} <!-- Mostrar perfil del presidente -->
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
            },
            {
                text: "Asamblea del Congreso",
                effect: () => {
                    this.president.increaseAdministration();
                    return "El Congreso ha aprobado nuevas reformas que mejoran la administración.";
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

    conquerTerritory() {
        if (this.territories < this.maxTerritories) {
            this.territories++;
            this.president.increaseAdministration(); // Aumentar administración con cada conquista
            return `Has conquistado un nuevo territorio. Territorios actuales: ${this.territories}/${this.maxTerritories}.`;
        } else {
            return "No puedes conquistar más territorios; has alcanzado el límite máximo.";
        }
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
let isAttackPhase = false; // Variable para controlar la fase de ataque

function startGame() {
    const randomNations = allNationsList.sort(() => 0.5 - Math.random()).slice(0, 5);
    const nationSelect = document.getElementById("nationSelect");
    nationSelect.innerHTML = ""; // Limpiar opciones anteriores

    randomNations.forEach(nation => {
        const option = document.createElement("option");
        option.value = nation;
        option.textContent = nation;
        nationSelect.appendChild(option);
    });

    document.getElementById("intro-section").style.display = "block"; // Mostrar selección de nación
}

function selectNation() {
    const selectedNation = document.getElementById("nationSelect").value;
    const enemyName = enemyNames[Math.floor(Math.random() * enemyNames.length)];
    nation = new Nation(selectedNation, enemyName);
    document.getElementById("intro-section").style.display = "none"; // Ocultar selección
    document.getElementById("game-section").style.display = "block"; // Mostrar sección del juego
    updateGameStatus();
}

function updateGameStatus() {
    gameStatus.innerHTML = nation.showStatus(); // Mostrar estado de la nación
}

function takeAction(action) {
    let actionMessage;
    switch (action) {
        case 'policy':
            actionMessage = nation.policy();
            break;
        case 'economy':
            actionMessage = nation.economyAction();
            break;
        case 'diplomacy':
            actionMessage = nation.diplomacy();
            break;
        case 'military':
            actionMessage = nation.militarization();
            break;
        case 'research':
            actionMessage = nation.researchAction();
            break;
        default:
            return;
    }
    
    gameOutput.innerHTML = `<p>${actionMessage}</p>`; // Reemplazar el contenido anterior
    randomEvents();
    updateGameStatus();
}

    
    let actionMessage;
    switch (action) {
        case 'policy':
            actionMessage = nation.policy();
            break;
        case 'economy':
            actionMessage = nation.economyAction();
            break;
        case 'diplomacy':
            actionMessage = nation.diplomacy();
            break;
        case 'military':
            actionMessage = nation.militarization();
            break;
        case 'research':
            actionMessage = nation.researchAction();
            break;
        default:
            return;
    }
    
    gameOutput.innerHTML = `<p>${actionMessage}</p>`; // Reemplazar el contenido anterior
    randomEvents();
    updateGameStatus();
    updateEnemyAttack(); // Llamar después de cada acción para verificar ataque enemigo
}

function updateEnemyAttack() {
    nation.turnsSinceLastAttack++;
    if (nation.turnsSinceLastAttack === 3) {
        isAttackPhase = true; // Activar fase de ataque
        gameOutput.innerHTML += nation.enemyAttack();
        nation.turnsSinceLastAttack = 0; // Reiniciar contador de turnos
        disableActionButtons(); // Deshabilitar botones de acción
    }
}

function defend() {
    const outcome = Math.random() < 0.5; // 50% de probabilidad de éxito
    if (outcome) {
        gameOutput.innerHTML += `<p>Has defendido con éxito tu nación contra ${nation.enemyName}.</p>`;
        nation.militaryPower++; // Incrementar poder militar
    } else {
        gameOutput.innerHTML += `<p>Tu defensa falló. ${nation.enemyName} ha causado daño.</p>`;
        nation.stability--; // Disminuir estabilidad en caso de fallo
    }
    
    isAttackPhase = false; // Terminar fase de ataque
    enableActionButtons(); // Rehabilitar botones de acción
    updateGameStatus();
}

function notDefend() {
    gameOutput.innerHTML += `<p>Decidiste no defenderte de ${nation.enemyName}. Tu nación ha sufrido consecuencias.</p>`;
    nation.stability--; // Disminuir estabilidad por no defenderse
    
    isAttackPhase = false; // Terminar fase de ataque
    enableActionButtons(); // Rehabilitar botones de acción
    updateGameStatus();
}

function disableActionButtons() {
    document.querySelectorAll('#game-section button').forEach(button => {
        if (button.innerText !== "Conquistar Territorio" && button.innerText !== "Valores de Acciones") {
            button.disabled = true; // Deshabilitar botones de acción
        }
    });
}

function enableActionButtons() {
    document.querySelectorAll('#game-section button').forEach(button => {
        button.disabled = false; // Rehabilitar botones de acción
    });
}

function conquer() {
    const conquestMessage = nation.conquerTerritory();
    gameOutput.innerHTML += `<p>${conquestMessage}</p>`;
    updateGameStatus();
}
