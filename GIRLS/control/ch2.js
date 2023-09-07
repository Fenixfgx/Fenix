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
