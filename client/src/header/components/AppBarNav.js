import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontIcon from 'material-ui/FontIcon'
import TextField from 'material-ui/TextField'
import { Link } from 'react-router'

import { searchText } from '../actions/search'
import SigninSignout from '../../users/components/SigninSignout'
import CartIcon from '../../products/components/CartIcon'

import NavLink from './NavLink'

const styles = {
  AppBarNav: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between'
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
  }
}

class AppBarNav extends Component {
  state = { open: false }
  handleToggle = () => this.setState({ open: !this.state.open })
  render() {
    return (
      this.state.open === false ?
        <nav style={styles.AppBarNav}>
          <Link to="/" style={styles.title}>Brand</Link>
          <span style={styles.rightNav}>
            <NavLink to="/todos">Todos</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/admin/products">Products Admin</NavLink>
            <NavLink to="/checkout">Checkout</NavLink>
            <FontIcon className="fa fa-search" style={styles.search} onTouchTap={this.handleToggle}/>
            <SigninSignout />
            <Link to="/cart"><CartIcon /></Link>
          </span>

        </nav>
        :
        <nav style={styles.AppBarSearch}>
          <Link to="/" style={styles.title}>Brand</Link>
          <span style={styles.rightSearch}>
            <FontIcon className="fa fa-search" style={styles.search} onTouchTap={this.handleToggle}/>
            <TextField
              autoFocus
              underlineFocusStyle={styles.underlineStyle}
              onBlur={this.handleToggle}
              style={styles.searchField}
              hintText="SEARCH"
              fullWidth={true}
              onChange={(e) => {
                this.props.dispatch(searchText(e.target.value))
              }}
            />
          </span>
        </nav>
    )
  }
}

export default connect()(AppBarNav)
