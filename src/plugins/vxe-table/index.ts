import { type App } from 'vue'
import { Grid, Table } from 'vxe-table'
import 'vxe-table/styles/cssvar.scss'

export default {
  install: (app: App): void => {
    app.use(Grid).use(Table)
  },
}
