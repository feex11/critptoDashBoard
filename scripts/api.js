document.addEventListener("DOMContentLoaded", async function (valorMoeda) {
    const cryptos = [
        { id: 'bitcoin', divId: 'div1' },
        { id: 'solana', divId: 'div2' },
        { id: 'sui', divId: 'div3' },
        { id: 'ripple', divId: 'div4' },
        { id: 'ethereum', divId: 'div5' },
        { id: 'litecoin', divId: 'div6' },
        { id: 'dogecoin', divId: 'div7' },
        { id: 'near', divId: 'div8' },
    ];

    const ids = cryptos.map(c => c.id).join(",");
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=30d,7d,1y`;


    try {
        const response = await fetch(url);
        const data = await response.json();

        data.forEach(coin => {
            const target = cryptos.find(c => c.id === coin.id);
            if (!target) return;

            const container = document.getElementById(target.divId);
            

            const name = coin.name;
            const symbol = coin.symbol.toUpperCase();
            const price = coin.current_price;
            const change = coin.price_change_percentage_24h;
            const changeFormatted = change !== null ? change.toFixed(2) : 'N/A';
            const image = coin.image;
            

            //Dados adicionais
            const change7d = coin.price_change_percentage_7d_in_currency;
            const change7dFormatted = change7d !== null ? change7d.toFixed(2) : 'N/A';
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
            const lastUpdated = coin.last_updated; 

            
            const marketcapFormatted = market_cap !== null ? market_cap.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'N/A';

            const horarioUTC = new Date(lastUpdated).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

            
            container.innerHTML = `
                <img src="${image}" alt="${name} logo" style="width: 32px; height: 32px;">
                <h2>${name} (${symbol})</h2>
                <p style="color:black">Preço atual: $${price}</p>
                <p style="color:${change >= 0 ? 'green' : 'red'}">Variação 24h: ${changeFormatted}%</p>
            `;

            
            container.addEventListener("click", () => {
                openModal(coin, name, image, change30dFormatted, changeFormatted, change7dFormatted, change1yFormatted, marketcapFormatted, market_cap_rank, high24h, low24h, ath, atl, horarioUTC);
            });


        });

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
});

function openModal(coin, name, image, change30dFormatted, changeFormatted, change7dFormatted, change1yFormatted, marketcapFormatted, market_cap_rank, high24h, low24h, ath, atl, horarioUTC) {
    const modalHeader = document.querySelector('.modal-header');
    const modalBody = document.querySelector('.modal-body');

    modalHeader.innerHTML = `
    <img src="${image}" alt="${name} logo" style="width: 42px; height: 42px;">
    <h2 style="margin-left: 0.3rem">${name}</h2> 
`;
    modalBody.innerHTML = `
        <p>Preço Atual: <span> $${coin.current_price} </span></p>
        <hr>
        <p>Variação 24h: <span style="color:${changeFormatted >= 0 ? 'green' : 'red'}; font-weight:bold"> ${changeFormatted}% </span></p>
        <p>Variação 7d: <span style="color:${change7dFormatted >= 0 ? 'green' : 'red'}; font-weight:bold"> ${change7dFormatted}% </span></p>
        <p>Variação 30d: <span style="color:${change30dFormatted >= 0 ? 'green' : 'red'}; font-weight:bold">${change30dFormatted}% </span></p>
        <p>Variação 1 ano:<span style="color:${change1yFormatted >= 0 ? 'green' : 'red'}; font-weight:bold"> ${change1yFormatted}% </span></p>
        <hr>
        <p>Cap. de Mercado: ${marketcapFormatted}</p>
        <p>Ranking Cap. de Mercado: #${market_cap_rank}</p>
        <hr>
        <p>Maior Preço 24h: <span style="color:green; font-weight:bold"> $${high24h} </span></p>
        <p>Menor Preço 24h: <span style="color:red; font-weight:bold">$${low24h}</span></p>
        <hr>
        <p>ATH (All Time High): <span style="color:green; font-weight:bold"> $${ath} </span> </p>
        <p>ATL (All Time Low): <span style="color:red; font-weight:bold">$${atl}</span></p>
        <hr>
        <p>Última Atualização: ${horarioUTC}</p>
    `;
};

