import React from 'react'

import SectionItem from '../../components/sections/SectionItem'

const SectionList = ({ items, page }) => {
  return (
    <div>
      {items.map(item => (
        <SectionItem
          key={item._id}
          item={item}
          page={page}
        />
      ))}
    </div>
  )
}


export default SectionList
