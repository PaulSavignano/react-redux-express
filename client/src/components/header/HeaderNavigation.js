import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import IconButton from 'material-ui/IconButton'

import './header.css'
import HeaderPageLink from './HeaderPageLink'
import HeaderUser from './HeaderUser'
import CartIcon from '../../containers/cart/CartIcon'
import { searchToggle } from '../../actions/search'

class HeaderNavigation extends Component {
  state = {
    navClass: null,
    width: 0
  }
  componentDidMount() {
    const width = this.navigation.clientWidth
    const totalWidth = width/.85
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
  render() {
    const { navClass } = this.state
    const {
      color,
      dispatch,
      firstName,
      fontFamily,
      hasProducts,
      pages,
      search,
      sections
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
            <HeaderPageLink
              key={page._id}
              color={color}
              dispatch={dispatch}
              fontFamily={fontFamily}
              page={page}
              sections={sections}
            />
          ))}
        </div>
        <IconButton
          iconClassName="fa fa-search"
          iconStyle={{ verticalAlign: 'bottom', fontSize: 16, color }}
          onTouchTap={() => dispatch(searchToggle(!search.searching))}
        />
        <HeaderUser
          color={color}
          firstName={firstName}
          fontFamily={fontFamily}
        />
        {hasProducts &&
          <IconButton
            children={<CartIcon color={color}/>}
            onTouchTap={() => dispatch(push('/user/cart'))}
            style={{ padding: '12px 0' }}
          />
        }
      </div>
    )
  }
}

HeaderNavigation.propTypes = {
  color: PropTypes.string,
  isFetching: PropTypes.bool,
  pages: PropTypes.array,
}

export default HeaderNavigation
