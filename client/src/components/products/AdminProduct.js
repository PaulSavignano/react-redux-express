import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import productContainer from '../../containers/products/productContainer'
import loadImage from '../images/loadImage'
import formatPrice from '../../utils/formatPrice'
import { fetchUpdate, fetchDelete } from '../../actions/products'
import { startEdit } from '../../actions/editItem'

class AdminProduct extends Component {
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({ item, kind: 'PRODUCT' }))
  }
  render() {
    const {
      dispatch,
      elevation,
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
      productStyle: {
        margin
      }
    } = this.props
    return (
      <Card
        {...events}
        zDepth={elevation}
        onTouchTap={this.handleStartEdit}
        style={{ margin }}
        id={_id}
        className="product"
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
      </Card>
    )
  }
}

AdminProduct.propTypes = {
  dispatch: PropTypes.func.isRequired,
  elevation: PropTypes.number.isRequired,
  events: PropTypes.object,
  hasButtons: PropTypes.bool.isRequired,
  hasHeading: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  productStyle: PropTypes.object.isRequired,
}

export default loadImage(AdminProduct)
