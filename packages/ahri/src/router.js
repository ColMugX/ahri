import VueRouter from 'vue-router'
import { assert, isString } from './utils'

const lazyLoad = route => () => import(`@/routes/${route}`)

export default function (router = {}) {
  const _router = router
  assert(_router.routes, `[router] routes not found!`)

  router.routes.forEach((route, idx) => {
    if (isString(route.component)) {
      _router.routes[idx].component = lazyLoad(route.component)
    }
  })
  return new VueRouter(_router)
}
