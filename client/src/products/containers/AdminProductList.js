import React from 'react'
import { connect } from 'react-redux'

import AdminProductAdd from '../components/AdminProductAdd'
import AdminProduct from '../components/AdminProduct'

const AdminProductList = ({ isFetching, page, items }) => {
  console.log(items)
  return (
    isFetching ? null :
    <div>
      <section><h1>Products Admin</h1></section>
      <section><AdminProductAdd /></section>
      {items.length > 0 ?
        <section>
          {items.map(item => (
            <AdminProduct
              key={item._id}
              item={item}
              initialValues={item.values}
            />
          ))}
        </section>
        :
        <section><h3>No items yet</h3></section>
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const isFetching = state.cards.isFetching
  const items = isFetching ? null : state.products.items
  return {
    isFetching,
    items
  }
}

export default connect(mapStateToProps)(AdminProductList)
