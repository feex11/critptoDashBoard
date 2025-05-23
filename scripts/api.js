const cryptos = [
  { id: "bitcoin", divId: "div1" },

];

async function carregar(){

  const ids = cryptos.map((c) => c.id).join(",");
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=30d,7d,1y`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    data.forEach((coin) => {
      const target = cryptos.find((c) => c.id === coin.id);
      if (!target) return;

      const container = document.getElementById(target.divId);

      const name = coin.name;
      const symbol = coin.symbol.toUpperCase();
      const price = coin.current_price;
      const change = coin.price_change_percentage_24h;
      const changeFormatted = change !== null ? change.toFixed(2) : "N/A";
      const image = coin.image;

      //Dados adicionais
      const change7d = coin.price_change_percentage_7d_in_currency;
      const change7dFormatted = change7d !== null ? change7d.toFixed(2) : "N/A";
      const change30d = coin.price_change_percentage_30d_in_currency;
      const change30dFormatted =
        change30d !== null ? change30d.toFixed(2) : "N/A";
      const change1y = coin.price_change_percentage_1y_in_currency;
      const change1yFormatted = change1y !== null ? change1y.toFixed(2) : "N/A";
      const market_cap = coin.market_cap;
      const market_cap_rank = coin.market_cap_rank;
      const high24h = coin.high_24h;
      const low24h = coin.low_24h;
      const ath = coin.ath;
      const atl = coin.atl;
      const lastUpdated = coin.last_updated;

      const marketcapFormatted =
        market_cap !== null
          ? market_cap.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          : "N/A";

      const horarioUTC = new Date(lastUpdated).toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      });

      container.innerHTML = `
                <img src="${image}" alt="${name} logo" style="width: 32px; height: 32px;">
                <select class="selecionarPeriodo">
                    <option value="24h">24h</option>
                    <option value="7d">7d</option>
                    <option value="30d">30d</option>
                    <option value="1y">1a</option>
                </select>
                <h2>${name} (${symbol})</h2>
                <p>Preço atual: $${price}</p>
                <p style="color:${
                  change >= 0 ? "blue" : "red"
                }">Variação 24h: ${changeFormatted}%</p>
            `;

      function renderInfo(periodoSelecionado) {
        let variacaoTexto = "";
        let variacaoValor = "";

        switch (periodoSelecionado) {
          case "24h":
            variacaoTexto = "Variação 24h";
            variacaoValor = changeFormatted;
            break;
          case "7d":
            variacaoTexto = "Variação 7d";
            variacaoValor = change7dFormatted;
            break;
          case "30d":
            variacaoTexto = "Variação 30d";
            variacaoValor = change30dFormatted;
            break;
          case "1y":
            variacaoTexto = "Variação 1 ano";
            variacaoValor = change1yFormatted;
            break;
        }

        container.innerHTML = `
        <img src="${image}" alt="${name} logo" style="width: 32px; height: 32px;">
        <select class="selecionarPeriodo">
            <option value="24h" ${
              periodoSelecionado === "24h" ? "selected" : ""
            }>24h</option>
            <option value="7d" ${
              periodoSelecionado === "7d" ? "selected" : ""
            }>7d</option>
            <option value="30d" ${
              periodoSelecionado === "30d" ? "selected" : ""
            }>30d</option>
            <option value="1y" ${
              periodoSelecionado === "1y" ? "selected" : ""
            }>1a</option>
        </select>
        <h2>${name} (${symbol})</h2>
        <p>Preço atual: $${price}</p>
        <p style="color:${
          parseFloat(variacaoValor) >= 0 ? "green" : "red"
        }">${variacaoTexto}: ${variacaoValor}%</p>
        <button id="removerDiv"><i class="fa-solid fa-trash"></i></button>
    `;

        // Reatribui o evento ao novo select
        container
          .querySelector(".selecionarPeriodo")
          .addEventListener("change", function (e) {
            renderInfo(e.target.value);
          });
      }

// ... (código anterior dentro do loop) ...
renderInfo("24h"); // Render inicial do card

container.addEventListener("click", (event) => { // Adicione 'event' como parâmetro
    // Verifica se o clique foi no seletor de período dentro do card
    if (event.target.closest(".selecionarPeriodo")) {
        return; // Não faz nada se o clique foi no select
    }

    // Se não foi no select, popula o modal e o torna visível
    openModal( // Esta função popula o conteúdo do modal
        coin,
        name,
        image,
        change30dFormatted,
        changeFormatted,
        change7dFormatted,
        change1yFormatted,
        marketcapFormatted,
        market_cap_rank,
        high24h,
        low24h,
        ath,
        atl,
        horarioUTC
    );
    toggleModal(); // Esta função torna o modal e o fade visíveis
});
    });
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }

}


function openModal(
  coin,
  name,
  image,
  change30dFormatted,
  changeFormatted,
  change7dFormatted,
  change1yFormatted,
  marketcapFormatted,
  market_cap_rank,
  high24h,
  low24h,
  ath,
  atl,
  horarioUTC
) {
  const modalHeader = document.querySelector(".modal-header");
  const modalBody = document.querySelector(".modal-body");

  modalHeader.innerHTML = `
    <img src="${image}" alt="${name} logo" style="width: 42px; height: 42px;">
    <h2 style="margin-left: 0.3rem">${name}</h2> 
`;
  modalBody.innerHTML = `
        <p>Preço Atual: <span> $${coin.current_price} </span></p>
        <hr>
        <p>Variação 24h: <span style="color:${
          changeFormatted >= 0 ? "green" : "red"
        }; font-weight:bold"> ${changeFormatted}% </span></p>
        <p>Variação 7d: <span style="color:${
          change7dFormatted >= 0 ? "green" : "red"
        }; font-weight:bold"> ${change7dFormatted}% </span></p>
        <p>Variação 30d: <span style="color:${
          change30dFormatted >= 0 ? "green" : "red"
        }; font-weight:bold">${change30dFormatted}% </span></p>
        <p>Variação 1 ano:<span style="color:${
          change1yFormatted >= 0 ? "green" : "red"
        }; font-weight:bold"> ${change1yFormatted}% </span></p>
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
}

function criarDiv(selectedValue) {
  if (!cryptos.some(c => c.id === selectedValue)) {
    const divId = `div${cryptos.length + 1}`;

    // Adiciona ao array
    cryptos.push({ id: selectedValue, divId: divId });

    // Cria e adiciona a div
    const parent = document.getElementById("parent");
    const newDiv = document.createElement("div");
    newDiv.id = divId;
    parent.appendChild(newDiv);

  } else {
    alert("Criptomoeda já adicionada!");
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  // Carrega criptomoedas no select
  await carregarCriptos();

  // Adiciona evento ao botão de adicionar
  const botaoAdd = document.getElementById("btnAdd");
  botaoAdd.addEventListener("click", function () {
    const select = document.getElementById("cryptoSelect");
    const selectedOption = select.options[select.selectedIndex];
    const selectedValue = selectedOption.value;
    criarDiv(selectedValue);
    carregar(); // Atualiza os dados
  });

  // Carrega os dados iniciais
  carregar();
});

async function carregarCriptos() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  try {
    const response = await fetch(url);
    const data = await response.json();

    const select = document.getElementById("cryptoSelect");

    data.forEach((coin) => {
      const option = document.createElement("option");
      option.value = coin.id;
      option.textContent = `${coin.name} (${coin.symbol.toUpperCase()})`;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar criptomoedas:", error);
  }
}

