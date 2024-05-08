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
      apiKey: Dax01800
    }).then(function() {
      return gapi.client.load('sheets', 'v4');
    }).then(function() {
      // Obtiene los datos de la hoja de cálculo
      return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadx00,
        range: rg // Considera todas las columnas necesarias para la búsqueda
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
  const cargaSection = document.getElementById('Carga');
  const hiddenSection = document.getElementById('hidden-section');

  accessSection.style.display = 'none';
  cargaSection.style.display = 'block';
  hiddenSection.style.display = 'none';

  setTimeout(() => {
    cargaSection.style.display = 'none';
    hiddenSection.style.display = 'block';
    hiddenSection.scrollIntoView({ behavior: 'smooth' });
  }, 2000);
       
        // Aquí puedes utilizar los datos de la fila para incrustarlos en diferentes partes de la sección oculta
        const userId = userData[0]; 
        const userName = userData[1]; 
        const nombre = userData[1];
        const apellido = userData[2];
        const userEmail = userData[3]; 
        const userPhoto = userData[15];
        const profesion = userData[11];
        const acerca = userData[14];
        const NivelEducativo = userData[18];
        const ubicacion = userData[13];
        const tel = userData[10];
        const correo = userData[20];
        const edad = userData[12];
        const exp = userData[16];
        const codexx = userData[7];
        const codigo = userData[7];
        const codigox = userData[7];
        const codigodel = userData[7];
        const codigodel2 = userData[7];
        const codebus = userData[7];
        const pass = userData[4];
        const temp = userData[6];
        const foto = userData[15];
        const urlfp = userData[15];
        const estado = userData[23];
        const nombrepublicador00 = userData[1];
        const tipopublicador00 = userData[21];
        const tel00 = userData[10];
        const correo00 = userData[20];
        const id00 = userData[0];
        // ...
       
        // Ejemplo de incrustación de los datos en elementos HTML
       const userIdElement = document.getElementById('user-id');
       userIdElement.textContent = userId;

       const id00Element = document.getElementById('id00');
       id00Element.value = id00;
       
       const nombrepublicador00Element = document.getElementById('nombrepublicador00');
       nombrepublicador00Element.value = nombrepublicador00;
       
       const tipopublicador00Element = document.getElementById('tipopublicador00');
       tipopublicador00Element.value = tipopublicador00;
       
       const codigoElement = document.getElementById('codigo');
       codigoElement.value = codigo;
       
       const tel00Element = document.getElementById('tel00');
       tel00Element.value = tel00;
       
       const urlfpElement = document.getElementById('urlfp');
       urlfpElement.value = urlfp;
       
       const codebusElement = document.getElementById('searchInput');
       codebusElement.value = codebus;
       
       const codigoxElement = document.getElementById('codigox');
       codigoxElement.value = codigox;
       
       search();
       
       const codigodelElement = document.getElementById('coding');
       codigodelElement.value = codigodel;
       
       const codigodel2Element = document.getElementById('codigodel2');
        codigodel2Element.textContent = codigodel2;
       
       const passElement = document.getElementById('pass');
       passElement.value = pass;
       
       const tempElement = document.getElementById('temp');
       tempElement.value = temp;
       
       const passwElement = document.getElementById('passw');
       passwElement.value = pass;
       
       const correodElement = document.getElementById('corrP');
       correodElement.value = userEmail;
        
        const userNameElement = document.getElementById('user-name');
        userNameElement.textContent = userName;
        
        const nombreElement = document.getElementById('nombre');
        nombreElement.textContent = nombre;
        
        const apellidoElement = document.getElementById('apellido');
        apellidoElement.textContent = apellido;
        
        const profesionElement = document.getElementById('profesion');
        profesionElement.textContent = profesion;
        
        const acercaElement = document.getElementById('acerca');
        acercaElement.textContent = acerca;
        
        const NivelEducativoElement = document.getElementById('NivelEducativo');
        NivelEducativoElement.textContent = NivelEducativo;
        
        const ubicacionElement = document.getElementById('ubicacion');
        ubicacionElement.textContent = ubicacion;
        
        const telElement = document.getElementById('tel');
        telElement.textContent = tel;
        
        const correoElement = document.getElementById('correo');
        correoElement.textContent = correo;
       
        const correo00Element = document.getElementById('correo00');
        correo00Element.value = correo00;
        
        const edadElement = document.getElementById('edad');
        edadElement.textContent = edad;
       
        const estadoElement = document.getElementById('estado');
        estadoElement.textContent = estado;
        
        const expElement = document.getElementById('exp');
        expElement.textContent = exp;

const userEmailElement = document.getElementById('user-email');
        userEmailElement.textContent = userEmail;
        
const userPhotoElement = document.getElementById('user-photo');

if (userPhoto) {
  userPhotoElement.setAttribute('src', userPhoto);
} else {
  userPhotoElement.setAttribute('src', 'https://fenixfgx.github.io/Fenix/BOLSADEEMPLEO/perfil.png'); 
}  
      
const fotoElement = document.getElementById('foto');

if (foto) {
  fotoElement.setAttribute('src', foto);
} else {
  fotoElement.setAttribute('src', 'https://fenixfgx.github.io/Fenix/BOLSADEEMPLEO/perfil.png'); 
}  
          
          // Después de asignar el valor a codexx, también copiamos el valor al input oculto
const tempCodexxElement = document.getElementById('tempCodexx');
tempCodexxElement.value = codexx;
  
  const siguienteInput = document.getElementById('codexx');
siguienteInput.value = codexx;
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
      const buttonf = document.querySelector('.buttonf');
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
    const changeThemeForSections = (darkMode) => {
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    if (darkMode) {
      section.classList.add('dark');
    } else {
      section.classList.remove('dark');
    }
  });
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
    changeThemeForSections(true); // Cambiar a tema oscuro para todas las secciones
  } else {
    lightThemeType.style.display = 'block';
    darkThemeType.style.display = 'none';
    changeThemeForSections(false); // Cambiar a tema claro para todas las secciones
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
  }, 1000); // Cambiar el tiempo de espera a 1 segundo (1000 ms)
};

