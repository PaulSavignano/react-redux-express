import React, { Component } from 'react'
import { connect } from 'react-redux'
import Order from './Order'
import { startFetchOrders } from '../actions/order'

export class OrderList extends Component {
  componentDidMount() {
    this.props.dispatch(startFetchOrders())
  }
  render() {
    const { orders } = this.props
    return (
      orders.length > 0 ?
      <div className="mdl-grid">
        {orders.map(order => (
          <div>
            <p>{order}</p>
          </div>
          ))}
      </div> :
      <div><p className="container__message">No products yet</p></div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(ProductList)
