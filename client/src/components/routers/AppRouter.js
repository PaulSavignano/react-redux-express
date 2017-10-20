import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'

import history from '../../containers/routers/history'
import loadImages from '../../utils/loadImages'
import appRouterContainer from '../../containers/routers/appRouterContainer'
import SearchList from '../search/SearchList'
import Routes from './Routes'
import getPageImages from '../../utils/getPageImages'
import flattenArray from '../../utils/flattenArray'
import Header from '../header/Header'
import Footer from '../footer/Footer'

class AppRouter extends Component {
  state = {
    loadingImages: true,
  }
  handlePreloadImages = (reqPage, otherPages) => {
    const currentImages = getPageImages(reqPage)
    const otherImages = getPageImages(otherPages)
    if (currentImages.length) {
      return loadImages(currentImages).then(() => {
        this.setState({ loadingImages: false })
        if (otherImages.length) {
          return loadImages(otherImages)
        }
      })
    }
    return this.setState({ loadingImages: false })
  }
  handleOtherImages = (otherPages) => {
    const images = getPageImages(otherPages)
    if (images.length) {
      return loadImages(images)
    }
    return
  }
  componentWillMount() {
    const {
      brand: {
        bodyStyle: { values: { backgroundColor}}
      },
      pages
    } = this.props
    const slug = window.location.pathname.slice(1)
    const reqPageSlug = slug || 'home'
    const reqPage = pages.filter(page => page.slug === reqPageSlug)
    const otherPages = pages.filter(page => page.slug !== reqPageSlug)
    this.handlePreloadImages(reqPage, otherPages)
    document.getElementsByTagName('body')[0].style['background-color'] = backgroundColor
  }
  componentWillReceiveProps({ brand: { bodyStyle: { values: { backgroundColor }}}}) {
    if (backgroundColor !== this.props.brand.bodyStyle.values.backgroundColor) {
      document.getElementsByTagName('body')[0].style['background-color'] = backgroundColor
    }
  }
  render() {
    const { loadingImages, loadingItemBackgroundImages } = this.state
    const { search } = this.props
    return (
      <Router history={history}>
        <div>
          {loadingImages ? null :
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
