document.addEventListener('DOMContentLoaded', () => {
    const linkEsqueceuSenha = document.getElementById('linkEsqueceuSenha');
    const modalRedefinirSenha = document.getElementById('modalRedefinirSenha');
    const btnFecharModal = document.getElementById('btnFecharModal');
    const formRedefinirSenha = document.getElementById('form-redefinir-senha');
    const btnVerificar = document.getElementById('btnVerificar');
    const mensagemDiv = document.getElementById('mensagem-status');
    const etapaVerificacao = document.getElementById('etapa-verificacao');
    const etapaSenha = document.getElementById('etapa-senha');

    const showMessage = (msg, tipo = 'erro') => {
        mensagemDiv.textContent = msg;
        mensagemDiv.className = tipo === 'sucesso' ? 'mensagem-sucesso' : 'mensagem-erro';
    };

    const regexSenha = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
    
    // Abrir modal
    linkEsqueceuSenha.addEventListener('click', (e) => {
        e.preventDefault();
        modalRedefinirSenha.classList.add('show');
        document.body.classList.add('modal-open');
        // Reseta o formulário e a etapa ao abrir
        formRedefinirSenha.reset();
        showMessage('');
        etapaVerificacao.style.display = 'block';
        etapaSenha.style.display = 'none';
    });

    // Fechar modal
    btnFecharModal.addEventListener('click', () => {
        modalRedefinirSenha.classList.remove('show');
        document.body.classList.remove('modal-open');
        // Reseta o formulário e a etapa ao fechar
        formRedefinirSenha.reset();
        showMessage('');
        etapaVerificacao.style.display = 'block';
        etapaSenha.style.display = 'none';
    });

    // Lógica do botão "Verificar" dentro do modal
    btnVerificar.addEventListener('click', async () => {
        const email = document.getElementById('email-modal').value.trim().toLowerCase();
        const nome = document.getElementById('nome-modal').value.trim();

        if (!email || !nome) {
            showMessage('⚠️ Preencha todos os campos.', 'erro');
            return;
        }

        try {
            const res = await fetch('/api/verificar-usuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailUsuario: email, nomeUsuario: nome })
            });

            if (res.ok) {
                showMessage('✅ Verificação bem-sucedida!', 'sucesso');
                setTimeout(() => {
                    etapaVerificacao.style.display = 'none';
                    etapaSenha.style.display = 'block';
                    showMessage('');
                }, 1500);
            } else {
                const data = await res.json();
                showMessage('❌ ' + (data.error || 'E-mail ou nome de usuário incorretos.'), 'erro');
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            showMessage('❌ Erro de conexão com o servidor.', 'erro');
        }
    });

    // Lógica do formulário de redefinição de senha (envio final)
    formRedefinirSenha.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email-modal').value.trim().toLowerCase();
        const nome = document.getElementById('nome-modal').value.trim();
        const novaSenha = document.getElementById('nova-senha').value.trim();

        if (!novaSenha) {
            showMessage('⚠️ Preencha a nova senha.', 'erro');
            return;
        }
        
        if (!regexSenha.test(novaSenha)) {
            showMessage('⚠️ Senha inválida! Mínimo 8 caracteres, 1 letra maiúscula e 1 símbolo.', 'erro');
            return;
        }

        try {
            const res = await fetch('/api/redefinir-senha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailUsuario: email, nomeUsuario: nome, novaSenha: novaSenha })
            });

            const data = await res.json();

            if (res.ok) {
                showMessage(''); 
                window.alert('✅ Senha redefinida com sucesso!');
                modalRedefinirSenha.classList.remove('show');
                document.body.classList.remove('modal-open');
                formRedefinirSenha.reset();
            } else {
                showMessage('❌ ' + (data.error || 'Erro ao redefinir a senha.'), 'erro');
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            showMessage('❌ Erro de conexão com o servidor.', 'erro');
        }
    });
});