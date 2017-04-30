import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import AppBarNav from './AppBarNav'
import DrawerMenu from './DrawerMenu'

class Header extends Component {
  state = { open: false }
  handleToggle = () => this.setState({open: !this.state.open})
  render() {
    return (
      <div>
        <AppBar
          title={<AppBarNav />}
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer
          open={this.state.open}
          onRequestChange={this.handleToggle}
          docked={false}
        >
          <DrawerMenu handleToggle={this.handleToggle}/>
        </Drawer>
      </div>

    )
  }
}

export default Header
