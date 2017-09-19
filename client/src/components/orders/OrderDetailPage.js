import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './orders.css'
import orderContainer from '../../containers/orders/orderContainer'
import OrderDetail from '../../components/orders/OrderDetail'

class OrderDetailPage extends Component {
  componentDidMount() {
    window.scrollTo(0,0)
  }
  render() {
    const { dispatch, order } = this.props
    return (
      <div className="page">
        <section className="section">
          <OrderDetail
            dispatch={dispatch}
            order={order}
          />
        </section>
      </div>
    )
  }
}

OrderDetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
}

export default orderContainer(OrderDetailPage)
