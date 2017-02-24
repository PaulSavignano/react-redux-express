import React, { Component } from 'react'

class ProductAdminAdd extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const name = this.refs.name.value
    const description = this.refs.description.value
    const price = parseInt(this.refs.price.value, 10)
    if (name.length && description.length && price) {
      const product = { name, description, price }
      this.props.onProductAdd(product)
      e.target.reset()
    } else {
      this.refs.name.focus()
    }
  }
  render() {
    const styles = {
      container: {
        display: 'flex',
        flexFlow: 'row wrap',
        width: '100%',
        paddingLeft: 16,
        alignItems: 'center'
      },
      item: {
        flex: '1 1 auto',
        width: 200
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
            <input className="mdl-textfield__input" type="text" ref="name" id="name" />
            <label className="mdl-textfield__label" htmlFor="name">Name...</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield" style={styles.item}>
            <input className="mdl-textfield__input" type="text" ref="description" id="description" />
            <label className="mdl-textfield__label" htmlFor="description">Description...</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield" style={styles.item}>
            <input className="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" ref="price" id="price" />
            <label className="mdl-textfield__label" htmlFor="price">Price...</label>
            <span className="mdl-textfield__error">Input is not a number!</span>
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


export default ProductAdminAdd
