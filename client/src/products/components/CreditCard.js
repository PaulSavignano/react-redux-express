/* global Stripe */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Payment from 'payment'

import './CreditCard.css'
import { getStripeToken } from '../../stripe/getStripeToken'
import Checkout from './Checkout'
import { startAddCharge } from '../actions/charge'

const stripeKey = require('../../stripe/settings.json').public.stripe
console.log(stripeKey)


class CreditCard extends Component {
  state = {
    number: null,
    exp_month: null,
    exp_year: null,
    cvc: null,
    token: null,
    error: null
  }
  resetCard = () => {
    this.setState({ number: null, exp_month: null, exp_year: null, cvc: null, token: null });
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.resetCard()
    const number = this.refs.number.value
    const expiration = this.refs.expiration.value.split('/')
    const exp_month = parseInt(expiration[0], 10)
    const exp_year = parseInt(expiration[1], 10)
    const cvc = this.refs.cvc.value
    const card = { number, exp_month, exp_year, cvc }
    console.log(this.props.total)

    getStripeToken(card)
      .then(token => {
        card.token = token
        this.setState(card)
        this.props.dispatch(startAddCharge(this.props.total, token))
      })
      .catch(err => this.setState({ error: err }))
  }
  setCardType = (e) => {
    const type = Payment.fns.cardType(e.target.value);
    const cards = document.querySelectorAll('[data-brand]');

    [].forEach.call(cards, (element) => {
      if (element.getAttribute('data-brand') === type) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    })
  }
  componentDidMount() {
    Stripe.setPublishableKey(stripeKey)
    const { number, expiration, cvc } = this.refs;
    Payment.formatCardNumber(number);
    Payment.formatCardExpiry(expiration);
    Payment.formatCardCVC(cvc);
  }
  renderCard() {
    const { number, exp_month, exp_year, cvc, token } = this.state;
    return number ? (
      <div>
        <h5>{ number }</h5>
        <p className="exp-cvc">
          <span>{ exp_month }/{ exp_year }</span>
          <span>{ cvc }</span>
        </p>
        <em>{ token }</em>
      </div>) : '';
  }
  renderError() {
    const { error } = this.state;
    return error ? (
      <div>
        <h5>{ error }</h5>
      </div>) : '';
  }
  render() {
    return (
      <div className="CreditCard">
        <ul className="credit-card-list">
          <li><i data-brand="visa" className="fa fa-cc-visa"></i></li>
          <li><i data-brand="amex" className="fa fa-cc-amex"></i></li>
          <li><i data-brand="mastercard" className="fa fa-cc-mastercard"></i></li>
          <li><i data-brand="jcb" className="fa fa-cc-jcb"></i></li>
          <li><i data-brand="discover" className="fa fa-cc-discover"></i></li>
          <li><i data-brand="dinersclub" className="fa fa-cc-diners-club"></i></li>
        </ul>
        <form onSubmit={this.handleSubmit}>
          <Checkout />
          <div className="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--12-col">
            <input
              className="mdl-textfield__input"
              type="text"
              ref="amount"
              placeholder="Amount"
            />
            <label className="mdl-textfield__label" htmlFor="cardholder">Your full name...</label>
          </div>
  				<div className="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--12-col">
            <input
              onKeyUp={ this.setCardType }
              className="mdl-textfield__input"
              type="text"
              ref="number"
              placeholder="Card Number"
            />
  					<label className="mdl-textfield__label" htmlFor="cardholder">Your full name...</label>
  				</div>
  				<div className="mdl-cell mdl-cell--12-col">
  					<div className="mdl-textfield mdl-js-textfield mdl-cell--6-col">
              <input
                className="mdl-textfield__input"
                type="text"
                ref="expiration"
                placeholder="MM/YYYY"
              />
              <label className="mdl-textfield__label" htmlFor="expire">MM / YY</label>
  					</div>
  					<div className="mdl-textfield mdl-js-textfield mdl-cell--6-col">
              <input
                className="mdl-textfield__input"
                type="text"
                ref="cvc"
                placeholder="CVC"
              />
              <label className="mdl-textfield__label" htmlFor="ccv">CCV</label>
  					</div>
  				</div>
  				<div className="mdl-card__actions mdl-cell--12-col send-button">
            <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--colored" id="send" type="submit">
  						COMPLETE ORDER
  					</button>
  				</div>
  			</form>
        { this.renderError() }
        { this.renderCard() }
  		</div>
    )
  }
}

export default connect()(CreditCard)
