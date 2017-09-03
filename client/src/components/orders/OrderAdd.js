/* global Stripe */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Payment from 'payment'
import { Card, CardText, CardTitle } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'

import requireCart from '../../containers/orders/requireCart'
import SuccessableButton from '../buttons/SuccessableButton'
import renderTextField from '../fields/renderTextField'
import renderSelectField from '../fields/renderSelectField'
import AddressFields from '../addresses/AddressFields'
import validateCreditCard from '../../utils/validateCreditCard'
import formatPrice from '../../utils/formatPrice'
import { fetchAddOrder } from '../../actions/orders'

class OrderAdd extends Component {
  state = {
    newAddress: false
  }
  handleFormSubmit = (values) => {
    const { dispatch, handleSubmit, cart } = this.props
    return dispatch(fetchAddOrder({ ...values, cart }))
  }
  render() {
    const {
      error,
      dispatch,
      handleSubmit,
      isFetching,
      cart,
      addresses,
      submitting,
      submitSucceeded
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
                  className="field"
                  component={renderTextField}
                  onFocus={e => Payment.formatCardExpiry(e.target)}
                />
                <Field
                  name="cvc"
                  label="Card CVC"
                  className="field"
                  component={renderTextField}
                  onFocus={e => Payment.formatCardCVC(e.target)}

                />
              </div>
              <CardText>
                <Field
                  name="fullAddress"
                  component={renderSelectField}
                  label="Address"
                  fullWidth={true}
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
              </CardText>
              {this.state.newAddress && <AddressFields />}
              {error && <div className="error">{error}</div>}
              <CardText>
                <h2 style={{ textAlign: 'right '}}>Subtotal {formatPrice(cart.subTotal)}</h2>
                <h2 style={{ textAlign: 'right '}}>Tax {(cart.tax * 100).toFixed(2)}%</h2>
                <h2 style={{ textAlign: 'right '}}>Total {formatPrice(cart.total)}</h2>
              </CardText>
              <div style={{ display: 'flex' }}>
                <SuccessableButton
                  submitSucceeded={submitSucceeded}
                  submitting={submitting}
                  label="PLACE ORDER"
                  successLabel="ORDER PLACED!"
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
  error: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  addresses: PropTypes.array,
  submitting: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired
}

export default requireCart(reduxForm({
  form: 'CheckoutForm',
  validate: validateCreditCard,
})(OrderAdd))
