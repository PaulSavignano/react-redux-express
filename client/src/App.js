import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Helmet } from "react-helmet"

import SearchList from './containers/search/SearchList'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

injectTapEventPlugin()

class App extends Component {
  render() {
    const {
      brand: {
        appBar,
        bodyStyle: { values: { backgroundColor }},
        business,
        theme: { values: { fontFamily }},
        palette
      },
      children,
      dispatch,
      isFetching,
      pathname,
      search,
    } = this.props
    const theme = {
      fontFamily,
      palette: palette.values
    }
    if(!isFetching) {
      const appBody = document.getElementsByTagName('body')[0]
      appBody.style['background-color'] = backgroundColor
    }
    return (
      !isFetching &&
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            {business.name && <title>{business.name}</title>}
            {business.description && <meta name="description" content={business.description} />}
            {appBar.image && <link rel="shortcut icon" href={appBar.image.src} />}
            <link rel="canonical" href={window.location.hostname} />
          </Helmet>
          <Header />
          <main>
            {search.value ? <SearchList /> : children}
          </main>
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}


const mapStateToProps = ({
  brand,
  search
}, {
  location: { pathname }
}) => ({
  brand,
  isFetching: brand.isFetching,
  pathname,
  search,
})

export default connect(mapStateToProps)(App)
