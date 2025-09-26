document.addEventListener('DOMContentLoaded', () => {
  const btnCadastrar = document.getElementById('btnCadastrar');
  const mensagemCadastro = document.getElementById('mensagem-cadastro');

  const showMessage = (msg, tipo = 'erro') => {
    mensagemCadastro.textContent = msg;
    mensagemCadastro.className = tipo === 'sucesso' ? 'mensagem-sucesso' : 'mensagem-erro';

    const alerta = document.createElement('div');
    alerta.textContent = msg;
    alerta.className = tipo === 'sucesso' ? 'alerta-sucesso' : 'alerta-erro';
    document.body.appendChild(alerta);

    setTimeout(() => alerta.remove(), 3500);
  };

  const validateEmailFormat = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };

  btnCadastrar.addEventListener('click', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    // CONVERTE O E-MAIL PARA MINÚSCULAS ANTES DE VALIDAR E ENVIAR
    const email = document.getElementById('email').value.trim().toLowerCase(); 
    const senha = document.getElementById('senha').value.trim();

    if (!nome || !email || !senha) {
      showMessage('⚠️ Preencha todos os campos.', 'erro');
      return;
    }
    
    if (!validateEmailFormat(email)) {
      showMessage('⚠️ Formato de e-mail inválido.', 'erro');
      return;
    }

    const regexSenha = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
    if (!regexSenha.test(senha)) {
      showMessage('⚠️ Senha inválida! Mínimo 8 caracteres, 1 letra maiúscula e 1 símbolo.', 'erro');
      return;
    }

    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomeUsuario: nome,
          emailUsuario: email, // Usa o e-mail já em minúsculas
          senhaUsuario: senha,
          statusUsuario: 'ativo',
          tipoUsuario: 'comum'
        })
      });

      const data = await res.json();
      console.log('Resposta do backend:', data);

      if (res.ok) {
        showMessage('✅ Cadastro realizado com sucesso!', 'sucesso');
        setTimeout(() => window.location.href = 'login.html', 1500);
      } else {
        if (data.error && data.error.toLowerCase().includes('email')) {
          showMessage('❌ Este e-mail já está cadastrado.', 'erro');
        } else {
          showMessage('❌ Erro no cadastro: ' + (data.error || 'Validation error'), 'erro');
        }
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      showMessage('❌ Erro de conexão com o servidor.', 'erro');
    }
  });
});