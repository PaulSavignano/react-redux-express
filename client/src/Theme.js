import React from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import routes from './routes'
import { history } from './index'

let Theme = ({ isFetching, theme }) => {
  return (
  isFetching ? null :
  <CSSTransitionGroup
    transitionName="image"
    transitionAppear={true}
    transitionAppearTimeout={1000}
    transitionEnter={false}
    transitionLeave={false}
  >
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      {routes(history)}
    </MuiThemeProvider>
  </CSSTransitionGroup>
  )
}
const mapStateToProps = (state) => {
  return {
    isFetching: state.theme.isFetching,
    theme: state.theme.values
  }
}
Theme = connect(mapStateToProps)(Theme)

export default Theme
