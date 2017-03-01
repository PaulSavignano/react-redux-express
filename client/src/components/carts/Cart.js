import React, { Component } from 'react'
import { formatPrice } from '../../modules/formatPrice'

class Cart extends Component {
  state = {
    productQty: ''
  }
  componentWillMount() {
    this.setState({ productQty: this.props.productQty })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ productQty: nextProps.productQty })
  }
  handleUpdate = (e, _id) => {
    e.preventDefault()
    this.refs.update.blur()
    this.props.onCartUpdate(_id, parseInt(this.state.productQty, 10))
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
          <form style={styles.btnContainer} onSubmit={(e) => this.handleUpdate(e, _id)}>
            <div className="mdl-textfield mdl-js-textfield">
              <input
                className="mdl-textfield__input"
                type="text"
                pattern="-?[0-9]*(\.[0-9]+)?"
                onChange={(e) => this.setState({ productQty: e.target.value })}
                value={this.state.productQty}
              />
              <span className="mdl-textfield__error">Input is not a number!</span>
            </div>
            <button
              id="update"
              ref="update"
              type="submit"
              className="mdl-button mdl-js-button mdl-button--raised"
            >
              Update
            </button>
            <button
              id="delete"
              className="mdl-button mdl-js-button mdl-button--raised"
              onClick={() => this.props.onCartDelete(_id)}
            >
              Delete
            </button>
          </form>

        </div>
      </div>
    )
  }
}

export default Cart
