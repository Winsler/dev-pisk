import api from './index';

const { Controller, View, Model } = api;

const app = new Controller(View, Model, 32);
app.init();
