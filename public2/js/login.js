document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('btnLogin');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const mensagemLogin = document.getElementById('mensagem-login');

  const showMessage = (msg, tipo = 'erro') => {
    mensagemLogin.textContent = msg;
    mensagemLogin.className = tipo === 'sucesso' ? 'mensagem-sucesso' : 'mensagem-erro';

    const alerta = document.createElement('div');
    alerta.textContent = msg;
    alerta.className = tipo === 'sucesso' ? 'alerta-sucesso' : 'alerta-erro';
    document.body.appendChild(alerta);
    setTimeout(() => alerta.remove(), 3000);
  };

  loginButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!email || !senha) {
      showMessage('⚠️ Preencha o email e a senha.', 'erro');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailUsuario: email.toLowerCase(), senhaUsuario: senha })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('idUsuario', data.usuario.idUsuario);
        showMessage('✅ Login bem-sucedido!', 'sucesso');
        setTimeout(() => window.location.href = 'telainiciuser.html', 1500);
      } else {
        showMessage('❌ Erro no login: ' + (data.error || 'Credenciais inválidas.'), 'erro');
      }
    } catch (error) {
      console.error(error);
      showMessage('❌ Erro de conexão com o servidor.', 'erro');
    }
  });
});