import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import RaisedButton from 'material-ui/RaisedButton'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import { fetchAddToCart } from '../../actions/cart'

class ProductButtons extends Component {
  state = {
    qty: 1,
    open: false
  }
  componentWillReceiveProps({ submitSucceeded }) {
    if (submitSucceeded) this.setState({ open: true })
  }
  minus = () => this.state.qty > 1 && this.setState({ qty: this.state.qty - 1 })
  plus = () => this.setState({ qty: this.state.qty + 1 })
  render() {
    const { dispatch, handleSubmit, _id, submitSucceeded, submitting  } = this.props
    return (
      <div>
        <form
          onSubmit={handleSubmit(values => {
            const update = {
              type: 'ADD_TO_CART',
              productId: _id,
              productQty: this.state.qty,
            }
            return dispatch(fetchAddToCart(update))
          })}
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
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="Add To Cart"
              successLabel="Product Added!"
              style={{ margin: 0 }}
            />
          </div>
        </form>
      </div>
    )
  }
}

export default compose(
  connect((state, { _id }) => ({
    form: `addToCard_${_id}`,
  })),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  })
)(ProductButtons)
