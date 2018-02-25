import { assert, isString, isObject, isFunction } from './utils'

export default function checkModel (model) {
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
    assert(namespace !== 'GlobalApp', `namespace should not be GlobalApp`)
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

  for (const key in models) {
    const model = models[key]
    modules[model.name] = model.store
  }
  return modules
}
