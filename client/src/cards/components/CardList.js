import React from 'react'

import CardItem from './CardItem'

const CardList = ({ isFetching, page, items }) => (
!items.length ? null :
  <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
    {items.map(item => (
      <CardItem
        key={item._id}
        item={item}
        page={page}
      />
    ))}
  </div>
)

export default CardList
