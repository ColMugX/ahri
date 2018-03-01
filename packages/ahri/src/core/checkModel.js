import { assert, isString, isObject, isFunction } from './utils'

export default function checkModel (model, existModels = []) {
  const {
    namespace,
    state,
    getter,
    mutations,
    actions,
    subscriptions
  } = model
  const out = {}
  const store = out.store = {}

  assert(state, `state not found!`)
  assert(mutations, `mutations not found!`)
  assert(isObject(mutations), `mutations should be object, but got ${typeof mutations}`)

  if (namespace && isString(namespace)) {
    assert(namespace !== 'GlobalApp', `namespace should not be 'GlobalApp'`)
    assert(!existModels.some(model => model.name === namespace), `namespace should be unique`)
    store.namespaced = true
    out.name = namespace
  } else {
    out.name = 'GlobalApp'
  }

  if (actions) {
    assert(actions, `actions should be object, but got ${typeof actions}`)
  }

  if (subscriptions) {
    assert(
      Object.keys(subscriptions).every(key => isFunction(subscriptions[key])),
      `subscription should be function`
    )
  }

  store.state = state
  store.mutations = mutations
  store.actions = actions
  store.getter = getter || {}

  return out
}

export function mixModel (models) {
  const modules = {}
  let ga = {}
  const deepMerge = (o1, o2) => {
    for (const k in o2) {
      o1[k] = o1[k] && o1[k].toString() === '[object Object]'
        ? deepMerge(o1[k], o2[k])
        : o1[k] = o2[k]
    }
    return o1
  }

  for (const key in models) {
    const model = models[key]
    if (model.name === 'GlobalApp') {
      ga = deepMerge(ga, model.store)
      continue
    }
    modules[model.name] = model.store
  }
  modules['GlobalApp'] = ga
  return modules
}
