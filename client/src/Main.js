import React, { Component } from 'react'

import Carousel from './containers/slides/Carousel'
import SearchList from './containers/search/SearchList'
import Header from './components/header/Header'
import FooterContainer from './containers/footer/FooterContainer'
import { toggleCarousel } from './actions/slides'

class Main extends Component {
  componentWillMount() {
    const { dispatch, pathname } = this.props
    if (pathname !== '/') return dispatch(toggleCarousel(false))
  }
  render() {
    const {
      children,
      search,
      slides: { autoplay, items, open }
    } = this.props
    return (
      open ?
      <Carousel autoplay={autoplay} items={items} open={open} />
      :
      <div>
        <Header />
        <main>
          {search.value ? <SearchList /> : children}
        </main>
        <FooterContainer />
      </div>
    )
  }
}

export default Main
