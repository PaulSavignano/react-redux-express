import React from 'react'
import { connect } from 'react-redux'
import SearchItem from './/SearchItem'

const filter = (items, search) => {
  const filtered = items.filter(item => {
    const values = item.values || {}
    const name = values.name || ''
    const description = values.description || ''
    const price = values.price || ''
    const text = values.text ? values.text.replace(/<{1}[^<>]{1,}>{1}/g,"") : ''
    const searchValue = `${name} ${description} ${price} ${text}`.toLowerCase()
    return search.length === 0 || searchValue.indexOf(search.toLowerCase()) > -1
  })
  return filtered
}

const SearchList = ({ items, search }) => {
  const searchItems = filter(items, search.value)
  return (
    <section style={{ minHeight: '80vh'}}>
      {searchItems.length < 1 ?
        <h1>No matches</h1>
      :
      searchItems.map(item => <SearchItem key={item._id} item={item} />)
      }
    </section>
  )
}

const mapStateToProps = ({ cards, products, search, texts, titles }) => {
  const items = [
    ...cards.items,
    ...products.items,
    ...texts.items,
    ...titles.items
  ]
  return {
    items,
    search
  }
}

export default connect(mapStateToProps)(SearchList)
