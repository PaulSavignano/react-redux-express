import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

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
            />
          </div>
        </form>
        {!this.state.open ? null :
        <Dialog
          actions={
            <div>
              <FlatButton
                label="Cart"
                primary={true}
                onTouchTap={() => {
                  dispatch(push('/cart'))
                  this.setState({ open: false })
                }}
              />
              <FlatButton
                label="Close"
                primary={true}
                onTouchTap={() => this.setState({ open: false })}
              />
            </div>
          }
          actionsContainerStyle={{ textAlign: 'center' }}
          modal={false}
          open={this.state.open}
          onRequestClose={() => this.setState({ open: false })}
          bodyStyle={{ textAlign: 'center', fontSize: 24 }}
        >
          Added To Cart!
        </Dialog>
        }
      </div>

    )
  }
}

ProductButtons = reduxForm({ form: 'addToCart' })(ProductButtons)

export default ProductButtons
