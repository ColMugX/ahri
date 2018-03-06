import ahri from '../../index'
import Vue from 'vue'

const testCom = Vue.component('testCom', {
  render() {
    return h('div', null, ['hello'])
  }
})

const model = {
  namespace: 'test',
  state: { count: 0 },
  mutations: {
    update(state) { return state.count += 1 }
  }
}

const router = {
  routes:[
    { path: '/', component: testCom }
  ]
}


describe('app test', () => {

  it('create app', () => {
    const app = ahri()
    app.model(model)
    app.router(router)
    app.start()
  })

  it('no router', () => {
    const app = ahri()
    expect(() => app.start()).toThrow(/router must be registered before app.start()/)
  })

  it('store installed', () => {
    const app = ahri()
    app.model(model)
    app.router(router)
    const contain = app.start()
    contain.$store.commit('@@ahri/update')
    const state = contain.$store.state['@@ahri']
    expect(state.count).toBe(1)
  })

  it('vuex config', () => {
    const app = ahri({
      vuex: {
        strict: true
      }
    })
    app.model(model)
    app.router(router)
    const contain = app.start()
    expect(contain.$store.strict).toBe(true)
  })
})
