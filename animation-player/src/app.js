import api from './index';

const showPopup = true;
if (showPopup) {
  const { StartPageController, StartPageView } = api;
  const app = new StartPageController(StartPageView);
  app.init();
} else {
  const { Controller, View, Model } = api;
  const canvasSize = 32;
  const app = new Controller(View, Model, canvasSize);
  app.init();
}
