import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem'

import AppBarNav from './AppBarNav'
import DrawerMenu from './DrawerMenu'

const styles = {
  AppBar: {
    backgroundColor: 'white',

  },
  title: {
    cursor: 'pointer',
    color: 'rgb(0, 188, 212)'
  },
}

class Header2 extends Component {
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

export default Header2
