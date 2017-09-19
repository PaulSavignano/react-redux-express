import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import './orders.css'
import orderContainer from '../../containers/orders/orderContainer'
import formatPrice from '../../utils/formatPrice'
import OrderCartList from '../../components/orders/OrderCartList'
import { fetchUpdate } from '../../actions/orders'

class AdminOrderDetailPage extends Component {
  componentDidMount() {
    window.scrollTo(0,0)
  }
  handleFormSubmit = (values) => {
    const { dispatch, order: { _id, shipped }} = this.props
    if (shipped) {
      return dispatch(fetchUpdate(_id, { type: 'SHIPPED' }))
    }
  }
  render() {
    const {
      dispatch,
      order: {
        _id,
        cart: { items, subTotal, tax, total },
        address: { name, phone, street, city, state, zip },
        shipped,
      },
      handleSubmit
    } = this.props
    return (
      <div className="page">
        <section className="section-margin">
          <Card>
            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between', alignItems: 'center'}}>
              <CardTitle title={`Order ${_id}`} />
              <RaisedButton
                label={shipped ? 'Shipped' : 'Ship'}
                primary={shipped ? false : true}
                onTouchTap={handleSubmit(this.handleFormSubmit)}
              />
            </div>
            <OrderCartList
              dispatch={dispatch}
              items={items}
            />
            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
              <div style={{ margin: 16 }}>
                <div>Address</div>
                <div>{name}</div>
                <div>{phone}</div>
                <div>{street}</div>
                <div>{city}, {state} {zip}</div>
              </div>
              <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'flex-end' }}>
                <h2 style={{ margin: '16px 16px 4px 16px' }}>Subtotal {formatPrice(subTotal)}</h2>
                <h2 style={{ margin: '4px 16px' }}>Tax {(tax * 100).toFixed(2)}%</h2>
                <h2 style={{ margin: '4px 16px' }}>Total {formatPrice(total)}</h2>
              </div>
            </div>
          </Card>
        </section>
      </div>
    )
  }
}

AdminOrderDetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default orderContainer(
  connect((state, { order }) => ({ form: `order_${order._id}`}),
  reduxForm({})
)(AdminOrderDetailPage))
