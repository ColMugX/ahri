import Vue from 'vue'
import CreateAhri from './core'
import { isString, assert, isElement } from './utils'
import checkRouter from './router'
import serverRender from './ssr'

export default function (opt = {}) {
  const vuexConf = opt || {}
  const app = CreateAhri(vuexConf)

  app.start = start
  app.router = router
  app.use = Vue.use.bind(Vue)
  return app

  function router (router) {
    router = checkRouter(opt, router)
    app._router = router
    return router
  }

  function render (container, store, router, ssr) {
    const app = new Vue({
      store,
      router,
      render: h => h('div', { attrs: { id: 'app' } }, [h('router-view')])
    })
    return ssr
      ? serverRender(app)
      : container ? app.$mount(container) : app
  }

  // 参考 dva 对节点的挂载方式
  function start (container) {
    const option = opt || {}
    if (isString(container)) {
      container = document.querySelector(container)
    }
    assert(!container || isElement(container), `[Ahri] container should be HTMLElement`)
    assert(app._router, `[Ahri] router must be registered before app.start()`)

    const store = app.store(app._model)
    return render(container, store, app._router, option.ssr)
  }
}
