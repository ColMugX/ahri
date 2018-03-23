import Vue from 'vue'
import Router from 'vue-router'
import CreateAhri from './core'
import { isString, assert, isElement } from './utils'
import checkRouter from './router'
import serverRender from './serverRender'

const render = (container, store, router, ssr) => {
  const app = new Vue({
    store,
    router,
    render: h => h('div', { attrs: { id: 'app' } }, [h('router-view')])
  })
  return ssr
    ? serverRender(app)
    : container ? app.$mount(container) : app
}

export default function (opt = {}) {
  const vuexConf = opt.vuex || {}
  const { ssr = false, ajax = false } = opt
  const app = CreateAhri(vuexConf)

  const router = router => {
    Vue.use(Router)
    router = checkRouter(router)
    app._router = router
    return router
  }

  // 参考 dva 对节点的挂载方式
  const start = container => {
    if (ajax) Vue.prototype.$ajax = require('axios')
    if (isString(container)) {
      container = document.querySelector(container)
    }
    assert(!container || isElement(container), `[Ahri] container should be HTMLElement`)
    assert(app._router, `[Ahri] router must be registered before app.start()`)

    const store = app.store(app._model)
    return render(container, store, app._router, ssr)
  }

  app.start = start
  app.router = router
  app.use = Vue.use.bind(Vue)

  return app
}
