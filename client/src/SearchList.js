import React, { Component } from 'react'
import { connect } from 'react-redux'
import Product from './products/components/Product'


const filter = (products, searchText) => {
  const filtered = products.filter(product => {
    const name = product.name.toLowerCase()
    return searchText.length === 0 || name.indexOf(searchText.toLowerCase()) > -1
  })
  return filtered
}

const styles = {
  grid: {
    display: 'flex',
    flexFlow: 'row wrap',
  }
}

export class SearchList extends Component {
  render() {
    const { products, search } = this.props
    return (
      products.length > 0 ?
      <div style={styles.grid}>
        {filter(products, search).map(product => (
          <Product
            key={product._id}
            {...product}
            />
          ))}
      </div> :
      <div><p className="container__message">No products yet</p></div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(SearchList)
