import Controller from '../../src/controllers/controller';
import { loadFile } from '../../src/controllers/utils/handlers/previewHandlers/handlers';

class EmptyController {
  static getEmptyController() {
    const controller = new Controller(class View{}, class Model{});
    return controller;
  }

  static setLiveRectsFromSlides(controller, slides = []) {
    const ul = document.createElement('ul');
    slides.forEach(slide => {
      const li = document.createElement('li');
      const canvas = document.createElement('canvas');
      canvas.linkToFrameClass = {
        state: {
          imageMatrix: slide,
        }
      };
      li.appendChild(canvas);
      ul.appendChild(li);
    });

    document.body.appendChild(ul);
    const liveCollection = document.body.getElementsByTagName('li');
    controller.state.liveRects = liveCollection;
    return controller;
  }

  static setLocalStorage(controller) {
    controller.slidesStorage = {
      storage: null,
      save: function(data) {
        this.storage = data;
      },
      load: function() {
        return this.storage
      },
    };
  }
}


describe('Controller', () => {
  it('should correct return slides from frames', () => {

    const slides = [99, 6, 'abs'];
    const controller = EmptyController.getEmptyController();
    EmptyController.setLiveRectsFromSlides(controller, slides);
    const res = controller.getSlides();

    expect(res).toEqual(slides);
  });

  it('should correct save slides to local storage', () => {
    document.body.innerHTML = '';
    const slides = [99, 6, 'abs'];
    const controller = EmptyController.getEmptyController();
    EmptyController.setLiveRectsFromSlides(controller, slides);
    EmptyController.setLocalStorage(controller);
    controller.saveSlides();

    expect(controller.slidesStorage.storage).toEqual(JSON.stringify(slides));
  });

  it('should correct clear live collection', () => {
    const slides = [99, 6, 'abs'];
    const controller = EmptyController.getEmptyController();
    EmptyController.setLiveRectsFromSlides(controller, slides);
    controller.clearSlides();
    expect(controller.state.liveRects.length).toBe(0);
  });

  it('should correct clear document', () => {
    const slides = [99, 6, 'abs'];
    const controller = EmptyController.getEmptyController();
    EmptyController.setLiveRectsFromSlides(controller, slides);
    controller.clearSlides();
    const lis = document.body.getElementsByTagName('li');
    expect(lis.length).toBe(0);
  });
});
