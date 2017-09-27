import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { CardActions } from 'material-ui/Card'
import SuccessableButton from '../buttons/SuccessableButton'

class AddressAdd extends Component {
  render() {
    const {
      error,
      handleSubmit,
      onAddressAdd,
      reset,
      submitSucceeded,
      submitting,
    } = this.props
    return (
      <form onSubmit={handleSubmit(onAddressAdd)}>
        <CardActions className="button-container">
          <SuccessableButton
            disabled={false}
            error={error}
            label="Add Address"
            reset={reset}
            submitSucceeded={submitSucceeded}
            submitting={submitting}
            successLabel="Address Added!"
          />
        </CardActions>
      </form>
    )
  }
}

AddressAdd.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'addressAdd'
})(AddressAdd)
