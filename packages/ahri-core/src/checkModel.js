import { assert, isString, isObject, isFunction } from './utils'

export default function switchModel (model) {
  const {
    namespace,
    state,
    mutations,
    actions,
    subscriptions
  } = model
  const out = {}
  const store = out.store

  assert(state, `state not found!`)
  assert(mutations, `mutations not found!`)
  assert(isObject(mutations), `mutations should be object, but got ${typeof mutations}`)

  if (namespace && isString(namespace)) {
    assert(namespace !== 'GlobalApp', `namespace should not be GlobalApp`)
    store.namespace = true
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

  return out
}
