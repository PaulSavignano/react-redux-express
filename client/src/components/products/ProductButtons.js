import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

import './products.css'
import SuccessableButton from '../buttons/SuccessableButton'
import { fetchAddToCart } from '../../actions/cart'

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
  minus = () => this.state.qty > 1 && this.setState({ qty: this.state.qty - 1 })
  plus = () => this.setState({ qty: this.state.qty + 1 })
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
      error,
      dirty,
      handleSubmit,
      reset,
      submitSucceeded,
      submitting,
      valid
    } = this.props
    return (
      <form
        onSubmit={handleSubmit(this.handleFormSubmit)}
      >
        <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', marginBottom: 8 }}>
          <RaisedButton label="-" primary={true} onTouchTap={this.minus} labelStyle={{ fontSize: '24px' }} />
          <div style={{ flex: '1 1 auto', textAlign: 'center', borderBottom: '1px solid rgb(224, 224, 224)' }}>
            {this.state.qty}
          </div>
          <RaisedButton label="+" primary={true} onTouchTap={this.plus} labelStyle={{ fontSize: '24px' }} />
        </div>
        <div style={{ display: 'flex' }}>
          <RaisedButton
            backgroundColor={this.state.background}
            className="add-to-cart"
            label={submitting ? <CircularProgress color={color} size={25} style={{ verticalAlign: 'middle' }} /> : this.state.label}
            labelColor={color}
            type="submit"
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
