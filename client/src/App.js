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
  backgroundColor,
  name,
  description,
  image,
  isFetching,
  main,
  theme,
  children,
  search
}) => {
  console.log(theme && theme.palette && theme.palette.canvasColor)
  return (
    !isFetching &&
    <MuiThemeProvider muiTheme={getMuiTheme(theme) || null}>
      <div style={{ backgroundColor }}>
        <Helmet>
          <meta charSet="utf-8" />
          {name && <title>{name}</title>}
          {description && <meta name="description" content={description} />}
          {image && <link rel="shortcut icon" href={image} />}
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
          <FooterContainer />
        </CSSTransitionGroup>
      </div>
    </MuiThemeProvider>
  )
}



const mapStateToProps = ({
  brand: {
    business: { name, description, image },
    isFetching,
    main,
    theme,
  },
  search
}) => ({
  backgroundColor: main.styles && main.styles.backgroundColor,
  name,
  description,
  image,
  isFetching,
  main,
  theme,
  search
})

export default connect(mapStateToProps)(App)
