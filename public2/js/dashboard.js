document.addEventListener('DOMContentLoaded', function () {
  // REGISTRE O PLUGIN DATALABELS GLOBALMENTE
  Chart.register(ChartDataLabels);

  // Função para determinar a cor do texto do datalabel
  function getDatalabelColor(context) {
    const backgroundColor = context.dataset.backgroundColor[context.dataIndex];
    if (backgroundColor === '#ffc000' || backgroundColor === '#e0e0e0') {
      return '#000';
    }
    return '#fff';
  }

  // Função para buscar dados da API e renderizar o gráfico de denúncias
  async function renderDenunciasChart(idUsuario) {
    try {
      const response = await fetch(`/api/dashboard/denuncias/${idUsuario}`);
      if (!response.ok) {
        throw new Error('Falha ao carregar dados das denúncias.');
      }
      const data = await response.json();

      const labels = data.length > 0 ? data.map(item => item.statusDenuncia) : ['Nenhum registro'];
      const values = data.length > 0 ? data.map(item => item.total) : [1]; // Valor para o gráfico de pizza não ficar vazio
      const total = data.length > 0 ? values.reduce((acc, curr) => acc + curr, 0) : 0;

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
                if (total === 0) {
                  return '0%';
                }
                return `${((value / total) * 100).toFixed(2)}%`;
              },
              color: (context) => getDatalabelColor(context),
              font: { weight: 'bold' },
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

  // Função para buscar dados da API e renderizar o gráfico de usuários
  async function renderUsuariosChart(idUsuario) {
    try {
      const response = await fetch(`/api/dashboard/usuarios/${idUsuario}`);
      if (!response.ok) {
        throw new Error('Falha ao carregar dados dos usuários.');
      }
      const data = await response.json();

      const labels = data.length > 0 ? data.map(item => item.statusUsuario) : ['Nenhum registro'];
      const values = data.length > 0 ? data.map(item => item.total) : [1]; // Valor para o gráfico não ficar vazio
      const total = data.length > 0 ? values.reduce((acc, curr) => acc + curr, 0) : 0;

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
                if (total === 0) {
                  return '0%';
                }
                return `${((value / total) * 100).toFixed(2)}%`;
              },
              color: (context) => getDatalabelColor(context),
              font: { weight: 'bold' },
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

  // Função para inicializar o dashboard
  function initDashboard() {
    const idUsuario = localStorage.getItem('idUsuario');
    if (!idUsuario) {
      console.error('ID de usuário não encontrado no localStorage. O dashboard não será carregado.');
      alert('Sua sessão expirou ou não foi possível identificar o usuário. Por favor, faça login novamente.');
      window.location.href = 'loginadm.html';
      return;
    }
    renderDenunciasChart(idUsuario); 
    renderUsuariosChart(idUsuario);
  }

  initDashboard();
});