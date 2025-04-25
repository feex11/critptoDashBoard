document.addEventListener("DOMContentLoaded", function() {

async function getCryptoInfoBTC() {
    const url = 'https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&sparkline=false';
    
    try {
        const response = await fetch(url);
        const data = await response.json();


        const div1 = document.getElementById('div1'); // Seleciona a div1

        // Limpa a div1 antes de adicionar as novas informações
        div1.innerHTML = ''; 

        // Informações do Bitcoin
        const name = data.name;
        const symbol = data.symbol.toUpperCase();
        const price = data.market_data.current_price.usd;
        const priceChange = data.market_data.price_change_percentage_24h;
        const image = data.image.thumb; 

        // Verifica se priceChange existe e é um número válido
        const priceChangeFormatted = priceChange !== undefined ? priceChange.toFixed(2) : 'N/A';

        // Cria um novo elemento para mostrar as informações da cripto
        const cryptoElement = document.createElement('div');
        cryptoElement.innerHTML = `
            <img src="${image}" alt="${name} logo">
            <h2>${name} (${symbol})</h2>
            <p>Preço atual: $${price}</p>
            <p>Variação nas últimas 24 horas: ${priceChangeFormatted}%</p>
        `;
        div1.appendChild(cryptoElement); // Adiciona a informação na div1


    } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
    }
}

// Chama a função ao carregar a página


async function getCryptoInfoETH() {
    const url = 'https://api.coingecko.com/api/v3/coins/ethereum?localization=false&sparkline=false';
    
    try {
        const response = await fetch(url);
        const data = await response.json();


        const div2 = document.getElementById('div2'); // Seleciona a div1

        // Limpa a div1 antes de adicionar as novas informações
        div2.innerHTML = ''; 

        // Informações do Bitcoin
        const name = data.name;
        const symbol = data.symbol.toUpperCase();
        const price = data.market_data.current_price.usd;
        const priceChange = data.market_data.price_change_percentage_24h;
        const image = data.image.thumb; 

        // Verifica se priceChange existe e é um número válido
        const priceChangeFormatted = priceChange !== undefined ? priceChange.toFixed(2) : 'N/A';

        // Cria um novo elemento para mostrar as informações da cripto
        const cryptoElement = document.createElement('div');
        cryptoElement.innerHTML = `
            <img src="${image}" alt="${name} logo">
            <h2>${name} (${symbol})</h2>
            <p>Preço atual: $${price}</p>
            <p>Variação nas últimas 24 horas: ${priceChangeFormatted}%</p>
        `;
        div2.appendChild(cryptoElement); // Adiciona a informação na div1


    } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
    }
}

// Chama a função ao carregar a página


async function getCryptoInfoXRP() {
    const url = 'https://api.coingecko.com/api/v3/coins/ripple?localization=false&sparkline=false';
    
    try {
        const response = await fetch(url);
        const data = await response.json();


        const div3 = document.getElementById('div3'); // Seleciona a div1

        // Limpa a div1 antes de adicionar as novas informações
        div3.innerHTML = ''; 

        // Informações do Bitcoin
        const name = data.name;
        const symbol = data.symbol.toUpperCase();
        const price = data.market_data.current_price.usd;
        const priceChange = data.market_data.price_change_percentage_24h;
        const image = data.image.thumb; 

        // Verifica se priceChange existe e é um número válido
        const priceChangeFormatted = priceChange !== undefined ? priceChange.toFixed(2) : 'N/A';

        // Cria um novo elemento para mostrar as informações da cripto
        const cryptoElement = document.createElement('div');
        cryptoElement.innerHTML = `
            <img src="${image}" alt="${name} logo">
            <h2>${name} (${symbol})</h2>
            <p>Preço atual: $${price}</p>
            <p>Variação nas últimas 24 horas: ${priceChangeFormatted}%</p>
        `;
        div3.appendChild(cryptoElement); // Adiciona a informação na div1


    } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
    }
}

// Chama a função ao carregar a página




async function getCryptoInfoNEAR() {
    const url = 'https://api.coingecko.com/api/v3/coins/near?localization=false&sparkline=false';
    
    try {
        const response = await fetch(url);
        const data = await response.json();


        const div4 = document.getElementById('div4'); // Seleciona a div1

        // Limpa a div1 antes de adicionar as novas informações
        div4.innerHTML = ''; 

        // Informações do Bitcoin
        const name = data.name;
        const symbol = data.symbol.toUpperCase();
        const price = data.market_data.current_price.usd;
        const priceChange = data.market_data.price_change_percentage_24h;
        const image = data.image.thumb; 

        // Verifica se priceChange existe e é um número válido
        const priceChangeFormatted = priceChange !== undefined ? priceChange.toFixed(2) : 'N/A';

        // Cria um novo elemento para mostrar as informações da cripto
        const cryptoElement = document.createElement('div');
        cryptoElement.innerHTML = `
            <img src="${image}" alt="${name} logo">
            <h2>${name} (${symbol})</h2>
            <p>Preço atual: $${price}</p>
            <p>Variação nas últimas 24 horas: ${priceChangeFormatted}%</p>
        `;
        div4.appendChild(cryptoElement); // Adiciona a informação na div1


    } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
    }
}


getCryptoInfoNEAR();
getCryptoInfoXRP();
getCryptoInfoETH();
getCryptoInfoBTC();

});
