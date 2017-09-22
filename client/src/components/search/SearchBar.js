import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'

import searchContainer from '../../containers/search/searchContainer'
import { searchToggle, searchAdd } from '../../actions/search'

class SearchBar extends Component {
  handleStartSearch = () => {
    return this.props.handleSearch
  }
  handleBlur = (e) => {
    const { dispatch, search: { open }} = this.props
    if (e.target.value.length < 1) {
      return dispatch(searchToggle(!open))
    }
  }
  handleChange = (e) => {
    const { dispatch, search: { open }} = this.props
    if (e.target.value.length > 0) {
      return dispatch(searchAdd(e.target.value))
    }
    return dispatch(searchToggle(!open))
  }
  render() {
    const {
      color,
      search
    } = this.props
    return (
      <span>
        <IconButton
          iconClassName="fa fa-search"
          iconStyle={{ fontSize: 16, color }}
          onTouchTap={this.handleStartSearch}
        />
        <TextField
          autoFocus
          style={{ flex: '1 1 auto' }}
          inputStyle={{ WebkitTextFillColor: color }}
          underlineFocusStyle={{ borderColor: color }}
          hintText="SEARCH"
          fullWidth={true}
          value={search.value}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
      </span>
    )
  }
}

SearchBar.propTypes = {
  color: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
}

export default searchContainer(SearchBar)
