import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchAddToCart } from '../../carts/actions/index'
import formatPrice from '../../modules/formatPrice'

class ProductItem extends Component {
  state = {
    qty: 1,
    zDepth: 1,
    loading: true,
    image: ''
  }
  componentDidMount() {
    if (this.props.image) {
      this.setState({ loading: true })
      const img = new Image()
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
    const { dispatch, item } = this.props
    const { name, description, price } = item.values
    return (
      this.state.loading ? null :
      <Card
        className="cards"
        style={{ flex: '1 1 auto', width: 300 }}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={900}
          transitionEnter={false}
          transitionLeave={false}
          style={{ flex: '1 1 auto' }}
        >
          <CardMedia>
            <img src={item.image} alt={item.name} onTouchTap={() => dispatch(push(`/product/${item.slug}`))}/>
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
              id={item._id}
            />
            <RaisedButton label="+" primary={true} onTouchTap={this.plus} labelStyle={{ fontSize: '24px' }} />
          </div>
          <RaisedButton
            label="Add To Cart"
            primary={true}
            fullWidth={true}
            onTouchTap={() => {
              const product = {
                productId: item._id,
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


export default connect()(ProductItem)
