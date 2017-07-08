import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'

import HeaderBrand from './HeaderBrand'
import SearchBar from '../search/SearchBar'
import HeaderUser from './HeaderUser'
import CartIcon from '../cart/CartIcon'
import { toggleDrawer } from '../../actions/drawer'
import { searchToggle } from '../../actions/search'

const HeaderAppBar = ({
  backgroundColor,
  dispatch,
  fontFamily,
  isFetching,
  color,
  activeColor,
  hasProducts,
  pages,
  path,
  search
}) => (
  !isFetching &&
  <AppBar
    onLeftIconButtonTouchTap={() => dispatch(toggleDrawer())}
    titleStyle={{ height: 64 }}
    style={{ backgroundColor }}
    title={
      <nav>
        {search.searching ?
          <SearchBar />
        :
        <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <HeaderBrand />
          <span>
            <span className="appbar-nav">
              {pages.filter(page => page.slug !== 'home').map(page => (
                <FlatButton
                  key={page._id}
                  style={{ color: path === `/${page.slug}` ? activeColor : color }}
                  onTouchTap={() => dispatch(push(`/${page.slug}`))}
                  label={page.name}
                  hoverColor="none"
                />
              ))}
              <FlatButton
                style={{ color: path === `/contact` ? activeColor : color }}
                onTouchTap={() => dispatch(push(`/contact`))}
                label="Contact"
                hoverColor="none"
              />
            </span>
            <IconButton
              iconClassName="fa fa-search"
              iconStyle={{ fontSize: 18, color }}
              onTouchTap={() => dispatch(searchToggle(!search.searching))}
            />
            <HeaderUser />
            { !hasProducts ? null :
            <IconButton
              children={<CartIcon color={color}/>}
              onTouchTap={() => dispatch(push('/user/cart'))}
              style={{ padding: '12px 0' }}
            />
            }
          </span>
        </div>
        }
      </nav>
    }
  />
)

const mapStateToProps = ({ brand, pages, products, routing, search, user }) => {
  const { appBar: { styles }, theme: { palette } } = brand
  const isFetching = !brand.isFetching && !pages.isFetching && !user.isFetching ? false : true
  const backgroundColor = styles ? styles.backgroundColor : 'rgb(0, 188, 212)'
  const color = styles ? styles.navColor : '#ffffff'
  const activeColor = palette ? palette.primary1Color : 'rgb(0, 188, 212)'
  const hasProducts = products.items.length ? true : false
  const path = routing.locationBeforeTransitions.pathname || null
  return {
    activeColor,
    backgroundColor,
    color,
    hasProducts,
    isFetching,
    pages: pages.items,
    path,
    search
  }
}

export default connect(mapStateToProps)(HeaderAppBar)
