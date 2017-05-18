import React from 'react'

import CardItem from './CardItem'

const CardList = ({ isFetching, page, items }) => (
!items.length ? null :
  <section>
    {items.map(item => (
      <CardItem
        key={item._id}
        item={item}
        page={page}
      />
    ))}
  </section>
)

export default CardList
