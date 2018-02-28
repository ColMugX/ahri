import checkModel from '../../lib/core/checkModel'

const model = {
  namespace: 'test',
  state: {
    count: 0
  },
  mutations: {
    update(state) {
      return state.count += 1
    }
  },
  actions: {
    asyncUpdate({ commit }) {
      return commit('update')
    }
  }
}

describe('checkModel Test', () => {
  it('has namespace', () => {
    expect(checkModel(model).store.namespaced).toBe(true)
  })
  it('not namespace (not key)', () => {
    delete model.namespace
    expect(checkModel(model).name).toBe('GlobalApp')
  })
  it('not namespace (exist key)', () => {
    model.namespace = ''
    expect(checkModel(model).name).toBe('GlobalApp')
  })
})
