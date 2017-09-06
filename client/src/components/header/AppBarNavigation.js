import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import IconButton from 'material-ui/IconButton'

import './header.css'
import AppBarPageLink from './AppBarPageLink'
import AppBarUser from './AppBarUser'
import HeaderCartIcon from './HeaderCartIcon'
import { searchToggle } from '../../actions/search'

class AppBarNavigation extends Component {
  state = {
    navClass: null,
    width: 0
  }
  componentDidMount() {
    const width = this.navigation.clientWidth
    const totalWidth = width/.75

    let navClass
    switch(true) {
      case totalWidth < 375:
        navClass = 'largerThanIphone375'
        break
      case totalWidth < 667:
        navClass = 'largerThanIphone667'
        break
      case totalWidth < 768:
        navClass = 'largerThanIpad768'
        break
      case totalWidth < 1024:
        navClass = 'largerThanIpad1024'
        break
      case totalWidth < 1366:
        navClass = 'largerThanIpad1366'
        break
      default:
        navClass = 'largerThan1920'
    }
    this.setState({ navClass, width });
  }
  handleSearchToggle = () => {
    const { dispatch, search } = this.props
    return dispatch(searchToggle(!search.searching))
  }
  handleNavToCart = () => {
    const { dispatch } = this.props
    dispatch(push('/user/cart'))
  }
  render() {
    const { navClass } = this.state
    const {
      cartQty,
      color,
      dispatch,
      firstName,
      fontFamily,
      pages,
      pathname,
      search,
    } = this.props
    return (
      <div
        ref={ (navigation) => this.navigation = navigation}
        style={{ fontFamily, display: 'flex', flexFlow: 'row nowrap', justifyContent: 'flex-end', alignItems: 'center' }}
      >
        <div
          style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}
          className={navClass}
        >
          {pages.length && pages.filter(page => page.slug !== 'home').map(page => (
            <AppBarPageLink
              key={page._id}
              color={color}
              dispatch={dispatch}
              fontFamily={fontFamily}
              page={page}
              pathname={pathname}

            />
          ))}
        </div>
        <IconButton
          iconClassName="fa fa-search"
          iconStyle={{ verticalAlign: 'bottom', fontSize: 16, color }}
          onTouchTap={this.handleSearchToggle}
        />
        <AppBarUser
          color={color}
          dispatch={dispatch}
          firstName={firstName}
          fontFamily={fontFamily}
        />
        {cartQty &&
          <HeaderCartIcon
            cartQty={cartQty}
            dispatch={dispatch}
            color={color}
            onNavToCart={this.handleNavToCart}
          />
        }
      </div>
    )
  }
}

AppBarNavigation.propTypes = {
  cartQty: PropTypes.number,
  color: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  fontFamily: PropTypes.string.isRequired,
  pages: PropTypes.array,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.object
}

export default AppBarNavigation
