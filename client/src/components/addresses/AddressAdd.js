import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

class AddressAdd extends Component {
  render() {
    const {
      error,
      handleSubmit,
      onAddressAdd
    } = this.props
    return (
      <form onSubmit={handleSubmit(onAddressAdd)}>
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
