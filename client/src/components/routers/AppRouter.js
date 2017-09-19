import React, { Component } from 'react'
import { Router, Route, Switch, Link, NavLink, withRouter } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'

import history from '../../containers/routers/history'
import appRouterContainer from '../../containers/routers/appRouterContainer'
import SearchList from '../search/SearchList'
import Routes from './Routes'
import flattenArray from '../../utils/flattenArray'
import Header from '../header/Header'
import Footer from '../footer/Footer'

class AppRouter extends Component {
  state = {
    loadingItemImages: true,
    loadingItemBackgroundImages: true
  }
  handleItemImages = (items) => {
    let qty = 0
    let qtyLoaded = 0
    items.forEach(({ image }) => {
      if (image && image.src) {
        qty = qty + 1
        const img = new Image()
        const src = image.src
        img.onload = () => {
          qtyLoaded = qtyLoaded + 1
        }
        img.src = src
      }
    })
    if (qty === qtyLoaded) {
      this.setState({ loadingItemImages: false })
    }
  }
  handleItemBackgroundImages = (items) => {
    let qty = 0
    let qtyLoaded = 0
    items.forEach(({ backgroundImage }) => {
      if (backgroundImage && backgroundImage.src) {
        qty = qty + 1
        const img = new Image()
        const src = backgroundImage.src
        img.onload = () => {
          qtyLoaded = qtyLoaded + 1
        }
        img.src = src
      }
    })
    if (qty === qtyLoaded) {
      this.setState({ loadingItemBackgroundImages: false })
    }
  }
  componentWillMount() {
    const {
      brand: {
        bodyStyle: { values: { backgroundColor}},
        palette: { values },
        theme: { values: { fontFamily }}
      },
      pages
    } = this.props
    const itemsArray = pages.map(page => page.sections.map(section => section.items.map(item => item)))
    const items = flattenArray(itemsArray)
    this.handleItemImages(items)
    this.handleItemBackgroundImages(items)
    this.setState({ items })
    document.getElementsByTagName('body')[0].style['background-color'] = backgroundColor
  }
  componentWillReceiveProps({ brand: { bodyStyle: { values: {backgroundColor }}}}) {
    if (backgroundColor !== this.props.brand.bodyStyle.values.backgroundColor) {
      document.getElementsByTagName('body')[0].style['background-color'] = backgroundColor
    }
  }
  render() {
    const { loadingItemImages, loadingItemBackgroundImages } = this.state
    const { search } = this.props
    return (
      <Router history={history}>
        <div>
          {loadingItemImages || loadingItemBackgroundImages ? null :
          <CSSTransitionGroup
            transitionName="fadein"
            transitionAppear={true}
            transitionAppearTimeout={300}
            transitionEnter={false}
            transitionLeave={false}
          >
            <Header/>
            <main>
              {search.value ? <SearchList /> : <Routes />}
            </main>
            <Footer />
          </CSSTransitionGroup>
          }
        </div>
      </Router>
    )
  }
}

export default appRouterContainer(AppRouter)
