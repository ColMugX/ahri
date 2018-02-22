import VueRouter from 'vue-router'
import { assert } from './utils'

const lazyLoad = route => () => import(`@/routes/${route}`)

export default function (router = {}, base) {
  const _router = {}
  _router.base = base || '/'
  _router.routes = router.routes
  assert(router.routes, `[router] routes not found!`)

  router.routes.forEach((route, idx) => { _router.routes[idx].component = lazyLoad(route.component) })

  return new VueRouter(_router)
}
