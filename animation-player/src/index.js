import AppView from './views/appView/index';
import Controller from './controllers/index';
import Model from './models/index';
import StartPageController from './controllers/startPageController/index';
import StartPageView from './views/startPageView/index';

const api = {
  View: AppView,
  Controller,
  StartPageController,
  StartPageView,
  Model,
};

export default api;
