import React from 'react'
import { push } from 'react-router-redux'
import AppBar from 'material-ui/AppBar'

import headerContainer from '../../containers/header/headerContainer'
import HeaderBrand from './HeaderBrand'
import SearchBar from '../../containers/search/SearchBar'
import HeaderNavigation from './HeaderNavigation'
import { toggleDrawer } from '../../actions/drawer'

const HeaderAppBar = ({
  brand: {
    appBar,
    theme: { fontFamily },
  },
  dispatch,
  firstName,
  hasProducts,
  pages,
  search,
  sections
}) => {
  const { backgroundColor, navColor } = appBar.values
  return (
    <AppBar
      zDepth={backgroundColor === 'transparent' ? 0 : 1}
      iconStyleLeft={{ fill: navColor }}
      onLeftIconButtonTouchTap={() => dispatch(toggleDrawer())}
      titleStyle={{ height: 64, color: navColor }}
      style={{ backgroundColor, color: navColor }}
      title={
        <nav>
          {search.searching ?
            <SearchBar />
          :
          <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}>
            <div
              style={{ cursor: 'pointer' }}
              onTouchTap={() => dispatch(push('/'))}
            >
              <HeaderBrand item={appBar} />
            </div>
            <HeaderNavigation
              color={navColor}
              dispatch={dispatch}
              firstName={firstName}
              fontFamily={fontFamily}
              hasProducts={hasProducts}
              pages={pages}
              search={search}
              sections={sections}
            />
          </div>
          }
        </nav>
      }
    />
  )
}

export default HeaderAppBar
