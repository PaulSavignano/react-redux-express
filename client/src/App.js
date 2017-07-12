import React from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Helmet } from "react-helmet"

import SearchList from './containers/search/SearchList'
import Header from './components/header/Header'
import FooterContainer from './containers/footer/FooterContainer'

injectTapEventPlugin()

const App = ({
  appBar,
  business,
  children,
  isFetching,
  main,
  theme,
  search
}) => {
  if(!isFetching) {
    const body = document.getElementsByTagName('body')[0]
    body.style['background-color'] = main.styles.backgroundColor
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
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={900}
          transitionEnter={false}
          transitionLeave={false}
          style={{ display: 'flex', flexFlow: 'column', height: '100%' }}
        >
          <Header />
          <main>
            {search.value ? <SearchList /> : children}
          </main>
          <FooterContainer />
        </CSSTransitionGroup>
      </div>
    </MuiThemeProvider>
  )
}



const mapStateToProps = ({
  brand: {
    appBar,
    business,
    isFetching,
    main,
    theme,
  },
  search
}) => ({
  appBar,
  business,
  isFetching,
  main,
  theme,
  search
})

export default connect(mapStateToProps)(App)
