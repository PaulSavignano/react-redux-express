import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchAddToCart } from '../actions/cart'
import { formatPrice } from '../../modules/formatPrice'

import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Product extends Component {
  state = {
    qty: 1,
    zDepth: 1,
    loading: true,
    image: ''
  }
  componentDidMount() {
    if (this.props.image) {
      this.setState({ loading: true })
      const img = new Image;
      const src = this.props.image
      img.src = src
      img.onload = (e) => {
        this.setState({ loading: false, image: src })
      }
    } else {
      this.setState({ loading: false })
    }
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  minus = () => {
    if (this.state.qty > 1) {
      this.setState({ qty: this.state.qty - 1 })
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
      this.state.loading ? null :
      <Card
        style={{ flex: '1 1 auto', width: 300, margin: 20 }}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnter={false}
          transitionLeave={false}
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
          <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', marginBottom: 8 }}>
            <RaisedButton label="-" primary={true} onTouchTap={this.minus} labelStyle={{ fontSize: '24px' }} />
            <TextField
              style={{ flex: '1 1 auto' }}
              inputStyle={{ textAlign: 'center' }}
              ref={node => this.qty = node}
              value={this.state.qty}
              id={this.props._id}
            />
            <RaisedButton label="+" primary={true} onTouchTap={this.plus} labelStyle={{ fontSize: '24px' }} />
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
              dispatch(fetchAddToCart({ type: 'ADD_TO_CART', product }))
            }}
          />
        </CSSTransitionGroup>
      </Card>
    )
  }
}


export default connect()(Product)
