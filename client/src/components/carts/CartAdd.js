import React, { Component } from 'react'

class CartAdd extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const cartProductId = this.refs.cartProductId.value
    if (cartProductId.length) {
      this.refs.cartProductId = ''
      this.props.onCartAdd(cartProductId)
    } else {
      this.refs.cartProductId.focus()
    }
  }
  render() {
    const styles = {
      container: {
        display: 'flex',
        flexFlow: 'row nowrap',
        width: '100%',
        paddingLeft: 16,
        alignItems: 'center'
      },
      item: {
        flex: '1 1 auto'
      },
      card: {
        height: 'auto',
        minHeight: 'auto'
      }
    }
    return (
      <div className="mdl-grid mdl-cell mdl-cell--12-col mdl-cell--4-col-tablet mdl-card mdl-shadow--4dp" style={styles.card}>
        <form onSubmit={this.handleSubmit} style={styles.container}>
          <div className="mdl-textfield mdl-js-textfield" style={styles.item}>
            <input className="mdl-textfield__input" type="text" ref="cartProductId" id="description" />
            <label className="mdl-textfield__label" htmlFor="description">Cart productId...</label>
          </div>
          <button
            className="mdl-button mdl-js-button mdl-button--raised"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    )
  }
}

export default CartAdd
