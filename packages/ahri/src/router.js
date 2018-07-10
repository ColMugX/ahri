import Vue from 'vue'
import VueRouter from 'vue-router'
import { assert, isString } from './utils'

const lazyLoad = route => resolve => require([`@/routes/${route}`], resolve)

/**
 * 获取路由结构
 * @param {object} option 全局配置
 * @param {array} routes 路由结构
 */
export default function (option, routes) {
  routes = routes || []
  const conf = option.router
  assert(routes && routes.length, `[router] routes not found!`)
  // 接受字符串，直接按默认形式加载路由（相当依赖 webpack alias）
  routes = routes.map(({ component }) => isString ? lazyLoad(component) : component)

  Vue.use(VueRouter)
  const router = {
    routes,
    mode: conf.mode
  }
  return new VueRouter(router)
}
