function validarFormulario(formulario) {
    var usuario = formulario.querySelector('input[type="text"]').value;
    var contrasena = formulario.querySelector('input[type="password"]').value;

    if (usuario !== '' && contrasena !== '') {
      return true; // Permite el envío del formulario
    } else {
      alert("Por favor, completa todos los campos antes de iniciar sesión.");
      return false; // Evita el envío del formulario
    }
  }