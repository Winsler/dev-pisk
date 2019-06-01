import api from './index';

const { Controller, View } = api;

const app = new Controller(View);
app.init();
