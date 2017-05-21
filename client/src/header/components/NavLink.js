import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router'
import muiThemeable from 'material-ui/styles/muiThemeable'


class NavLink extends Component {
  state = {
    color: this.props.muiTheme.palette.textColor,
  }
  handleMouseEnter = () => this.setState({ color: this.props.muiTheme.palette.primary1Color })
  handleMouseLeave = () => this.setState({ color: this.props.muiTheme.palette.textColor })
  render() {
    const { dispatch, children, to, path, muiTheme } = this.props
    console.log(muiTheme)
    const { primary1Color } = muiTheme.palette
    const styles = {
      active: {
        color: primary1Color,
      },
      inActive: {
        color: this.state.color
      },
      both: {
        fontSize: 14,
        fontWeight: 400,
        padding: '10px 15px',
        textTransform: 'uppercase',
        textDecoration: 'none',
        cursor: 'pointer'
      }
    }
    const props = { children, to }
    const style = to === path ? styles.active : styles.inActive
    return (
      <span
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={() => {
          console.log('hello')
          dispatch(push(to))
        }}
        {...props}
        style={Object.assign({}, style, styles.both)}
      />
    )
  }
}

NavLink = compose(connect(), muiThemeable())(NavLink)

export default NavLink
