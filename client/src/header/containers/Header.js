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
    const { isFetching, theme, pages, user, path } = this.props
    return (
      isFetching ? null :
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this.handleToggle}
          title={
            <AppBarMenu
              theme={theme}
              pages={pages}
              user={user}
              path={path}
            />
          }
        />
        <Drawer docked={false} open={this.state.open} onRequestChange={(open) => this.setState({open}) }>
          <DrawerMenu 
            theme={theme}
            pages={pages}
            user={user}
            path={path}
            handleClose={this.handleClose}
          />
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.pages.isFetching,
  pages: state.pages.items || null,
  path: state.routing.locationBeforeTransitions.pathname || null,
  user: state.user || null,
  theme: state.theme || null
})

export default connect(mapStateToProps)(Header)
