import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import AppBar from 'material-ui/AppBar'

import HeaderBrand from './HeaderBrand'
import SearchBar from '../search/SearchBar'
import HeaderNavigation from './HeaderNavigation'
import { toggleDrawer } from '../../actions/drawer'

const HeaderAppBar = ({
  backgroundColor,
  color,
  dispatch,
  hasProducts,
  isFetching,
  search
}) => {
  return (
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
          <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}>
            <div
              style={{ cursor: 'pointer' }}
              onTouchTap={() => dispatch(push('/'))}
            >
              <HeaderBrand />
            </div>
            <HeaderNavigation />
          </div>
          }
        </nav>
      }
    />
  )
}

const mapStateToProps = ({
  brand: {
    appBar: { values: { backgroundColor, navColor }},
    isFetching,
  },
  search,
}) => ({
  backgroundColor,
  color: navColor,
  isFetching,
  search
})

export default connect(mapStateToProps)(HeaderAppBar)
