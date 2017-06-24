import React from 'react'

import SearchItem from './SearchItem'

const SearchList = ({ items }) => (
  !items.length ? null :
  <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
    {items.map(item => (
      <SearchItem
        key={item._id}
        item={item}
      />
    ))}
  </div>
)

export default SearchList
