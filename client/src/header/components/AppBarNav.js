import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import FontIcon from 'material-ui/FontIcon'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

import { searchText } from '../actions/search'
import SigninSignout from '../../users/components/SigninSignout'
import CartIcon from '../../carts/components/CartIcon'

import NavLink from './NavLink'

const styles = {
  AppBarNav: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    height: 'inherit'
  },
  search: {
    fontSize: 16,
    cursor: 'pointer',
    padding: '0 8px'
  },
  AppBarSearch: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  rightNav: {
    marginTop: '-3px',
  },
  rightSearch: {
    marginTop: '-3px',
    width: '100%'
  },
  searchField: {
    flex: '1 1 auto'
  },
  title: {
    cursor: 'pointer',
    color: 'rgb(0, 188, 212)',
    textDecoration: 'none',
    marginRight: 15
  },
  underlineStyle: {
    borderColor: 'rgb(0, 188, 212)'
  },
  favicon: {
    position: 'absolute',
    maxHeight: 100,
    maxWidth: 100
  }
}

class AppBarNav extends Component {
  state = { searching: false, openMenu: false }
  handleChange = () => {
    console.log('changing')
    this.setState({ openMenu: false })
  }
  render() {
    const { dispatch, user, image, handleDrawer } = this.props
    return (
      <AppBar
        onLeftIconButtonTouchTap={handleDrawer}
        title={
          this.state.searching ?
            <nav style={styles.AppBarSearch}>
              <div style={{ cursor: 'pointer', margin: '0 15px 0 0' }} onTouchTap={() => dispatch(push('/'))}>
                {image ? null : 'Brand'}
              </div>
              <span style={styles.rightSearch}>
                <FontIcon className="fa fa-search" style={styles.search} onTouchTap={() => this.setState({ searching: !this.state.searching }) }/>
                <TextField
                  autoFocus
                  underlineFocusStyle={styles.underlineStyle}
                  onBlur={() => this.setState({ searching: !this.state.searching })}
                  style={styles.searchField}
                  hintText="SEARCH"
                  fullWidth={true}
                  onChange={(e) => {
                    this.props.dispatch(searchText(e.target.value))
                  }}
                />
              </span>
            </nav>
            :
          <nav style={styles.AppBarNav}>
            <div style={{ cursor: 'pointer', margin: '0 15px 0 0' }} onTouchTap={() => dispatch(push('/'))}>
              {image ? <img src={image} style={styles.favicon} alt=""/> : 'Brand'}
            </div>
            <span style={styles.rightNav}>
              <NavLink to="/residential">Residential</NavLink>
              <NavLink to="/commercial">Commercial</NavLink>
              <NavLink to="/storage">Storage</NavLink>
              <NavLink to="/products">Products</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <FontIcon className="fa fa-search" style={styles.search} onTouchTap={() => this.setState({ searching: !this.state.searching })}/>
              <IconMenu
                iconButtonElement={
                  <IconButton style={{ padding: '20px 12px 4px 12px'}}><MoreVertIcon /></IconButton>
                }
                open={this.state.openMenu}
                onTouchTap={() => this.setState({ openMenu: !this.state.openMenu })}
                onRequestChange={(value) => this.setState({ openMenu: value })}
                style={{ verticalAlign: 'middle' }}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <SigninSignout user={user} handleChange={this.handleChange} />
              </IconMenu>
              <Link to="/cart"><CartIcon /></Link>
            </span>
          </nav>

        }/>
    )
  }
  }


export default connect()(AppBarNav)
