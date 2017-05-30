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

const mapStateToProps = (state) => {
  return {
    isFetching: state.pages.isFetching,
    pages: state.pages.items || null,
    path: state.routing.locationBeforeTransitions.pathname || null,
    user: state.user || null,
    brand: state.brand || null,
    hasProducts: state.products.items.length ? true : false
  }

}

export default connect(mapStateToProps)(Header)
