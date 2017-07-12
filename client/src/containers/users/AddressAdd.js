import React from 'react'
import { reduxForm } from 'redux-form'
import { Card, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate } from '../../actions/users'

const AddressAdd = ({ dispatch, error, handleSubmit }) => (
  <form onSubmit={handleSubmit(() => dispatch(fetchUpdate({ type: 'ADD_ADDRESS' })))}>
    <Card zDepth={1} className="cards">
      <CardActions>
        <RaisedButton
          type="submit"
          label="Add New Address"
          labelColor="#ffffff"
          primary={true}
          fullWidth={true}
        />
        {error && <div className="error">{error}</div>}
      </CardActions>
    </Card>
  </form>
)

export default reduxForm({
  form: 'addressAdd'
})(AddressAdd)
