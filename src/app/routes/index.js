import { Provider } from "react-redux"
import { ConnectedRouter } from "react-router-redux"
import { store } from "@services"
import { Directory } from "@routes/directory"
import routes from "@routes/routes"

const Root = () => (
  <Provider store={store.state}>
    <ConnectedRouter history={store.history}>
      <Directory paths={routes} />
    </ConnectedRouter>
  </Provider>
)

export default Root
