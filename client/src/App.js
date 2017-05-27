import React from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import SearchList from './products/containers/SearchList'
import Header from './header/containers/Header'
import Footer from './footer/components/Footer'

injectTapEventPlugin()

const App = ({ search, children, brand }) => {
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
          <Header />
          <main>
            {search.length ? <SearchList /> : children}
          </main><br/><br/><br/><br/><br/>
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
