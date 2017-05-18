import React, { Component } from 'react'
import { connect } from 'react-redux'

import AppBarNav from '../components/AppBarNav'
import DrawerNav from '../components/DrawerNav'

class Header extends Component {
  state = { open: false }
  handleDrawer = () => this.setState({ open: !this.state.open })
  render() {
    const { isFetching, items, user, image } = this.props
    return (
      isFetching ? null :
      <div>
        <AppBarNav
          handleDrawer={this.handleDrawer}
          image={image}
          user={user}
        />
        <DrawerNav
          handleDrawer={this.handleDrawer}
          open={this.state.open}
          items={items}
          user={user}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const isFetching = state.pages.isFetching
  const items = isFetching ? [] : state.pages.items
  const user = state.user.isFetching ? {} : state.user
  const image = state.theme.isFetching ? null : state.theme.image
  return {
    isFetching,
    items,
    user,
    image
  }
}

export default connect(mapStateToProps)(Header)
