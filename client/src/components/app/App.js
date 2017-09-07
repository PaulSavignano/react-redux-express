import React, { Component } from 'react'
import PropTypes from 'prop-types'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Helmet } from "react-helmet"

import appContainer from '../../containers/app/appContainer'
import SearchList from '../../components/search/SearchList'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import flattenArray from '../../utils/flattenArray'

injectTapEventPlugin()

class App extends Component {
  state = {
    theme: null,
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
    const theme = { fontFamily, palette: values }
    this.setState({ theme })
    document.getElementsByTagName('body')[0].style['background-color'] = backgroundColor

  }
  componentWillReceiveProps({ brand: { bodyStyle: { values: {backgroundColor }}}}) {
    if (backgroundColor !== this.props.brand.bodyStyle.values.backgroundColor) {
      document.getElementsByTagName('body')[0].style['background-color'] = backgroundColor
    }
  }
  render() {
    const {
      theme,
      loadingItemImages,
      loadingItemBackgroundImages
    } = this.state
    const {
      brand: {
        business: {
          image,
          values: {
            name,
            description
          }
        }
      },
      children,
      dispatch,
      pathname,
      search,
    } = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(this.state.theme)}>
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            {name && <title>{name}</title>}
            {description && <meta name="description" content={description} />}
            {image.src ? <link rel="shortcut icon" href={image.src} /> : null}
            <link rel="canonical" href={window.location.hostname} />
          </Helmet>
          {!loadingItemImages && !loadingItemBackgroundImages ?
            <div>
              <Header />
              <main>
                {search.value ? <SearchList /> : children}
              </main>
              <Footer />
            </div>
          :
            null
          }

        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  brand: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  pages: PropTypes.array.isRequired,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.object.isRequired,
}

export default appContainer(App)
