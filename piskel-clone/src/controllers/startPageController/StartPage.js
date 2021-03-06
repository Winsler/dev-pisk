export default class StartPageController {
  constructor(StartPageView, api) {
    this.view = new StartPageView();
    this.api = api;
    this.defaultCanvasSize = 32;
    this.user = null;
  }

  init() {
    const { body } = document;
    this.view.render(body);

    const start = () => {
      this.view.components.startBtn.removeEventListener('click', start);
      let canvasSize = parseInt(this.view.components.canvasSize.value, 10)
        || this.defaultCanvasSize;

      if (canvasSize < 3) {
        canvasSize = 3;
      } else if (canvasSize > 64) {
        canvasSize = 64;
      }

      document.body.innerHTML = '';
      const { Controller, View, Model } = this.api;
      const mainApp = new Controller(View, Model, canvasSize, this.user);
      mainApp.init();
    };

    this.view.components.startBtn.addEventListener('click', start);

    const onLogin = (response) => {
      if (!response.session.user) {
        return;
      }

      const user = {
        firstName: response.session.user.first_name || '',
        lastName: response.session.user.last_name || '',
      };

      this.user = user;
      this.view.greeting(user);
    };

    const { loginBtn } = this.view.components;
    window.VK.UI.button(loginBtn);
    loginBtn.addEventListener('click', () => {
      window.VK.Auth.login(onLogin);
    });

    window.VK.Auth.getLoginStatus(onLogin);
  }
}
