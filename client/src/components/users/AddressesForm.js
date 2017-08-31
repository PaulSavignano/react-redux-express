import React from 'react'
import { Card, CardTitle } from 'material-ui/Card'

import AddressAdd from './AddressAdd'
import AddressList from './AddressList'

const AddressesForm = ({ addresses }) => (
  <Card>
    <CardTitle title="Addresses" />
    <AddressList addresses={addresses} />
    <AddressAdd />
  </Card>
)

export default AddressesForm
