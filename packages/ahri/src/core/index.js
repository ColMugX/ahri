import Vue from 'vue'
import Vuex from 'vuex'
import checkModel, { mixModel } from './checkModel'

/**
 * 创建封装过的 vuex
 * @param {*} opt
 */
export default function create (opt) {
  opt = opt || {}
  const _model = []

  const model = model => _model.push(checkModel(model, app._model))

  const store = () => createStore({
    modules: mixModel(_model),
    ...opt
  })

  const app = {
    model,
    store
  }
  return app

  function createStore (opt) {
    Vue.use(Vuex)
    app._store = new Vuex.Store(opt)
    return app._stoer
  }
}
