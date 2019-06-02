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
    window.g = this;
    const self = this;
    function RunAnimation(fps) {
      window.console.log('satrt');
      let i = 0;
      if (self.state.timer) {
        clearInterval(self.state.timer);
      }
      self.state.timer = setInterval(() => {
        i += 1;
        if (self.state.rects.length - 1 < i) {
          i = 0;
        }
        const previewRect = self.state.rects[i];
        self.view.components.preview.strokeRect(previewRect);
      }, 1000 / fps);
    }

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
          if (evt.relatedTarget.className.slice(0, 11) === 'frame__tool') return;
          e.target.linkToFrameClass.hidePopup();
          e.target.removeEventListener('mouseout', onMouseOut);
        }

        if (e.target.nodeName === 'CANVAS') {
          let currNode = e.target;
          while (currNode.nodeName !== 'LI') {
            currNode = currNode.parentNode;
          }
          const childs = currNode.parentNode.children;
          let k = 0;
          const len = childs.length;
          let currChild = childs[k];
          while (k < len && currChild !== currNode) {
            k += 1;
            currChild = childs[k];
          }
          currNode.querySelector('.frame__tool--counter').textContent = k + 1;
          e.target.linkToFrameClass.showPopup();

          e.target.addEventListener('mouseout', onMouseOut);
        }
      });


    this.view.components.frames.components.frameList.addEventListener('click',
      (e) => {
        if (e.target.nodeName === 'CANVAS') {
          const curRect = e.target.linkToFrameClass.state.colors;
          this.view.components.canvas.strokeRect(curRect);
        } else if (e.target.className === 'fas fa-copy') {
          let currNode = e.target;
          while (currNode.nodeName !== 'LI') {
            currNode = currNode.parentNode;
          }
          const canvas = currNode.querySelector('canvas');
          const copyRect = canvas.linkToFrameClass.state.colors;
          this.view.components.frames.addFrame(copyRect);
          this.state.rects.push(copyRect);
          this.view.components.canvas.strokeRect(copyRect);
        } else if (e.target.className === 'fas fa-trash-alt') {
          let currNode = e.target;
          while (currNode.nodeName !== 'LI') {
            currNode = currNode.parentNode;
          }
          const childs = currNode.parentNode.children;
          let k = 0;
          const len = childs.length;
          if (len === 1) return;
          let currChild = childs[k];
          while (k < len && currChild !== currNode) {
            k += 1;
            currChild = childs[k];
          }
          this.state.rects.splice(k, 1);
          currNode.remove();
          RunAnimation(5);
        }
      });

    this.view.components.preview.components.range.addEventListener('change', (evt) => {
      const fps = evt.target.value;
      this.view.components.preview.components.fpsBox.textContent = fps;
      RunAnimation(fps);
    });

    this.view.components.preview.components.range.addEventListener('input', (inputEvt) => {
      const fps = inputEvt.target.value;
      this.view.components.preview.components.fpsBox.textContent = fps;
    });

    this.view.components.preview.components.fullScreenBtn.addEventListener('click', () => {
      this.view.components.preview.components.canvasNode.requestFullscreen();
    });

    RunAnimation(5);
  }
}

export default Controller;
