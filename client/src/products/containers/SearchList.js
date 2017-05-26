import React from 'react'
import { connect } from 'react-redux'
import ProductItem from '../components/ProductItem'

const filter = (items, searchText) => {
  const filtered = items.filter(item => {
    const name = item.values.name.toLowerCase()
    return searchText.length === 0 || name.indexOf(searchText.toLowerCase()) > -1
  })
  return filtered
}

const SearchList = ({ items, search }) => (
  items.length < 1 ? <section><p>No matches</p></section> :
    <section>
      {filter(items, search).map(item => (
        <ProductItem
          key={item._id}
          item={item}
        />
      ))}
    </section>
)

const mapStateToProps = (state) => ({
  items: state.products.items,
  search: state.search
})

export default connect(mapStateToProps)(SearchList)
