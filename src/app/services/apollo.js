import { ApolloClient, createNetworkInterface } from 'react-apollo'

// NOTE: This service class is only included as part of the project's boilerplate code
class Apollo {
  constructor() {
    // http://dev.apollodata.com/core/network.html

    // Configure the client to use the api provider from our api config
    let networkInterface = createNetworkInterface({ uri: `https://api.github.com/graphql` })

    // Add authorization tokens to our request headers before making calls to the api
    networkInterface.use([{
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {}
        }
        //req.options.headers.authorization = `bearer ${token}`
        next()
      }
    }])

    this.client = new ApolloClient({ networkInterface })
  }
}

// Export our Apollo client instance as a singleton
export const apollo = new Apollo()
