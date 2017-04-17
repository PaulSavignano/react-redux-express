import React, { Component } from 'react'
import { connect } from 'react-redux'

import './App.css'
import SearchList from './SearchList'
import Header from './header/components/Header'
import AppBarMain from './header/components/AppBarMain'
import Footer from './footer/components/Footer'

const App = ({ search, children }) => (
  <div>
    <AppBarMain />
    {search.length ? <SearchList /> : children}
    <Footer />
  </div>
)

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(App)
