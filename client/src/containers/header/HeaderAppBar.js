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
  activeColor,
  backgroundColor,
  color,
  dispatch,
  fontFamily,
  hasProducts,
  isFetching,
  pages,
  path,
  search
}) => (
  !isFetching &&
  <AppBar
    zDepth={backgroundColor === 'transparent' ? 0 : 1}
    iconStyleLeft={{ fill: color }}
    onLeftIconButtonTouchTap={() => dispatch(toggleDrawer())}
    titleStyle={{ height: 64, color }}
    style={{ backgroundColor, color }}
    title={
      <nav>
        {search.searching ?
          <SearchBar />
        :
        <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{ cursor: 'pointer' }}
            onTouchTap={() => dispatch(push('/'))}
          >
            <HeaderBrand />
          </div>

          <span style={{ fontFamily }}>
            <span className="appbar-nav">
              {pages.filter(page => page.slug !== 'home').map(page => {
                const activeStyle = path === `/${page.slug}` && { borderBottom: '2px solid' }
                return (
                  <FlatButton
                    key={page._id}
                    style={{ color }}
                    labelStyle={{ padding: '0 0 2px 0', ...activeStyle }}
                    onTouchTap={() => dispatch(push(`/${page.slug}`))}
                    label={page.name}
                    hoverColor="none"
                  />
                )
              })}
            </span>
            <IconButton
              iconClassName="fa fa-search"
              iconStyle={{ verticalAlign: 'bottom', fontSize: 16, color }}
              onTouchTap={() => dispatch(searchToggle(!search.searching))}
            />


            <HeaderUser fontFamily={fontFamily} />
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

const mapStateToProps = ({
  brand: {
    appBar: { values: { backgroundColor, navColor }},
    isFetching,
    theme: { fontFamily, palette: { primary1Color } },
  },
  pages,
  products: { items },
  routing,
  search,
}) => ({
  activeColor: primary1Color,
  backgroundColor,
  color: navColor,
  fontFamily,
  hasProducts: items.length,
  isFetching,
  pages: pages.items,
  path: routing.locationBeforeTransitions.pathname || null,
  search
})

export default connect(mapStateToProps)(HeaderAppBar)
