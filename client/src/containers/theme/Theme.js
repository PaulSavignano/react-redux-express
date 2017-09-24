import React from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

injectTapEventPlugin()

const Theme = ({ children, isFetching, theme }) => (
  isFetching ? null :
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    {children}
  </MuiThemeProvider>
)

const mapStateToProps = ({
  brand: {
    bodyStyle: { values: { backgroundColor}},
    isFetching,
    palette: { values },
    typography: { values: { fontFamily }}
  }
}) => ({
  theme: { fontFamily, palette: values },
  isFetching
})

export default connect(mapStateToProps)(Theme)
