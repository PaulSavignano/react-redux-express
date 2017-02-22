import React, { Component } from 'react'
import CartList from './CartList'
import CartAdd from './CartAdd'
import CartSearch from './CartSearch'

class CartsPage extends Component {
  render() {
    const styles = {
      grid: {
        maxWidth: 900,
        margin: 'auto'
      }
    }
    return (
      <main className="mdl-layout__content">
        <div className="mdl-grid" style={styles.grid}>
          <h1>Cart</h1>
          <CartSearch onSearch={this.props.onSearch}/>
          <CartAdd onCartAdd={this.props.onCartAdd} />
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
