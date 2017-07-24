import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import AddressFields from '../../components/users/AddressFields'
import SuccessableButton from '../../components/buttons/SuccessableButton'
import { fetchUpdate } from '../../actions/users'

class AddressItem extends Component {
  state = {
    zDepth: 1,
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { dispatch, error, handleSubmit, item, submitSucceeded, submitting } = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="card"
        style={{ margin: 16 }}
      >
        <form
          onSubmit={handleSubmit((values) => {
            const update = { type: 'UPDATE_ADDRESS', itemId: item._id, values }
            return dispatch(fetchUpdate(update))
          })}
          style={{ flex: '1 1 auto' }}
        >
          <AddressFields />
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="update address"
              successLabel="address updated!"
              style={{ margin: 4 }}
            />
            <RaisedButton
              type="button"
              label="X"
              className="button delete-button"
              onTouchTap={() => {
                const update = { type: 'DELETE_ADDRESS', itemId: item._id }
                return dispatch(fetchUpdate(update))
              }}
            />
          </div>
        </form>
      </Card>
    )
  }
}

AddressItem = compose(
  connect((state, { item }) => ({
    form: `address_${item._id}`
  })),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AddressItem)

export default AddressItem
