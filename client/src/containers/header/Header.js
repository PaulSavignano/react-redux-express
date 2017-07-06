import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import muiThemeable from 'material-ui/styles/muiThemeable'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'

import AppBarMenu from '../../components/header/AppBarMenu'
import DrawerMenu from '../../components/header/DrawerMenu'

class Header extends Component {
  state = {
    open: false
  }
  handleToggle = () => this.setState({open: !this.state.open})
  handleClose = () => this.setState({open: false})
  render() {
    const { brand, hasProducts, isFetching, muiTheme, pages, path, search, user  } = this.props
    return (
      !isFetching &&
      <header>
        <AppBar
          onLeftIconButtonTouchTap={this.handleToggle}
          titleStyle={{ height: 'auto'}}
          title={
            <AppBarMenu
              brand={brand}
              muiTheme={muiTheme}
              pages={pages}
              user={user}
              path={path}
              hasProducts={hasProducts}
              search={search}
            />
          }
        />
        <Drawer docked={false} open={this.state.open} onRequestChange={(open) => this.setState({open}) }>
          <DrawerMenu
            brand={brand}
            muiTheme={muiTheme}
            pages={pages}
            user={user}
            path={path}
            handleClose={this.handleClose}
            hasProducts={hasProducts}
          />
        </Drawer>
      </header>
    )
  }
}

const mapStateToProps = ({ brand, pages, products, routing, search, user }) => {
  return {
    brand: brand || null,
    hasProducts: products.items.length ? true : false,
    isFetching: pages.isFetching,
    pages: pages.items || null,
    path: routing.locationBeforeTransitions.pathname || null,
    user: user || null,
    search
  }
}

Header = compose(connect(mapStateToProps), muiThemeable())(Header)

export default Header
