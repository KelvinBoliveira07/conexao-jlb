document.addEventListener("DOMContentLoaded", async () => {
  const fotoInput = document.getElementById("fotoUsuario");
  const imgPreview = document.getElementById("imgPreview");
  const nomeUsuarioEl = document.getElementById("nomeUsuario");
  const emailUsuarioEl = document.getElementById("emailUsuario");
  const tipoUsuarioEl = document.getElementById("tipoUsuario");
  const btnSalvar = document.getElementById("btnSalvar");

  // Pega o ID do usuário logado do localStorage
  const idLogado = localStorage.getItem("idUsuario");
  if (!idLogado) {
    alert("Sessão expirada ou usuário não logado. Por favor, faça login novamente.");
    window.location.href = "login.html";
    return;
  }

  // Define os campos de nome e email como somente leitura
  nomeUsuarioEl.readOnly = true;
  emailUsuarioEl.readOnly = true;

  // Função para carregar os dados do perfil
  const carregarPerfil = async () => {
    try {
      // Usa a nova rota com o ID do usuário
      const res = await fetch(`/api/userprofile/${idLogado}`);
      
      if (!res.ok) {
        // Se a resposta não for OK (por exemplo, 404), lança um erro
        const data = await res.json();
        throw new Error(data.error || "Erro ao carregar perfil");
      }

      const data = await res.json();

      // Preenche HTML com dados
      nomeUsuarioEl.value = data.nomeUsuario;
      emailUsuarioEl.value = data.emailUsuario;
      tipoUsuarioEl.value = data.tipoUsuario;
      imgPreview.src = data.fotoUsuario || "./Imagens/avatars/perfildefault.png";
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar perfil: " + err.message);
    }
  };

  await carregarPerfil();

  // Preview da foto
  fotoInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        imgPreview.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Botão salvar alterações
  btnSalvar.addEventListener("click", async () => {
    try {
      const payload = {
        nomeUsuario: nomeUsuarioEl.value.trim(),
        fotoUsuario: imgPreview.src // envia base64
      };

      // Usa a nova rota com o ID do usuário
      const res = await fetch(`/api/userprofile/${idLogado}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao salvar perfil");
      }

      const data = await res.json();

      // Verifique se o SweetAlert2 (Swal.fire) está incluído
      // O erro "Swal is not defined" pode ocorrer se a biblioteca não estiver presente.
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: "success",
          title: "Perfil atualizado!",
          text: "Suas informações foram salvas com sucesso.",
          confirmButtonText: "Beleza 👍"
        });
      } else {
        alert("Perfil atualizado com sucesso!");
      }

    } catch (err) {
      console.error(err);
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: err.message
        });
      } else {
        alert("Erro ao salvar perfil: " + err.message);
      }
    }
  });
});