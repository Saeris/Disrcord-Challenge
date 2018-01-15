import { Route } from 'react-router'
import { ApolloProvider } from 'react-apollo'
import { ConnectedRouter } from 'react-router-redux'
import { history, state } from '../services'
import Home from './home/home'

console.log(state)

export const Root = () => (
  <ApolloProvider store={state} client={apollo.client}>
    <ConnectedRouter history={history}>
      <Route exact path="/" component={Home}/>
    </ConnectedRouter>
  </ApolloProvider>
)
