import React, { Component } from 'react'
import PropTypes from 'prop-types'

import searchContainer from '../../containers/search/searchContainer'
import SearchItem from './SearchItem'
import flattenArray from '../../utils/flattenArray'


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
    const searchValue = `${h1} ${h2} ${h3} ${p} ${name} ${description} ${price} ${detail}`.toLowerCase()
    return search.length === 0 || searchValue.indexOf(search.toLowerCase()) > -1
  })
  return filtered
}

class SearchList extends Component {
  state = {
    items: null
  }
  componentWillMount() {
    const { pages } = this.props
    const itemsArray = pages.map(page => page.sections.map(section => section.items.map(item => item)))
    const items = flattenArray(itemsArray)
    this.setState({ items })
  }
  render() {
    const {
      dispatch,
      search
    } = this.props
    const searchItems = filter(this.state.items, search.value)
    return (
      <div className="page">
        <section className="section-margin">
          {searchItems.length < 1 ?
            <h1>No matches</h1>
          :
          searchItems.map(item => <SearchItem key={item._id} dispatch={dispatch} item={item} />)
          }
        </section>
      </div>
    )
  }
}

SearchList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pages: PropTypes.array.isRequired,
  search: PropTypes.object.isRequired,
}

export default searchContainer(SearchList)
