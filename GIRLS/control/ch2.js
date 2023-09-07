const API_KEY = "";

async function getAssistantResponse(userMessage) {
  const lowerCaseMessage = userMessage.toLowerCase();

  const activators = ["me darias una foto", "me darías una foto", "regalas una foto", "me regalarias una foto", "me regalarías una foto", "dar una foto", "enviarme una foto", "envíame una foto", "enviame una foto", "me enviarias una foto", "me enviarías una foto", "me envias una foto","me envías una foto","envíame otra foto", "otra imagen","foto tuya","imagen tuya","enviame otra foto","quiero una foto", "quiero una imagen","Me darias una foto","Me darias una imagen", "enviaras una imagen", "enviaras una foto", "enviarás una imagen", "enviarás una foto", "Envíame una foto", "Envíame una foto", "Enviame una foto", "Me enviarias una foto", "Envíame otra foto", "Enviame otra foto", "otra foto", "selfi","selfie","Me darias una imagen", "Envíame una imagen", "Envíame una imagen", "Enviame una imagen", "Me enviarias una imagen", "Envíame otra imagen", "Enviame otra imagen","fotico", "fotito", "Me darias una foto", "Envíame una foto", "Envíame una foto", "Enviame una foto", "Me enviarias una foto", "Envíame otra foto", "Enviame otra foto","Me darias una imagen", "Envíame una imagen", "Envíame una imagen", "Enviame una imagen", "Me enviarias una imagen", "Envíame otra imagen", "Enviame otra imagen","Me darias una foto", "Envíame una foto", "Envíame una foto", "Enviame una foto", "Me enviarias una foto", "Envíame otra foto", "Enviame otra foto","Me darias una imagen", "Envíame una imagen", "Envíame una imagen", "Enviame una imagen", "Me enviarias una imagen", "Envíame otra imagen", "Enviame otra imagen","Me darias una foto", "Envíame una foto", "Envíame una foto", "Enviame una foto", "Me enviarias una foto", "Envíame otra foto", "Enviame otra foto","Me darias una imagen", "Envíame una imagen", "Envíame una imagen", "Enviame una imagen", "Me enviarias una imagen", "Envíame otra imagen", "Enviame otra imagen","Me darias una foto", "Envíame una foto", "Envíame una foto", "Enviame una foto", "Me enviarias una foto", "Envíame otra foto", "Enviame otra foto","Me darias una imagen", "Envíame una imagen", "Envíame una imagen", "Enviame una imagen", "Me enviarias una imagen", "Envíame otra imagen", "Enviame otra imagen", "quiero ver tu cara", "quiero ver tu rostro", "quiero ver tu hermoso rostro", , "quiero ver tu hermosa cara"]; // Agrega más activadores si es necesario

  if (activators.some(activator => lowerCaseMessage.includes(activator))) {
    const randomImage = getRandomImage();
    return `<img src="${randomImage}" alt="Random Image">`;
  } else {
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-0301",
        max_tokens: 30,
        messages: [
          {"role": "system", "content": "Your role is: a friendly girlfriend, responding lovingly to each interaction with the user"},
          {"role": "user", "content": userMessage}
        ]
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }
}

let lastImageIndex = -2;

function getRandomImage() {
  const imageGallery = [
    "https://w0.peakpx.com/wallpaper/333/513/HD-wallpaper-anime-chica-chica-linda-thumbnail.jpg",
    "https://i.pinimg.com/736x/82/52/63/825263f93ebaed691e9ce485df444c8e.jpg",
    "https://noticias.animeonegai.com/wp-content/uploads/2022/07/thiirakkh-ngchanaetngtaw-marin-kitagawa-4k-wx-ll-pepexr-1440x900_4-e1658532471496.jpg",
    // Agrega más imágenes a la galería
  ];

  let randomIndex = Math.floor(Math.random() * imageGallery.length);

  // Asegurarse de que no se repita la misma imagen
  while (randomIndex === lastImageIndex) {
    randomIndex = Math.floor(Math.random() * imageGallery.length);
  }

  lastImageIndex = randomIndex;

  return imageGallery[randomIndex];
}

