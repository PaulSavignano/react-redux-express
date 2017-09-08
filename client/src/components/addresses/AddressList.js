import React from 'react'
import PropTypes from 'prop-types'

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

AddressList.propTypes = {
  addresses: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  onAddressUpdate: PropTypes.func.isRequired,
  onAddressDelete: PropTypes.func.isRequired
}

export default AddressList
