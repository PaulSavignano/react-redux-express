import React from 'react'
import { connect } from 'react-redux'

import AddressItem from './AddressItem'

const AddressList = ({ addresses }) => (
  addresses.length &&
  <div>
    {addresses.map(address => (
      <AddressItem
        key={address._id}
        item={address}
        initialValues={address.values}
      />
    ))}
  </div>
)

const mapStateToProps = ({ user: { addresses }}) => {
  return {
    addresses
  }
}

export default connect(mapStateToProps)(AddressList)
