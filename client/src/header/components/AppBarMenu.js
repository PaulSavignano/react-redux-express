import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import muiThemeable from 'material-ui/styles/muiThemeable'

import { searchText } from '../actions/search'
import SigninSignout from '../../users/components/SigninSignout'
import CartIcon from '../../carts/components/CartIcon'
import AppBarBrand from './AppBarBrand'

class AppBarMenu extends Component {
  state = {
    searching: false,
    openMenu: false
  }
  handleOpen = (e) => {
    e.preventDefault()
    this.setState({
      openMenu: true,
      anchorEl: e.currentTarget,
    })
  }
  handleClose = () => this.setState({ openMenu: false })
  render() {
    const {
      dispatch,
      user,
      pages,
      brand: { business, image },
      muiTheme: { appBar, palette },
      path,
      hasProducts
    } = this.props
    const styles = {
      nav: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between'
      },
      search: {
        color: appBar.textColor
      }
    }
    return (
      <CSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={900}
        transitionLeaveTimeout={600}
      >
        {this.state.searching ?
          <nav style={styles.nav} key={1}>
            <span style={{ marginTop: '-3px', width: '100%'}}>
              <IconButton
                iconClassName="fa fa-search"
                style={styles.search}
                onTouchTap={() => this.setState({ searching: !this.state.searching })}
              />
              <TextField
                autoFocus
                onBlur={() => this.setState({ searching: !this.state.searching })}
                style={{ flex: '1 1 auto' }}
                hintText="SEARCH"
                fullWidth={true}
                onChange={(e) => {
                  this.props.dispatch(searchText(e.target.value))
                }}
              />
            </span>
          </nav>

          :

          <nav style={styles.nav} key={2}>
            <div style={{ cursor: 'pointer', maxHeight: 64}} onTouchTap={() => dispatch(push('/'))}>
              {image ? <AppBarBrand /> : business.name || 'Brand'}
            </div>
            <span>
              <span className="appbar-nav">
                {pages.filter(page => page.slug !== 'home').map(page => (
                  <FlatButton
                    key={page._id}
                    style={{ color: path === `/${page.slug}` ? palette.primary1Color : appBar.textColor }}
                    onTouchTap={() => dispatch(push(`/${page.slug}`))}
                    label={page.name}
                    hoverColor="none"
                  />
                ))}
                <FlatButton
                  style={{ color: path === `/contact` ? palette.primary1Color : appBar.textColor }}
                  onTouchTap={() => dispatch(push(`/contact`))}
                  label="Contact"
                  hoverColor="none"
                />
              </span>
              {!hasProducts ? null :
                <IconButton
                  iconClassName="fa fa-search"
                  iconStyle={{ fontSize: 18}}
                  style={styles.search}
                  onTouchTap={() => this.setState({ searching: !this.state.searching })}
                />
              }
              <FlatButton
                onTouchTap={this.handleOpen}
                label={user.values.firstName ? `Hello, ${user.values.firstName}`: `SIGN IN`}
                hoverColor="none"
                style={{ color: appBar.textColor }}
              />
              <Popover
                open={this.state.openMenu}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleClose}
                animation={PopoverAnimationVertical}
              >
                <Menu>
                  <SigninSignout user={user} handleClose={this.handleClose} />
                </Menu>
              </Popover>
              { !hasProducts ? null :
                <IconButton
                  children={<CartIcon  />}
                  onTouchTap={() => dispatch(push('/cart'))}
                  style={{ padding: '12px 0' }}
                />
              }
            </span>
          </nav>
        }
      </CSSTransitionGroup>
    )
  }
}

AppBarMenu = compose(connect(), muiThemeable())(AppBarMenu)

export default AppBarMenu
