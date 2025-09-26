// js/perfil-link.js
document.addEventListener('DOMContentLoaded', () => {
  // Botão que abre o perfil
  const btnPerfil = document.querySelector('.botao-perfil, .menu-botao.perfil');
  if (btnPerfil) {
    btnPerfil.addEventListener('click', () => {
      sessionStorage.setItem('paginaAnterior', window.location.href);
      window.location.href = 'perfiluser.html';
    });
  }

  // Botão de voltar na página de perfil
  const btnVoltar = document.querySelector('.btn-voltar');
  if (btnVoltar) {
    btnVoltar.addEventListener('click', () => {
      const paginaAnterior = sessionStorage.getItem('paginaAnterior');
      if (paginaAnterior) {
        window.location.href = paginaAnterior;
      } else {
        window.location.href = 'telainiciuser.html';
      }
    });
  }
});