const chat = document.querySelector("#chat");
const messageInput = document.querySelector("#message");
const sendButton = document.querySelector("#send");
const chatContainer = document.querySelector("#chat-container");

// Cargar la conversación almacenada al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const storedConversation = localStorage.getItem("conversation");
  if (storedConversation) {
    chat.innerHTML = storedConversation;
    const messages = chat.querySelectorAll(".message");
    messages.forEach(message => {
      message.classList.add("show"); // Agregar la clase "show" para la animación de entrada
      chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.clientHeight;
    });
     
  }
});

sendButton.addEventListener("click", async () => {
  const userMessage = messageInput.value;
  if (!userMessage) return;

  const userBubble = document.createElement("div");
  userBubble.classList.add("message", "user-message");
  userBubble.innerHTML = `
    <img src="https://cdn-icons-png.flaticon.com/512/6326/6326055.png" alt="User Avatar" class="avatar">
    <div class="message-bubble user-bubble">${userMessage}</div>
  `;

  chat.appendChild(userBubble);
  userBubble.classList.add("show"); // Agregar la clase "show" para animar la entrada del mensaje

  // Hacer scroll hacia abajo para mantener la última burbuja de mensaje visible
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Enfocar el input para escribir mensajes después de enviar un mensaje
  messageInput.focus();
  
  // Almacenar la conversación en el almacenamiento local
  const conversation = chat.innerHTML;
  localStorage.setItem("conversation", conversation);

  chatContainer.scrollTop = chatContainer.scrollHeight;
  messageInput.value = "";

  setTimeout(() => {
    const typingBubble = document.createElement("div");
    typingBubble.classList.add("message");
    typingBubble.innerHTML = `
      <img src="https://fenixfgx.github.io/Fenix/GIRLS/AI1.jpg" alt="Assistant Avatar" class="avatar">
      <div class="message-bubble assistant-bubble">Escribiendo...</div>
    `;

    chat.appendChild(typingBubble);
    typingBubble.classList.add("show");

    setTimeout(async () => {
      chat.removeChild(typingBubble);

      const assistantMessage = await getAssistantResponse(userMessage);

      const assistantBubble = document.createElement("div");
      assistantBubble.classList.add("message");
      assistantBubble.innerHTML = `
        <img src="https://fenixfgx.github.io/Fenix/GIRLS/AI1.jpg" alt="Assistant Avatar" class="avatar">
        <div class="message-bubble assistant-bubble">${assistantMessage}</div>
      `;

      chat.appendChild(assistantBubble);
      assistantBubble.classList.add("show");

      // Almacenar la conversación en el almacenamiento local después de agregar la respuesta del asistente
      const conversation = chat.innerHTML;
      localStorage.setItem("conversation", conversation);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 2000);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 1000);
});


// ... Código anterior ...

const inputContainer = document.querySelector("#input-container");

// Función para manejar el ajuste del contenido cuando se despliega el teclado
function adjustContentForKeyboard() {
  if (window.innerHeight > document.documentElement.clientHeight) {
    inputContainer.style.bottom = `${window.innerHeight - document.documentElement.clientHeight}px`;
  } else {
    inputContainer.style.bottom = "0";
  }
}

// Ajustar el contenido inicialmente
adjustContentForKeyboard();

// Detectar cambios en el tamaño de la ventana (como cuando se muestra/oculta el teclado)
window.addEventListener("resize", adjustContentForKeyboard);

// Resto del código...
// ... Código anterior ...

messageInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendButton.click();
  }
});

sendButton.addEventListener("click", async () => {
  const userMessage = messageInput.value.trim(); // Eliminar espacios en blanco al principio y al final
  if (userMessage) {
    // Resto del código para enviar el mensaje...
    
    // Hacer scroll hacia abajo para mantener la última burbuja de mensaje visible
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Almacenar la conversación en el almacenamiento local después de agregar la respuesta del asistente
    const conversation = chat.innerHTML;
    localStorage.setItem("conversation", conversation);

    messageInput.value = ""; // Limpiar el input después de enviar el mensaje
  }
});

