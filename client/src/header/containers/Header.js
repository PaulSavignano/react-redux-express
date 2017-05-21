import React, { Component } from 'react'
import { connect } from 'react-redux'

import AppBarNav from '../components/AppBarNav'
import DrawerNav from '../components/DrawerNav'

class Header extends Component {
  state = { open: false }
  handleDrawer = () => this.setState({ open: !this.state.open })
  render() {
    const { isFetching, pages, user, theme, path } = this.props
    return (
      isFetching ? null :
      <div>
        <AppBarNav
          handleDrawer={this.handleDrawer}
          user={user}
          pages={pages}
          theme={theme}
          path={path}
        />
        <DrawerNav
          handleDrawer={this.handleDrawer}
          open={this.state.open}
          pages={pages}
          user={user}
          theme={theme}
          path={path}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.pages.isFetching,
  pages: state.pages.items,
  path: state.routing.locationBeforeTransitions.pathname,
  user: state.user,
  theme: state.theme
})

export default connect(mapStateToProps)(Header)
