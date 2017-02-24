import React, { Component } from 'react'
import { formatPrice } from '../../modules/formatPrice'
import CartList from './CartList'
import CartSearch from './CartSearch'

class CartsPage extends Component {
  render() {
    const styles = {
      grid: {
        maxWidth: 900,
        margin: 'auto'
      },
      container: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        width: '100%'
      }
    }
    return (
      <main className="mdl-layout__content">
        <div className="mdl-grid" style={styles.grid}>
          <div style={styles.container}>
            <h1>Cart</h1>
            <h1>{formatPrice(this.props.cartTotal)}</h1>
          </div>
          <CartSearch onSearch={this.props.onSearch}/>
          <br />
          <CartList
            carts={this.props.carts}
            onCartUpdate={this.props.onCartUpdate}
            onCartDelete={this.props.onCartDelete}
          />
        </div>
      </main>
    )
  }
}

export default CartsPage
