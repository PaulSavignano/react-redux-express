import React from 'react'

import SectionItem from '../../components/sections/SectionItem'

const SectionList = ({ isFetching, items }) => {
  return (
    <div>
      {items.map(item => (
        <SectionItem
          key={item._id}
          item={item}
        />
      ))}
    </div>
  )
}


export default SectionList
