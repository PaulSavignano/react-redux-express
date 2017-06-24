import React from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Helmet } from "react-helmet"

import SearchList from './search/containers/SearchList'
import Header from './header/containers/Header'
import Footer from './footer/components/Footer'

injectTapEventPlugin()

const App = ({ search, children, brand }) => {
  const backgroundColor = brand.theme.main.color || null
  return (
    brand.isFetching ? null : brand.theme.palette ?
      <MuiThemeProvider muiTheme={getMuiTheme(brand.theme)}>
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={900}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Helmet>
            <meta charSet="utf-8" />
            <title>{brand.business.name}</title>
            <meta name="description" content={brand.business.description} />
            <link rel="shortcut icon" href={brand.business.image} />
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
            {children}
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
