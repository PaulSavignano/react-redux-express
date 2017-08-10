/* global Stripe */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Field, reduxForm } from 'redux-form'
import Payment from 'payment'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import MenuItem from 'material-ui/MenuItem'

import renderTextField from '../../components/fields/renderTextField'
import renderSelectField from '../../components/fields/renderSelectField'
import AddressFields from '../../components/users/AddressFields'
import validateCreditCard from '../../utils/validateCreditCard'
import formatPrice from '../../utils/formatPrice'
import { fetchAddOrder } from '../../actions/orders'

class OrderAdd extends Component {
  state = {
    newAddress: false
  }
  render() {
    const { error, dispatch, handleSubmit, isFetching, cart, addresses, submitting } = this.props
    return (
      isFetching ? null : !cart.total ? dispatch(push('/')) :
      <section className="page">
        <Card className="card">
          <form onSubmit={handleSubmit((values) => {
            const order = { ...values, cart }
            return dispatch(fetchAddOrder(order))
          })}>
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
                label={submitting ? <CircularProgress key={1} color="#ffffff" size={25} style={{ verticalAlign: 'middle' }} /> : 'PLACE ORDER'}
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
  form: 'CheckoutForm',
  validate: validateCreditCard,
})(OrderAdd)

const mapStateToProps = ({ user: { addresses }, carts: { cart } }) => ({
  isFetching: cart.isFetching,
  cart,
  addresses
})

OrderAdd = connect(mapStateToProps)(OrderAdd)

export default OrderAdd
