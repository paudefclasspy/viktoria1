class Nation {
    constructor(name, enemyName) {
        this.name = name;
        this.enemyName = enemyName;
        this.stability = 5;
        this.militaryPower = 1;
        this.administration = 1;
        this.territory = 1;
        this.turnsSinceLastAttack = 0;
    }

    showStatus() {
        return `
            Nación: ${this.name} <br>
            Estabilidad: ${this.stability} <br>
            Poder Militar: ${this.militaryPower} <br>
            Administración: ${this.administration} <br>
            Territorios: ${this.territory} <br>
        `;
    }

    attemptAttack() {
        const success = Math.random() < 0.5; // 50% probabilidad de ataque exitoso
        if (success) {
            this.stability -= 1; // Disminuir estabilidad
            return `El ataque de ${this.enemyName} fue exitoso. Perdieron estabilidad.`;
        } else {
            return `El ataque de ${this.enemyName} fracasó.`;
        }
    }

    conquerTerritory() {
        if (this.territory < 7) {
            this.territory++;
            this.administration++; // Aumentar administración al conquistar
            return `Has conquistado un nuevo territorio. Total territorios: ${this.territory}`;
        } else {
            return `Ya tienes el máximo de territorios.`;
        }
    }
}

let nation;
let isAttackPhase = false;
const allNationsList = ['Nación A', 'Nación B', 'Nación C', 'Nación D', 'Nación E', 'Nación F', 'Nación G', 'Nación H'];
const enemyNames = ['Imperio X', 'República Y', 'Confederación Z', 'Reino W', 'Alianza T'];
const gameOutput = document.getElementById("gameOutput");
const gameStatus = document.getElementById("gameStatus");

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
    document.getElementById("attackSection").style.display = "none"; // Ocultar sección de defensa al inicio
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

// Ajuste en la función takeAction para cada acción
function takeAction(actionType) {
    let increment = Math.random() * (0.5 - 0.3) + 0.3; // Incremento aleatorio entre 0.3 y 0.5

    switch (actionType) {
        case 'policy':
            if (nation.stability < 12) {
                nation.stability = Math.min(nation.stability + increment, 12); // Incremento con límite de 12
                gameOutput.innerHTML += `<p>Has implementado nuevas políticas. Estabilidad aumentada a ${nation.stability.toFixed(1)}.</p>`;
            }
            break;

        case 'economy':
            if (nation.economy < 12) {
                nation.economy = Math.min(nation.economy + increment, 12);
                gameOutput.innerHTML += `<p>Has mejorado la economía. Economía aumentada a ${nation.economy.toFixed(1)}.</p>`;
            }
            break;

        case 'military':
            if (nation.militaryPower < 12) {
                nation.militaryPower = Math.min(nation.militaryPower + increment, 12);
                gameOutput.innerHTML += `<p>Has fortalecido el poder militar. Poder militar aumentado a ${nation.militaryPower.toFixed(1)}.</p>`;
            }
            break;

        case 'diplomacy':
            if (nation.diplomacy < 12) {
                nation.diplomacy = Math.min(nation.diplomacy + increment, 12);
                gameOutput.innerHTML += `<p>Has mejorado la diplomacia. Diplomacia aumentada a ${nation.diplomacy.toFixed(1)}.</p>`;
            }
            break;

        case 'research':
            if (nation.research < 12) {
                nation.research = Math.min(nation.research + increment, 12);
                gameOutput.innerHTML += `<p>Has avanzado en investigación. Investigación aumentada a ${nation.research.toFixed(1)}.</p>`;
            }
            break;

        case 'conquer':
            if (nation.territories < 7) {
                nation.territories += 1; // Incrementa el territorio en 1
                nation.economy = Math.min(nation.economy + 0.3, 12); // Incremento de economía en 0.3, con límite de 12
                gameOutput.innerHTML += `<p>Has conquistado un nuevo territorio. Territorios: ${nation.territories}, Economía aumentada a ${nation.economy.toFixed(1)}.</p>`;
            } else {
                gameOutput.innerHTML += `<p>No puedes conquistar más territorios sin aumentar la Administración.</p>`;
            }
            break;

        default:
            gameOutput.innerHTML += `<p>Acción no reconocida.</p>`;
    }

    updateGameStatus(); // Actualiza el estado del juego después de cada acción
}

