import '../../../../assets/gif';

export function onRangeInput(inputEvt) {
  const fps = inputEvt.target.value;
  this.view.components.preview.components.fpsBox.textContent = `${fps} FPS`;
  this.state.fps = fps;
}

export function onFullScreenBtnClick() {
  const fullScreen = Element.prototype.requestFullscreen
    || Element.prototype.webkitRequestFullscreen;
  fullScreen.call(this.view.components.preview.components.canvasNode);
}


export function onGifBtnClick() {
  const slides = this.getSlides();

  const size = 128;
  const parts = 32;

  function getCTX() {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    return [ctx, canvas];
  }

  const gif = new window.GIF({
    workers: 5,
    quality: 1,
    height: size,
    width: size,
    transparent: '#fff',
  });

  function clear(ctx) {
    ctx.clearRect(0, 0, size, size);
  }

  function paintIamge(ctx, rect) {
    clear(ctx);
    for (let i = 0; i < parts; i += 1) {
      for (let j = 0; j < parts; j += 1) {
        let color = rect[i % parts][[j % parts]];
        if ((color === '#000') || (color === '#000000')) {
          color = '#111111';
        }
        ctx.fillStyle = color;
        ctx.fillRect(Math.round(size / parts * i),
          Math.round(size / parts * j),
          Math.round(size / parts), Math.round(size / parts));
      }
    }
  }

  const delay = 1000 / this.state.fps;

  slides.forEach((slide) => {
    const [ctx, canvas] = getCTX();
    paintIamge(ctx, slide);
    gif.addFrame(canvas, { delay, copy: true });
  });

  function saveData(blob, fileName) {
    const a = document.createElement('a');
    a.style = 'display: none';
    document.body.appendChild(a);

    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  gif.on('finished', (blob) => {
    saveData(blob, 'New Gif.gif');
  });

  gif.render();
}


export function saveSlides() {
  this.saveSlides();
}

export function loadSlides() {
  this.loadSlides();
}
