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
      return state.count += 1
    }
  }
}

const createStore = config => {
  Vue.use(Vuex)
  return new Vuex.Store(config)
}

export default function (opt = {}) {
  const _model = [
    checkModel(initModel)
  ]

  const model = model => _model.push(checkModel(model))

  const store = (models, plugin) => createStore({
    modules: mixModel(models),
    plugin,
    ...opt
  })

  const app = {
    _model,
    model,
    store
  }
  return app
}
