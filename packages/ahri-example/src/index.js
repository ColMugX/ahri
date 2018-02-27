import ahri from '../../ahri'

const app = ahri()

app.router(require('./router').default)

app.start('#root')
