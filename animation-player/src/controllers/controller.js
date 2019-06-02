class Controller {
  constructor(View, Model, size) {
    this.view = new View(size);
    this.model = new Model(size);
    this.state = {
      rects: [],
      timer: null,
    };
  }

  init() {
    const rect = this.model.getRandomRect();
    this.state.rects.push(rect);
    this.view.render(rect);
    this.view.components.frames.components.btn.addEventListener('click',
      () => {
        const newRect = this.model.getRandomRect();
        this.state.rects.push(newRect);
        this.view.components.frames.addFrame(newRect);
        this.view.components.canvas.strokeRect(newRect);
      });

    this.view.components.frames.components.frameList.addEventListener('mouseover',
      (e) => {
        function onMouseOut(evt) {
          window.console.log(evt.relatedTarget.className);
          if (evt.relatedTarget.className.slice(0, 11) === 'frame__tool') return;
          e.target.linkToFrameClass.hidePopup();
          e.target.removeEventListener('mouseout', onMouseOut);
        }

        if (e.target.nodeName === 'CANVAS') {
          e.target.linkToFrameClass.showPopup();

          e.target.addEventListener('mouseout', onMouseOut);
        }
      });


    this.view.components.frames.components.frameList.addEventListener('click',
      (e) => {
        window.console.log(e.target);
        if (e.target.nodeName === 'CANVAS') {
          const curRect = e.target.linkToFrameClass.state.colors;
          this.view.components.canvas.strokeRect(curRect);
        } else if (e.target.className === 'fas fa-copy') {
          let currNode = e.target;
          while (currNode.className !== 'frame-wrapper') {
            currNode = currNode.parentNode;
          }
          const canvas = currNode.querySelector('canvas');
          const copyRect = canvas.linkToFrameClass.state.colors;
          this.view.components.frames.addFrame(copyRect);
          this.state.rects.push(copyRect);
          this.view.components.canvas.strokeRect(copyRect);
        }
      });

    let i = 0;
    this.view.components.preview.components.range.addEventListener('change', (evt) => {
      const fps = evt.target.value;
      this.view.components.preview.components.fpsBox.textContent = fps;
      if (this.state.timer) {
        clearInterval(this.state.timer);
      }
      this.state.timer = setInterval(() => {
        const previewRect = this.state.rects[i];
        this.view.components.preview.strokeRect(previewRect);
        if (i < this.state.rects.length - 1) {
          i += 1;
        } else {
          i = 0;
        }
      }, 1000 / fps);
    });

    this.view.components.preview.components.range.addEventListener('input', (inputEvt) => {
      const fps = inputEvt.target.value;
      this.view.components.preview.components.fpsBox.textContent = fps;
    });

    this.state.timer = setInterval(() => {
      const previewRect = this.state.rects[i];
      this.view.components.preview.strokeRect(previewRect);
      if (i < this.state.rects.length - 1) {
        i += 1;
      } else {
        i = 0;
      }
    }, 1000 / 5);

    this.view.components.preview.components.fullScreenBtn.addEventListener('click', () => {
      this.view.components.preview.components.canvasNode.requestFullscreen();
    });
  }
}

export default Controller;
