document.addEventListener('DOMContentLoaded', () => {
    const listaDenunciasContainer = document.querySelector('.lista-denuncias');
    const idUsuario = localStorage.getItem('idUsuario'); 

    if (!idUsuario) {
        alert('Você precisa estar logado para ver suas denúncias.');
        window.location.href = 'login.html';
        return;
    }

    async function carregarMinhasDenuncias() {
        try {
            const response = await fetch(`/api/denuncias/minhas/${idUsuario}`);
            const denuncias = await response.json();

            listaDenunciasContainer.innerHTML = ''; 

            if (denuncias.length === 0) {
                listaDenunciasContainer.innerHTML = '<p>Nenhuma denúncia encontrada.</p>';
            } else {
                denuncias.forEach(denuncia => {
                    const denunciaDiv = document.createElement('div');
                    denunciaDiv.className = 'denuncia';
                    
                    let statusClass = '';
                    if (denuncia.statusDenuncia === 'Em andamento') {
                        statusClass = 'andamento';
                    } else if (denuncia.statusDenuncia === 'Aprovada') {
                        statusClass = 'aprovada';
                    } else if (denuncia.statusDenuncia === 'Rejeitada') {
                        statusClass = 'rejeitada';
                    }

                    const dataCriacao = new Date(denuncia.createdAt || new Date()).toLocaleDateString('pt-BR');

                    denunciaDiv.innerHTML = `
                        <h3>${denuncia.tituloDenuncia} - ${dataCriacao}</h3>
                        <span class="status ${statusClass}">${denuncia.statusDenuncia}</span>
                        <button class="btn-visualizar" onclick="visualizarDenuncia(${denuncia.idDenuncia})">Visualizar</button>
                    `;
                    listaDenunciasContainer.appendChild(denunciaDiv);
                });
            }
        } catch (error) {
            console.error('Erro ao carregar denúncias:', error);
            listaDenunciasContainer.innerHTML = '<p>Erro ao carregar suas denúncias. Tente novamente mais tarde.</p>';
        }
    }

    window.visualizarDenuncia = (idDenuncia) => {
        alert(`Visualizando a denúncia com ID: ${idDenuncia}`);
    };

    carregarMinhasDenuncias();
});