document.addEventListener("DOMContentLoaded", async function () {
    const cryptos = [
        { id: 'bitcoin', divId: 'div1' },
        { id: 'ethereum', divId: 'div2' },
        { id: 'ripple', divId: 'div3' },
        { id: 'near', divId: 'div4' },
        { id: 'dogecoin', divId: 'div5' },
        { id: 'litecoin', divId: 'div6' },
        { id: 'solana', divId: 'div7' },
        { id: 'polkadot', divId: 'div8' },
    ];

    const ids = cryptos.map(c => c.id).join(",");
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

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
            const image = coin.image;
            const changeFormatted = change !== null ? change.toFixed(2) : 'N/A';

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
