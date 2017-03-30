/* global Stripe */
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Payment from 'payment'
import TextField from 'material-ui/TextField'

import './CreditCard.css'
import { startCheckout } from '../actions/checkout'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstName', 'lastName', 'email', 'address', 'zip', 'state' ]
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



const styles = {
  container: {
    margin: 16
  },
  field: {
    width: '100%'
  }
}

let Checkout = (props) => {
  const { dispatch, handleSubmit, pristine, reset, submitting } = props
  return (
    <form style={styles.container} onSubmit={handleSubmit((values) => dispatch(startCheckout(values)))}>
      <div>
        <Field name="firstName" component={renderTextField} label="First Name" style={styles.field}/>
      </div>
      <div>
        <Field name="lastName" component={renderTextField} label="Last Name" style={styles.field}/>
      </div>
      <div>
        <Field name="email" component={renderTextField} label="Email" style={styles.field}/>
      </div>
      <div>
        <Field name="address" component={renderTextField} label="Address" style={styles.field}/>
      </div>
      <div>
        <Field name="zip" component={renderTextField} label="Zip" style={styles.field}/>
      </div>
      <div>
        <Field name="state" component={renderTextField} label="State" style={styles.field}/>
      </div>
      <br />
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
          style={styles.field}
          onFocus={e => Payment.formatCardNumber(e.target)}
        />
      </div>
      <div>
        <Field
          name="exp"
          component={renderTextField}
          label="Card Expiration"
          style={styles.field}
          onFocus={e => Payment.formatCardExpiry(e.target)}
        />
      </div>
      <div>
        <Field
          name="cvc"
          component={renderTextField}
          label="Card CVC"
          style={styles.field}
          onFocus={e => Payment.formatCardCVC(e.target)}
        />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values
        </button>
      </div>
    </form>
  )
}

Checkout = reduxForm({
  form: 'CheckoutForm',  // a unique identifier for this form
  validate,
})(Checkout)

Checkout = connect()(Checkout)

export default Checkout
