import React, { Component } from 'react'

import './App.css'
import Header from '../header/components/Header'
import Drawer from '../header/components/Drawer'
import Footer from '../footer/components/Footer'

class App extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header />
        <Drawer />
        <main className="android-content mdl-layout__content">
          {this.props.children}
          <Footer />
        </main>
      </div>
    )
  }
}

export default App
