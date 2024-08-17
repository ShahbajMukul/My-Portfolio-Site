const currencyArray = [];

function fetchCryptoData() {
    fetch('https://api.coincap.io/v2/assets')
        .then(response => response.json())
        .then(json => {
            currencyArray.push(...json.data);
            console.log(currencyArray);
            
            populateDropdown();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            showError("Error getting data from the API. Please try again later.");
        });
}

function populateDropdown() {
    const dropdown = document.getElementById('currencyList');
    for (const currency of currencyArray) {
        const option = document.createElement('option');
        option.value = currency.id;
        option.text = currency.name;
        dropdown.appendChild(option);
    }
}

function updateInfo(selectedId) {
    const selectedCurrency = currencyArray.find(currency => currency.id === selectedId);
    if (selectedCurrency) {
        document.getElementById('cryptoName').textContent = selectedCurrency.name;
        document.getElementById('cryptoSymbol').textContent = `Symbol: ${selectedCurrency.symbol}`;
        document.getElementById('cryptoSupply').textContent = `Supply: ${Math.round(selectedCurrency.supply)} units`;
        document.getElementById('cryptoPrice').textContent = `Price in USD: $${parseFloat(selectedCurrency.priceUsd).toFixed(2)}`;
        document.getElementById('cryptoChange').textContent = `Change in 24hr: ${parseFloat(selectedCurrency.changePercent24Hr).toFixed(2)}%`;
        document.getElementById('cryptoRank').textContent = `Rank: ${selectedCurrency.rank}`;
    } else {
        showError("Couldn't display information for the selected currency. Please try again.");
    }
}

function dropdown() {
    const selectElement = document.getElementById('currencyList');
    const selectValue = selectElement.value;
    updateInfo(selectValue);
}

function showError(message) {
    const cryptoInfoSection = document.getElementById('cryptoInfo');
    cryptoInfoSection.innerHTML = `<p>${message}</p>`;
}

fetchCryptoData();
