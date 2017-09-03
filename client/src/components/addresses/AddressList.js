import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import AddressItem from './AddressItem'

const AddressList = ({
  addresses,
  dispatch,
  onAddressUpdate,
  onAddressDelete
}) => (
  <div>
    {addresses.map(address => (
      <AddressItem
        key={address._id}
        dispatch={dispatch}
        item={address}
        initialValues={address.values}
        onAddressUpdate={onAddressUpdate}
        onAddressDelete={onAddressDelete}
      />
    ))}
  </div>
)

export default AddressList
