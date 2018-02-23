import Vue from 'vue'

const functional = (fn) => {
  return Vue.component(fn.name || 'anonymous', {
    functional: true,
    render (h, ctx) {
      return fn.call(this, h, ctx.props, ctx.data)
    }
  })
}

export default {
  functional
}
