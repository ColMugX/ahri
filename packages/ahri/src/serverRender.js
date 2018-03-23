import { createRenderer } from 'vue-server-renderer'
const renderer = createRenderer()

export default function (vm) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(vm, (err, html) => {
      if (err) return reject(err)
      resolve(html)
    })
  })
}
