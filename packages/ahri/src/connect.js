import Vue from 'vue'

const functional = (fn) => Vue.component(fn.name || 'anonymous', {
  functional: true,
  render(h, ctx) {
    return fn.call(this, h, ctx.props, ctx.data)
  }
})

export {
  functional
}
