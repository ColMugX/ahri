import Vue from 'vue'

export const connect = mapToOpt => {
  if (mapToOpt === 'functional') {
    return component => functional(component)
  }
}

const functional = component => {
  return Vue.component(component.name || 'anonymous', {
    functional: true,
    render (h, ctx) {
      const store = findStore(ctx.parent)
      const props = { ...store, ...ctx.props }
      return component.call(this, h, props, ctx.data)
    }
  })
}

const findStore = child => child.$store ? child.$store : findStore(child.$parent)
