/**
 * cbpFWTabs.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * https://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
;
(function(window) {

  'use strict';

  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function CBPFWTabs(el, options) {
    this.el = el;
    this.options = extend({}, this.options);
    extend(this.options, options);
    this._init();
  }

  CBPFWTabs.prototype.options = {
    start: 0
  };

  CBPFWTabs.prototype._init = function() {
    // tabs elems
    this.tabs = [].slice.call(this.el.querySelectorAll('nav > ul > li'));
    // content items
    this.items = [].slice.call(this.el.querySelectorAll('.content-wrap > section'));
    // current index
    this.current = -1;
    // show current content item
    this._show();
    // init events
    this._initEvents();
  };

  CBPFWTabs.prototype._initEvents = function() {
    var self = this;
    this.tabs.forEach(function(tab, idx) {
      tab.addEventListener('click', function(ev) {
        ev.preventDefault();
        self._show(idx);
      });
    });
  };

  CBPFWTabs.prototype._show = function(idx) {
    if (this.current >= 0) {
      this.tabs[this.current].className = this.items[this.current].className = '';
    }
    // change current
    this.current = idx != undefined ? idx : this.options.start >= 0 && this.options.start < this.items.length ? this.options.start : 0;
    this.tabs[this.current].className = 'tab-current';
    this.items[this.current].className = 'content-current';
  };

  // add to global namespace
  window.CBPFWTabs = CBPFWTabs;

})(window);





////////////////////////////
////////////////////////////
// CALL IT
////////////////////////////
////////////////////////////
(function() {

  [].slice.call(document.querySelectorAll('.tabs')).forEach(function(el) {
    new CBPFWTabs(el);
  });

})();
// Detectar cuando un campo de formulario obtiene el enfoque
var formFields = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
for (var i = 0; i < formFields.length; i++) {
  formFields[i].addEventListener('focus', function() {
    // Desplazar la ventana hacia arriba
    window.scrollTo(0, this.offsetTop - 100); // Ajusta el valor -100 según sea necesario
  });
}



//LoginLogic

const form = document.getElementById('login-form');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío del formulario

  // Autoriza el acceso a la hoja de cálculo
  gapi.load('client', function() {
    gapi.client.init({
      apiKey: 'AIzaSyC7trVxLML3qsNu1jYg7Qmmgc-RuWsMZg8'
    }).then(function() {
      return gapi.client.load('sheets', 'v4');
    }).then(function() {
      // Obtiene los datos de la hoja de cálculo
      return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1hSQRfY-Qov93K9MJCZRDY3ojA-3wr2IiWOiwomCKrSE',
        range: 'Registros!A:P' // Considera todas las columnas necesarias para la búsqueda
      });
    }).then(function(response) {
      const data = response.result.values;
      const username = form.username.value;
      const password = form.password.value;
      let authenticated = false;
      let userData = null;
      let activationRequired = false;

      // Busca el usuario y la contraseña en los datos obtenidos de la hoja de cálculo
for (let i = 0; i < data.length; i++) {
  if (data[i][3] === username && (data[i][4] === password || data[i][6] === password)) {
    if (data[i][8] === "") {
      activationRequired = true;
      break;
    }

    authenticated = true;
    userData = data[i];
    break;
  }
}

      if (authenticated) {
        const accessSection = document.getElementById('section-index');
        const hiddenSection = document.getElementById('hidden-section');

        accessSection.style.display = 'none';
        hiddenSection.style.display = 'block';
        hiddenSection.scrollIntoView({ behavior: 'smooth' });

        // Aquí puedes utilizar los datos de la fila para incrustarlos en diferentes partes de la sección oculta
        const userId = userData[0]; 
        const userName = userData[1]; 
        const nombre = userData[1];
        const userEmail = userData[3]; 
        const userPhoto = userData[15];
        const profesion = userData[1];
        const acerca = userData[1];
        const ubicacion = userData[1];
        const tel = userData[1];
        const email = userData[1];
        const edad = userData[1];
        const exp = userData[1];
        const foto = userData[15];
        
        // ...
       
        // Ejemplo de incrustación de los datos en elementos HTML
        const userIdElement = document.getElementById('user-id');
        userIdElement.textContent = userId;

        const userNameElement = document.getElementById('user-name');
        userNameElement.textContent = userName;
        
        const nombreElement = document.getElementById('nombre');
        nombreElement.textContent = nombre;
        
        const profesionElement = document.getElementById('profesion');
        profesionElement.textContent = profesion;
        
        const acercaElement = document.getElementById('acerca');
        acercaElement.textContent = acerca;
        
        const ubicacionElement = document.getElementById('ubicacion');
        ubicacionElement.textContent = ubicacion;
        
        const telElement = document.getElementById('tel');
        telElement.textContent = tel;
        
        const emailElement = document.getElementById('email');
        emailElement.textContent = email;
        
        const edadElement = document.getElementById('edad');
        edadElement.textContent = edad;
        
        const expElement = document.getElementById('exp');
        expElement.textContent = exp;

const userEmailElement = document.getElementById('user-email');
        userEmailElement.textContent = userEmail;
        
const userPhotoElement = document.getElementById('user-photo');

if (userPhoto) {
  userPhotoElement.setAttribute('src', userPhoto);
} else {
  userPhotoElement.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/3237/3237472.png'); 
}  
        
const fotoElement = document.getElementById('foto');

if (foto) {
  fotoElement.setAttribute('src', foto);
} else {
  fotoElement.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/3237/3237472.png'); 
}  
        
        // Continúa incrustando los demás datos en los elementos HTML correspondientes
     } else if (activationRequired) {
       Swal.fire({
                        icon: 'info',
                        title: 'Falta Activación de Usuario',
                        text: 'Por favor revisa tu correo, y en él encontrarás la forma de activar tu cuenta, puede estar en spam o correo no deseado',
                        confirmButtonText: 'Entendido'
                    });
      } else {
        Swal.fire({
                        icon: 'error',
                        title: 'Usuario o Contraseña Incorrectos',
                        text: 'Intenta de nuevo',
                        confirmButtonText: 'Entendido'
                    });
      }
    });
  });
});

//Sidebar

        let timerId;
    let isFirstInteraction = true;

    const handleSidebarView = () => {
      const sidebarContainer = document.querySelector('.sidebar-container');
      const sidebarWrapper = document.querySelector('.sidebar-wrapper');
      const sidebarProfileSection = document.querySelector('.sidebar-profileSection');
      const viewButton = document.querySelector('.sidebar-viewButton');
      const viewButtonSvg = document.querySelector('.sidebar-viewButton svg');

      if (sidebarContainer.classList.contains('hidden')) {
        sidebarContainer.style.transform = 'translateX(0)';
        sidebarContainer.style.transition = 'transform 0.5s, width 0.5s';
        sidebarContainer.classList.remove('hidden');
        sidebarWrapper.style.display = 'block';
        sidebarProfileSection.style.display = 'flex';
        viewButtonSvg.style.transform = 'rotate(0deg)';
        clearTimeout(timerId);
      } else if (sidebarContainer.classList.contains('shrink')) {
        sidebarContainer.classList.remove('shrink');
        sidebarContainer.style.transition = 'transform 0.5s, width 0.5s';
        startTimer();
      } else {
        sidebarContainer.classList.add('shrink');
        sidebarContainer.style.transition = 'transform 0.5s, width 0.5s';
        startTimer();
      }
    };

    const handleThemeChange = () => {
      const body = document.body;
      body.classList.toggle('dark');

      const themeToggle = document.getElementById('theme-toggle');
      const lightThemeType = document.querySelector('.sidebar-themeType.light');
      const darkThemeType = document.querySelector('.sidebar-themeType.dark');

      if (themeToggle.checked) {
        lightThemeType.style.display = 'none';
        darkThemeType.style.display = 'block';
      } else {
        lightThemeType.style.display = 'block';
        darkThemeType.style.display = 'none';
      }
    };

   window.addEventListener('DOMContentLoaded', () => {
  const sidebarContainer = document.querySelector('.sidebar-container');
  const isExpanded = !sidebarContainer.classList.contains('shrink');

  if (!isExpanded) {
    startTimer();
  }

  const sidebarLinks = document.querySelectorAll('.sidebar-listItem a');
  sidebarLinks.forEach((link) => {
    link.addEventListener('click', () => {
      clearTimeout(timerId); // Resetear el temporizador al hacer clic en un enlace
      startTimer(); // Iniciar un nuevo temporizador después del clic
    });
  });
});

const startTimer = () => {
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    const sidebarContainer = document.querySelector('.sidebar-container');
    if (sidebarContainer.classList.contains('shrink') && !isFirstInteraction) {
      sidebarContainer.style.transform = 'translateX(-100%)';
      sidebarContainer.style.transition = 'transform 0.5s, width 0.5s';
      timerId = setTimeout(() => {
        sidebarContainer.classList.add('hidden');
      }, 500);
    }
    isFirstInteraction = false;
  }, 3000); // Cambiar el tiempo de espera a 3 segundos (3000 ms)
};

//CARD

const buttons = document.querySelectorAll(".card-buttons button");
const sections = document.querySelectorAll(".card-section");
const card = document.querySelector(".card");

const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const handleButtonClick = (e) => {
  const targetSection = e.target.getAttribute("data-section");
  const section = document.querySelector(targetSection);
  card.setAttribute("data-state", targetSection);

  if (targetSection !== "#about") {
    card.classList.add("is-active");
  } else {
    card.classList.remove("is-active");
  }

  sections.forEach((s) => s.classList.remove("is-active"));
  buttons.forEach((b) => b.classList.remove("is-active"));
  e.target.classList.add("is-active");
  section.classList.add("is-active");
};

// Utilizamos eventos táctiles para dispositivos móviles
if (isMobileDevice) {
  buttons.forEach((btn) => {
    btn.addEventListener("touchstart", handleButtonClick);
  });
} else {
  buttons.forEach((btn) => {
    btn.addEventListener("click", handleButtonClick);
  });
}