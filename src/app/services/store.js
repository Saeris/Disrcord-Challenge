import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import { routerReducer, routerMiddleware, routerActions } from "react-router-redux"
import createHistory from "history/createBrowserHistory"

// TODO: Persisted storage works almost perfectly, except for Tab ID auto-incrementation
// When implemented, the commented out lines can be added back in
class Store {
  constructor() {
    this.history = createHistory()
    this.state = this.configureStore()
    this.state.dispatch({ type: `INIT_STATE` })
  }

  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ routerActions }) || compose

  createReducer(asyncReducers) {
    return combineReducers({
      router: routerReducer,
      ...asyncReducers
    })
  }

  configureStore() {
    const loggerMiddleware = createLogger()
    const store = createStore(
      this.createReducer(),
      this.composeEnhancers(applyMiddleware(routerMiddleware(this.history)), applyMiddleware(loggerMiddleware))
    )
    store.asyncReducers = {}
    return store
  }

  // NOTE: This method can be used to dynamically add new reducers when a component is imported,
  // allowing for progressive enhancement when used with route-based code-splitting
  addReducer(name, reducer) {
    let newReducers = {}
    newReducers[`${name}`] = reducer
    this.state.asyncReducers = { ...this.state.asyncReducers, ...newReducers }
    this.state.replaceReducer(this.createReducer(this.state.asyncReducers))
  }
}

// Export our store service as a singleton to be accessed anywhere within the application
export const store = new Store()

export const Reducer = Class =>
  class extends Class {
    constructor(...args) {
      super(...args)
      this.addToStore()
    }

    addToStore = () => {
      const name = super.constructor.name.toLowerCase().replace(`reducer`, ``)
      store.addReducer(name, this.reducer)
    }
  }
