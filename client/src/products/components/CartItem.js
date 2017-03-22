import React from 'react'
import { connect } from 'react-redux'
import { updateItem, deleteItem } from '../actions/cart'
import { formatPrice } from '../../modules/formatPrice'

import TextField from 'material-ui/TextField'

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between'
  },
  nameAndPrice: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    paddingLeft: 16
  },
  description: {
    display: 'flex',
    alignItems: 'stretch'
  },
  inputs: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  qty: {
    width: 126
  }
}


const CartItem = ({ dispatch, name, description, price, productId, productQty }) => {
  let qty
  return (
    <div className="mdl-grid mdl-cell mdl-cell--12-col mdl-card mdl-shadow--3dp">
      <div className="mdl-card__media mdl-cell mdl-cell--12-col-tablet">
        <img className="article-image" src="http://placehold.it/275x250" alt="" />
      </div>

      <div style={styles.container} className="mdl-cell mdl-cell--8-col">
        <div>
          <div style={styles.nameAndPrice}>
            <h2 className="mdl-card__title-text">{name}</h2>
            <h2 className="mdl-card__title-text" style={styles.price}>{formatPrice(price)}</h2>
          </div>
        </div>

        <div style={styles.inputs}>
          <TextField
            style={styles.qty}
            value={productQty}
            id={productId}
            onChange={(e) => dispatch(updateItem(productId, e.target.value))}
          />
          <button
            type="button"
            className="mdl-button mdl-js-button mdl-button--raised"
            onClick={() => dispatch(deleteItem(productId))}
          >
            Remove
          </button>
        </div>

      </div>
    </div>
  )
}


export default connect()(CartItem)
