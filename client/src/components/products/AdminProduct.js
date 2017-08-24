import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import productContainer from '../../containers/products/productContainer'
import AdminItemForm from '../forms/AdminItemForm'
import loadImage from '../images/loadImage'
import formatPrice from '../../utils/formatPrice'
import { fetchUpdate, fetchDelete } from '../../actions/products'
import { startEdit } from '../../actions/editItem'

import renderTextField from '../fields/renderTextField'
import renderWysiwgyField from '../fields/renderWysiwgyField'

const fields = [
  { name: 'description', type: 'text', component: renderTextField },
  { name: 'detail', type: 'text', component: renderTextField },
  { name: 'name', type: 'text', component: renderTextField },
  { name: 'price', type: 'number', component: renderTextField },
]

class AdminProduct extends Component {
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit(item, 'PRODUCT'))
  }
  render() {
    const {
      dispatch,
      elevation,
      editItem,
      events,
      item: {
        _id,
        image,
        values: {
          description,
          detail,
          name,
          price,
        }
      },
    } = this.props
    return (
      <Card
        {...events}
        zDepth={elevation}
        onTouchTap={this.handleStartEdit}
        style={{ margin }}
        id={_id}
      >
        {image && image.src &&
          <CardMedia>
            <img src={image.src} alt="section product" />
          </CardMedia>
        }
        <CardTitle title={
          <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
            <div>{name}</div>
            <div>{formatPrice(price)}</div>
          </div>
        }
        />
        <CardText>{description}</CardText>
        <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', marginBottom: 8 }}>
          <RaisedButton label="-" primary={true} labelStyle={{ fontSize: '24px' }} />
          <TextField
            style={{ flex: '1 1 auto' }}
            inputStyle={{ textAlign: 'center' }}
            value="1"
            id={_id}
          />
          <RaisedButton label="+" primary={true} labelStyle={{ fontSize: '24px' }} />
        </div>
        <RaisedButton
          label="Add To Cart"
          primary={true}
          fullWidth={true}
        />
        {editItem.editing && editItem.kind === 'PRODUCT' ?
          <AdminItemForm
            form={`product_${editItem.item._id}`}
            editItem={editItem}
            initialValues={{
              ...editItem.item.values,
              price: editItem.item.values.price && editItem.item.values.price.toString()
            }}
            fields={fields}
            dispatch={dispatch}
            fetchUpdate={fetchUpdate}
            fetchDelete={fetchDelete}
          />
        : null}
      </Card>
    )
  }
}

export default loadImage(AdminProduct)
