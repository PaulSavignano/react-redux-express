import React from 'react'
import { connect } from 'react-redux'

import ProductItem from '../../components/products/ProductItem'

const ProductItemContainer = ({ item, isFetching }) => (
  !isFetching && <ProductItem item={item} />
)

const mapStateToProps = ({ products: { items, isFetching } }, { componentId }) => ({
  item: items.find(item => item._id === componentId),
  isFetching
})

export default connect(mapStateToProps)(ProductItemContainer)
