import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'



class NavLink extends Component {
  state = {
    color: this.props.primary2Color,
  }
  handleMouseEnter = () => this.setState({ color: this.props.primary1Color })
  handleMouseLeave = () => this.setState({ color: this.props.primary2Color })
  render() {
    const { children, to, path, primary1Color, primary2Color } = this.props
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
        textDecoration: 'none'
      }
    }
    const props = { children, to }
    const style = to === path ? styles.active : styles.inActive
    return (
      <Link
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...props}
        style={Object.assign({}, style, styles.both)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    path: state.routing.locationBeforeTransitions.pathname,
    primary1Color: state.theme.values ? state.theme.values.palette.primary1Color : null,
    primary2Color: state.theme.values ? state.theme.values.palette.primary2Color : null
  }
}

export default connect(mapStateToProps)(NavLink)
