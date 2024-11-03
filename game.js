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

    enemyAttack() {
        const success = Math.random() < 0.5; // 50% de probabilidad de ataque exitoso
        if (success) {
            this.stability -= 1; // Disminuir estabilidad
            return `${this.enemyName} ha atacado y ha causado daño. Estabilidad ahora: ${this.stability}`;
        } else {
            return `${this.enemyName} intentó atacar, pero falló.`;
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
    if (isAttackPhase) {
        alert("Debes resolver la fase de ataque antes de realizar otra acción.");
        return; // Evitar realizar acciones durante la fase de ataque
    }
    
    let actionMessage;
    switch (action) {
        case 'policy':
            actionMessage = "Política implementada."; // Placeholder para política
            break;
        case 'economy':
            actionMessage = "Economía mejorada."; // Placeholder para economía
            break;
        case 'diplomacy':
            actionMessage = "Diplomacia aumentada."; // Placeholder para diplomacia
            break;
        case 'military':
            actionMessage = "Militarización aumentada."; // Placeholder para militarización
            break;
        case 'research':
            actionMessage = "Investigación completada."; // Placeholder para investigación
            break;
        default:
            return;
    }
    
    // Limpiar la salida anterior antes de agregar un nuevo mensaje
    gameOutput.innerHTML = `<p>${actionMessage}</p>`;
    
    randomEvents(); // Llamar a eventos aleatorios
    updateGameStatus(); // Actualizar estado del juego
    updateEnemyAttack(); // Verificar ataques después de cada acción
}

function randomEvents() {
    if (Math.random() < 0.2) { // 20% de probabilidad de evento aleatorio
        const eventMessage = "Visita de Aurora: Todos los valores aumentan 2 puntos.";
        gameOutput.innerHTML += `<p>${eventMessage}</p>`;
        nation.stability = Math.min(nation.stability + 2, 10);
        nation.militaryPower = Math.min(nation.militaryPower + 2, 10);
        nation.administration = Math.min(nation.administration + 2, 10);
    }
}

function updateEnemyAttack() {
    nation.turnsSinceLastAttack++;
    if (nation.turnsSinceLastAttack === 3) {
        isAttackPhase = true; // Activar fase de ataque
        gameOutput.innerHTML += `<p>${nation.enemyAttack()}</p>`;
        nation.turnsSinceLastAttack = 0; // Reiniciar contador de turnos
        disableActionButtons(); // Deshabilitar botones de acción
        // Mostrar botones de defensa
        document.getElementById("defendButton").disabled = false;
        document.getElementById("notDefendButton").disabled = false;
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
    // Ocultar botones de defensa
    document.getElementById("defendButton").disabled = true;
    document.getElementById("notDefendButton").disabled = true;
    updateGameStatus();
}

function notDefend() {
    gameOutput.innerHTML += `<p>Decidiste no defenderte de ${nation.enemyName}. Tu nación ha sufrido consecuencias.</p>`;
    nation.stability--; // Disminuir estabilidad por no defenderse
    
    isAttackPhase = false; // Terminar fase de ataque
    enableActionButtons(); // Rehabilitar botones de acción
    // Ocultar botones de defensa
    document.getElementById("defendButton").disabled = true;
    document.getElementById("notDefendButton").disabled = true;
    updateGameStatus();
}

function disableActionButtons() {
    document.querySelectorAll('#game-section button').forEach(button => {
        button.disabled = true; // Deshabilitar todos los botones de acción
    });
}

function enableActionButtons() {
    document.querySelectorAll('#game-section button').forEach(button => {
        button.disabled = false; // Rehabilitar todos los botones de acción
    });
}

function conquer() {
    const conquestMessage = nation.conquerTerritory();
    gameOutput.innerHTML += `<p>${conquestMessage}</p>`;
    updateGameStatus();
}
