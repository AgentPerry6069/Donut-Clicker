// Game Variables
let donuts = 0;
let money = 0;
let workers = 0;
let managers = 0;
let stores = 0;

let cost_of_worker = 10;
let cost_of_manager = 115;
let cost_of_store = 100000;

const baseCosts = {
    worker: 10,
    manager: 115,
    store: 100000,
    efficiency: 100,
    workerSpeed: 200,
    automation: 500,
    donutQuality: 1000,
    storeUpgrade: 2000
};

// Load game state from localStorage
window.onload = function () {
    if (localStorage.getItem('donuts')) {
        donuts = parseInt(localStorage.getItem('donuts'), 10);
        money = parseFloat(localStorage.getItem('money'));
        workers = parseInt(localStorage.getItem('workers'), 10);
        managers = parseInt(localStorage.getItem('managers'), 10);
        stores = parseInt(localStorage.getItem('stores'), 10);
        cost_of_worker = parseFloat(localStorage.getItem('cost_of_worker'));
        cost_of_manager = parseFloat(localStorage.getItem('cost_of_manager'));
        cost_of_store = parseFloat(localStorage.getItem('cost_of_store'));
        updateDisplay();
        updateUpgradeCosts();
        startWorkerProduction(); // Start the worker production when the page loads
    }
};

function updateDisplay() {
    document.getElementById('no_of_donuts').textContent = donuts.toFixed(0);
    document.getElementById('no_of_money').textContent = money.toFixed(2);
    document.getElementById('no_of_workers').textContent = workers.toFixed(0);
    document.getElementById('no_of_managers').textContent = managers.toFixed(0);
    document.getElementById('no_of_stores').textContent = stores.toFixed(0);
    document.getElementById('workerCost').textContent = `$${cost_of_worker.toFixed(2)}`;
    document.getElementById('managerCost').textContent = `$${cost_of_manager.toFixed(2)}`;
    document.getElementById('storeCost').textContent = `$${cost_of_store.toFixed(2)}`;
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function saveGame() {
    localStorage.setItem('donuts', donuts);
    localStorage.setItem('money', money);
    localStorage.setItem('workers', workers);
    localStorage.setItem('managers', managers);
    localStorage.setItem('stores', stores);
    localStorage.setItem('cost_of_worker', cost_of_worker);
    localStorage.setItem('cost_of_manager', cost_of_manager);
    localStorage.setItem('cost_of_store', cost_of_store);
}

function makeDonuts() {
    donuts += 1; // Increase donut count by 1
    updateDisplay();
    saveGame();
}

function sellDonuts() {
    const sellValue = Math.floor(donuts / 10);
    if (sellValue > 0) {
        money += sellValue;
        donuts = donuts % 10; // Keep remainder of donuts that couldn't be converted
        updateDisplay();
        saveGame();
        showNotification(`Sold ${sellValue} donuts for $${sellValue}`);
    } else {
        showNotification("Not enough donuts to sell.");
    }
}

function hireWorker() {
    if (money >= cost_of_worker) {
        money -= cost_of_worker;
        workers += 1;
        cost_of_worker *= 1.15;
        updateDisplay();
        saveGame();
    } else {
        showNotification("Not enough money to hire a worker.");
    }
}

function hireManager() {
    if (money >= cost_of_manager) {
        money -= cost_of_manager;
        managers += 1;
        cost_of_manager *= 1.15;
        updateDisplay();
        saveGame();
    } else {
        showNotification("Not enough money to hire a manager.");
    }
}

function openStore() {
    if (money >= cost_of_store) {
        money -= cost_of_store;
        stores += 1;
        cost_of_store *= 1.15;
        updateDisplay();
        saveGame();
    } else {
        showNotification("Not enough money to open a store.");
    }
}

function updateUpgradeCosts() {
    document.getElementById('efficiency-cost').textContent = `Next cost: $${baseCosts.efficiency}`;
    document.getElementById('workerSpeed-cost').textContent = `Next cost: $${baseCosts.workerSpeed}`;
    document.getElementById('automation-cost').textContent = `Next cost: $${baseCosts.automation}`;
    document.getElementById('donutQuality-cost').textContent = `Next cost: $${baseCosts.donutQuality}`;
    document.getElementById('storeUpgrade-cost').textContent = `Next cost: $${baseCosts.storeUpgrade}`;
}

function buyUpgrade(upgrade) {
    let upgradeCost = baseCosts[upgrade];
    if (money >= upgradeCost) {
        money -= upgradeCost;
        baseCosts[upgrade] *= 1.15; // Increase cost for next purchase
        updateDisplay();
        updateUpgradeCosts();
        saveGame();
        showNotification(`Upgraded ${upgrade}`);
    } else {
        showNotification("Not enough money to buy this upgrade.");
    }
}

function startWorkerProduction() {
    setInterval(() => {
        donuts += workers * 0.10;
        updateDisplay();
        saveGame();
    }, 900); // Every second
}

function startManagerProduction() {
    setInterval(() => {
        donuts += managers * 1;
        updateDisplay();
        saveGame();
    }, 900); // Every second
}

function startStoreProduction() {
    setInterval(() => {
        donuts += stores * 5;
        updateDisplay();
        saveGame();
    }, 900); // Every second
}

function showUpgradePopup() {
    document.getElementById('upgradeModal').style.display = 'block';
}

function closeUpgradePopup() {
    document.getElementById('upgradeModal').style.display = 'none';
}

function showConfirmPopup() {
    document.getElementById('confirmPopup').style.display = 'block';
}

function closeConfirmPopup() {
    document.getElementById('confirmPopup').style.display = 'none';
}

function resetGame(confirm) {
    if (confirm) {
        // Reset game state
        donuts = 0;
        money = 0;
        workers = 0;
        managers = 0;
        stores = 0;
        cost_of_worker = 10;
        cost_of_manager = 115;
        cost_of_store = 100000;
        updateDisplay();
        saveGame();
    }
    closeConfirmPopup();
}
