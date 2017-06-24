import React from 'react'
import { connect } from 'react-redux'
import SearchItem from '../components/SearchItem'

const filter = (items, searchValue) => {
  const filtered = items.filter(item => {
    const values = item.values || {}
    const name = values.name || ''
    const description = values.description || ''
    const price = values.price || ''
    const text = values.text ? values.text.replace(/<{1}[^<>]{1,}>{1}/g,"") : ''
    const searchText = `${name} ${description} ${price} ${text}`.toLowerCase()
    return searchValue.length === 0 || searchText.indexOf(searchValue.toLowerCase()) > -1
  })
  return filtered
}

const SearchList = ({ items, search }) => {
  return (
  items.length < 1 ? <section><p>No matches</p></section> :
    <section>
      {filter(items, search).map(item => {
        return (
          <SearchItem
            key={item._id}
            item={item}
          />
        )
      })
      }
    </section>
  )
}

const mapStateToProps = ({ cards, products, sections, search }) => {
  const items = [ ...cards.items, ...products.items, ...sections.items ]
  console.log(items)
  return {
    items,
    search
  }
}

export default connect(mapStateToProps)(SearchList)
