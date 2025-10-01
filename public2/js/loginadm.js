document.addEventListener('DOMContentLoaded', () => {
  const btnLoginAdm = document.getElementById('btnLoginAdm');
  const emailAdm = document.getElementById('emailAdm');
  const senhaAdm = document.getElementById('senhaAdm');

  const showMessage = (msg, tipo = 'erro') => {
    const alerta = document.createElement('div');
    alerta.textContent = msg;
    alerta.className = tipo === 'sucesso' ? 'alerta-sucesso' : 'alerta-erro';
    document.body.appendChild(alerta);

    setTimeout(() => alerta.remove(), 3000);
  };

  if (btnLoginAdm) {
    btnLoginAdm.addEventListener('click', async (event) => {
      event.preventDefault();

      const email = emailAdm.value.trim();
      const senha = senhaAdm.value.trim();

      if (!email || !senha) {
        showMessage('⚠️ Preencha todos os campos', 'erro');
        return;
      }

      showMessage('⏳ Aguarde...', 'sucesso');

      try {
        const res = await fetch('/api/auth/loginadm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailUsuario: email, senhaUsuario: senha })
        });

        const data = await res.json();

        if (res.ok) {
          if (data.usuario && data.usuario.idUsuario) {
            localStorage.setItem('idUsuario', data.usuario.idUsuario);
          }
          
          showMessage('✅ Login ADM realizado!', 'sucesso');
          setTimeout(() => window.location.href = '/painelcontrole.html', 1500);
        } else {
          showMessage('❌ Erro no login: ' + (data.error || 'Credenciais inválidas.'), 'erro');
        }
      } catch (err) {
        console.error(err);
        showMessage('❌ Erro na conexão com o servidor', 'erro');
      }
    });
  }
});