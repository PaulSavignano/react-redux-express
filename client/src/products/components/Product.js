import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { startAddToCart } from '../actions/cart'
import { formatPrice } from '../../modules/formatPrice'

import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  cell: {
    flex: '1 1 auto',
    width: 300,
    minWidth: 300,
    margin: '.8em 1em'
  },
  grid: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: 8
  },
  qty: {
    flex: '1 1 auto',
  },
  input: {
    textAlign: 'center'
  },
  button: {
    fontSize: '24px'
  }
}

class Product extends Component {
  state = {
    qty: 1,
    zDepth: 1
  }
  handleMouseEnter = () => {
    this.setState({
      zDepth: 4,
    })
  }
  handleMouseLeave = () => {
    this.setState({
      zDepth: 1,
    })
  }
  minus = () => {
    if (this.state.qty > 1) {
      return this.setState({ qty: this.state.qty - 1 })
    }
  }
  plus = () => {
    this.setState({ qty: this.state.qty + 1 })
  }
  render() {
    let qty
    const { dispatch, _id, slug, image, values } = this.props
    const { name, description, price } = values
    return (
      <Card
        style={{ flex: '1 1 auto', width: 300, margin: 20 }}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <CardMedia>
          <img src={image} alt={name} onTouchTap={() => dispatch(push(`/product/${slug}`))}/>
        </CardMedia>
        <CardTitle title={
          <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
            <div>{name}</div>
            <div>{formatPrice(price)}</div>
          </div>
        }
        />
        <CardText>{description}</CardText>
        <div style={styles.grid}>
          <RaisedButton label="-" primary={true} onTouchTap={this.minus} labelStyle={styles.button} />
          <TextField
            style={styles.qty}
            inputStyle={styles.input}
            ref={node => this.qty = node}
            value={this.state.qty}
            id={this.props._id}
          />
          <RaisedButton label="+" primary={true} onTouchTap={this.plus} labelStyle={styles.button} />
        </div>
        <RaisedButton
          label="Add To Cart"
          primary={true}
          fullWidth={true}
          onTouchTap={() => {
            const product = {
              productId: _id,
              productQty: this.state.qty,
            }
            dispatch(startAddToCart({ type: 'ADD_TO_CART', product }))
          }}
        />
      </Card>
    )
  }
}


export default connect()(Product)
