import Vue from 'vue'
import Vuex from 'vuex'
import checkModel, { mixModel } from './checkModel'

const initModel = {
  namespace: '@@ahri',
  state: {
    count: 0
  },
  mutations: {
    update (state) {
      state.count += 1
    }
  }
}

const createStore = (app, config) => {
  Vue.use(Vuex)
  app._store = new Vuex.Store(config)
  return app._store
}

export default function (opt = {}) {
  const _model = [
    checkModel(initModel)
  ]

  const model = model => _model.push(checkModel(model, app._model))

  const store = (models) => createStore(app, {
    modules: mixModel(models),
    ...opt
  })

  const app = {
    _model,
    model,
    store
  }
  return app
}
