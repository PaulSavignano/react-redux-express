import React from 'react'
import { connect } from 'react-redux'
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
  addToCart: {
    float: 'right'
  },
  qty: {
    width: 126
  }
}


const Order = props => {
  const { _id, name, description, price } = props
  return (
    <div className="mdl-grid mdl-cell mdl-cell--12-col mdl-card mdl-shadow--3dp">
      <div style={styles.container} className="mdl-cell mdl-cell--8-col">
        <div>
          <div style={styles.nameAndPrice}>
            <h2 className="mdl-card__title-text">{name}</h2>
            <h2 className="mdl-card__title-text" style={styles.price}>{formatPrice(price)}</h2>
          </div>
          <div style={styles.description} className="mdl-card__supporting-text">
            <p>{description}</p>
          </div>
        </div>

        <div style={styles.inputs}>
          <TextField
            style={styles.qty}
            ref={node => qty = node}
            id={_id}
            defaultValue="1"
          />
          <button
            style={styles.addToCart}
            type="button"
            className="mdl-button mdl-js-button mdl-button--raised"
            onClick={() => {
              const product = {
                name,
                price,
                productId: _id,
                productQty: parseInt(qty.input.value, 10)
              }
              dispatch(addToCart(product))
            }}
          >
            Add To Cart
          </button>
        </div>

      </div>
    </div>
  )
}


export default connect()(Order)
