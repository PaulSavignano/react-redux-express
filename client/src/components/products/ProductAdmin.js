import React, { Component } from 'react'
import { formatPrice } from '../../modules/formatPrice'

class ProductAdmin extends Component {
  handleAdd = () => {
    const productQty = this.refs.qty.value ? parseInt(this.refs.qty.value, 10) : 1
    const cart = {
      productId: this.props._id,
      productQty
    }
    this.props.onCartAdd(cart)
  }
  handleUpdate = (_id, uuid) => {
    const name = this.refs.name.value
    const description = this.refs.description.value
    const price = this.refs.price.value
    const update = { _id, uuid, name, description, price }
    this.props.onProductUpdate(update)
  }

  render() {
    const styles = {
      container: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-between',
        paddingLeft: 16
      },
      name: {
        flexFlow: '1 1 auto',
      },
      price: {
        flexFlow: '1 1 auto',
        width: 100
      },
      description: {
        textAlign: 'left',
        float: 'left'
      },
      btnContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-end'
      }
    }
    const { _id, uuid, name, description, price } = this.props
    return (
      <div className="mdl-grid mdl-cell mdl-cell--12-col mdl-cell--4-col-tablet mdl-card mdl-shadow--4dp">
        <div className="mdl-card__media mdl-cell mdl-cell--12-col-tablet">
          <img className="article-image" src="http://placehold.it/275x250" alt="" />
        </div>
        <div className="mdl-cell mdl-cell--8-col">
          <div style={styles.container}>
            <div className="mdl-textfield mdl-js-textfield" style={styles.name}>
              <input className="mdl-textfield__input" type="text" ref="name" id="name" defaultValue={name}/>
            </div>
            <div className="mdl-textfield mdl-js-textfield" style={styles.price}>
              <input className="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" ref="price" id="price" defaultValue={price}/>
              <span className="mdl-textfield__error">Input is not a number!</span>
            </div>
          </div>
          <div className="mdl-card__supporting-text no-left-padding">
            <div className="mdl-textfield mdl-js-textfield" style={styles.description}>
              <textarea className="mdl-textfield__input" type="text" rows= "3" id="sample5" defaultValue={description}></textarea>
            </div>
          </div>
          <div style={styles.btnContainer}>
            <button
              id="update"
              className="mdl-button mdl-js-button mdl-button--raised"
              onClick={() => this.handleUpdate(_id, uuid)}
            >
              Update
            </button>
            <button
              id="deleteCart"
              className="mdl-button mdl-js-button mdl-button--raised"
              onClick={() => this.props.onProductDelete(_id, uuid)}
            >
              Delete
            </button>
          </div>

        </div>
      </div>
    )
  }
}

export default ProductAdmin
