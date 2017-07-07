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
    loading: true,
    image: null,
    hasImage: false,
    open: false
  }
  componentDidMount() {
    const { image } = this.props.item
    if (image) {
      this.setState({ loading: true })
      const img = new Image()
      const src = image.src
      img.src = src
      img.onload = (e) => {
        this.setState({ loading: false, image: src, hasImage: true })
      }
    } else {
      this.setState({ loading: false, hasImage: false })
    }
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  minus = () => {
    if (this.state.qty > 1) return this.setState({ qty: this.state.qty - 1 })
  }
  plus = () => {
    this.setState({ qty: this.state.qty + 1 })
  }
  render() {
    const { dispatch, item: { _id, slug, values: { name, description, price } }  } = this.props
    return (
      this.state.loading ? null :
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

          {this.state.hasImage &&
            <CardMedia onTouchTap={() => dispatch(push(`/${slug}`))}>
              <img src={this.state.image} alt={name} />
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

const mapStateToProps = ({ products }, { componentId }) => {
  const item = products.items.find(value => value._id === componentId)
  return {
    item
  }
}

export default connect(mapStateToProps)(ProductItem)
