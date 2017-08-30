import React, { Component } from 'react'
import PropTypes from 'prop-types'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Helmet } from "react-helmet"

import appContainer from '../../containers/app/appContainer'
import SearchList from '../../containers/search/SearchList'
import Header from '../header/Header'
import Footer from '../footer/Footer'

injectTapEventPlugin()

class App extends Component {
  state = {
    backgroundColor: null
  }
  componentWillMount() {
    const { backgroundColor } = this.props.brand.bodyStyle.values
    this.setState({ backgroundColor })
  }
  componentWillReceiveProps({ brand: { bodyStyle: { values: {backgroundColor }}}}) {
    if (backgroundColor !== this.props.brand.bodyStyle.values.backgroundColor) {
      this.setState({ backgroundColor })
    }
  }
  render() {
    document.getElementsByTagName('body')[0].style['background-color'] = this.state.backgroundColor
    const {
      brand: {
        appBar: { image },
        bodyStyle: { values: { backgroundColor }},
        business: {
          values: {
            name,
            description
          }
        },
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
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            {name && <title>{name}</title>}
            {description && <meta name="description" content={description} />}
            {image.src ? <link rel="shortcut icon" href={image.src} /> : null}
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

export default appContainer(App)
