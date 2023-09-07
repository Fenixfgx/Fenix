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
      