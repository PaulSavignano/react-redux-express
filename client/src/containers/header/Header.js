import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'

import AppBarMenu from './AppBarMenu'
import DrawerMenu from './DrawerMenu'
import { toggleDrawer } from '../../actions/drawer'

class Header extends Component {
  state = {
    open: false
  }
  handleToggle = () => this.setState({open: !this.state.open})
  handleClose = () => this.setState({open: false})
  render() {
    const { appBar, dispatch, drawer, isFetching } = this.props
    const color = appBar.styles && appBar.styles.color
    return (
      !isFetching &&
      <header>
        <AppBar
          onLeftIconButtonTouchTap={() => dispatch(toggleDrawer())}
          titleStyle={{ height: 64 }}
          style={{ color }}
          title={<AppBarMenu/>}
        />
        <Drawer docked={false} open={drawer.open} onRequestChange={() => dispatch(toggleDrawer()) }>
          <DrawerMenu />
        </Drawer>
      </header>
    )
  }
}

const mapStateToProps = ({ brand: { appBar, isFetching }, drawer }) => {
  return {
    appBar,
    drawer,
    isFetching
  }
}

Header = connect(mapStateToProps)(Header)

export default Header
