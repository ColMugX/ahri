import ahri from 'ahri'

// 1. Initialize
const app = ahri({
  router: {
    mode: 'history'
  }
})

// 2. Model
app.model(require('./models/index').default)
app.model(require('./models/example').default)

// 3. Router
app.router(require('./router').default)

// 4. Plugins (Vue)
// app.use()

// 5. Start
app.start('#root')
