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
      style={{ flex: '1 1 auto' }}
      inputStyle={{ WebkitTextFillColor: color }}
      underlineFocusStyle={{ borderColor: color }}
      hintText="SEARCH"
      fullWidth={true}
      value={search.value}
      onBlur={(e) => {
        if (e.target.value.length < 1) {
          return dispatch(searchToggle(!search.searching))
        }
      }}
      onChange={(e) => {
        if (e.target.value.length > 0) {
          return dispatch(searchAdd(e.target.value))
        }
        return dispatch(searchToggle(!search.searching))
      }}
    />
  </span>
)

const mapStateToProps = ({
  brand: {
    isFetching,
    appBar: { values: { navColor }}
  },
  search
}) => ({
  isFetching,
  color: navColor,
  search
})

export default connect(mapStateToProps)(SearchBar)
