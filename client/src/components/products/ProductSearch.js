import React, { Component } from 'react'

class ProductSearch extends Component {
  handleSearch = () => {
    const productSearch = this.refs.productSearch.value
    this.props.onSearch(productSearch)
  }
  render() {
    return (
      <div>
        <div>
          <input
            type="search"
            ref="productSearch"
            placeholder="Search Products"
            onChange={this.handleSearch}
          />
        </div>
      </div>
    )
  }
}

export default ProductSearch
