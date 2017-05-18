import React from 'react'

import SectionItem from './SectionItem'

const SectionList = ({ isFetching, page, items }) => (
!items.length ? null :
  <div>
    {items.map(item => (
      <SectionItem
        key={item._id}
        item={item}
      />
    ))}
  </div>
)


export default SectionList
