import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router, Route, Switch, Link, NavLink, withRouter } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'

import history from '../../containers/routers/history'
import loadImages from '../../utils/loadImages'
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
    const images = items.filter(item => item.item.image && item.item.image.src).map(({ item: { image: { src }}}) => src)
    return loadImages(images).then(() => this.setState({ loadingItemImages: false }))
  }
  handleItemBackgroundImages = (items) => {
    const images = items.filter(item => item.item.backgroundImage && item.item.backgroundImage.src).map(({ item: { backgroundImage: { src }}}) => src)
    return loadImages(images).then(() => this.setState({ loadingItemBackgroundImages: false }))
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
              {search ? <SearchList /> : <Routes />}
            </main>
            <Footer />
          </CSSTransitionGroup>
          }
        </div>
      </Router>
    )
  }
}

AppRouter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  brand: PropTypes.object.isRequired,
  pages: PropTypes.array.isRequired,
  search: PropTypes.string
}

export default appRouterContainer(AppRouter)
