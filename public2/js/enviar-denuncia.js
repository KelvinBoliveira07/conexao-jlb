document.addEventListener('DOMContentLoaded', () => {
    const idUsuario = localStorage.getItem('idUsuario'); 
    const formularioDenuncia = document.querySelector('.formulario-denuncia');
    const categoriaSelect = document.getElementById('categoria');

    if (!idUsuario) {
        alert('Você precisa estar logado para criar uma denúncia.');
        window.location.href = 'login.html';
        return;
    }

    formularioDenuncia.addEventListener('submit', async (e) => {
        e.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const categoria = parseInt(categoriaSelect.value, 10);
        const descricao = document.getElementById('descricao').value;

        try {
            const response = await fetch('/api/denuncias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tituloDenuncia: titulo,
                    idCategoria: categoria,
                    descricaoDenuncia: descricao,
                    idUsuario: idUsuario,
                }),
            });

            if (response.ok) {
                alert('Denúncia enviada com sucesso! Você será redirecionado.');
                window.location.href = 'minhasdenuncias.html';
            } else {
                const data = await response.json();
                alert('Erro ao enviar denúncia: ' + data.error);
            }
        } catch (error) {
            console.error('Erro de rede:', error);
            alert('Ocorreu um erro ao tentar conectar com o servidor.');
        }
    });
});
