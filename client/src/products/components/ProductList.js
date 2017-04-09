import React, { Component } from 'react'
import { connect } from 'react-redux'
import Product from './Product'
import { startFetchProducts } from '../actions/product'
import { GridList } from 'material-ui/GridList'


const filterProducts = (products, searchText) => {
  const filteredProducts = products.filter(product => {
    const name = product.name.toLowerCase()
    return searchText.length === 0 || name.indexOf(searchText.toLowerCase()) > -1
  })
  return filteredProducts
}

const styles = {
  grid: {
    display: 'flex',
    flexFlow: 'row wrap',
  }
}

export class ProductList extends Component {
  componentWillMount() {
    this.props.dispatch(startFetchProducts())
  }
  render() {
    const { products, searchProducts } = this.props
    return (
      products.length > 0 ?
      <div style={styles.grid}>
        {Object
          .keys(filterProducts(products, searchProducts))
          .map(key => (
            <Product
              key={products[key]._id}
              index={key}
              {...products[key]}
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

export default connect(mapStateToProps)(ProductList)
