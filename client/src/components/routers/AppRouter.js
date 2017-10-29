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
  handleEagerLoadImages = (reqPageHeroImages) => {
    const {
      appBar: { image: appBarImage },
      body: { backgroundImage: bodyBackgroundImage },
      footer: { backgroundImage: footerBackgroundImage, image: footerImage }
    } = this.props.brand
    const brandImage = appBarImage && appBarImage.src ? [appBarImage.src] : []
    const bodyBackgroundImg = bodyBackgroundImage && bodyBackgroundImage.src ? [bodyBackgroundImage.src] : []
    const footerImg = footerImage && footerImage.src ? [footerImage.src] : []
    const footerBackgroundImg = footerBackgroundImage && footerBackgroundImage.src ? [footerBackgroundImage.src] : []
    const heroImages = getHeroImages(reqPageHeroImages)
    if (
      brandImage ||
      bodyBackgroundImg ||
      footerImg ||
      footerBackgroundImg ||
      heroImages
    ) {
      return loadImages([
        ...brandImage,
        ...bodyBackgroundImg,
        ...footerImg,
        ...footerBackgroundImg,
        ...heroImages,
      ]).then(() => {
        this.setState({ loadingImages: false })
      })
    }
    return this.setState({ loadingImages: false })
  }
  handleLazyLoadImages = (allPageImages) => {
    const allImages = getPageImages(allPageImages)
    if (allImages.length) {
      return loadImages(allImages)
    }
    return
  }
  handleBodyStyle = (backgroundColor, backgroundImage, backgroundPosition) => {
    console.log('inside body style')
    const body = document.querySelector("body")
    if (backgroundImage && backgroundImage.src) {
      console.log('body style', body)
      body.className = 'background-image'
      body.style.backgroundImage = `url(${backgroundImage.src})`
      body.style.backgroundPosition = backgroundPosition
    } else if (backgroundColor) {
      body.style.backgroundColor = backgroundColor
    }
  }
  componentWillMount() {
    const {
      brand: {
        body: {
          backgroundImage,
          values: {
            backgroundColor,
            backgroundPosition
          }
        }
      },
      pages
    } = this.props
    const slug = window.location.pathname.slice(1)
    const reqPageSlug = slug || 'home'
    const reqPageHeroImages = pages.filter(page => page.slug === reqPageSlug)
    const allPageImages = pages.filter(page => page.slug !== reqPageSlug)
    this.handleEagerLoadImages(reqPageHeroImages)
    this.handleLazyLoadImages(allPageImages)
    this.handleBodyStyle(backgroundColor, backgroundImage, backgroundPosition)
  }
  componentWillReceiveProps({
    brand: {
      body: {
        backgroundImage,
        values: { backgroundColor, backgroundPosition }
      }
    }
  }) {
    if (
      backgroundColor !== this.props.brand.body.values.backgroundColor ||
      backgroundPosition !== this.props.brand.body.values.backgroundPosition ||
      backgroundImage.src !== this.props.brand.body.backgroundImage.src
    ) {
    this.handleBodyStyle(backgroundColor, backgroundImage, backgroundPosition)
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
