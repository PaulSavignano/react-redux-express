import React from 'react'
import { connect } from 'react-redux'

import AddressItem from './AddressItem'

const AddressList = ({ addresses, isFetching }) => (
  !isFetching &&
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

const mapStateToProps = ({ user: { isFetching, addresses }}) => ({
  isFetching,
  addresses
})

export default connect(mapStateToProps)(AddressList)
