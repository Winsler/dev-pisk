import NodeComponentView from '../NodeComponentView/index';
import html from './startPageView.html';

export default class StartPageView extends NodeComponentView {
  constructor() {
    super(html);
    this.components = {
      startBtn: this.node.querySelector('.start-btn'),
      loginBtn: this.node.querySelector('.login-btn'),
      canvasSize: this.node.querySelector('#canvasSize'),
      greeting: this.node.querySelector('.landing__greeting'),
    };
  }

  greeting({ firstName, lastName }) {
    if (!firstName && !lastName) {
      return;
    }
    this.components.loginBtn.classList.add('hidden');
    this.components.greeting.textContent = `Привет, ${firstName} ${lastName}`;
    this.components.greeting.classList.remove('hidden');
  }
}
