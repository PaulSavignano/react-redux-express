import React, { Component } from 'react'
import { connect } from 'react-redux'

import './App.css'
import SearchList from './SearchList'
import Header from './header/components/Header'
import AppBarMain from './header/components/AppBarMain'
import Drawer from './header/components/Drawer'
import Footer from './footer/components/Footer'

const App = ({ search, children }) => (
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <AppBarMain />
    {/* <Drawer /> */}
    <main className="android-content mdl-layout__content">
      {search.length ? <SearchList /> : children}
      <Footer />
    </main>
  </div>
)

const mapStateToProps = (state) => {
  console.log(state)
  return state
}

export default connect(mapStateToProps)(App)
