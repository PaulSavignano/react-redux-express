import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'

import SuccessableButton from '../buttons/SuccessableButton'
import { fetchAddToCart } from '../../actions/cart'

class ProductButtons extends Component {
  state = {
    qty: 1,
  }
  handleFormSubmit = (values) => {
    const { dispatch, productId } = this.props
    const update = {
      type: 'ADD_TO_CART',
      productId,
      productQty: this.state.qty,
    }
    return dispatch(fetchAddToCart(update))
  }
  minus = () => this.state.qty > 1 && this.setState({ qty: this.state.qty - 1 })
  plus = () => this.setState({ qty: this.state.qty + 1 })
  render() {
    const {
      error,
      dirty,
      handleSubmit,
      submitFailed,
      submitSucceeded,
      submitting,
      valid
    } = this.props
    return (
      <div>
        <form
          onSubmit={handleSubmit(this.handleFormSubmit)}
        >
          <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', marginBottom: 8 }}>
            <RaisedButton label="-" primary={true} onTouchTap={this.minus} labelStyle={{ fontSize: '24px' }} />
            <div style={{ flex: '1 1 auto', textAlign: 'center', borderBottom: '1px solid rgb(224, 224, 224)' }}>
              {this.state.qty}
            </div>
            <RaisedButton label="+" primary={true} onTouchTap={this.plus} labelStyle={{ fontSize: '24px' }} />
          </div>
          <div style={{ display: 'flex' }}>
            <SuccessableButton
              dirty={dirty}
              error={error}
              label="Add To Cart"
              submitFailed={submitFailed}
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              successLabel="Product Added!"
              valid={valid}
            />
          </div>
        </form>
      </div>
    )
  }
}

ProductButtons.propTypes = {
  error: PropTypes.string,
  destroy: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired
}

export default reduxForm({})(ProductButtons)
