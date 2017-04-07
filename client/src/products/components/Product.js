import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem } from '../actions/cart'
import { formatPrice } from '../../modules/formatPrice'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  cell: {
    flex: '1 1 auto',
    width: 300,
    minWidth: 300,
    margin: '.8em 1em 0'
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
    zDepth: 0
  }
  handleMouseEnter = () => {
    this.setState({
      zDepth: 4,
    })
  }
  handleMouseLeave = () => {
    this.setState({
      zDepth: 0,
    })
  }
  minus = () => {
    this.state.qty > 1 ? this.setState({ qty: this.state.qty - 1 }) : null
  }
  plus = () => {
    this.setState({ qty: this.state.qty + 1 })
  }
  render() {
    let qty
    const { dispatch, _id, name, description, price, image } = this.props
    return (
      <Card
        style={styles.cell}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <CardMedia>
          <img className="article-image" src={image} alt="" />
        </CardMedia>
        <CardTitle title={name} />
        <CardTitle title={formatPrice(price)} />
        <CardText>{description}</CardText>
        <div style={styles.grid}>
          <RaisedButton label="-" primary={true} onClick={this.minus} labelStyle={styles.button} />
          <TextField
            style={styles.qty}
            inputStyle={styles.input}
            ref={node => this.qty = node}
            value={this.state.qty}
            id={this.props._id}
          />
          <RaisedButton label="+" primary={true} onClick={this.plus} labelStyle={styles.button} />
        </div>
        <RaisedButton
          label="Add To Cart"
          primary={true}
          fullWidth={true}
          onClick={() => {
            console.log(this.qty)
            const product = {
              name,
              price,
              productId: _id,
              productQty: parseInt(this.qty.input.value, 10)
            }
            dispatch(addItem(product))
          }}
        />
      </Card>
    )
  }
}


export default connect()(Product)
