import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { Card, CardText, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import AddressForm from './AddressForm'
import { fetchUpdate } from '../../actions/users'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'name', 'street', 'city', 'state', 'zip' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  return errors
}

class AddressAdd extends Component {
  state = {
    open: false,
  }
  render() {
    const { dispatch, error, handleSubmit } = this.props
    return (
      <form
        onSubmit={handleSubmit((values) => {
          const update = { type: 'ADD_ADDRESS', values }
          dispatch(fetchUpdate(update))
          this.setState({ open: false })
        })}
      >
        <Card
          zDepth={1}
          className="cards"
        >
          <CardActions>
            <RaisedButton
              onTouchTap={() => this.setState({ open: !this.state.open })}
              type="button"
              label={this.state.expanded ? "Remove Address" : "Add Address"}
              labelColor="#ffffff"
              primary={true}
              fullWidth={true}
            />
          </CardActions>
          {this.state.open &&
            <div>
              <AddressForm />
              {error && <div className="error">{error}</div>}
              <div className="button-container">
                <RaisedButton
                  type="submit"
                  label="Add"
                  labelColor="#ffffff"
                  primary={true}
                  className="button"
                />
              </div>
            </div>
          }
        </Card>
      </form>
    )
  }
}


export default reduxForm({
  form: 'addressAdd',
  validate
})(AddressAdd)