// ... Código anterior ...


// Función para abrir el modal al hacer clic en una imagen
function openModal(imageUrl) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");

  modal.style.display = "block";
  modal.classList.add("show"); // Agregar la clase "show" para la animación de apertura
  modalImage.src = imageUrl;
}

// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.remove("show"); // Quitar la clase "show" para la animación de cierre

  // Esperar a que termine la animación y luego ocultar el modal
  setTimeout(() => {
    modal.style.display = "none";
  }, 300); // La misma duración que la transición en CSS
}

// Agregar eventos para abrir y cerrar el modal
chat.addEventListener("click", (event) => {
  const clickedElement = event.target;

  if (clickedElement.tagName === "IMG") {
    const imageUrl = clickedElement.src;
    openModal(imageUrl);
  }
});

// Cerrar el modal al hacer clic en la "x"
const closeModalButton = document.querySelector(".close");
closeModalButton.addEventListener("click", closeModal);

// Cerrar el modal si se hace clic fuera de él
window.addEventListener("click", (event) => {
  const modal = document.getElementById("imageModal");
  if (event.target === modal) {
    closeModal();
  }
});

let batteryLevel; // Variable para almacenar el nivel de batería
let sendButtonEnabled = true; // Inicialmente, el botón "Send" está habilitado
let adViewed = false; // Variable para rastrear si el anuncio se ha visto

// Verificar si hay un nivel de batería almacenado en el almacenamiento local
const storedBatteryLevel = localStorage.getItem("batteryLevel");

// Inicializar batteryLevel con el valor almacenado o 10 si no hay un valor almacenado
batteryLevel = storedBatteryLevel ? parseInt(storedBatteryLevel) : 10;

// Actualizar la representación en la página
document.getElementById("battery-level").textContent = batteryLevel;


function updateBatteryImage() {
    let batteryImageSrc;
    if (batteryLevel > 8) {
        batteryImageSrc = "https://fenixfgx.github.io/Fenix/GIRLS/states/b5.png"; // Imagen para batería > 8
    } else if (batteryLevel >= 5) {
        batteryImageSrc = "https://fenixfgx.github.io/Fenix/GIRLS/states/b4.png"; // Imagen para batería entre 5 y 8
    } else if (batteryLevel >= 3) {
        batteryImageSrc = "https://fenixfgx.github.io/Fenix/GIRLS/states/b3.png"; // Imagen para batería entre 3 y 4
    } else if (batteryLevel >= 1) {
        batteryImageSrc = "https://fenixfgx.github.io/Fenix/GIRLS/states/b2.png"; // Imagen para batería entre 1 y 2
    } else {
        batteryImageSrc = "https://fenixfgx.github.io/Fenix/GIRLS/states/b1.png"; // Imagen para batería igual a 0
    }

    // Cambiar la imagen de la batería en la página
    const batteryImage = document.getElementById("battery-image");
    batteryImage.src = batteryImageSrc;
}

// Llamar a la función para cambiar la imagen al iniciar
updateBatteryImage();

function checkBatteryStatus() {
      if (batteryLevel === 0) {
        // Muestra una notificación estilo Sweet Alert con solo el botón "Mostrar Anuncio"
        const swal = Swal.fire({
          title: 'Batería Baja',
          text: '¡Puedes Recargar Viendo un Anuncio!',
          imageUrl: 'https://fenixfgx.github.io/Fenix/GIRLS/BatteryL.png',
          imageWidth: 170,
          imageAlt: 'Batería Baja',
          showConfirmButton: false, // Oculta el botón "Aceptar"
          html: `<button class="Recarga" onclick="callNativeFunction()">Recargar Batería con un Anuncio</button>`,
        });

        sendButtonEnabled = false;
        sendButton.disabled = true;
// Cierra el Sweet Alert automáticamente después de 3 segundos cuando se hace clic en "Recarga"
        document.querySelector('.Recarga').addEventListener('click', () => {
          setTimeout(() => {
            swal.close(); // Cierra el Sweet Alert

            // Restablece el contador a 5 después de 5 segundos
            setTimeout(() => {
              batteryLevel = 10;
              updateBatteryImage();
              document.getElementById("battery-level").textContent = batteryLevel;
            }, 5000); // 5000 milisegundos = 5 segundos
            sendButtonEnabled = true;
            sendButton.disabled = false;
            updateBatteryImage();
          }, 3000); // 3000 milisegundos = 3 segundos
        });
      }
    }

    // Ejecuta la función "checkBatteryStatus" cada 10 segundos (10000 milisegundos)
    setInterval(checkBatteryStatus, 20000);