//CARD

const buttons = document.querySelectorAll(".card-buttons button");
const sections = document.querySelectorAll(".card-section");
const card = document.querySelector(".card");

const handleButtonClick = (e) => {
  const targetSection = e.target.getAttribute("data-section");
  const section = document.querySelector(targetSection);
  card.setAttribute("data-state", targetSection);

  // Si el targetSection no es "#about", agregamos la clase "is-active" al contenedor de la tarjeta, de lo contrario, la eliminamos.
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

buttons.forEach((btn) => {
  btn.addEventListener("click", handleButtonClick);
});

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(showBubble, 25000);
});

// Función para mostrar la burbuja
function showBubble() {
  var bubble = document.getElementById('bubble');
  bubble.classList.add('bubble-visible'); // Agregar la clase para mostrar la burbuja con transición
}

setTimeout(function () {
      bubble.classList.remove('bubble-visible');
    }, 56000); 
// Función para mostrar la imagen alta usando SweetAlert
function showImage() {
Swal.fire({
  title: 'iframe',
  
  showCancelButton: true,
  showCloseButton: true
});
}

function copiarTexto() {
  var elementoCodexx = document.getElementById("codexx");
  var textoParaCopiar = elementoCodexx.innerText;

  var inputTemp = document.createElement("input");
  document.body.appendChild(inputTemp);
  inputTemp.value = textoParaCopiar;
  inputTemp.select();
  document.execCommand("copy");
  document.body.removeChild(inputTemp);

  new Noty({
    text: "¡Código Copiado!",
    type: "information",
    theme: "sunset",
    timeout: 2500, // Duración de la notificación en milisegundos (en este caso, 2.5 segundos)
  }).show();
}
function checkWhatsAppContent() {
    // Obtén el elemento con el ID "whatsapp"
    var whatsappElement = document.getElementById("whatsapp");

    // Obtén el contenedor div con la clase "card-contact"
    var cardContactDiv = document.getElementById("card-contact");

    // Verifica si el contenido del elemento es vacío
    if (whatsappElement.innerHTML.trim() === "") {
        // Si el contenido es vacío, oculta el contenedor completo
        cardContactDiv.style.display = "none";
    } else {
        // Si hay contenido, muestra el contenedor
        cardContactDiv.style.display = "flex"; // Puedes usar "flex", "grid", etc. según tu diseño
    }
}

// Ejecuta la función inicialmente para comprobar el contenido al cargar la página
checkWhatsAppContent();
// Verifica cada 2 segundos si hay contenido y oculta/muestra el contenedor según corresponda
setInterval(checkWhatsAppContent, 2000);

// Obtén el elemento con el ID "whatsapp"
var whatsappElement = document.getElementById("whatsapp");

// Agrega un evento click al elemento de WhatsApp
whatsappElement.addEventListener("click", function () {
    // Obtén el número de WhatsApp del contenido del elemento
    var whatsappNumber = whatsappElement.textContent.trim();

    // Verifica si el número de WhatsApp es válido
    if (whatsappNumber) {
        // Crea el enlace de WhatsApp con el número
        var whatsappLink = "https://api.whatsapp.com/send?phone=57" + whatsappNumber;

        // Abre el enlace en una nueva ventana/tab
        window.open(whatsappLink, "_blank");
    }
});

// Función que se ejecuta al cargar la página
  $(document).ready(function() {
    // Intentar obtener la última sección visitada almacenada en localStorage
    var storedSection = localStorage.getItem("lastSection");

    if (storedSection) {
      // Si se encontró una sección almacenada, mostrar su contenido
      $(".content-wrap > section").removeClass("content-current");
      $(storedSection).addClass("content-current");
    }

    // Función que se ejecuta cuando se hace clic en una pestaña
    $("nav > ul > li").click(function(event) {
      event.preventDefault();

      // Obtener el ID de la sección correspondiente a la pestaña
      var sectionId = $(this).find("a").attr("href");

      // Mostrar la sección correspondiente y ocultar las demás
      $(".content-wrap > section").removeClass("content-current");
      $(sectionId).addClass("content-current");

      // Almacenar el ID de la sección en localStorage
      localStorage.setItem("lastSection", sectionId);
    });
  });