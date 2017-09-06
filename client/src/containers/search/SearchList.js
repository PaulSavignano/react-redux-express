import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import searchContainer from './searchContainer'
import SearchItem from './/SearchItem'

function flatten(ary) {
  return ary.reduce(function(a, b) {
    if (Array.isArray(b)) {
      return a.concat(flatten(b))
    }
    return a.concat(b)
  }, [])
  }


const filter = (items, search) => {
  const filtered = items.filter(item => {
    const values = item.item.values || {}
    const h1 = values.h1Text || ''
    const h2 = values.h2Text || ''
    const h3 = values.h3Text || ''
    const p = values.pText ? values.pText.replace(/<{1}[^<>]{1,}>{1}/g,"") : ''
    const name = values.name || ''
    const description = values.description || ''
    const detail = values.detail || ''
    const price = values.price || ''
    const text = values.text ? values.text.replace(/<{1}[^<>]{1,}>{1}/g,"") : ''
    const searchValue = `${h1} ${h2} ${h3} ${p} ${name} ${description} ${price} ${text}`.toLowerCase()
    console.log(searchValue)
    return search.length === 0 || searchValue.indexOf(search.toLowerCase()) > -1
  })
  return filtered
}

const SearchList = ({ pages, search }) => {
  const itemsArray = pages.map(page => page.sections.map(section => section.items.map(item => item)))
  const items = flatten(itemsArray)
  const searchItems = filter(items, search.value)
  return (
    <div className="page">
      <section className="section-margin">
        {searchItems.length < 1 ?
          <h1>No matches</h1>
        :
        searchItems.map(item => <SearchItem key={item._id} item={item} />)
        }
      </section>
    </div>
  )
}


export default searchContainer(SearchList)
