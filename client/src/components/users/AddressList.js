import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import AddressItem from './AddressItem'

const AddressList = ({ addresses }) => (
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

export default AddressList
