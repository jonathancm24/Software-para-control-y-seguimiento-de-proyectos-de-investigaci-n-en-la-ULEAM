const registroForm = document.getElementById('registroForm');
    const passInput = document.getElementById('pass');
    const passConfirmaInput = document.getElementById('passConfirma');
    const mensajeError = document.getElementById('mensajeError');

    registroForm.addEventListener('submit', function (e) {
      if (passInput.value !== passConfirmaInput.value) {
        e.preventDefault(); // Evita que el formulario se envíe
        mensajeError.textContent = 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.';
      }
    });