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
    !searchItems.length ? <section className="page"><h1>No matches</h1></section> :
    <section>
      {searchItems.map(obj => <SearchItem key={obj._id} item={obj} />)}
    </section>
  )
}

const mapStateToProps = ({ cards, products, sections, search }) => {
  const items = [ ...cards.items, ...products.items, ...sections.items ]
  return {
    items,
    search
  }
}

export default connect(mapStateToProps)(SearchList)
