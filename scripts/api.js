document.addEventListener("DOMContentLoaded", async function () {
    const cryptos = [
        { id: 'bitcoin', divId: 'div1' },
        { id: 'ethereum', divId: 'div2' },
        { id: 'ripple', divId: 'div3' },
        { id: 'sui', divId: 'div4' },
        { id: 'dogecoin', divId: 'div5' },
        { id: 'litecoin', divId: 'div6' },
        { id: 'solana', divId: 'div7' },
        { id: 'near', divId: 'div8' },
    ];

    const ids = cryptos.map(c => c.id).join(",");
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=30d,1y`;


    try {
        const response = await fetch(url);
        const data = await response.json();

        data.forEach(coin => {
            const target = cryptos.find(c => c.id === coin.id);
            if (!target) return;

            const container = document.getElementById(target.divId);
            container.innerHTML = '';

            const name = coin.name;
            const symbol = coin.symbol.toUpperCase();
            const price = coin.current_price;
            const change = coin.price_change_percentage_24h;
            const changeFormatted = change !== null ? change.toFixed(2) : 'N/A';
            const image = coin.image;
            

            //Dados adicionais
            const change30d = coin.price_change_percentage_30d_in_currency;
            const change30dFormatted = change30d !== null ? change30d.toFixed(2) : 'N/A';   
            const change1y = coin.price_change_percentage_1y_in_currency;               
            const change1yFormatted = change1y !== null ? change1y.toFixed(2) : 'N/A';
            const market_cap = coin.market_cap;
            const market_cap_rank = coin.market_cap_rank;
            const high24h = coin.high_24h;
            const low24h = coin.low_24h;
            const ath = coin.ath;
            const atl = coin.atl;
            const totalSupply = coin.total_supply;
            const circulatingSupply = coin.circulating_supply;
            const lastUpdated = coin.last_updated;
            const totalVolume = coin.total_volumes;

            const card = document.createElement('div');
            card.innerHTML = `
                <img src="${image}" alt="${name} logo" style="width: 32px; height: 32px;">
                <h2>${name} (${symbol})</h2>
                <p style="color:black">Preço atual: $${price}</p>
                <p style="color:${change >= 0 ? 'green' : 'red'}">Variação 24h: ${changeFormatted}%</p>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
});

