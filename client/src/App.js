import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Helmet } from "react-helmet"

import SearchList from './containers/search/SearchList'
import Header from './containers/header/Header'
import Footer from './containers/footer/Footer'

injectTapEventPlugin()

const App = ({ brand: { business, isFetching, main, theme }, children, search, }) => {
  const backgroundColor = main && main.values.color
  return (
    !isFetching &&
      <MuiThemeProvider muiTheme={getMuiTheme(theme) || null}>
        <div style={{ backgroundColor }}>
          <Helmet>
            <meta charSet="utf-8" />
            {business.name && <title>{business.name}</title>}
            {business.description && <meta name="description" content={business.description} />}
            {business.image && <link rel="shortcut icon" href={business.image} />}
            <link rel="canonical" href={window.location.hostname} />
          </Helmet>
          <CSSTransitionGroup
            transitionName="image"
            transitionAppear={true}
            transitionAppearTimeout={900}
            transitionEnter={false}
            transitionLeave={false}
          >
            <Header />
            <main>
              {search.value ? <SearchList /> : children}
            </main>
            <br/><br/><br/><br/><br/><br/>
            <Footer />
          </CSSTransitionGroup>
        </div>
      </MuiThemeProvider>
  )
}

const mapStateToProps = ({ brand, search }) => {
  brand.theme.appBar = brand.appBar.values
  return {
    brand,
    search
  }
}

export default connect(mapStateToProps)(App)
