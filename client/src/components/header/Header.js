import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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
      brand: {
        appBar,
        theme: { values: { fontFamily }},
      },
      cartQty,
      dispatch,
      drawer,
      firstName,
      isAdmin,
      isOwner,
      pages,
      pathname,
      search,
    } = this.props
    const { values: { backgroundColor, navColor }} = appBar
    return (
      <header>
        <AppBar
          zDepth={backgroundColor === 'transparent' ? 0 : 1}
          iconStyleLeft={{ fill: navColor }}
          onLeftIconButtonTouchTap={this.handleDrawerToggle}
          titleStyle={{ height: 64, color: navColor }}
          style={{ backgroundColor, color: navColor }}
          title={
            <nav>
              {search.searching ?
                <SearchBar
                  navColor={navColor}
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
                  pathname={pathname}
                  search={search}
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
            <HeaderBrand item={appBar} />
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
  brand: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  drawer: PropTypes.object.isRequired,
  firstName: PropTypes.string,
  isAdmin: PropTypes.bool,
  name: PropTypes.string,
  pages: PropTypes.array,
  search: PropTypes.object
}

export default headerContainer(Header)
