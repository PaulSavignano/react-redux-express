import React from 'react'
import { connect } from 'react-redux'

import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import { searchToggle, searchAdd } from '../../actions/search'

const SearchBar = ({ color, dispatch, search, handleSearch, isFetching }) => (
  !isFetching &&
  <span>
    <IconButton
      iconClassName="fa fa-search"
      iconStyle={{ fontSize: 16, color }}
      onTouchTap={() => handleSearch()}
    />
    <TextField
      autoFocus
      onBlur={() => dispatch(searchToggle(!search.searching))}
      style={{ flex: '1 1 auto' }}
      inputStyle={{ WebkitTextFillColor: color }}
      underlineFocusStyle={{ borderColor: color }}
      hintText="SEARCH"
      fullWidth={true}
      value={search.value}
      onChange={(e) => dispatch(searchAdd(e.target.value))}
    />
  </span>
)

const mapStateToProps = ({
  brand: {
    isFetching,
    appBar: { styles: { navColor }}
  },
  search
}) => ({
  isFetching,
  color: navColor,
  search
})

export default connect(mapStateToProps)(SearchBar)
