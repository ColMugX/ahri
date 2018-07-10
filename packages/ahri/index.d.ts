import {
  RouterMode,
  RouteConfig
} from 'vue-router'
import {
  PluginObject,
  PluginFunction
} from 'vue'
import { Module } from 'vuex'

export interface Router {
  mode: RouterMode
}

export interface AhriConf {
  /**
   * router config. (vue-router)
   */
  router: Router
  /**
   * enable ssr? (vue-server-renderer)
   */
  ssr: boolean
}

export interface AhriExport {
  /**
   * Register model.
   * @param model
   */
  model: (model: Module) => void
  /**
   * Register router.
   * @param routes
   */
  router: (routes: RouteConfig) => void
  /**
   * Register Vue Plugin.
   * @param plugin
   */
  use: (
    plugin: PluginObject<any> | PluginFunction<any>,
    ...options?: any[]
  ) => void
  /**
   * Start Application.
   * @param container
   */
  start: (container: Element | String) => void
}
/**
 * create ahri application.
 * @param opt
 */
export default function ahri(opt: AhriConf) : AhriExport
