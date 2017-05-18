import React from 'react'
import { connect } from 'react-redux'

import SectionItem from './SectionItem'

const SectionList = ({ isFetching, page, items, handleImage }) => (
!items.length ? null :
  <div>
    {items.map(item => (
      <SectionItem
        key={item._id}
        item={item}
        handleImage={handleImage}
      />
    ))}
  </div>
)


export default SectionList
