/* global Stripe */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import Payment from 'payment'
import { Card, CardText, CardTitle } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'

import './orders.css'
import requireCart from '../../containers/orders/requireCart'
import validateCheckout from '../../utils/validateCheckout'
import SuccessableButton from '../buttons/SuccessableButton'
import DateField from '../fields/DateField'
import renderTextField from '../fields/renderTextField'
import renderSelectField from '../fields/renderSelectField'
import AddressFields from '../addresses/AddressFields'
import formatPrice from '../../utils/formatPrice'
import { fetchAddOrder } from '../../actions/orders'

class OrderAdd extends Component {
  state = {
    newAddress: false
  }
  handleFormSubmit = (values) => {
    const { dispatch, cart, history } = this.props
    return dispatch(fetchAddOrder({ values, cart, history }))
  }
  render() {
    const {
      addresses,
      cart,
      dirty,
      error,
      handleSubmit,
      submitSucceeded,
      submitting,
      valid
    } = this.props
    return (
      <div className="page">
        <section className="section-margin">
          <Card className="card">
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <CardTitle title="Checkout" />
              <CardText>
                <ul className="credit-card-list">
                  <li><i data-brand="visa" className="fa fa-cc-visa"></i></li>
                  <li><i data-brand="amex" className="fa fa-cc-amex"></i></li>
                  <li><i data-brand="mastercard" className="fa fa-cc-mastercard"></i></li>
                  <li><i data-brand="jcb" className="fa fa-cc-jcb"></i></li>
                  <li><i data-brand="discover" className="fa fa-cc-discover"></i></li>
                  <li><i data-brand="dinersclub" className="fa fa-cc-diners-club"></i></li>
                </ul>
              </CardText>
              <br/>

              <div className="field-container">
                <Field
                  name="number"
                  label="Card Number"
                  className="field"
                  component={renderTextField}
                  onFocus={e => Payment.formatCardNumber(e.target)}
                />
                <Field
                  name="exp"
                  label="Card Expiration"
                  className="field date"
                  component={DateField}
                />
                <Field
                  name="cvc"
                  label="Card CVC"
                  className="field"
                  component={renderTextField}
                  onFocus={e => Payment.formatCardCVC(e.target)}

                />
                <Field
                  name="fullAddress"
                  component={renderSelectField}
                  label="Address"
                  fullWidth={true}
                  className="field"
                >
                  {addresses.map(address => (
                    <MenuItem
                      key={address._id}
                      value={address._id}
                      onTouchTap={() => this.setState({ newAddress: false })}
                      primaryText={`
                          ${address.values.name}
                          ${address.values.phone}
                          ${address.values.street}
                          ${address.values.city},
                          ${address.values.state}
                          ${address.values.zip}`
                      }/>
                  ))}
                  <MenuItem value="newAddress" primaryText="Enter new address" onTouchTap={() => this.setState({ newAddress: true })} />
                </Field>
              </div>
              {this.state.newAddress && <AddressFields autoFocus={true} />}
              <CardTitle
                title={
                  <div>
                    <div>Subtotal {formatPrice(cart.total)}</div>
                    <div>Tax {(cart.tax * 100).toFixed(2)}</div>
                    <div>Total {formatPrice(cart.total)}</div>
                  </div>
                }
                titleStyle={{ textAlign: 'right' }}
              />
              <div className="button-container">
                <SuccessableButton
                  dirty={dirty}
                  error={error}
                  label="Place Order"
                  reset={null}
                  submitSucceeded={submitSucceeded}
                  submitting={submitting}
                  successLabel="Order Placed!"
                  valid={valid}
                />
              </div>
            </form>
          </Card>
        </section>
      </div>
    )
  }
}

OrderAdd.propTypes = {
  addresses: PropTypes.array,
  cart: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired
}

export default requireCart(reduxForm({
  form: 'CheckoutForm',
  validate: validateCheckout
})(withRouter(OrderAdd)))
