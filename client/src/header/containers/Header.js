import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'

import AppBarMenu from '../components/AppBarMenu'
import DrawerMenu from '../components/DrawerMenu'

class Header extends Component {
  state = {
    open: false
  }
  handleToggle = () => this.setState({open: !this.state.open})
  handleClose = () => this.setState({open: false})
  render() {
    console.log('rendering header')
    const { isFetching, brand, pages, user, path, hasProducts } = this.props
    return (
      isFetching ? null :
      <header>
        <AppBar
          onLeftIconButtonTouchTap={this.handleToggle}
          titleStyle={{ height: 'auto'}}
          title={
            <AppBarMenu
              brand={brand}
              pages={pages}
              user={user}
              path={path}
              hasProducts={hasProducts}
            />
          }
        />
        <Drawer docked={false} open={this.state.open} onRequestChange={(open) => this.setState({open}) }>
          <DrawerMenu
            brand={brand}
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

const mapStateToProps = ({ pages, routing, user, brand, products }) => {
  return {
    isFetching: pages.isFetching,
    pages: pages.items || null,
    path: routing.locationBeforeTransitions.pathname || null,
    user: user || null,
    brand: brand || null,
    hasProducts: products.items.length ? true : false
  }
}

export default connect(mapStateToProps)(Header)
