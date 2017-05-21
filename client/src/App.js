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

const App = ({ search, children, theme }) => (
  theme.isFetching ? null :
    <MuiThemeProvider muiTheme={getMuiTheme(theme.values)}>
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={900}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div>
          <Header />
          <div style={{ paddingBottom: 100 }}>
            {search.length ? <SearchList /> : children}
          </div>
          <Footer />
        </div>
      </CSSTransitionGroup>
    </MuiThemeProvider>
)

const mapStateToProps = (state) => {
  console.log(state)
  return state
}

export default connect(mapStateToProps)(App)
