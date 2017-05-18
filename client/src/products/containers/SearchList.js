import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductItem from '../components/ProductItem'

const filter = (items, searchText) => {
  const filtered = items.filter(item => {
    console.log(item)
    const name = item.values.name.toLowerCase()
    return searchText.length === 0 || name.indexOf(searchText.toLowerCase()) > -1
  })
  return filtered
}

export class SearchList extends Component {
  render() {
    const { items, search } = this.props
    return (
      items.length > 0 ?
      <main>
        <section>
          {filter(items, search).map(item => (
            <ProductItem
              key={item._id}
              item={item}
            />
          ))}
        </section>
      </main> :
      <main><section><p>No products yet</p></section></main>
    )
  }
}

const mapStateToProps = (state) => ({
  items: state.products.items,
  search: state.search
})


export default connect(mapStateToProps)(SearchList)
