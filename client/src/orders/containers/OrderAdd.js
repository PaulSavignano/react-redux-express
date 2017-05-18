/* global Stripe */
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Payment from 'payment'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardText} from 'material-ui/Card'

import formatPrice from '../../modules/formatPrice'
import { fetchAddOrder } from '../actions/index'
import './CreditCard.css'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstName', 'lastName', 'email', 'address', 'zip', 'state', 'number', 'exp', 'cvc' ]
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


let OrderAdd = ({ error, dispatch, handleSubmit, isFetching, total, pristine, reset, submitting }) => {
  return (
    isFetching ? null :
    <section>
      <Card style={{ margin: 20 }}>
        <form onSubmit={handleSubmit((values) => dispatch(fetchAddOrder(values)))}>
          <CardText>
            <Field name="firstname" component={renderTextField} label="First Name" fullWidth={true} />
            <Field name="lastname" component={renderTextField} label="Last Name" fullWidth={true} />
            <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
            <Field name="address" component={renderTextField} label="Address" fullWidth={true} />
            <Field name="zip" component={renderTextField} label="Zip" fullWidth={true} />
            <Field name="state" component={renderTextField} label="State" fullWidth={true} />
          </CardText>
          <CardText>
            <ul className="credit-card-list">
              <li><i data-brand="visa" className="fa fa-cc-visa"></i></li>
              <li><i data-brand="amex" className="fa fa-cc-amex"></i></li>
              <li><i data-brand="mastercard" className="fa fa-cc-mastercard"></i></li>
              <li><i data-brand="jcb" className="fa fa-cc-jcb"></i></li>
              <li><i data-brand="discover" className="fa fa-cc-discover"></i></li>
              <li><i data-brand="dinersclub" className="fa fa-cc-diners-club"></i></li>
            </ul>
            <div>
              <Field
                name="number"
                component={renderTextField}
                label="Card Number"
                fullWidth={true}
                onFocus={e => Payment.formatCardNumber(e.target)}
              />
            </div>
            <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
              <Field
                name="exp"
                component={renderTextField}
                label="Card Expiration"
                onFocus={e => Payment.formatCardExpiry(e.target)}
                style={{ flex: '1 1 auto', marginRight: 20 }}
              />
              <Field
                name="cvc"
                component={renderTextField}
                label="Card CVC"
                onFocus={e => Payment.formatCardCVC(e.target)}
                style={{ flex: '1 1 auto' }}
              />
            </div>
            {error && <strong>{error}</strong>}
          </CardText>
          <CardActions>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <span>subtotal</span>
              <h3>{formatPrice(total)}</h3>
            </div>
            <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'flex-end' }}>
              <p style={{ textAlign: 'right' }}>Shipping, taxes, and discounts</p>
              <RaisedButton
                label="Place Order"
                primary={true}
                type="submit"
              />
            </div>
          </CardActions>
        </form>
      </Card>
    </section>
  )
}

OrderAdd = reduxForm({
  form: 'CheckoutForm',  // a unique identifier for this form
  validate,
})(OrderAdd)

const mapStateToProps = (state) => ({
  isFetching: state.cart.isFetching,
  total: state.cart.total,
  cart: state.cart.items,
  initialValues: state.user.values
})

OrderAdd = connect(mapStateToProps)(OrderAdd)

export default OrderAdd
