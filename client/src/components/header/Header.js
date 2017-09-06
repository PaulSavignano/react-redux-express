import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Paper from 'material-ui/Paper'

import headerContainer from '../../containers/header/headerContainer'
import HeaderBrand from './HeaderBrand'
import SearchBar from '../../containers/search/SearchBar'
import AppBarNavigation from './AppBarNavigation'
import DrawerNavigation from './DrawerNavigation'
import { toggleDrawer } from '../../actions/drawer'

class Header extends Component {
  handleDrawerToggle = () => this.props.dispatch(toggleDrawer())
  handleDrawerNavigation = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    return dispatch(push('/'))
  }
  handleAppBarNavigation = () => this.props.dispatch(push('/'))
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
                <SearchBar />
              :
              <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}>
                <div
                  style={{ cursor: 'pointer' }}
                  onTouchTap={this.handleAppBarNavigation}
                >
                  <HeaderBrand item={appBar} />
                </div>
                <AppBarNavigation
                  cartQty={cartQty}
                  color={navColor}
                  dispatch={dispatch}
                  firstName={firstName}
                  fontFamily={fontFamily}
                  pages={pages}
                  pathname={pathname}
                  push={push}
                  search={search}
                />
              </div>
              }
            </nav>
          }
        />
        <Drawer docked={false} open={drawer.open} onRequestChange={() => dispatch(toggleDrawer()) }>
          <Paper
            style={{ backgroundColor, fontSize: 24, height: 64, paddingLeft: 16, cursor: 'pointer', display: 'flex' }}
            onTouchTap={this.handleDrawerNavigation}
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
            push={push}
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
