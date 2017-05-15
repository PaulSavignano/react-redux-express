import React from 'react'
import { connect } from 'react-redux'

import SearchList from './products/containers/SearchList'
import Header from './header/containers/Header'
import Footer from './footer/components/Footer'

const App = ({ search, children }) => (
  <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'stretch', height: '100%' }}>
    <Header />
    {search.length ? <SearchList /> : children}
    <div style={{ display: 'flex', flexFlow: 'column', height: '100%' }}>
      <div style={{ flex: '1 1 auto' }}></div>
    </div>
    <Footer />
  </div>
)

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(App)