// Mantiene el resto del código igual

    
    let actionMessage;
    switch (action) {
        case 'policy':
            actionMessage = "Política implementada.";
            break;
        case 'economy':
            actionMessage = "Economía mejorada.";
            break;
        case 'diplomacy':
            actionMessage = "Diplomacia aumentada.";
            break;
        case 'military':
            actionMessage = "Militarización aumentada.";
            break;
        case 'research':
            actionMessage = "Investigación completada.";
            break;
        default:
            return;
    }
    
    gameOutput.innerHTML = `<p>${actionMessage}</p>`;
    randomEvents();
    updateGameStatus();
    updateEnemyAttack();
}

function randomEvents() {
    if (Math.random() < 0.2) { // 20% probabilidad de evento aleatorio
        const eventMessage = "Visita de Aurora: Todos los valores aumentan 2 puntos.";
        gameOutput.innerHTML += `<p>${eventMessage}</p>`;
        nation.stability = Math.min(nation.stability + 2, 10);
        nation.militaryPower = Math.min(nation.militaryPower + 2, 10);
        nation.administration = Math.min(nation.administration + 2, 10);
    }
}

// Aquí las clases y funciones previas...

// Clase y funciones anteriores...

function updateEnemyAttack() {
    nation.turnsSinceLastAttack++;
    if (nation.turnsSinceLastAttack === 3) {
        isAttackPhase = true;
        document.getElementById("attackSection").style.display = "block"; // Mostrar menú de defensa
        document.getElementById("defendButton").disabled = false; // Habilitar botón de defender
        document.getElementById("notDefendButton").disabled = false; // Habilitar botón de no defender
        gameOutput.innerHTML += `<p>${nation.enemyName} ha lanzado un ataque. ¿Deseas defenderte?</p>`;
        nation.turnsSinceLastAttack = 0; // Reiniciar contador de turnos
        disableActionButtons(); // Deshabilitar otros botones de acción
    }
}

function defend() {
    const outcome = Math.random() < 0.5; // 50% probabilidad de éxito en defensa
    let resultMessage;
    if (outcome) {
        resultMessage = `Has defendido con éxito contra ${nation.enemyName}.`;
        nation.militaryPower++; // Incrementar poder militar
    } else {
        resultMessage = `Tu defensa falló. ${nation.enemyName} causó daño.`;
        nation.stability--; // Disminuir estabilidad
    }

    gameOutput.innerHTML += `<p>${resultMessage}</p>`;
    endAttackPhase();
}

function notDefend() {
    const resultMessage = `${nation.enemyName} ha atacado y ha causado daño ya que decidiste no defenderte.`;
    nation.stability--; // Disminuir estabilidad
    gameOutput.innerHTML += `<p>${resultMessage}</p>`;
    endAttackPhase();
}

function endAttackPhase() {
    isAttackPhase = false;
    enableActionButtons(); // Rehabilitar botones de acción
    document.getElementById("attackSection").style.display = "none"; // Ocultar sección de defensa
    document.getElementById("defendButton").disabled = true; // Deshabilitar botón de defender
    document.getElementById("notDefendButton").disabled = true; // Deshabilitar botón de no defender
    updateGameStatus();
}

function disableActionButtons() {
    document.querySelectorAll('#game-section button:not(#defendButton):not(#notDefendButton)').forEach(button => {
        button.disabled = true; // Deshabilitar todos los botones de acción, excepto los de defensa
    });
}

function enableActionButtons() {
    document.querySelectorAll('#game-section button').forEach(button => {
        if (button.id !== "defendButton" && button.id !== "notDefendButton") {
            button.disabled = false; // Rehabilitar todos los botones de acción, excepto los de defensa
        }
    });
}

function conquer() {
    const conquestMessage = nation.conquerTerritory();
    gameOutput.innerHTML += `<p>${conquestMessage}</p>`;
    updateGameStatus();
}
