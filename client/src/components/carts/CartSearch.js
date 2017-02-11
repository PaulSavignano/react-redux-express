import React, { Component } from 'react'

class CartSearch extends Component {
  handleSearch = () => {
    const cartSearch = this.refs.cartSearch.value
    this.props.onSearch(cartSearch)
  }
  render() {
    return (
      <div>
        <div>
          <input
            type="search"
            ref="cartSearch"
            placeholder="Search Cart"
            onChange={this.handleSearch}
          />
        </div>
      </div>
    )
  }
}

export default CartSearch
