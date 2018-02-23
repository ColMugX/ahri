import Vue from 'vue'
import Router from 'vue-router'
import { isString, assert, isElement } from './utils'
import checkRouter from './router'

const render = (container, store, router) => {
  const app = new Vue({
    store,
    router,
    render: h => h('div', { attrs: { id: 'app' } }, [h('router-view')])
  })

  return container ? app.$mount(container) : app
}

export default function (opt = {}) {
  const app = {}

  const router = router => {
    Vue.use(Router)
    router = checkRouter(router)
    app.router = router
  }

  // 参考 dva 对节点的挂载方式
  const start = container => {
    if (isString(container)) {
      container = document.querySelector(container)
    }
    assert(isElement(container), `[Ahri] container should be HTMLElement`)
    assert(app.router, `[Ahri] router must be registered before app.start()`)

    return render(container, store, app.router)
  }

  app.start = start
  app.router = router
  app.use = Vue.use.bind(Vue)

  return app
}
