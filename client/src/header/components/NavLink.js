import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router'



class NavLink extends Component {
  state = {
    color: this.props.theme.values.palette.textColor,
  }
  handleMouseEnter = () => this.setState({ color: this.props.theme.values.palette.primary1Color })
  handleMouseLeave = () => this.setState({ color: this.props.theme.values.palette.textColor })
  render() {
    const { dispatch, children, to, path, theme } = this.props
    const styles = {
      active: {
        color: theme.values.palette.primary1Color,
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


export default connect()(NavLink)
