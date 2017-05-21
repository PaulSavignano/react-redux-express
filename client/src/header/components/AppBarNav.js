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


class AppBarNav extends Component {
  state = { searching: false, openMenu: false }
  handleChange = () => {
    console.log('changing')
    this.setState({ openMenu: false })
  }
  render() {
    const { dispatch, user, image, handleDrawer, pages, theme, path } = this.props
    const color = theme.values.appBar.textColor || null
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
        padding: '0 8px',
        color
      },
      AppBarSearch: {
        display: 'flex',
        flexFlow: 'row nowrap',
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
        maxHeight: 200,
        maxWidth: 200
      }
    }
    return (
      <AppBar
        onLeftIconButtonTouchTap={handleDrawer}
        titleStyle={{ height: 'auto' }}
        title={
          this.state.searching ?
            <nav style={styles.AppBarSearch}>
              <div style={{ cursor: 'pointer', margin: '0 15px 0 0' }} onTouchTap={() => dispatch(push('/'))}>
                {theme.image ? null : 'Brand'}
              </div>

              <span style={styles.rightSearch}>
                <FontIcon className="fa fa-search" style={styles.search} onTouchTap={() => this.setState({ searching: !this.state.searching }) }/>
                <TextField
                  autoFocus
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
              {theme.image ? <img src={theme.image} style={styles.favicon} alt=""/> : 'Brand'}
            </div>

            <span style={{ display: 'flex', flexFlow: 'column' }}>
              <span style={{ alignSelf: 'flex-end', color: theme.values.palette.primary1Color, height: 50, marginTop: '-10px', fontSize: 30 }}>805.456.6498</span>
              <span style={{ alignSelf: 'flex-end'}}>
                <span className="appbar-nav">
                  {pages.map(page => (
                    <NavLink
                      key={page._id}
                      to={`/pages/${page.slug}`}
                      path={path}
                      theme={theme}
                    >
                      {page.name}
                    </NavLink>
                  ))}
                  <NavLink to="/products" path={path} theme={theme} >Products</NavLink>
                  <NavLink to="/contact" path={path} theme={theme} >Contact</NavLink>
                </span>
                <FontIcon className="fa fa-search" style={styles.search} onTouchTap={() => this.setState({ searching: !this.state.searching })}/>
                <IconMenu
                  iconButtonElement={
                    <IconButton style={{ margin: '10px 0 4px 0'}}><MoreVertIcon /></IconButton>
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
                <span onTouchTap={() => dispatch(push('/cart'))} style={{ cursor: 'pointer' }}><CartIcon /></span>
              </span>
            </span>

          </nav>
        }
      />
    )
  }
}


export default connect()(AppBarNav)
