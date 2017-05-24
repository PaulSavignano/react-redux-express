import React from 'react'

import SectionItem from './SectionItem'

const SectionList = ({ isFetching, page, items, brand }) => (
!items.length ? null :
  <div>
    {items.map(item => (
      <SectionItem
        key={item._id}
        item={item}
        brand={brand}
      />
    ))}
  </div>
)


export default SectionList
