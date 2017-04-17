import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const styles = {
  active: {
    color: 'rgb(0, 188, 212)',
  },
  inActive: {
    color: 'black',
  },
  both: {
    fontSize: 14,
    fontWeight: 400,
    padding: '10px 15px',
    textTransform: 'uppercase',
    textDecoration: 'none'
  }
}

const NavLink = ({ children, to, path }) => {
  const props = { children, to }
  const style = to === path ? styles.active : styles.inActive
  return (
    <Link {...props} style={Object.assign({}, style, styles.both)} className="appbar-nav"/>
  )
}

const mapStateToProps = (state) => {
  return {
    path: state.routing.locationBeforeTransitions.pathname
  }
}

export default connect(mapStateToProps)(NavLink)
