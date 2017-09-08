import React from 'react'
import { Card, CardTitle } from 'material-ui/Card'

import AddressAdd from './AddressAdd'
import AddressList from './AddressList'

const AddressesForm = ({
  dispatch,
  onAddressAdd,
  onAddressUpdate,
  onAddressDelete,
  user
}) => (
  <Card className="AddressesForm">
    <CardTitle title="Addresses" />
    <AddressList
      addresses={user.addresses}
      dispatch={dispatch}
      onAddressUpdate={onAddressUpdate}
      onAddressDelete={onAddressDelete}
    />
    <AddressAdd
      onAddressAdd={onAddressAdd}
    />
  </Card>
)

export default AddressesForm
