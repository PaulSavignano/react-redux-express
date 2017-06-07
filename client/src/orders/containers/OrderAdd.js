/* global Stripe */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Field, reduxForm } from 'redux-form'
import Payment from 'payment'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardText} from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import formatPrice from '../../modules/formatPrice'
import { fetchAddOrder } from '../actions/index'
import normalizePhone from '../../modules/normalizePhone'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstName', 'lastName', 'fullAddress', 'number', 'exp', 'cvc' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (values.number) {
    const type = Payment.fns.cardType(values.number);
    const cards = document.querySelectorAll('[data-brand]');

    [].forEach.call(cards, (element) => {
      if (element.getAttribute('data-brand') === type) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    })
  }
  return errors
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const renderSelectField = ({
  input,
  label,
  meta: {touched, error},
  children,
  ...custom
}) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
)


class OrderAdd extends Component {
  state = {
    newAddress: false,
    tax: .0725
  }
  render() {
    const { error, dispatch, handleSubmit, isFetching, cart, addresses } = this.props
    return (
      isFetching ? null : !cart.total ? dispatch(push('/')) :
      <section>
        <Card className="cards">
          <form onSubmit={handleSubmit((values) => {
            const order = { ...values, cart: this.props.cart }
            dispatch(fetchAddOrder(order))
          })}>
            <CardText>
              <ul className="credit-card-list">
                <li><i data-brand="visa" className="fa fa-cc-visa"></i></li>
                <li><i data-brand="amex" className="fa fa-cc-amex"></i></li>
                <li><i data-brand="mastercard" className="fa fa-cc-mastercard"></i></li>
                <li><i data-brand="jcb" className="fa fa-cc-jcb"></i></li>
                <li><i data-brand="discover" className="fa fa-cc-discover"></i></li>
                <li><i data-brand="dinersclub" className="fa fa-cc-diners-club"></i></li>
              </ul>
              <Field
                name="number"
                component={renderTextField}
                label="Card Number"
                fullWidth={true}
                onFocus={e => Payment.formatCardNumber(e.target)}
              />
              <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                <Field
                  name="exp"
                  component={renderTextField}
                  label="Card Expiration"
                  onFocus={e => Payment.formatCardExpiry(e.target)}
                  style={{ flex: '1 1 auto' }}
                />
                <Field
                  name="cvc"
                  component={renderTextField}
                  label="Card CVC"
                  onFocus={e => Payment.formatCardCVC(e.target)}
                  style={{ flex: '1 1 auto' }}
                />
              </div>
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
              {!this.state.newAddress ? null :
                <div>
                  <Field
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth={true}
                    component={renderTextField}
                  />
                  <Field
                    name="phone"
                    label="Phone"
                    type="text"
                    fullWidth={true}
                    component={renderTextField}
                    normalize={normalizePhone}
                  />
                  <Field
                    name="street"
                    label="Street"
                    type="text"
                    fullWidth={true}
                    component={renderTextField}
                  />
                  <Field
                    name="city"
                    label="City"
                    type="text"
                    fullWidth={true}
                    component={renderTextField}
                  />
                  <Field
                    name="state"
                    label="State"
                    type="text"
                    fullWidth={true}
                    component={renderTextField}
                  />
                  <Field
                    name="zip"
                    label="Zip"
                    type="text"
                    fullWidth={true}
                    component={renderTextField}
                  />
                </div>
              }
              {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
            </CardText>

            <CardText style={{ float: 'right' }}>
              <h2 style={{ textAlign: 'right '}}>Subtotal {formatPrice(cart.subTotal)}</h2>
              <h2 style={{ textAlign: 'right '}}>Tax {(cart.tax * 100).toFixed(2)}%</h2>
              <h2 style={{ textAlign: 'right '}}>Total {formatPrice(cart.total)}</h2>
            </CardText>
            <CardText style={{ float: 'right' }}>
              <p style={{ textAlign: 'right' }}></p>
            </CardText>
            <CardActions>
              <RaisedButton
                label="Place Order"
                primary={true}
                type="submit"
                fullWidth={true}
              />
            </CardActions>
          </form>
        </Card>
      </section>
    )
  }
}

OrderAdd = reduxForm({
  form: 'CheckoutForm',  // a unique identifier for this form
  validate,
})(OrderAdd)

const mapStateToProps = ({ user, cart }) => ({
  isFetching: cart.isFetching,
  cart: cart.cart,
  addresses: user.addresses
})

OrderAdd = connect(mapStateToProps)(OrderAdd)

export default OrderAdd
