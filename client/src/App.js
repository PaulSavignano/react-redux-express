import React from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Helmet } from "react-helmet"

import SearchList from './products/containers/SearchList'
import Header from './header/containers/Header'
import Footer from './footer/components/Footer'

injectTapEventPlugin()

const App = ({ search, children, brand }) => {
  const backgroundColor = brand.values.mainColor || null
  return (
    brand.isFetching ? null : brand.values.palette ?
      <MuiThemeProvider muiTheme={getMuiTheme(brand.values)}>
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={900}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Helmet>
            <meta charSet="utf-8" />
            <title>{brand.values.name}</title>
            <meta name="description" content={brand.values.description} />
            <link rel="shortcut icon" href={brand.image} />
            <link rel="canonical" href={window.location.hostname} />
          </Helmet>
          <Header />
          <main style={{ backgroundColor }}>
            {search.length ? <SearchList /> : children}
          </main>
          <Footer />
        </CSSTransitionGroup>
      </MuiThemeProvider>

      :

      <MuiThemeProvider>
        <div>
          <Header />
          <main>
            {search.length ? <SearchList /> : children}
          </main>
          <Footer />
        </div>
      </MuiThemeProvider>
  )
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(App)
