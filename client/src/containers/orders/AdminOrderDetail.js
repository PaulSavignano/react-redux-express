import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import formatPrice from '../../utils/formatPrice'
import OrderCartList from '../../components/orders/OrderCartList'
import { fetchUpdate } from '../../actions/orders'

const AdminOrderDetail = ({
  dispatch,
  isFetching,
  order: {
    _id,
    cart: { items, subTotal, tax, total },
    address: { name, phone, street, city, state, zip },
    shipped,
  },
  handleSubmit
 }) => (
   !isFetching &&
   <section className="page">
     <Card>
       <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between', alignItems: 'center'}}>
         <CardTitle title={`Order ${_id}`} />
         <RaisedButton
           label={shipped ? 'Shipped' : 'Ship'}
           primary={shipped ? false : true}
           onTouchTap={
             shipped ? null :
             handleSubmit(values => {
               const update = {
                 type: 'SHIPPED',
               }
               return dispatch(fetchUpdate(_id, update))
             })}
         />
       </div>
       <OrderCartList items={items} />
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

)

const mapStateToProps = ({
  orders: { items, isFetching }
}, {
  params: { orderId }
}) => ({
  isFetching,
  form: `order_${orderId}`,
  order: items.find(item => item._id === orderId),
  orderId
})

export default compose(connect(mapStateToProps),
reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminOrderDetail)
