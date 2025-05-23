// Elementos do DOM para o Modal
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const closeModalButton = document.querySelector("#close-modal"); // Botão original no HTML do modal

// --- LÓGICA DO MODAL ---
const toggleModal = () => {
  [modal, fade].forEach((el) => el.classList.toggle("hide"));
};

// Adiciona listener ao botão de fechar original e ao fade
if (closeModalButton) {
  closeModalButton.addEventListener("click", toggleModal);
}
fade.addEventListener("click", toggleModal);

// --- CONFIGURAÇÃO E DADOS GLOBAIS DAS CRIPTOMOEDAS ---
const cryptos = [{ id: "bitcoin", divId: "div1" }]; // Configuração inicial
let allCoinsData = []; // Armazena os dados completos da API para as criptos carregadas

// --- FUNÇÕES AUXILIARES ---

/**
 * Popula o select principal com as criptomoedas disponíveis.
 */
async function carregarCriptosNoSelect() {
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro na API ao carregar lista: ${response.status}`);
    const data = await response.json();
    const select = document.getElementById("cryptoSelect");
    select.innerHTML = '<option value="">Selecione uma cripto</option>'; // Limpa e adiciona placeholder

    data.forEach((coin) => {
      const option = document.createElement("option");
      option.value = coin.id;
      option.textContent = `${coin.name} (${coin.symbol.toUpperCase()})`;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar criptomoedas no select:", error);
    // Poderia exibir uma mensagem para o usuário aqui
  }
}

/**
 * Cria a estrutura da div para uma nova criptomoeda se ela não existir.
 * @param {string} selectedValue - O ID da criptomoeda selecionada.
 */
function criarEstruturaDiv(selectedValue) {
  if (!cryptos.some(c => c.id === selectedValue)) {
    const divId = `div${cryptos.length + Date.now()}`; // ID mais único para evitar colisões
    cryptos.push({ id: selectedValue, divId: divId });

    // A div será criada e adicionada ao DOM pela função carregarDadosCards()
    // Esta função agora apenas atualiza o array 'cryptos'.
    return true; // Indica que uma nova cripto foi adicionada à configuração
  } else {
    alert("Criptomoeda já adicionada!");
    return false; // Indica que a cripto já existia
  }
}

/**
 * Preenche o conteúdo do modal com os dados da criptomoeda.
 * @param {object} coinData - O objeto com os dados da criptomoeda.
 */
function popularModal(coinData) {
  const modalHeader = document.querySelector(".modal-header");
  const modalBody = document.querySelector(".modal-body");

  if (!coinData) {
    console.error("Dados da moeda não fornecidos para o modal.");
    modalBody.innerHTML = "<p>Erro ao carregar dados da moeda.</p>";
    return;
  }

  const {
    name, image, current_price,
    price_change_percentage_24h,
    price_change_percentage_7d_in_currency,
    price_change_percentage_30d_in_currency,
    price_change_percentage_1y_in_currency,
    market_cap, market_cap_rank, high_24h, low_24h, ath, atl, last_updated
  } = coinData;

  // Formatações
  const formatPercent = (val) => (val !== null && val !== undefined ? val.toFixed(2) : "N/A");
  const formatCurrency = (val) => (val !== null && val !== undefined ? val.toLocaleString("en-US", { style: "currency", currency: "USD" }) : "N/A");
  const formatDateTime = (dateStr) => (dateStr ? new Date(dateStr).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }) : "N/A");

  const changeFormatted = formatPercent(price_change_percentage_24h);
  const change7dFormatted = formatPercent(price_change_percentage_7d_in_currency);
  const change30dFormatted = formatPercent(price_change_percentage_30d_in_currency);
  const change1yFormatted = formatPercent(price_change_percentage_1y_in_currency);
  const marketcapFormatted = formatCurrency(market_cap);
  const horarioUTC = formatDateTime(last_updated);

  // Garante que o botão de fechar exista e tenha o listener
  let currentCloseButton = modalHeader.querySelector("#close-modal");
  if (!currentCloseButton) {
    const parentOfHeader = modalHeader.parentNode; // Salva o pai
    modalHeader.innerHTML = ''; // Limpa o header
    currentCloseButton = document.createElement('button');
    currentCloseButton.id = 'close-modal';
    currentCloseButton.textContent = 'Fechar'; // Ou use um ícone <i class="fas fa-times"></i>
    currentCloseButton.addEventListener('click', toggleModal);
    modalHeader.appendChild(currentCloseButton); // Adiciona o botão de volta
     if (parentOfHeader && parentOfHeader.firstChild !== modalHeader) { // Reinsere se necessário
        parentOfHeader.insertBefore(modalHeader, parentOfHeader.firstChild);
    }
  }


  // Conteúdo do cabeçalho do modal (imagem e nome)
  const titleDiv = document.createElement('div');
  titleDiv.style.display = 'flex';
  titleDiv.style.alignItems = 'center';
  titleDiv.style.flexGrow = '1';
  titleDiv.innerHTML = `
    <img src="${image}" alt="${name} logo" style="width: 42px; height: 42px; margin-right: 10px;">
    <h2>${name}</h2>
  `;
  // Limpa o header antes de adicionar novo título, mas depois de garantir o botão de fechar
  const children = Array.from(modalHeader.childNodes);
  children.forEach(child => {
      if (child.id !== 'close-modal') {
          modalHeader.removeChild(child);
      }
  });
  modalHeader.insertBefore(titleDiv, modalHeader.firstChild); // Adiciona o título antes do botão de fechar

  // Conteúdo do corpo do modal
  modalBody.innerHTML = `
    <p>Preço Atual: <strong>$${current_price !== null && current_price !== undefined ? current_price.toLocaleString() : "N/A"}</strong></p>
    <hr>
    <p>Variação 24h: <span style="color:${parseFloat(changeFormatted) >= 0 ? "green" : "#ff4d4d"}; font-weight:bold;">${changeFormatted}%</span></p>
    <p>Variação 7d: <span style="color:${parseFloat(change7dFormatted) >= 0 ? "green" : "#ff4d4d"}; font-weight:bold;">${change7dFormatted}%</span></p>
    <p>Variação 30d: <span style="color:${parseFloat(change30dFormatted) >= 0 ? "green" : "#ff4d4d"}; font-weight:bold;">${change30dFormatted}%</span></p>
    <p>Variação 1 ano: <span style="color:${parseFloat(change1yFormatted) >= 0 ? "green" : "#ff4d4d"}; font-weight:bold;">${change1yFormatted}%</span></p>
    <hr>
    <p>Cap. de Mercado: ${marketcapFormatted}</p>
    <p>Ranking Cap. de Mercado: #${market_cap_rank || "N/A"}</p>
    <hr>
    <p>Maior Preço 24h: <span style="color:green; font-weight:bold;">$${high_24h !== null && high_24h !== undefined ? high_24h.toLocaleString() : "N/A"}</span></p>
    <p>Menor Preço 24h: <span style="color:#ff4d4d; font-weight:bold;">$${low_24h !== null && low_24h !== undefined ? low_24h.toLocaleString() : "N/A"}</span></p>
    <hr>
    <p>ATH (All Time High): <span style="color:green; font-weight:bold;">$${ath !== null && ath !== undefined ? ath.toLocaleString() : "N/A"}</span></p>
    <p>ATL (All Time Low): <span style="color:#ff4d4d; font-weight:bold;">$${atl !== null && atl !== undefined ? atl.toLocaleString() : "N/A"}</span></p>
    <hr>
    <p>Última Atualização: ${horarioUTC}</p>
  `;
}

/**
 * Busca dados da API e renderiza/atualiza todos os cards.
 */
async function carregarDadosCards() {
  const parentEl = document.getElementById("parent");
  if (cryptos.length === 0) {
    parentEl.innerHTML = '<p style="text-align:center; width:100%; padding: 20px; color: var(--text-secondary-color);">Nenhuma criptomoeda adicionada.</p>';
    allCoinsData = [];
    return;
  }

  const ids = cryptos.map((c) => c.id).join(",");
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=30d,7d,1y`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro na API ao buscar dados das moedas: ${response.status}`);
    const data = await response.json();
    allCoinsData = data; // Atualiza os dados globais

    parentEl.innerHTML = ''; // Limpa o container para recriar os cards

    allCoinsData.forEach((coin) => {
      const cryptoConfig = cryptos.find((c) => c.id === coin.id);
      if (!cryptoConfig) return; // Segurança, mas deveria sempre encontrar

      const container = document.createElement('div');
      container.id = cryptoConfig.divId;
      // Adicione classes CSS aqui se necessário, ex: container.classList.add('crypto-card');
      parentEl.appendChild(container);

      const {
        name, symbol, current_price, price_change_percentage_24h, image,
        price_change_percentage_7d_in_currency,
        price_change_percentage_30d_in_currency,
        price_change_percentage_1y_in_currency
      } = coin;

      const formatPercent = (val) => (val !== null && val !== undefined ? val.toFixed(2) : "N/A");
      const changeFormatted = formatPercent(price_change_percentage_24h);
      const change7dFormatted = formatPercent(price_change_percentage_7d_in_currency);
      const change30dFormatted = formatPercent(price_change_percentage_30d_in_currency);
      const change1yFormatted = formatPercent(price_change_percentage_1y_in_currency);

      // Função para renderizar o conteúdo interno do card
      const renderCardContent = (periodoSelecionado = "24h") => {
        let variacaoTexto = "Variação 24h";
        let variacaoValor = changeFormatted;

        switch (periodoSelecionado) {
          case "7d": variacaoTexto = "Variação 7d"; variacaoValor = change7dFormatted; break;
          case "30d": variacaoTexto = "Variação 30d"; variacaoValor = change30dFormatted; break;
          case "1y": variacaoTexto = "Variação 1 ano"; variacaoValor = change1yFormatted; break;
        }

        container.innerHTML = `
          <div class="card-header-info" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <div style="display: flex; align-items: center;">
              <img src="${image}" alt="${name} logo" style="width: 32px; height: 32px; margin-right: 8px;">
              <h2 style="font-size: 1.1em; margin: 0;">${name} (${symbol.toUpperCase()})</h2>
            </div>
            <select class="selecionarPeriodo" data-coin-id="${coin.id}" style="padding: 5px; border-radius: 4px; font-size:0.9em;">
              <option value="24h" ${periodoSelecionado === "24h" ? "selected" : ""}>24h</option>
              <option value="7d" ${periodoSelecionado === "7d" ? "selected" : ""}>7d</option>
              <option value="30d" ${periodoSelecionado === "30d" ? "selected" : ""}>30d</option>
              <option value="1y" ${periodoSelecionado === "1y" ? "selected" : ""}>1a</option>
            </select>
          </div>
          <p style="margin: 5px 0;">Preço atual: <strong>$${current_price !== null && current_price !== undefined ? current_price.toLocaleString() : "N/A"}</strong></p>
          <p style="margin: 5px 0; color:${parseFloat(variacaoValor) >= 0 ? "green" : "red"};">${variacaoTexto}: ${variacaoValor}%</p>
          <button class="removerDivBtn" data-remove-coin-id="${coin.id}" style="background: #ff4d4d; color: white; border: none; padding: 6px; border-radius: 4px; cursor: pointer; font-size:0.8em; margin-top:10px; position: absolute; bottom: 10px; right: 10px;">
            <i class="fa-solid fa-trash"></i>
          </button>
        `;
      };
      renderCardContent(); // Renderiza o conteúdo inicial do card
    });

  } catch (error) {
    console.error("Erro ao carregar dados dos cards:", error);
    parentEl.innerHTML = `<p style="color:red; text-align:center; width:100%; padding: 20px;">Erro ao carregar dados. Aguarde e tente novamente depois de um tempo.</p>`;
  }
}


// --- INICIALIZAÇÃO E EVENT LISTENERS PRINCIPAIS ---
document.addEventListener("DOMContentLoaded", async function () {
  await carregarCriptosNoSelect(); // Popula o select principal

  const botaoAdd = document.getElementById("btnAdd");
  botaoAdd.addEventListener("click", function () {
    const select = document.getElementById("cryptoSelect");
    const selectedValue = select.value;
    if (selectedValue && selectedValue !== "") {
      if (criarEstruturaDiv(selectedValue)) { // Se foi uma nova adição à config
        carregarDadosCards(); // Busca dados e renderiza todos os cards
      }
    } else {
      alert("Selecione uma criptomoeda para adicionar.");
    }
  });

  const parentContainer = document.getElementById("parent");
  parentContainer.addEventListener("click", (event) => {
    const target = event.target;
    const clickedCardDiv = target.closest("#parent > div"); // A div do card

    // Caso 1: Clique no botão de remover
    const removeButton = target.closest(".removerDivBtn");
    if (removeButton) {
      const cryptoIdToRemove = removeButton.dataset.removeCoinId;
      const indexToRemove = cryptos.findIndex(c => c.id === cryptoIdToRemove);
      if (indexToRemove > -1) {
        cryptos.splice(indexToRemove, 1); // Remove da configuração
        // A remoção do DOM e de allCoinsData acontecerá na próxima chamada de carregarDadosCards()
        carregarDadosCards(); // Re-renderiza os cards restantes
      }
      return; // Impede que o modal abra
    }

    // Caso 2: Clique em um card (mas não no select ou botão de remover)
    if (clickedCardDiv && !target.closest(".selecionarPeriodo")) {
      const cardId = clickedCardDiv.id; // Este é o divId (ex: "div1", "div162...")
      const cryptoConfig = cryptos.find(c => c.divId === cardId);

      if (cryptoConfig) {
        const coinData = allCoinsData.find(c => c.id === cryptoConfig.id);
        if (coinData) {
          popularModal(coinData);
          toggleModal();
        } else {
          console.error("Dados da moeda não encontrados para o modal:", cryptoConfig.id);
        }
      }
    }
  });

  // Listener para mudança no select de período DENTRO dos cards
  parentContainer.addEventListener('change', function(event) {
    const targetSelect = event.target;
    if (targetSelect.classList.contains('selecionarPeriodo')) {
      const coinId = targetSelect.dataset.coinId;
      const selectedPeriod = targetSelect.value;

      // Encontra o card e os dados da moeda para re-renderizar apenas esse card
      const cryptoConfig = cryptos.find(c => c.id === coinId);
      const coinData = allCoinsData.find(c => c.id === coinId);
      const cardDiv = document.getElementById(cryptoConfig.divId);

      if (cardDiv && coinData && cryptoConfig) {
        const {
            name, symbol, current_price, price_change_percentage_24h, image,
            price_change_percentage_7d_in_currency,
            price_change_percentage_30d_in_currency,
            price_change_percentage_1y_in_currency
        } = coinData;

        const formatPercent = (val) => (val !== null && val !== undefined ? val.toFixed(2) : "N/A");
        const changeFormatted = formatPercent(price_change_percentage_24h);
        const change7dFormatted = formatPercent(price_change_percentage_7d_in_currency);
        const change30dFormatted = formatPercent(price_change_percentage_30d_in_currency);
        const change1yFormatted = formatPercent(price_change_percentage_1y_in_currency);

        let variacaoTexto = "Variação 24h";
        let variacaoValor = changeFormatted;

        switch (selectedPeriod) {
            case "7d": variacaoTexto = "Variação 7d"; variacaoValor = change7dFormatted; break;
            case "30d": variacaoTexto = "Variação 30d"; variacaoValor = change30dFormatted; break;
            case "1y": variacaoTexto = "Variação 1 ano"; variacaoValor = change1yFormatted; break;
        }

        cardDiv.innerHTML = `
            <div class="card-header-info" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <div style="display: flex; align-items: center;">
                <img src="${image}" alt="${name} logo" style="width: 32px; height: 32px; margin-right: 8px;">
                <h2 style="font-size: 1.1em; margin: 0;">${name} (${symbol.toUpperCase()})</h2>
              </div>
              <select class="selecionarPeriodo" data-coin-id="${coinId}" style="padding: 5px; border-radius: 4px; font-size:0.9em;">
                <option value="24h" ${selectedPeriod === "24h" ? "selected" : ""}>24h</option>
                <option value="7d" ${selectedPeriod === "7d" ? "selected" : ""}>7d</option>
                <option value="30d" ${selectedPeriod === "30d" ? "selected" : ""}>30d</option>
                <option value="1y" ${selectedPeriod === "1y" ? "selected" : ""}>1a</option>
              </select>
            </div>
            <p style="margin: 5px 0;">Preço atual: <strong>$${current_price !== null && current_price !== undefined ? current_price.toLocaleString() : "N/A"}</strong></p>
            <p style="margin: 5px 0; color:${parseFloat(variacaoValor) >= 0 ? "green" : "red"};">${variacaoTexto}: ${variacaoValor}%</p>
            <button class="removerDivBtn" data-remove-coin-id="${coinId}" style="background: #ff4d4d; color: white; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size:0.8em; margin-top:10px;">
              <i class="fa-solid fa-trash" style="margin-right: 5px;"></i>Remover
            </button>
        `;
      }
    }
  });

  carregarDadosCards(); // Carrega os dados dos cards iniciais (ex: Bitcoin)
});
