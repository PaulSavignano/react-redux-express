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
    theme: null
  }
  componentWillMount() {
    const {
      bodyStyle: { values: { backgroundColor}},
      palette: { values },
      theme: { values: { fontFamily }}
    } = this.props.brand
    const theme = { fontFamily, palette: values }
    this.setState({ theme })
    document.getElementsByTagName('body')[0].style['background-color'] = backgroundColor
  }
  componentWillReceiveProps({ brand: { bodyStyle: { values: {backgroundColor }}}}) {
    if (backgroundColor !== this.props.brand.bodyStyle.values.backgroundColor) {
      document.getElementsByTagName('body')[0].style['background-color'] = backgroundColor
    }
  }
  render() {
    const {
      brand: {
        business: {
          image,
          values: {
            name,
            description
          }
        }
      },
      children,
      dispatch,
      pathname,
      search,
    } = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(this.state.theme)}>
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

App.propTypes = {
  brand: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.object.isRequired,
}

export default appContainer(App)
