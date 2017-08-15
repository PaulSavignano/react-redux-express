import React, { Component } from 'react'

import AppCarousel from './components/carousels/AppCarousel'
import SearchList from './containers/search/SearchList'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { toggleAppCarousel } from './actions/carousels'


class Main extends Component {
  componentWillMount() {
    const { dispatch, pathname } = this.props
    if (pathname !== '/') return dispatch(toggleAppCarousel(false))
  }
  render() {
    const {
      children,
      search,
      carousels: { appOpen }
    } = this.props
    return (
      appOpen ?
      <AppCarousel />
      :
      <div>
        <Header />
        <main>
          {search.value ? <SearchList /> : children}
        </main>
        <Footer />
      </div>
    )
  }
}

export default Main
