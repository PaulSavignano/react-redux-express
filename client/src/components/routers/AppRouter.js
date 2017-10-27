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
import getHeroImages from '../../utils/getHeroImages'
import Header from '../header/Header'
import Footer from '../footer/Footer'

class AppRouter extends Component {
  state = {
    loadingImages: true,
  }
  handleImagesToPreloadBeforePageLoad = (reqPageHeroImages) => {
    const {
      appBar: { image: appBarImage },
      footer: { image: footerImage }
    } = this.props.brand
    const heroImages = getHeroImages(reqPageHeroImages)
    const brandImage = appBarImage && appBarImage.src ? [appBarImage.src] : []
    const footerImg = footerImage && footerImage.src ? [footerImage.src] : []
    const hasHeroImages = heroImages.length ? true : false
    const hasBrandImage = brandImage.length ? true : false
    const hasFooterImage = footerImg.length ? true : false
    if (hasHeroImages || hasBrandImage || hasFooterImage) {
      return loadImages([...brandImage, ...heroImages, ...footerImg]).then(() => {
        this.setState({ loadingImages: false })
      })
    }
    return this.setState({ loadingImages: false })
  }
  handleImagesToPreload = (allPageImages) => {
    const allImages = getPageImages(allPageImages)
    if (allImages.length) {
      return loadImages(allImages)
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
    const reqPageHeroImages = pages.filter(page => page.slug === reqPageSlug)
    const allPageImages = pages.filter(page => page.slug !== reqPageSlug)
    this.handleImagesToPreloadBeforePageLoad(reqPageHeroImages)
    this.handleImagesToPreload(allPageImages)
    document.getElementsByTagName('body')[0].style['background-color'] = backgroundColor
  }
  componentWillReceiveProps({ brand: { bodyStyle: { values: { backgroundColor }}}}) {
    if (backgroundColor !== this.props.brand.bodyStyle.values.backgroundColor) {
      document.getElementsByTagName('body')[0].style['background-color'] = backgroundColor
    }
  }
  render() {
    const { loadingImages } = this.state
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
