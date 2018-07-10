import { createRenderer } from 'vue-server-renderer'
const renderer = createRenderer()

/**
 * 封装SSR，直接通过 promise 得到内容
 * @param vm
 */
export default function (vm) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(vm, (err, html) => {
      if (err) return reject(err)
      resolve(html)
    })
  })
}
