import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import formatPrice from '../../utils/formatPrice'
import { fetchAddToCart } from '../../actions/cart'

class ProductItem extends Component {
  state = {
    qty: 1,
    zDepth: 1,
    image: null,
    loading: false,
    open: false
  }
  componentDidMount() {
    const { image } = this.props.item
    if (image) {
      this.setState({ loading: true })
      const img = new Image()
      const src = image.src
      img.src = src
      img.onload = () => this.setState({ image: src, loading: false })
    }
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  minus = () => this.state.qty > 1 && this.setState({ qty: this.state.qty - 1 })
  plus = () => this.setState({ qty: this.state.qty + 1 })
  render() {
    const { image, loading } = this.state
    const { dispatch, item: { _id, slug, values: { name, description, price } }  } = this.props
    return (
      !loading &&
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={900}
        transitionEnter={false}
        transitionLeave={false}
        style={{ flex: '1 1 auto' }}
      >
        <Card
          className="cards"
          style={{ flex: '1 1 auto' }}
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >

          {image &&
            <CardMedia onTouchTap={() => dispatch(push(`/${slug}`))}>
              <img src={image} alt={name} />
            </CardMedia>
          }
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
              id={_id}
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
                productId: _id,
                productQty: this.state.qty,
              }
              dispatch(fetchAddToCart(update))
              this.setState({ open: true })
            }}
          />

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
      </CSSTransitionGroup>
    )
  }
}

export default connect()(ProductItem)
