document.addEventListener("DOMContentLoaded", async () => {
  const fotoInput = document.getElementById("fotoUsuario");
  const imgPreview = document.getElementById("imgPreview");
  const nomeUsuarioEl = document.getElementById("nomeUsuario");
  const emailUsuarioEl = document.getElementById("emailUsuario");
  const tipoUsuarioEl = document.getElementById("tipoUsuario");
  const btnSalvar = document.getElementById("btnSalvar");

  // Pega o email do usuário logado do sessionStorage
  const emailLogado = sessionStorage.getItem("usuarioLogado");
  if (!emailLogado) {
    alert("Usuário não está logado!");
    window.location.href = "login.html";
    return;
  }

  // Define os campos de nome e email como somente leitura
  nomeUsuarioEl.readOnly = true;
  emailUsuarioEl.readOnly = true;

  // Função para carregar os dados do perfil
  const carregarPerfil = async () => {
    try {
      const res = await fetch(`/api/userprofile/${encodeURIComponent(emailLogado)}`);
      
      if (!res.ok) {
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

      const res = await fetch(`/api/userprofile/${encodeURIComponent(emailLogado)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao salvar perfil");
      }

      await res.json(); // garante que JSON seja consumido

      Swal.fire({
        icon: "success",
        title: "Perfil atualizado!",
        text: "Suas informações foram salvas com sucesso.",
        confirmButtonText: "Beleza 👍"
      });

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: err.message
      });
    }
  });
});