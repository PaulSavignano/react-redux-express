/* global Stripe */
import { getStripeToken } from '../../stripe/getStripeToken'
import stripeKeys from '../../stripe/settings.json'

export const checkout = (checkout) => {
  return {
    type: 'CHECKOUT',
    checkout
  }
}


export const chargeError = (err) => {
  return {
    type: 'CHARGE_ERROR',
    err
  }
}




export const startCheckout = (values) => {
  return (dispatch, getState) => {
    Stripe.setPublishableKey(stripeKeys.public.stripe)
    const cart = getState().cart
    const { number, exp, cvc, firstName, lastName, address, zip, state } = values
    const expiration = exp.split('/')
    const exp_month = parseInt(expiration[0], 10)
    const exp_year = parseInt(expiration[1], 10)
    const card = { number, exp_month, exp_year, cvc }
    return getStripeToken(card)
      .then(token => {
        fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth': localStorage.getItem('token')
          },
          body: JSON.stringify({ token, cart, firstName, lastName, address, zip, state })
        })
          .then(res => res.json())
          .then(json => {
            console.log(json)
            dispatch(checkout(json))
            dispatch({ type: 'DELETE_CART' })
          })
          .catch(err => console.log(err))
      })
      .catch(err => this.setState({ error: err }))
  }
}
