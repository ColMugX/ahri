import _ from 'lodash'
import {
  assert,
  isString,
  isFunction
} from '../utils'

const RESERVENAME = 'ahri'
/**
 *
 * @param {object} model
 * @param {object} prevModel
 */
export default function checkModel (model, prevModel) {
  prevModel = prevModel || []
  const {
    namespace,
    state,
    subscriptions,
    ...other
  } = model
  let newModel = {}
  const store = {}

  // 数据默认不归类，进默认module
  newModel.name = RESERVENAME

  // state 必须(最好)存在
  assert(state, `[Ahri model] namespace should be defined`)
  store.state = state

  if (namespace) {
    // 如果有 namespace 必须是字符串
    assert(isString(namespace), `[Ahri model] namespace should be string, but got ${typeof namespace}`)
    // 其次不能重复
    assert(!prevModel.some(model => model.name === namespace), `namespace should be unique`)
    // 不能与默认 module 重名
    assert(namespace !== RESERVENAME, `namespace should not be ${RESERVENAME}`)

    store.namespaced = true
    newModel.name = namespace
  }

  // 订阅(vue-router)，并不是本次该关心的点
  if (subscriptions) {
    assert(
      Object.keys(subscriptions).every(key => isFunction(subscriptions[key])),
      `subscription should be function`
    )
  }
  store.subscriptions = subscriptions

  newModel = {
    ...newModel,
    store: {
      ...store,
      ...other
    }
  }
  return newModel
}

/**
 * mix models output vuex configure.
 * @param {array} models
 */
export function mixModel (models) {
  const modules = {}
  let ga = {}

  for (const key in models) {
    const model = models[key]
    if (model.name === RESERVENAME) {
      ga = _.merge(ga, model.store)
    } else {
      modules[model.name] = model.store
    }
  }
  modules[RESERVENAME] = ga
  return modules
}
