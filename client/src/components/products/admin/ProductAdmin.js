import React, { Component } from 'react'

class ProductAdmin extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.refs.update.blur()
    const update = {
      _id: this.props._id,
      name: this.refs.name.value,
      description: this.refs.description.value,
      price: parseInt(this.refs.price.value, 10)
    }
    this.props.onProductUpdate(update)
  }

  render() {
    const { _id, name, description, price } = this.props
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
    return (
      <div className="mdl-grid mdl-cell mdl-cell--12-col mdl-cell--4-col-tablet mdl-card mdl-shadow--4dp">
        <div className="mdl-card__media mdl-cell mdl-cell--12-col-tablet">
          <img className="article-image" src="http://placehold.it/275x250" alt="" />
        </div>
        <form className="mdl-cell mdl-cell--8-col" onSubmit={this.handleSubmit}>
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
              <textarea className="mdl-textfield__input" type="text" rows="3" id="sample5" ref="description" defaultValue={description} ></textarea>
            </div>
          </div>
          <div style={styles.btnContainer}>
            <button
              id="update"
              ref="update"
              className="mdl-button mdl-js-button mdl-button--raised"
            >
              Update
            </button>
            <button
              id="delete"
              className="mdl-button mdl-js-button mdl-button--raised"
              onClick={() => this.props.onProductDelete(_id)}
            >
              Delete
            </button>
          </div>

        </form>
      </div>
    )
  }
}

export default ProductAdmin
