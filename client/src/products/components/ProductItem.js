import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { fetchAddToCart } from '../../carts/actions/index'
import formatPrice from '../../modules/formatPrice'

class ProductItem extends Component {
  state = {
    qty: 1,
    zDepth: 1,
    loading: true,
    image: '',
    open: false
  }
  componentDidMount() {
    if (this.props.product.image) {
      this.setState({ loading: true })
      const img = new Image()
      const src = this.props.product.image
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
    const { dispatch, product } = this.props
    const { name, description, price } = product.values
    const width = this.props.fullWidth ? null : 300
    return (
      this.state.loading ? null :
      <Card
        className="cards"
        style={{ flex: '1 1 auto', width }}
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
            <img src={product.image} alt={product.name} onTouchTap={() => dispatch(push(`/product/${product._id}`))}/>
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
              id={product._id}
            />
            <RaisedButton label="+" primary={true} onTouchTap={this.plus} labelStyle={{ fontSize: '24px' }} />
          </div>
          <RaisedButton
            label="Add To Cart"
            primary={true}
            fullWidth={true}
            onTouchTap={() => {
              const update = {
                type: 'ADD_TO_CART',
                productId: product._id,
                productQty: this.state.qty,
              }
              dispatch(fetchAddToCart(update))
              this.setState({ open: true })
            }}
          />
        </CSSTransitionGroup>
        {!this.state.open ? null :
          <Dialog
            actions={
              <FlatButton
                label="Close"
                primary={true}
                onTouchTap={() => this.setState({ open: false })}
              />
            }
            actionsContainerStyle={{ textAlign: 'center' }}
            modal={false}
            open={this.state.open}
            onRequestClose={() => this.setState({ open: false })}
            bodyStyle={{ textAlign: 'center', fontSize: 24 }}
          >
            Added To Cart!
          </Dialog>
        }
      </Card>
    )
  }
}


export default connect()(ProductItem)
