document.addEventListener("DOMContentLoaded", function() {
  // Obtener el valor del parámetro 'email' de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('email');
  
  // Rellenar el campo de correo en el formulario si se proporcionó un correo electrónico
  if (email) {
    document.getElementById('email').value = email;
  }
  
  // Escuchar el evento submit del formulario
  document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario
  
    // Obtener el valor del campo de correo electrónico
    const email = document.getElementById('email').value;
  
    // Realizar las acciones necesarias con el correo electrónico, por ejemplo, enviarlo a un servidor, almacenarlo en una base de datos, etc.
    console.log('Correo electrónico registrado:', email);
    
    // Redirigir al usuario a otra página después de registrar el correo electrónico
    window.location.href = 'gracias.html';
  });
});