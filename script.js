
// encapsulando todos os dados em um objeto
jsChroma = {};

// variáveis 'globais'
jsChroma.video;
jsChroma.canvas;
jsChroma.context;


/**
 * Método inicial
 */
jsChroma.start = function () {
  // obtém os elementos do DOM
  jsChroma.video = document.querySelector('#video');
  jsChroma.canvas = document.querySelector('#canvas');
  jsChroma.context = canvas.getContext('2d');

  // assim que o vídeo é carregado, dispara o evento
  jsChroma.video.addEventListener('loadeddata', jsChroma.startGetVideo);
}

/**
 * Evento de vídeo carregado
 */
jsChroma.startGetVideo = function () {

  // configura o tamanho do Canvas
  jsChroma.canvas.width = jsChroma.video.videoWidth;
  jsChroma.canvas.height = jsChroma.video.videoHeight;
  
  // loop para captura dos quadros (25fps = 1000ms/25 => 40ms)
  setInterval(function() { jsChroma.applyChromaKey() }, 40);
}

/**
 * Tratamento de cor de um frame do vídeo
 */
jsChroma.applyChromaKey = function () {
  // captura o quadro do vídeo
  jsChroma.context.drawImage(jsChroma.video, 0, 0, jsChroma.canvas.width, jsChroma.canvas.height);

  // captura os dados do quadro do vídeo
  const imageData = jsChroma.context.getImageData(0, 0, jsChroma.canvas.width, jsChroma.canvas.height);

  // obtém o tamanho do quadro em pixels dividido pelas camadas de cor (4 => r g b a)
  const dataLength = imageData.data.length / 4

  // um loop por cada cada conjunto (pixel)
  for (let i = 0; i < dataLength; i++) {
    
    // compensa a contagem 
    const offset = i * 4

    // obtém o nível de cada cor
    const red = imageData.data[offset + 0]
    const green = imageData.data[offset + 1]
    const blue = imageData.data[offset + 2]

    // onde a mágica acontece, dependendo da intensidade de cada cor
    // você poderá mudar a camada alpha, aplicando a transparência (0-255)
    if (green > red  && green > blue && green < 50) {
      imageData.data[offset + 3] = (50-green) + 200
    } else if (green > red  && green > blue && green > 50) {
      imageData.data[offset + 3] = 0
    }
    //

  }

  // salva o quadro de cor atualizado
  jsChroma.context.putImageData(imageData, 0, 0)
}


// ↓ início do script
jsChroma.start();