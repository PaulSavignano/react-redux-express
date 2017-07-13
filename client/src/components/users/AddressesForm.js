import React from 'react'
import { Card, CardTitle } from 'material-ui/Card'

import AddressAdd from '../../containers/users/AddressAdd'
import AddressList from '../../containers/users/AddressList'

const AddressesForm = () => (
  <Card>
    <CardTitle title="Addresses" />
    <AddressList />
    <AddressAdd />
  </Card>
)

export default AddressesForm
