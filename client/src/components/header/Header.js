import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Paper from 'material-ui/Paper'

import './header.css'
import headerContainer from '../../containers/header/headerContainer'
import HeaderBrand from './HeaderBrand'
import SearchBar from '../../components/search/SearchBar'
import AppBarNavigation from './AppBarNavigation'
import DrawerNavigation from './DrawerNavigation'
import { toggleDrawer } from '../../actions/drawer'

class Header extends Component {
  handleDrawerToggle = () => this.props.dispatch(toggleDrawer())
  render() {
    const {
      appBar,
      cartQty,
      dispatch,
      drawer,
      firstName,
      fontFamily,
      isAdmin,
      isOwner,
      pages,
      phone,
      primary1Color,
      searchOpen,
    } = this.props
    const { values: { backgroundColor, height, navColor, showPhone }} = appBar
    return (
      <header>
        <AppBar
          zDepth={backgroundColor === 'transparent' ? 0 : 1}
          iconStyleLeft={{ fill: navColor }}
          onLeftIconButtonTouchTap={this.handleDrawerToggle}
          titleStyle={{ color: navColor, height }}
          style={{ backgroundColor, color: navColor }}
          title={
            <nav>
              {searchOpen ?
                <SearchBar
                  color={navColor}
                />
              :
              <div className="appbar">
                <HeaderBrand item={appBar} />
                <AppBarNavigation
                  cartQty={cartQty}
                  color={navColor}
                  dispatch={dispatch}
                  firstName={firstName}
                  fontFamily={fontFamily}
                  pages={pages}
                  phone={phone}
                  primary1Color={primary1Color}
                  searchOpen={searchOpen}
                  showPhone={showPhone}
                />
              </div>
              }
            </nav>
          }
        />
        <Drawer docked={false} open={drawer.open} onRequestChange={this.handleDrawerToggle}>
          <Paper
            className="drawer-brand"
            style={{ backgroundColor }}
            zDepth={backgroundColor === 'transparent' ? 0 : 1}
            onTouchTap={this.handleDrawerToggle}
          >
            <HeaderBrand item={appBar} maxHeight={64}/>
          </Paper>
          {firstName && <div style={{ padding: 16, marginTop: 8 }}>Hello, {firstName}</div>}
          <DrawerNavigation
            dispatch={dispatch}
            firstName={firstName}
            isAdmin={isAdmin}
            isOwner={isOwner}
            pages={pages}
            cartQty={cartQty}
            color={navColor}
          />
        </Drawer>
      </header>
    )
  }
}

Header.propTypes = {
  appBar: PropTypes.object.isRequired,
  cartQty: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  drawer: PropTypes.object.isRequired,
  firstName: PropTypes.string,
  fontFamily: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
  isOwner: PropTypes.bool,
  pages: PropTypes.array,
  phone: PropTypes.string,
  primary1Color: PropTypes.string.isRequired,
  searchOpen: PropTypes.bool.isRequired
}

export default headerContainer(Header)
