import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import FlatButton from 'material-ui/FlatButton'

class HeaderPageLinks extends Component {

  render() {
    const { dispatch, isFetching, pages, pathname, color } = this.props

    return (
      !isFetching &&
      <span id="appBar" ref={span => {this.appBar = span}}>
        {pages.length && pages.filter(page => page.slug !== 'home').map(page => {
          const activeStyle = pathname === `/${page.slug}` && { borderBottom: '2px solid' }
          return (
            <FlatButton
              key={page._id}
              style={{ color, minWidth: 'none', margin: '0 16px' }}
              labelStyle={{ padding: '0 0 2px 0', ...activeStyle }}
              onTouchTap={() => dispatch(push(`/${page.slug}`))}
              label={page.name}
              hoverColor="none"
            />
          )
        })}
      </span>
    )
  }
}

HeaderPageLinks.propTypes = {
  color: PropTypes.string,
  isFetching: PropTypes.bool,
  pages: PropTypes.array,
  pathname: PropTypes.string
}

export default connect(
  ({ brand, pages, routing: { locationBeforeTransitions: { pathname }}
  }) => ({
    color: brand.appBar.values.navColor,
    isFetching: brand.isFetching || pages.isFetching ? true : false,
    pages: pages.items,
    pathname
  })
)(HeaderPageLinks)
