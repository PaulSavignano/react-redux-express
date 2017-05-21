import React from 'react'

import SectionItem from './SectionItem'

const SectionList = ({ isFetching, page, items, theme }) => (
!items.length ? null :
  <div>
    {items.map(item => (
      <SectionItem
        key={item._id}
        item={item}
        theme={theme}
      />
    ))}
  </div>
)


export default SectionList
