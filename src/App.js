import React, { Component } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { CookiesProvider } from 'react-cookie'

import Tab from './components/MainTab/MainTab.js'
// URL for httplink
const URL = 'https://fooder-backend.herokuapp.com/'

//httpLink for client
const httpLink = new HttpLink({
  uri: URL
})

//client for ApolloProvider
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    dataIdFromObject: o => (o._id ? `${o.__typename}:${o._id}` : null)
  })
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <CookiesProvider>
            <div className='App'>
              <Tab position='fixed' alignItems='flex-end' />
            </div>
          </CookiesProvider>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

export default App
