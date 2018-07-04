'use strict';

const Controller = require('egg').Controller;
const Vue = require('vue');
const ahri = require('ahri').default;

const app = ahri({
  ssr: true,
});

const appRouter = app.router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Vue.component('index', {
        render(h) {
          return h('h1', null, [ 'hi, egg and ahri.' ]);
        },
      }),
    },
  ],
});

class HomeController extends Controller {
  async index() {
    appRouter.push(this.ctx.request.url);
    const content = await app.start();
    await this.ctx.render('index.html', { content });
  }
}

module.exports = HomeController;