// Función para actualizar el estado de la batería y verificar si se agotó
function updateBattery() {
  batteryLevel--;
  document.getElementById("battery-level").textContent = batteryLevel;// Guardar el nivel de la batería en el almacenamiento local
    localStorage.setItem("batteryLevel", batteryLevel);

    if (batteryLevel <= 0) {
    // La batería se agotó, mostrar un alert y desactivar el botón "Send"
    Swal.fire({
          title: 'Batería Baja',
          text: '¡Puedes Recargar Viendo un Anuncio!',
          imageUrl: 'https://fenixfgx.github.io/Fenix/GIRLS/BatteryL.png',
          imageWidth: 170,
          imageAlt: 'Batería Baja',
          showCancelButton: false,
          showConfirmButton: false,
          html: `<button class="Recarga" onclick="callNativeFunction()">Recargar Batería con un Anuncio</button>`,
        });
    sendButtonEnabled = false;
    sendButton.disabled = true;
// Cierra el Sweet Alert automáticamente después de 3 segundos cuando se hace clic en "Recarga"
        document.querySelector('.Recarga').addEventListener('click', () => {
          setTimeout(() => {
            swal.close(); // Cierra el Sweet Alert

            // Restablece el contador a 5 después de 5 segundos
            setTimeout(() => {
              batteryLevel = 10;
              updateBatteryImage();
              document.getElementById("battery-level").textContent = batteryLevel;
            }, 5000); // 5000 milisegundos = 5 segundos
            sendButtonEnabled = true;
            sendButton.disabled = false;
            
          }, 3000); // 3000 milisegundos = 3 segundos
        });
      }
    }

function adViewedSuccessfully() {
    adViewed = true;
    // Realiza otras acciones necesarias aquí
}

// Función para recargar la batería
function rechargeBattery() {
    if (adViewed === true) {
        // Solo recarga la batería si el anuncio se ha visto
        batteryLevel = 10;
        document.getElementById("battery-level").textContent = batteryLevel;
        sendButtonEnabled = true; // Habilitar el botón "Send" al recargar la batería
        sendButton.disabled = false; // Habilitar el botón "Send"
        const rechargeModal = document.getElementById("recharge-modal");
        rechargeModal.style.display = "none";
        adViewed = false; // Restablece el estado del anuncio
    } else {
        // Muestra un mensaje de error o realiza otra acción si el anuncio no se ha visto
    }
}



// Actualizar el estado de la batería al hacer clic en el botón "Send"
sendButton.addEventListener("click", async () => {
  // Si el botón "Send" está desactivado, mostrar un alert
  if (!sendButtonEnabled) {
    showAlertIfDisabled();
    return; // Salir sin enviar el mensaje
  }

  // Resto del código...
updateBatteryImage();
  // Actualizar el estado de la batería
  updateBattery();

  // Almacenar la conversación en el almacenamiento local después de agregar la respuesta del asistente
  const conversation = chat.innerHTML;
  localStorage.setItem("conversation", conversation);

  messageInput.value = ""; // Limpiar el input después de enviar el mensaje
});

// Al hacer clic en el botón de recarga en el modal
const rechargeButton = document.getElementById("recharge-button");
rechargeButton.addEventListener("click", rechargeBattery);
