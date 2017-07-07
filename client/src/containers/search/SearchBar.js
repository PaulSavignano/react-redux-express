import React from 'react'
import { connect } from 'react-redux'

import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import { searchToggle, searchAdd } from '../../actions/search'

const SearchBar = ({ dispatch, brand, search, handleSearch }) => (
  <span style={{ width: '100%'}}>
    <IconButton
      iconClassName="fa fa-search"
      iconStyle={{ fontSize: 18, color: brand.appBar.styles.navColor }}
      onTouchTap={() => handleSearch()}
    />
    <TextField
      autoFocus
      onBlur={() => dispatch(searchToggle(!search.searching))}
      style={{ flex: '1 1 auto' }}
      hintText="SEARCH"
      fullWidth={true}
      value={search.value}
      onChange={(e) => dispatch(searchAdd(e.target.value))}
    />
  </span>
)

const mapStateToProps = ({ brand, search }) => ({
  brand,
  search
})

export default connect(mapStateToProps)(SearchBar)
