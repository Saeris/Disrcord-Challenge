import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { routerReducer, routerMiddleware, routerActions } from 'react-router-redux'
//import { persistStore, autoRehydrate } from 'redux-persist'
import createHistory from 'history/createBrowserHistory'
import { apollo } from './apollo'

// TODO: Persisted storage works almost perfectly, except for Tab ID auto-incrementation
// When implemented, the commented out lines can be added back in
class Store {
  constructor() {
    this.history = createHistory()
    // NOTE: Apollo isn't used in this project but it's included in the boilerplate for later use
    this.apollo = apollo.client
    this.state = this.configureStore()
    //persistStore(this.state)
    this.state.dispatch({type: `INIT_STATE`})
  }

  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ routerActions }) || compose

  createReducer(asyncReducers) {
    return combineReducers({
      apollo: this.apollo.reducer(),
      router: routerReducer,
      ...asyncReducers
    })
  }

  configureStore() {
    const loggerMiddleware = createLogger()
    const store = createStore(
      this.createReducer(),
      this.composeEnhancers(
        applyMiddleware(this.apollo.middleware()),
        applyMiddleware(routerMiddleware(this.history)),
        //autoRehydrate(),
        applyMiddleware(loggerMiddleware)
      )
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

export const Reducer = Class => {
  return class extends Class {
    constructor(...args) {
      super(...args)
      this.addToStore()
    }

    addToStore = () => {
      const name = super.constructor.name.toLowerCase().replace(`reducer`, ``)
      store.addReducer(name, this.reducer)
    }
  }
}

// Export our store service as a singleton to be accessed anywhere within the application
export const store = new Store()
