import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

import './product.css'
import { fetchAddToCart } from '../../actions/cart'
import P from '../typography/P'

class ProductButtons extends Component {
  state = {
    qty: 1,
    background: null,
    color: 'rgb(255, 255, 255)',
    label: null,
    timeoutId: null
  }
  handleFormSubmit = (values) => {
    const { dispatch, productId } = this.props

    const update = {
      type: 'ADD_TO_CART',
      productId,
      productQty: this.state.qty,
    }
    return dispatch(fetchAddToCart(update))
  }
  minus = (e) => {
    e.stopPropagation()
    if (this.state.qty > 1) {
      const qty = this.state.qty - 1
      this.setState({ qty })
    }
  }
  plus = (e) => {
    e.stopPropagation()
    const qty = this.state.qty + 1
    this.setState({ qty })
  }
  componentWillMount() {
    const { primary1Color } = this.props
    this.setState({ background: primary1Color, label: 'Add To Cart', })
  }
  componentWillReceiveProps({
    primary1Color,
    reset,
    submitSucceeded
  }) {
    if (submitSucceeded) {
      const timeoutId = setTimeout(() => {
        clearTimeout(this.state.timeoutId)
        this.setState({
          background: primary1Color,
          label: 'Add To Cart',
          timeoutId: null,
        })
        reset()
      }, 3000)
      return this.setState({
        background: 'rgb(76, 175, 80)',
        label: 'Product Added!',
        timeoutId
      })
    }
  }
  componentWillUnmount() {
    clearTimeout(this.state.timeoutId)
  }
  render() {
    const { color } = this.state
    const {
      handleSubmit,
      submitting,
    } = this.props
    return (
      <form
        onSubmit={handleSubmit(this.handleFormSubmit)}
        className="product-buttons"
      >
        <div className="product-plus-minus">
          <RaisedButton label="-" primary={true} onTouchTap={this.minus} labelStyle={{ fontSize: '24px' }} />
          <div className="product-quantity">
            <P>{this.state.qty}</P>
          </div>
          <RaisedButton label="+" primary={true} onTouchTap={this.plus} labelStyle={{ fontSize: '24px' }} />
        </div>
        <div style={{ display: 'flex' }}>
          <RaisedButton
            backgroundColor={this.state.background}
            className="product-add-to-cart"
            label={submitting ? <CircularProgress color={color} size={25} style={{ verticalAlign: 'middle' }} /> : this.state.label}
            labelColor={color}
            type="submit"
            onTouchTap={e => e.stopPropagation()}
          />
        </div>
      </form>
    )
  }
}

ProductButtons.propTypes = {
  error: PropTypes.string,
  destroy: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired
}

export default reduxForm({ enableReinitialize: true })(ProductButtons)
