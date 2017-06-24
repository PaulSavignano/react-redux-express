import React from 'react'
import { connect } from 'react-redux'

import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import { searchText } from '../actions/index'

const SearchBar = ({ dispatch, brand, search, handleSearch }) => (
  <span style={{ width: '100%'}}>
    <IconButton
      iconClassName="fa fa-search"
      iconStyle={{ fontSize: 18}}
      style={{ color: brand.theme.appBar.textColor }}
      onTouchTap={() => handleSearch()}
    />
    <TextField
      autoFocus
      onBlur={() => handleSearch()}
      style={{ flex: '1 1 auto' }}
      hintText="SEARCH"
      fullWidth={true}
      value={search}
      onChange={(e) => dispatch(searchText(e.target.value))}
    />
  </span>
)

const mapStateToProps = ({ brand, search }) => ({
  brand,
  search
})

export default connect(mapStateToProps)(SearchBar)
