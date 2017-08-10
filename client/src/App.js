import React, { Component } from 'react'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Helmet } from "react-helmet"

import Main from './Main'

injectTapEventPlugin()

class App extends Component {
  render() {
    const {
      brand: { appBar, business, main, theme },
      children,
      dispatch,
      isFetching,
      pathname,
      search,
      slides
    } = this.props
    if(!isFetching) {
      const body = document.getElementsByTagName('body')[0]
      body.style['background-color'] = main.values.backgroundColor
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
          <Main
            children={children}
            dispatch={dispatch}
            pathname={pathname}
            search={search}
            slides={slides}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}


const mapStateToProps = ({
  brand,
  slides,
  search
}, {
  location: { pathname }
}) => ({
  brand,
  isFetching: brand.isFetching || slides.isFetching ? true : false,
  pathname,
  search,
  slides
})

export default connect(mapStateToProps)(App)
