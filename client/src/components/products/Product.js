import React, { Component } from 'react'
import { formatPrice } from '../../modules/formatPrice'

class Product extends Component {
  handleAdd = () => {
    const productQty = this.refs.qty.value ? parseInt(this.refs.qty.value, 10) : 1
    const cart = {
      productId: this.props._id,
      productQty,
    }
    this.props.onCartAdd(cart)
  }
  render() {
    const styles = {
      container: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-between',
        paddingLeft: 16
      },
      description: {
        textAlign: 'left'
      },
      btnContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }
    }
    const { name, description, price } = this.props
    return (
      <div className="mdl-grid mdl-cell mdl-cell--12-col mdl-cell--4-col-tablet mdl-card mdl-shadow--4dp">
        <div className="mdl-card__media mdl-cell mdl-cell--12-col-tablet">
          <img className="article-image" src="http://placehold.it/275x250" alt="" />
        </div>
        <div className="mdl-cell mdl-cell--8-col">
          <div style={styles.container}>
            <h2 className="mdl-card__title-text">{name}</h2>
            <h2 className="mdl-card__title-text">{formatPrice(price)}</h2>
          </div>
          <div className="mdl-card__supporting-text no-left-padding">
            <p style={styles.description}>{description}</p>
          </div>
          <div style={styles.btnContainer}>
            <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" ref="qty" defaultValue="1"/>
              <span className="mdl-textfield__error">Input is not a number!</span>
            </div>
            <button
              id="addToCart"
              className="mdl-button mdl-js-button mdl-button--raised"
              onClick={this.handleAdd}
            >
              Add To Cart
            </button>
          </div>

        </div>
      </div>
    )
  }
}

export default Product
