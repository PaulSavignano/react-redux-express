import React from 'react'

import AddressItem from '../components/AddressItem'

const AddressList = ({ user, items }) => (
  items.length < 1 ? null :
  <div>
    {items.map(item => (
      <AddressItem
        key={item._id}
        item={item}
        initialValues={item.values}
      />
    ))}
  </div>
)

export default AddressList
