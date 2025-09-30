document.addEventListener('DOMContentLoaded', function () {
  // REGISTRE O PLUGIN DATALABELS GLOBALMENTE
  Chart.register(ChartDataLabels);

  // Função para determinar a cor do texto do datalabel
  function getDatalabelColor(context) {
    const backgroundColor = context.dataset.backgroundColor[context.dataIndex];
    // Use preto em fundos mais claros, branco em fundos escuros
    if (backgroundColor === '#e0e0e0' || backgroundColor === '#ffc000') {
      return '#000';
    }
    return '#fff';
  }

  // Função para buscar dados da API e renderizar o gráfico de denúncias
  async function renderDenunciasChart() {
    try {
      const response = await fetch('/api/dashboard/denuncias');
      if (!response.ok) {
        throw new Error('Falha ao carregar dados das denúncias.');
      }
      const data = await response.json();

      let labels;
      let values;
      let total;

      if (data.length === 0) {
        labels = ['Em Andamento', 'Aprovadas', 'Anuladas / Arquivadas'];
        values = [1, 1, 1]; // Valores iguais para o gráfico ter fatias de mesmo tamanho
        total = 0; // O total de denúncias é 0
      } else {
        labels = data.map(item => item.statusDenuncia);
        values = data.map(item => item.total);
        total = values.reduce((acc, curr) => acc + curr, 0);
      }
      
      const denunciasConfig = {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: ['#ffc000', '#0070c0', '#c00000'],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function(context) {
                  if (total === 0) {
                    return 'Ainda não há denúncias registradas';
                  }
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  const totalValue = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
                  const percentage = ((value / totalValue) * 100).toFixed(2);
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            },
            datalabels: {
                formatter: (value, context) => {
                    let percentage;
                    if (total === 0) {
                        return '0%';
                    }
                    percentage = ((value / total) * 100).toFixed(2);
                    return `${percentage}%`;
                },
                color: (context) => getDatalabelColor(context),
                font: {
                    weight: 'bold',
                },
                textAlign: 'center',
            }
          }
        }
      };

      const denunciasCtx = document.getElementById('denunciasChart');
      new Chart(denunciasCtx, denunciasConfig);

      document.getElementById('denuncias-total').textContent = `Total: ${total}`;

    } catch (error) {
      console.error('Erro ao buscar dados de denúncias:', error);
    }
  }

  async function renderUsuariosChart() {
    try {
      const response = await fetch('/api/dashboard/usuarios'); 
      if (!response.ok) {
        throw new Error('Falha ao carregar dados dos usuários.');
      }
      const data = await response.json();
      const total = data.map(item => item.total).reduce((acc, curr) => acc + curr, 0);

      const labels = data.map(item => item.statusUsuario);
      const values = data.map(item => item.total);

      const usuariosConfig = {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: ['#1565c0', '#e0e0e0'], 
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  const totalValue = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
                  const percentage = ((value / totalValue) * 100).toFixed(2);
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            },
            datalabels: {
                formatter: (value, context) => {
                    const percentage = (value / total * 100).toFixed(2);
                    return `${percentage}%`;
                },
                color: (context) => getDatalabelColor(context),
                font: {
                    weight: 'bold',
                },
                textAlign: 'center',
            }
          }
        }
      };

      const usuariosCtx = document.getElementById('usuariosChart');
      new Chart(usuariosCtx, usuariosConfig);

      document.getElementById('usuarios-total').textContent = `Total: ${total}`;

    } catch (error) {
      console.error('Erro ao buscar dados de usuários:', error);
    }
  }

  renderDenunciasChart(); 
  renderUsuariosChart();
});