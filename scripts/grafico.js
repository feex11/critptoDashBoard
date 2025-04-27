document.addEventListener("DOMContentLoaded", async function () {

const ctx = document.getElementById('grafico').getContext('2d');

let label = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];
let dataGraph = [65, 59, 80, 81, 56, 55, 40]; 

const data = {
  labels: label,
  datasets: [
    {
      label: 'Valor em $',
      data: dataGraph,
      fill: false,
      borderColor: '#0077b6',
      tension: 0.1
    },

  ]
};

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
      }
    }
  }
};

const myChart = new Chart(ctx, config);

function gerarUltimos12Meses() {
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    const hoje = new Date();
    const labels = [];

    for (let i = 11; i >= 0; i--) {
        const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
        labels.push(meses[data.getMonth()] + ' ' + data.getFullYear());
    }

    return labels;
}

function gerarUltimos30Dias() {
    const hoje = new Date();
    const labels = [];
    
    for (let i = 30; i >= 0; i -= 1) {
        const data = new Date();
        data.setDate(hoje.getDate() - i);

        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = String(data.getFullYear()).replace("20", "");
        
        labels.push(`${dia}/${mes}/${ano}`);
    }
    
    return labels;
}

function gerarUltimas24Horas() {
    const hoje = new Date();
    const labels = [];

    for (let i = 23; i >= 0; i -= 1) {
        const data = new Date();
        data.setHours(hoje.getHours() - i);

        const hora = String(data.getHours()).padStart(2, '0');
        const minuto = String(data.getMinutes()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');

        
        labels.push(`${hora}:${minuto}/${mes}`);
    }
    
    return labels;
}

document.getElementById('anual').addEventListener('click', function() {
    myChart.data.labels = gerarUltimos12Meses();
    myChart.update();
});

document.getElementById('mensal').addEventListener('click', function() {
    myChart.data.labels = gerarUltimos30Dias();
    myChart.update();
});

document.getElementById('diario').addEventListener('click', function() {
    myChart.data.labels = gerarUltimas24Horas();
    myChart.update();
});


});