import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'

import AppBarBrand from './AppBarBrand'
import SearchBar from '../search/SearchBar'
import SigninSignout from '../users/SigninSignout'
import CartIcon from '../cart/CartIcon'
import { searchToggle } from '../../actions/search'

class AppBarMenu extends Component {
  state = {
    openMenu: false
  }
  handleOpen = (e) => {
    e.preventDefault()
    this.setState({
      openMenu: true,
      anchorEl: e.currentTarget,
    })
  }
  handleClose = () => this.setState({ openMenu: false })
  render() {
    const {
      brand: { appBar, theme },
      dispatch,
      hasProducts,
      pages,
      path,
      search,
      user
    } = this.props
    const color = appBar.styles ? appBar.styles.navColor : '#ffffff'
    const activeColor = theme.palette ? theme.palette.primary1Color : 'rgb(0, 188, 212)'
    return (
      <nav>
        {search.searching ?
          <SearchBar />
        :
        <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between'}}>
          <AppBarBrand />
          <span>
            <span className="appbar-nav">
              {pages.filter(page => page.slug !== 'home').map(page => (
                <FlatButton
                  key={page._id}
                  style={{ color: path === `/${page.slug}` ? activeColor : color }}
                  onTouchTap={() => dispatch(push(`/${page.slug}`))}
                  label={page.name}
                  hoverColor="none"
                />
              ))}
              <FlatButton
                style={{ color: path === `/contact` ? activeColor : color }}
                onTouchTap={() => dispatch(push(`/contact`))}
                label="Contact"
                hoverColor="none"
              />
            </span>
            <IconButton
              iconClassName="fa fa-search"
              iconStyle={{ fontSize: 18, color }}
              onTouchTap={() => dispatch(searchToggle(!search.searching))}
            />
            <FlatButton
              onTouchTap={this.handleOpen}
              label={user.values.firstName ? `Hello, ${user.values.firstName}`: `SIGN IN`}
              hoverColor="none"
              style={{ color }}
            />
            <Popover
              open={this.state.openMenu}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleClose}
              animation={PopoverAnimationVertical}
            >
              <Menu>
                <SigninSignout user={user} handleClose={this.handleClose} />
              </Menu>
            </Popover>
            { !hasProducts ? null :
            <IconButton
              children={<CartIcon  color={color}/>}
              onTouchTap={() => dispatch(push('/user/cart'))}
              style={{ padding: '12px 0' }}
            />
            }
          </span>
        </div>
        }
      </nav>
    )
  }
}

const mapStateToProps = ({ brand, pages, products, routing, search, user }) => {
  return {
    brand: brand || null,
    hasProducts: products.items.length ? true : false,
    isFetching: brand.isFetching,
    pages: pages.items || null,
    path: routing.locationBeforeTransitions.pathname || null,
    user: user || null,
    search
  }
}

AppBarMenu = connect(mapStateToProps)(AppBarMenu)

export default AppBarMenu
