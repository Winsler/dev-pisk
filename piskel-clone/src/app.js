import api from './index';

const { StartPageController, StartPageView } = api;
const app = new StartPageController(StartPageView, api);
app.init();
